// build/validate.mjs - lightweight structural checks on the generated pages
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './data.mjs';

const VOID = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
  'param', 'source', 'track', 'wbr', 'path', 'circle', 'rect', 'polyline',
]);

const files = [
  'index.html', 'about.html', 'service.html', 'product.html', 'rice.html',
  'oil.html', 'vegetables.html', 'fruits.html', 'spices.html', 'contact.html',
];

let failures = 0;

for (const f of files) {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const stack = [];
  const problems = [];

  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)(\/?)>/g;
  let m;
  while ((m = re.exec(html))) {
    const closing = m[1] === '/';
    const tag = m[2].toLowerCase();
    const selfClose = m[4] === '/';
    if (VOID.has(tag) || selfClose) continue;
    if (tag === 'script' || tag === 'style') {
      // skip raw text content
      const close = html.indexOf(`</${tag}>`, re.lastIndex);
      if (close !== -1) re.lastIndex = close + tag.length + 3;
      continue;
    }
    if (!closing) {
      stack.push({ tag, index: m.index });
    } else {
      const top = stack.pop();
      if (!top) {
        problems.push(`stray </${tag}> at ${m.index}`);
      } else if (top.tag !== tag) {
        problems.push(`</${tag}> at ${m.index} closes <${top.tag}> opened at ${top.index}`);
      }
    }
  }
  stack.forEach((t) => problems.push(`unclosed <${t.tag}> at ${t.index}`));

  // required landmarks
  const required = ['<header', '<main', '<footer', '<nav', 'id="languageModal"'];
  for (const r of required) {
    if (!html.includes(r)) problems.push(`missing ${r}`);
  }
  // no unresolved template literals
  if (html.includes('${')) problems.push('unresolved template literal');

  if (problems.length) {
    failures++;
    console.log(`\n✗ ${f}`);
    problems.slice(0, 12).forEach((p) => console.log('   ', p));
  } else {
    console.log(`✓ ${f}`);
  }
}

console.log(failures ? `\n${failures} page(s) with issues` : '\nall pages structurally valid');
process.exit(failures ? 1 : 0);
