// build/rename-images.mjs
// Rename every catalogue image after the product it shows, and rewrite every
// reference to it in the vendored legacy catalogues.
//   images/rice/super_basmati.jpeg  ->  images/products/rice/rice-super-basmati.jpg
//   images/thumbs/spices/anise.jpg  ->  images/thumbs/spices/spice-anise.jpg
// Idempotent: re-running only fixes references that are still out of date.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, rice, oil, vegetables, fruits, spices } from './data.mjs';

const CATEGORIES = [
  { key: 'rice', prefix: 'rice', list: rice, file: 'rice.js' },
  { key: 'oil', prefix: 'oil', list: oil, file: 'cooking-oil.js' },
  { key: 'vegetables', prefix: 'vegetable', list: vegetables, file: 'vegetables.js' },
  { key: 'fruits', prefix: 'fruit', list: fruits, file: 'fruits.js' },
  { key: 'spices', prefix: 'spice', list: spices, file: 'spices.js' },
];

const slug = (s) =>
  String(s).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const imgDir = path.join(ROOT, 'images');
const listDir = (d) => (fs.existsSync(d) ? fs.readdirSync(d) : []);

// ---- 1. work out the new name for every product ---------------------------
const used = new Set();
const plan = [];
for (const cat of CATEGORIES) {
  for (const p of cat.list) {
    const oldRel = decodeURIComponent(p.image.replace(/^images\//, ''));
    const base0 = `${cat.prefix}-${slug(p.title)}`;
    let base = base0;
    if (used.has(base)) { let n = 2; while (used.has(`${base}-${n}`)) n++; base = `${base}-${n}`; }
    used.add(base);
    plan.push({ product: p.title, category: cat.key, oldRel, base, newRel: null, source: null });
  }
}
// products that share one image share one file
const byOld = new Map();
for (const item of plan) {
  if (byOld.has(item.oldRel)) {
    const first = byOld.get(item.oldRel);
    item.base = first.base;
    byOld.set(item.oldRel, first);
    item.sharedWith = first;
  } else {
    byOld.set(item.oldRel, item);
  }
}

// resolve the real file for each product and pick the final name
for (const item of plan) {
  const ifShared = item.sharedWith;
  const base = ifShared ? ifShared.base : item.base;
  const catDir = path.join(imgDir, 'products', item.category);

  // already renamed?  look for <base>.* in the category folder
  const existing = listDir(catDir).find((f) => f.slice(0, f.length - path.extname(f).length) === base);
  if (existing) {
    item.newRel = `products/${item.category}/${existing}`;
    item.source = path.join(catDir, existing);
    continue;
  }
  // still at the legacy location?
  const candidates = [
    path.join(imgDir, item.oldRel),
    path.join(imgDir, item.oldRel.replace(/\.\w+$/, '.jpg')),
    path.join(imgDir, item.oldRel.replace(/\.\w+$/, '.jpeg')),
    path.join(imgDir, item.oldRel.replace(/\.\w+$/, '.png')),
  ];
  const found = candidates.find((c) => fs.existsSync(c));
  const ext = found ? path.extname(found).slice(1) : 'jpg';
  item.newRel = `products/${item.category}/${base}.${ext}`;
  item.source = found || null;
}

// ---- 2. rewrite the vendored legacy catalogues -----------------------------
const legacyDir = path.join(ROOT, 'build', 'legacy-data');
for (const cat of CATEGORIES) {
  const file = path.join(legacyDir, cat.file);
  if (!fs.existsSync(file)) { console.log(`  ! missing ${cat.file}`); continue; }
  let src = fs.readFileSync(file, 'utf8');
  let n = 0;
  for (const item of plan) {
    if (item.category !== cat.key) continue;
    const newRef = `images/${item.newRel}`;
    const variants = new Set([item.oldRel]);
    for (const e of ['jpg', 'jpeg', 'png']) variants.add(item.oldRel.replace(/\.\w+$/, `.${e}`));
    for (const v of variants) {
      const needle = `images/${v}`;
      if (!src.includes(needle)) continue;
      const count = src.split(needle).length - 1;
      src = src.split(needle).join(newRef);
      n += count;
    }
  }
  fs.writeFileSync(file, src, 'utf8');
  console.log(`  ${cat.file}: ${n} image reference(s) rewritten`);
}

// ---- 3. move the files on disk ---------------------------------------------
let moved = 0, inPlace = 0, missing = 0;
for (const item of plan) {
  const dst = path.join(imgDir, item.newRel);
  if (fs.existsSync(dst)) { inPlace++; continue; }
  if (!item.source || !fs.existsSync(item.source)) { missing++; continue; }
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.renameSync(item.source, dst);
  moved++;
  const oldThumb = path.join(imgDir, 'thumbs', item.oldRel.replace(/\.\w+$/, '.jpg'));
  const newThumb = path.join(imgDir, 'thumbs', item.newRel.replace(/\.\w+$/, '.jpg'));
  if (fs.existsSync(oldThumb)) {
    fs.mkdirSync(path.dirname(newThumb), { recursive: true });
    fs.renameSync(oldThumb, newThumb);
  }
}
console.log(`  moved ${moved}, already in place ${inPlace}, not found ${missing}`);

// ---- 4. drop the now-empty legacy folders ---------------------------------
for (const dir of ['rice', 'oil', 'vegetabels', 'Fruits', 'spices', 'all rice']) {
  const p = path.join(imgDir, dir);
  if (fs.existsSync(p) && !listDir(p).length) fs.rmdirSync(p);
}

const map = {};
for (const item of plan) map[`images/${item.oldRel}`] = `images/${item.newRel}`;
fs.writeFileSync(path.join(ROOT, 'build', 'rename-map.json'), JSON.stringify(map, null, 2));
console.log(`\n${new Set(plan.map((p) => p.newRel)).size} image file(s) named after their product`);
