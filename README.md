# Onamma Nwosu — Portfolio

A pixel-accurate implementation of the Figma file
[**portfolio-2**](https://www.figma.com/design/sMEWZpxwvaahHFijGmfoJT/portfolio-2?node-id=0-1),
built with Vite + React and Framer Motion.

Six frames are implemented:

| Route | Figma frame |
| --- | --- |
| `/` | `portfolio` (1:34) |
| `/case-study/sora` | `Case Study / SORA` (1:763) |
| `/case-study/ocicat-ai-studio` | `Case Study / Ocicat AI Studio` (1:918) |
| `/case-study/cver` | `Case Study / CVER` (1:1073) |
| `/case-study/vendify` | `Case Study / Vendify` (1:1565) |
| `/case-study/budget-buddy` | `Case Study / Budget Buddy` (1:1745) |

## Getting started

```bash
npm install
npm run dev
```

## Fetching the design's images

The image assets live in the Figma file. `src/data/figmaAssets.js` maps each one
to the node it is exported from; the fetch script renders those nodes through
the Figma REST API and writes them to `public/assets/`:

```bash
FIGMA_TOKEN=figd_xxx npm run fetch:assets
```

Create a token at <https://www.figma.com/developers/api#access-tokens>
(scope: `file_content:read`).

Until this has been run, each image element removes itself and its container's
own fill shows through — **the layout is identical either way**, because every
image box carries the dimensions the design specifies.

## Deploying to Vercel

The repo is already configured — `vercel.json` sets the build command, output
directory and the SPA rewrite that keeps `/case-study/:slug` from 404ing on a
hard refresh.

**Option A — connect the repo (recommended).** In the Vercel dashboard:
*Add New → Project*, import `onaxoxo101/assignment`, and set the production
branch to `claude/figma-portfolio-implementation-43e3tq` (or merge to `main`
first). Vercel detects Vite and reads `vercel.json`; no further settings needed.

**Option B — from your machine.**

```bash
npx vercel            # preview deploy
npx vercel --prod     # production deploy
```

### Images on the deploy

`public/assets/*.png` is git-ignored, so a clean checkout has no image bytes.
The deploy build runs `npm run vercel-build`, which fetches them from Figma
first — add a **`FIGMA_TOKEN`** environment variable in
*Project → Settings → Environment Variables* and every build will pull the
current renders.

Without that variable the build still succeeds and the site ships with the
image boxes empty; nothing about the layout changes. If you would rather not
give Vercel a token, run `npm run fetch:assets` locally, drop the
`public/assets/*.png` line from `.gitignore`, and commit the PNGs instead.

## Single-file preview build

```bash
npm run build:preview
```

Bundles the entire app — React, Framer Motion and the Geist fonts — into one
self-contained HTML document at `dist-artifact/artifact/index.html`, with no
external requests. Useful for sharing a working preview without hosting.

It differs from the deployed build in two ways, both about the viewing surface
rather than the design: it uses `HashRouter`, since there is no server to
rewrite deep paths, and it scales the 1440px artboard down to fit narrower
viewports the way Figma previews a frame (1:1 at 1440px and above). It also
sets `__OMIT_ASSETS__`, so image elements are skipped rather than requesting
PNGs that a single file cannot carry.

## Verifying fidelity

```bash
npm run build
npm run preview          # in one shell
npm run verify           # in another
```

`npm run verify` renders every route in Chromium at 1440px and asserts that the
page and each section match the height Figma reports for the corresponding
frame. All six frames currently match exactly.

## How the design is encoded

- **Fixed artboard.** The brief asks for the web experience only, so the page is
  rendered at its designed 1440px width and centred rather than reflowed. There
  is no responsive pass yet.
- **Tokens.** `src/styles/tokens.css` holds every colour, radius and shared
  measurement, each commented with the node it came from.
- **Inside strokes.** Figma strokes are inside-aligned and do not grow a frame.
  Auto-sized bordered frames therefore use `box-shadow: inset 0 0 0 Npx` rather
  than `border`, which would add to the box.
- **Line boxes.** Figma's "Auto" line height for Geist resolves to ~1.31, while
  Chromium's `normal` is ~1.29. Every text rule sets an explicit `line-height`
  equal to the line box Figma reports, so text blocks land on the designed
  heights.
- **Hidden layers.** `Section / Project details` exists in all five case-study
  frames but is `hidden` in the file, so it is deliberately not rendered.

## Motion

Framer Motion is used sparingly and never moves an element away from its Figma
position: entrance fades that settle at the designed coordinates, a hover lift
on cards and buttons, the hero marquee, and the case-study screen carousel.
All of it is disabled under `prefers-reduced-motion`.

## Known gaps

- **Image bytes are not committed.** The session that generated this code had
  `figma.com` and `api.figma.com` blocked by an egress policy, so the renders
  could not be downloaded. Run `npm run fetch:assets` (above) to populate them.
- **Two colours could not be read from the file.** The MCP bridge exports the
  "Available to work" dot (1:58) as a flat SVG without surfacing its fill, so
  `--available` is sampled from the node render. The `portfolio` frame's own
  background fill is likewise not exposed; `--page-bg` uses Figma's default
  `#ffffff`. Both are single tokens in `src/styles/tokens.css`.
- **Two icons are redrawn.** The "Contact Me" arrow (1:44) and the download
  glyph (1:56) are inline SVGs built to the exact box and rotation Figma
  reports, rather than the original exports, for the same network reason.

## Legacy site

The previous static HTML portfolio has been moved to `legacy/` — Vite requires
`index.html` at the repository root.
