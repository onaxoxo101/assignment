import { motion } from 'framer-motion'
import Eyebrow from '../components/Eyebrow'
import { EASE, Reveal, Stagger, rise } from '../components/motion'
import AssetImage from '../components/AssetImage'
import './Reviews.css'

/** Figma: "Review 1–3 — REPLACE" (1:255, 1:265, 1:275). */
const REVIEWS = [
  {
    initials: 'AB',
    avatar: 'review-avatar',
    quote:
      '“She asked the questions nobody else on the project was asking. What came back was not just prettier — it was a version of the product that actually made sense to use.”',
    name: 'John Frank',
    role: 'Founder · Makeda',
  },
  {
    initials: 'CD',
    avatar: null,
    quote:
      '“Handover was the easiest part of the build. Every state was there, the spacing was consistent, and I did not have to go back and ask what happens on error.”',
    name: 'Anu kaka',
    role: 'Founder · Zoe Verse',
  },
  {
    initials: 'EF',
    avatar: null,
    quote:
      '“Fast, clear and genuinely easy to work with. She pushed back on a couple of my ideas and she was right to — the end result was much stronger for it.”',
    name: 'Michael Odaefe',
    role: 'Founder  · CverAI',
  },
]

/** Figma: "Section / Client Reviews" (1:247). */
export default function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <Reveal className="reviews__header">
        <Eyebrow>CLIENT REVIEWS</Eyebrow>
        <h2 className="reviews__title">What it is like to work with me</h2>
        <p className="reviews__note">
          Placeholder quotes — swap in real words from a client, teammate or lecturer before this
          page goes live.
        </p>
      </Reveal>

      <Stagger className="reviews__list" stagger={0.09}>
        {REVIEWS.map(({ initials, avatar, quote, name, role }) => (
          <motion.article
            className="review"
            key={name}
            variants={rise}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p className="review__rating" aria-label="Five out of five">
              ★★★★★
            </p>
            <blockquote className="review__quote">{quote}</blockquote>
            <span className="review__rule" aria-hidden="true" />
            <div className="review__author">
              <div className="review__avatar">
                {avatar && <AssetImage className="review__avatarImg" name={avatar} />}
                <span className="review__initials">{initials}</span>
              </div>
              <div className="review__who">
                <p className="review__name">{name}</p>
                <p className="review__role">{role}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </Stagger>
    </section>
  )
}
