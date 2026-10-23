// build/browsercheck.mjs - headless Chrome smoke test over the generated pages
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { ROOT } from './data.mjs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 8123;
const CDP = 9333;

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
    res.writeHead(404); res.end('not found'); return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(PORT, r));

const userDir = path.join(process.env.TEMP, 'opencode', 'chrome-ss');
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
const errors = [];
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  if (msg.method === 'Runtime.exceptionThrown') {
    errors.push(msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text);
  }
  if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
    const t = msg.params.entry.text || '';
    if (!/favicon/.test(t)) errors.push(`[net] ${t} ${msg.params.entry.url || ''}`);
  }
};
const send = (method, params = {}) =>
  new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });

await send('Runtime.enable');
await send('Log.enable');
await send('Page.enable');

const evaluate = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return { __err: r.result.exceptionDetails.text };
  return r.result?.result?.value;
};

const goto = async (file) => {
  errors.length = 0;
  await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/${file}` });
  await new Promise((r) => setTimeout(r, 3200));
  return errors.slice();
};

let failures = 0;
const check = (label, cond, extra = '') => {
  console.log(`${cond ? '  ✓' : '  ✗'} ${label}${extra ? ' — ' + extra : ''}`);
  if (!cond) failures++;
};

/* ---------------- shared assertions per page ---------------- */
const pages = ['index.html', 'about.html', 'service.html', 'product.html', 'rice.html', 'oil.html', 'vegetables.html', 'fruits.html', 'spices.html', 'contact.html'];

console.log('\n== per page: tokens, tailwind, landmarks, images ==');
for (const f of pages) {
  const errs = await goto(f);
  const r = await evaluate(`(() => {
    const card = document.querySelector('.p-card');
    const cs = card ? getComputedStyle(card) : null;
    const body = getComputedStyle(document.body);
    const btn = document.querySelector('a[href="contact.html"]');
    const imgs = [...document.images];
    return {
      tailwind: !!window.tailwind,
      bodyFont: body.fontFamily,
      bodyBg: body.backgroundColor,
      cardRadius: cs ? cs.borderTopLeftRadius : null,
      cardBorder: cs ? cs.borderTopWidth + ' ' + cs.borderTopColor : null,
      cardShadow: cs ? cs.boxShadow : null,
      imgs: imgs.length,
      broken: imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src')),
      header: !!document.querySelector('header'),
      nav: !!document.querySelector('header nav'),
      drawer: !!document.getElementById('mobileNav'),
      modal: !!document.getElementById('languageModal'),
      h1: document.querySelectorAll('h1').length,
      h2: document.querySelectorAll('h2').length,
      title: document.title,
    };
  })()`);

  const ok = r.tailwind && r.imgs > 0 && r.broken.length === 0 && r.header && r.nav && r.drawer && r.modal && r.h1 === 1 && errs.length === 0;
  if (!ok) failures++;
  console.log(`${ok ? '✓' : '✗'} ${f.padEnd(17)} tw=${r.tailwind} imgs=${r.imgs} broken=${r.broken.length} h1=${r.h1} h2=${r.h2} radius=${r.cardRadius}`);
  console.log(`   font=${r.bodyFont} bg=${r.bodyBg}`);
  if (r.cardRadius) console.log(`   card radius=${r.cardRadius} border=${r.cardBorder}`);
  if (r.broken.length) console.log('   BROKEN IMAGES:', r.broken.slice(0, 8).join(', '));
  errs.slice(0, 4).forEach((e) => console.log('   ERR:', String(e).slice(0, 220)));
}

/* ---------------- interaction tests ---------------- */
console.log('\n== interactions ==');
await goto('rice.html');
let r = await evaluate(`(() => {
  const g = document.querySelector('[data-filter-group]');
  const btns = [...g.querySelectorAll('[data-filter]')];
  const out = [];
  for (const b of btns) {
    b.click();
    const target = document.querySelector(g.getAttribute('data-filter-group'));
    out.push([b.textContent.trim(), [...target.querySelectorAll('[data-filter-item]')].filter(c => !c.classList.contains('is-hidden')).length]);
  }
  btns[0].click();
  return out;
})()`);
console.log('  filter results:', JSON.stringify(r));
check('rice filters produce non-zero results for every chip', r.every(([, n]) => n > 0), JSON.stringify(r.map((x) => x.join(':'))));
check('all filter restores full set', r[0][1] === 54, `all=${r[0][1]}`);

r = await evaluate(`(() => {
  document.getElementById('openLanguageModal').click();
  const m = document.getElementById('languageModal');
  const opened = m.classList.contains('is-open');
  const langs = m.querySelectorAll('[data-lang]').length;
  document.getElementById('closeLanguageModal').click();
  return { opened, langs, closed: !m.classList.contains('is-open') };
})()`);
check('language modal opens/closes with 5 languages', r.opened && r.closed && r.langs === 5, JSON.stringify(r));

r = await evaluate(`(() => {
  const d = document.getElementById('mobileNav');
  document.getElementById('openMobileNav').click();
  const open = d.classList.contains('is-open');
  const sub = document.querySelector('[data-drawer-sub]');
  document.querySelector('[data-drawer-toggle]').click();
  const expanded = sub && !sub.classList.contains('hidden');
  document.getElementById('closeMobileNav').click();
  return { open, expanded, closed: !d.classList.contains('is-open'), links: d.querySelectorAll('a').length };
})()`);
check('mobile drawer opens, products submenu expands, closes', r.open && r.closed && r.expanded, JSON.stringify(r));

r = await evaluate(`(() => {
  const dd = document.querySelector('.nav-drop');
  const grp = dd.parentElement;
  grp.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  const cs = getComputedStyle(dd);
  return { visibility: cs.visibility, opacity: cs.opacity, position: cs.position, z: cs.zIndex };
})()`);
check('desktop products dropdown is positioned & hidden until hover', r.visibility === 'hidden' && r.position === 'absolute', JSON.stringify(r));

r = await evaluate(`(() => {
  const imgs = [...document.querySelectorAll('.p-card img')];
  return {
    total: imgs.length,
    loaded: imgs.filter(i => i.complete && i.naturalWidth > 0).length,
    broken: imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src')),
    deferred: imgs.filter(i => !i.complete).length,
  };
})()`);
check('no broken product images (lazy ones may still be pending)', r.broken.length === 0, JSON.stringify(r));

await goto('index.html');
r = await evaluate(`(async () => {
  const els = [...document.querySelectorAll('.reveal')];
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
  await new Promise(r => setTimeout(r, 1600));
  const missing = els.filter(e => !e.classList.contains('is-visible'));
  return {
    total: els.length,
    revealed: els.length - missing.length,
    missing: missing.map(e => (e.textContent || '').trim().slice(0, 40)),
    noscript: document.head.innerHTML.includes('noscript'),
  };
})()`);
check('scroll-reveal animates every .reveal element into view', r.total > 0 && r.missing.length === 0, JSON.stringify(r));
check('noscript fallback present for reveal animation', r.noscript === true);

/* ---------------- hero banner consistency ---------------- */
console.log('\n== hero banner (rounded + bordered, matching home) ==');
for (const f of pages) {
  await goto(f);
  const h = await evaluate(`(() => {
    const sec = document.querySelector('main section, #main section');
    if (!sec) return null;
    const card = sec.querySelector('.rounded-lg, .rounded-xl');
    const cs = getComputedStyle(card);
    const img = card.querySelector('img');
    const rect = card.getBoundingClientRect();
    const header = document.querySelector('header > div');
    const hr = header.getBoundingClientRect();
    const hcs = getComputedStyle(header);
    const contentLeft = hr.left + parseFloat(hcs.paddingLeft);
    const contentRight = hr.right - parseFloat(hcs.paddingRight);
    return {
      radius: cs.borderTopLeftRadius,
      border: cs.borderTopWidth,
      overflow: cs.overflow,
      h: Math.round(rect.height),
      w: Math.round(rect.width),
      imgOpacity: img ? getComputedStyle(img).opacity : null,
      alignLeft: Math.abs(rect.left - contentLeft) < 2,
      alignRight: Math.abs(rect.right - contentRight) < 2,
      inset: Math.round(rect.left - hr.left),
      h1: card.querySelector('h1')?.textContent.trim().replace(/\\s+/g, ' ').slice(0, 32),
    };
  })()`);
  const ok = h && h.radius !== '0px' && h.border !== '0px' && h.overflow === 'hidden' && h.h > 380 && h.alignLeft && h.alignRight;
  if (!ok) failures++;
  console.log(`${ok ? '✓' : '✗'} ${f.padEnd(17)} radius=${h?.radius} border=${h?.border} h=${h?.h} inset=${h?.inset}px imgOpacity=${h?.imgOpacity} aligned=${h?.alignLeft}/${h?.alignRight}`);
}

console.log(failures ? `\n${failures} check(s) failed` : '\nall browser checks passed');
ws.close();
chrome.kill();
server.close();
process.exit(failures ? 1 : 0);
