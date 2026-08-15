import { motion } from 'framer-motion';
import { Reveal, RevealGroup } from '../components/Reveal';
import { EASE, revealItem } from '../components/motion';
import { ArrowRight, ArrowUpRight } from '../components/Icons';
import './SkinConcerns.css';

/** Figma nodes 43:10 … 43:51 — six 396x298 cards on a 3-up grid, 26px gaps. */
const CONCERNS = [
  { title: 'Acne Care', sub: 'Calm breakouts', tint: 'var(--c-tint-acne)' },
  { title: 'Dry Skin', sub: 'Deep moisture', tint: 'var(--c-tint-dry)' },
  { title: 'Sensitive', sub: 'Barrier repair', tint: 'var(--c-tint-sensitive)' },
  { title: 'Dark Spots', sub: 'Even tone', tint: 'var(--c-tint-spots)' },
  { title: 'Oil Control', sub: 'Balance shine', tint: 'var(--c-tint-oil)' },
  { title: 'Anti-Aging', sub: 'Firm & smooth', tint: 'var(--c-tint-aging)' },
];

/** Figma node 43:2 — "03 / Skin Concerns", 1440 x 972. */
export function SkinConcerns() {
  return (
    <section className="section concerns" aria-labelledby="concerns-title">
      {/* Node 43:3 — header, x=100 y=96 w=1240 h=108 */}
      <div className="concerns__header">
        <Reveal>
          {/* Node 43:4 — 490 x 108 (2 lines x 54) */}
          <h2 className="concerns__title" id="concerns-title">
            Find skincare solutions for every skin concern
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          {/* Node 43:5 — 201 x 46 pill, right-aligned to the 1240 column */}
          <motion.a
            className="pill concerns__pill"
            href="#"
            whileHover={{ backgroundColor: 'var(--c-surface)' }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <span>View all concerns</span>
            <ArrowRight className="pill__arrow" />
          </motion.a>
        </Reveal>
      </div>

      {/* Node 43:8 — grid, x=100 y=250 w=1240 h=622 */}
      <RevealGroup className="concerns__grid" stagger={0.07}>
        {CONCERNS.map((concern) => (
          <motion.article
            className="concern"
            key={concern.title}
            variants={revealItem}
            whileHover="hover"
            initial="rest"
            animate="rest"
          >
            {/* Node 43:11 — label row, 368 x 40 inset 14px from the card edge */}
            <div className="concern__label">
              <div className="concern__txt">
                <h3 className="concern__title">{concern.title}</h3>
                <p className="concern__sub">{concern.sub}</p>
              </div>
              {/* Node 43:15 — 38 x 38 arrow button, right-aligned */}
              <motion.div
                className="concern__arrow"
                variants={{
                  rest: { backgroundColor: 'rgba(0,0,0,0)' },
                  hover: { backgroundColor: 'var(--c-surface-deep)' },
                }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <ArrowUpRight />
              </motion.div>
            </div>

            {/* Node 43:17 — photo plate, 368 x 214 */}
            <div className="concern__plate" style={{ background: concern.tint }}>
              <motion.div
                className="concern__plate-inner"
                style={{ background: concern.tint }}
                variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </div>
          </motion.article>
        ))}
      </RevealGroup>
    </section>
  );
}
