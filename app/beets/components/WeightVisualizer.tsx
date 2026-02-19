'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import MotionReveal from './MotionReveal';

interface Asset {
  name: string;
  target: number;
  color: string;
}

const assets: Asset[] = [
  { name: 'wETH', target: 60, color: 'var(--bloom-accent)' },
  { name: 'USDC', target: 25, color: 'var(--navy)' },
  { name: 'wBTC', target: 15, color: 'var(--success)' },
];

// Threshold (in %) to consider "off target"
const DRIFT_THRESHOLD = 4;

// How fast the weighted pool snaps back (0 = instant, 1 = never)
const SNAP_SPEED = 3.5; // per-second decay rate
// Fee earned each time arbs rebalance (proportional to drift magnitude)
const FEE_PER_DRIFT_POINT = 0.008;

// Organic price movement — layered sine waves for each asset
// Returns raw drifts from target (zero-sum so weights always total 100%)
function computeMarketDrifts(elapsed: number): number[] {
  const raw = [
    18 * Math.sin(0.35 * elapsed) + 7 * Math.sin(0.87 * elapsed + 1.2) + 4 * Math.sin(1.6 * elapsed + 0.5),
    12 * Math.sin(0.28 * elapsed + 2.1) + 5 * Math.sin(0.73 * elapsed + 3.8) + 3 * Math.sin(1.4 * elapsed + 1.0),
    10 * Math.sin(0.42 * elapsed + 4.2) + 4 * Math.sin(0.95 * elapsed + 0.7) + 3 * Math.sin(1.8 * elapsed + 2.5),
  ];
  // Normalize to zero-sum
  const avg = raw.reduce((s, d) => s + d, 0) / raw.length;
  return raw.map((d) => d - avg);
}

