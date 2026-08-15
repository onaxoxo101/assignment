import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../components/motion';
import './Hero.css';

/**
 * Figma node 41:3 — "01 / Hero", 1440 x 1024.
 *
 * IMPORTANT: 41:3 is an EMPTY frame in the Figma file — it has the right size
 * but no children. The only Marbella Skin hero that carries content is the
 * sibling artboard 19:36 ("THIRD OPTION"), which is the same 1440 x 1024 and
 * the same brand, so this section is built from 19:36's geometry.
 *
 * Every number below is a real Figma coordinate from 19:36. What is NOT from
 * Figma: the two 687x863 panels (19:37 / 19:38) and the 247x247 product render
 * (19:41) are image-filled nodes whose assets could not be exported, and node
 * 19:45 (a 32x49 frame reported at x=0, overlapping the nav links) could not be
 * placed unambiguously and is omitted. See FIGMA-FIDELITY.md.
 */

const NAV = ['HOME', 'PRODUCTS', 'ABOUT', 'CONTACT']; // nodes 19:59 … 19:62

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="section hero" aria-labelledby="hero-title">
      {/* Nodes 19:37 / 19:38 — 687 x 863 panels at y=111 */}
      <motion.div
        className="hero__panel hero__panel--left"
        initial={reduced ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
      />
      <div className="hero__panel hero__panel--right" />

      {/* Node 19:44 — nav, x=47 y=33 w=1346 h=49 */}
      <motion.nav
        className="hero__nav"
        initial={reduced ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
      >
        {/* Node 19:58 — 441 x 22 at y=14, 44px gaps */}
        <ul className="hero__links">
          {NAV.map((label) => (
            <li key={label}>
              <a className="hero__link" href="#">
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Node 19:63 — "Marbella Skin", 127 x 29, centred in the nav */}
        <span className="hero__wordmark">Marbella Skin</span>

        {/* Node 19:46 — three 43.03px marks at 24.96px gaps, flush right */}
        <ul className="hero__socials">
          {['in', 'ig', 'fb'].map((mark) => (
            <li key={mark}>
              <motion.a
                className="hero__social"
                href="#"
                aria-label={mark}
                whileHover={{ backgroundColor: 'var(--c-surface)' }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {mark}
              </motion.a>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* Node 19:39 — 637 x 132 at x=743 y=213 */}
      <motion.h1
        className="hero__title"
        id="hero-title"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
      >
        Glow Starts Here, Pure, Effortless Beauty
      </motion.h1>

      {/* Node 19:40 — 637 x 105 at x=743 y=387 */}
      <motion.p
        className="hero__body"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
      >
        Discover skincare made to enhance your natural beauty with gentle, nourishing formulas
        that leave your skin soft, glowing, and refreshed.
      </motion.p>

      {/* Node 19:41 — 247 x 247 at x=938 y=537 */}
      <motion.div
        className="hero__render"
        initial={reduced ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.45 }}
      >
        <motion.div
          className="hero__render-inner"
          animate={reduced ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
        >
          <span className="vessel vessel--body hero__v-body" />
          <span className="vessel vessel--neck hero__v-neck" />
          <span className="vessel vessel--cap hero__v-cap" />
          <span className="vessel vessel--label hero__v-label" />
        </motion.div>
      </motion.div>

      {/* Node 19:42 — 586 x 73 at x=777 y=836; label 138 x 35, centred */}
      <motion.a
        className="hero__cta"
        href="#"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
        whileHover={{ scale: 1.008 }}
        whileTap={{ scale: 0.994 }}
      >
        SHOP NOW
      </motion.a>
    </section>
  );
}
