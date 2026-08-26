/**
 * Case-study pages — Figma frames "Case Study / SORA" (1:763),
 * "… / Ocicat AI Studio" (1:918), "… / CVER" (1:1073), "… / Vendify" (1:1565)
 * and "… / Budget Buddy" (1:1745). All copy is verbatim from the file.
 *
 * "Section / Project details" is present in every frame but marked
 * hidden="true" in Figma, so it is intentionally not rendered.
 */

/** Slide count is 4 in every carousel (Figma "Dots" — four 8px dots). */
export const SLIDE_COUNT = 4

export const CASE_STUDIES = [
  {
    slug: 'sora',
    node: '1:763',
    title: 'SORA',
    subtitle: 'Subscription Management System',
    intro:
      'A subscription manager that pulls every recurring charge into one place, so people can see what they are actually paying for and cancel what they forgot about.',
    chips: ['Product Design', 'Mobile App', 'End-to-end'],
    linkLabel: 'View live site',
    cover: 'case-sora-cover',
    coverHeight: 849,
    screens: {
      title: 'The screens',
      note: 'Key moments from the product: dashboard, subscription detail, renewal calendar and the cancel flow.',
      caption: 'Dashboard showing every active subscription, sorted by what renews next.',
      slides: ['slide-sora-1', 'slide-sora-2', 'slide-sora-3', 'slide-sora-4'],
    },
    results: [
      {
        title: 'The goal',
        body: [
          'The goal was to design an experience that gives people a clear picture of what they are spending every month without making them feel judged for it.',
          'I wanted users to understand at a glance what renews next, what it costs, and what they can safely cancel.',
        ],
      },
      {
        title: 'Design approach',
        body: [
          'I approached the design by focusing on clarity and flow across the entire experience.',
          'I paid close attention to how users move between the dashboard, a single subscription and the cancel flow, making sure transitions feel natural and nothing feels disconnected. The aim was to reduce friction and keep people in control of their money.',
        ],
      },
      {
        title: 'Visual direction',
        body: [
          'The visual direction is clean and functional, with emphasis on readability and structure.',
          'The interface was designed to feel calm and organised, so people can quickly understand what is happening to their money without distraction.',
        ],
      },
      {
        title: 'Outcome',
        body: [
          'The final design turns a scattered set of receipts and reminders into a single, structured view.',
          'People can see what renews next, what it costs and cancel in a couple of taps, with no hunting through email and no surprise charges.',
        ],
      },
    ],
  },

  {
    slug: 'ocicat-ai-studio',
    node: '1:918',
    title: 'Ocicat AI Studio',
    subtitle: 'AI Video Creation Platform',
    intro:
      'An all-in-one studio that turns a written idea into a finished video, with script, visuals, auto captions and export handled in a single flow for 2,000+ creators.',
    chips: ['UI/UX', 'Web App', 'AI Product'],
    linkLabel: 'View live site',
    cover: 'case-ocicat-cover',
    coverHeight: 849,
    screens: {
      title: 'The screens of the landing page',
      note: 'Key moments from the product: script generation, storyboard, caption editing and export.',
      caption: 'Studio view, with script, visuals and captions moving through one continuous flow.',
      slides: ['slide-ocicat-1', 'slide-ocicat-2', 'slide-ocicat-3', 'slide-ocicat-4'],
    },
    results: [
      {
        title: 'The goal',
        body: [
          'The goal was to make a pipeline that normally spans four or five separate tools feel like one continuous piece of work.',
          'I wanted creators to stay in control of the output without ever having to think about the models running underneath it.',
        ],
      },
      {
        title: 'Design approach',
        body: [
          'I approached the design as a single timeline: idea, script, visuals, captions and export. Each step stays visible, and each one can be edited without losing the work before it.',
          'Advanced controls stay tucked behind the surface until they are needed, and every generated asset carries a clear state so creators always know what is processing, what is ready and what needs another pass.',
        ],
      },
      {
        title: 'Visual direction',
        body: [
          'The visual direction is dark and studio-like, so generated frames and previews stay the brightest thing on screen.',
          'Typography and controls sit back deliberately; the creator’s footage is the only thing competing for attention.',
        ],
      },
      {
        title: 'Outcome',
        body: [
          'The final design takes creators from a written idea to an exported video without ever leaving the product.',
          'What used to mean juggling a script tool, an editor, a captioning service and an export pipeline now happens in one place, and it is running for 2,000+ creators.',
        ],
      },
    ],
  },

  {
    slug: 'cver',
    node: '1:1073',
    title: 'CVERAI',
    subtitle: 'Career Platform for Skilled Immigrants',
    intro:
      'Built for skilled immigrants who refuse to start over. Job matching, local connections and a verified directory that puts them in front of recruiters instead of into an application void.',
    chips: ['Product Design', 'Web Platform', 'Landing Page'],
    linkLabel: 'View live site',
    cover: 'case-cver-cover',
    // Figma 1:1104 — this cover is 983px tall, not the usual 849.
    coverHeight: 983,
    screens: {
      title: 'The screens of the landing page',
      note: 'Key moments from the product: job matching, the verified profile, the directory and the recruiter view.',
      caption: 'Job matches, ranked, with the reason each role fits shown up front.',
      slides: ['slide-cver-1', 'slide-cver-2', 'slide-cver-3'],
    },
    results: [
      {
        title: 'The goal',
        body: [
          'The goal was to move people from applying and hoping to actually being seen.',
          'Credentials earned in another country are hard for local recruiters to read quickly, so the design had to make that experience obvious at a glance and easy to trust.',
        ],
      },
      {
        title: 'Design approach',
        body: [
          'I treated the profile as the product. A verified directory entry doubles as a recruiter-facing page, so one piece of work does the job of a CV, a portfolio and an introduction.',
          'Matches explain themselves, since every role surfaces the reason it fits, and local connections sit alongside listings, so the platform builds a network rather than a queue of applications.',
        ],
      },
      {
        title: 'Visual direction',
        body: [
          'The visual direction is warm and credible, with plain language and generous type doing most of the work.',
          'Verification signals are built into the layout rather than bolted on, so trust reads immediately without the interface shouting about it.',
        ],
      },
      {
        title: 'Outcome',
        body: [
          'I worked as part of the product team on CVER, owning the job matching flow, the verified profile and the directory, and pairing with the developers through handoff so what shipped matched what was designed.',
          'Over that period the platform grew from just over 1,000 users to 2,000. Skilled immigrants are now found through a verified profile recruiters can search, instead of applications that go unanswered.',
        ],
      },
    ],
  },

  {
    slug: 'vendify',
    node: '1:1565',
    title: 'Vendify',
    subtitle: 'E-commerce marketplace platform',
    intro:
      'Vendify is an e-commerce marketplace that connects buyers with vendors, making it easy to discover, browse and purchase products online.',
    chips: ['Mobile Design', 'E-commerce', 'Visual Design'],
    linkLabel: 'View case study',
    // Figma 1:1577 has no hero cover frame — the hero is copy only.
    cover: null,
    coverHeight: 0,
    screens: {
      title: 'The screens',
      note: 'Key moments from the product: discovery, the vendor storefront, product detail and checkout.',
      caption: 'Discovery, with categories, featured vendors and products surfaced in one scroll.',
      slides: ['slide-vendify-1', 'slide-vendify-2', 'slide-vendify-3', 'slide-vendify-4'],
    },
    // Figma 1:1565 carries a second Screens section (1:1645).
    secondScreens: {
      title: 'The screens of the landing page',
      note: 'Key moments from the product: job matching, the verified profile, the directory and the recruiter view.',
      caption: 'Job matches, ranked, with the reason each role fits shown up front.',
      slides: ['slide-vendify-b1', 'slide-vendify-b2', 'slide-vendify-b3', 'slide-vendify-b4'],
    },
    results: [
      {
        title: 'The goal',
        body: [
          'The goal was to make discovery feel personal and checkout feel short.',
          'Small vendors also needed a storefront that looks credible next to much larger sellers, without being asked to design anything themselves.',
        ],
      },
      {
        title: 'Design approach',
        body: [
          'I built the app browse-first: the home screen is for finding things, not for navigating menus. Vendor storefronts are first-class pages rather than a filter applied to a product list.',
          'Checkout was cut to three steps with the cart always one tap away, so people can keep shopping without losing what they have already picked out.',
        ],
      },
      {
        title: 'Visual direction',
        body: [
          'The visual direction lets product photography lead and keeps the interface out of its way.',
          'Generous cards, calm neutrals and a single accent colour reserved for actions make it obvious what is tappable on every screen.',
        ],
      },
      {
        title: 'Outcome',
        body: [
          'The final design gets shoppers from browsing to checkout in noticeably fewer taps.',
          'Vendors get a storefront that reads as trustworthy on its own, and buyers get a marketplace that feels curated rather than crowded.',
        ],
      },
    ],
  },

  {
    slug: 'budget-buddy',
    node: '1:1745',
    title: 'Budget Buddy',
    subtitle: 'Student Budget Tracker',
    intro:
      'A personal finance app for students that tracks spending, manages budgets and helps them save, with a built-in wallet for moving funds securely.',
    chips: ['Mobile Design', 'Fintech', 'Visual Design'],
    linkLabel: 'View case study',
    cover: 'case-budget-buddy-cover',
    // Figma 1:1776 — 819px tall.
    coverHeight: 819,
    screens: {
      title: 'The screens',
      note: 'Key moments from the product: balance, budgets, transactions and the in-app wallet.',
      caption: 'Home shows what is left to spend this month, before anything else.',
      slides: ['slide-budget-buddy-1', 'slide-budget-buddy-2', 'slide-budget-buddy-3', 'slide-budget-buddy-4'],
    },
    results: [
      {
        title: 'The goal',
        body: [
          'The goal was to help students see where their money actually goes, without spreadsheets and without feeling judged for it.',
          'Student income is small and irregular, so saving had to feel achievable rather than aspirational.',
        ],
      },
      {
        title: 'Design approach',
        body: [
          'I designed budgets as simple envelopes, where money is assigned to a purpose and the amount left is always visible at the top of the screen.',
          'The wallet and the tracker live in the same place, and the app nudges before an overspend rather than reporting it afterwards, which is while a student can still do something about it.',
        ],
      },
      {
        title: 'Visual direction',
        body: [
          'The visual direction is friendly and high contrast, with big numbers carrying the hierarchy.',
          'It stays playful without tipping into childish, because the app handles real money and needs to be trusted with it.',
        ],
      },
      {
        title: 'Outcome',
        body: [
          'The final design lets students know what is left to spend at a glance.',
          'Budgets, transactions and a secure wallet sit in one app, so tracking money and moving it are no longer two separate chores.',
        ],
      },
    ],
  },
]

export const getCaseStudy = (slug) => CASE_STUDIES.find((c) => c.slug === slug)

/**
 * Prev / next pairings read from each frame's "Section / Project nav"
 * (1:862, 1:1017, 1:1509, 1:1689, 1:2032) — they form a closed loop.
 */
export function getNeighbours(slug) {
  const i = CASE_STUDIES.findIndex((c) => c.slug === slug)
  if (i < 0) return { previous: null, next: null }
  const n = CASE_STUDIES.length
  return {
    previous: CASE_STUDIES[(i - 1 + n) % n],
    next: CASE_STUDIES[(i + 1) % n],
  }
}
