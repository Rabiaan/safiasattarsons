// build/memcheck.mjs - simulate a user surfing every page in one tab and report memory
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { ROOT } from './data.mjs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 8125;
const CDP = 9335;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.svg': 'image/svg+xml', '.gif': 'image/gif', '.ico': 'image/x-icon',
};
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); res.end('nf'); return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(PORT, r));

const userDir = path.join(process.env.TEMP, 'opencode', 'chrome-mem');
fs.mkdirSync(userDir, { recursive: true });
const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${CDP}`, `--user-data-dir=${userDir}`,
  '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
  '--window-size=1440,1000', 'about:blank',
], { stdio: 'ignore' });

for (let i = 0; i < 60; i++) {
  try { if ((await fetch(`http://127.0.0.1:${CDP}/json/version`)).ok) break; } catch {}
  await new Promise((r) => setTimeout(r, 250));
}
const targets = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
};
const send = (method, params = {}) =>
  new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable');
await send('Runtime.enable');
await send('Performance.enable');

const evaluate = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  return r.result?.result?.value;
};

const pages = (process.env.PAGES || 'index,about,service,product,rice,oil,vegetables,fruits,spices,contact').split(',');
console.log('page        heapUsed  heapTotal   imgBytes  domNodes  imgsLoaded');
console.log('----------  --------  ---------  --------  --------  ---------');
for (const p of pages) {
  await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/${p}.html` });
  await new Promise((r) => setTimeout(r, 2500));
  // scroll the whole page so lazy images actually load (as a user would)
  await evaluate(`(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 30)); }
    window.scrollTo(0, 0);
  })()`);
  await new Promise((r) => setTimeout(r, 1200));
  const m = await evaluate(`(() => {
    const res = performance.getEntriesByType('resource').filter(r => /\\.(png|jpe?g|webp|gif)/i.test(r.name));
    const bytes = res.reduce((a, r) => a + (r.encodedBodySize || 0), 0);
    const imgs = [...document.images];
    return {
      heapUsed: Math.round(performance.memory.usedJSHeapSize / 1048576),
      heapTotal: Math.round(performance.memory.totalJSHeapSize / 1048576),
      imgMB: (bytes / 1048576).toFixed(1),
      nodes: document.getElementsByTagName('*').length,
      loaded: imgs.filter(i => i.naturalWidth > 0).length,
      total: imgs.length,
    };
  })()`);
  console.log(
    p.padEnd(11) + String(m.heapUsed).padStart(7) + 'MB' + String(m.heapTotal).padStart(9) + 'MB' +
    String(m.imgMB).padStart(10) + 'MB' + String(m.nodes).padStart(9) + String(m.loaded).padStart(7) + '/' + m.total
  );
}

const metrics = await send('Performance.getMetrics');
const wanted = ['JSHeapUsedSize', 'JSHeapTotalSize', 'Nodes', 'Documents', 'LayoutCount', 'RecalcStyleCount', 'TaskDuration'];
console.log('\n' + wanted.map((w) => {
  const v = metrics.result.metrics.find((x) => x.name === w)?.value ?? 0;
  return `${w}=${w.endsWith('Duration') ? (v / 1000).toFixed(1) + 's' : Math.round(v).toLocaleString()}`;
}).join('  '));

ws.close();
const hold = Number(process.env.HOLD || 0);
if (hold) {
  console.log(`\nholding browser open for ${hold}ms — sample the process now`);
  await new Promise((r) => setTimeout(r, hold));
}
chrome.kill();
server.close();
