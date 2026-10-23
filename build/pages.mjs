// build/pages.mjs - page bodies for the redesigned Safia Sattar Sons site
import {
  site,
  img,
  pageHero,
  sectionHeading,
  filterBar,
  productCard,
  marqueeBand,
  trustBand,
  statsBand,
  inquiryCta,
  faqBlock,
} from './theme.mjs';
import { rice, oil, fruits, spices, vegetables, catalogue, allProducts, slugify } from './data.mjs';

/* ------------------------------------------------------------------ *
 *  helpers
 * ------------------------------------------------------------------ */

export function withFilterCats(list, extra = () => []) {
  return list.map((p) => ({
    ...p,
    filterCats: [...new Set([slugify(p.category), ...extra(p)].filter(Boolean))],
  }));
}

function pick(list, n, offset = 0) {
  return list.slice(offset, offset + n);
}

const featured = {
  rice: pick(rice, 3),
  oil: pick(oil, 3),
  vegetables: pick(vegetables, 3),
  fruits: pick(fruits, 3),
  spices: pick(spices, 3),
};

/* ------------------------------------------------------------------ *
 *  HOME
 * ------------------------------------------------------------------ */

export function homeBody() {
  const homeCards = [
    ...featured.rice.map((p) => ({ ...p, filterCategories: 'rice' })),
    ...featured.oil.map((p) => ({ ...p, filterCategories: 'oil' })),
    ...featured.vegetables.map((p) => ({ ...p, filterCategories: 'vegetables' })),
    ...featured.fruits.map((p) => ({ ...p, filterCategories: 'fruits' })),
    ...featured.spices.map((p) => ({ ...p, filterCategories: 'spices' })),
  ];

  return `
<!-- ============================ HERO ============================ -->
<section class="max-w-7xl mx-auto px-6 md:px-margin pt-6 pb-space-lg" id="home" data-hero>
  <div class="relative w-full rounded-lg md:rounded-xl overflow-hidden bg-primary-container text-surface-container-lowest min-h-[580px] lg:min-h-[640px] flex flex-col justify-between p-6 md:p-12 border border-outline-variant/20">
    <div class="absolute inset-0 z-0">
      <img class="w-full h-full object-cover opacity-85 object-center" src="${img('images/banner-home-hero.webp')}" alt="Golden rice fields harvested at sunrise" data-hero-img/>
      <div class="absolute inset-0 bg-gradient-to-t from-primary-container/95 via-primary-container/40 to-primary-container/60"></div>
    </div>
    <div class="relative z-10 flex flex-wrap items-center justify-between gap-4" data-hero-item>
      <div class="flex flex-wrap items-center gap-2">
        <span class="px-3.5 py-1.5 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-surface-container-lowest text-label-pill font-label-pill border border-surface-container-lowest/30">Rice Trading</span>
        <span class="px-3.5 py-1.5 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-surface-container-lowest text-label-pill font-label-pill border border-surface-container-lowest/30">Edible Oils</span>
        <span class="px-3.5 py-1.5 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-surface-container-lowest text-label-pill font-label-pill border border-surface-container-lowest/30">Global Supply Chain</span>
      </div>
      <div class="flex items-center gap-3 px-4 py-1.5 rounded-full bg-surface-container-lowest/20 backdrop-blur-md border border-surface-container-lowest/30">
        <span class="text-label-numeric font-label-numeric text-surface-container-lowest tracking-wider">300+ Satisfied Importers</span>
        <span class="w-6 h-6 rounded-full bg-secondary-fixed text-tertiary flex items-center justify-center font-bold text-xs">+</span>
      </div>
    </div>
    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-16">
      <div class="lg:col-span-4 bg-surface-container-lowest/95 backdrop-blur-md rounded-lg p-5 text-on-surface border border-surface-container-highest shadow-xl hidden md:block max-w-sm" data-hero-item>
        <div class="w-full h-36 rounded-md overflow-hidden mb-4 relative">
          <img class="w-full h-full object-cover" src="${img('images/products/rice/rice-super-kernel-basmati.webp')}" alt="Super Kernel Basmati rice grains"/>
          <span class="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 text-label-pill font-label-pill text-on-surface">1121 Steam Basmati</span>
        </div>
        <div class="flex items-start gap-3">
          <div class="w-7 h-7 rounded-full bg-secondary-fixed flex-shrink-0 flex items-center justify-center text-tertiary"><span class="material-symbols-outlined text-sm">verified</span></div>
          <p class="text-body-sm font-body-sm text-on-surface-variant">Direct farm-to-port verified supply chains connecting Punjab paddy plains to Jeddah and Dubai commercial hubs.</p>
        </div>
      </div>
      <div class="lg:col-span-8 flex flex-col justify-end lg:items-end text-left lg:text-right" data-hero-item>
        <div class="mb-4">
          <div class="text-metric-huge font-metric-huge text-secondary-fixed leading-none tracking-tight"><span data-count="320" data-duration="1.8">320</span><span class="text-headline-lg font-headline-lg text-surface-container-lowest">k</span></div>
          <div class="text-body-sm font-body-sm text-surface-container-highest mt-1">Metric Tons Annual Commodity Turnover</div>
        </div>
        <h1 class="text-display-lg md:text-display-xl font-display-xl uppercase tracking-tighter text-surface-container-lowest leading-[1.05] max-w-2xl">
          <span class="inline-flex items-center gap-2 align-middle"><span class="w-9 h-9 rounded-full bg-secondary-fixed inline-flex items-center justify-center text-tertiary text-lg font-bold">●</span>Partner In</span>
          Agricultural Excellence
        </h1>
        <p class="text-body-md font-body-md text-surface-container-high max-w-xl mt-4 lg:ml-auto">${site.hero}</p>
      </div>
    </div>
  </div>
</section>

<!-- ==================== 01 · CULTIVATING EXCELLENCE ==================== -->
<section class="max-w-7xl mx-auto px-6 md:px-margin py-space-xl" id="about">
  <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-outline-variant/40">
    <div>
      <span class="text-label-numeric font-label-numeric text-on-surface-variant text-sm block mb-2">01</span>
      <span class="inline-block px-3 py-1 rounded-full bg-primary text-on-primary text-label-pill font-label-pill mb-3">Cultivating Excellence</span>
      <h2 class="text-headline-xl font-headline-xl text-primary max-w-2xl">From fertile Basmati plains to global ports, precision quality in every shipment.</h2>
    </div>
    <p class="text-body-md font-body-md text-on-surface-variant max-w-md mt-4 md:mt-0">Positioned as one of Saudia's leading exporters and top dealers in rice, we bridge traditional agro-farming heritage with sortex purity standards.</p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
    <div class="reveal md:col-span-4 bg-surface-container-lowest p-8 rounded-lg border border-outline-variant/30 flex flex-col justify-between">
      <div>
        <div class="w-10 h-10 rounded-full bg-secondary-fixed/50 flex items-center justify-center mb-6"><span class="material-symbols-outlined text-secondary font-bold">agriculture</span></div>
        <div class="text-metric-huge font-metric-huge text-on-surface tracking-tight mb-1"><span data-count="50">50</span>K<span class="text-secondary">+</span></div>
        <div class="text-body-md font-body-md text-on-surface-variant font-medium">Metric Tons Exported Annually</div>
      </div>
      <div class="mt-8 space-y-4 pt-6 border-t border-outline-variant/20">
        <div class="flex items-center justify-between py-2 border-b border-outline-variant/10"><span class="text-body-sm font-body-sm font-semibold text-on-surface">Purity Guarantee</span><span class="text-label-pill font-label-pill text-secondary">99.8% Sortex</span></div>
        <div class="flex items-center justify-between py-2 border-b border-outline-variant/10"><span class="text-body-sm font-body-sm font-semibold text-on-surface">Milling Technology</span><span class="text-label-pill font-label-pill text-on-surface-variant">Bühler Ultra-Clean</span></div>
        <div class="flex items-center justify-between py-2"><span class="text-body-sm font-body-sm font-semibold text-on-surface">Traceability</span><span class="text-label-pill font-label-pill text-on-surface-variant">Farm-to-Container</span></div>
      </div>
    </div>
    <div class="reveal md:col-span-4 rounded-lg overflow-hidden border border-outline-variant/30 relative flex flex-col justify-end min-h-[380px] group">
      <img class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="${img('images/banner-about.webp')}" alt="Aerial view of golden paddy fields"/>
      <div class="absolute inset-0 bg-gradient-to-t from-primary-container/90 via-primary-container/30 to-transparent"></div>
      <div class="relative z-10 p-6 text-surface-container-lowest">
        <span class="px-2.5 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-label-pill font-label-pill inline-block mb-2">Modern Agritech</span>
        <h3 class="text-headline-md font-headline-md text-surface-container-lowest">Precision Farming &amp; Sourcing</h3>
        <p class="text-body-sm font-body-sm text-surface-container-highest mt-1">Direct contracts with select growers in Punjab's fertile river basins.</p>
      </div>
    </div>
    <div class="reveal md:col-span-4 flex flex-col gap-gutter">
      <div class="bg-secondary-fixed text-on-secondary-fixed p-6 rounded-lg flex flex-col justify-between flex-1 border border-outline-variant/30">
        <div class="flex items-center justify-between">
          <span class="text-label-pill font-label-pill uppercase tracking-wider">Logistical Throughput</span>
          <span class="w-8 h-8 rounded-full bg-on-secondary-fixed text-secondary-fixed flex items-center justify-center"><span class="material-symbols-outlined text-sm">trending_up</span></span>
        </div>
        <div class="my-4">
          <div class="text-label-numeric font-label-numeric text-xs font-semibold uppercase opacity-80">Shipment Reliability</div>
          <div class="text-metric-huge font-metric-huge leading-none mt-1"><span data-count="300">300</span><span class="text-2xl font-bold">%</span></div>
        </div>
        <p class="text-body-sm font-body-sm opacity-90">Accelerated Gulf delivery routes via Jeddah Islamic Port &amp; Jebel Ali Hub.</p>
      </div>
      <div class="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/30 flex items-center justify-between">
        <div>
          <div class="text-headline-lg font-headline-lg text-primary"><span data-count="30">30</span>+</div>
          <div class="text-body-sm font-body-sm text-on-surface-variant">Modern Climate Warehouses</div>
        </div>
        <div class="h-12 w-12 rounded-full bg-surface-container flex items-center justify-center text-primary"><span class="material-symbols-outlined">warehouse</span></div>
      </div>
    </div>
  </div>
  ${trustBand()}
</section>

<!-- ==================== 02 · OPERATIONAL CAPABILITIES ==================== -->
<section class="max-w-7xl mx-auto px-6 md:px-margin py-space-lg">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface-container-low rounded-lg md:rounded-xl p-6 md:p-12 border border-outline-variant/20">
    <div class="lg:col-span-5 relative rounded-lg overflow-hidden min-h-[420px]">
      <img class="w-full h-full object-cover absolute inset-0" src="${img('images/banner-agri-business.webp')}" alt="Agricultural operation in the field"/>
      <div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
      <div class="absolute top-4 left-4 flex gap-2">
        <span class="px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-label-pill font-label-pill text-primary">Agri-Business</span>
        <span class="px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-label-pill font-label-pill text-primary">Support</span>
      </div>
      <div class="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/95 backdrop-blur-md p-4 rounded-md border border-outline-variant/30 flex items-center justify-between">
        <div>
          <div class="text-headline-lg font-headline-lg text-primary leading-none"><span data-count="86">86</span>%</div>
          <div class="text-label-pill font-label-pill text-on-surface-variant mt-1">Client Retention Rate</div>
        </div>
        <div class="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-tertiary"><span class="material-symbols-outlined text-sm">handshake</span></div>
      </div>
    </div>
    <div class="lg:col-span-7 flex flex-col justify-between pl-0 lg:pl-6">
      <div>
        <div class="flex items-center gap-2 mb-4">
          <span class="text-label-numeric font-label-numeric text-on-surface-variant">02</span>
          <span class="inline-block w-8 h-[1px] bg-outline-variant"></span>
          <span class="text-label-pill font-label-pill uppercase text-secondary">Global Agricultural Operations</span>
        </div>
        <h3 class="text-headline-xl font-headline-xl text-primary leading-tight mb-4">Whether you are a hypermarket chain, industrial processor, or global distributor.</h3>
        <p class="text-body-md font-body-md text-on-surface-variant mb-8">SAFIA SATTAR SONS is dedicated to providing high-yield, pure rice varieties and refined cooking oils tailored for rigorous culinary standards across the GCC and international corridors.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-surface-container-lowest p-5 rounded-lg border border-outline-variant/20 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-3">
            <span class="text-label-pill font-label-pill text-on-surface font-semibold">Volume Growth</span>
            <span class="w-6 h-6 rounded-full bg-secondary-fixed/50 flex items-center justify-center"><span class="material-symbols-outlined text-xs">bar_chart</span></span>
          </div>
          <div class="flex items-end gap-1.5 h-16 pt-2">
            <div class="flex-1 bg-surface-container-highest rounded-t h-[40%]"></div>
            <div class="flex-1 bg-surface-container-highest rounded-t h-[55%]"></div>
            <div class="flex-1 bg-surface-container-highest rounded-t h-[70%]"></div>
            <div class="flex-1 bg-surface-container-highest rounded-t h-[60%]"></div>
            <div class="flex-1 bg-surface-container-highest rounded-t h-[85%]"></div>
            <div class="flex-1 bg-secondary rounded-t h-[100%]"></div>
          </div>
          <div class="text-label-numeric font-label-numeric text-xs text-on-surface-variant mt-2 text-right">400+ Active Workforce</div>
        </div>
        <div class="bg-primary text-on-primary p-6 rounded-lg flex flex-col justify-between">
          <div class="text-label-pill font-label-pill text-secondary-fixed uppercase">Direct Supply Inquiries</div>
          <div class="text-headline-md font-headline-md font-bold mt-2 mb-4">Order Bulk Consignments</div>
          <a class="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-full bg-surface-container-lowest text-on-surface text-body-sm font-body-sm font-semibold hover:bg-secondary-fixed transition-colors" href="contact.html">
            <span>Request Quotation</span>
            <span class="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center"><span class="material-symbols-outlined text-xs">arrow_forward</span></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ==================== 03 · PRODUCT PORTFOLIO ==================== -->
<section class="max-w-7xl mx-auto px-6 md:px-margin py-space-xl" id="products">
  <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-outline-variant/30">
    <div class="flex items-center gap-4">
      <span class="text-label-numeric font-label-numeric text-on-surface-variant text-base">03</span>
      <h2 class="text-headline-xl font-headline-xl text-primary">Our Products</h2>
    </div>
    <a class="flex items-center gap-2 mt-4 md:mt-0 px-5 py-2 rounded-full border border-outline-variant/30 bg-surface-container text-primary text-label-pill font-label-pill hover:bg-secondary-fixed transition-colors" href="product.html">Full Catalogue <span class="material-symbols-outlined text-[16px]">arrow_forward</span></a>
  </div>

  <!-- bento product features -->
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-12">
    <div class="reveal lg:col-span-7 bg-surface-container-lowest rounded-lg border border-outline-variant/30 p-6 md:p-8 flex flex-col justify-between">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div class="h-80 rounded-md overflow-hidden relative">
          <img alt="Super Kernel Basmati rice grains" class="w-full h-full object-cover" loading="lazy" src="${img('images/gallery/rice-super-kernel-basmati-grains.webp')}"/>
          <div class="absolute bottom-3 left-3 flex gap-1.5">
            <span class="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md text-surface-container-lowest text-label-pill font-label-pill">Agri-Business</span>
            <span class="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md text-surface-container-lowest text-label-pill font-label-pill">Seeds</span>
          </div>
        </div>
        <div>
          <span class="text-label-pill font-label-pill text-secondary uppercase block mb-1">Flagship Export</span>
          <h3 class="text-headline-lg font-headline-lg text-primary mb-3">Premium 1121 &amp; Super Kernel Basmati Rice</h3>
          <p class="text-body-sm font-body-sm text-on-surface-variant mb-6">Extra-long grain (8.35mm+ avg.), aromatic aged basmati, Sortex cleaned and double polished for royal banquets and premium retail packaging.</p>
          <div class="space-y-2 text-label-numeric font-label-numeric text-xs text-on-surface-variant">
            <div class="flex justify-between py-1.5 border-b border-outline-variant/15"><span>Grain Length</span><span class="font-semibold text-on-surface">8.35 mm - 8.40 mm</span></div>
            <div class="flex justify-between py-1.5 border-b border-outline-variant/15"><span>Moisture Content</span><span class="font-semibold text-on-surface">Max 12.0%</span></div>
            <div class="flex justify-between py-1.5"><span>Packaging Units</span><span class="font-semibold text-on-surface">5kg, 10kg, 20kg, 40kg Non-Woven &amp; Jute</span></div>
          </div>
          <div class="mt-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between">
            <div>
              <span class="text-label-numeric font-label-numeric text-xs text-on-surface-variant">Shipment Lead</span>
              <div class="text-body-sm font-body-sm font-bold text-primary">7–10 Days to Gulf Ports</div>
            </div>
            <a class="px-4 py-2 rounded-full bg-surface-container hover:bg-secondary-fixed text-primary text-label-pill font-label-pill transition-colors" href="rice.html">Inquire Rice</a>
          </div>
        </div>
      </div>
    </div>
    <div class="lg:col-span-5 flex flex-col gap-gutter">
      <div class="reveal bg-surface-container-lowest rounded-lg border border-outline-variant/30 p-6 flex flex-col justify-between">
        <div class="flex items-start justify-between gap-4 mb-4">
          <div>
            <span class="text-label-pill font-label-pill text-secondary uppercase">Pure Refining</span>
            <h4 class="text-headline-md font-headline-md text-primary mt-1">Refined Pure Cooking Oils</h4>
          </div>
          <div class="w-10 h-10 rounded-full bg-secondary-fixed/40 flex items-center justify-center flex-shrink-0"><span class="material-symbols-outlined text-secondary">oil_barrel</span></div>
        </div>
        <p class="text-body-sm font-body-sm text-on-surface-variant mb-4">Pure sunflower, refined corn, and double-fractionated palm olein oils sourced and packaged under rigorous SASO food safety specifications.</p>
        <div class="h-28 rounded overflow-hidden mb-4 relative">
          <img alt="Amber refined cooking oil poured from a bottle" class="w-full h-full object-cover" loading="lazy" src="${img('images/gallery/oil-amber-refined-cooking-oil.webp')}"/>
          <span class="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary/80 text-surface-container-lowest text-label-pill font-label-pill text-xs">Bulk Flexi-tanks &amp; Jerrycans</span>
        </div>
        <div class="flex items-center justify-between pt-3 border-t border-outline-variant/15">
          <span class="text-label-numeric font-label-numeric text-xs text-on-surface-variant">Origin: UAE · Malaysia · EU</span>
          <a class="text-label-pill font-label-pill text-primary hover:text-secondary flex items-center gap-1" href="oil.html"><span>Specifications</span><span class="material-symbols-outlined text-xs">arrow_forward</span></a>
        </div>
      </div>
      <div class="reveal bg-surface-container-lowest rounded-lg border border-outline-variant/30 p-6 flex items-center justify-between gap-4">
        <div>
          <span class="text-label-pill font-label-pill text-secondary uppercase">Secondary Commodities</span>
          <h4 class="text-headline-md font-headline-md text-primary mt-0.5">Natural &amp; Organic Pulses</h4>
          <p class="text-body-sm font-body-sm text-on-surface-variant mt-1">Chickpeas, lentils, and specialty sesame seeds.</p>
        </div>
        <a class="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-secondary-fixed hover:text-tertiary transition-colors flex-shrink-0" href="contact.html"><span class="material-symbols-outlined text-sm">north_east</span></a>
      </div>
    </div>
  </div>

  <!-- category rail -->
  <div class="grid grid-cols-2 lg:grid-cols-5 gap-gutter mb-12">
    ${catalogue
      .map(
        (c) => `<a href="${c.href}" class="reveal group bg-surface-container-lowest rounded-lg border border-outline-variant/30 p-5 flex flex-col justify-between min-h-[150px] hover:border-secondary/50 transition-colors">
      <div class="w-9 h-9 rounded-full bg-secondary-fixed/40 text-secondary flex items-center justify-center"><span class="material-symbols-outlined text-[18px]">${c.icon}</span></div>
      <div class="mt-4">
        <div class="text-body-sm font-body-sm font-bold text-primary">${c.label}</div>
        <div class="text-label-numeric font-label-numeric text-[11px] uppercase tracking-wider text-on-surface-variant mt-0.5"><span data-count="${c.count}">${c.count}</span> products</div>
      </div>
    </a>`
      )
      .join('\n    ')}
  </div>

  <!-- filters -->
  ${filterBar({
    items: [
      { value: 'all', label: 'All Products' },
      { value: 'rice', label: 'Basmati Rice' },
      { value: 'oil', label: 'Cooking Oils' },
      { value: 'vegetables', label: 'Vegetables' },
      { value: 'fruits', label: 'Fruits' },
      { value: 'spices', label: 'Spices' },
    ],
    target: '#homeProducts',
    counterId: 'homeCount',
    count: homeCards.length,
  })}

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter" id="homeProducts">
    ${homeCards.map((p) => productCard(p, { badge: p.category })).join('\n    ')}
  </div>
</section>

${marqueeBand()}

<!-- ==================== 04 · SERVICES & ENDORSEMENT ==================== -->
<section class="max-w-7xl mx-auto px-6 md:px-margin py-space-xl" id="services">
  <div class="flex items-center gap-3 mb-6">
    <span class="text-label-numeric font-label-numeric text-on-surface-variant">04</span>
    <div class="flex items-center gap-1 text-secondary">
      <span class="text-headline-md font-headline-md font-bold"><span data-count="4.9" data-decimals="1">4.9</span></span>
      ${'<span class="material-symbols-outlined text-lg" style="font-variation-settings: \'FILL\' 1;">star</span>'.repeat(5)}
    </div>
  </div>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
    <div class="lg:col-span-7">
      <div class="text-metric-huge font-metric-huge text-on-surface leading-none mb-4 font-serif">“</div>
      <blockquote class="text-headline-lg md:text-headline-xl font-headline-xl text-primary leading-snug">Since partnering with Safia Sattar Sons for our Basmati supply in Saudi Arabia and the Gulf, grain purity and delivery punctuality have been consistently unmatched.</blockquote>
      <div class="mt-8 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center font-bold text-on-secondary-fixed">TR</div>
        <div>
          <div class="text-body-md font-body-md font-bold text-primary">Tariq Al-Rashidi</div>
          <div class="text-body-sm font-body-sm text-on-surface-variant">Director of Procurement, Gulf FMCG Consortium, Riyadh</div>
        </div>
      </div>
    </div>
    <div class="lg:col-span-5 grid grid-cols-2 gap-4">
      <div class="h-64 rounded-lg overflow-hidden"><img class="w-full h-full object-cover" src="${img('images/service-quality-inspection.webp')}" alt="Quality inspector checking harvested basmati"/></div>
      <div class="h-64 rounded-lg overflow-hidden"><img class="w-full h-full object-cover" src="${img('images/service-logistics-cargo.webp')}" alt="Logistics manager inspecting containerised cargo"/></div>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-16 pt-12 border-t border-outline-variant/30">
    ${[
      { icon: 'filter_alt', title: 'Quality Rice Milling &amp; Sorting', body: 'Elevate your retail lines with our select rice varieties, guaranteed for elongation, aroma, and laser sortex cleanliness.', tag: '01 / MILLING' },
      { icon: 'opacity', title: 'Bulk Oil Sourcing &amp; Bottling', body: 'We source and supply certified edible oils internationally, offering customized packaging from consumer bottles to flexitanks.', tag: '02 / EDIBLE OILS' },
      { icon: 'local_shipping', title: 'Customs &amp; Global Shipping', body: 'End-to-end maritime logistics, customs clearance, SASO conformity documentation, and multi-warehouse distribution.', tag: '03 / LOGISTICS' },
    ]
      .map(
        (s) => `<a href="service.html" class="reveal bg-surface-container-low p-6 rounded-lg border border-outline-variant/20 flex flex-col justify-between hover:border-secondary/50 transition-colors">
      <div>
        <div class="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary mb-4 shadow-sm"><span class="material-symbols-outlined">${s.icon}</span></div>
        <h4 class="text-headline-md font-headline-md text-primary mb-2">${s.title}</h4>
        <p class="text-body-sm font-body-sm text-on-surface-variant">${s.body}</p>
      </div>
      <span class="text-label-numeric font-label-numeric text-xs text-secondary mt-6 font-semibold">${s.tag}</span>
    </a>`
      )
      .join('\n    ')}
  </div>
</section>

<!-- ==================== REEL BANNER ==================== -->
<section class="max-w-7xl mx-auto px-6 md:px-margin pb-space-lg">
  <div class="relative w-full h-80 md:h-96 rounded-lg md:rounded-xl overflow-hidden border border-outline-variant/20 flex items-center justify-center">
    <img class="w-full h-full object-cover absolute inset-0" src="${img('images/banner-reel.webp')}" alt="Aerial view of green agricultural furrows at sunrise"/>
    <div class="absolute inset-0 bg-primary/40 backdrop-blur-[2px]"></div>
    <div class="relative z-10 flex flex-col items-center text-center p-6 text-surface-container-lowest">
      <div class="w-16 h-16 rounded-full bg-surface-container-lowest/90 text-primary flex items-center justify-center shadow-xl mb-4 hover:scale-105 transition-transform cursor-pointer"><span class="material-symbols-outlined text-3xl pl-1" style="font-variation-settings: 'FILL' 1;">play_arrow</span></div>
      <span class="text-label-pill font-label-pill uppercase tracking-widest text-secondary-fixed mb-1">Corporate Field Reel</span>
      <h3 class="text-headline-lg font-headline-lg font-bold">Watch Our Global Sourcing Operations</h3>
    </div>
    <div class="absolute bottom-4 left-4 flex gap-2">
      <span class="px-3 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-surface-container-lowest text-label-pill font-label-pill">Agri-Business</span>
      <span class="px-3 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-surface-container-lowest text-label-pill font-label-pill">Sortex Quality</span>
    </div>
  </div>
</section>

${inquiryCta()}`;
}

