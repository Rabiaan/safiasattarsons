// build/probe.mjs - dump elements that have both a border and a border-radius
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { ROOT } from './data.mjs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 8127; const CDP = 9337;
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(PORT, r));
const userDir = path.join(process.env.TEMP, 'opencode', 'chrome-probe');
fs.mkdirSync(userDir, { recursive: true });
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${CDP}`, `--user-data-dir=${userDir}`, '--no-first-run', '--disable-gpu', '--window-size=1440,1000', 'about:blank'], { stdio: 'ignore' });
for (let i = 0; i < 60; i++) { try { if ((await fetch(`http://127.0.0.1:${CDP}/json/version`)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 250)); }
const targets = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable'); await send('Runtime.enable');
const evaluate = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value;

for (const p of (process.env.PAGES || 'contact,index').split(',')) {
  await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/${p}.html` });
  await new Promise((r) => setTimeout(r, 2000));
  const rows = await evaluate(`(() => {
    const out = [];
    for (const el of document.querySelectorAll('*')) {
      const cs = getComputedStyle(el);
      const r = Math.max(...cs.borderTopLeftRadius.split(' ').map(parseFloat));
      const bw = parseFloat(cs.borderTopWidth);
      if (!r || !bw || cs.borderTopStyle === 'none') continue;
      const rect = el.getBoundingClientRect();
      out.push({
        tag: el.tagName.toLowerCase(),
        r: Math.round(r), bw, w: Math.round(rect.width), h: Math.round(rect.height),
        cls: (el.getAttribute('class') || '').split(/\\s+/).filter(c => /rounded|border|^p-|^m[lrxy]?-|^gap-|inset/.test(c)).join(' '),
        depth: (() => { let d = 0, n = el; while ((n = n.parentElement)) d++; return d; })(),
        childRounded: [...el.querySelectorAll('*')].filter(c => { const s = getComputedStyle(c); return parseFloat(s.borderTopWidth) > 0 && s.borderTopStyle !== 'none' && parseFloat(s.borderTopLeftRadius) > 0; }).length,
      });
    }
    return out;
  })()`);
  console.log(`\n===== ${p}.html : ${rows.length} bordered+rounded elements =====`);
  for (const r of rows) console.log(`  d${String(r.depth).padStart(2)} <${r.tag}> r=${String(r.r).padStart(3)} bw=${r.bw} ${String(r.w).padStart(4)}x${String(r.h).padStart(4)} nestedBorderedKids=${r.childRounded}  ${r.cls}`);
}
ws.close(); chrome.kill(); server.close();
