export interface Stat {
  value: number
  suffix: string
  label: string
}

export const PRIVACY_STATS: Stat[] = [
  { value: 9, suffix: '+', label: 'Years in production' },
  { value: 100, suffix: '%', label: 'Open source' },
  { value: 0, suffix: '', label: 'Metadata leaked in shielded' },
  { value: 4, suffix: '', label: 'Independent security audits' },
]

export const PERFORMANCE_STATS: Stat[] = [
  { value: 75, suffix: 's', label: 'Block time' },
  { value: 2, suffix: 'MB', label: 'Max block size' },
  { value: 100, suffix: 'x', label: 'Sapling speedup over Sprout' },
]

export const TOKENOMICS_STATS: Stat[] = [
  { value: 21, suffix: 'M', label: 'Hard cap (same as BTC)' },
  { value: 4, suffix: '%', label: 'Current annual inflation' },
  { value: 0, suffix: '', label: 'ICO or premine' },
  { value: 4, suffix: 'yr', label: 'Halving cycle' },
]