export default function WeightVisualizer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  const [manualDrifts, setManualDrifts] = useState([0, 0, 0]);
  const [weightedDrifts, setWeightedDrifts] = useState([0, 0, 0]);
  const [fees, setFees] = useState(0);

  const startTimeRef = useRef(0);
  const lastUpdateRef = useRef(0);
  const rafRef = useRef<number>(0);
  const weightedRef = useRef([0, 0, 0]);
  const feesRef = useRef(0);
  const prevMarketRef = useRef([0, 0, 0]);

  const animate = useCallback((timestamp: number) => {
    if (startTimeRef.current === 0) startTimeRef.current = timestamp;

    // Throttle state updates to ~20 fps
    if (timestamp - lastUpdateRef.current < 50) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }
    const dt = (timestamp - lastUpdateRef.current) / 1000;
    lastUpdateRef.current = timestamp;

    const elapsed = (timestamp - startTimeRef.current) / 1000;
    const market = computeMarketDrifts(elapsed);

    // Manual portfolio: just follows market drift directly
    setManualDrifts(market);

    // Weighted pool: market pushes it away, then arbs snap it back
    // The "target" for weighted pool is 0 drift (arbs rebalancing)
    // Each frame: drift toward market, then decay toward 0
    const newWeighted = weightedRef.current.map((w, i) => {
      // Market force pushes pool weights (same as manual)
      const marketDelta = market[i] - prevMarketRef.current[i];
      const pushed = w + marketDelta;
      // Arb force pulls back toward 0 (target weights)
      const decayed = pushed * Math.exp(-SNAP_SPEED * dt);
      return decayed;
    });

    // Fees: proportional to the drift that arbs corrected this frame
    const corrected = newWeighted.reduce((sum, w, i) => {
      const pushed = weightedRef.current[i] + (market[i] - prevMarketRef.current[i]);
      return sum + Math.abs(pushed - w);
    }, 0);
    feesRef.current += corrected * FEE_PER_DRIFT_POINT;

    weightedRef.current = newWeighted;
    prevMarketRef.current = market;

    setWeightedDrifts([...newWeighted]);
    setFees(feesRef.current);

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    startTimeRef.current = 0;
    lastUpdateRef.current = 0;
    weightedRef.current = [0, 0, 0];
    prevMarketRef.current = [0, 0, 0];
    feesRef.current = 0;
    setFees(0);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, animate]);

  const maxManualDrift = Math.max(...manualDrifts.map(Math.abs));
  const isManualDrifted = maxManualDrift > DRIFT_THRESHOLD;

  const maxWeightedDrift = Math.max(...weightedDrifts.map(Math.abs));
  const isRebalancing = maxWeightedDrift > 1.5;

  return (
    <div ref={ref} className="range-viz">
      {/* Manual portfolio — drifts with no correction */}
      <MotionReveal delay={0}>
        <div className="range-viz-panel bad">
          <div className="range-viz-label bad">Manual Portfolio</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {assets.map((asset, i) => {
              const current = asset.target + manualDrifts[i];
              const isDrifted = Math.abs(manualDrifts[i]) > DRIFT_THRESHOLD;

              return (
                <div key={asset.name}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '0.375rem',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 600,
                      color: 'var(--bright)',
                    }}>
                      {asset.name}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      fontVariantNumeric: 'tabular-nums',
                      color: isDrifted ? 'var(--warning)' : 'var(--muted)',
                    }}>
                      {Math.round(current)}% <span style={{ opacity: 0.5 }}>/ {asset.target}%</span>
                    </span>
                  </div>
                  <div style={{
                    height: '8px',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}>
                    {/* Target ghost bar */}
                    <div style={{
                      position: 'absolute',
                      height: '100%',
                      width: `${asset.target}%`,
                      borderRight: '2px dashed rgba(255,255,255,0.15)',
                    }} />
                    <motion.div
                      animate={{ width: `${Math.max(0, current)}%` }}
                      transition={{ duration: 0.08, ease: 'linear' }}
                      style={{
                        height: '100%',
                        background: isDrifted ? 'var(--warning)' : asset.color,
                        borderRadius: '4px',
                        opacity: isDrifted ? 0.7 : 1,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="range-earnings" style={{ marginTop: '1.25rem' }}>
            <div className={`range-viz-status ${isManualDrifted ? 'bad' : ''}`}>
              <span className={`status-dot ${isManualDrifted ? 'bad' : ''}`} />
              {isManualDrifted ? 'Off target — needs manual rebalancing' : 'At target'}
            </div>
            <div className="range-earnings-row" style={{ marginTop: '0.375rem' }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 500,
                color: 'var(--muted)',
              }}>
                Fees earned
              </span>
              <span className="range-earnings-value">
                $0.00
              </span>
            </div>
            <div className="range-progress-bar">
              <div className="range-progress-fill dead" style={{ width: '0%' }} />
            </div>
          </div>
        </div>
      </MotionReveal>

      {/* Weighted pool — arbs auto-rebalance and pay fees */}
      <MotionReveal delay={0.15}>
        <div className="range-viz-panel good">
          <div className="range-viz-label good">Weighted Pool</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {assets.map((asset, i) => {
              const current = asset.target + weightedDrifts[i];

              return (
                <div key={asset.name}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '0.375rem',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 600,
                      color: 'var(--bright)',
                    }}>
                      {asset.name}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      fontVariantNumeric: 'tabular-nums',
                      color: 'var(--bloom-accent)',
                    }}>
                      {Math.round(current)}% <span style={{ opacity: 0.5 }}>/ {asset.target}%</span>
                    </span>
                  </div>
                  <div style={{
                    height: '8px',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute',
                      height: '100%',
                      width: `${asset.target}%`,
                      borderRight: '2px dashed rgba(255,255,255,0.15)',
                    }} />
                    <motion.div
                      animate={{ width: `${Math.max(0, current)}%` }}
                      transition={{ duration: 0.08, ease: 'linear' }}
                      style={{
                        height: '100%',
                        background: asset.color,
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="range-earnings" style={{ marginTop: '1.25rem' }}>
            <div className="range-viz-status good">
              <span className="status-dot good" />
              {isRebalancing
                ? 'Price moved — arbs rebalancing...'
                : 'On target — arbs paid fees to rebalance'}
            </div>
            <div className="range-earnings-row" style={{ marginTop: '0.375rem' }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 500,
                color: 'var(--muted)',
              }}>
                Swap fees earned
              </span>
              <span className="range-earnings-value">
                ${fees.toFixed(2)}
              </span>
            </div>
            <div className="range-progress-bar">
              <div
                className="range-progress-fill"
                style={{ width: `${Math.min(fees * 10, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </MotionReveal>
    </div>
  );
}
