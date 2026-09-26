# Ocicat AI Studio – landing page

A scroll-animated landing page for Ocicat AI Studio, built with React, Vite and
[Framer Motion](https://www.framer.com/motion/). It follows the `LANDING_PAGE` design.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Hero video (the house)

The house in the hero frame (and in the dashboard preview) is a video. Put the
clip at:

```
public/videos/house-hero.mp4
```

It plays muted, looped and inline, and only while it's on screen. Until the file
is there, the poster image (`public/images/hero-house.jpg`) is shown with a slow
push-in so the frame still moves. To use a different file name, change
`HERO_VIDEO` in `src/HeroVideo.jsx`. Keep the clip short (5–15 s), 1080p or
lower, and under ~5 MB for a fast first load.

## Scroll animations

| Section | Motion |
| --- | --- |
| Page | Gradient scroll-progress bar; nav darkens after scrolling |
| Hero | Headline staggers in; video frame tilts flat and scales up as you scroll |
| Logos / reviews | Infinite marquees that speed up while you scroll (reviews pause on hover) |
| Use cases | Vertical scroll slides the card row sideways |
| Steps | Progress line fills with scroll; icons spring in |
| Features | Dashboard mockup swings in from the right; playhead, chat and before/after animate |
| Pricing | Monthly/Yearly pill slides; prices roll to the new value |
| FAQ | Accordion open/close |

All animations respect the visitor's "reduce motion" setting.

## Files

- `src/App.jsx` – all page sections and their copy
- `src/Dashboard.jsx` – the editor mockup in the features section
- `src/HeroVideo.jsx` – video player with an image fallback
- `src/Marquee.jsx` – scroll-velocity marquee
- `src/motion.js` – shared animation presets
- `src/styles.css` – styles and breakpoints
- `public/images/` – images taken from the design
