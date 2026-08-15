/**
 * Arrow glyphs.
 *
 * Figma renders these as text nodes ("→" 15x18, "↗" 16x19), but the Inter
 * latin subset does not carry U+2192 / U+2197, so a text node would silently
 * fall back to a system font and lose the designed box. They are drawn here at
 * exactly the Figma dimensions instead.
 */

/** Node 43:7 / 45:9 — "→", 15 x 18 */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="18"
      viewBox="0 0 15 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 9h12M8.4 4.4 13 9l-4.6 4.6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Node 43:16 / 43:24 / … — "↗", 16 x 19 */
export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="19"
      viewBox="0 0 16 19"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 14.5 12 6.5M5.6 6.5H12v6.4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
