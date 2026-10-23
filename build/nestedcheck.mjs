// build/nestedcheck.mjs - verify the nested corner rule
// inside boxes: 30px.  The box around them: inner radius + its own padding.
// The check is independent of the runtime script: it re-measures the
// class radii and paddings, rebuilds the nesting from the DOM and compares
// them with the radii that are actually applied.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { ROOT } from './data.mjs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 8129; const CDP = 9339;
const VW = Number(process.env.VW || 1440), VH = Number(process.env.VH || 1000);
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(PORT, r));
const userDir = path.join(process.env.TEMP, 'chrome-nested2');
fs.mkdirSync(userDir, { recursive: true });
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${CDP}`, `--user-data-dir=${userDir}`, '--no-first-run', '--disable-gpu', `--window-size=${VW},${VH}`, 'about:blank'], { stdio: 'ignore' });
for (let i = 0; i < 60; i++) { try { if ((await fetch(`http://127.0.0.1:${CDP}/json/version`)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 250)); }
const targets = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable'); await send('Runtime.enable');
const evaluate = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value;

const RADIUS = 30, PAD_SCALE = 0.8;
const pages = ['index', 'about', 'service', 'product', 'rice', 'oil', 'vegetables', 'fruits', 'spices', 'contact'];
const rows = [];
const misses = [];
const squares = [];
for (const p of pages) {
  await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/${p}.html` });
  await evaluate(`(async () => {
    if (document.readyState !== 'complete') await new Promise(r => window.addEventListener('load', r, { once: true }));
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    await new Promise(r => setTimeout(r, 400));
    window.dispatchEvent(new Event('resize'));
    await new Promise(r => setTimeout(r, 450));
    return true;
  })()`);
  const r = await evaluate(`(() => {
    const RADIUS = ${RADIUS}, PAD_SCALE = ${PAD_SCALE};
    const SKIP = /^(img|svg|path|video|canvas|input|select|textarea|button)$/i;
    const corners = (el) => {
      const cs = getComputedStyle(el);
      const t = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].map(v => parseFloat(v)||0);
      return { t, r: Math.max.apply(null, t), uniform: t[0]===t[1] && t[1]===t[2] && t[2]===t[3] };
    };
    const isBox = (el) => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.borderTopWidth)>0 && cs.borderTopStyle!=='none' &&
          parseFloat(cs.borderRightWidth)>0 && cs.borderRightStyle!=='none' &&
          parseFloat(cs.borderBottomWidth)>0 && cs.borderBottomStyle!=='none' &&
          parseFloat(cs.borderLeftWidth)>0 && cs.borderLeftStyle!=='none') return true;
      const bg = cs.backgroundColor;
      if (!bg || bg==='transparent' || bg==='rgba(0, 0, 0, 0)') return false;
      const p = el.parentElement;
      return !p || getComputedStyle(p).backgroundColor !== bg;
    };
    const cls = (e) => (e.getAttribute('class')||'').split(/\\s+/).filter(c=>/rounded|border/.test(c)).slice(0,3).join(' ');
    const padOf = (cs) => [parseFloat(cs.paddingTop)||0, parseFloat(cs.paddingRight)||0, parseFloat(cs.paddingBottom)||0, parseFloat(cs.paddingLeft)||0];
    const all = [...document.querySelectorAll('body *')].filter(e => {
      if (SKIP.test(e.tagName)) return false;
      const rc = e.getBoundingClientRect();
      if (rc.width < 24 || rc.height < 12) return false;
      if (rc.left <= 1 && rc.right >= document.documentElement.clientWidth - 1) return false;
      if (e.closest('footer')) return false;
      return getComputedStyle(e).display !== 'none';
    });
    // class radius/padding and the applied values, measured with the override removed
    const orig = new Map(), applied = new Map();
    for (const e of all) {
      const inline = e.style.borderRadius, inlinePad = e.style.padding;
      e.style.borderRadius = ''; e.style.padding = '';
      const c = corners(e);
      const cs = getComputedStyle(e);
      const origPad = padOf(cs);
      e.style.borderRadius = inline; e.style.padding = inlinePad;
      orig.set(e, { ...c, isBox: isBox(e), origPad });
      const ov = parseFloat(inline);
      applied.set(e, { r: isNaN(ov) ? c.r : ov, pad: padOf(getComputedStyle(e)) });
    }
    const pill = (e) => { const o = orig.get(e); const rc = e.getBoundingClientRect(); return o.r >= Math.min(rc.width, rc.height)/2 - 0.5; };
    const boxes = all.filter(e => {
      const o = orig.get(e);
      if (!o.uniform || pill(e)) return false;
      return o.isBox || o.r > 0;
    });
    const isBoxEl = new Set(boxes);
    // nest: nearest rounded box around every box (only for the summary below)
    const owner = new Map();
    for (const b of boxes) {
      let anc = b.parentElement;
      while (anc && anc !== document.body) {
        if (isBoxEl.has(anc) && orig.get(anc).isBox && orig.get(anc).r > 0) { owner.set(b, anc); break; }
        anc = anc.parentElement;
      }
    }
    const expected = new Map();
    for (const b of boxes) expected.set(b, RADIUS);
    const out = [], sq = [], miss = [];
    const r2 = (v) => Math.round(v * 100) / 100;
    for (const b of boxes) {
      const exp = expected.get(b), got = r2(applied.get(b).r);
      if (Math.abs(got - exp) > 1) miss.push({ tag: b.tagName, cls: cls(b), exp, got, owner: owner.has(b) ? cls(owner.get(b)) : '-' });
    }
    for (const b of boxes) {
      const o = owner.get(b); if (!o) continue;
      const ap = applied.get(b);
      const padOk = ap.pad.every((v, i) => Math.abs(v - orig.get(b).origPad[i] * PAD_SCALE) <= 0.6);
      const outerGot = r2(applied.get(o).r), innerGot = r2(ap.r);
      out.push({
        outer: cls(o), inner: cls(b),
        outerR: outerGot, innerR: innerGot,
        padOk,
        ok: Math.abs(outerGot - RADIUS) <= 1 && Math.abs(innerGot - RADIUS) <= 1,
        origPad: orig.get(b).origPad.map(Math.round).join('/'), pad: ap.pad.map(Math.round).join('/'),
      });
    }
    // boxes that still have no radius at all (should be none)
    for (const e of all) {
      const o = orig.get(e);
      if (applied.get(e).r === 0 && o.uniform && o.isBox) sq.push({ cls: cls(e), tag: e.tagName });
    }
    return { out, sq, miss };
  })()`);
  for (const row of r.out) rows.push({ ...row, page: p });
  for (const row of r.sq) squares.push({ ...row, page: p });
  for (const m of r.miss) misses.push({ ...m, page: p });
}

const seen = new Map();
for (const r of rows) {
  const k = [r.outer, r.inner, r.outerR, r.innerR].join('|');
  if (!seen.has(k)) seen.set(k, { ...r, pages: new Set() });
  seen.get(k).pages.add(r.page);
}
console.log('outer (class)                          | inside (class)                         | outR inR | verdict | pad orig -> applied | pages');
console.log('---------------------------------------+---------------------------------------+----- -----+---------+---------------------+------');
let bad = 0, badPad = 0;
for (const v of [...seen.values()].sort((a, b) => b.outerR - a.outerR)) {
  if (!v.ok) bad++;
  if (!v.padOk) badPad++;
  console.log(
    (v.outer.slice(0, 38)).padEnd(39) + '| ' +
    (v.inner.slice(0, 38)).padEnd(39) + '| ' +
    String(v.outerR).padStart(4) + ' ' + String(v.innerR).padStart(4) +
    ' | ' + (v.ok ? '   ok    ' : '  FAIL   ') + ' | ' + (v.origPad + ' -> ' + v.pad).padEnd(19) + ' | ' + [...v.pages].join(',')
  );
}
console.log(`\n${rows.length} nested pairs across ${pages.length} pages, ${bad} not at 30px, ${badPad} with untouched padding`);

if (misses.length) {
  console.log(`\n${misses.length} boxes with an unexpected radius:`);
  for (const m of misses) console.log('   ', m.page, m.tag, m.cls || '(no class)', 'expected', m.exp, 'got', m.got, '| owner:', m.owner);
}

const sqSeen = new Map();
for (const s of squares) {
  const k = s.cls;
  if (!sqSeen.has(k)) sqSeen.set(k, { ...s, pages: new Set() });
  sqSeen.get(k).pages.add(s.page);
}
console.log(`\n${squares.length} boxes still left square (should be none):`);
for (const v of sqSeen.values()) console.log('   ', v.tag, v.cls.slice(0, 70), '|', [...v.pages].join(','));
ws.close(); chrome.kill(); server.close();



