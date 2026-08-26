import Button from '../components/Button'
import Eyebrow from '../components/Eyebrow'
import { Reveal } from '../components/motion'
import './Cta.css'

const EMAIL = 'onanwosu18373@gmail.com'

/** Figma: "Section / CTA" (1:285). */
export default function Cta() {
  return (
    <section className="cta" id="contact">
      <Reveal className="cta__band">
        <Eyebrow>AVAILABLE TO WORK</Eyebrow>
        <h2 className="cta__title">Have a project in mind?</h2>
        <p className="cta__note">
          Tell me what is not working and who it is not working for. I will tell you honestly
          whether design is the fix.
        </p>

        <div className="cta__buttons">
          <Button variant="ctaContact" as="a" href={`mailto:${EMAIL}`}>
            <span>Contact Me</span>
            <span className="btn__arrow" aria-hidden="true">
              ↗
            </span>
          </Button>
          <Button variant="ctaGhost" as="a" href="#projects">
            View Projects
          </Button>
        </div>

        <p className="cta__email">
          <span className="cta__emailLead">or email me directly —</span>
          <a className="cta__emailAddress" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
      </Reveal>
    </section>
  )
}
