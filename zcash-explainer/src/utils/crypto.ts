/**
 * Pseudo-cryptographic display functions.
 * No real crypto — just deterministic, visually convincing hex output.
 */

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash + char) | 0
  }
  return hash >>> 0
}

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) | 0
    return (s >>> 0) / 4294967296
  }
}

/** Deterministic 64 hex chars from input */
export function pseudoHash(input: string): string {
  const seed = hashCode(input)
  const rng = seededRandom(seed)
  return Array.from({ length: 64 }, () =>
    Math.floor(rng() * 16).toString(16)
  ).join('')
}

/** "0x" + 16 hex chars + "..." — encrypted-looking gibberish */
export function encryptedGibberish(input: string): string {
  const seed = hashCode(input + '__enc')
  const rng = seededRandom(seed)
  const hex = Array.from({ length: 16 }, () =>
    Math.floor(rng() * 16).toString(16)
  ).join('')
  return `0x${hex}...`
}

/** 64 hex chars derived from commitment — used as nullifier */
export function generateNullifier(commitment: string): string {
  const seed = hashCode(commitment + '__null')
  const rng = seededRandom(seed)
  return Array.from({ length: 64 }, () =>
    Math.floor(rng() * 16).toString(16)
  ).join('')
}
