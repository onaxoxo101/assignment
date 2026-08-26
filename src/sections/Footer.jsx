import { motion, useReducedMotion } from 'framer-motion'
import { EASE, Reveal } from '../components/motion'
import './Footer.css'

const SOCIALS = ['IG', 'X', 'LI', 'BE']

/** Figma: "Col / Navigate", "Col / Projects", "Col / Get in touch". */
const COLUMNS = [
  {
    title: 'Navigate',
    items: ['Home', 'Live projects', 'About', 'Process', 'Reviews', 'Contact'],
  },
  {
    title: 'Projects',
    items: ['SORA', 'Ocicat AI Studio', 'CVER', 'Marbella Skin'],
  },
  {
    title: 'Get in touch',
    items: ['onanwosu18373@gmail.com', '0805 846 4733', 'Lagos, Nigeria'],
  },
]

/** Figma: "Section / Footer" (1:301). */
export default function Footer() {
  const reduced = useReducedMotion()
  const lift = reduced ? undefined : { y: -2 }

  return (
    <footer className="footer">
      <span className="footer__rule" aria-hidden="true" />

      <Reveal className="footer__top">
        <div className="footer__brand">
          <p className="footer__brandName">Onamma Nwosu</p>
          <p className="footer__brandBlurb">
            Product designer with 2 years in UI/UX, shipping across AI, fintech and e-commerce.
            Available for full-time and freelance work.
          </p>
          <div className="footer__socials">
            {SOCIALS.map((label) => (
              <motion.a
                className="footer__social"
                key={label}
                href="#contact"
                aria-label={label}
                whileHover={lift}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </div>

        {COLUMNS.map(({ title, items }) => (
          <div className="footer__col" key={title}>
            <p className="footer__colTitle">{title}</p>
            <span className="footer__colSpacer" aria-hidden="true" />
            {items.map((item) => (
              <motion.a
                className="footer__link"
                key={item}
                href="#top"
                whileHover={lift}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        ))}
      </Reveal>

      <span className="footer__rule" aria-hidden="true" />

      <div className="footer__bottom">
        <p>© 2026 Onamma Nwosu. All rights reserved.</p>
        <p>Designed in Figma · Built by hand</p>
      </div>
    </footer>
  )
}
