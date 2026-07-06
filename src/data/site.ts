// Shift at Midnight Compass — site registry
// Minimal registry for page运行 and validator needs only.
// Does NOT contain research notes, screenshots, or full source-log.

export const SITE = {
  title: 'Shift at Midnight Compass',
  description: 'Unofficial Shift at Midnight guide hub. Demo guide, co-op prep, inspection basics, and launch tracking — from Steam, Xbox, and official sources only.',
  mode: 'fast-test',
  theme: 'guide-hub',
  ads: false,
  analytics: false,
  gameName: 'Shift at Midnight',
  platform: 'Steam / Xbox',
  creator: 'Bun Muen / Kwalee',
  // Evidence version for this build
  evidenceVersion: '2026-07-06',
  // Official pages
  steamUrl: 'https://store.steampowered.com/app/3722330/Shift_At_Midnight/',
  steamDemoUrl: 'https://store.steampowered.com/app/4050060/Shift_At_Midnight_Multiplayer_Demo/',
  xboxUrl: 'https://www.xbox.com/en-US/games/store/shift-at-midnight/9N0WDPMXNHWN',
  // Source confidence labels used across the site
  confidenceLabels: {
    high: 'Confirmed by official/platform source',
    medium: 'Partial source evidence — verify before publishing',
    low: 'Community lead or unverified — use with caution',
    hold: 'No official source — do not publish as fact',
  } as const,
  // Pages in this build
  pages: [
    { url: '/',                         title: 'Home',               label: 'Demo Guide Hub' },
    { url: '/release-date/',            title: 'Release Date',        label: 'Conflict Tracker' },
    { url: '/demo/',                    title: 'Demo Guide',          label: 'Demo Walkthrough' },
    { url: '/platforms/',               title: 'Platforms',           label: 'Platform Status' },
    { url: '/beginner-guide/',          title: 'First Shift Guide',   label: 'Spoiler-Safe Start' },
    { url: '/customer-checks/',         title: 'Customer Inspection', label: 'Inspection Matrix' },
    { url: '/co-op/',                   title: 'Co-op Prep',          label: 'Multiplayer Guide' },
    { url: '/survival-phase/',          title: 'Survival Phase',      label: 'Danger Response' },
    { url: '/joes-diner-newsletter/',   title: "Joe's Diner",         label: 'Query FAQ' },
    { url: '/sources/',                 title: 'Sources',             label: 'Trust Matrix' },
    { url: '/about/',                   title: 'About',               label: 'Policy' },
    { url: '/editorial/',               title: 'Editorial Policy',    label: 'Policy' },
    { url: '/contact/',                 title: 'Contact',             label: 'Policy' },
    { url: '/privacy/',                 title: 'Privacy Policy',      label: 'Policy' },
  ] as const,
} as const;

export const NAV = [
  { url: '/',                    label: 'Home' },
  { url: '/demo/',               label: 'Demo' },
  { url: '/beginner-guide/',     label: 'First Shift' },
  { url: '/customer-checks/',    label: 'Inspection' },
  { url: '/co-op/',              label: 'Co-op' },
  { url: '/survival-phase/',     label: 'Survival' },
  { url: '/platforms/',          label: 'Platforms' },
  { url: '/sources/',            label: 'Sources' },
] as const;

// Source confidence states used in source-label components
export const SOURCE_STATES = {
  NOW: { label: 'NOW', color: 'good', desc: 'Confirmed by official or platform source' },
  PARTIAL: { label: 'PARTIAL', color: 'warn', desc: 'Partial evidence — verify before acting' },
  HOLD: { label: 'HOLD', color: 'muted', desc: 'No official source — do not publish as fact' },
} as const;
