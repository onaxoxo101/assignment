import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from './motion'
import './Button.css'

/**
 * One button element per Figma variant. The `variant` selects the exact
 * padding / fill / border / fixed width the design specifies — see Button.css,
 * where each rule names the node it came from.
 */
export default function Button({
  variant = 'contact',
  as = 'button',
  children,
  className = '',
  ...rest
}) {
  const reduced = useReducedMotion()
  // `as` may be a tag name ('a', 'button') or a component (e.g. router Link).
  const Tag = useMemo(
    () => (typeof as === 'string' ? motion[as] ?? motion.button : motion.create(as)),
    [as]
  )

  const hover = reduced ? undefined : { scale: 1.025 }
  const tap = reduced ? undefined : { scale: 0.985 }

  return (
    <Tag
      className={`btn btn--${variant} ${className}`.trim()}
      whileHover={hover}
      whileTap={tap}
      transition={{ duration: 0.25, ease: EASE }}
      {...rest}
    >
      <span className="btn__inner">{children}</span>
    </Tag>
  )
}
