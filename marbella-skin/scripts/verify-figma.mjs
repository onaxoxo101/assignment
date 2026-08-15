import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

// Compares the built page against every coordinate read out of the Figma
// file. Run `npm run build` first, then `npm run verify:figma`.
// Requires: npm i -D playwright  (and a Chromium install)
const ROOT = new URL('../dist', import.meta.url).pathname;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2' };

const server = createServer(async (req, res) => {
  const raw = req.url.split('?')[0];
  const p = raw === '/' ? '/index.html' : raw;
  try {
    const buf = await readFile(join(ROOT, p));
    res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' });
    res.end(buf);
  } catch {
    res.writeHead(404).end('nope');
  }
});
await new Promise((r) => server.listen(4178, r));

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--no-sandbox'],
});
// Measure the resting layout: Reveal() sets initial={false} under reduced
// motion, so nothing is mid-transform when the boxes are read.
const page = await browser.newPage({ viewport: { width: 1440, height: 1024 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
await page.goto('http://127.0.0.1:4178/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
// settle every scroll-reveal so measurement sees the resting layout
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 400) window.scrollTo(0, y);
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1500);

/**
 * checks: [selector, {w, h, top, left, textW}]
 * `top`/`left` are relative to the closest `section` ancestor.
 * `textW` measures the inked text advance via a Range (not the block box).
 */
const CHECKS = [
  // ---- page + sections (Figma 41:2 and its five children) ----
  ['.canvas', { w: 1440, h: 4099 }],
  ['.hero', { w: 1440, h: 1024 }],
  ['.philosophy', { w: 1440, h: 643 }],
  ['.concerns', { w: 1440, h: 972 }],
  ['.products', { w: 1440, h: 765 }],
  ['.benefits', { w: 1440, h: 695 }],

  // ---- 01 / Hero (from 19:36) ----
  ['.hero__panel--left', { w: 687, h: 863, top: 111, left: 31.75 }],
  ['.hero__panel--right', { w: 687, h: 863, top: 111, left: 721.25 }],
  ['.hero__nav', { w: 1346, h: 49, top: 33, left: 47 }],
  ['.hero__links', { w: 441, h: 22 }],
  ['.hero__wordmark', { textW: 127, h: 29 }],
  ['.hero__socials', { w: 179 }],
  ['.hero__title', { w: 637, h: 132, top: 213, left: 743 }],
  ['.hero__body', { w: 637, h: 105, top: 387, left: 743 }],
  ['.hero__render', { w: 247, h: 247, top: 537, left: 938 }],
  ['.hero__cta', { w: 586, h: 73, top: 836, left: 777 }],

  // ---- 02 / Philosophy (42:x) ----
  ['.philosophy .eyebrow', { textW: 160, h: 16, top: 110 }],
  ['.philosophy__statement', { w: 1000, h: 186, top: 170, left: 220 }],
  ['.philosophy__stats', { w: 1240, h: 155, top: 400, left: 100 }],
  ['.philosophy__cell:nth-child(1)', { w: 412.667 }],
  ['.philosophy__value:nth-of-type(1)', { h: 61 }],
  ['.philosophy__stat:nth-of-type(1) .philosophy__label', { w: 250 }],
  ['.philosophy__rule', { w: 1, h: 72 }],

  // ---- 03 / Skin Concerns (43:x) ----
  ['.concerns__header', { w: 1240, h: 108, top: 96, left: 100 }],
  ['.concerns__title', { w: 490, h: 108 }],
  ['.concerns__pill', { w: 201, h: 46 }],
  ['.concerns__pill span', { textW: 126 }],
  ['.concerns__grid', { w: 1240, h: 622, top: 250, left: 100 }],
  ['.concern', { w: 396, h: 298 }],
  ['.concern__label', { w: 368, h: 40 }],
  ['.concern__arrow', { w: 38, h: 38 }],
  ['.concern__plate', { w: 368, h: 214 }],

  // ---- 04 / Featured Products (45:x) ----
  ['.products__header', { w: 1240, h: 79, top: 90, left: 100 }],
  ['.products__heading', { w: 507, h: 79 }],
  ['.products .eyebrow', { textW: 197, h: 16 }],
  ['.products__title', { textW: 507, h: 53 }],
  ['.products__pill', { w: 217, h: 48 }],
  ['.products__pill span', { textW: 142 }],
  ['.products__row', { w: 1240, h: 458, top: 213, left: 100 }],
  ['.product:nth-child(1)', { w: 396, h: 428 }],
  ['.product:nth-child(2)', { w: 396, h: 458 }],
  ['.product:nth-child(1) .product__stage', { w: 352, h: 256 }],
  ['.product:nth-child(2) .product__stage', { w: 352, h: 286 }],
  ['.product:nth-child(1) .product__meta', { w: 352, h: 49 }],
  ['.product:nth-child(1) .product__buy', { w: 352, h: 41 }],
  ['.product__bag', { w: 114, h: 41 }],
  ['.product:nth-child(1) .product__desc', { h: 20 }],

  // ---- 05 / Benefits (46:x) ----
  ['.benefits__heading', { w: 447, h: 83, top: 100, left: 496.5 }],
  ['.benefits .eyebrow', { textW: 153, h: 16 }],
  ['.benefits__title', { textW: 447, h: 53 }],
  ['.benefits__grid', { w: 1240, h: 352, top: 239, left: 100 }],
  ['.benefit', { w: 580, h: 176 }],
  ['.benefit__rule', { w: 580, h: 1 }],
  ['.benefit__row', { w: 580, h: 85 }],
  ['.benefit__n', { w: 38, h: 27 }],
  ['.benefit__text', { w: 518, h: 85 }],
  ['.benefit:nth-child(2) .benefit__body', { w: 518, h: 48 }],
];

// text-advance checks that vary per instance
const TEXT_SETS = [
  ['.concern__title', [85, 68, 75, 90, 86, 88], 21, 'concern titles'],
  ['.concern__sub', [96, 90, 80, 62, 86, 89], 16, 'concern subs'],
  ['.philosophy__value', [84, 110, 63], 61, 'stat numbers'],
  ['.product__name', [173, 200, 182], 22, 'product names'],
  ['.product__price', [76, 76, 73], 32, 'prices'],
  ['.benefit__title', [192, 212, 198, 233], 25, 'benefit titles'],
  ['.hero__link', [55, 101, 64, 89], 22, 'hero nav links'],
];

const results = await page.evaluate(({ CHECKS, TEXT_SETS }) => {
  const textWidth = (el) => {
    const r = document.createRange();
    r.selectNodeContents(el);
    return r.getBoundingClientRect().width;
  };
  const out = [];
  for (const [sel, exp] of CHECKS) {
    const el = document.querySelector(sel);
    if (!el) { out.push({ sel, missing: true }); continue; }
    const b = el.getBoundingClientRect();
    const sec = el.closest('section');
    const s = sec ? sec.getBoundingClientRect() : { top: 0, left: 0 };
    const got = { w: b.width, h: b.height, top: b.top - s.top, left: b.left - s.left, textW: textWidth(el) };
    const diffs = [];
    for (const k of Object.keys(exp)) diffs.push([k, exp[k], got[k], got[k] - exp[k]]);
    out.push({ sel, diffs });
  }
  const sets = [];
  for (const [sel, widths, h, label] of TEXT_SETS) {
    const els = [...document.querySelectorAll(sel)];
    sets.push({
      label, sel,
      got: els.map((e) => +textWidth(e).toFixed(1)),
      exp: widths,
      h: els.map((e) => +e.getBoundingClientRect().height.toFixed(1)),
      expH: h,
    });
  }
  // line-count sanity for the wrapped blocks
  const lines = (sel, lh) => {
    const el = document.querySelector(sel);
    return el ? Math.round(el.getBoundingClientRect().height / lh) : -1;
  };
  return {
    out, sets,
    wraps: {
      statement: lines('.philosophy__statement', 62),
      concernsTitle: lines('.concerns__title', 54),
      heroTitle: lines('.hero__title', 66),
      heroBody: lines('.hero__body', 35),
      benefitBody: lines('.benefit__body', 24),
      statLabel3: lines('.philosophy__cell:nth-child(3) .philosophy__label', 24),
      statLabel1: lines('.philosophy__cell:nth-child(1) .philosophy__label', 24),
    },
  };
}, { CHECKS, TEXT_SETS });

const TOL = 1.0;
let fails = 0, warns = 0;
console.log('--- box + position checks (tolerance 1px) ---');
for (const r of results.out) {
  if (r.missing) { console.log(`MISSING  ${r.sel}`); fails++; continue; }
  const bad = r.diffs.filter(([, , , d]) => Math.abs(d) > TOL);
  if (bad.length) {
    fails++;
    console.log(`FAIL  ${r.sel}`);
    for (const [k, e, g, d] of bad) console.log(`        ${k}: figma ${e}  got ${g.toFixed(2)}  Δ${d > 0 ? '+' : ''}${d.toFixed(2)}`);
  }
}
console.log(fails ? `\n${fails} box check(s) outside tolerance` : 'all box checks within 1px');

console.log('\n--- text advance widths (Figma text-node widths) ---');
for (const s of results.sets) {
  const deltas = s.got.map((g, i) => g - s.exp[i]);
  const worst = Math.max(...deltas.map(Math.abs));
  const pct = Math.max(...deltas.map((d, i) => Math.abs(d / s.exp[i]))) * 100;
  if (worst > 3) warns++;
  console.log(`${worst > 3 ? 'WARN' : 'ok  '}  ${s.label.padEnd(16)} figma=[${s.exp}] got=[${s.got}] worstΔ=${worst.toFixed(1)}px (${pct.toFixed(1)}%)  h=[${s.h}] exp ${s.expH}`);
}

console.log('\n--- wrap / line counts ---');
console.log(results.wraps);

await page.screenshot({ path: new URL('../figma-verify.png', import.meta.url).pathname, fullPage: true });
await browser.close();
server.close();
console.log(`\nfails=${fails} warns=${warns}`);
process.exitCode = fails ? 1 : 0;
