import type { Transition } from 'framer-motion';

/** Shared easing for every transition in the page. */
export const EASE: Transition['ease'] = [0.22, 0.61, 0.36, 1];

/** Variant pair used by children of `RevealGroup`. */
export const revealItem = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
