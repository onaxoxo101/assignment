const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const Sparkles = (p) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <path d="M10 2.5l1.6 4.9a3 3 0 001.9 1.9l4.9 1.6-4.9 1.6a3 3 0 00-1.9 1.9L10 19.3l-1.6-4.9a3 3 0 00-1.9-1.9L1.6 10.9l4.9-1.6a3 3 0 001.9-1.9L10 2.5z" />
    <path d="M19 13.5l.8 2.2a1.5 1.5 0 00.9.9l2.2.8-2.2.8a1.5 1.5 0 00-.9.9L19 21.3l-.8-2.2a1.5 1.5 0 00-.9-.9l-2.2-.8 2.2-.8a1.5 1.5 0 00.9-.9l.8-2.2z" />
  </svg>
)
export const TextIcon = (p) => (
  <svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor" stroke="none" /><path d="M8 8h8M12 8v9" stroke="#0a0a0a" strokeWidth="2.2" /></svg>
)
export const Wand = (p) => (
  <svg {...base} {...p}><path d="M4 20L15 9M13 7l4 4" /><path d="M18 3v3M16.5 4.5h3M20 9v2M19 10h2M9 3v2M8 4h2" /></svg>
)
export const CC = (p) => (
  <svg {...base} {...p}><rect x="2.5" y="5" width="19" height="14" rx="4" fill="currentColor" stroke="none" /><path d="M10.5 10.2a2 2 0 100 3.6M17 10.2a2 2 0 100 3.6" stroke="#0a0a0a" strokeWidth="1.8" /></svg>
)
export const Speaker = (p) => (
  <svg {...base} {...p}><path d="M4 9.5h3l4.5-4v13L7 14.5H4z" fill="currentColor" /><path d="M15.5 9a4 4 0 010 6M18 6.5a7.5 7.5 0 010 11" /></svg>
)
export const Mic = (p) => (
  <svg {...base} {...p}><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" stroke="none" /><path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21" /></svg>
)
export const Sliders = (p) => (
  <svg {...base} {...p}><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /><path d="M4 12h2M10 12h10" /><circle cx="8" cy="12" r="2" /></svg>
)
export const Check = (p) => (
  <svg {...base} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
)
export const CheckCircle = (p) => (
  <svg {...base} {...p} stroke="none"><circle cx="12" cy="12" r="10" fill="currentColor" /><path d="M7.5 12.3l3 3 6-6" stroke="var(--check-ink, #000)" strokeWidth="2.2" fill="none" /></svg>
)
export const Chevron = (p) => (
  <svg {...base} {...p}><path d="M9 6l6 6-6 6" /></svg>
)
export const Quote = (p) => (
  <svg width="28" height="22" viewBox="0 0 28 22" fill="currentColor" {...p}>
    <path d="M0 13.5C0 6.6 4 1.9 10.3 0l1.2 2.3C8 3.9 6.3 6.3 6.1 9.2c3.3 0 5.6 2.2 5.6 5.3 0 3.3-2.5 5.6-5.8 5.6C2.3 20.1 0 17.4 0 13.5zm15.6 0c0-6.9 4-11.6 10.3-13.5l1.2 2.3c-3.5 1.6-5.2 4-5.4 6.9 3.3 0 5.6 2.2 5.6 5.3 0 3.3-2.5 5.6-5.8 5.6-3.6 0-5.9-2.7-5.9-6.6z" />
  </svg>
)
export const Star = ({ filled, ...p }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" {...p}>
    <path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" strokeLinejoin="round" />
  </svg>
)
export const Mail = (p) => (
  <svg {...base} width="16" height="16" {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6l8.5 7 8.5-7" /></svg>
)
export const Phone = (p) => (
  <svg {...base} width="16" height="16" {...p}><path d="M5 3.5h3.5l1.8 4.5-2.3 1.4a11 11 0 006.6 6.6l1.4-2.3 4.5 1.8V19a2 2 0 01-2.2 2A17.5 17.5 0 013 5.7 2 2 0 015 3.5z" /></svg>
)
export const Pin = (p) => (
  <svg {...base} width="16" height="16" {...p}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
)
