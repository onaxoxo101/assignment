import { motion } from 'framer-motion';
import { Reveal, RevealGroup } from '../components/Reveal';
import { EASE, revealItem } from '../components/motion';
import './Benefits.css';

/** Figma nodes 46:8 / 46:15 / 46:23 / 46:30 — 580 x 176 each, 80px column gap. */
const BENEFITS = [
  {
    n: '01',
    title: 'Natural ingredients',
    body: 'We believe in the power of nature. Botanic extracts are sustainably sourced and cold-pressed to keep every active intact.',
  },
  {
    n: '02',
    title: 'Dermatologist tested',
    body: 'Each formula is clinically assessed on all skin types and tones, then patch-tested before it ever reaches your shelf.',
  },
  {
    n: '03',
    title: 'No harsh chemicals',
    body: 'Free from parabens, sulphates, mineral oils and synthetic fragrance — nothing that disrupts your skin barrier.',
  },
  {
    n: '04',
    title: 'Eco-friendly packaging',
    body: 'Recyclable glass, refillable vessels and plastic-free cartons. Beautiful skin should not cost the planet.',
  },
];

/** Figma node 46:2 — "05 / Benefits", 1440 x 695. */
export function Benefits() {
  return (
    <section className="section benefits" aria-labelledby="benefits-title">
      {/* Node 46:3 — 447 x 83, centred on the canvas */}
      <Reveal className="benefits__heading">
        <p className="eyebrow">THE DIFFERENCE</p>
        <h2 className="section-title benefits__title" id="benefits-title">
          Considered at every step
        </h2>
      </Reveal>

      {/* Node 46:6 — grid, x=100 y=239 w=1240 h=352 */}
      <RevealGroup className="benefits__grid" stagger={0.08}>
        {BENEFITS.map((benefit) => (
          <motion.div
            className="benefit"
            key={benefit.n}
            variants={revealItem}
            initial="rest"
            animate="rest"
            whileHover="hover"
          >
            {/* Node 46:9 — 580 x 1 rule at y=30 */}
            <motion.span
              className="benefit__rule"
              aria-hidden="true"
              variants={{ rest: { scaleX: 1 }, hover: { scaleX: 1 } }}
            >
              <motion.span
                className="benefit__rule-fill"
                variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </motion.span>

            {/* Node 46:10 — 580 x 85 starting at y=57 */}
            <div className="benefit__row">
              <p className="benefit__n">{benefit.n}</p>
              <div className="benefit__text">
                <h3 className="benefit__title">{benefit.title}</h3>
                <p className="benefit__body">{benefit.body}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </RevealGroup>
    </section>
  );
}
