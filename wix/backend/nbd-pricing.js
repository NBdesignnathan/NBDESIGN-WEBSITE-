// NBDesign sign shop: prices and pricing rules.
// This is the ONE place to change prices. The configurator on the page
// loads these values from here, and the cart re-checks every price here,
// so customers can't change a price in their browser.
//
// All prices are AUD and include GST. PLACEHOLDER VALUES: replace with your real rates.
//   mode 'area'  -> priced by the m2 of each listed size in `presets` (the only sizes customers can pick);
//                   rate is $ per square metre, min is the minimum charge for the whole line
//                   (e.g. 50 small stickers still cost at least $35 in total)
//   mode 'fixed' -> each size has its own price
//   option 'm' multiplies the unit price (1.2 = +20%), 'a' adds dollars per unit
//   curve: volume pricing, $ per m2 by total m2 ordered (see corflute); replaces rate
//   rotate: true offers Landscape / Portrait (sizes are listed landscape; portrait swaps width and height)
//   option 'ey' draws eyelets on the live proof: '4' = all four corners, 'top' = top corners only, 'edge' = every ~500mm around the edges

export const PRODUCTS = [
  // Corflute is priced to match Easy Signs (easysigns.com.au, prices published Nov 2026, inc GST, 5mm single sided):
  // the price per m2 falls as the total m2 ordered rises. Curve points are [total m2 in the order, $ per m2];
  // they reproduce Easy Signs' examples (4 x 600x900 $34.38 ea, 20 x $13.59, 100 x $9.28, 4 x 900x1200 $38.92, 10 x 600x450 $13.75).
  // noBulk: the curve already gives the volume discount. The $120 minimum is per order: see ORDER_MIN.
  { id: 'corflute', catalogue: true, rotate: true, name: 'Corflute Signs', shape: 'board', mode: 'area', noBulk: true, max: [2400, 1200],
    curve: { points: [[4.32, 36.0347], [10.8, 25.158], [54, 17.1926]], floor: 10.29 },
    blurb: 'Lightweight fluted plastic for real estate, events, site and election signage.',
    presets: [[600, 450], [900, 600], [1200, 900], [2400, 1200]],
    options: [
      { id: 'board', label: 'Board', choices: [{ l: '3mm standard', m: 1 }, { l: '5mm heavy duty', m: 1 }] },
      { id: 'sides', label: 'Print', choices: [{ l: 'Single sided', m: 1 }, { l: 'Double sided', m: 1.6 }] },
      { id: 'finish', label: 'Finishing', choices: [{ l: 'None', a: 0 }, { l: 'Eyelets – all 4 corners', a: 2, ey: '4' }, { l: 'Eyelets – top 2 corners', a: 2, ey: 'top' }] }] },
  { id: 'pvc-banner', rotate: true, name: 'PVC Banners', shape: 'banner', mode: 'area', noBulk: true, max: [10000, 3000], 
    curve: { points: [[6, 74.9346], [9, 67.678]], floor: 36.7852 },  // set so 1 x 2000x1000 = $237.00 (curve shape from Easy Signs vinyl banners)
    blurb: '510gsm vinyl, finished with hemmed edges or eyelets every 500mm.',
    presets: [[2000, 1000], [3000, 1000], [4000, 1000]],
    options: [
      { id: 'mat', label: 'Material', choices: [{ l: '510gsm PVC', m: 1 }, { l: 'Blockout (double sided)', m: 1.55 }] },
      { id: 'finish', label: 'Finishing', choices: [{ l: 'Hemmed edges', a: 5 }, { l: 'Eyelets', a: 10, ey: 'edge' }] }] },
  // One size only. $265 for 1-2 banners, $165 each for 3 or more.
  // noMarkup: prices here are final (MARKUP not added). tiers: this product's own [from qty, discount] steps.
  { id: 'mesh-banner', name: 'Mesh Construction Banners', shape: 'mesh', mode: 'fixed', noMarkup: true, tiers: [[1, 0], [3, 100 / 265]],
    blurb: 'Wind-permeable mesh for construction fencing and scaffolding.',
    sizes: [{ n: 'Standard fence panel', w: 2400, h: 1600, p: 265 }],
    options: [{ id: 'finish', label: 'Finishing', choices: [{ l: 'Hems + eyelets', a: 0, ey: 'edge' }, { l: 'Reinforced corners', a: 18, ey: 'edge' }] }] },
  { id: 'pull-up', name: 'Pull-Up Banners', shape: 'pullup', mode: 'fixed', noMarkup: true,
    blurb: 'Retractable stand with carry bag. Trade shows, foyers and expos.',
    sizes: [{ w: 850, h: 2000, p: 225 }],  // final price (noMarkup: MARKUP not added)
    options: [{ id: 'base', label: 'Stand', choices: [{ l: 'Standard base – Silver', a: 0 }, { l: 'Premium base – Black', a: 25 }] }] },
  { id: 'a-frame', catalogue: true, name: 'A-Frame Signs', shape: 'aframe', mode: 'fixed',
    blurb: 'Double-sided footpath signs with two printed inserts included.',
    sizes: [{ w: 600, h: 900, p: 162.50 }, { w: 900, h: 1200, p: 350 }],  // Easy Signs insertable A-frame
    options: [{ id: 'frame', label: 'Frame', choices: [{ l: 'Black frame – Corflute inserts', a: 0 }, { l: 'Black frame – Metal face', a: 70 }] }] },
  { id: 'vehicle-magnets', rotate: true, name: 'Vehicle Magnets', shape: 'magnet', mode: 'area', noBulk: true, rate: 231, max: [1200, 600],  // Easy Signs car magnets: $231/m²
    blurb: '0.8mm magnetic sheet for doors and tailgates. Removable and reusable.',
    presets: [[600, 300], [600, 450], [900, 300]],
    options: [{ id: 'corner', label: 'Corners', choices: [{ l: 'Square corners', a: 0 }] }] },
  { id: 'stickers', rotate: true, name: 'Stickers & Decals', shape: 'sticker', mode: 'area', noBulk: true, max: [1300, 3000], 
    curve: { points: [[0.75, 190.1733], [1.92, 91.8698], [2.5, 81.708]], floor: 40 },  // Easy Signs custom stickers
    blurb: 'Printed vinyl for windows, products, equipment and vehicles.',
    presets: [[100, 100], [300, 300], [600, 200], [1000, 500]],
    options: [
      { id: 'vinyl', label: 'Vinyl', choices: [{ l: 'Gloss', m: 1 }, { l: 'Matte', m: 1 }] },
      { id: 'cut', label: 'Cut', choices: [{ l: 'Square cut', m: 1 }, { l: 'Contour cut to shape', m: 1.15 }] }] },
  { id: 'acrylic', rotate: true, name: 'Acrylic Signs', shape: 'acrylic', mode: 'area', noBulk: true, rate: 247.5, max: [1800, 1200],  // Easy Signs acrylic: $247.50/m² 3mm
    blurb: 'Premium reception, door and office signs. Direct UV print.',
    presets: [[300, 200], [600, 400], [900, 600], [1200, 600]],
    options: [
      { id: 'sheet', label: 'Sheet', choices: [{ l: '3mm clear', m: 1 }, { l: '5mm clear', m: 1.1235 }, { l: '3mm white', m: 1 }] },
      { id: 'mount', label: 'Mounting', choices: [{ l: 'None', a: 0 }, { l: '4 chrome standoffs', a: 48 }, { l: 'Double-sided tape', a: 7.20 }] }] },
  // Business cards: price is per set (one design). The pack size option scales the price.
  // noBulk: true turns off the bulk discount, since pack sizes already carry the volume pricing.
  { id: 'business-cards', noMarkup: true, rotate: true, name: 'Business Cards', shape: 'card', mode: 'fixed', noBulk: true, qtyLabel: 'Sets (one per name or design)',
    blurb: '350gsm card, standard 90 × 55mm. Order one set per staff member or design.',
    sizes: [{ n: 'Standard', w: 90, h: 55, p: 176.4706 }],  // final prices (no MARKUP): 250 single sided = $150.00 (x 0.85)
    options: [
      { id: 'pack', label: 'Cards per set', choices: [{ l: '250 cards', m: 1 }, { l: '500 cards', m: 1.4529 }, { l: '1000 cards', m: 2.1108 }, { l: '2000 cards', m: 3.0668 }] },
      { id: 'sides', label: 'Print', choices: [{ l: 'Single sided', m: 0.85 }, { l: 'Double sided', m: 1 }] },
      { id: 'finish', label: 'Finish', choices: [{ l: 'Matte laminate', m: 1 }, { l: 'Gloss laminate', m: 1 }, { l: 'Soft-touch velvet', m: 1.4 }] },
      { id: 'corners', label: 'Corners', choices: [{ l: 'Square', a: 0 }, { l: 'Rounded', a: 0 }] }] },
  // Bow banners (feather flags): sizes are the printed flag, price includes pole + base
  { id: 'bow-banners', name: 'Bow Banners', shape: 'flag', mode: 'fixed',
    blurb: 'Curved-top outdoor flags on a fibreglass pole. Shopfronts, events, open homes.',
    sizes: [{ n: 'Small 2.4m', w: 700, h: 2400, p: 167.64 }, { n: 'Medium 3m', w: 800, h: 3000, p: 204.60 }, { n: 'Large 4m', w: 900, h: 4000, p: 236.28 }],  // Easy Signs bow banners
    options: [
      { id: 'print', label: 'Print', choices: [{ l: 'Double sided (blockout)', m: 1 }] },
      { id: 'kit', label: 'Hardware', choices: [{ l: 'Pole + ground spike', a: 0 }, { l: 'Pole + 20L water base', a: 55 }] }] },
  // Posters: final prices (noMarkup: MARKUP not added); the normal bulk discount applies.
  // Sizes are listed landscape; port: true opens the product in portrait.
  { id: 'posters', name: 'Posters', shape: 'poster', mode: 'fixed', rotate: true, port: true, noMarkup: true,
    blurb: 'Full colour posters on 200gsm paper. Shop windows, events, menus and notice boards.',
    sizes: [{ n: 'A5', w: 210, h: 148, p: 6 }, { n: 'A4', w: 297, h: 210, p: 9 }, { n: 'A3', w: 420, h: 297, p: 14 }, { n: 'A1', w: 841, h: 594, p: 38 }, { n: '750 × 1000', w: 1000, h: 750, p: 48 }, { n: 'A0', w: 1189, h: 841, p: 65 }],
    options: [
      { id: 'paper', label: 'Paper', choices: [{ l: '200gsm satin', m: 1 }] }] },
  // Media walls: one size, fabric on a straight frame. Final price (noMarkup), flat each (noBulk).
  { id: 'media-walls', name: 'Media Wall + Backdrop', shape: 'mediawall', mode: 'fixed', noBulk: true, noMarkup: true,
    blurb: 'Step-and-repeat logo walls for red carpets, galas and sponsor photos. Non-glare print.',
    sizes: [{ n: '2.4m wide × 2.2m high', w: 2400, h: 2200, p: 498.50 }],
    options: [
      { id: 'mat', label: 'Material', choices: [{ l: 'Premium fabric', m: 1 }] },
      { id: 'sides', label: 'Print', choices: [{ l: 'Single sided', m: 1 }, { l: 'Double sided', m: 1.18 }] },
      { id: 'kit', label: 'Hardware', choices: [{ l: 'Straight frame', a: 0 }] }] }
];