/* ------------------------------------------------------------------ *
 *  ABOUT
 * ------------------------------------------------------------------ */

export function aboutBody() {
  return `
${pageHero({
  eyebrow: 'About Us',
  title: 'Who We Are',
  subtitle:
    'A premier trading firm specialising in the import and export of premium rice and cooking oil products — built on farmer relationships, port-side logistics and uncompromising sortex standards.',
  image: img('images/banner-about.webp'),
  chips: ['Est. Pakistan', 'Jeddah · Dubai', 'ISO 22000', 'SASO Approved'],
  stat: { value: '50K+', label: 'Metric Tons Exported Annually' },
})}

<!-- ==================== INTRO ==================== -->
<section class="max-w-7xl mx-auto px-6 md:px-margin py-space-xl">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
    <div class="lg:col-span-7">
      ${sectionHeading({
        num: '01',
        pill: 'Introduction',
        title: 'The trading house behind the Gulf’s favourite basmati.',
        body: '',
      })}
      <div class="space-y-5 text-body-lg font-body-lg text-on-surface-variant max-w-3xl -mt-6">
        <p><b class="text-on-surface">SAFIA SATTAR SONS</b> is a leading trading firm specialising in the import and export of premium rice and cooking oil products. Founded by <b class="text-on-surface">Qurban Ali</b> with a vision to revolutionise the trading industry, we have grown from a local company into a significant global player — marked by consistent growth, strategic partnerships and an uncompromising commitment to quality.</p>
        <p>We take pride in offering the highest quality Basmati rice at affordable prices. Our commitment is to provide exceptional value to our customers by delivering premium Basmati rice at competitive rates, supported by transparent documentation, verified traceability and dependable Gulf delivery schedules.</p>
      </div>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="product.html" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary text-body-sm font-body-sm font-semibold hover:bg-inverse-surface transition-colors">Explore our catalogue <span class="material-symbols-outlined text-[16px] text-secondary-fixed">arrow_forward</span></a>
        <a href="contact.html" class="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary text-body-sm font-body-sm font-semibold hover:bg-secondary-fixed transition-colors">Talk to our trade desk</a>
      </div>
    </div>
    <div class="lg:col-span-5">
      <div class="rounded-lg overflow-hidden border border-outline-variant/30 relative min-h-[380px] group">
        <img class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="${img('images/banner-about-export-operation.webp')}" alt="Saffia Sattar Sons grain handling and export operation"/>
        <div class="absolute inset-0 bg-gradient-to-t from-primary-container/90 via-primary-container/20 to-transparent"></div>
        <div class="relative z-10 p-6 text-surface-container-lowest">
          <span class="px-2.5 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-label-pill font-label-pill inline-block mb-2">Farm to Container</span>
          <h3 class="text-headline-md font-headline-md">Traceable by design</h3>
          <p class="text-body-sm font-body-sm text-surface-container-highest mt-1">Every bag carries its mill, its farm contract and its inspection record.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ==================== STATS ==================== -->
<section class="bg-surface-container-low border-y border-outline-variant/20 py-space-lg">
  <div class="max-w-7xl mx-auto px-6 md:px-margin">
    ${statsBand()}
  </div>
</section>

<!-- ==================== MISSION & VISION ==================== -->
<section class="max-w-7xl mx-auto px-6 md:px-margin py-space-xl">
  ${sectionHeading({
    num: '02',
    pill: 'Mission & Vision',
    title: 'Where we are going, and the standards we hold on the way.',
    body: 'Our mission and vision are written into every contract, every inspection certificate and every delivery note.',
  })}
  <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
    <div class="reveal bg-surface-container-lowest rounded-lg border border-outline-variant/30 p-8 flex flex-col justify-between">
      <div>
        <div class="w-11 h-11 rounded-full bg-secondary-fixed/50 text-secondary flex items-center justify-center mb-5"><span class="material-symbols-outlined">flag</span></div>
        <h3 class="text-headline-lg font-headline-lg text-primary mb-3">Mission</h3>
        <p class="text-body-md font-body-md text-on-surface-variant">To provide superior rice and cooking oil products that meet international quality standards while fostering long-term relationships with our partners and clients. We are committed to excellence, reliability and sustainability.</p>
      </div>
      <span class="text-label-numeric font-label-numeric text-xs text-secondary font-semibold mt-8">MISSION / 01</span>
    </div>
    <div class="reveal bg-primary-container text-surface-container-lowest rounded-lg border border-outline-variant/20 p-8 flex flex-col justify-between relative overflow-hidden grain-overlay">
      <div class="relative z-10">
        <div class="w-11 h-11 rounded-full bg-secondary-fixed text-tertiary flex items-center justify-center mb-5"><span class="material-symbols-outlined">visibility</span></div>
        <h3 class="text-headline-lg font-headline-lg text-surface-container-lowest mb-3">Vision</h3>
        <p class="text-body-md font-body-md text-surface-container-highest">To be the global leader in the rice and cooking oil trading industry, known for our innovation, customer-centric approach and contribution to the agricultural sector.</p>
      </div>
      <span class="relative z-10 text-label-numeric font-label-numeric text-xs text-secondary-fixed font-semibold mt-8">VISION / 02</span>
    </div>
  </div>

  <!-- history timeline -->
  <div class="mt-16 pt-12 border-t border-outline-variant/30">
    <div class="flex items-center gap-2 mb-8">
      <span class="text-label-numeric font-label-numeric text-on-surface-variant">03</span>
      <span class="inline-block w-8 h-[1px] bg-outline-variant"></span>
      <span class="text-label-pill font-label-pill uppercase text-secondary">History &amp; Growth</span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
      ${[
        { icon: 'storefront', title: 'Local Roots', body: 'Founded by Qurban Ali as a local rice merchant with direct farmer contracts in the Punjab basin.' },
        { icon: 'warehouse', title: 'Regional Scale', body: 'Expanded into a 30+ warehouse network with dedicated climate-controlled storage and repacking lines.' },
        { icon: 'sailing', title: 'Global Trade', body: 'Today a leading Saudi and UAE exporter, shipping Basmati rice and edible oils to 10+ countries.' },
      ]
        .map(
          (s) => `<div class="reveal bg-surface-container-lowest rounded-lg border border-outline-variant/30 p-6">
        <div class="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center mb-4"><span class="material-symbols-outlined">${s.icon}</span></div>
        <h4 class="text-headline-md font-headline-md text-primary mb-2">${s.title}</h4>
        <p class="text-body-sm font-body-sm text-on-surface-variant">${s.body}</p>
      </div>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>

<!-- ==================== CATALOGUE CTA ==================== -->
<section class="max-w-7xl mx-auto px-6 md:px-margin pb-space-xl">
  <div class="mt-10 flex justify-center">
    <a href="product.html" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary text-body-sm font-body-sm font-semibold hover:bg-inverse-surface transition-colors">Browse the full catalogue <span class="material-symbols-outlined text-[16px] text-secondary-fixed">arrow_forward</span></a>
  </div>
</section>

${inquiryCta({ title: 'Start a conversation with our trade desk', body: 'Tell us the grade, the volume and the destination. We will return an indicative FOB or CIF price sheet within one business day.' })}`;
}

/* ------------------------------------------------------------------ *
 *  SERVICES
 * ------------------------------------------------------------------ */

export function serviceBody() {
  const pillars = [
    { icon: 'filter_alt', title: 'Quality Rice', body: '“Elevate your dishes with our select rice varieties, guaranteed for exceptional taste and texture.”', img: 'images/gallery/rice-quality-varieties.webp' },
    { icon: 'opacity', title: 'Quality Oil', body: 'We source and supply high-quality cooking oils from around the world, offering a diverse range of products to meet the discerning needs of our customers.', img: 'images/gallery/oil-cooking-oil-pour.webp' },
    { icon: 'eco', title: 'Natural Products', body: 'We provide a variety of natural products that cater to diverse culinary needs, ensuring quality and satisfaction.', img: 'images/gallery/vegetable-fresh-produce.webp' },
  ];

  const steps = [
    { n: '01', title: 'Sourcing', body: 'Direct contracts with select growers in Punjab, Sindh and the wider Indus basin, plus vetted international partners for oils and produce.' },
    { n: '02', title: 'Milling & Sorting', body: 'Bühler ultra-clean milling, optical sorting and double polishing, with moisture and grain-length verification on every lot.' },
    { n: '03', title: 'Quality Control', body: 'ISO 22000, HACCP and SASO conformity documentation issued with every consignment before it leaves the warehouse.' },
    { n: '04', title: 'Freight & Clearance', body: 'Container bookings through Jeddah Islamic Port and Jebel Ali, with customs clearance and multi-warehouse distribution handled in-house.' },
  ];

  return `
${pageHero({
  eyebrow: 'Services',
  title: 'Services We Offer',
  subtitle:
    'From the paddy field to the retailer’s shelf, we run the full commodity chain — sourcing, milling, quality control, freight, clearance and distribution.',
  image: img('images/banner-services.webp'),
  chips: ['Sourcing', 'Milling', 'QC & Docs', 'Freight & Clearance'],
  stat: { value: '300%', label: 'Shipment Reliability via Jeddah & Jebel Ali' },
})}

<!-- ==================== PILLARS ==================== -->
<section class="max-w-7xl mx-auto px-6 md:px-margin py-space-xl">
  ${sectionHeading({
    num: '01',
    pill: 'What We Do',
    title: 'Three desks, one supply chain.',
    body: 'Commodity specialists for rice, edible oils and natural produce, working from the same verified sourcing network.',
  })}
  <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
    ${pillars
      .map(
        (p) => `<article class="reveal bg-surface-container-lowest rounded-lg border border-outline-variant/30 overflow-hidden flex flex-col group">
      <div class="aspect-[16/10] overflow-hidden bg-surface-container">
        <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="${img(p.img)}" alt="${p.title}" loading="lazy"/>
      </div>
      <div class="p-6 flex flex-col flex-1">
        <div class="w-10 h-10 rounded-full bg-secondary-fixed/40 text-secondary flex items-center justify-center mb-4"><span class="material-symbols-outlined">${p.icon}</span></div>
        <h3 class="text-headline-md font-headline-md text-primary mb-2">${p.title}</h3>
        <p class="text-body-sm font-body-sm text-on-surface-variant flex-1">${p.body}</p>
        <a class="mt-5 inline-flex items-center gap-1.5 text-label-pill font-label-pill text-primary hover:text-secondary transition-colors" href="product.html">See the range <span class="material-symbols-outlined text-[16px]">arrow_forward</span></a>
      </div>
    </article>`
      )
      .join('\n    ')}
  </div>
</section>

<!-- ==================== IMPORT / EXPORT ==================== -->
<section class="max-w-7xl mx-auto px-6 md:px-margin pb-space-xl">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
    <div class="bg-surface-container-lowest rounded-lg border border-outline-variant/30 p-8 md:p-10 flex flex-col justify-between">
      <div>
        <span class="text-label-pill font-label-pill uppercase text-secondary">Inbound</span>
        <h2 class="text-headline-xl font-headline-xl text-primary mt-2 mb-4">We Import</h2>
        <p class="text-body-md font-body-md text-on-surface-variant"><b class="text-on-surface">SAFIA SATTAR SONS</b>, a prominent leader in the import industry, is proud to present a diverse and meticulously curated selection of all types of rice and cooking oil products. Our offerings are designed to meet the varied culinary needs and preferences of our discerning clientele. With a focus on quality and customer satisfaction, we ensure that each product we import adheres to the highest standards, providing an exceptional experience for chefs and home cooks alike.</p>
      </div>
      <ul class="mt-8 pt-6 border-t border-outline-variant/20 space-y-3">
        ${['Premium Basmati rice varieties', 'Refined sunflower, corn & palm oils', 'Fresh vegetables, fruits & spices', 'Consumer, jerrycan & flexitank formats']
          .map((t) => `<li class="flex items-start gap-2.5 text-body-sm font-body-sm text-on-surface-variant"><span class="material-symbols-outlined text-[18px] text-secondary mt-[2px]">check_circle</span>${t}</li>`)
          .join('\n        ')}
      </ul>
    </div>
    <div class="bg-primary-container text-surface-container-lowest rounded-lg border border-outline-variant/20 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden grain-overlay">
      <div class="relative z-10">
        <span class="text-label-pill font-label-pill uppercase text-secondary-fixed">Outbound</span>
        <h2 class="text-headline-xl font-headline-xl text-surface-container-lowest mt-2 mb-4">We Export</h2>
        <p class="text-body-md font-body-md text-surface-container-highest"><b class="text-surface-container-lowest">SAFIA SATTAR SONS</b>, a distinguished leader in the export industry, takes great pride in being recognised as the foremost exporter of premium rice and cooking oil products. Our commitment to excellence is reflected in the diverse selection of high-quality offerings that cater to a wide range of culinary needs and preferences. Whether you are seeking the finest grains of rice for traditional dishes or premium cooking oils to enhance your culinary creations, we ensure that every product meets the highest standards of quality and taste.</p>
      </div>
      <ul class="relative z-10 mt-8 pt-6 border-t border-outline-variant/20 space-y-3">
        ${['FOB Jeddah &amp; Jebel Ali pricing', 'CIF delivery to Gulf &amp; African ports', 'SASO &amp; ISO conformity documentation', 'Container and bulk cargo allocation']
          .map((t) => `<li class="flex items-start gap-2.5 text-body-sm font-body-sm text-surface-container-highest"><span class="material-symbols-outlined text-[18px] text-secondary-fixed mt-[2px]">check_circle</span>${t}</li>`)
          .join('\n        ')}
      </ul>
    </div>
  </div>
</section>

<!-- ==================== PROCESS ==================== -->
<section class="max-w-7xl mx-auto px-6 md:px-margin pb-space-xl">
  ${sectionHeading({
    num: '02',
    pill: 'How We Work',
    title: 'Four checkpoints between the field and your warehouse.',
    body: 'Every consignment follows the same disciplined path, which is why our delivery windows hold.',
  })}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
    ${steps
      .map(
        (s) => `<div class="reveal bg-surface-container-lowest rounded-lg border border-outline-variant/30 p-6 relative overflow-hidden">
      <div class="text-metric-huge font-metric-huge text-surface-container-highest leading-none">${s.n}</div>
      <h4 class="text-headline-md font-headline-md text-primary mt-3 mb-2">${s.title}</h4>
      <p class="text-body-sm font-body-sm text-on-surface-variant">${s.body}</p>
    </div>`
      )
      .join('\n    ')}
  </div>
  ${trustBand()}
</section>

<!-- ==================== FAQ ==================== -->
<section class="max-w-7xl mx-auto px-6 md:px-margin pb-space-xl">
  ${sectionHeading({
    num: '03',
    pill: 'Trade Desk',
    title: 'Questions we answer every day.',
  })}
  ${faqBlock([
    { q: 'What are your minimum order quantities?', a: 'We supply from single pallets for private-label packers up to full container loads of 25–27 MT for importers and hypermarket chains. Mixed container loading is available for selected rice and oil grades.' },
    { q: 'Which certifications do you ship with?', a: 'Every consignment is accompanied by ISO 22000, HACCP and SASO conformity documentation, phytosanitary certificates where applicable, and third-party weight and quality inspection reports.' },
    { q: 'How quickly can you deliver to Gulf ports?', a: 'Standard shipments clear Jeddah Islamic Port and Jebel Ali within seven to ten days of confirmed booking, with documentation prepared in parallel to freight execution.' },
    { q: 'Do you provide private-label packaging?', a: 'Yes. We offer consumer bottles and pouches for oils, woven bags for rice at 5 kg, 10 kg, 20 kg and 40 kg, and flexitanks for bulk edible oil.' },
  ])}
</section>

${inquiryCta({ title: 'Request an indicative price sheet', body: 'Send us the commodity, grade, volume and delivery port. Our Jeddah and Dubai desks will respond with FOB and CIF rates within one business day.' })}`;
}

/* ------------------------------------------------------------------ *
 *  PRODUCT OVERVIEW
 * ------------------------------------------------------------------ */

export function productBody() {
  const all = allProducts.map((p) => ({
    ...p,
    filterCategories: [slugify(p.category), p.groupKey].filter(Boolean).join('|'),
  }));

  const catImages = {
    rice: 'images/banner-rice.webp',
    oil: 'images/banner-oil.webp',
    vegetables: 'images/banner-vegetables.webp',
    fruits: 'images/banner-fruits.webp',
    spices: 'images/banner-spices.webp',
  };

  return `
${pageHero({
  eyebrow: 'Products',
  title: 'Our Product Range',
  subtitle:
    'We trade high-quality Basmati Rice, Cooking Oils, Organic Vegetables, Fresh Fruits, and Premium Spices. Select a category below to explore our products.',
  image: img('images/banner-quality-section.webp'),
  chips: ['54 Rice Varieties', '22 Cooking Oils', '20 Vegetables', '21 Fruits', '21 Spices'],
  stat: { value: '138', label: 'Export-Grade SKUs available for allocation' },
})}

<!-- ==================== CATEGORY CARDS ==================== -->
<section class="max-w-7xl mx-auto px-6 md:px-margin py-space-xl">
  ${sectionHeading({
    num: '01',
    pill: 'Categories',
    title: 'Five desks, one export operation.',
    body: 'Each category is managed by dedicated specialists and backed by its own quality protocol.',
  })}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
    ${catalogue
      .map(
        (c, i) => `<a href="${c.href}" class="reveal group relative rounded-lg overflow-hidden border border-outline-variant/30 min-h-[300px] flex flex-col justify-end ${i === 0 ? 'lg:col-span-2' : ''}">
      <img class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="${img(catImages[c.key])}" alt="${c.label}" loading="lazy"/>
      <div class="absolute inset-0 bg-gradient-to-t from-primary-container/92 via-primary-container/45 to-primary-container/20"></div>
      <div class="relative z-10 p-6 text-surface-container-lowest">
        <div class="flex items-center justify-between mb-3">
          <span class="px-3 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-label-pill font-label-pill">${c.count} products</span>
          <span class="w-9 h-9 rounded-full bg-secondary-fixed text-tertiary flex items-center justify-center transition-transform group-hover:translate-x-1"><span class="material-symbols-outlined text-[18px]">arrow_forward</span></span>
        </div>
        <h3 class="text-headline-lg font-headline-lg text-surface-container-lowest">${c.label}</h3>
        <p class="text-body-sm font-body-sm text-surface-container-highest mt-1 max-w-md">${c.blurb}</p>
      </div>
    </a>`
      )
      .join('\n    ')}
  </div>
</section>

<!-- ==================== FULL CATALOGUE ==================== -->
<section class="max-w-7xl mx-auto px-6 md:px-margin pb-space-xl">
  ${sectionHeading({
    num: '02',
    pill: 'Full Catalogue',
    title: 'Every grade we can allocate this season.',
    body: 'Filter by category, then reach out to our trade desk for pricing, packaging options and lead times.',
  })}
  ${filterBar({
    items: [
      { value: 'all', label: 'All Products' },
      { value: 'rice', label: 'Basmati Rice' },
      { value: 'oil', label: 'Cooking Oils' },
      { value: 'vegetables', label: 'Vegetables' },
      { value: 'fruits', label: 'Fruits' },
      { value: 'spices', label: 'Spices' },
    ],
    target: '#catalogue',
    counterId: 'catalogueCount',
    count: all.length,
  })}
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter" id="catalogue">
    ${all.map((p) => productCard(p, { badge: p.group })).join('\n    ')}
  </div>
</section>

${inquiryCta()}`;
}

/* ------------------------------------------------------------------ *
 *  CATEGORY PAGES
 * ------------------------------------------------------------------ */

const categoryPage = ({
  eyebrow,
  title,
  subtitle,
  image,
  chips,
  stat,
  list,
  filters,
  cta,
  intro,
  specs,
}) => {
  const tagged = list.map((p) => ({
    ...p,
    filterCategories: (p.filterCats || [slugify(p.category)]).filter(Boolean).join('|'),
  }));

  return `
${pageHero({ eyebrow, title, subtitle, image, chips, stat })}

${
  intro
    ? `<section class="max-w-7xl mx-auto px-6 md:px-margin py-space-lg">
  <div class="reveal bg-surface-container-low rounded-lg md:rounded-xl p-6 md:p-10 border border-outline-variant/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
    <div class="lg:col-span-7">
      <span class="text-label-pill font-label-pill uppercase text-secondary">${intro.label}</span>
      <h2 class="text-headline-lg font-headline-lg text-primary mt-2 mb-3">${intro.title}</h2>
      <p class="text-body-md font-body-md text-on-surface-variant">${intro.body}</p>
    </div>
    <div class="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${
        specs
          ? specs
              .map(
                (s) => `<div class="bg-surface-container-lowest rounded-lg border border-outline-variant/20 p-5">
        <div class="text-label-numeric font-label-numeric text-[11px] uppercase tracking-wider text-on-surface-variant">${s.label}</div>
        <div class="text-headline-md font-headline-md text-primary mt-1">${s.value}</div>
      </div>`
              )
              .join('\n      ')
          : ''
      }
    </div>
  </div>
</section>`
    : ''
}

<section class="max-w-7xl mx-auto px-6 md:px-margin py-space-lg">
  ${sectionHeading({
    num: '02',
    pill: 'Browse The Range',
    title: `Explore our ${title.toLowerCase()} portfolio.`,
    body: 'Filter by type, then open a specification card for grade, origin and packing details.',
  })}
  ${filterBar({ items: filters, target: '#grid', counterId: `${eyebrow.replace(/\s+/g, '')}Count`, count: tagged.length })}
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter" id="grid">
    ${tagged.map((p) => productCard(p, { badge: p.category })).join('\n    ')}
  </div>
</section>

${inquiryCta(cta || {})}`;
};

export function riceBody() {
  return categoryPage({
    eyebrow: 'Rice',
    title: 'Premium Rice Varieties',
    subtitle:
      'World-class Pakistani and Indian basmati & non-basmati rice — aromatic, long-grain, and perfectly processed for global markets.',
    image: img('images/banner-rice.webp'),
    chips: ['Aromatic Basmati', 'Non-Basmati', 'Pakistani & Indian Origins', 'Container & Bulk'],
    stat: { value: '54', label: 'Rice varieties available for allocation' },
    intro: {
      label: 'Our Rice Desk',
      title: 'From Punjab paddy plains to export-grade containers.',
      body: 'We work directly with millers in Punjab and Sindh, sourcing 1121, Super Kernel, Kainat and long-grain non-basmati varieties. Every lot is optically sorted, double polished and moisture verified before it is bagged for shipment.',
    },
    specs: [
      { label: 'Grain Length', value: '8.35 – 8.40 mm' },
      { label: 'Moisture Content', value: 'Max 12.0%' },
      { label: 'Packing Units', value: '5 / 10 / 20 / 40 kg' },
      { label: 'Shipment Lead', value: '7–10 days to Gulf' },
    ],
    list: withFilterCats(rice, (p) => (p.origin ? [p.origin] : [])),
    filters: [
      { value: 'all', label: 'All Rice' },
      { value: 'aromatic-rice', label: 'Aromatic / Basmati' },
      { value: 'basmati-rice', label: 'Basmati Rice' },
      { value: 'non-basmati-rice', label: 'Non-Basmati' },
      { value: 'pakistani', label: 'Pakistani Rice' },
      { value: 'indian', label: 'Indian Rice' },
    ],
    cta: {
      title: 'Request a rice price sheet',
      body: 'Tell us the variety, the packing format and the destination port. We will return FOB and CIF rates for Basmati, Super Kernel and long-grain non-basmati grades within one business day.',
      commodities: rice.slice(0, 8).map((p) => p.title),
    },
  });
}

export function oilBody() {
  return categoryPage({
    eyebrow: 'Oil',
    title: 'Premium Cooking Oils',
    subtitle:
      'High-quality, refined cooking oils sourced globally — perfect for frying, baking, dressings, and everyday use.',
    image: img('images/banner-oil.webp'),
    chips: ['Refined', 'Cold Pressed', 'Ghee & Butter', 'Flexitank Ready'],
    stat: { value: '22', label: 'Edible oil products in the portfolio' },
    intro: {
      label: 'Our Oil Desk',
      title: 'Refined for stability. Packed for every channel.',
      body: 'From sunflower, corn, soybean and canola to palm olein, coconut, olive, avocado and nut oils — plus ghee and clarified butter. Available in consumer bottles, jerrycans and bulk flexitanks under SASO food safety specifications.',
    },
    specs: [
      { label: 'Supply Origin', value: 'UAE · Malaysia · EU' },
      { label: 'Pack Formats', value: 'Bottles · Jerrycans' },
      { label: 'Bulk Option', value: 'Flexitank / IBC' },
      { label: 'Compliance', value: 'SASO Approved' },
    ],
    list: withFilterCats(oil),
    filters: [
      { value: 'all', label: 'All Oils' },
      { value: 'vegetable-oil', label: 'Vegetable Oils' },
      { value: 'seed-oil', label: 'Seed Oils' },
      { value: 'grain-oil', label: 'Grain Oils' },
      { value: 'nut-oil', label: 'Nut Oils' },
      { value: 'fruit-oil', label: 'Fruit Oils' },
      { value: 'tropical-oil', label: 'Tropical Oils' },
      { value: 'dairy-fat', label: 'Dairy Fat' },
      { value: 'clarified-butter', label: 'Clarified Butter' },
    ],
    cta: {
      title: 'Request an edible oil quote',
      body: 'Send us the oil type, filling format and container size. Our sourcing desk responds with landed pricing and documentation timelines.',
      commodities: oil.map((p) => p.title),
    },
  });
}

export function vegetablesBody() {
  return categoryPage({
    eyebrow: 'Vegetables',
    title: 'Premium Fresh Vegetables',
    subtitle:
      'Farm-fresh, hand-picked vegetables delivered with care. Export-grade quality, rich in flavour and nutrients.',
    image: img('images/banner-vegetables.webp'),
    chips: ['Export Grade', 'Cold Chain', 'Root & Leafy', 'Hypermarket Ready'],
    stat: { value: '20', label: 'Fresh vegetable lines in the catalogue' },
    intro: {
      label: 'Our Produce Desk',
      title: 'Packed for the shelf, not just for the truck.',
      body: 'All vegetables are fresh and export-grade. We handle washing, grading and packing at our own facilities so produce arrives at Gulf hypermarkets with consistent sizing and shelf life.',
    },
    specs: [
      { label: 'Grading', value: 'Export Grade' },
      { label: 'Packing', value: 'Cartons & Crates' },
      { label: 'Cold Chain', value: 'Climate Controlled' },
      { label: 'Lead Time', value: '5–9 days to Gulf' },
    ],
    list: withFilterCats(vegetables),
    filters: [
      { value: 'all', label: 'All Vegetables' },
      { value: 'root-vegetable', label: 'Root Vegetables' },
      { value: 'fruit-vegetable', label: 'Fruit Vegetables' },
      { value: 'bulb-vegetable', label: 'Bulb Vegetables' },
      { value: 'leafy-vegetable', label: 'Leafy Vegetables' },
      { value: 'cruciferous', label: 'Cruciferous' },
      { value: 'pod-vegetable', label: 'Pod Vegetables' },
    ],
    cta: {
      title: 'Request a fresh produce allocation',
      body: 'Tell us the lines, volumes and destination. We confirm seasonal availability and cold-chain capacity before quoting.',
      commodities: vegetables.map((p) => p.title),
    },
  });
}

export function fruitsBody() {
  return categoryPage({
    eyebrow: 'Fruits',
    title: 'Premium Fresh Fruits',
    subtitle:
      'Experience nature’s finest selection of fruits, sourced from the best farms and delivered with care. Each fruit is handpicked for optimal freshness and flavour.',
    image: img('images/banner-fruits.webp'),
    chips: ['Hand Picked', 'Export Grade', 'Tropical & Temperate', 'Cold Chain'],
    stat: { value: '21', label: 'Fresh fruit lines in the catalogue' },
    intro: {
      label: 'Our Fruit Desk',
      title: 'Picked at peak, shipped at speed.',
      body: 'From temperate apples, pears and grapes to tropical mangoes, bananas and pineapples, citrus and berries — every consignment is handpicked, graded and cold-chain delivered.',
    },
    specs: [
      { label: 'Selection', value: 'Hand Picked' },
      { label: 'Grading', value: 'Export Grade' },
      { label: 'Storage', value: 'Cold Chain' },
      { label: 'Lead Time', value: '5–9 days to Gulf' },
    ],
    list: withFilterCats(fruits),
    filters: [
      { value: 'all', label: 'All Fruits' },
      { value: 'tropical-fruits', label: 'Tropical Fruits' },
      { value: 'temperate-fruits', label: 'Temperate Fruits' },
      { value: 'citrus-fruits', label: 'Citrus Fruits' },
      { value: 'berries', label: 'Berries' },
      { value: 'stone-fruits', label: 'Stone Fruits' },
    ],
    cta: {
      title: 'Request a fresh fruit quote',
      body: 'Share your fruit mix, weekly volume and destination market. We will confirm harvest windows and cold-chain capacity.',
      commodities: fruits.map((p) => p.title),
    },
  });
}

export function spicesBody() {
  return categoryPage({
    eyebrow: 'Spices',
    title: 'Premium Spices & Herbs',
    subtitle:
      'Finest hand-picked whole and ground spices from around the world — aromatic, pure, and export-grade quality.',
    image: img('images/banner-spices.webp'),
    chips: ['Whole & Ground', 'Aromatic Herbs', 'Signature Blends', 'Bulk Supply'],
    stat: { value: '21', label: 'Spice and herb lines in the catalogue' },
    intro: {
      label: 'Our Spice Desk',
      title: 'Aromatics that survive the journey intact.',
      body: 'Whole spices, aromatic herbs and signature blends sourced from trusted origins, then cleaned, graded and hygienically packed for retail and industrial buyers.',
    },
    specs: [
      { label: 'Format', value: 'Whole & Ground' },
      { label: 'Packing', value: 'Hygienic Packs' },
      { label: 'Blends', value: 'Custom Available' },
      { label: 'Supply', value: 'Bulk & Retail' },
    ],
    list: withFilterCats(spices),
    filters: [
      { value: 'all', label: 'All Spices' },
      { value: 'spice', label: 'Whole & Ground Spices' },
      { value: 'herb', label: 'Herbs' },
      { value: 'spice-blend', label: 'Spice Blends' },
    ],
    cta: {
      title: 'Request a spice quotation',
      body: 'Tell us the spices, pack size and monthly requirement. We will confirm sourcing, blends and lead times.',
      commodities: spices.map((p) => p.title),
    },
  });
}

/* ------------------------------------------------------------------ *
 *  CONTACT
 * ------------------------------------------------------------------ */

export function contactBody() {
  return `
${pageHero({
  eyebrow: 'Contact',
  title: 'Request A Call Back',
  subtitle:
    'Connect directly with our regional trade desks in Jeddah and Dubai for container bookings, pricing tenders, and product samples.',
  image: img('images/banner-contact.webp'),
  chips: ['Jeddah', 'Dubai', 'WhatsApp', 'Email'],
  stat: { value: '24h', label: 'Typical quotation turnaround' },
})}

<section class="max-w-7xl mx-auto px-6 md:px-margin py-space-xl">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
    <!-- form -->
    <div class="lg:col-span-7 reveal bg-surface-container-lowest rounded-lg md:rounded-xl border border-outline-variant/30 p-6 md:p-10">
      <span class="text-label-pill font-label-pill uppercase text-secondary">Direct Connect</span>
      <h2 class="text-headline-xl font-headline-xl text-primary mt-2 mb-2">Send us your requirement</h2>
      <p class="text-body-md font-body-md text-on-surface-variant mb-8">Share the commodity, volume and destination. Our trade desk will come back with pricing, documentation and lead times.</p>
      <form class="space-y-5" action="https://api.web3forms.com/submit" method="POST" id="request">
        <input type="hidden" name="access_key" value="${site.web3formsKey}"/>
        <input type="hidden" name="subject" value="New wholesale inquiry — Safia Sattar Sons"/>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="block text-label-pill font-label-pill text-on-surface mb-1.5">Your Name</label>
            <input class="w-full px-4 py-3 rounded-md bg-surface-container-lowest border border-outline-variant/40 text-body-sm font-body-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none" name="Name" placeholder="Your Name" required type="text"/>
          </div>
          <div>
            <label class="block text-label-pill font-label-pill text-on-surface mb-1.5">Your Company Name</label>
            <input class="w-full px-4 py-3 rounded-md bg-surface-container-lowest border border-outline-variant/40 text-body-sm font-body-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none" name="Company" placeholder="Your Company Name" required type="text"/>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="block text-label-pill font-label-pill text-on-surface mb-1.5">Your Email</label>
            <input class="w-full px-4 py-3 rounded-md bg-surface-container-lowest border border-outline-variant/40 text-body-sm font-body-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none" name="Email" placeholder="Your Email" required type="email"/>
          </div>
          <div>
            <label class="block text-label-pill font-label-pill text-on-surface mb-1.5">Phone / WhatsApp</label>
            <input class="w-full px-4 py-3 rounded-md bg-surface-container-lowest border border-outline-variant/40 text-body-sm font-body-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none" name="Phone" placeholder="+966 50 000 0000" type="tel"/>
          </div>
        </div>
        <div>
          <label class="block text-label-pill font-label-pill text-on-surface mb-1.5">Commodity Interest</label>
          <select class="w-full px-4 py-3 rounded-md bg-surface-container-lowest border border-outline-variant/40 text-body-sm font-body-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none" name="Commodity">
            ${catalogue.map((c) => `<option>${c.label}</option>`).join('\n            ')}
            <option>Multiple Commodities</option>
            <option>Logistics &amp; Freight Only</option>
          </select>
        </div>
        <div>
          <label class="block text-label-pill font-label-pill text-on-surface mb-1.5">Message</label>
          <textarea class="w-full px-4 py-3 rounded-md bg-surface-container-lowest border border-outline-variant/40 text-body-sm font-body-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none min-h-[140px]" name="message" placeholder="Grades, volumes, packing and destination port…" required></textarea>
        </div>
        <div class="pt-1">
          <button class="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-primary text-on-primary hover:bg-inverse-surface transition-colors text-body-sm font-body-sm font-semibold" type="submit">
            <span>Send Inquiry</span><span class="material-symbols-outlined text-secondary-fixed">send</span>
          </button>
        </div>
        <p class="text-label-numeric font-label-numeric text-[11px] uppercase tracking-wider text-on-surface-variant text-center">Your details are used only to prepare a quotation.</p>
      </form>
    </div>

    <!-- contact details -->
    <div class="lg:col-span-5 flex flex-col gap-gutter">
      <div class="reveal bg-surface-container-low rounded-lg border border-outline-variant/20 p-6 md:p-8 flex-1">
        <span class="text-label-numeric font-label-numeric text-on-surface-variant block mb-2">01 / JEDDAH</span>
        <h3 class="text-headline-lg font-headline-lg text-primary mb-2">Saudi Arabia Regional Office</h3>
        <p class="text-body-sm font-body-sm text-on-surface-variant mb-5 flex items-start gap-2"><span class="material-symbols-outlined text-[18px] text-secondary mt-[1px]">location_on</span>${site.jeddah}</p>
        <div class="space-y-2.5">
          ${site.phones
            .map(
              (p) =>
                `<a class="flex items-center gap-2.5 text-body-sm font-body-sm text-primary font-semibold hover:text-secondary transition-colors" href="tel:${p.replace(/\s/g, '')}"><span class="material-symbols-outlined text-[18px] text-secondary">call</span>${p}</a>`
            )
            .join('\n          ')}
          <a class="flex items-center gap-2.5 text-body-sm font-body-sm text-primary font-semibold hover:text-secondary transition-colors" href="mailto:${site.email}"><span class="material-symbols-outlined text-[18px] text-secondary">mail</span>${site.email}</a>
          <a class="flex items-center gap-2.5 text-body-sm font-body-sm text-primary font-semibold hover:text-secondary transition-colors" href="${site.whatsappHref}" target="_blank" rel="noopener"><svg class="w-[18px] h-[18px] text-secondary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>WhatsApp Trade Desk</a>
        </div>
        <div class="mt-6 pt-5 border-t border-outline-variant/20 flex items-center justify-between">
          <span class="text-label-numeric font-label-numeric text-xs uppercase tracking-wider text-on-surface-variant">Office Hours</span>
          <span class="text-body-sm font-body-sm font-semibold text-primary">Sun – Thu · 08:30 – 17:30</span>
        </div>
      </div>

      <div class="reveal bg-primary-container text-surface-container-lowest rounded-lg border border-outline-variant/20 p-6 md:p-8 relative overflow-hidden grain-overlay">
        <div class="relative z-10">
          <span class="text-label-numeric font-label-numeric text-on-primary-container block mb-2">02 / DUBAI</span>
          <h3 class="text-headline-lg font-headline-lg text-surface-container-lowest mb-2">Head Office — Dubai, UAE</h3>
          <p class="text-body-sm font-body-sm text-surface-container-highest mb-5 flex items-start gap-2"><span class="material-symbols-outlined text-[18px] text-secondary-fixed mt-[1px]">apartment</span>${site.dubai}</p>
          <a class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary-fixed text-tertiary text-body-sm font-body-sm font-semibold hover:bg-surface-container-lowest transition-colors" href="mailto:${site.email}">${site.email}</a>
        </div>
      </div>

      <div class="reveal bg-surface-container-lowest rounded-lg border border-outline-variant/30 p-6 md:p-8">
        <h3 class="text-headline-md font-headline-md text-primary mb-4">Find our Jeddah office</h3>
        <div class="rounded-lg overflow-hidden border border-outline-variant/30">
          <iframe class="w-full h-[300px] border-0" src="${site.mapEmbed}" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Safia Sattar Sons — Jeddah office location"></iframe>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ==================== FAQ ==================== -->
<section class="max-w-7xl mx-auto px-6 md:px-margin pb-space-xl">
  ${sectionHeading({
    num: '03',
    pill: 'Before You Write',
    title: 'Quick answers to the usual first questions.',
  })}
  ${faqBlock([
    { q: 'What information do you need to prepare a quotation?', a: 'Commodity and grade, approximate volume in metric tons, packing format (bagged, bottled, jerrycan or flexitank), delivery port and your preferred Incoterm — FOB, CIF or delivered.' },
    { q: 'Do you handle customs clearance in Saudi Arabia and the UAE?', a: 'Yes. Our logistics desk prepares the full conformity document pack, coordinates customs clearance and delivers to your nominated warehouse or port-side collection point.' },
    { q: 'Can you supply samples before a bulk booking?', a: 'Yes. Working samples of every rice grade and edible oil are available from both the Jeddah and Dubai offices on request.' },
    { q: 'Which ports do you ship from?', a: 'Primarily Jeddah Islamic Port in Saudi Arabia and Jebel Ali in the United Arab Emirates, with onward freight to Gulf, African and Asian destinations.' },
  ])}
</section>`;
}
