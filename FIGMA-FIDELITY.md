# Figma fidelity report — Marbella Skin landing page

Source file: `https://www.figma.com/design/1Bz0akrOkr92iLExZ7nedi` · target node `41:2`
("Landing Page — Marbella Skin", 1440 × 4099).

This document records exactly which parts of the implementation are read from
Figma and which are not, because **the Figma MCP quota ran out partway through
this session** and the remaining reads never completed.

---

## 1. What blocked, and how to unblock it

| | |
|---|---|
| **Symptom** | `get_design_context`, `get_variable_defs`, `get_screenshot` and `download_assets` all return `You've reached the Figma MCP tool call limit on the Starter plan`. |
| **Cause** | The file lives in the team **"Ona Nwosu's team"**, which is on the **Starter** tier with a **View** seat — 20 MCP tool calls *per month*, now exhausted. |
| **Fix** | The same account already has **"Onamma's Team" (Pro tier, Full seat)** = 200 calls/day. Moving or copying the file into that team restores full MCP access immediately. Upgrading the Starter team works too. |
| **Second blocker** | Figma's screenshot/asset URLs are served from `www.figma.com`, which this session's network policy rejects (`403` on CONNECT). So even the render that `get_screenshot` returned could not be downloaded and viewed. |

`get_metadata` **did** return in full before the quota ran out. That payload
carries the complete node tree: every frame, its exact `x`/`y`/`width`/`height`,
and all copy (Figma stores text content in the layer name). That is the
foundation everything below is built on.

## 2. Three tiers of confidence

Every value in `src/styles/tokens.css` is tagged with one of these.

### `[FIGMA]` — exact, do not change
All geometry. Section heights (1024 / 643 / 972 / 765 / 695), the 100px
gutters, the 1240px content column, 396px cards on 26px gaps, 412.667px stat
columns split by 1px rules, 580px benefit columns on an 80px gutter, every
padding and every text-node line-height. These are read directly off the node
tree and are reproduced to the pixel — see §4.

### `[FITTED]` — solved for, high confidence
Font **sizes**. Figma reports the measured width of every text node. A font
size was solved for each type role by least-squares fitting the rendered text
advance against those widths across all strings in the role:

| Role | Size | Figma widths | Rendered | Worst error |
|---|---|---|---|---|
| Section title | 40.3px | 507, 447 | 506.4, 447.5 | 0.6px |
| Stat number | 47px | 84, 110, 63 | 84.4, 110.0, 63.5 | 0.5px |
| Product name | 18px | 173, 200, 182 | 172.5, 200.1, 181.7 | 0.5px |
| Concern title | 17px | 85, 68, 75, 90, 86, 88 | 84.8 … 87.1 | 0.9px |
| Concern sub | 13px | 96, 90, 80, 62, 86, 89 | 96.0 … 88.8 | 1.0px |
| Price | 25px | 76, 76, 73 | 76.7, 76.4, 74.1 | 1.1px |
| Benefit title | 21px | 192, 212, 198, 233 | 190.9 … 234.6 | 2.7px |
| Eyebrow | 14px / 2.6px tracking | 160, 197, 153 | 160.0, 198.2, 153.4 | 1.2px |
| Hero nav link | 15px / 2.27px tracking | 55, 101, 64, 89 | 54.5, 101.4, 64.2, 89.1 | 0.5px |

Two incidental findings worth keeping: the price widths (76 / 76 / **73**)
differ per string, which means the original uses **proportional old-style
figures**, not tabular ones — Playfair Display reproduces that behaviour by
default. And the wrapped blocks all land on the right line count (statement 3,
concerns title 2, hero title 2, hero body 3, benefit bodies 2, third stat label
2 while the other two are 1) which independently corroborates the fitted sizes.

### `[INFERRED]` — replace these first
Nothing about these survives in the metadata payload:

1. **Every colour.** Background, ink, muted text, rules, card surfaces, the
   accent used on buttons, and the six per-card tints in 03 / Skin Concerns.
   All of it is confined to one block in `tokens.css` so it can be swapped
   wholesale.
2. **Font families.** Playfair Display + Inter were chosen because they fit the
   measured widths best out of 24 candidates, not because the file names them.
   Swap `--font-display` / `--font-sans` and re-run the verifier; the fitted
   sizes will need re-solving for a different family.
3. **Corner radii, borders, shadows.** Figma reports node *type*
   (`rounded-rectangle`) but not the radius value.
4. **Three image-filled nodes**, which could not be exported:
   - `19:37` / `19:38` — the two 687×863 hero panels.
   - `19:41` — the 247×247 background-removed product render in the hero.
   - `43:17` and its five siblings — the 368×214 photo plates on the concern
     cards (these may simply be tinted rectangles; the node type is the same as
     the product-stage shapes, which *are* vectors).
   Each is stood in for at its exact Figma box size, so replacing a stand-in
   with the real asset is a drop-in and changes no layout.

## 3. Two structural judgement calls

**The hero.** Node `41:3` ("01 / Hero") is an **empty frame** in the file — the
right 1440×1024 box with no children. The only Marbella Skin hero carrying
content is the sibling artboard `19:36` ("THIRD OPTION"), same dimensions, same
brand. Section 01 is therefore built from `19:36`'s geometry. Every coordinate
in `Hero.css` is a real Figma number; the decision to *use* that artboard is the
inference. (The other candidate, `19:2` "FIRST OPTION", is also empty; `13:75`
"spa" is a different brand entirely — HushSpa.)

**One omitted node.** `19:45`, a 32×49 frame inside the hero nav, is reported at
`x=0` — the same origin as the 441px nav-link row, which it would overlap. Its
intended position could not be resolved, so it is left out rather than guessed
at. Everything else in `19:36` is placed.

Related: a handful of nodes in the metadata report `x` as a *right* edge rather
than a left edge (an auto-layout artifact — e.g. `13:92`'s children, and the
product-stage shapes in `45:12` / `45:25`). Where this happens the geometry was
recovered from the invariants instead: all four parts of each product vessel
share a common centre, and `45:38`'s parts centre exactly on the 176px stage
midpoint, so all three stages are centred.

## 4. Verification

`npm run verify:figma` builds nothing itself — run `npm run build` first — then
renders the page at 1440px in Chromium and asserts ~60 box/position measurements
and 7 text-advance sets against the Figma numbers listed above.

Current state: **all box and position checks pass within 1px**, including all
five section heights and the 4099px total canvas height. Two text-advance
residuals remain, both sub-2px and both attributable to font identity rather
than layout:

```
.products .eyebrow      figma 197  got 198.16  Δ+1.16   (0.6%)
.products__pill span    figma 142  got 140.17  Δ-1.83   (1.3%)
```

The script needs `npm i -D playwright`; point `CHROMIUM_PATH` at a browser if
Playwright's own download is unavailable.

## 5. What to do when Figma access is restored

1. `get_variable_defs` on `41:2` → replace the whole colour block in
   `tokens.css`, plus radii.
2. `get_design_context` on `41:2` → confirm font families and re-solve the
   fitted sizes if the families differ.
3. `download_assets` on `19:37`, `19:41` and `43:17` → drop the real images into
   the stand-in boxes.
4. Resolve node `19:45`, and confirm whether `41:3` is meant to hold `19:36`.
5. Re-run `npm run verify:figma`.
