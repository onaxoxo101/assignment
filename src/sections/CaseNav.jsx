import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { ArrowNorthEast } from '../components/icons'
import { EASE } from '../components/motion'
import './CaseNav.css'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/#projects' },
  { label: 'About', to: '/#about' },
]

/** Figma: "Nav" (1:764 and its twins in each case-study frame). */
export default function CaseNav() {
  const reduced = useReducedMotion()

  return (
    <nav className="caseNav">
      <div className="caseNav__pill" />
      <div className="caseNav__inner">
        <div className="caseNav__links">
          {NAV.map(({ label, to }) => (
            <motion.span
              key={label}
              whileHover={reduced ? undefined : { y: -2 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <Link to={to}>{label}</Link>
            </motion.span>
          ))}
        </div>
        <div className="caseNav__cta">
          <Button variant="contact" as="a" href="/#contact">
            Contact Me
            <ArrowNorthEast />
          </Button>
        </div>
      </div>
    </nav>
  )
}
