import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export const HERO_VIDEO = '/videos/house-hero.mp4'
export const HERO_POSTER = '/images/hero-house.jpg'

// Autoplaying, muted, looping house video. It only plays while on screen.
// If the video file is missing, it falls back to the poster with a slow push-in
// so the frame never looks frozen.
export default function HeroVideo({ className = '' }) {
  const ref = useRef(null)
  const visible = useInView(ref, { amount: 0.1 })
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = ref.current?.querySelector('video')
    if (!video) return
    if (visible) video.play().catch(() => {})
    else video.pause()
  }, [visible, failed])

  return (
    <div ref={ref} className={`hero-video ${className}`}>
      {failed ? (
        <motion.img
          src={HERO_POSTER}
          alt="Modern two-storey house at dusk"
          animate={{ scale: [1, 1.12], x: ['0%', '-3%'] }}
          transition={{ duration: 14, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
        />
      ) : (
        <video poster={HERO_POSTER} muted loop playsInline autoPlay preload="metadata">
          <source src={HERO_VIDEO} type="video/mp4" onError={() => setFailed(true)} />
        </video>
      )}
    </div>
  )
}
