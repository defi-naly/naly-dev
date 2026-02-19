'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import MotionReveal from './MotionReveal';

const BAR_COUNT = 20;
const TICK_MS = 2500;

// Price path: starts in-range (~$1.05), sweeps up to $1.50, back down to $0.80, loops
const PRICE_PATH = [9, 12, 15, 17, 15, 12, 9, 6, 3, 6];
const TICK_COUNT = PRICE_PATH.length;

// Fee rate per second when in range
const FEE_RATE = 0.32;

function generateBars(
  priceIndex: number,
  rangeStart: number,
  rangeEnd: number,
) {
  return Array.from({ length: BAR_COUNT }, (_, i) => {
    const inRange = i >= rangeStart && i <= rangeEnd;
    const distFromCenter = Math.abs(i - (rangeStart + rangeEnd) / 2);
    const rangeWidth = rangeEnd - rangeStart;
    const normalizedDist = rangeWidth > 0 ? distFromCenter / (rangeWidth / 2) : 1;

    // Bell-curve-ish distribution centered on range midpoint
    const height = inRange
      ? 30 + (1 - normalizedDist * normalizedDist) * 60
      : 6 + Math.random() * 8;

    return { height: Math.min(height, 92), inRange };
  });
}

export default function RangeVisualizer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [tick, setTick] = useState(0);

  // Fee accumulators
  const staticFeesRef = useRef(0);
  const dynamicFeesRef = useRef(0);
  const [staticFees, setStaticFees] = useState(0);
  const [dynamicFees, setDynamicFees] = useState(0);
  const lastFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Track whether static is in range
  const staticRange = { start: 8, end: 10 };
  const priceIdx = PRICE_PATH[tick % TICK_COUNT];
  const staticInRange = priceIdx >= staticRange.start && priceIdx <= staticRange.end;
  const staticInRangeRef = useRef(staticInRange);
  staticInRangeRef.current = staticInRange;

  // reCLAMMs: range follows price
  const dynamicPrice = priceIdx;
  const dynamicRange = {
    start: Math.max(0, dynamicPrice - 4),
    end: Math.min(BAR_COUNT - 1, dynamicPrice + 3),
  };

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(interval);
  }, [isInView]);

  // Reset fees on loop restart
  const prevTickMod = useRef(0);
  useEffect(() => {
    const mod = tick % TICK_COUNT;
    if (mod < prevTickMod.current) {
      // Loop restarted
      staticFeesRef.current = 0;
      dynamicFeesRef.current = 0;
      setStaticFees(0);
      setDynamicFees(0);
    }
    prevTickMod.current = mod;
  }, [tick]);

  // rAF-based fee counter
  const animateFees = useCallback((timestamp: number) => {
    if (lastFrameRef.current === 0) {
      lastFrameRef.current = timestamp;
    }
    const dt = (timestamp - lastFrameRef.current) / 1000;
    lastFrameRef.current = timestamp;

    // Dynamic (reCLAMMs) always earns
    dynamicFeesRef.current += FEE_RATE * dt;
    setDynamicFees(dynamicFeesRef.current);

    // Static only earns when in range
    if (staticInRangeRef.current) {
      staticFeesRef.current += FEE_RATE * dt;
      setStaticFees(staticFeesRef.current);
    }

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

  const staticBars = generateBars(priceIdx, staticRange.start, staticRange.end);
  const dynamicBars = generateBars(dynamicPrice, dynamicRange.start, dynamicRange.end);

  // Position helpers (as percentages of chart width)
  const needleLeft = (idx: number) => `${(idx / (BAR_COUNT - 1)) * 100}%`;
  const bandLeft = (start: number) => `${(start / BAR_COUNT) * 100}%`;
  const bandWidth = (start: number, end: number) =>
    `${((end - start + 1) / BAR_COUNT) * 100}%`;

  // Progress bar fill (as % of 15s loop)
  const maxFees = FEE_RATE * (TICK_COUNT * TICK_MS) / 1000;

  return (
    <div ref={ref} className="range-viz">
      {/* Traditional CL */}
      <MotionReveal delay={0}>
        <div className="range-viz-panel bad">
          <div className="range-viz-label bad">Traditional CL</div>
          <div className="range-viz-chart">
            {/* Range band — fixed position */}
            <div
              className={`range-band static ${staticInRange ? '' : 'out'}`}
              style={{
                left: bandLeft(staticRange.start),
                width: bandWidth(staticRange.start, staticRange.end),
              }}
            />

            {/* Liquidity bars */}
            {staticBars.map((bar, i) => (
              <motion.div
                key={i}
                className={`range-bar ${bar.inRange ? 'in-range' : 'idle'} ${bar.inRange && !staticInRange ? 'dimmed' : ''}`}
                animate={{ height: `${bar.height}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}

            {/* Price needle */}
            <motion.div
              className={`range-price-needle ${staticInRange ? '' : 'out'}`}
              animate={{ left: needleLeft(priceIdx) }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Status + earnings */}
          <div className="range-earnings">
            <div className={`range-viz-status ${staticInRange ? 'good' : 'bad'}`}>
              <span className={`status-dot ${staticInRange ? 'good' : 'bad'}`} />
              {staticInRange ? 'In Range' : 'Out of Range — No Swap Fees Earned'}
            </div>
            <span className="range-earnings-value">
              ${staticFees.toFixed(2)}
            </span>
            <div className="range-progress-bar">
              <div
                className={`range-progress-fill ${staticInRange ? '' : 'dead'}`}
                style={{ width: `${Math.min((staticFees / maxFees) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </MotionReveal>

      {/* reCLAMMs */}
      <MotionReveal delay={0.15}>
        <div className="range-viz-panel good">
          <div className="range-viz-label good">reCLAMMs</div>
          <div className="range-viz-chart">
            {/* Range band — follows price */}
            <motion.div
              className="range-band dynamic"
              animate={{
                left: bandLeft(dynamicRange.start),
                width: bandWidth(dynamicRange.start, dynamicRange.end),
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Liquidity bars */}
            {dynamicBars.map((bar, i) => (
              <motion.div
                key={i}
                className={`range-bar ${bar.inRange ? 'in-range' : 'idle'}`}
                animate={{ height: `${bar.height}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}

            {/* Price needle */}
            <motion.div
              className="range-price-needle good"
              animate={{ left: needleLeft(dynamicPrice) }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Status + earnings */}
          <div className="range-earnings">
            <div className="range-viz-status good">
              <span className="status-dot good" />
              Always In Range — Always Earning
            </div>
            <span className="range-earnings-value">
              ${dynamicFees.toFixed(2)}
            </span>
            <div className="range-progress-bar">
              <div
                className="range-progress-fill"
                style={{ width: `${Math.min((dynamicFees / maxFees) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </MotionReveal>
    </div>
  );
}