// Bulk discount: [minimum quantity, discount]
export const TIERS = [[1, 0], [5, 0.08], [10, 0.15], [25, 0.22], [50, 0.28]];

export const SPEED = [
  { id: 'std', l: 'Standard', s: '3–4 business days', m: 1 }
  // To offer express again, add e.g. { id: 'exp', l: 'Express', s: 'Next business day', m: 1.35 }
];

// Design service is added to the cart as its own line, charged once per sign line.
// Markup on every product price (sizes, rates and curves). 1.2 = 20% above the prices listed above.
// Option add-ons (a: ...) are NOT marked up: they are charged exactly as written, so the +$ on the button is the real price.
// Minimum order, freight, design fee and trade catalogue prices are not marked up.
export const MARKUP = 1.2;

export const DESIGN_FEE = 65;
export const ART = [
  { id: 'upload', l: 'Upload print-ready file', s: 'Use the upload button below', fee: 0 },
  { id: 'design', l: 'We design it for you', s: 'Proof emailed for approval', fee: DESIGN_FEE },
  { id: 'later', l: "I'll email my artwork", s: 'Send to Sales@nbdesign.net.au', fee: 0 },
  { id: 'catalogue', l: 'Choose from our sign catalogue', s: 'Free · ready-made common signs', fee: 0 }
];

