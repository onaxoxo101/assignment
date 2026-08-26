import { motion } from 'framer-motion'
import Eyebrow from '../components/Eyebrow'
import { EASE, Reveal, Stagger, rise } from '../components/motion'
import './Tools.css'

/** Figma: "Chip / …" (1:235 → 1:245). */
const TOOLS = ['Figma', 'Framer', 'Webflow', 'Prototyping', 'Design systems', 'Wireframing']

/** Figma: "Section / Tools" (1:227). */
export default function Tools() {
  return (
    <section className="tools" id="tools">
      <Reveal className="tools__header">
        <Eyebrow>TOOLKIT</Eyebrow>
        <h2 className="tools__title">Tools I reach for</h2>
        <p className="tools__note">
          Design tools on the left of the handoff, code on the right of it.
        </p>
      </Reveal>

      <Stagger className="tools__chips" stagger={0.05}>
        {TOOLS.map((tool) => (
          <motion.span
            className="chip"
            key={tool}
            variants={rise}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {tool}
          </motion.span>
        ))}
      </Stagger>
    </section>
  )
}
