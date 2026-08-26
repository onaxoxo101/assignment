import Button from '../components/Button'
import Eyebrow from '../components/Eyebrow'
import { Reveal } from '../components/motion'
import AssetImage from '../components/AssetImage'
import './About.css'

/** Figma: "Section / About" (1:176). */
export default function About() {
  return (
    <section className="about" id="about">
      <Reveal className="about__header">
        <Eyebrow>EXPERIENCE</Eyebrow>
        <h2 className="about__title">2 years of shipping, not just designing</h2>
      </Reveal>

      <div className="about__content">
        <Reveal className="about__portrait" as="figure">
          <AssetImage className="about__portraitImg" name="about-portrait" alt="Onamma Nwosu" />
        </Reveal>

        <div className="about__bio">
          <Reveal as="p" className="about__lede" delay={0.05}>
            {'Product designer, 2 years in UI/UX  designing and shipping real products across AI, fintech and e-commerce.'}
          </Reveal>

          <Reveal as="p" className="about__para" delay={0.1}>
            I am Onamma Nwosu, a product designer with 2 years of experience in UI/UX. I have
            shipped work across AI, fintech, e-commerce and career tech — taking products from a
            messy first brief to an interface people can actually use.
          </Reveal>

          <Reveal as="p" className="about__para about__para--muted" delay={0.15}>
            I design and I build. I ship with Framer, Web flow &amp; Claude, which means my work
            does not stop at a static mockup it goes out as a live, responsive product in days
            rather than weeks. That is the difference between a team debating an idea and a team
            watching real users try it.
          </Reveal>

          <Reveal className="about__stats" delay={0.2}>
            <div className="stat stat--first">
              <p className="stat__value">2 yrs</p>
              <p className="stat__label">UI/UX experience</p>
            </div>
            <span className="stat__rule" aria-hidden="true" />
            <div className="stat stat--inner">
              <p className="stat__value">04</p>
              <p className="stat__label">Industries</p>
            </div>
            <span className="stat__rule" aria-hidden="true" />
            <div className="stat stat--inner">
              <p className="stat__value">Framer + Webflow + Claude</p>
              <p className="stat__label">My build stack</p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <Button variant="downloadAbout" as="a" href="#contact">
              <span>Download CV</span>
              <span aria-hidden="true">↓</span>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
