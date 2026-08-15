import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE } from './motion';

/**
 * Scroll-triggered reveal.
 *
 * The brief asks for subtle motion that does not alter the design, so the
 * animation only ever touches `opacity` and `transform` — never layout. Final
 * state is always opacity 1 / translate 0, which means the resting page is
 * byte-identical to a no-motion render and the pixel comparison against Figma
 * is unaffected.
 */

export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'li';
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Container that staggers its `Reveal`-like children via variants. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : 'hidden'}
      whileInView="shown"
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -80px 0px' }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}
