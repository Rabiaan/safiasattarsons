import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/Users/user1/Downloads/stitch_modern_website_redesign/images/';

function webpSize(file) {
  const b = fs.readFileSync(file);
  if (b.length < 30 || b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') return null;
  const fourcc = b.toString('ascii', 12, 16);
  if (fourcc === 'VP8X') return { w: (b.readUIntLE(24, 3) & 0xffffff) + 1, h: (b.readUIntLE(27, 3) & 0xffffff) + 1, fmt: 'VP8X' };
  if (fourcc === 'VP8 ') return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff, fmt: 'VP8' };
  if (fourcc === 'VP8L') {
    const bits = b.readUInt32LE(21);
    return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1, fmt: 'VP8L' };
  }
  return { w: 0, h: 0, fmt: fourcc };
}
function jpgSize(file) {
  const b = fs.readFileSync(file);
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1];
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
      return { w: b.readUInt16BE(i + 7), h: b.readUInt16BE(i + 5) };
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
}

const stat = (dir) => {
  const files = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...stat(p));
    else if (/\.(webp|jpe?g|png)$/i.test(e.name)) files.push(p);
  }
  return files;
};

for (const sub of ['products', 'gallery', 'thumbs', '.']) {
  const dir = path.join(root, sub);
  if (!fs.existsSync(dir)) continue;
  const files = stat(dir);
  const rows = files.map((f) => {
    const s = f.endsWith('.webp') ? webpSize(f) : jpgSize(f);
    return { f, ...(s || { w: 0, h: 0 }) };
  });
  const maxW = Math.max(...rows.map((r) => r.w));
  const minW = Math.min(...rows.map((r) => r.w));
  const avgMB = (rows.reduce((a, r) => a + fs.statSync(r.f).size, 0) / 1048576).toFixed(1);
  const decMax = (maxW * 1000 * 4 / 1048576).toFixed(1);
  console.log(
    `${(sub === '.' ? 'images/ (root)' : 'images/' + sub).padEnd(20)} ${String(rows.length).padStart(4)} files  ` +
    `width min=${minW} max=${maxW}  ${avgMB} MB  max-decoded~${decMax} MB`
  );
  // histogram of widths
  const buckets = {};
  for (const r of rows) { const b = Math.floor(r.w / 400) * 400; buckets[b] = (buckets[b] || 0) + 1; }
  console.log('   width histogram:', Object.entries(buckets).sort((a, b) => a[0] - b[0]).map(([k, v]) => `${k}-${k + 399}:${v}`).join('  '));
}
