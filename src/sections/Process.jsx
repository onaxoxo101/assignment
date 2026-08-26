import { motion } from 'framer-motion'
import Eyebrow from '../components/Eyebrow'
import { EASE, Reveal, Stagger, rise } from '../components/motion'
import './Process.css'

/** Figma: "Step 01"–"Step 04" (1:211, 1:215, 1:219, 1:223). */
const STEPS = [
  {
    number: '01',
    title: 'Discover',
    body: 'Interviews, competitor teardowns and whatever data exists. I want the messy version of the problem before anyone starts talking about screens.',
  },
  {
    number: '02',
    title: 'Define',
    body: 'Turn the mess into a decision: who this is for, what it has to do, and what we are deliberately not building this round.',
  },
  {
    number: '03',
    title: 'Design',
    body: 'Flows, wireframes, then interface. Tested against real content and real edge cases, not the happy path only.',
  },
  {
    number: '04',
    title: 'Ship',
    body: 'Specs, tokens and a build-ready handoff. I stay in it through development, because that is where designs quietly get broken.',
  },
]

/** Figma: "Section / Process" (1:203). */
export default function Process() {
  return (
    <section className="process" id="process">
      <Reveal className="process__header">
        <Eyebrow>PROCESS</Eyebrow>
        <h2 className="process__title">How I work</h2>
        <p className="process__note">
          Four steps, in the same order every time. The first two are the ones that decide whether
          the last two are worth anything.
        </p>
      </Reveal>

      <Stagger className="process__steps">
        {STEPS.map(({ number, title, body }) => (
          <motion.article
            className="step"
            key={number}
            variants={rise}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p className="step__number">{number}</p>
            <h3 className="step__title">{title}</h3>
            <p className="step__body">{body}</p>
          </motion.article>
        ))}
      </Stagger>
    </section>
  )
}
