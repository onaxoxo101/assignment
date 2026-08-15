import { motion } from 'framer-motion';
import { Reveal, RevealGroup } from '../components/Reveal';
import { EASE, revealItem } from '../components/motion';
import { ArrowRight } from '../components/Icons';
import './FeaturedProducts.css';

/**
 * Figma nodes 45:11 / 45:24 / 45:37.
 *
 * The "Stage" contents are vector rounded-rectangles and an ellipse in Figma,
 * not bitmaps, so they are reproduced here at their exact Figma dimensions.
 * Each part is horizontally centred in its 352px stage (confirmed on 45:37,
 * whose children all centre on 176).
 */
const PRODUCTS = [
  {
    name: 'Natural Dewdrop Oil',
    desc: 'Cold-pressed botanical face oil',
    price: '$48.00',
    stageH: 256,
    cardH: 428,
    kind: 'bottle' as const,
    parts: {
      body: { w: 84, h: 150, y: 68 }, // 45:13
      neck: { w: 22, h: 30, y: 42 }, // 45:14
      cap: { w: 34, h: 24, y: 22 }, // 45:15
      label: { w: 60, h: 52, y: 110 }, // 45:16
    },
  },
  {
    name: 'Radiance Repair Serum',
    desc: 'Niacinamide + vitamin C brightening',
    price: '$62.00',
    stageH: 286,
    cardH: 458,
    kind: 'bottle' as const,
    parts: {
      body: { w: 80, h: 164, y: 84 }, // 45:26
      neck: { w: 20, h: 26, y: 60 }, // 45:27
      cap: { w: 30, h: 28, y: 34 }, // 45:28
      label: { w: 56, h: 60, y: 128 }, // 45:29
    },
  },
  {
    name: 'Cream Renewal Balm',
    desc: 'Overnight ceramide recovery mask',
    price: '$54.00',
    stageH: 256,
    cardH: 428,
    kind: 'jar' as const,
    parts: {
      jar: { w: 112, h: 92, y: 126 }, // 45:39
      lid: { w: 116, h: 28, y: 100 }, // 45:40
      dot: { w: 52, h: 34, y: 154 }, // 45:41
    },
  },
];

/** Figma node 45:2 — "04 / Featured Products", 1440 x 765. */
export function FeaturedProducts() {
  return (
    <section className="section products" aria-labelledby="products-title">
      {/* Node 45:3 — header, x=100 y=90 w=1240 h=79 */}
      <div className="products__header">
        <Reveal className="products__heading">
          <p className="eyebrow">FEATURED PRODUCTS</p>
          <h2 className="section-title products__title" id="products-title">
            Loved by skin, made for you
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          {/* Node 45:7 — 217 x 48 */}
          <motion.a
            className="pill products__pill"
            href="#"
            whileHover={{ backgroundColor: 'var(--c-surface)' }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <span>Explore all products</span>
            <ArrowRight className="pill__arrow" />
          </motion.a>
        </Reveal>
      </div>

      {/* Node 45:10 — x=100 y=213 w=1240 h=458 */}
      <RevealGroup className="products__row" stagger={0.09}>
        {PRODUCTS.map((product) => (
          <motion.article
            className="product"
            key={product.name}
            style={{ height: product.cardH }}
            variants={revealItem}
            initial="rest"
            animate="rest"
            whileHover="hover"
          >
            {/* Node 45:12 / 45:25 / 45:38 — 352 x stageH */}
            <div className="product__stage" style={{ height: product.stageH }}>
              <motion.div
                className="product__vessel"
                variants={{ rest: { y: 0 }, hover: { y: -8 } }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                {product.kind === 'bottle' ? (
                  <>
                    <span
                      className="vessel vessel--body"
                      style={{ width: product.parts.body.w, height: product.parts.body.h, top: product.parts.body.y }}
                    />
                    <span
                      className="vessel vessel--neck"
                      style={{ width: product.parts.neck.w, height: product.parts.neck.h, top: product.parts.neck.y }}
                    />
                    <span
                      className="vessel vessel--cap"
                      style={{ width: product.parts.cap.w, height: product.parts.cap.h, top: product.parts.cap.y }}
                    />
                    <span
                      className="vessel vessel--label"
                      style={{ width: product.parts.label.w, height: product.parts.label.h, top: product.parts.label.y }}
                    />
                  </>
                ) : (
                  <>
                    <span
                      className="vessel vessel--jar"
                      style={{ width: product.parts.jar.w, height: product.parts.jar.h, top: product.parts.jar.y }}
                    />
                    <span
                      className="vessel vessel--lid"
                      style={{ width: product.parts.lid.w, height: product.parts.lid.h, top: product.parts.lid.y }}
                    />
                    <span
                      className="vessel vessel--dot"
                      style={{ width: product.parts.dot.w, height: product.parts.dot.h, top: product.parts.dot.y }}
                    />
                  </>
                )}
              </motion.div>
            </div>

            {/* Node 45:17 / 45:30 / 45:42 — 352 x 49 */}
            <div className="product__meta">
              <h3 className="product__name">{product.name}</h3>
              <p className="product__desc">{product.desc}</p>
            </div>

            {/* Node 45:20 / 45:33 / 45:45 — 352 x 41 */}
            <div className="product__buy">
              <p className="product__price">{product.price}</p>
              {/* Node 45:22 — 114 x 41 */}
              <motion.button
                className="product__bag"
                type="button"
                variants={{
                  rest: { backgroundColor: 'rgba(0,0,0,0)' },
                  hover: { backgroundColor: 'var(--c-accent)', color: 'var(--c-on-accent)' },
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                Add to bag
              </motion.button>
            </div>
          </motion.article>
        ))}
      </RevealGroup>
    </section>
  );
}
