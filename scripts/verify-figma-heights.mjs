#!/usr/bin/env node
/**
 * Regression check for design fidelity.
 *
 * Renders each route in Chromium at the artboard width and asserts that the
 * page — and each section inside it — matches the height Figma reports for the
 * corresponding frame. A drift here means a spacing, line-height or padding
 * value has moved away from the design.
 *
 *   npm run build && npm run preview   # in one shell
 *   npm run verify                     # in another
 */
import { chromium } from 'playwright'

const ORIGIN = process.env.ORIGIN ?? 'http://localhost:4173'

/** Figma frame heights, read from the design file. */
const PAGES = [
  {
    route: '/',
    frame: 'portfolio (1:34)',
    total: 7918,
    sections: {
      '.hero': 1470,
      '.projects': 2364,
      '.about': 964,
      '.process': 719,
      '.tools': 363,
      '.reviews': 734,
      '.cta': 722,
      '.footer': 582,
    },
  },
  { route: '/case-study/sora', frame: 'Case Study / SORA (1:763)', total: 3884 },
  { route: '/case-study/ocicat-ai-studio', frame: 'Case Study / Ocicat AI Studio (1:918)', total: 3885 },
  { route: '/case-study/cver', frame: 'Case Study / CVER (1:1073)', total: 4072 },
  { route: '/case-study/vendify', frame: 'Case Study / Vendify (1:1565)', total: 3944 },
  { route: '/case-study/budget-buddy', frame: 'Case Study / Budget Buddy (1:1745)', total: 3774 },
]

// Honour a preinstalled Chromium when one is provided.
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
)
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })

let failures = 0

for (const { route, frame, total, sections } of PAGES) {
  await page.goto(ORIGIN + route, { waitUntil: 'networkidle' })

  const measured = await page.evaluate((sel) => {
    const out = { total: document.documentElement.scrollHeight, sections: {} }
    for (const s of sel) {
      const el = document.querySelector(s)
      out.sections[s] = el ? Math.round(el.getBoundingClientRect().height) : null
    }
    return out
  }, Object.keys(sections ?? {}))

  const ok = measured.total === total
  if (!ok) failures += 1
  console.log(
    `${ok ? '✓' : '✗'} ${route.padEnd(30)} ${String(measured.total).padStart(5)}px  ` +
      `(Figma ${frame}: ${total}px)`
  )

  for (const [sel, want] of Object.entries(sections ?? {})) {
    const got = measured.sections[sel]
    const good = got === want
    if (!good) failures += 1
    console.log(`   ${good ? '✓' : '✗'} ${sel.padEnd(12)} ${String(got).padStart(5)}px  (want ${want}px)`)
  }
}

await browser.close()

console.log(failures ? `\n${failures} mismatch(es).` : '\nAll frames match the Figma heights.')
process.exitCode = failures ? 1 : 0
