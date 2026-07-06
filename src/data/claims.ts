// Shift at Midnight Compass — claims registry
// Maps claim IDs to source evidence for page tracing.
// Does NOT contain full source-log or research notes.

export const CLAIMS = {
  // SAM-CLM-001: Game genre and premise
  'SAM-CLM-001': {
    statement: 'Shift at Midnight is an online co-op detective horror game.',
    confidence: 'high',
    publishState: 'PUBLISHABLE',
    sources: ['SAM-SRC-001'],
  },
  // SAM-CLM-002: Steam current status
  'SAM-CLM-002': {
    statement: 'Steam currently lists Shift at Midnight as Coming soon.',
    confidence: 'high',
    publishState: 'PUBLISHABLE',
    sources: ['SAM-SRC-001'],
    note: 'Recheck on build day — store status can change',
  },
  // SAM-CLM-003: Demo existence
  'SAM-CLM-003': {
    statement: 'A Steam multiplayer demo page exists for Shift at Midnight.',
    confidence: 'high',
    publishState: 'PUBLISHABLE',
    sources: ['SAM-SRC-002'],
    note: 'Steam demo page also confirms introductory content, three pre-scripted shifts, and limited tools/weapons.',
  },
  // SAM-CLM-004: Xbox store existence
  'SAM-CLM-004': {
    statement: 'Xbox has a store page for Shift at Midnight.',
    confidence: 'high',
    publishState: 'PUBLISHABLE',
    sources: ['SAM-SRC-004'],
  },
  // SAM-CLM-005: Release date conflict
  'SAM-CLM-005': {
    statement: 'Release-date information is conflicting across public sources.',
    confidence: 'medium',
    publishState: 'PARTIAL',
    sources: ['SAM-SRC-001', 'SAM-SRC-003', 'SAM-SRC-008', 'SAM-SRC-009', 'SAM-SRC-010'],
    note: 'Present as status timeline — do not publish final date without confirmation',
  },
  // SAM-CLM-006: Trends demand signal
  'SAM-CLM-006': {
    statement: 'Google Trends shows sustained 30-day US search interest and rising Joe\'s Diner / release / PS5 queries.',
    confidence: 'high',
    publishState: 'PUBLISHABLE',
    sources: ['SAM-SRC-011'],
    note: 'Use as demand evidence — not as public gameplay fact',
  },
  // SAM-CLM-007: Official trailers exist
  'SAM-CLM-007': {
    statement: 'Official YouTube trailers exist and can be linked as source material.',
    confidence: 'medium',
    publishState: 'PARTIAL',
    sources: ['SAM-SRC-006', 'SAM-SRC-007'],
    note: 'Link only — do not reuse frames, thumbnails, or long transcript',
  },
  // SAM-CLM-008: Joe's Diner newsletter demand
  'SAM-CLM-008': {
    statement: 'Joe\'s Diner / newsletter queries are a real demand signal, but the exact answer requires official or hands-on verification.',
    confidence: 'medium',
    publishState: 'PARTIAL',
    sources: ['SAM-SRC-011', 'SAM-SRC-012'],
    note: 'Create spoiler-safe FAQ — hold exact answer until verified',
  },
  // SAM-CLM-009: HOLD — unverified gameplay details
  'SAM-CLM-009': {
    statement: 'Exact doppelganger/customer tells, survival tactics, routes, and case solutions are not confirmed.',
    confidence: 'high',
    publishState: 'HOLD',
    sources: [],
    note: 'Requires current-version hands-on testing or official guide',
  },
  // SAM-CLM-010: Asset rights HOLD
  'SAM-CLM-010': {
    statement: 'Steam/Xbox/YouTube/press images and video frames are not cleared for site use.',
    confidence: 'high',
    publishState: 'HOLD',
    sources: ['SAM-SRC-001', 'SAM-SRC-004', 'SAM-SRC-006', 'SAM-SRC-007'],
  },
} as const;

// Sources referenced by claim IDs (minimal — for source-label display only)
export const SOURCE_LABELS = {
  'SAM-SRC-001': { type: 'official_platform', label: 'Steam Store', url: 'https://store.steampowered.com/app/3722330/Shift_At_Midnight/' },
  'SAM-SRC-002': { type: 'official_platform', label: 'Steam Demo Page', url: 'https://store.steampowered.com/app/4050060/Shift_At_Midnight_Multiplayer_Demo/' },
  'SAM-SRC-003': { type: 'official_platform', label: 'Steam News', url: 'https://steamcommunity.com/app/3722330/allnews/' },
  'SAM-SRC-004': { type: 'official_platform', label: 'Xbox Store', url: 'https://www.xbox.com/en-US/games/store/shift-at-midnight/9N0WDPMXNHWN' },
  'SAM-SRC-006': { type: 'official_video', label: 'Kwalee YouTube Trailer', url: 'https://www.youtube.com/watch?v=aSzzhY0EMOY' },
  'SAM-SRC-007': { type: 'official_video', label: 'Triple-i Release Trailer', url: 'https://www.youtube.com/watch?v=effB-VacVvE' },
  'SAM-SRC-008': { type: 'press', label: 'Gematsu', url: 'https://www.gematsu.com/2026/04/shift-at-midnight-launches-may-28' },
  'SAM-SRC-009': { type: 'press', label: 'PC Gamer', url: 'https://www.pcgamer.com/games/pc-game-release-dates-july-2026/' },
  'SAM-SRC-010': { type: 'press', label: 'TrueAchievements', url: 'https://www.trueachievements.com/news/shift-at-midnight-xbox-game-pass-announcment' },
  'SAM-SRC-011': { type: 'user_trends', label: 'Google Trends (User-provided)', url: null },
  'SAM-SRC-012': { type: 'community_lead', label: 'YouTube/SERP — community', url: null },
} as const;

export type ClaimId = keyof typeof CLAIMS;
export type SourceId = keyof typeof SOURCE_LABELS;
