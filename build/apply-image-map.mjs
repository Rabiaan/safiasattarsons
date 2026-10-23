// build/apply-image-map.mjs - rewrite references to images converted PNG -> JPEG
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './data.mjs';

const mapPath = path.join(ROOT, 'build', 'image-map.json');
if (!fs.existsSync(mapPath)) {
  console.log('no image-map.json — nothing to rewrite');
  process.exit(0);
}
const map = JSON.parse(fs.readFileSync(mapPath, 'utf8').replace(/^\uFEFF/, ''));

// keys are relative to images/ with backslashes; match on the path portion only
const entries = Object.entries(map).map(([oldRel, newRel]) => ({
  from: oldRel.replace(/\\/g, '/'),
  to: newRel.replace(/\\/g, '/'),
}));

const targets = [
  ...['rice', 'cooking-oil', 'fruits', 'spices', 'vegetables'].map((f) => path.join(ROOT, 'build', 'legacy-data', f + '.js')),
  path.join(ROOT, 'build', 'pages.mjs'),
  path.join(ROOT, 'build', 'theme.mjs'),
];

let total = 0;
for (const file of targets) {
  if (!fs.existsSync(file)) continue;
  let src = fs.readFileSync(file, 'utf8');
  let n = 0;
  for (const { from, to } of entries) {
    // match the filename inside any path prefix, e.g. /images/spices/anise.png
    // case-insensitive: legacy data mixes Butter.png / butter.png
    const re = new RegExp('(/images/)?' + from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?=["\'\\s,)])', 'gi');
    src = src.replace(re, (m) => {
      n++;
      return (m.startsWith('/images/') ? '/images/' : '') + to;
    });
  }
  if (n) {
    fs.writeFileSync(file, src, 'utf8');
    total += n;
    console.log(`  ${path.relative(ROOT, file)}: ${n} reference(s) updated`);
  }
}
console.log(`rewrote ${total} image reference(s) across ${targets.length} files`);
