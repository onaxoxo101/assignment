import './Eyebrow.css'

/**
 * Figma: "Eyebrow" (1:69, 1:178, 1:205, 1:229, 1:249, 1:287).
 * 10px dot + 12px gap + 16px / 500 / 2.4px tracking label in --accent.
 */
export default function Eyebrow({ children, className = '' }) {
  return (
    <div className={`eyebrow ${className}`.trim()}>
      <span className="eyebrow__dot" aria-hidden="true" />
      <p className="eyebrow__label">{children}</p>
    </div>
  )
}
