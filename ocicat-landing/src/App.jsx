import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ease, fadeUp, inView, stagger } from './motion.js'
import Marquee from './Marquee.jsx'
import HeroVideo from './HeroVideo.jsx'
import Dashboard from './Dashboard.jsx'
import {
  CC, Check, CheckCircle, Chevron, Mail, Mic, Phone, Pin, Quote, Sliders, Sparkles, Speaker, Star, TextIcon, Wand,
} from './icons.jsx'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Logos />
        <UseCases />
        <Steps />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </MotionConfig>
  )
}

/* ---------------------------------------------------------------- chrome */

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div className="progress" style={{ scaleX }} />
}

function Nav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))

  const links = [
    ['How it works', '#how-it-works'],
    ['Use Cases', '#use-cases'],
    ['Review', '#reviews'],
    ['Pricing', '#pricing'],
  ]

  return (
    <motion.header
      className={`nav ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease }}
    >
      <a href="#top" className="nav-logo">Ocicat AI Studio</a>
      <nav className={`nav-links ${open ? 'is-open' : ''}`}>
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
      <a href="#pricing" className="btn btn-gradient nav-cta"><Sparkles /> Try it Now</a>
      <button className="nav-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span /><span />
      </button>
    </motion.header>
  )
}

/* ------------------------------------------------------------------ hero */

const features = [
  [TextIcon, 'Text to Video'],
  [Wand, 'AI Editing'],
  [CC, 'Auto Captions'],
  [Speaker, 'AI Voiceover'],
]

function Hero() {
  const frame = useRef(null)
  // As the video frame scrolls into place it tilts flat and grows to full size.
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'center center'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [28, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1])
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 0.9])

  return (
    <section className="hero" id="top">
      <motion.div className="hero-copy" variants={stagger(0.12, 0.3)} initial="hidden" animate="show">
        <motion.h1 variants={fadeUp}>Turning ideas into,<br />stunning videos in minutes</motion.h1>
        <motion.p variants={fadeUp}>
          Ocicat AI is the all-in-one AI video creation platform that helps you generate scripts,
          visuals, voiceovers, subtitles and more.
        </motion.p>
        <motion.ul className="hero-features" variants={fadeUp}>
          {features.map(([Icon, label]) => (
            <li key={label}><Icon /> {label}</li>
          ))}
        </motion.ul>
      </motion.div>

      <div className="hero-stage">
        <motion.div className="hero-glow" style={{ opacity: glow }} />
        <motion.div
          ref={frame}
          className="hero-frame"
          style={{ rotateX, scale }}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.6, ease }}
        >
          <HeroVideo />
        </motion.div>
      </div>
    </section>
  )
}

function SocialPill() {
  return (
    <motion.div className="social-pill" variants={fadeUp} {...inView}>
      <div className="avatars">
        {[1, 2, 3, 4].map((n) => <img key={n} src={`/images/avatar-${n}.jpg`} alt="" />)}
      </div>
      Loved by 2000+ creators and businesses
    </motion.div>
  )
}

const logos = ['softbox', 'arealab', 'origin', 'me', 'graphivy', 'orbitx', 'pixel', 'eleven']

function Logos() {
  return (
    <section className="logos">
      <SocialPill />
      <Marquee speed={50} pauseOnHover={false} className="logos-marquee">
        {logos.map((l) => <img key={l} src={`/images/logo-${l}.png`} alt={l} className={`logo logo-${l}`} />)}
      </Marquee>
    </section>
  )
}

/* ------------------------------------------------------------- use cases */

const useCases = [
  ['uc-property', 'Property Tour', 'Cinematic real-estate walkthroughs'],
  ['uc-education', 'Education', 'Engaging lessons and explainers'],
  ['uc-product', 'Product Ad', 'High converting product ads'],
  ['uc-podcast', 'AI Podcast', 'Professional podcast videos'],
  ['uc-marketing', 'Marketing', 'Boost campaign performance'],
  ['uc-social', 'Social Media', 'Scroll-stopping short-form clips'],
]

function UseCases() {
  const section = useRef(null)
  const track = useRef(null)
  const [overflow, setOverflow] = useState(0)

  useEffect(() => {
    const measure = () => {
      const t = track.current
      if (t) setOverflow(Math.max(0, t.scrollWidth - t.parentElement.clientWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Vertical scrolling slides the row of cards sideways.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0.25, 0.75], [0, -overflow])

  return (
    <section className="section use-cases" id="use-cases" ref={section}>
      <motion.div className="section-head" variants={stagger()} {...inView}>
        <motion.h2 variants={fadeUp}>Use cases</motion.h2>
        <motion.p variants={fadeUp}>
          From property tours to podcasts, marketing videos to educational content — create any type of video in minutes.
        </motion.p>
      </motion.div>

      <div className="uc-viewport">
        <motion.div
          className="uc-track"
          ref={track}
          style={{ x }}
          variants={stagger(0.08)}
          {...inView}
          // The row is wider than the screen, so trigger as soon as any of it shows.
          viewport={{ once: true, amount: 0 }}
        >
          {useCases.map(([img, title, sub]) => (
            <motion.article key={img} className="uc-card" variants={fadeUp} whileHover={{ y: -8 }}>
              <div className="uc-img"><img src={`/images/${img}.jpg`} alt="" /></div>
              <div className="uc-body">
                <h3>{title}</h3>
                <p>{sub}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <motion.div className="center" variants={fadeUp} {...inView}>
        <motion.a href="#pricing" className="btn btn-white btn-glow" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          Explore Templates
        </motion.a>
      </motion.div>
    </section>
  )
}

/* ----------------------------------------------------------------- steps */

const steps = [
  [Mic, 'Describe your idea', 'Write a single prompt about the video you want to create.'],
  [Sparkles, 'AI Generates', 'Our AI generates the script, scenes, voice over and visuals.'],
  [Sliders, 'Customize', 'Edit scenes, text, voices and style to match your brand.'],
  [Sparkles, 'Export & Share', 'Download in any format and share anywhere.'],
]

function Steps() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 60%'] })
  const line = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <section className="section steps" id="how-it-works" ref={ref}>
      <motion.h2 className="section-head" variants={fadeUp} {...inView}>Create videos in 4 simple steps</motion.h2>
      <div className="steps-line"><motion.span style={{ scaleX: line }} /></div>
      <motion.ol className="steps-grid" variants={stagger(0.15)} {...inView}>
        {steps.map(([Icon, title, body], i) => (
          <motion.li key={title} variants={fadeUp}>
            <motion.span
              className="step-icon"
              initial={{ scale: 0, rotate: -45 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 + i * 0.15 }}
            >
              <Icon />
            </motion.span>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  )
}

/* -------------------------------------------------------------- features */

const featureList = [
  'AI script writing that sounds natural',
  'Cinematic visuals & smooth transitions',
  'Realistic AI voices in 100+ languages',
  'Auto captions with perfect timing',
  'Royalty-free music that fits your video',
  'Brand kit & custom asset integration',
]

function Features() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const x = useTransform(scrollYProgress, [0, 1], [160, 0])
  const rotateY = useTransform(scrollYProgress, [0, 1], [-18, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <section className="section features" ref={ref}>
      <motion.div className="features-copy" variants={stagger(0.08)} {...inView}>
        <motion.h2 variants={fadeUp}>Professional Videos.<br />Without the hassle.</motion.h2>
        <ul>
          {featureList.map((f) => (
            <motion.li key={f} variants={fadeUp}><Check /> {f}</motion.li>
          ))}
        </ul>
        <motion.a variants={fadeUp} href="#pricing" className="btn btn-gradient btn-lg" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Sparkles /> Try it Now
        </motion.a>
      </motion.div>

      <motion.div className="features-visual" style={{ x, rotateY, opacity }}>
        <Dashboard />
      </motion.div>
    </section>
  )
}

/* ---------------------------------------------------------- testimonials */

const reviews = [
  {
    quote: 'We’ve tested countless AI creative tools, but Ocicat is the first one that truly understands our brand. The custom asset integration and brand kit features helped us generate visuals that felt consistent across every campaign. What used to take days now takes less than an hour.',
    name: 'Emma Rodriguez', role: 'Creative Director', img: 'avatar-1',
  },
  {
    quote: 'Our marketing team needed a faster way to produce content without sacrificing quality. Ocicat became an essential part of our workflow almost immediately. From ad creatives to social media assets, the platform helped us scale content production while keeping everything on brand.',
    name: 'Michael Chen', role: 'Growth Marketing Manager', img: 'avatar-michael',
  },
  {
    quote: 'The AI-generated visuals exceeded our expectations. Instead of spending hours briefing designers and revising concepts, we can explore multiple creative directions in minutes. It’s changed the way our team approaches campaign planning.',
    name: 'Sophia Martinez', role: 'E-commerce Manager', img: 'avatar-sophia',
  },
]

function Testimonials() {
  return (
    <section className="section reviews" id="reviews">
      <SocialPill />
      <motion.div className="section-head" variants={stagger()} {...inView}>
        <motion.h2 variants={fadeUp}>Loved by creators &amp; businesses</motion.h2>
        <motion.p variants={fadeUp}>See how creators, marketers, and teams use AI to produce videos faster than ever.</motion.p>
      </motion.div>
      <motion.div variants={fadeUp} {...inView}>
        <Marquee speed={35} className="reviews-marquee">
          {reviews.map((r) => (
            <figure key={r.name} className="review">
              <Quote />
              <div className="stars">{[1, 2, 3, 4, 5].map((s) => <Star key={s} filled={s <= 4} />)}</div>
              <blockquote>“{r.quote}”</blockquote>
              <figcaption>
                <img src={`/images/${r.img}.jpg`} alt="" />
                <div><b>{r.name}</b><span>{r.role}</span></div>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </motion.div>
    </section>
  )
}

/* --------------------------------------------------------------- pricing */

const plans = [
  {
    name: 'Basic Plan', monthly: 0, cta: 'Choose Plan',
    items: ['Limited generations (~200/month)', 'General commercial terms', 'Access to member gallery', 'Optional credit top ups', '3 concurrent fast jobs'],
  },
  {
    name: 'Standard Plan', monthly: 60, cta: 'Start Free Trial', featured: true,
    items: ['Unlimited Relaxed generations', 'General commercial terms', 'Access to member gallery', 'Optional credit top ups', '3 concurrent fast jobs'],
  },
  {
    name: 'Pro Plan', monthly: 120, cta: 'Choose Plan',
    items: ['30h Fast generations', 'Unlimited Relaxed generations', 'General commercial terms', 'Access to member gallery', 'Optional credit top ups', '12 concurrent fast jobs'],
  },
]

function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <section className="section pricing" id="pricing">
      <motion.div className="section-head" variants={stagger()} {...inView}>
        <motion.h2 variants={fadeUp}>Purchase a subscription</motion.h2>
        <motion.p variants={fadeUp}>Choose the plan that works for you.</motion.p>
        <motion.div className="toggle" variants={fadeUp} role="tablist">
          {[['Monthly', false], ['Yearly', true]].map(([label, value]) => (
            <button key={label} role="tab" aria-selected={yearly === value} onClick={() => setYearly(value)}>
              {yearly === value && (
                <motion.span layoutId="toggle-pill" className="toggle-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
              )}
              <span className="toggle-label">{label}{value && <small> -20% off</small>}</span>
            </button>
          ))}
        </motion.div>
      </motion.div>

      <motion.div className="plans" variants={stagger(0.12)} {...inView}>
        {plans.map((p) => {
          const price = yearly ? Math.round(p.monthly * 0.8) : p.monthly
          return (
            <motion.article
              key={p.name}
              className={`plan ${p.featured ? 'plan--featured' : ''}`}
              variants={fadeUp}
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
              <h3>{p.name}</h3>
              <div className="price">
                <span className="price-num">
                  $
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={price}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -30, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                    >
                      {price}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="price-meta">per editor/month<br />billed {yearly ? 'yearly' : 'monthly'}</span>
              </div>
              <ul>
                {p.items.map((i) => <li key={i}><CheckCircle /> {i}</li>)}
              </ul>
              <motion.a
                href="#top"
                className={`btn ${p.featured ? 'btn-gradient' : 'btn-white'} plan-cta`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {p.featured && <Sparkles />} {p.cta}
              </motion.a>
            </motion.article>
          )
        })}
      </motion.div>
    </section>
  )
}

/* ------------------------------------------------------------------- faq */

const faqs = [
  ['What is Ocicat AI?', 'Ocicat AI is an all-in-one creative platform that helps brands, marketers, and creators generate high-quality images, videos, and marketing assets in minutes. Simply describe what you want, and Ocicat transforms your ideas into production-ready content.'],
  ['How does the Brand Kit feature work?', 'Upload your logos, colors, fonts and other brand assets once. Ocicat applies them automatically to every video and image it generates, so everything you export stays consistent with your brand.'],
  ['Do I need design experience to use Ocicat?', 'Not at all. Describe your idea in plain language and Ocicat handles the script, visuals, voiceover and captions. You can fine-tune anything in the editor, but you never have to start from a blank timeline.'],
  ['Can I create both images and videos?', 'Yes. Ocicat generates videos, stills and marketing assets from the same prompt and brand kit, so a whole campaign can come from one place.'],
  ['Who is Ocicat AI built for?', 'Creators, marketing teams, agencies, e-commerce brands, educators and real-estate professionals — anyone who needs great video content quickly without a full production team.'],
]

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section faq">
      <motion.div className="section-head" variants={stagger()} {...inView}>
        <motion.h2 variants={fadeUp}>Frequently asked questions</motion.h2>
        <motion.p variants={fadeUp}>Here are some questions you may have for us.</motion.p>
      </motion.div>
      <motion.div className="faq-list" variants={stagger(0.08)} {...inView}>
        {faqs.map(([q, a], i) => {
          const isOpen = open === i
          return (
            <motion.div key={q} className="faq-item" variants={fadeUp} layout>
              <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                <span>{i + 1}. {q}</span>
                <motion.span className="faq-chev" animate={{ rotate: isOpen ? 90 : 0 }}><Chevron /></motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    <p>{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}

/* ---------------------------------------------------------------- footer */

const footerCols = [
  ['Product', ['Features', 'Pricing', 'Case studies', 'Reviews', 'Updates']],
  ['Company', ['About', 'Contact us', 'Careers', 'Culture', 'Blog']],
  ['Support', ['Getting started', 'Help center', 'Server status', 'Report a bug', 'Chat support']],
]

function Footer() {
  return (
    <motion.footer className="footer" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">OCICAT</div>
          <p>Turning ideas into stunning videos in minutes.</p>
        </div>
        {footerCols.map(([title, links]) => (
          <div key={title} className="footer-col">
            <h4>{title}</h4>
            {links.map((l) => <a key={l} href="#top">{l}</a>)}
          </div>
        ))}
        <div className="footer-col">
          <h4>Contact us</h4>
          <a href="mailto:contact@company.com"><Mail /> contact@company.com</a>
          <a href="tel:+14146875892"><Phone /> (414) 687 - 5892</a>
          <span className="footer-addr"><Pin /> 794 Mcallister St<br />San Francisco, 94102</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Copyright © {new Date().getFullYear()} OCICAT AI</span>
        <span>All Rights Reserved | <a href="#top">Terms and Conditions</a> | <a href="#top">Privacy Policy</a></span>
      </div>
    </motion.footer>
  )
}
