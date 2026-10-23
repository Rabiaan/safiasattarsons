// build/fixencoding.mjs - repair UTF-8 bytes that were decoded as cp1252 (mojibake)
// e.g. "—" (E2 80 94) -> "—" (U+2014)
import fs from 'node:fs';

// [unicode codepoint, cp1252 byte] for the 0x80-0x9F block
const CP1252_SPECIALS = [
  [0x20ac, 0x80], [0x0081, 0x81], [0x201a, 0x82], [0x0192, 0x83], [0x201e, 0x84],
  [0x2026, 0x85], [0x2020, 0x86], [0x2021, 0x87], [0x02c6, 0x88], [0x2030, 0x89],
  [0x0160, 0x8a], [0x2039, 0x8b], [0x0152, 0x8c], [0x008d, 0x8d], [0x017d, 0x8e],
  [0x008f, 0x8f], [0x0090, 0x90], [0x2018, 0x91], [0x2019, 0x92], [0x201c, 0x93],
  [0x201d, 0x94], [0x2022, 0x95], [0x2013, 0x96], [0x2014, 0x97], [0x02dc, 0x98],
  [0x2122, 0x99], [0x0161, 0x9a], [0x203a, 0x9b], [0x0153, 0x9c], [0x009d, 0x9d],
  [0x017e, 0x9e], [0x0178, 0x9f],
];

const BYTE_OF = new Map(CP1252_SPECIALS);
const CLASS = '[\\u0080-\\u00ff' + CP1252_SPECIALS.map(([cp]) => '\\u' + cp.toString(16).padStart(4, '0')).join('') + ']+';
const RUN = new RegExp(CLASS, 'g');

function byteOf(cp) {
  if (cp <= 0x7f) return cp;
  if (cp >= 0xa0 && cp <= 0xff) return cp;
  if (cp >= 0x80 && cp <= 0x9f) return cp; // undefined cp1252 slots stay as C1
  if (BYTE_OF.has(cp)) return BYTE_OF.get(cp);
  return null;
}

export function repair(s) {
  return s.replace(RUN, (run) => {
    const bytes = [];
    for (const ch of run) {
      const b = byteOf(ch.codePointAt(0));
      if (b === null) return run;
      bytes.push(b);
    }
    try {
      return new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(bytes));
    } catch {
      return run; // not valid UTF-8 -> genuinely Latin-1 text, leave as is
    }
  });
}

if (process.argv[1] && process.argv[1].endsWith('fixencoding.mjs')) {
  for (const file of process.argv.slice(2)) {
    const src = fs.readFileSync(file, 'utf8');
    const out = repair(src);
    if (out !== src) {
      fs.writeFileSync(file, out, 'utf8');
      console.log('repaired', file);
    } else {
      console.log('clean', file);
    }
  }
}
