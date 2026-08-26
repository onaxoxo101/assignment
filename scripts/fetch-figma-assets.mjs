#!/usr/bin/env node
/**
 * Render every node listed in src/data/figmaAssets.js through the Figma REST
 * API and write the PNGs into public/assets/.
 *
 *   FIGMA_TOKEN=figd_xxx npm run fetch:assets
 *
 * A personal access token is created at
 * https://www.figma.com/developers/api#access-tokens (scope: file_content:read).
 *
 * The renders are keyed by node id, so re-running this always reproduces the
 * current state of the design file.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(here, '../public/assets')

const token = process.env.FIGMA_TOKEN
if (!token) {
  console.error(
    'FIGMA_TOKEN is not set.\n' +
      'Create a personal access token at ' +
      'https://www.figma.com/developers/api#access-tokens then run:\n\n' +
      '  FIGMA_TOKEN=figd_xxx npm run fetch:assets\n'
  )
  process.exit(1)
}

// Read the manifest without pulling in Vite's import.meta.env.
const manifestSrc = await import('../src/data/figmaAssets.js').catch(async () => {
  const { readFile } = await import('node:fs/promises')
  const text = await readFile(resolve(here, '../src/data/figmaAssets.js'), 'utf8')
  const stripped = text.replace(/export const asset[\s\S]*$/, '')
  const mod = new Function(`${stripped.replace(/export const/g, 'const')}
    return { FIGMA_FILE_KEY, FIGMA_ASSETS }`)
  return mod()
})

const { FIGMA_FILE_KEY, FIGMA_ASSETS } = manifestSrc

const headers = { 'X-Figma-Token': token }

/** Group the manifest by scale — the images endpoint takes one scale per call. */
const byScale = new Map()
for (const [key, spec] of Object.entries(FIGMA_ASSETS)) {
  const scale = spec.scale ?? 2
  if (!byScale.has(scale)) byScale.set(scale, [])
  byScale.get(scale).push([key, spec.node])
}

await mkdir(outDir, { recursive: true })

let written = 0
let failed = 0

for (const [scale, entries] of byScale) {
  const ids = entries.map(([, node]) => node).join(',')
  const url =
    `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}` +
    `?ids=${encodeURIComponent(ids)}&format=png&scale=${scale}`

  const res = await fetch(url, { headers })
  if (!res.ok) {
    console.error(`  ✗ images request failed (scale ${scale}): ${res.status} ${res.statusText}`)
    failed += entries.length
    continue
  }

  const { images, err } = await res.json()
  if (err) {
    console.error(`  ✗ Figma returned an error (scale ${scale}): ${err}`)
    failed += entries.length
    continue
  }

  for (const [key, node] of entries) {
    const src = images?.[node]
    if (!src) {
      console.warn(`  ✗ ${key} (${node}) — no render returned`)
      failed += 1
      continue
    }
    const img = await fetch(src)
    if (!img.ok) {
      console.warn(`  ✗ ${key} (${node}) — download failed: ${img.status}`)
      failed += 1
      continue
    }
    const bytes = Buffer.from(await img.arrayBuffer())
    await writeFile(resolve(outDir, `${key}.png`), bytes)
    console.log(`  ✓ ${key}.png  (${node} @${scale}x, ${(bytes.length / 1024).toFixed(0)} kB)`)
    written += 1
  }
}

console.log(`\n${written} asset(s) written to public/assets${failed ? `, ${failed} failed` : ''}.`)
if (failed) process.exitCode = 1
