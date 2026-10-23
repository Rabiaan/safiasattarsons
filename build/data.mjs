// build/data.mjs - loads the legacy product catalogues and normalises them
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// legacy catalogues live in build/legacy-data (self-contained) or in <root>/js (original site)
export const LEGACY_JS = fs.existsSync(path.join(ROOT, 'build', 'legacy-data'))
  ? path.join(ROOT, 'build', 'legacy-data')
  : path.join(ROOT, 'js');

function sandboxRun(file) {
  const code = fs.readFileSync(path.join(LEGACY_JS, file), 'utf8');
  const box = {
    console,
    document: {
      getElementById: () => null,
      querySelectorAll: () => [],
      querySelector: () => null,
      createElement: () => ({
        style: {}, innerHTML: '', appendChild() {},
        classList: { toggle() {}, add() {}, contains: () => false },
      }),
      addEventListener: () => {},
      body: { style: {} },
      closest: () => null,
    },
    window: { location: { pathname: '/index.html' } },
    localStorage: { getItem: () => null, setItem() {} },
  };
  box.window.document = box.document;
  vm.createContext(box);
  const probe = `
;globalThis.__probe = {
  products: typeof products !== 'undefined' ? products : undefined,
  riceData: typeof riceData !== 'undefined' ? riceData : undefined,
  fruits:  typeof fruits  !== 'undefined' ? fruits  : undefined
};`;
  vm.runInContext(code + probe, box);
  return box.__probe;
}

// legacy paths were written for different base folders -> normalise to site-root relative
export function normaliseImage(src) {
  if (!src) return '';
  let p = String(src).trim().replace(/^(\.\.\/|\.\/|\/)+/, '');
  p = p.replace(/\\/g, '/');
  if (!/^images\//i.test(p)) p = 'images/' + p.replace(/^images\//i, '');
  return p.split('/').map(encodeURIComponent).join('/').replace(/^images%2F/i, 'images/');
}

/**
 * Grid-sized thumbnail for a catalogue image. Product grids render ~130
 * images at once, so the grid must use small derivatives — full-size photos
 * decode to hundreds of megabytes and exhaust browser memory.
 */
export function thumbImage(src) {
  if (!src) return '';
  let rel = String(src).replace(/^images\//i, '');
  if (/^products\//i.test(rel)) {
    rel = rel.replace(/^products\//i, ''); // images/products/<cat>/<name>.jpg
  } else {
    rel = rel.replace(/\.(png|webp)$/i, '.jpg');
  }
  const candidates = [
    `images/thumbs/${rel}`,
    `images/thumbs/${rel.replace(/\.\w+$/, '.webp')}`,
    `images/thumbs/${rel.replace(/\.\w+$/, '.jpg')}`,
  ];
  for (const c of candidates) {
    if (fs.existsSync(path.join(ROOT, c))) return c;
  }
  return src;
}

function shape(list, extra = {}) {
  return list.map((p, i) => {
    const image = normaliseImage((p.images || [])[0]);
    return {
    title: p.title,
    category: p.category || extra.category || 'Product',
    origin: p.origin || null,
    description: p.description || (p.features || []).slice(0, 2).join('. ') + '.',
    features: (p.features || []).slice(0, 4),
    details: p.details || '',
    image,
    thumb: thumbImage(image),
    slug: String(p.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    index: i,
  };
  });
}

const riceProbe = sandboxRun('rice.js');
const fruitProbe = sandboxRun('fruits.js');

export const rice = shape(riceProbe.products || riceProbe.riceData.products);
export const oil = shape(sandboxRun('cooking-oil.js').products);
export const fruits = shape(fruitProbe.products || fruitProbe.fruits.products);
export const spices = shape(sandboxRun('spices.js').products);
export const vegetables = shape(sandboxRun('vegetables.js').products);

export const catalogue = [
  { key: 'rice', label: 'Basmati Rice', short: 'Rice', href: 'rice.html', icon: 'grain', count: rice.length,
    blurb: 'Extra-long aromatic basmati and high-yield non-basmati varieties sourced from Punjab, Sindh and the Indus basin.' },
  { key: 'oil', label: 'Cooking Oils', short: 'Oil', href: 'oil.html', icon: 'oil_barrel', count: oil.length,
    blurb: 'Refined vegetable, seed, nut and tropical oils, ghee and clarified butter — bottled, jerrycans or flexitanks.' },
  { key: 'vegetables', label: 'Fresh Vegetables', short: 'Vegetables', href: 'vegetables.html', icon: 'eco', count: vegetables.length,
    blurb: 'Export-grade root, leafy, cruciferous and pod vegetables packed for Gulf hypermarkets and processors.' },
  { key: 'fruits', label: 'Fresh Fruits', short: 'Fruits', href: 'fruits.html', icon: 'nutrition', count: fruits.length,
    blurb: 'Temperate, tropical, citrus, berry and stone fruit selected from the finest farms and cold-chain delivered.' },
  { key: 'spices', label: 'Spices & Herbs', short: 'Spices', href: 'spices.html', icon: 'grain', count: spices.length,
    blurb: 'Whole and ground spices, aromatic herbs and signature blends — aromatic, pure and export grade.' },
];

export const allProducts = [
  ...rice.map((p) => ({ ...p, group: 'Rice', groupKey: 'rice' })),
  ...oil.map((p) => ({ ...p, group: 'Cooking Oils', groupKey: 'oil' })),
  ...vegetables.map((p) => ({ ...p, group: 'Vegetables', groupKey: 'vegetables' })),
  ...fruits.map((p) => ({ ...p, group: 'Fruits', groupKey: 'fruits' })),
  ...spices.map((p) => ({ ...p, group: 'Spices', groupKey: 'spices' })),
];

/** unique, sorted category list for a product set */
export function categoriesOf(list) {
  return [...new Set(list.map((p) => p.category))];
}

/** map a product to a filter slug */
export function slugify(v) {
  return String(v).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
