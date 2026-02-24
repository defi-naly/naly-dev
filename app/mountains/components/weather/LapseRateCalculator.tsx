'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveSlider from '../InteractiveSlider';
import DangerMeter from '../DangerMeter';
import QuizBlock from '../QuizBlock';

interface LapseRateCalculatorProps {
  onComplete: () => void;
}

const DRY_ADIABATIC = 3.0; // degrees C per 1000ft
const MOIST_ADIABATIC = 1.5; // degrees C per 1000ft
const MAX_ALT = 20000; // feet
const SURFACE_TEMP = 25; // degrees C

const SVG_WIDTH = 380;
const SVG_HEIGHT = 420;
const MARGIN = { top: 30, right: 30, bottom: 50, left: 65 };
const PLOT_W = SVG_WIDTH - MARGIN.left - MARGIN.right;
const PLOT_H = SVG_HEIGHT - MARGIN.top - MARGIN.bottom;

// Temperature range for the graph
const TEMP_MIN = -15;
const TEMP_MAX = 35;

function tempToX(temp: number): number {
  return MARGIN.left + ((temp - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * PLOT_W;
}

function altToY(alt: number): number {
  return MARGIN.top + PLOT_H - (alt / MAX_ALT) * PLOT_H;
}

type StabilityClass = 'absolutely_stable' | 'conditionally_unstable' | 'absolutely_unstable';

export default function LapseRateCalculator({ onComplete }: LapseRateCalculatorProps) {
  const [phase, setPhase] = useState<'setup' | 'interact' | 'reveal'>('setup');
  const [envLapseRate, setEnvLapseRate] = useState(2.0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);

  // Determine stability
  const stability: StabilityClass = useMemo(() => {
    if (envLapseRate < MOIST_ADIABATIC) return 'absolutely_stable';
    if (envLapseRate > DRY_ADIABATIC) return 'absolutely_unstable';
    return 'conditionally_unstable';
  }, [envLapseRate]);

  const stabilityInfo = useMemo(() => {
    switch (stability) {
      case 'absolutely_stable':
        return {
          label: 'ABSOLUTELY STABLE',
          color: '#4ADE80',
          description: 'The environmental lapse rate is less than the moist adiabatic rate. Any displaced parcel (saturated or not) will be cooler than its surroundings and sink back to its original position. Convection is suppressed.',
          dangerValue: 10,
        };
      case 'conditionally_unstable':
        return {
          label: 'CONDITIONALLY UNSTABLE',
          color: '#F59E0B',
          description: 'The environmental lapse rate falls between the moist and dry adiabatic rates. Unsaturated parcels are stable, but if forced to rise and become saturated (reaching the LCL), they become warmer than their surroundings and continue rising. This is the most common atmospheric condition.',
          dangerValue: 55,
        };
      case 'absolutely_unstable':
        return {
          label: 'ABSOLUTELY UNSTABLE',
          color: '#CC4444',
          description: 'The environmental lapse rate exceeds the dry adiabatic rate. Any displaced parcel -- saturated or not -- will be warmer than its surroundings and accelerate upward. This creates vigorous convection and is the condition for thunderstorm development.',
          dangerValue: 90,
        };
    }
  }, [stability]);

  // Generate line points
  const generateLine = (rate: number) => {
    const points: string[] = [];
    for (let alt = 0; alt <= MAX_ALT; alt += 500) {
      const temp = SURFACE_TEMP - (alt / 1000) * rate;
      if (temp < TEMP_MIN) break;
      points.push(`${tempToX(temp)},${altToY(alt)}`);
    }
    return points.join(' ');
  };

  const envLine = generateLine(envLapseRate);
  const dryLine = generateLine(DRY_ADIABATIC);
  const moistLine = generateLine(MOIST_ADIABATIC);

  // Parcel position -- show at a sample altitude (5000ft) to illustrate behavior
  const parcelAlt = 5000;
  const envTempAtParcel = SURFACE_TEMP - (parcelAlt / 1000) * envLapseRate;
  const dryParcelTemp = SURFACE_TEMP - (parcelAlt / 1000) * DRY_ADIABATIC;

  const handleLapseRateChange = (val: number) => {
    setEnvLapseRate(val);
    if (!hasInteracted) setHasInteracted(true);
  };

  const handleQuizCorrect = () => {
    setQuizCorrect(true);
    onComplete();
  };

  // Temperature axis ticks
  const tempTicks = [-10, -5, 0, 5, 10, 15, 20, 25, 30];
  const altTicks = [0, 5000, 10000, 15000, 20000];

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <AnimatePresence mode="wait">
        {phase === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <p style={{ color: 'var(--mt-bright)', lineHeight: 1.7, marginBottom: '1rem' }}>
              Atmospheric stability determines whether rising air continues to rise or sinks back down.
              The key comparison is between the <strong>environmental lapse rate</strong> (how
              temperature actually changes with altitude) and the <strong>adiabatic lapse rates</strong> (how
              a rising air parcel cools).
            </p>
            <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Adjust the environmental lapse rate to see how it changes atmospheric stability.
              Three stability classes emerge from this comparison.
            </p>
            <button
              onClick={() => setPhase('interact')}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'transparent',
                border: '1px solid var(--mt-weather)',
                color: 'var(--mt-weather)',
                borderRadius: 8,
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-base, 1rem)',
                cursor: 'pointer',
              }}
            >
              Open Lapse Rate Graph
            </button>
          </motion.div>
        )}

        {(phase === 'interact' || phase === 'reveal') && (
          <motion.div
            key="interact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mt-module-split">
              <div>
                {/* SVG Graph */}
                <div style={{
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 8,
                  padding: '0.75rem',
                  overflow: 'hidden',
                }}>
              <svg
                viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                width="100%"
                style={{ display: 'block' }}
              >
                {/* Plot background */}
                <rect
                  x={MARGIN.left}
                  y={MARGIN.top}
                  width={PLOT_W}
                  height={PLOT_H}
                  fill="#0c1420"
                  rx={2}
                />

                {/* Stability zone shading */}
                {/* Fill area between moist and dry lines = conditionally unstable zone */}
                <defs>
                  <clipPath id="plotClip">
                    <rect x={MARGIN.left} y={MARGIN.top} width={PLOT_W} height={PLOT_H} />
                  </clipPath>
                </defs>

                <g clipPath="url(#plotClip)">
                  {/* Stable zone (left of moist line) */}
                  <polygon
                    points={`${tempToX(TEMP_MIN)},${altToY(0)} ${tempToX(SURFACE_TEMP)},${altToY(0)} ${moistLine.split(' ').reverse().join(' ')} ${tempToX(TEMP_MIN)},${altToY(MAX_ALT)}`}
                    fill="rgba(74, 222, 128, 0.03)"
                  />

                  {/* Grid lines - temperature */}
                  {tempTicks.map(t => (
                    <g key={`t-${t}`}>
                      <line
                        x1={tempToX(t)}
                        y1={MARGIN.top}
                        x2={tempToX(t)}
                        y2={MARGIN.top + PLOT_H}
                        stroke="var(--mt-border)"
                        strokeWidth={0.4}
                      />
                      <text
                        x={tempToX(t)}
                        y={MARGIN.top + PLOT_H + 16}
                        textAnchor="middle"
                        fill="var(--mt-muted)"
                        fontSize={9}
                        fontFamily="var(--font-mono)"
                      >
                        {t}\u00B0
                      </text>
                    </g>
                  ))}

                  {/* Grid lines - altitude */}
                  {altTicks.map(a => (
                    <g key={`a-${a}`}>
                      <line
                        x1={MARGIN.left}
                        y1={altToY(a)}
                        x2={MARGIN.left + PLOT_W}
                        y2={altToY(a)}
                        stroke="var(--mt-border)"
                        strokeWidth={0.4}
                      />
                      <text
                        x={MARGIN.left - 8}
                        y={altToY(a) + 3}
                        textAnchor="end"
                        fill="var(--mt-muted)"
                        fontSize={9}
                        fontFamily="var(--font-mono)"
                      >
                        {(a / 1000).toFixed(0)}k
                      </text>
                    </g>
                  ))}

                  {/* Dry Adiabatic line */}
                  <polyline
                    points={dryLine}
                    fill="none"
                    stroke="#6699CC"
                    strokeWidth={1.5}
                    strokeDasharray="6,3"
                    opacity={0.7}
                  />

                  {/* Moist Adiabatic line */}
                  <polyline
                    points={moistLine}
                    fill="none"
                    stroke="#88BBDD"
                    strokeWidth={1.5}
                    strokeDasharray="2,3"
                    opacity={0.7}
                  />

                  {/* Environmental lapse rate line */}
                  <motion.polyline
                    points={envLine}
                    fill="none"
                    stroke={stabilityInfo.color}
                    strokeWidth={2.5}
                    opacity={0.9}
                  />

                  {/* Parcel dot showing displacement behavior */}
                  <motion.g animate={{ x: 0 }} transition={{ type: 'spring', stiffness: 200 }}>
                    {/* Dry parcel position */}
                    <circle
                      cx={tempToX(dryParcelTemp)}
                      cy={altToY(parcelAlt)}
                      r={5}
                      fill="rgba(102, 153, 204, 0.4)"
                      stroke="#6699CC"
                      strokeWidth={1.5}
                    />
                    <text
                      x={tempToX(dryParcelTemp) - 8}
                      y={altToY(parcelAlt) - 10}
                      fill="#6699CC"
                      fontSize={8}
                      fontFamily="var(--font-mono)"
                      textAnchor="end"
                    >
                      Parcel
                    </text>

                    {/* Environmental temp at same altitude */}
                    <circle
                      cx={tempToX(envTempAtParcel)}
                      cy={altToY(parcelAlt)}
                      r={5}
                      fill={`${stabilityInfo.color}40`}
                      stroke={stabilityInfo.color}
                      strokeWidth={1.5}
                    />
                    <text
                      x={tempToX(envTempAtParcel) + 8}
                      y={altToY(parcelAlt) - 10}
                      fill={stabilityInfo.color}
                      fontSize={8}
                      fontFamily="var(--font-mono)"
                    >
                      Env
                    </text>

                    {/* Arrow showing parcel fate */}
                    {stability === 'absolutely_unstable' && (
                      <g>
                        <line
                          x1={tempToX(dryParcelTemp)}
                          y1={altToY(parcelAlt) - 8}
                          x2={tempToX(dryParcelTemp)}
                          y2={altToY(parcelAlt) - 25}
                          stroke="#CC4444"
                          strokeWidth={1.5}
                          markerEnd="url(#arrowUp)"
                        />
                        <text x={tempToX(dryParcelTemp) + 6} y={altToY(parcelAlt) - 18} fill="#CC4444" fontSize={7} fontFamily="var(--font-mono)">RISES</text>
                      </g>
                    )}
                    {stability === 'absolutely_stable' && (
                      <g>
                        <line
                          x1={tempToX(dryParcelTemp)}
                          y1={altToY(parcelAlt) + 8}
                          x2={tempToX(dryParcelTemp)}
                          y2={altToY(parcelAlt) + 25}
                          stroke="#4ADE80"
                          strokeWidth={1.5}
                          markerEnd="url(#arrowDown)"
                        />
                        <text x={tempToX(dryParcelTemp) + 6} y={altToY(parcelAlt) + 22} fill="#4ADE80" fontSize={7} fontFamily="var(--font-mono)">SINKS</text>
                      </g>
                    )}
                    {stability === 'conditionally_unstable' && (
                      <g>
                        <text x={tempToX(dryParcelTemp) + 6} y={altToY(parcelAlt) + 16} fill="#F59E0B" fontSize={7} fontFamily="var(--font-mono)">DEPENDS</text>
                      </g>
                    )}
                  </motion.g>
                </g>

                {/* Arrow markers */}
                <defs>
                  <marker id="arrowUp" markerWidth={6} markerHeight={5} refX={3} refY={5} orient="auto">
                    <path d="M0,5 L3,0 L6,5 Z" fill="#CC4444" />
                  </marker>
                  <marker id="arrowDown" markerWidth={6} markerHeight={5} refX={3} refY={0} orient="auto">
                    <path d="M0,0 L3,5 L6,0 Z" fill="#4ADE80" />
                  </marker>
                </defs>

                {/* Axis labels */}
                <text
                  x={MARGIN.left + PLOT_W / 2}
                  y={SVG_HEIGHT - 6}
                  textAnchor="middle"
                  fill="var(--mt-muted)"
                  fontSize={10}
                  fontFamily="var(--font-mono)"
                >
                  Temperature (\u00B0C)
                </text>
                <text
                  x={14}
                  y={MARGIN.top + PLOT_H / 2}
                  textAnchor="middle"
                  fill="var(--mt-muted)"
                  fontSize={10}
                  fontFamily="var(--font-mono)"
                  transform={`rotate(-90, 14, ${MARGIN.top + PLOT_H / 2})`}
                >
                  Altitude (ft)
                </text>

                {/* Legend */}
                <g transform={`translate(${MARGIN.left + 8}, ${MARGIN.top + 8})`}>
                  <rect width={120} height={52} fill="var(--mt-void)" rx={4} opacity={0.85} />
                  <line x1={8} y1={12} x2={28} y2={12} stroke="#6699CC" strokeWidth={1.5} strokeDasharray="6,3" />
                  <text x={34} y={15} fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">Dry Adiabatic</text>
                  <line x1={8} y1={26} x2={28} y2={26} stroke="#88BBDD" strokeWidth={1.5} strokeDasharray="2,3" />
                  <text x={34} y={29} fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">Moist Adiabatic</text>
                  <line x1={8} y1={40} x2={28} y2={40} stroke={stabilityInfo.color} strokeWidth={2.5} />
                  <text x={34} y={43} fill={stabilityInfo.color} fontSize={8} fontFamily="var(--font-mono)">Environmental</text>
                </g>
              </svg>
                </div>
              </div>
              <div>
                {/* Environmental lapse rate slider */}
            <div style={{ marginBottom: '1rem' }}>
              <InteractiveSlider
                label="Environmental Lapse Rate"
                min={0.5}
                max={4.0}
                step={0.1}
                value={envLapseRate}
                onChange={handleLapseRateChange}
                formatValue={(v) => `${v.toFixed(1)}\u00B0C / 1000ft`}
              />
            </div>

            {/* Stability indicator */}
            <motion.div
              key={stability}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                background: `${stabilityInfo.color}10`,
                border: `1px solid ${stabilityInfo.color}40`,
                borderRadius: 8,
                padding: '0.75rem 1rem',
                marginBottom: '1rem',
              }}
            >
              <div style={{
                color: stabilityInfo.color,
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm, 0.875rem)',
                fontWeight: 700,
                marginBottom: '0.5rem',
              }}>
                {stabilityInfo.label}
              </div>
              <p style={{
                color: 'var(--mt-muted)',
                fontSize: 'var(--text-sm, 0.875rem)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                {stabilityInfo.description}
              </p>
            </motion.div>

            {/* Danger meter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <DangerMeter
                value={stabilityInfo.dangerValue}
                label="Convective Instability"
              />
            </div>

            {/* Rate comparison */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '0.5rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{
                background: 'var(--mt-surface)',
                border: '1px solid var(--mt-border)',
                borderRadius: 6,
                padding: '0.5rem',
                textAlign: 'center',
              }}>
                <div style={{ color: '#88BBDD', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>MOIST</div>
                <div style={{ color: 'var(--mt-bright)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm, 0.875rem)', fontWeight: 700 }}>{MOIST_ADIABATIC}\u00B0C</div>
              </div>
              <div style={{
                background: 'var(--mt-surface)',
                border: `1px solid ${stabilityInfo.color}40`,
                borderRadius: 6,
                padding: '0.5rem',
                textAlign: 'center',
              }}>
                <div style={{ color: stabilityInfo.color, fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>ENV</div>
                <div style={{ color: stabilityInfo.color, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm, 0.875rem)', fontWeight: 700 }}>{envLapseRate.toFixed(1)}\u00B0C</div>
              </div>
              <div style={{
                background: 'var(--mt-surface)',
                border: '1px solid var(--mt-border)',
                borderRadius: 6,
                padding: '0.5rem',
                textAlign: 'center',
              }}>
                <div style={{ color: '#6699CC', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>DRY</div>
                <div style={{ color: 'var(--mt-bright)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm, 0.875rem)', fontWeight: 700 }}>{DRY_ADIABATIC}\u00B0C</div>
              </div>
            </div>

            {/* Quiz */}
            {hasInteracted && !quizCorrect && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <QuizBlock
                  question="What conditions create the most dangerous instability for thunderstorm formation?"
                  options={[
                    { text: 'When the environmental lapse rate is less than the moist adiabatic rate' },
                    { text: 'When the environmental lapse rate equals the dry adiabatic rate exactly' },
                    { text: 'When the environmental lapse rate exceeds the dry adiabatic rate -- the atmosphere is absolutely unstable', correct: true },
                    { text: 'When there is no difference between any of the lapse rates' },
                  ]}
                  explanation="When the environmental temperature drops faster than the dry adiabatic rate (>3 degrees C/1000ft), any displaced air parcel will be warmer and less dense than its surroundings. It accelerates upward uncontrollably, driving powerful convection that can produce thunderstorms, severe turbulence, and dangerous downdrafts."
                  onCorrect={handleQuizCorrect}
                />
              </motion.div>
            )}

            {quizCorrect && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(123, 167, 204, 0.1)',
                  border: '1px solid var(--mt-weather)',
                  borderRadius: 8,
                  padding: '1rem',
                  textAlign: 'center',
                  color: 'var(--mt-weather)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm, 0.875rem)',
                }}
              >
                Module complete. You understand lapse rates and atmospheric stability.
              </motion.div>
            )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
