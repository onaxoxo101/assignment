import Hero from '../sections/Hero'
import LiveProjects from '../sections/LiveProjects'
import About from '../sections/About'
import Process from '../sections/Process'
import Tools from '../sections/Tools'
import Reviews from '../sections/Reviews'
import Cta from '../sections/Cta'
import Footer from '../sections/Footer'

/** Figma frame "portfolio" (1:34) — hero + "Landing / Sections" (1:65). */
export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <LiveProjects />
        <About />
        <Process />
        <Tools />
        <Reviews />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
