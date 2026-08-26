import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import AssetImage from '../components/AssetImage'
import CaseNav from '../sections/CaseNav'
import Footer from '../sections/Footer'
import ScreensCarousel from '../sections/ScreensCarousel'
import { EASE, Reveal } from '../components/motion'
import { getCaseStudy, getNeighbours } from '../data/caseStudies'
import '../sections/CaseStudy.css'

/** Figma: "Section / Results" (1:843) — two rows of two cards. */
function Results({ results }) {
  const rows = [results.slice(0, 2), results.slice(2, 4)]

  return (
    <section className="caseResults">
      {rows.map((row, r) => (
        <Reveal className="caseResults__row" key={r} delay={r * 0.05}>
          {row.map(({ title, body }) => (
            <article className="resultCard" key={title}>
              <h3 className="resultCard__title">{title}</h3>
              {body.map((para, i) => (
                <p className="resultCard__body" key={i}>
                  {para}
                </p>
              ))}
            </article>
          ))}
        </Reveal>
      ))}
    </section>
  )
}

/** Figma: "Section / Project nav" (1:862). */
function ProjectNav({ previous, next }) {
  const reduced = useReducedMotion()
  const hover = reduced ? undefined : { x: 0, scale: 1.05 }

  return (
    <section className="caseFooterNav">
      <span className="caseFooterNav__rule" aria-hidden="true" />
      <div className="caseFooterNav__row">
        <Link className="caseFooterNav__side" to={`/case-study/${previous.slug}`}>
          <motion.span
            className="caseFooterNav__arrow"
            whileHover={hover}
            transition={{ duration: 0.25, ease: EASE }}
          >
            ‹
          </motion.span>
          <span className="caseFooterNav__label">
            <span className="caseFooterNav__kicker">Previous project</span>
            <span className="caseFooterNav__name">{previous.title}</span>
          </span>
        </Link>

        <Link className="caseFooterNav__side" to={`/case-study/${next.slug}`}>
          <span className="caseFooterNav__label caseFooterNav__label--end">
            <span className="caseFooterNav__kicker">Next project</span>
            <span className="caseFooterNav__name">{next.title}</span>
          </span>
          <motion.span
            className="caseFooterNav__arrow"
            whileHover={hover}
            transition={{ duration: 0.25, ease: EASE }}
          >
            ›
          </motion.span>
        </Link>
      </div>
    </section>
  )
}

/**
 * Figma: "Case Study / …" frames (1:763, 1:918, 1:1073, 1:1565, 1:1745).
 *
 * "Section / Project details" exists in every frame but is hidden in the file,
 * so it is deliberately not rendered here.
 */
export default function CaseStudyPage() {
  const { slug } = useParams()
  const study = getCaseStudy(slug)

  if (!study) return <Navigate to="/" replace />

  const { previous, next } = getNeighbours(slug)
  const { title, subtitle, intro, chips, linkLabel, cover, coverHeight, screens, secondScreens } =
    study

  return (
    <>
      <CaseNav />

      <main>
        <section className={`caseHero${cover ? '' : ' caseHero--noCover'}`}>
          <Reveal className="caseHero__copy">
            <div className="caseHero__eyebrow">
              <span className="caseHero__dot" aria-hidden="true" />
              <p className="caseHero__eyebrowLabel">CASE STUDY</p>
            </div>

            <h1 className="caseHero__title">{title}</h1>
            <p className="caseHero__subtitle">{subtitle}</p>
            <p className="caseHero__intro">{intro}</p>

            <div className="caseHero__tags">
              {chips.map((chip) => (
                <span className="caseChip" key={chip}>
                  {chip}
                </span>
              ))}
              <span className="caseHero__spacer" aria-hidden="true" />
              <a className="caseHero__link" href="#screens">
                <span>{linkLabel}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>

          {cover && (
            <Reveal className="caseHero__cover" style={{ height: coverHeight }} delay={0.08}>
              <AssetImage className="caseHero__coverImg" name={cover} alt={`${title} cover`} />
            </Reveal>
          )}
        </section>

        <div id="screens">
          <ScreensCarousel screens={screens} />
        </div>
        {secondScreens && <ScreensCarousel screens={secondScreens} />}

        <Results results={study.results} />
        <ProjectNav previous={previous} next={next} />
      </main>

      <Footer />
    </>
  )
}