import { CATALOGUE } from 'backend/nbd-catalogue';

export const MIN_MM = 50;

// Freight: one flat charge per order incl. GST, any number of items. Shown in the configurator's price box;
// the actual charge is set in Wix: Settings > Shipping & Fulfillment (see SETUP.md step 1).
export const FREIGHT = 35;

// Minimum charge for the whole order (all products + design fees, before freight).
// Orders under this get a "Minimum order top-up" fee at cart/checkout: see service-plugin/nbdMinOrder.js.
export const ORDER_MIN = 120;

export function curveRate(c, A) {
  // Price per m2 for a total order area A (m2): straight lines on a log-log scale between the curve's points,
  // continued past the ends, never below the floor.
  const p = c.points, L = Math.log; let i = 0;
  if (A >= p[p.length - 1][0]) i = p.length - 2; else while (i < p.length - 2 && A > p[i + 1][0]) i++;
  const [a1, r1] = p[i], [a2, r2] = p[i + 1], b = (L(r2) - L(r1)) / (L(a2) - L(a1));
  return Math.max(c.floor || 0, r1 * Math.exp(b * (L(Math.max(A, 0.01)) - L(a1))));
}

export function discountFor(qty, tiers = TIERS) {
  let d = 0;
  for (const [t, v] of tiers) if (qty >= t) d = v;
  return d;
}

