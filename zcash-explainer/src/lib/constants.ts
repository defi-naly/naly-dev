export const COLORS = {
  bg: '#0a0a0c',
  surface: '#0f0f12',
  border: '#1e1d1a',
  gold: '#c9a84c',
  goldGlow: 'rgba(201, 168, 76, 0.3)',
  goldDim: 'rgba(201, 168, 76, 0.15)',
  shield: '#3b82f6',
  green: '#22C55E',
  red: '#EF4444',
  textBright: '#e8e6e0',
  textBody: '#a8a69e',
  textMuted: '#7a7870',
} as const

export const TIMING = {
  heroDelay: 300,
  staggerBase: 60,
  sectionReveal: 600,
  countDuration: 2000,
} as const

export const NAV_LINKS = [
  { label: 'Privacy', href: '#privacy' },
  { label: 'Origin', href: '#origin' },
  { label: 'Demo', href: '#tx-demo' },
  { label: 'ZK Proofs', href: '#zk-proofs' },
  { label: 'Landscape', href: '#landscape' },
  { label: 'Tokenomics', href: '#tokenomics' },
  { label: 'Future', href: '#future' },
] as const
