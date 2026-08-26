import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import AssetImage from '../components/AssetImage'
import { EASE, Reveal } from '../components/motion'
import { SLIDE_COUNT } from '../data/caseStudies'

const SLIDE_STRIDE = 980 // Figma 1:830 → 1:831: 940 slide + 40 gutter

/** Figma: "Section / Screens" (1:820) — header, carousel, carousel footer. */
export default function ScreensCarousel({ screens }) {
  const slides = screens.slides ?? []
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  const go = (delta) => setIndex((i) => (i + delta + SLIDE_COUNT) % SLIDE_COUNT)

  return (
    <section className="caseScreens">
      <Reveal className="caseScreens__header">
        <h2 className="caseScreens__title">{screens.title}</h2>
        <p className="caseScreens__note">{screens.note}</p>
      </Reveal>

      <Reveal className="carousel">
        <div className="carousel__viewport">
          <motion.div
            className="carousel__track"
            animate={{ x: -index * SLIDE_STRIDE }}
            transition={reduced ? { duration: 0 } : { duration: 0.65, ease: EASE }}
          >
            {Array.from({ length: SLIDE_COUNT }, (_, i) => (
              <div className="carousel__slide" key={i}>
                {slides[i] && <AssetImage className="carousel__slideImg" name={slides[i]} />}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.button
          className="carousel__arrow carousel__arrow--prev"
          onClick={() => go(-1)}
          aria-label="Previous screen"
          whileHover={reduced ? undefined : { scale: 1.06 }}
          whileTap={reduced ? undefined : { scale: 0.94 }}
          transition={{ duration: 0.2, ease: EASE }}
        >
          ‹
        </motion.button>
        <motion.button
          className="carousel__arrow carousel__arrow--next"
          onClick={() => go(1)}
          aria-label="Next screen"
          whileHover={reduced ? undefined : { scale: 1.06 }}
          whileTap={reduced ? undefined : { scale: 0.94 }}
          transition={{ duration: 0.2, ease: EASE }}
        >
          ›
        </motion.button>
      </Reveal>

      <div className="carousel__footer">
        <p className="carousel__count">
          {String(index + 1).padStart(2, '0')} / {String(SLIDE_COUNT).padStart(2, '0')}
        </p>
        <p className="carousel__caption">{screens.caption}</p>
        <span className="carousel__spacer" aria-hidden="true" />
        <div className="carousel__dots">
          {Array.from({ length: SLIDE_COUNT }, (_, i) => (
            <button
              key={i}
              className={`carousel__dot${i === index ? ' carousel__dot--active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to screen ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