const round2 = (n) => Math.round(n * 100) / 100;

// Validate a configuration sent from the browser. Returns a clean config or null.
// cfg: { product, w, h, size, orient, opts: {optionId: choiceIndex}, speed, art, design, note }
export function cleanConfig(cfg) {
  if (!cfg) return null;
  const p = PRODUCTS.find((x) => x.id === cfg.product);
  if (!p) return null;
  let w, h, size = 0;
  if (p.mode === 'fixed') {
    size = parseInt(cfg.size, 10) || 0;
    if (!p.sizes[size]) return null;
    w = p.sizes[size].w; h = p.sizes[size].h;
    if (p.rotate && cfg.orient === 'port' && w > h) [w, h] = [h, w];
  } else {
    w = Math.round(Number(cfg.w)); h = Math.round(Number(cfg.h));
    // Online orders are limited to the listed sizes (either way round if the product rotates).
    // Custom sizes go through the Custom Size Request form.
    const ok = p.presets.some(([pw, ph]) => (pw === w && ph === h) || (p.rotate && pw === h && ph === w));
    if (!ok) return null;
  }
  const orient = h > w ? 'port' : 'land';
  const opts = {};
  for (const o of p.options) {
    const i = parseInt((cfg.opts || {})[o.id], 10) || 0;
    opts[o.id] = o.choices[i] ? i : 0;
  }
  const speed = SPEED.some((s) => s.id === cfg.speed) ? cfg.speed : 'std';
  let art = ART.some((a) => a.id === cfg.art) ? cfg.art : 'later';
  let design = '', note = '';
  if (art === 'catalogue') {
    // only products that offer the catalogue, and only real catalogue codes
    if (!p.catalogue || !CATALOGUE.some((d) => d.code === cfg.design)) return null;
    design = cfg.design;
    note = String(cfg.note || '').replace(/\s+/g, ' ').trim().slice(0, 200);
  }
  const approved = cfg.approved === true || cfg.approved === '1';
  return { product: p.id, w, h, size, opts, speed, art, orient, design, note, approved };
}

