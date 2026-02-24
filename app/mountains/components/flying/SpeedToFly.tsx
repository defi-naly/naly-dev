'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveSlider from '../InteractiveSlider';
import QuizBlock from '../QuizBlock';

interface SpeedToFlyProps {
  onComplete: () => void;
}

// Paraglider polar curve: speed (km/h) -> sink rate (m/s)
// Typical intermediate paraglider polar
function polarSinkRate(speed: number): number {
  // Quadratic polar: sink = a*v^2 + b*v + c
  // Min sink ~1.1 m/s at ~36 km/h, trim ~38 km/h
  const a = 0.0012;
  const b = -0.088;
  const c = 2.7;
  return a * speed * speed + b * speed + c;
}

// Speed range for the polar
const MIN_SPEED = 24; // km/h
const MAX_SPEED = 56; // km/h (full speed bar)
const POLAR_POINTS = 60;

const SVG_WIDTH = 500;
const SVG_HEIGHT = 360;
const MARGIN = { top: 30, right: 30, bottom: 50, left: 60 };
const PLOT_W = SVG_WIDTH - MARGIN.left - MARGIN.right;
const PLOT_H = SVG_HEIGHT - MARGIN.top - MARGIN.bottom;

// Map speed to x, sink to y
function speedToX(speed: number): number {
  return MARGIN.left + ((speed - MIN_SPEED) / (MAX_SPEED - MIN_SPEED)) * PLOT_W;
}
function sinkToY(sink: number): number {
  // Sink is positive downward, so larger sink = lower on chart
  const maxSink = 4.5;
  return MARGIN.top + (sink / maxSink) * PLOT_H;
}

