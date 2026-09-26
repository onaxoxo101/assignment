import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import HeroVideo from './HeroVideo.jsx'
import { Sparkles } from './icons.jsx'

// The product mockup is drawn on a fixed 1040×660 canvas and scaled to fit,
// so it keeps the design's proportions at every screen width.
const W = 1040
const H = 660

const nav = ['Dashboard', 'Templates', 'Create Video', 'My Projects', 'AI Assets', 'Team Workspaces']
const navBottom = ['Billing', 'Settings', 'Help & Support']
const tools = ['Scenes', 'Media', 'Text', 'Music', 'Transition', 'Brand Kit']
const scenes = [
  { img: 'images/hero-house.jpg', label: 'Exterior - Aerial View' },
  { img: 'images/room-living.jpg', label: 'Living Room' },
  { img: 'images/room-kitchen.jpg', label: 'Kitchen' },
  { img: 'images/room-bedroom.jpg', label: 'Master Bedroom' },
]
const changes = ['Cinematic color grading', 'Added camera movement', 'Enhanced contrast', 'Added subtle lens flare']
const chips = ['Regenerate', 'Add drone shot', 'Change music', 'Add subtitles']
const captions = ['Luxury living redefined', 'Spacious. Modern. Elegant', 'Your dream home awaits']

export default function Dashboard() {
  const wrap = useRef(null)
  const [scale, setScale] = useState(0.6)
  const live = useInView(wrap, { once: true, amount: 0.35 })

  useEffect(() => {
    const el = wrap.current
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / W))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const step = (i) => ({
    initial: { opacity: 0, y: 12 },
    animate: live ? { opacity: 1, y: 0 } : {},
    transition: { delay: 0.4 + i * 0.5, duration: 0.5 },
  })

  return (
    <div ref={wrap} className="db-wrap" style={{ height: H * scale }}>
      <div className="db" style={{ width: W, height: H, transform: `scale(${scale})` }}>
        <aside className="db-side">
          <div className="db-brand">OcicatAI</div>
          {nav.map((n) => (
            <div key={n} className={`db-nav ${n === 'My Projects' ? 'is-active' : ''}`}><i />{n}</div>
          ))}
          <div className="db-sep" />
          {navBottom.map((n) => <div key={n} className="db-nav"><i />{n}</div>)}
          <div className="db-upgrade">
            <b>Upgrade to Pro</b>
            <p>Unlock 4K exports, custom voices and more premium AI features.</p>
            <span>Upgrade now</span>
          </div>
        </aside>

        <div className="db-main">
          <header className="db-top">
            <span className="db-crumb">Projects <em>›</em> <b>Luxury House Tour</b></span>
            <span className="db-saved">Saved 2min ago</span>
            <span className="db-grow" />
            <span className="db-pill db-pill--light"><Sparkles width={10} height={10} /> Upgrade plan</span>
            <span className="db-pill">Export ▾</span>
            <span className="db-user"><img src="images/avatar-john.jpg" alt="" />John Doe</span>
          </header>

          <div className="db-body">
            <div className="db-tools">
              {tools.map((t, i) => (
                <div key={t} className={`db-tool ${i === 0 ? 'is-active' : ''}`}><i />{t}</div>
              ))}
            </div>

            <div className="db-scenes">
              <div className="db-h">Scenes <span>+</span></div>
              {scenes.map((s, i) => (
                <div key={s.label} className={`db-scene ${i === 0 ? 'is-active' : ''}`}>
                  <div className="db-thumb">
                    <span className="db-num">0{i + 1}</span>
                    <img src={s.img} alt="" />
                    <span className="db-dur">8.4s</span>
                  </div>
                  <small>{s.label}</small>
                </div>
              ))}
              <div className="db-add">+ Add Scene</div>
            </div>

            <div className="db-editor">
              <div className="db-h">Scenes 01 <em>›</em> Exterior - Aerial View <span className="db-ratio">16:9</span></div>
              <div className="db-preview">
                <HeroVideo />
                <div className="db-controls">
                  <span>▶</span><span>⏮</span><span>⏭</span><small>00:08 / 01:02</small>
                  <span className="db-grow" /><span className="db-pill">Fit</span>
                </div>
              </div>
              <div className="db-actions">
                {['Split', 'Delete', 'Duplicate', 'AI Enhance', 'Magic Cut'].map((a) => <span key={a}>{a}</span>)}
              </div>

              <div className="db-timeline">
                <div className="db-ruler">
                  {['00:00', '00:10', '00:20', '00:30', '00:40', '00:50'].map((t) => <span key={t}>{t}</span>)}
                </div>
                <motion.div
                  className="db-playhead"
                  animate={{ left: ['12%', '96%'] }}
                  transition={{ duration: 9, ease: 'linear', repeat: Infinity }}
                />
                <div className="db-track">
                  <label>Video</label>
                  <div className="db-clips">
                    {scenes.map((s) => (
                      <div key={s.label} className="db-clip"><img src={s.img} alt="" /><span>8.4s</span></div>
                    ))}
                  </div>
                </div>
                <div className="db-track">
                  <label>Audio</label>
                  <div className="db-wave" />
                </div>
                <div className="db-track">
                  <label>Voice over</label>
                  <div className="db-wave db-wave--alt" />
                </div>
                <div className="db-track db-track--text">
                  <label>Text</label>
                  <div className="db-caps">{captions.map((c) => <span key={c}>T&nbsp; {c}</span>)}</div>
                </div>
              </div>
            </div>

            <div className="db-chat">
              <div className="db-tabs"><b>AI chat</b><span>Properties</span><span>Comments</span></div>

              <motion.div className="db-msg db-msg--you" {...step(0)}>
                <small>You · 10:45 AM</small>
                Make the video more cinematic and add warm color grading.
              </motion.div>

              <motion.div className="db-msg" {...step(1)}>
                <small>Ocicat AI · 10:45 AM</small>
                I’ve enhanced the color grading, added cinematic camera movement and subtle lens flare.
                <div className="db-compare">
                  <img src="images/hero-house.jpg" alt="" />
                  <motion.div
                    className="db-compare-after"
                    animate={{ clipPath: ['inset(0 0 0 30%)', 'inset(0 0 0 70%)'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                  >
                    <img src="images/hero-house.jpg" alt="" />
                  </motion.div>
                  <span className="db-tag">Before</span>
                  <span className="db-tag db-tag--r">After</span>
                </div>
                <small>Applied changes:</small>
                <ul>
                  {changes.map((c, i) => (
                    <motion.li key={c} {...step(2 + i * 0.35)}>{c}</motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div className="db-chips" {...step(3.8)}>
                {chips.map((c) => <span key={c}>{c}</span>)}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
