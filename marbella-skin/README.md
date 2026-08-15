# Marbella Skin — landing page

Implementation of Figma node `41:2` ("Landing Page — Marbella Skin", 1440 × 4099)
from `figma.com/design/1Bz0akrOkr92iLExZ7nedi`.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build
npm run verify:figma   # geometry check against the Figma coordinates
```

## Stack

- **Vite** + React + TypeScript
- **Framer Motion** for the scroll reveals and hover states
- Plain CSS with custom properties — no utility framework, so every value in the
  stylesheets is the literal Figma number and stays greppable against the design

## Scope

Desktop only, per the brief. The canvas is fixed at 1440px; there is no
responsive or mobile layout yet.

## Layout

| Section | Figma node | y | Height |
|---|---|---|---|
| 01 / Hero | `41:3` (built from `19:36` — see below) | 0 | 1024 |
| 02 / Philosophy | `42:2` | 1024 | 643 |
| 03 / Skin Concerns | `43:2` | 1667 | 972 |
| 04 / Featured Products | `45:2` | 2639 | 765 |
| 05 / Benefits | `46:2` | 3404 | 695 |

## Structure

```
src/
  sections/      one component + one stylesheet per Figma section frame
  components/    Reveal (scroll animation), Icons (arrow glyphs)
  styles/
    tokens.css   every colour, size and radius, tagged by provenance
    global.css   reset + the three shared primitives (eyebrow, title, pill)
scripts/
  verify-figma.mjs   renders the build and asserts it against Figma geometry
```

Each stylesheet cites the Figma node id it implements, so any number can be
traced back to the design.

## Motion

Animations only ever touch `opacity` and `transform`, and always resolve to
`opacity: 1` / `translate: 0`. The resting page is therefore pixel-identical to
a no-motion render, which is what the verifier measures. `prefers-reduced-motion`
skips the entry animations entirely.

## Read this before changing colours or fonts

**[FIGMA-FIDELITY.md](../FIGMA-FIDELITY.md)** — the Figma MCP quota was exhausted
during implementation, so colours, font families, radii and three image assets
could not be read from the file and are reasoned stand-ins. That document lists
exactly what is exact, what was solved for, and what needs a second pass.
