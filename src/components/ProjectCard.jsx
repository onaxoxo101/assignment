import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { EASE } from './motion'
import AssetImage from './AssetImage'

/** Figma: "Project / …" (1:77, 1:97, 1:117, 1:136, 1:156). */
export default function ProjectCard({ project }) {
  const reduced = useReducedMotion()
  const { number, meta, title, subtitle, description, tags, linkLabel, href, thumbnail } = project

  return (
    <motion.article
      className={`project${thumbnail ? '' : ' project--noThumb'}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE }}
      whileHover={reduced ? undefined : { y: -4 }}
    >
      {thumbnail && (
        <div className="project__thumb">
          <AssetImage className="project__thumbImg" name={thumbnail} alt={`${title} preview`} />
        </div>
      )}

      <div className="project__body">
        <div className="project__meta">
          <span className="project__number">{number}</span>
          <span className="project__dash">—</span>
          <span className="project__metaText">{meta}</span>
        </div>

        <h3 className="project__title">{title}</h3>
        <p className="project__subtitle">{subtitle}</p>
        <p className="project__description">{description}</p>

        <div className="project__tags">
          {tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <Link className="project__link" to={href}>
          <span>{linkLabel}</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </motion.article>
  )
}