export default function SpeedToFly({ onComplete }: SpeedToFlyProps) {
  const [thermalStrength, setThermalStrength] = useState(2.0);
  const [headwind, setHeadwind] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  // Generate polar curve points
  const polarPoints = useMemo(() => {
    const points: { speed: number; sink: number }[] = [];
    for (let i = 0; i <= POLAR_POINTS; i++) {
      const speed = MIN_SPEED + (i / POLAR_POINTS) * (MAX_SPEED - MIN_SPEED);
      points.push({ speed, sink: polarSinkRate(speed) });
    }
    return points;
  }, []);

  // Polar path string
  const polarPath = useMemo(() => {
    return polarPoints
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${speedToX(p.speed).toFixed(1)} ${sinkToY(p.sink).toFixed(1)}`)
      .join(' ');
  }, [polarPoints]);

  // McCready tangent calculation
  // The tangent from (0, -thermalStrength) on the vertical axis touching the polar curve
  // With headwind, we shift the origin right by headwind amount
  const optimalSpeed = useMemo(() => {
    // Effective origin for tangent: groundspeed = airspeed - headwind
    // We want to maximize (climb + ground_covered / time_in_glide)
    // Tangent from point (headwind, -thermalStrength) in speed/sink space
    let bestSpeed = MIN_SPEED;
    let bestSlope = -Infinity;

    for (let i = 0; i <= POLAR_POINTS * 2; i++) {
      const speed = MIN_SPEED + (i / (POLAR_POINTS * 2)) * (MAX_SPEED - MIN_SPEED);
      const sink = polarSinkRate(speed);
      const groundSpeed = speed - headwind;
      if (groundSpeed <= 0) continue;
      // Slope from origin point to polar curve point
      // Origin in speed/sink: (headwind, -thermalStrength)
      // Polar point: (speed, sink)
      // We want to minimize sink per unit ground speed, accounting for thermal
      const slope = (sink + thermalStrength) / (speed - headwind);
      // We want the tangent with minimum slope (flattest line touching polar from above)
      if (i === 0 || slope < bestSlope) {
        bestSlope = slope;
        bestSpeed = speed;
      }
    }
    return bestSpeed;
  }, [thermalStrength, headwind]);

  const optimalSink = polarSinkRate(optimalSpeed);

  // Min sink speed (for comparison)
  const minSinkSpeed = useMemo(() => {
    let best = MIN_SPEED;
    let bestSink = Infinity;
    for (let i = 0; i <= POLAR_POINTS * 2; i++) {
      const speed = MIN_SPEED + (i / (POLAR_POINTS * 2)) * (MAX_SPEED - MIN_SPEED);
      const sink = polarSinkRate(speed);
      if (sink < bestSink) {
        bestSink = sink;
        best = speed;
      }
    }
    return best;
  }, []);

  // Tangent line points (for visualization)
  const tangentOriginX = speedToX(headwind);
  const tangentOriginY = sinkToY(-thermalStrength);
  const tangentEndX = speedToX(optimalSpeed);
  const tangentEndY = sinkToY(optimalSink);

  // Flight profile: compare flying at min sink vs optimal
  const profileDistance = 5; // km
  const timeAtMinSink = profileDistance / ((minSinkSpeed - headwind) / 3.6); // seconds
  const timeAtOptimal = profileDistance / ((optimalSpeed - headwind) / 3.6); // seconds
  const altLostMinSink = polarSinkRate(minSinkSpeed) * timeAtMinSink;
  const altLostOptimal = optimalSink * timeAtOptimal;
  const timeTotal = useMemo(() => {
    // Total time including thermal climbs to recover altitude
    if (thermalStrength <= 0) return { minSink: Infinity, optimal: Infinity };
    const climbTimeMinSink = altLostMinSink / thermalStrength;
    const climbTimeOptimal = altLostOptimal / thermalStrength;
    return {
      minSink: timeAtMinSink + climbTimeMinSink,
      optimal: timeAtOptimal + climbTimeOptimal,
    };
  }, [altLostMinSink, altLostOptimal, timeAtMinSink, timeAtOptimal, thermalStrength]);

  const handleSliderChange = useCallback((setter: (v: number) => void) => (value: number) => {
    setter(value);
    setInteractionCount(prev => {
      const next = prev + 1;
      if (next >= 6 && !hasInteracted) {
        setHasInteracted(true);
        setTimeout(() => setShowQuiz(true), 600);
      }
      return next;
    });
  }, [hasInteracted]);

  // Glide ratio display
  const glideRatioOptimal = (optimalSpeed - headwind) / 3.6 / optimalSink;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.95rem',
        lineHeight: 1.7,
        color: 'var(--mt-muted)',
      }}>
        The McCready theory answers a critical question: how fast should you fly between thermals?
        The answer depends on how strong you expect the next thermal to be. Stronger thermals ahead
        mean you should fly faster now -- trading altitude for speed.
      </div>

      <div className="mt-module-split">
        <div>
          {/* McCready Polar Diagram */}
          <div style={{
            background: 'var(--mt-surface)',
            border: '1px solid var(--mt-border)',
            borderRadius: 8,
            padding: '0.75rem',
            overflow: 'hidden',
          }}>
            <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} style={{ width: '100%', display: 'block' }}>
              <defs>
                <linearGradient id="stf-polar-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E8A87C" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#E8A87C" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map(sink => (
                <g key={`grid-h-${sink}`}>
                  <line
                    x1={MARGIN.left} y1={sinkToY(sink)}
                    x2={MARGIN.left + PLOT_W} y2={sinkToY(sink)}
                    stroke="var(--mt-border)" strokeWidth={0.5} strokeDasharray="4,4"
                  />
                  <text
                    x={MARGIN.left - 8} y={sinkToY(sink) + 4}
                    textAnchor="end" fill="var(--mt-muted)" fontSize={9} fontFamily="var(--font-mono)"
                  >
                    {sink.toFixed(0)}
                  </text>
                </g>
              ))}
              {[25, 30, 35, 40, 45, 50, 55].map(speed => (
                <g key={`grid-v-${speed}`}>
                  <line
                    x1={speedToX(speed)} y1={MARGIN.top}
                    x2={speedToX(speed)} y2={MARGIN.top + PLOT_H}
                    stroke="var(--mt-border)" strokeWidth={0.5} strokeDasharray="4,4"
                  />
                  <text
                    x={speedToX(speed)} y={MARGIN.top + PLOT_H + 16}
                    textAnchor="middle" fill="var(--mt-muted)" fontSize={9} fontFamily="var(--font-mono)"
                  >
                    {speed}
                  </text>
                </g>
              ))}

              {/* Axis labels */}
              <text
                x={MARGIN.left + PLOT_W / 2} y={MARGIN.top + PLOT_H + 38}
                textAnchor="middle" fill="var(--mt-muted)" fontSize={10} fontFamily="var(--font-mono)"
              >
                Airspeed (km/h)
              </text>
              <text
                x={14} y={MARGIN.top + PLOT_H / 2}
                textAnchor="middle" fill="var(--mt-muted)" fontSize={10} fontFamily="var(--font-mono)"
                transform={`rotate(-90, 14, ${MARGIN.top + PLOT_H / 2})`}
              >
                Sink rate (m/s)
              </text>

              {/* Polar curve fill */}
              <path
                d={`${polarPath} L ${speedToX(MAX_SPEED).toFixed(1)} ${sinkToY(0).toFixed(1)} L ${speedToX(MIN_SPEED).toFixed(1)} ${sinkToY(0).toFixed(1)} Z`}
                fill="url(#stf-polar-grad)"
              />

              {/* Polar curve */}
              <path
                d={polarPath}
                fill="none"
                stroke="var(--mt-flying)"
                strokeWidth={2.5}
              />

              {/* Thermal strength marker on Y axis */}
              <motion.g animate={{ y: 0 }} transition={{ duration: 0.2 }}>
                <line
                  x1={MARGIN.left - 4} y1={sinkToY(-thermalStrength)}
                  x2={MARGIN.left + 4} y2={sinkToY(-thermalStrength)}
                  stroke="#4ADE80" strokeWidth={2}
                />
                <text
                  x={MARGIN.left - 8} y={sinkToY(-thermalStrength) + 4}
                  textAnchor="end" fill="#4ADE80" fontSize={9} fontFamily="var(--font-mono)" fontWeight={700}
                >
                  +{thermalStrength.toFixed(1)}
                </text>
              </motion.g>

              {/* Tangent line */}
              <motion.line
                x1={tangentOriginX}
                y1={tangentOriginY}
                x2={tangentEndX}
                y2={tangentEndY}
                stroke="#4ADE80"
                strokeWidth={1.5}
                strokeDasharray="6,3"
                animate={{
                  x1: tangentOriginX,
                  y1: tangentOriginY,
                  x2: tangentEndX,
                  y2: tangentEndY,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Extended tangent line beyond polar */}
              <motion.line
                x1={tangentEndX}
                y1={tangentEndY}
                x2={tangentEndX + 60}
                y2={tangentEndY + (tangentEndY - tangentOriginY) / (tangentEndX - tangentOriginX) * 60}
                stroke="#4ADE80"
                strokeWidth={0.8}
                strokeDasharray="3,5"
                opacity={0.4}
                animate={{
                  x1: tangentEndX,
                  y1: tangentEndY,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Optimal speed point on polar */}
              <motion.circle
                cx={tangentEndX}
                cy={tangentEndY}
                r={6}
                fill="#4ADE80"
                stroke="var(--mt-void)"
                strokeWidth={2}
                animate={{ cx: tangentEndX, cy: tangentEndY }}
                transition={{ duration: 0.3 }}
              />

              {/* Min sink point */}
              <circle
                cx={speedToX(minSinkSpeed)}
                cy={sinkToY(polarSinkRate(minSinkSpeed))}
                r={4}
                fill="none"
                stroke="var(--mt-muted)"
                strokeWidth={1.5}
                strokeDasharray="2,2"
              />
              <text
                x={speedToX(minSinkSpeed)} y={sinkToY(polarSinkRate(minSinkSpeed)) - 10}
                textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)"
              >
                MIN SINK
              </text>

              {/* Optimal speed label */}
              <motion.g
                animate={{ x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <rect
                  x={tangentEndX - 32} y={tangentEndY - 28}
                  width={64} height={18} rx={3}
                  fill="var(--mt-void)" stroke="#4ADE80" strokeWidth={0.8}
                />
                <text
                  x={tangentEndX} y={tangentEndY - 16}
                  textAnchor="middle" fill="#4ADE80" fontSize={9} fontFamily="var(--font-mono)" fontWeight={700}
                >
                  {optimalSpeed.toFixed(0)} km/h
                </text>
              </motion.g>

              {/* Headwind offset marker */}
              {headwind > 0 && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <line
                    x1={speedToX(headwind)} y1={MARGIN.top + PLOT_H - 5}
                    x2={speedToX(headwind)} y2={MARGIN.top + PLOT_H + 5}
                    stroke="#EF4444" strokeWidth={2}
                  />
                  <text
                    x={speedToX(headwind)} y={MARGIN.top + PLOT_H + 28}
                    textAnchor="middle" fill="#EF4444" fontSize={8} fontFamily="var(--font-mono)"
                  >
                    HW {headwind}
                  </text>
                </motion.g>
              )}

              {/* Title */}
              <text
                x={MARGIN.left + PLOT_W / 2} y={18}
                textAnchor="middle" fill="var(--mt-bright)" fontSize={12} fontFamily="var(--font-display)" fontWeight={700}
              >
                McCREADY SPEED-TO-FLY
              </text>
            </svg>
          </div>
        </div>
        <div>
          {/* Sliders */}
          <InteractiveSlider
            label="Expected Next Thermal"
            min={0}
            max={4}
            step={0.1}
            value={thermalStrength}
            onChange={handleSliderChange(setThermalStrength)}
            unit=" m/s"
          />
          <div style={{ marginTop: '1.5rem' }}>
            <InteractiveSlider
              label="Headwind"
              min={0}
              max={30}
              step={1}
              value={headwind}
              onChange={handleSliderChange(setHeadwind)}
              unit=" km/h"
            />
          </div>

          {/* Readouts */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '0.75rem',
            marginTop: '1.5rem',
          }}>
            {[
              { label: 'Optimal Speed', value: `${optimalSpeed.toFixed(0)} km/h`, color: '#4ADE80' },
              { label: 'Sink at Speed', value: `${optimalSink.toFixed(1)} m/s`, color: 'var(--mt-flying)' },
              { label: 'Glide Ratio', value: headwind >= optimalSpeed ? 'N/A' : `${glideRatioOptimal.toFixed(1)}:1`, color: 'var(--mt-bright)' },
              { label: 'Ground Speed', value: `${Math.max(0, optimalSpeed - headwind).toFixed(0)} km/h`, color: headwind > 0 ? '#EF4444' : 'var(--mt-bright)' },
            ].map(item => (
              <div key={item.label} style={{
                background: 'var(--mt-surface)',
                border: '1px solid var(--mt-border)',
                borderRadius: 6,
                padding: '0.75rem',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--mt-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  marginBottom: '0.25rem',
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: item.color,
                }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Flight profile comparison */}
          <div style={{
            background: 'var(--mt-surface)',
            border: '1px solid var(--mt-border)',
            borderRadius: 8,
            padding: '1rem',
            marginTop: '1.5rem',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--mt-muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              marginBottom: '0.75rem',
            }}>
              {profileDistance} km Glide Comparison
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--mt-muted)', marginBottom: '0.25rem' }}>
                  At min sink ({minSinkSpeed.toFixed(0)} km/h)
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--mt-bright)' }}>
                  Alt lost: {altLostMinSink.toFixed(0)}m
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--mt-muted)' }}>
                  Total time: {isFinite(timeTotal.minSink) ? `${(timeTotal.minSink / 60).toFixed(1)} min` : 'N/A'}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#4ADE80', marginBottom: '0.25rem' }}>
                  At optimal ({optimalSpeed.toFixed(0)} km/h)
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#4ADE80' }}>
                  Alt lost: {altLostOptimal.toFixed(0)}m
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#4ADE80' }}>
                  Total time: {isFinite(timeTotal.optimal) ? `${(timeTotal.optimal / 60).toFixed(1)} min` : 'N/A'}
                </div>
              </div>
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'var(--mt-muted)',
              marginTop: '0.75rem',
              lineHeight: 1.5,
              borderTop: '1px solid var(--mt-border)',
              paddingTop: '0.75rem',
            }}>
              Key insight: <span style={{ color: 'var(--mt-bright)' }}>fly fast in sink, slow in lift</span>.
              You lose more altitude at higher speed, but you spend less time in sinking air.
              When strong thermals await, the time saved more than compensates for the extra altitude lost.
            </div>
          </div>

          {/* Quiz */}
          <AnimatePresence>
            {showQuiz && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ marginTop: '1.5rem' }}
              >
                <QuizBlock
                  question="If you expect your next thermal to be 3 m/s, should you fly faster or slower between thermals compared to expecting 1 m/s?"
                  options={[
                    { text: 'Slower -- conserve altitude for the weaker thermal' },
                    { text: 'Faster -- strong thermals ahead mean you can afford to trade altitude for speed', correct: true },
                    { text: 'The same speed -- thermal strength does not affect inter-thermal speed' },
                    { text: 'It depends only on wind, not thermal strength' },
                  ]}
                  explanation="When expecting strong thermals ahead, you should fly faster between thermals. The McCready theory shows that strong thermals make the climb phase so efficient that it pays to sacrifice altitude (by flying fast through sink) to minimize time in non-lifting air. The tangent from a higher thermal value touches the polar curve at a higher speed."
                  onCorrect={onComplete}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
