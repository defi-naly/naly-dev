'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import MotionReveal from './MotionReveal';

const TICK_MS = 3000;
const TICK_COUNT = 4;

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

// Simulated drifts per tick — weight deviations from target
const driftSequence = [
  [0, 0, 0],      // tick 0: at target
  [8, -5, -3],    // tick 1: ETH pumps, drift away
  [12, -8, -4],   // tick 2: drift worsens
  [0, 0, 0],      // tick 3: arb rebalances back
];

export default function WeightVisualizer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(interval);
  }, [isInView]);

  const driftIdx = tick % TICK_COUNT;
  const drifts = driftSequence[driftIdx];
  const isRebalanced = driftIdx === 0 || driftIdx === 3;

  return (
    <div ref={ref} className="range-viz">
      {/* Manual portfolio — drifts and stays drifted */}
      <MotionReveal delay={0}>
        <div className="range-viz-panel bad">
          <div className="range-viz-label bad">Manual Portfolio</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {assets.map((asset, i) => {
              // Manual never rebalances — accumulates drift
              const manualDrift = driftIdx >= 1 ? driftSequence[Math.min(driftIdx, 2)][i] : 0;
              const current = asset.target + manualDrift;
              const isDrifted = Math.abs(manualDrift) > 1;

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
                      {current}% <span style={{ opacity: 0.5 }}>/ {asset.target}%</span>
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
                      animate={{ width: `${current}%` }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
            <div className="range-earnings-row">
              <div className={`range-viz-status ${driftIdx >= 1 ? 'bad' : ''}`}>
                <span className={`status-dot ${driftIdx >= 1 ? 'bad' : ''}`} />
                {driftIdx >= 1 ? 'Off target — needs rebalancing' : 'At target'}
              </div>
            </div>
          </div>
        </div>
      </MotionReveal>

      {/* Weighted pool — auto-rebalances */}
      <MotionReveal delay={0.15}>
        <div className="range-viz-panel good">
          <div className="range-viz-label good">Weighted Pool</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {assets.map((asset, i) => {
              const current = asset.target + drifts[i];

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
                      color: isRebalanced ? 'var(--bloom-accent)' : 'var(--muted)',
                    }}>
                      {current}% <span style={{ opacity: 0.5 }}>/ {asset.target}%</span>
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
                      animate={{ width: `${current}%` }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
            <div className="range-earnings-row">
              <div className="range-viz-status good">
                <span className="status-dot good" />
                {isRebalanced
                  ? 'On target — arbs paid fees to rebalance'
                  : 'Price moved — arbs rebalancing...'}
              </div>
            </div>
          </div>
        </div>
      </MotionReveal>
    </div>
  );
}
