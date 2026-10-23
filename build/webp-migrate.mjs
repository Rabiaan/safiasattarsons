// build/webp-migrate.mjs - point every reference at the new .webp files
// For each images/... reference: if the file is missing but the .webp twin exists, rewrite it.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './data.mjs';

const imgDir = path.join(ROOT, 'images');
const EXT = ['jpg', 'jpeg', 'png'];

const files = [
  ...['index', 'about', 'service', 'product', 'rice', 'oil', 'vegetables', 'fruits', 'spices', 'contact']
    .map((p) => path.join(ROOT, p + '.html')),
  path.join(ROOT, 'build', 'pages.mjs'),
  path.join(ROOT, 'build', 'theme.mjs'),
  path.join(ROOT, 'build', 'data.mjs'),
  ...fs.readdirSync(path.join(ROOT, 'build', 'legacy-data')).map((f) => path.join(ROOT, 'build', 'legacy-data', f)),
];

let total = 0;
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let src = fs.readFileSync(file, 'utf8');
  let n = 0;
  // match any images/... path with a jpg/jpeg/png extension
  src = src.replace(/images\/[A-Za-z0-9 _\-./&+()]+\.(jpg|jpeg|png)/gi, (ref) => {
    const base = ref.replace(/\.(jpg|jpeg|png)$/i, '');
    for (const e of EXT) {
      const candidate = `${base}.webp`;
      const disk = path.join(imgDir, candidate.slice('images/'.length));
      if (fs.existsSync(disk)) { n++; return candidate; }
      void e;
    }
    return ref; // no webp twin -> leave alone
  });
  if (n) { fs.writeFileSync(file, src, 'utf8'); }
  if (n) console.log(`  ${path.relative(ROOT, file).padEnd(28)} ${n} reference(s) -> .webp`);
  total += n;
}
console.log(`\n${total} reference(s) migrated to .webp`);

// report anything still pointing at a file that does not exist
const missing = new Set();
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const src = fs.readFileSync(file, 'utf8');
  for (const m of src.matchAll(/images\/[A-Za-z0-9 _\-./&+()]+\.(jpg|jpeg|png|webp|gif|svg|ico)/gi)) {
    const rel = m[0].slice('images/'.length);
    if (!fs.existsSync(path.join(imgDir, rel))) missing.add(m[0]);
  }
}
if (missing.size) {
  console.log('\nstill missing on disk:');
  for (const m of [...missing].sort()) console.log('  ' + m);
} else {
  console.log('every referenced image exists on disk');
}
