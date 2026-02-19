'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import MotionReveal from './MotionReveal';

interface Asset {
  name: string;
  target: number;
  color: string;
  freq: number;
  amp: number;
  phase: number;
}

const assets: Asset[] = [
  { name: 'wETH', target: 60, color: 'var(--bloom-accent)', freq: 0.4, amp: 10, phase: 0 },
  { name: 'USDC', target: 25, color: 'var(--navy)', freq: 0.3, amp: 7, phase: 2.1 },
  { name: 'wBTC', target: 15, color: 'var(--success)', freq: 0.5, amp: 5, phase: 4.2 },
];

// Damping factor: weighted pool arbs keep drift small
const ARB_DAMPING = 0.15;
// Threshold (in %) to consider "off target"
const DRIFT_THRESHOLD = 3;

function computeDrifts(elapsed: number): number[] {
  // Two sine waves at different frequencies for organic movement
  const raw = assets.map((a) =>
    a.amp * Math.sin(a.freq * elapsed + a.phase) +
    a.amp * 0.4 * Math.sin(a.freq * 2.3 * elapsed + a.phase + 1.5),
  );
  // Normalize to zero-sum so weights always total 100%
  const avg = raw.reduce((s, d) => s + d, 0) / raw.length;
  return raw.map((d) => d - avg);
}

export default function WeightVisualizer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [drifts, setDrifts] = useState([0, 0, 0]);
  const startTimeRef = useRef(0);
  const lastUpdateRef = useRef(0);
  const rafRef = useRef<number>(0);

  const animate = useCallback((timestamp: number) => {
    if (startTimeRef.current === 0) startTimeRef.current = timestamp;

    // Throttle state updates to ~15 fps (every 66ms)
    if (timestamp - lastUpdateRef.current < 66) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }
    lastUpdateRef.current = timestamp;

    const elapsed = (timestamp - startTimeRef.current) / 1000;
    setDrifts(computeDrifts(elapsed));
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    startTimeRef.current = 0;
    lastUpdateRef.current = 0;
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, animate]);

  const maxManualDrift = Math.max(...drifts.map(Math.abs));
  const isManualDrifted = maxManualDrift > DRIFT_THRESHOLD;

  const dampedDrifts = drifts.map((d) => d * ARB_DAMPING);
  const maxWeightedDrift = Math.max(...dampedDrifts.map(Math.abs));
  const isWeightedDrifted = maxWeightedDrift > 0.5;

  return (
    <div ref={ref} className="range-viz">
      {/* Manual portfolio — drifts with no correction */}
      <MotionReveal delay={0}>
        <div className="range-viz-panel bad">
          <div className="range-viz-label bad">Manual Portfolio</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {assets.map((asset, i) => {
              const current = asset.target + drifts[i];
              const isDrifted = Math.abs(drifts[i]) > DRIFT_THRESHOLD;

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
                      animate={{ width: `${current}%` }}
                      transition={{ duration: 0.1, ease: 'linear' }}
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
              <div className={`range-viz-status ${isManualDrifted ? 'bad' : ''}`}>
                <span className={`status-dot ${isManualDrifted ? 'bad' : ''}`} />
                {isManualDrifted ? 'Off target — needs rebalancing' : 'At target'}
              </div>
            </div>
          </div>
        </div>
      </MotionReveal>

      {/* Weighted pool — arbs auto-rebalance */}
      <MotionReveal delay={0.15}>
        <div className="range-viz-panel good">
          <div className="range-viz-label good">Weighted Pool</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {assets.map((asset, i) => {
              const current = asset.target + dampedDrifts[i];

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
                      animate={{ width: `${current}%` }}
                      transition={{ duration: 0.1, ease: 'linear' }}
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
                {isWeightedDrifted
                  ? 'Price moved — arbs rebalancing...'
                  : 'On target — arbs paid fees to rebalance'}
              </div>
            </div>
          </div>
        </div>
      </MotionReveal>
    </div>
  );
}
