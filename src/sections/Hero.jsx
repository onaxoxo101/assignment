import { motion, useReducedMotion } from 'framer-motion'
import Button from '../components/Button'
import { ArrowNorthEast, DownloadArrow } from '../components/icons'
import { EASE } from '../components/motion'
import AssetImage from '../components/AssetImage'
import './Hero.css'

const NAV = [
  { label: 'Home', href: '#top' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
]

/* The eight marquee cards, in the order they sit on the Figma track (1:342). */
const MARQUEE = [
  'marquee-1',
  'marquee-2',
  'marquee-3',
  'marquee-4',
  'marquee-5',
  'marquee-6',
  'marquee-7',
  'marquee-8',
]

const CARD_STRIDE = 544 + 22 // card width + track gap
const LOOP_WIDTH = MARQUEE.length * CARD_STRIDE

export default function Hero() {
  const reduced = useReducedMotion()

  /* Entrances stack down the hero in the order the eye reads them. Each
     element settles at exactly its Figma coordinate. */
  const enter = (delay) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  })

  return (
    <header className="hero" id="top">
      <motion.div className="hero__navPill" {...enter(0)} />

      <motion.nav className="hero__nav" {...enter(0.05)}>
        <div className="hero__navLinks">
          {NAV.map(({ label, href }) => (
            <motion.a
              key={label}
              className="hero__navLink"
              href={href}
              whileHover={reduced ? undefined : { y: -2 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {label}
            </motion.a>
          ))}
        </div>
        <Button variant="contact" as="a" href="#contact">
          Contact Me
          <ArrowNorthEast />
        </Button>
      </motion.nav>

      <motion.div className="hero__downloadCv" {...enter(0.1)}>
        <Button variant="downloadNav" as="a" href="#contact">
          Download CV
          <DownloadArrow />
        </Button>
      </motion.div>

      <motion.div className="hero__badge" {...enter(0.18)}>
        <span className="hero__badgeDot" aria-hidden="true" />
        <p className="hero__badgeLabel">Available to work</p>
      </motion.div>

      <motion.figure className="hero__portrait" {...enter(0.24)}>
        <AssetImage className="hero__portraitImg" name="hero-portrait" alt="Onamma Nwosu" />
      </motion.figure>

      <motion.div className="hero__headline" {...enter(0.3)}>
        <h1 className="hero__name">Onamma Nwosu</h1>
        <p className="hero__role">Product Designer · UI/UX · Web &amp; Mobile</p>
      </motion.div>

      <motion.p className="hero__lede" {...enter(0.36)}>
        I take messy product problems, make sense of them, and turn them into clear experiences
        that work for both the user and the business.
      </motion.p>

      <motion.div className="hero__buttons" {...enter(0.42)}>
        <Button variant="contact" as="a" href="#contact">
          Contact Me
          <ArrowNorthEast />
        </Button>
        <Button variant="projects" as="a" href="#projects">
          View Projects
        </Button>
      </motion.div>

      <motion.div className="hero__marquee" {...enter(0.5)}>
        <motion.div
          className="hero__marqueeTrack"
          animate={reduced ? undefined : { x: [0, -LOOP_WIDTH] }}
          transition={
            reduced
              ? undefined
              : { duration: 56, ease: 'linear', repeat: Infinity, repeatType: 'loop' }
          }
        >
          {[...MARQUEE, ...MARQUEE].map((key, i) => (
            <div className="hero__card" key={`${key}-${i}`}>
              <AssetImage className="hero__cardImg" name={key} />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </header>
  )
}
