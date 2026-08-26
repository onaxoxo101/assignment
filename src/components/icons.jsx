/**
 * Vector glyphs redrawn at the exact geometry Figma reports for each node, so
 * they occupy the designed box precisely.
 *
 *   ArrowNorthEast  — Figma 1:44 / 1:49 / 1:774. A 17 × 23.171 arrow rotated
 *                     46.17° inside a 28.488 × 28.31 box.
 *   DownloadArrow   — Figma 1:56. 20 × 19.
 *
 * The corresponding nodes are listed in src/data/figmaAssets.js so the original
 * exports can be dropped in verbatim if preferred.
 */

export function ArrowNorthEast({ size = 28.488, color = 'currentColor' }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: (size * 28.309822791038073) / 28.48827633398969,
        flex: '0 0 auto',
      }}
    >
      <svg
        width="17"
        height="23.171"
        viewBox="0 0 17 23.171"
        fill="none"
        style={{ transform: 'rotate(46.17deg)', display: 'block' }}
      >
        <path
          d="M8.5 22.171V2M8.5 1.5 1.6 8.9M8.5 1.5l6.9 7.4"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export function DownloadArrow({ color = 'currentColor' }) {
  return (
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block', flex: '0 0 auto' }}
    >
      <path
        d="M10 1v12M10 13.5 4.6 8.1M10 13.5l5.4-5.4M1.5 17.75h17"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
