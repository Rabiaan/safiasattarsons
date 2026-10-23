// build/copycheck.mjs - verify homepage copy from the design source survives into the build
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './data.mjs';

const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<\/(p|div|h1|h2|h3|h4|h5|h6|li|a|span|section|article|label|option|td|th|button|summary|figcaption)>/gi, ' \n ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s+/g, '\n')
    .trim();

const src = strip(fs.readFileSync('C:/Users/user1/Downloads/stitch_modern_website_redesign/code.html', 'utf8'));

const built = ['index', 'about', 'service', 'product', 'rice', 'oil', 'vegetables', 'fruits', 'spices', 'contact']
  .map((f) => strip(fs.readFileSync(path.join(ROOT, f + '.html'), 'utf8')))
  .join(' \n ');

const norm = (s) =>
  s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/©\s*\d{4}/g, '© YYYY')
    .replace(/[ \t]+/g, ' ')
    .trim();

const hayLines = built.split('\n').map(norm).filter(Boolean);

const chunks = src
  .split('\n')
  .map(norm)
  .filter((c) => c.length >= 30 && /[a-z]{3}/i.test(c));

const missing = chunks.filter((c) => !hayLines.some((h) => h.includes(c)));

console.log(`checked ${chunks.length} content chunks from the design source`);
if (missing.length === 0) {
  console.log('all source copy present in the build');
} else {
  console.log(`${missing.length} chunk(s) not found verbatim:\n`);
  missing.forEach((m) => console.log('  - ' + m.slice(0, 160)));
}
