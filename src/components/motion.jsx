import { motion, useReducedMotion } from 'framer-motion'

/**
 * Shared easing + timing for every entrance in the page. Kept deliberately
 * small: the brief asks for subtle motion that does not alter the composition,
 * so nothing here moves an element more than a few pixels off its Figma
 * position, and everything settles at exactly the designed coordinates.
 */
export const EASE = [0.22, 1, 0.36, 1]

export const rise = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0 },
}

/** Fades a block in as it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  duration = 0.6,
  as = 'div',
  amount = 0.25,
  ...rest
}) {
  const reduced = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  if (reduced) {
    const Plain = as
    return <Plain {...rest}>{children}</Plain>
  }

  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Staggered container — children use `rise` as their variants. */
export function Stagger({ children, stagger = 0.07, delay = 0, amount = 0.2, ...rest }) {
  const reduced = useReducedMotion()
  if (reduced) return <div {...rest}>{children}</div>

  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export const riseChild = {
  variants: rise,
  transition: { duration: 0.55, ease: EASE },
}
