// build/build.mjs - writes the redesigned static pages to the site root
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { shell } from './theme.mjs';
import { ROOT } from './data.mjs';
import {
  homeBody,
  aboutBody,
  serviceBody,
  productBody,
  riceBody,
  oilBody,
  vegetablesBody,
  fruitsBody,
  spicesBody,
  contactBody,
} from './pages.mjs';
import { rice, oil, fruits, spices, vegetables, allProducts } from './data.mjs';

const pages = [
  { file: 'index.html', active: 'Home', title: null, body: homeBody() },
  { file: 'about.html', active: 'About Us', title: 'About Us', body: aboutBody() },
  { file: 'service.html', active: 'Services', title: 'Services', body: serviceBody() },
  { file: 'product.html', active: 'Products', title: 'Products', body: productBody() },
  { file: 'rice.html', active: 'Products', title: 'Premium Rice Varieties', body: riceBody() },
  { file: 'oil.html', active: 'Products', title: 'Premium Cooking Oils', body: oilBody() },
  { file: 'vegetables.html', active: 'Products', title: 'Premium Fresh Vegetables', body: vegetablesBody() },
  { file: 'fruits.html', active: 'Products', title: 'Premium Fresh Fruits', body: fruitsBody() },
  { file: 'spices.html', active: 'Products', title: 'Premium Spices & Herbs', body: spicesBody() },
  { file: 'contact.html', active: 'Contact', title: 'Contact', body: contactBody() },
];

for (const p of pages) {
  const html = shell({ title: p.title, active: p.active, body: p.body });
  fs.writeFileSync(path.join(ROOT, p.file), html, 'utf8');
  console.log(`✓ ${p.file.padEnd(18)} ${(html.length / 1024).toFixed(1)} KB`);
}

/* ------------------------------------------------------------------ *
 *  post-process: decoding="async" on every image (keeps decode off the
 *  main thread and avoids memory spikes while scrolling)
 * ------------------------------------------------------------------ */
for (const p of pages) {
  const file = path.join(ROOT, p.file);
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<img\b[^>]*>/gi, (tag) =>
    /\bdecoding=/i.test(tag) ? tag : tag.replace(/\s*\/?>$/, ' decoding="async">')
  );
  fs.writeFileSync(file, html, 'utf8');
}

/* ------------------------------------------------------------------ *
 *  sanity checks — every referenced local image must exist
 * ------------------------------------------------------------------ */
const missing = new Map();
for (const p of pages) {
  const html = fs.readFileSync(path.join(ROOT, p.file), 'utf8');
  const refs = [...html.matchAll(/src="([^"]+\.(?:png|jpe?g|webp|svg|gif))"/gi)].map((m) => m[1]);
  for (const r of refs) {
    if (/^(https?:)?\/\//.test(r) || r.startsWith('data:')) continue;
    const decoded = decodeURIComponent(r);
    if (!fs.existsSync(path.join(ROOT, decoded))) {
      if (!missing.has(decoded)) missing.set(decoded, new Set());
      missing.get(decoded).add(p.file);
    }
  }
}
if (missing.size) {
  console.log('\n⚠ missing images:');
  for (const [f, used] of missing) console.log('   ', f, '←', [...used].join(', '));
} else {
  console.log('\n✓ all local image references resolve');
}

/* ------------------------------------------------------------------ *
 *  memory budget — a browser decodes images at full resolution, so a
 *  few oversized files can exhaust RAM and kill the tab. Flag anything
 *  whose decoded bitmap would exceed 24 MB.
 * ------------------------------------------------------------------ */
const sizeCache = new Map();
function decodedMB(file) {
  if (sizeCache.has(file)) return sizeCache.get(file);
  let mb = 0;
  try {
      const buf = fs.readFileSync(file);
      // PNG: width/height live in the IHDR chunk (bytes 16..24)
      if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
        mb = ((buf.readUInt32BE(16) * buf.readUInt32BE(20) * 4) / 1048576);
      } else if (buf.length > 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
        // WebP: VP8X (extended), VP8 (lossy) or VP8L (lossless) chunk
        const fourcc = buf.toString('ascii', 12, 16);
        let w = 0, h = 0;
        if (fourcc === 'VP8X') {
          w = (buf.readUIntLE(24, 3) & 0xffffff) + 1;
          h = (buf.readUIntLE(27, 3) & 0xffffff) + 1;
        } else if (fourcc === 'VP8 ') {
          w = buf.readUInt16LE(26) & 0x3fff;
          h = buf.readUInt16LE(28) & 0x3fff;
        } else if (fourcc === 'VP8L') {
          const bits = buf.readUInt32LE(21);
          w = (bits & 0x3fff) + 1;
          h = ((bits >> 14) & 0x3fff) + 1;
        }
        mb = (w * h * 4) / 1048576;
      } else {
      // JPEG: walk the SOFn marker
      let i = 2;
      while (i < buf.length - 9) {
        if (buf[i] !== 0xff) { i++; continue; }
        const marker = buf[i + 1];
        if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
          const h = buf.readUInt16BE(i + 5);
          const w = buf.readUInt16BE(i + 7);
          mb = (w * h * 4) / 1048576;
          break;
        }
        i += 2 + buf.readUInt16BE(i + 2);
      }
    }
  } catch {}
  sizeCache.set(file, mb);
  return mb;
}

const heavy = new Map();
for (const p of pages) {
  const html = fs.readFileSync(path.join(ROOT, p.file), 'utf8');
  const refs = [...html.matchAll(/src="([^"]+\.(?:png|jpe?g|webp|gif))"/gi)].map((m) => m[1]);
  for (const r of refs) {
    if (/^(https?:)?\/\//.test(r) || r.startsWith('data:')) continue;
    const decoded = decodeURIComponent(r);
    const full = path.join(ROOT, decoded);
    if (!fs.existsSync(full)) continue;
    const mb = decodedMB(full);
    if (mb > 24 && !heavy.has(decoded)) heavy.set(decoded, { mb, used: new Set() });
    if (heavy.has(decoded)) heavy.get(decoded).used.add(p.file);
  }
}
if (heavy.size) {
  console.log('\n⚠ oversized images (>24 MB decoded) — these can crash the browser:');
  for (const [f, v] of [...heavy].sort((a, b) => b[1].mb - a[1].mb)) {
    console.log(`    ${f} — ${v.mb.toFixed(0)} MB decoded ← ${[...v.used].join(', ')}`);
  }
  console.log('    run: powershell -File build\\optimize-images.ps1');
} else {
  console.log('✓ no oversized images (all under the 24 MB decoded budget)');
}

console.log('\ncatalogue:', {
  rice: rice.length,
  oil: oil.length,
  vegetables: vegetables.length,
  fruits: fruits.length,
  spices: spices.length,
  total: allProducts.length,
});
