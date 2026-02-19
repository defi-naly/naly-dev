'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import MotionReveal from './MotionReveal';

const TICK_MS = 3000;
const TICK_COUNT = 4;

// Lending yield rate per second
const LENDING_RATE = 0.18;
const SWAP_RATE = 0.14;

// Simulated swap volume states — affects how much stays liquid
const states = [
  { swapActive: 20, lending: 80, label: 'Low swap volume' },
  { swapActive: 35, lending: 65, label: 'Moderate volume' },
  { swapActive: 55, lending: 45, label: 'High swap volume' },
  { swapActive: 25, lending: 75, label: 'Volume settling' },
];

export default function BoostedVisualizer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [tick, setTick] = useState(0);

  // Yield accumulators
  const standardFeesRef = useRef(0);
  const boostedFeesRef = useRef(0);
  const [standardFees, setStandardFees] = useState(0);
  const [boostedFees, setBoostedFees] = useState(0);
  const lastFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const stateIdx = tick % TICK_COUNT;
  const state = states[stateIdx];

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(interval);
  }, [isInView]);

  // Reset on loop
  const prevTickMod = useRef(0);
  useEffect(() => {
    const mod = tick % TICK_COUNT;
    if (mod < prevTickMod.current) {
      standardFeesRef.current = 0;
      boostedFeesRef.current = 0;
      setStandardFees(0);
      setBoostedFees(0);
    }
    prevTickMod.current = mod;
  }, [tick]);

  const stateRef = useRef(state);
  stateRef.current = state;

  const animateFees = useCallback((timestamp: number) => {
    if (lastFrameRef.current === 0) lastFrameRef.current = timestamp;
    const dt = (timestamp - lastFrameRef.current) / 1000;
    lastFrameRef.current = timestamp;

    // Standard: only swap fees on the ~20% that's active
    standardFeesRef.current += SWAP_RATE * dt;
    setStandardFees(standardFeesRef.current);

    // Boosted: swap fees + lending yield on idle portion
    const lendingPortion = stateRef.current.lending / 100;
    boostedFeesRef.current += (SWAP_RATE + LENDING_RATE * lendingPortion) * dt;
    setBoostedFees(boostedFeesRef.current);

    rafRef.current = requestAnimationFrame(animateFees);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    lastFrameRef.current = 0;
    rafRef.current = requestAnimationFrame(animateFees);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, animateFees]);

  return (
    <div ref={ref} className="range-viz">
      {/* Standard AMM */}
      <MotionReveal delay={0}>
        <div className="range-viz-panel bad">
          <div className="range-viz-label bad">Standard AMM</div>

          <div style={{ marginTop: '1.5rem' }}>
            {/* Liquidity bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
            }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: 'var(--muted)',
                width: '4.5rem',
                flexShrink: 0,
              }}>
                Liquidity
              </span>
              <div style={{
                flex: 1,
                height: '32px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '6px',
                overflow: 'hidden',
                display: 'flex',
                border: '1px solid var(--border)',
              }}>
                <motion.div
                  animate={{ width: `${state.swapActive}%` }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: 'var(--warning)',
                    opacity: 0.7,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.5625rem',
                    fontWeight: 700,
                    color: 'var(--bright)',
                    whiteSpace: 'nowrap',
                  }}>
                    SWAPS
                  </span>
                </motion.div>
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.3,
                }}>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.5625rem',
                    fontWeight: 600,
                    color: 'var(--muted)',
                    whiteSpace: 'nowrap',
                  }}>
                    IDLE
                  </span>
                </div>
              </div>
            </div>

            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              color: 'var(--muted)',
              textAlign: 'center',
              marginTop: '0.75rem',
              opacity: 0.6,
            }}>
              {100 - state.swapActive}% of capital earns nothing
            </div>
          </div>

          <div className="range-earnings" style={{ marginTop: '1.25rem' }}>
            <div className="range-viz-status bad">
              <span className="status-dot bad" />
              Swap fees only
            </div>
            <span className="range-earnings-value">
              ${standardFees.toFixed(2)}
            </span>
            <div className="range-progress-bar">
              <div
                className="range-progress-fill dead"
                style={{ width: `${Math.min((standardFees / 4) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </MotionReveal>

      {/* Boosted Pool */}
      <MotionReveal delay={0.15}>
        <div className="range-viz-panel good">
          <div className="range-viz-label good">Boosted Pool</div>

          <div style={{ marginTop: '1.5rem' }}>
            {/* Liquidity bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
            }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: 'var(--muted)',
                width: '4.5rem',
                flexShrink: 0,
              }}>
                Liquidity
              </span>
              <div style={{
                flex: 1,
                height: '32px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '6px',
                overflow: 'hidden',
                display: 'flex',
                border: '1px solid rgba(var(--accent-rgb), 0.15)',
              }}>
                <motion.div
                  animate={{ width: `${state.swapActive}%` }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: 'var(--bloom-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.5625rem',
                    fontWeight: 700,
                    color: 'var(--void)',
                    whiteSpace: 'nowrap',
                  }}>
                    SWAPS
                  </span>
                </motion.div>
                <motion.div
                  animate={{ width: `${state.lending}%` }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: 'rgba(var(--accent-rgb), 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.5625rem',
                    fontWeight: 700,
                    color: 'var(--bloom-accent)',
                    whiteSpace: 'nowrap',
                  }}>
                    LENDING
                  </span>
                </motion.div>
              </div>
            </div>

            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              color: 'var(--bloom-accent)',
              textAlign: 'center',
              marginTop: '0.75rem',
              opacity: 0.8,
            }}>
              {state.label} — buffer auto-adjusts
            </div>
          </div>

          <div className="range-earnings" style={{ marginTop: '1.25rem' }}>
            <div className="range-viz-status good">
              <span className="status-dot good" />
              Swap fees + lending yield
            </div>
            <span className="range-earnings-value">
              ${boostedFees.toFixed(2)}
            </span>
            <div className="range-progress-bar">
              <div
                className="range-progress-fill"
                style={{ width: `${Math.min((boostedFees / 4) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </MotionReveal>
    </div>
  );
}
