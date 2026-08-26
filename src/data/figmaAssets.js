/**
 * Image assets in the Figma file, keyed by the Figma node they are exported
 * from. `npm run fetch:assets` renders each node through the Figma REST API
 * and writes it to `public/assets/<key>.png` (see scripts/fetch-figma-assets.mjs).
 *
 * Keying by node id rather than by a pre-signed URL keeps the manifest
 * reproducible — Figma's temporary asset URLs expire after ~7 days.
 */
export const FIGMA_FILE_KEY = 'sMEWZpxwvaahHFijGmfoJT'

export const FIGMA_ASSETS = {
  // ---- Landing -----------------------------------------------------
  'hero-portrait': { node: '1:63', scale: 4, note: 'Hero portrait, 253×247' },
  'about-portrait': { node: '1:183', scale: 3, note: 'About portrait, 440×520' },
  'review-avatar': { node: '1:260', scale: 4, note: 'Review 1 avatar, 48×48' },

  // ---- Project card thumbnails (470×340) ---------------------------
  'thumb-sora': { node: '1:78', scale: 2 },
  'thumb-ocicat': { node: '1:98', scale: 2 },
  'thumb-vendify': { node: '1:137', scale: 2 },
  'thumb-budget-buddy': { node: '1:157', scale: 2 },

  // ---- Hero marquee cards (544×430, flattened node renders) --------
  'marquee-1': { node: '1:344', scale: 2 },
  'marquee-2': { node: '1:406', scale: 2 },
  'marquee-3': { node: '1:408', scale: 2 },
  'marquee-4': { node: '1:346', scale: 2 },
  'marquee-5': { node: '1:754', scale: 2 },
  'marquee-6': { node: '1:756', scale: 2 },
  'marquee-7': { node: '1:759', scale: 2 },
  'marquee-8': { node: '1:761', scale: 2 },

  // ---- Case-study hero covers (1200×849) ---------------------------
  'case-sora-cover': { node: '1:794', scale: 2 },
  'case-ocicat-cover': { node: '1:949', scale: 2 },
  'case-cver-cover': { node: '1:1106', scale: 2 },
  'case-vendify-cover': { node: '1:1595', scale: 2 },
  'case-budget-buddy-cover': { node: '1:1778', scale: 2 },

  // ---- Case-study carousel slides (940×650) ------------------------
  // SORA (1:829), Ocicat (1:984), CVER (1:1141), Vendify (1:1630, 1:1654)
  // and Budget Buddy (1:1813).
  'slide-sora-1': { node: '1:830', scale: 2 },
  'slide-sora-2': { node: '1:831', scale: 2 },
  'slide-sora-3': { node: '1:832', scale: 2 },
  'slide-sora-4': { node: '1:833', scale: 2 },

  'slide-ocicat-1': { node: '1:985', scale: 2 },
  'slide-ocicat-2': { node: '1:986', scale: 2 },
  'slide-ocicat-3': { node: '1:987', scale: 2 },
  'slide-ocicat-4': { node: '1:988', scale: 2 },

  // CVER's carousel holds three slide groups against four dots.
  'slide-cver-1': { node: '1:1142', scale: 2 },
  'slide-cver-2': { node: '1:1293', scale: 2 },
  'slide-cver-3': { node: '1:1435', scale: 2 },

  'slide-vendify-1': { node: '1:1631', scale: 2 },
  'slide-vendify-2': { node: '1:1632', scale: 2 },
  'slide-vendify-3': { node: '1:1633', scale: 2 },
  'slide-vendify-4': { node: '1:1634', scale: 2 },

  'slide-vendify-b1': { node: '1:1657', scale: 2 },
  'slide-vendify-b2': { node: '1:1658', scale: 2 },
  'slide-vendify-b3': { node: '1:1659', scale: 2 },
  'slide-vendify-b4': { node: '1:1660', scale: 2 },

  'slide-budget-buddy-1': { node: '1:1815', scale: 2 },
  'slide-budget-buddy-2': { node: '1:1876', scale: 2 },
  'slide-budget-buddy-3': { node: '1:1877', scale: 2 },
  'slide-budget-buddy-4': { node: '1:1878', scale: 2 },
}

/** Public URL for a manifest key. */
export const asset = (key) => `${import.meta.env.BASE_URL}assets/${key}.png`
