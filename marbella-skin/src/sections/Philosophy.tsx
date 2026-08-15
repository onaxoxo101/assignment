import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import { EASE } from '../components/motion';
import './Philosophy.css';

/** Figma node 42:5 — three stat columns of 412.667px split by 1px rules. */
const STATS = [
  { value: '98%', label: 'Saw visibly calmer skin in 4 weeks' }, // 42:7 / 42:8
  { value: '100%', label: 'Plant-derived active ingredients' }, // 42:11 / 42:12
  { value: '0%', label: 'Parabens, sulphates or synthetic dye' }, // 42:15 / 42:16
];

/** Figma node 42:2 — "02 / Philosophy", 1440 x 643. */
export function Philosophy() {
  const reduced = useReducedMotion();

  return (
    <section className="section philosophy" aria-labelledby="philosophy-eyebrow">
      <Reveal className="philosophy__eyebrow-wrap">
        <p className="eyebrow" id="philosophy-eyebrow">
          OUR PHILOSOPHY
        </p>
      </Reveal>

      <Reveal className="philosophy__statement-wrap" delay={0.08}>
        <p className="philosophy__statement">
          At our core, we believe skincare should be as pure as nature itself — gentle,
          plant-powered formulas that let your natural glow do the talking.
        </p>
      </Reveal>

      <motion.div
        className="philosophy__stats"
        initial={reduced ? false : 'hidden'}
        whileInView="shown"
        viewport={{ once: true, amount: 0.6 }}
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
      >
        {STATS.map((stat, i) => (
          <div className="philosophy__cell" key={stat.value}>
            {i > 0 && <span className="philosophy__rule" aria-hidden="true" />}
            <motion.div
              className="philosophy__stat"
              variants={{
                hidden: { opacity: 0, y: 14 },
                shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
              }}
            >
              <p className="philosophy__value">{stat.value}</p>
              <p className="philosophy__label">{stat.label}</p>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