// Unit price incl. GST for a clean config at a given quantity
export function unitPrice(cfg, qty) {
  const p = PRODUCTS.find((x) => x.id === cfg.product);
  const q = Math.max(1, qty | 0);
  const area = cfg.w * cfg.h / 1e6;
  let unit = p.mode === 'fixed' ? p.sizes[cfg.size].p : p.curve ? curveRate(p.curve, area * q) * area : area * p.rate;
  let adds = 0;
  for (const o of p.options) {
    const ch = o.choices[cfg.opts[o.id] || 0];
    if (ch.m) unit *= ch.m;
    if (ch.a) adds += ch.a;
  }
  const base = unit * (p.noMarkup ? 1 : MARKUP);
  if (p.tiers) unit = Math.max(0, base * (1 - discountFor(q, p.tiers)) + adds); // own quantity steps: add-ons stay full price
  else unit = Math.max(0, base + adds) * (1 - (p.noBulk ? 0 : discountFor(q))); // add-ons (a) are charged exactly as listed
  unit *= SPEED.find((s) => s.id === cfg.speed).m;
  return round2(unit);
}

// The text lines shown under the item in the cart, checkout and order emails
export function describe(cfg, file) {
  const p = PRODUCTS.find((x) => x.id === cfg.product);
  const sz = p.mode === 'fixed' && p.sizes[cfg.size].n ? `${p.sizes[cfg.size].n}, ` : '';
  const lines = [{ name: 'Size', value: `${sz}${cfg.w} × ${cfg.h} mm` }];
  if (p.rotate && cfg.w !== cfg.h) lines.push({ name: 'Orientation', value: cfg.orient === 'port' ? 'Portrait' : 'Landscape' });
  for (const o of p.options) lines.push({ name: o.label, value: o.choices[cfg.opts[o.id] || 0].l });
  const sp = SPEED.find((s) => s.id === cfg.speed);
  lines.push({ name: 'Turnaround', value: `${sp.l} (${sp.s})` });
  const art = ART.find((a) => a.id === cfg.art);
  if (cfg.art === 'catalogue') {
    const d = CATALOGUE.find((x) => x.code === cfg.design);
    lines.push({ name: 'Artwork', value: `Catalogue ${d.code}: ${d.title}` });
    if (cfg.note) lines.push({ name: 'Notes', value: cfg.note });
  } else lines.push({ name: 'Artwork', value: cfg.art === 'upload' && file ? `Uploaded: ${file}` : art.l });
  lines.push({ name: 'Proof', value: !cfg.approved ? 'Not approved' : cfg.art === 'design' ? 'Proof to be emailed for approval'
    : (cfg.art === 'later' || (cfg.art === 'upload' && !file)) ? 'Customer to email artwork, prints as supplied'
    : 'Approved by customer as supplied (spelling, colours, layout)' });
  return lines;
}

// Options travel through the Wix cart as strings. These two convert both ways.
export function toRefOptions(cfg, file) {
  return {
    w: String(cfg.w), h: String(cfg.h), size: String(cfg.size), orient: cfg.orient || 'land',
    opts: Object.entries(cfg.opts).map(([k, v]) => `${k}=${v}`).join('|'),
    speed: cfg.speed, art: cfg.art, file: file ? String(file).slice(0, 120) : '',
    design: cfg.design || '', note: cfg.note || '', approved: cfg.approved ? '1' : ''
  };
}

export function fromRefOptions(product, o = {}) {
  const opts = {};
  String(o.opts || '').split('|').forEach((pair) => {
    const [k, v] = pair.split('=');
    if (k) opts[k] = v;
  });
  return cleanConfig({ product, w: o.w, h: o.h, size: o.size, orient: o.orient, opts, speed: o.speed, art: o.art, design: o.design, note: o.note, approved: o.approved });
}
