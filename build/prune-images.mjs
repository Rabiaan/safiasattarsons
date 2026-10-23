// build/prune-images.mjs - delete every image the built site does not reference
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './data.mjs';

const PAGES = ['index', 'about', 'service', 'product', 'rice', 'oil', 'vegetables', 'fruits', 'spices', 'contact'];

// ---- collect every referenced image path -----------------------------------
const sources = [
  ...PAGES.map((p) => path.join(ROOT, p + '.html')),
  path.join(ROOT, 'build', 'pages.mjs'),
  path.join(ROOT, 'build', 'theme.mjs'),
  path.join(ROOT, 'build', 'data.mjs'),
  ...fs.readdirSync(path.join(ROOT, 'build', 'legacy-data')).map((f) => path.join(ROOT, 'build', 'legacy-data', f)),
];

const referenced = new Set();
for (const file of sources) {
  if (!fs.existsSync(file)) continue;
  const src = fs.readFileSync(file, 'utf8');
  for (const m of src.matchAll(/images\/[^"'`\s,)\]}]+/gi)) {
    let ref = m[0].replace(/[.,;:'"`]+$/, '');
    if (!/\.(png|jpe?g|webp|gif|svg|ico)$/i.test(ref)) continue;
    referenced.add(ref);
    referenced.add(decodeURIComponent(ref));
  }
}

// ---- walk the images folder ------------------------------------------------
const imgDir = path.join(ROOT, 'images');
const kept = [];
const removed = [];
let bytes = 0;

function walk(dir, rel = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const relPath = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) { walk(full, relPath); continue; }
    const sitePath = `images/${relPath}`;
    if (referenced.has(sitePath) || referenced.has(sitePath.replace(/\/\//g, '/'))) {
      kept.push(sitePath);
    } else {
      const size = fs.statSync(full).size;
      bytes += size;
      removed.push({ path: sitePath, size });
      fs.unlinkSync(full);
    }
  }
}
walk(imgDir);

// remove folders that are now empty
function pruneEmpty(dir, rel = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    pruneEmpty(full, rel ? `${rel}/${entry.name}` : entry.name);
    if (!fs.readdirSync(full).length) fs.rmdirSync(full);
  }
}
pruneEmpty(imgDir);

removed.sort((a, b) => b.size - a.size);
console.log(`kept ${kept.length} referenced image(s)`);
console.log(`removed ${removed.length} unused image(s) — ${(bytes / 1048576).toFixed(1)} MB freed`);
console.log('\nlargest removed:');
for (const r of removed.slice(0, 12)) console.log(`  ${(r.size / 1024).toFixed(0).padStart(7)} KB  ${r.path}`);
if (removed.length > 12) console.log(`  ... and ${removed.length - 12} more`);

fs.writeFileSync(
  path.join(ROOT, 'build', 'image-manifest.json'),
  JSON.stringify({ kept: kept.sort(), removed: removed.map((r) => r.path) }, null, 2)
);
