/**
 * Maps a global 0–1 scroll progress to per-machine progress values.
 *
 * Each machine has an overlapping range so crossfades happen naturally:
 * the outgoing machine's dissolve (progress 0.90–1.0) overlaps with
 * the incoming machine's fade-in (progress 0.0–0.15).
 *
 * Layout (with ~4% overlap between adjacent machines):
 *
 *   Knot:         0.00 ──────── 0.18
 *   DeFi:              0.12 ────────────── 0.42
 *   Sovereignty:                    0.38 ────────────── 0.68
 *   Paragliding:                                0.64 ────────────── 0.92
 *   Footer:                                                  0.92 ── 1.00
 */

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

export interface PhaseData {
  /** Global scroll progress 0–1 */
  global: number;

  /** Knot collapse progress: 0 = idle, 0.8+ = collapsing, 0.9+ = fading */
  knot: number;
  /** Whether knot should be mounted */
  showKnot: boolean;

  /** DeFi machine progress (0–1 within its range) */
  defi: number;
  /** Whether DeFi should be mounted */
  showDefi: boolean;

  /** Sovereignty machine progress (0–1 within its range) */
  sovereignty: number;
  /** Whether sovereignty should be mounted */
  showSov: boolean;

  /** Paragliding machine progress (0–1 within its range) */
  paragliding: number;
  /** Whether paragliding should be mounted */
  showPara: boolean;

  /** Portfolio mesh progress (0–1 within its range) */
  portfolio: number;
  /** Whether portfolio should be mounted */
  showPortfolio: boolean;

  /** Which domain is "active" for overlay purposes */
  activeDomain: string | null;
}

// Knot: visible during cover, collapses during transition to defi
const KNOT_END = 0.18;
// Knot collapse ramps from 0→1 over the last portion of its range
const KNOT_COLLAPSE_START = 0.03;

// DeFi: progress 0→1 mapped over this range
const DEFI_START = 0.12;
const DEFI_END = 0.42;

// Sovereignty: progress 0→1 mapped over this range
const SOV_START = 0.38;
const SOV_END = 0.68;

// Paragliding: progress 0→1 mapped over this range
const PARA_START = 0.64;
const PARA_END = 0.92;

// Portfolio: progress 0→1 mapped over this range (overlaps paragliding end)
const PORTFOLIO_START = 0.91;
const PORTFOLIO_END = 1.0;

export function computePhaseProgress(global: number): PhaseData {
  // Knot: idle during cover, then collapse ramps to 1.0
  const knot = clamp01((global - KNOT_COLLAPSE_START) / (KNOT_END - KNOT_COLLAPSE_START));
  const showKnot = global < KNOT_END;

  // Machine progress: 0→1 over each range
  const defi = clamp01((global - DEFI_START) / (DEFI_END - DEFI_START));
  const showDefi = global >= DEFI_START && global < DEFI_END + 0.02;

  // Uncapped — goes past 1.0 so sovereignty can fade during paragliding's end
  const sovereignty = Math.max(0, (global - SOV_START) / (SOV_END - SOV_START));
  // Sovereignty stays mounted through paragliding so the mesh ball persists as "sun" top-left
  const showSov = global >= SOV_START && global < PARA_END;

  const paragliding = clamp01((global - PARA_START) / (PARA_END - PARA_START));
  const showPara = global >= PARA_START;

  const portfolio = clamp01((global - PORTFOLIO_START) / (PORTFOLIO_END - PORTFOLIO_START));
  const showPortfolio = global >= PORTFOLIO_START;

  // Active domain for overlay prose/annotations
  let activeDomain: string | null = null;
  if (global >= PARA_START) activeDomain = 'paragliding';
  else if (global >= SOV_START) activeDomain = 'sovereignty';
  else if (global >= DEFI_START) activeDomain = 'defi';

  return {
    global,
    knot,
    showKnot,
    defi,
    showDefi,
    sovereignty,
    showSov,
    paragliding,
    showPara,
    portfolio,
    showPortfolio,
    activeDomain,
  };
}

export function usePhaseProgress(global: number): PhaseData {
  return computePhaseProgress(global);
}
