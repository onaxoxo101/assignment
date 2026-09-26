import { useRef, useState } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useVelocity,
} from 'framer-motion'

// Infinite horizontal loop. Speeds up while the page is being scrolled
// (the classic Framer "velocity marquee") and pauses on hover.
export default function Marquee({ children, speed = 40, pauseOnHover = true, className = '' }) {
  const x = useMotionValue(0)
  const groupRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()

  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })

  useAnimationFrame((_, delta) => {
    const width = groupRef.current?.offsetWidth
    if (!width || paused || reduce) return
    const boost = 1 + Math.min(Math.abs(velocity.get()) / 800, 4)
    let next = x.get() - (speed * boost * delta) / 1000
    if (next <= -width) next += width
    x.set(next)
  })

  return (
    <div
      className={`marquee ${className}`}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div className="marquee-track" style={{ x }}>
        <div className="marquee-group" ref={groupRef}>{children}</div>
        <div className="marquee-group" aria-hidden="true">{children}</div>
      </motion.div>
    </div>
  )
}
