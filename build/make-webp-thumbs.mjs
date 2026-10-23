// build/make-webp-thumbs.mjs - build grid thumbnails as .webp using headless Chrome's canvas encoder
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { ROOT } from './data.mjs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 8131; const CDP = 9341;
const WIDTH = Number(process.env.THUMB_W || 400);
const QUALITY = Number(process.env.THUMB_Q || 80);

const MIME = { '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(PORT, r));

const userDir = path.join(process.env.TEMP, 'opencode', 'chrome-thumb');
fs.rmSync(userDir, { recursive: true, force: true });
fs.mkdirSync(userDir, { recursive: true });
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${CDP}`, `--user-data-dir=${userDir}`, '--no-first-run', '--disable-gpu', 'about:blank'], { stdio: 'ignore' });
for (let i = 0; i < 80; i++) { try { if ((await fetch(`http://127.0.0.1:${CDP}/json/version`)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 250)); }
const targets = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable'); await send('Runtime.enable');
await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
await new Promise((r) => setTimeout(r, 1500));

const evaluate = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description || 'eval failed');
  return r.result?.result?.value;
};

// ---- list the product images ------------------------------------------------
const productDir = path.join(ROOT, 'images', 'products');
const sources = [];
for (const cat of fs.readdirSync(productDir)) {
  const dir = path.join(productDir, cat);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!/\.(webp|jpe?g|png)$/i.test(f)) continue;
    sources.push({ cat, file: f, url: `/images/products/${cat}/${encodeURIComponent(f)}` });
  }
}

// ---- resize one batch at a time --------------------------------------------
const RESIZE = `(async (items, w, q) => {
  const out = [];
  for (const it of items) {
    const img = new Image();
    img.decoding = 'sync';
    const ok = await new Promise((res) => { img.onload = () => res(true); img.onerror = () => res(false); img.src = it.url; });
    if (!ok) { out.push({ url: it.url, error: 'load failed' }); continue; }
    const scale = Math.min(1, w / img.naturalWidth);
    const cw = Math.max(1, Math.round(img.naturalWidth * scale));
    const ch = Math.max(1, Math.round(img.naturalHeight * scale));
    const c = document.createElement('canvas');
    c.width = cw; c.height = ch;
    c.getContext('2d').drawImage(img, 0, 0, cw, ch);
    const data = c.toDataURL('image/webp', q);
    out.push({ url: it.url, w: cw, h: ch, data: data.split(',')[1] });
  }
  return out;
})`;

let bytes = 0, made = 0, failed = 0;
const thumbDir = path.join(ROOT, 'images', 'thumbs');
fs.rmSync(thumbDir, { recursive: true, force: true });

for (let i = 0; i < sources.length; i += 10) {
  const batch = sources.slice(i, i + 10);
  const res = await evaluate(`(${RESIZE})(${JSON.stringify(batch)}, ${WIDTH}, ${QUALITY})`);
  for (const item of res) {
    const src = sources.find((s) => s.url === item.url);
    if (item.error) { console.log(`  ! ${item.url}: ${item.error}`); failed++; continue; }
    const out = path.join(thumbDir, src.cat, src.file.replace(/\.\w+$/, '.webp'));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    const buf = Buffer.from(item.data, 'base64');
    fs.writeFileSync(out, buf);
    bytes += buf.length; made++;
  }
  process.stdout.write(`\r  ${made}/${sources.length} thumbs`);
}
console.log(`\n${made} webp thumbnail(s) at ${WIDTH}px, ${(bytes / 1048576).toFixed(2)} MB${failed ? ` (${failed} failed)` : ''}`);

ws.close(); chrome.kill(); server.close();
