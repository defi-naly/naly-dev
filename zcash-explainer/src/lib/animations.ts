// Shared animation presets for anime.js v4
export const FADE_UP = {
  opacity: [0, 1] as [number, number],
  translateY: [16, 0] as [number, number],
  duration: 600,
  ease: 'outExpo' as const,
}

export const STAGGER_DELAY = 60

export const CHAR_REVEAL = {
  translateY: ['100%', '0%'] as [string, string],
  opacity: [0, 1] as [number, number],
  duration: 600,
  ease: 'outExpo' as const,
}
