// build/rename-site-images.mjs - give the remaining site images clean, role-accurate names
//   images/download.png  ->  images/flag-france.png     (the French flag was mis-named)
//   images/oil 1.png     ->  images/gallery/oil-refined-cooking-oil.jpg
//   images/banner1.jpg   ->  images/banner-home-hero.jpg
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './data.mjs';

const imgDir = path.join(ROOT, 'images');

const MAP = {
  // --- language flags (download.png was the French flag) ---
  'Flag-Saudi-Arabia.webp': 'flag-saudi-arabia.webp',
  'Flag-United-States-of-America.webp': 'flag-united-states.webp',
  'download.png': 'flag-france.png',
  'indian.png': 'flag-hindi.png',
  'pakistan.png': 'flag-urdu.png',

  // --- page banners ---
  'banner1.jpg': 'banner-home-hero.jpg',
  'banner2.jpg': 'banner-agri-business.jpg',
  'banner3.jpg': 'banner-reel.jpg',
  'about_banner.jpg': 'banner-about.jpg',
  'about_img.jpg': 'banner-about-export-operation.jpg',
  'contact_banner.png': 'banner-contact.png',
  'rice_banner.jpg': 'banner-rice.jpg',
  'cooking_oil.jpg': 'banner-oil.jpg',
  'vegetabe_banner.jpg': 'banner-vegetables.jpg',
  'fruit_banner.jpg': 'banner-fruits.jpg',
  'spices_banner.jpg': 'banner-spices.jpg',
  'quality-sec.jpg': 'banner-quality-section.jpg',
  'service1.jpg': 'service-quality-inspection.jpg',
  'service2.jpg': 'service-logistics-cargo.jpg',
  'service3.jpg': 'banner-services.jpg',

  // --- product images used outside the catalogue ---
  'super_kernel_basmati.jpg': 'products/rice/rice-super-kernel-basmati.jpg',

  // --- about-page gallery ---
  'Safia Golden Sella 1121 Basmati Rice.png': 'gallery/rice-safia-golden-sella-1121.jpg',
  'Safia Punjabi 1121 Extra Long Grain Steam Basmati Rice.png': 'gallery/rice-safia-punjabi-1121-extra-long-grain.jpg',
  'Safia Creamy XXXL Sella 1122 Basmati Rice.png': 'gallery/rice-safia-creamy-xxxl-sella-1122.jpg',
  'veg1.jpeg': 'gallery/vegetable-fresh-produce.jpg',
  'oil 1.png': 'gallery/oil-refined-cooking-oil.jpg',
  'oil 1.jpeg': 'gallery/oil-amber-refined-cooking-oil.jpg',
  'oil2.jpeg': 'gallery/oil-cooking-oil-pour.jpg',
  'olive oil 2.png': 'gallery/oil-olive-oil.jpg',
  'cooking-oil1.jpg': 'gallery/oil-cooking-oil-bottle.jpg',
  'rice 2.jpeg': 'gallery/rice-quality-varieties.jpg',
  'rice 3.jpg': 'gallery/rice-basmati-grains.jpg',
  'pr-14-steam-rice-01-1.jpg': 'gallery/rice-steam-basmati.jpg',
  'Gemini_Generated_Image_r3kp72r3kp72r3kp.jpeg': 'gallery/gallery-rice-01.jpg',
  'Gemini_Generated_Image_36oss436oss436os.jpeg': 'gallery/gallery-rice-02.jpg',
  'gallery1.jpg': 'gallery/gallery-01.jpg',
  'gallery2.jpg': 'gallery/gallery-02.jpg',
  'gallery5.jpg': 'gallery/gallery-03.jpg',
};

// ---- move the files --------------------------------------------------------
const moved = [];
for (const [from, to] of Object.entries(MAP)) {
  const src = path.join(imgDir, from);
  const dst = path.join(imgDir, to);
  if (!fs.existsSync(src)) { console.log(`  ! not found: images/${from}`); continue; }
  if (fs.existsSync(dst)) { console.log(`  = already there: images/${to}`); continue; }
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.renameSync(src, dst);
  moved.push([`images/${from}`, `images/${to}`]);
}

// ---- rewrite the references in the build sources ---------------------------
const files = [
  path.join(ROOT, 'build', 'pages.mjs'),
  path.join(ROOT, 'build', 'theme.mjs'),
  path.join(ROOT, 'build', 'data.mjs'),
];
let refs = 0;
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let src = fs.readFileSync(file, 'utf8');
  for (const [from, to] of moved) {
    const needle = `images/${from.replace(/^images\//, '')}`;
    if (!src.includes(needle)) continue;
    const n = src.split(needle).length - 1;
    src = src.split(needle).join(`images/${to.replace(/^images\//, '')}`);
    refs += n;
  }
  fs.writeFileSync(file, src, 'utf8');
}

console.log(`\nrenamed ${moved.length} file(s), updated ${refs} reference(s)`);
for (const [from, to] of moved) console.log(`  ${from}  ->  ${to}`);
