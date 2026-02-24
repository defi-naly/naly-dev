'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveSlider from '../InteractiveSlider';
import QuizBlock from '../QuizBlock';

interface AtmosphericLayerExplorerProps {
  onComplete: () => void;
}

const DRY_ADIABATIC_RATE = 3; // degrees C per 1000ft
const MOIST_ADIABATIC_RATE = 1.5; // degrees C per 1000ft
const MAX_ALT = 40000;
const SVG_WIDTH = 360;
const SVG_HEIGHT = 500;
const MARGIN = { top: 30, right: 20, bottom: 40, left: 60 };
const PLOT_W = SVG_WIDTH - MARGIN.left - MARGIN.right;
const PLOT_H = SVG_HEIGHT - MARGIN.top - MARGIN.bottom;

function altToY(alt: number): number {
  return MARGIN.top + PLOT_H - (alt / MAX_ALT) * PLOT_H;
}

export default function AtmosphericLayerExplorer({ onComplete }: AtmosphericLayerExplorerProps) {
  const [phase, setPhase] = useState<'setup' | 'interact' | 'reveal'>('setup');
  const [surfaceTemp, setSurfaceTemp] = useState(25);
  const [dewPoint, setDewPoint] = useState(12);
  const [parcelAlt, setParcelAlt] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);

  // Calculate the Lifted Condensation Level (LCL)
  // LCL altitude in feet: difference between temp and dew point / dry rate * 1000
  const lclAlt = useMemo(() => {
    const diff = surfaceTemp - dewPoint;
    if (diff <= 0) return 0;
    return (diff / DRY_ADIABATIC_RATE) * 1000;
  }, [surfaceTemp, dewPoint]);

  // Calculate parcel temperature at current altitude
  const parcelTemp = useMemo(() => {
    if (parcelAlt <= lclAlt) {
      return surfaceTemp - (parcelAlt / 1000) * DRY_ADIABATIC_RATE;
    } else {
      const tempAtLcl = surfaceTemp - (lclAlt / 1000) * DRY_ADIABATIC_RATE;
      const altAboveLcl = parcelAlt - lclAlt;
      return tempAtLcl - (altAboveLcl / 1000) * MOIST_ADIABATIC_RATE;
    }
  }, [surfaceTemp, parcelAlt, lclAlt]);

  const isAboveLcl = parcelAlt >= lclAlt && lclAlt > 0;

  const handleParcelChange = (val: number) => {
    setParcelAlt(val);
    if (!hasInteracted && val > 5000) {
      setHasInteracted(true);
    }
  };

  const handleStartExploring = () => {
    setPhase('interact');
  };

  const handleQuizCorrect = () => {
    setQuizCorrect(true);
    onComplete();
  };

  // Altitude tick marks
  const altTicks = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000];

  // Parcel Y position
  const parcelY = altToY(Math.min(parcelAlt, MAX_ALT));
  const lclY = altToY(Math.min(lclAlt, MAX_ALT));

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
              When air rises, it cools. The rate of cooling depends on whether the air is
              saturated (cloudy) or unsaturated (clear). The <strong>Lifted Condensation Level</strong> (LCL)
              is the altitude where rising air cools enough to reach its dew point -- where clouds begin to form.
            </p>
            <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Set the surface temperature and dew point, then drag the air parcel upward
              to watch it cool and condense.
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <InteractiveSlider
                label="Surface Temperature"
                min={15}
                max={35}
                value={surfaceTemp}
                onChange={setSurfaceTemp}
                unit="C"
                formatValue={(v) => `${v}\u00B0C`}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <InteractiveSlider
                label="Dew Point"
                min={5}
                max={25}
                value={dewPoint}
                onChange={(v) => setDewPoint(Math.min(v, surfaceTemp - 1))}
                unit="C"
                formatValue={(v) => `${v}\u00B0C`}
              />
            </div>

            <div style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '0.75rem 1rem',
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-sm, 0.875rem)',
              color: 'var(--mt-weather)',
            }}>
              Predicted LCL: {lclAlt.toFixed(0)} ft AGL
            </div>

            <button
              onClick={handleStartExploring}
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
              Launch Air Parcel
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
                {/* SVG Visualization */}
                <div style={{
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 8,
                  padding: '1rem',
                  overflow: 'hidden',
                }}>
              <svg
                viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                width="100%"
                style={{ display: 'block' }}
              >
                {/* Background gradient - sky */}
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0a1628" />
                    <stop offset="40%" stopColor="#1a2a4a" />
                    <stop offset="100%" stopColor="#2a4a6a" />
                  </linearGradient>
                </defs>
                <rect
                  x={MARGIN.left}
                  y={MARGIN.top}
                  width={PLOT_W}
                  height={PLOT_H}
                  fill="url(#skyGrad)"
                  rx={4}
                />

                {/* Altitude axis ticks */}
                {altTicks.map(alt => {
                  const y = altToY(alt);
                  return (
                    <g key={alt}>
                      <line
                        x1={MARGIN.left}
                        y1={y}
                        x2={MARGIN.left + PLOT_W}
                        y2={y}
                        stroke="var(--mt-border)"
                        strokeWidth={0.5}
                        strokeDasharray="4,4"
                      />
                      <text
                        x={MARGIN.left - 8}
                        y={y + 4}
                        textAnchor="end"
                        fill="var(--mt-muted)"
                        fontSize={9}
                        fontFamily="var(--font-mono)"
                      >
                        {(alt / 1000).toFixed(0)}k
                      </text>
                    </g>
                  );
                })}

                {/* Y axis label */}
                <text
                  x={12}
                  y={MARGIN.top + PLOT_H / 2}
                  textAnchor="middle"
                  fill="var(--mt-muted)"
                  fontSize={10}
                  fontFamily="var(--font-mono)"
                  transform={`rotate(-90, 12, ${MARGIN.top + PLOT_H / 2})`}
                >
                  Altitude (ft)
                </text>

                {/* LCL line */}
                {lclAlt > 0 && lclAlt < MAX_ALT && (
                  <g>
                    <line
                      x1={MARGIN.left}
                      y1={lclY}
                      x2={MARGIN.left + PLOT_W}
                      y2={lclY}
                      stroke="var(--mt-weather)"
                      strokeWidth={1.5}
                      strokeDasharray="6,3"
                      opacity={0.7}
                    />
                    <text
                      x={MARGIN.left + PLOT_W - 4}
                      y={lclY - 6}
                      textAnchor="end"
                      fill="var(--mt-weather)"
                      fontSize={10}
                      fontFamily="var(--font-mono)"
                      fontWeight={700}
                    >
                      LCL {lclAlt.toFixed(0)} ft
                    </text>
                  </g>
                )}

                {/* Cloud layer above LCL */}
                {lclAlt > 0 && lclAlt < MAX_ALT && (
                  <rect
                    x={MARGIN.left}
                    y={MARGIN.top}
                    width={PLOT_W}
                    height={Math.max(0, lclY - MARGIN.top)}
                    fill="rgba(200, 210, 230, 0.08)"
                    rx={4}
                  />
                )}

                {/* Ground */}
                <rect
                  x={MARGIN.left}
                  y={altToY(0)}
                  width={PLOT_W}
                  height={MARGIN.bottom}
                  fill="#2a3020"
                  rx={2}
                />
                <text
                  x={MARGIN.left + PLOT_W / 2}
                  y={altToY(0) + 16}
                  textAnchor="middle"
                  fill="var(--mt-muted)"
                  fontSize={9}
                  fontFamily="var(--font-mono)"
                >
                  SURFACE {surfaceTemp}\u00B0C
                </text>

                {/* Dry adiabatic rate indicator (left side) */}
                <line
                  x1={MARGIN.left + 10}
                  y1={altToY(0)}
                  x2={MARGIN.left + 10}
                  y2={lclAlt < MAX_ALT ? lclY : MARGIN.top}
                  stroke="#6699CC"
                  strokeWidth={2}
                  strokeDasharray="4,2"
                  opacity={0.5}
                />
                <text
                  x={MARGIN.left + 16}
                  y={altToY(Math.min(lclAlt, MAX_ALT) / 2) + 4}
                  fill="#6699CC"
                  fontSize={8}
                  fontFamily="var(--font-mono)"
                  opacity={0.7}
                >
                  DRY: 3\u00B0C/1000ft
                </text>

                {/* Moist adiabatic rate indicator (above LCL) */}
                {lclAlt > 0 && lclAlt < MAX_ALT && (
                  <>
                    <line
                      x1={MARGIN.left + 10}
                      y1={lclY}
                      x2={MARGIN.left + 10}
                      y2={MARGIN.top}
                      stroke="#88BBDD"
                      strokeWidth={2}
                      strokeDasharray="2,3"
                      opacity={0.5}
                    />
                    <text
                      x={MARGIN.left + 16}
                      y={MARGIN.top + (lclY - MARGIN.top) / 2 + 4}
                      fill="#88BBDD"
                      fontSize={8}
                      fontFamily="var(--font-mono)"
                      opacity={0.7}
                    >
                      MOIST: 1.5\u00B0C/1000ft
                    </text>
                  </>
                )}

                {/* Air parcel */}
                <motion.g
                  animate={{ y: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {/* Cloud icon when above LCL */}
                  {isAboveLcl && (
                    <g>
                      <motion.ellipse
                        cx={MARGIN.left + PLOT_W / 2}
                        cy={parcelY - 18}
                        rx={18}
                        ry={10}
                        fill="rgba(200, 215, 235, 0.6)"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.ellipse
                        cx={MARGIN.left + PLOT_W / 2 - 10}
                        cy={parcelY - 22}
                        rx={12}
                        ry={8}
                        fill="rgba(200, 215, 235, 0.5)"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      />
                      <motion.ellipse
                        cx={MARGIN.left + PLOT_W / 2 + 10}
                        cy={parcelY - 20}
                        rx={14}
                        ry={9}
                        fill="rgba(200, 215, 235, 0.5)"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                      />
                    </g>
                  )}

                  {/* Parcel circle */}
                  <circle
                    cx={MARGIN.left + PLOT_W / 2}
                    cy={parcelY}
                    r={12}
                    fill={isAboveLcl ? 'rgba(123, 167, 204, 0.6)' : 'rgba(200, 140, 80, 0.6)'}
                    stroke={isAboveLcl ? 'var(--mt-weather)' : '#C8A050'}
                    strokeWidth={2}
                  />

                  {/* Temperature readout */}
                  <rect
                    x={MARGIN.left + PLOT_W / 2 + 18}
                    y={parcelY - 11}
                    width={60}
                    height={22}
                    rx={4}
                    fill="var(--mt-void)"
                    stroke="var(--mt-border)"
                    strokeWidth={1}
                  />
                  <text
                    x={MARGIN.left + PLOT_W / 2 + 48}
                    y={parcelY + 4}
                    textAnchor="middle"
                    fill="var(--mt-bright)"
                    fontSize={11}
                    fontFamily="var(--font-mono)"
                    fontWeight={700}
                  >
                    {parcelTemp.toFixed(1)}\u00B0C
                  </text>
                </motion.g>
              </svg>
                </div>
              </div>
              <div>
                {/* Controls */}
            <div style={{ marginBottom: '1rem' }}>
              <InteractiveSlider
                label="Parcel Altitude"
                min={0}
                max={30000}
                step={100}
                value={parcelAlt}
                onChange={handleParcelChange}
                formatValue={(v) => `${v.toLocaleString()} ft`}
              />
            </div>

            {/* Status panel */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{
                background: 'var(--mt-surface)',
                border: '1px solid var(--mt-border)',
                borderRadius: 8,
                padding: '0.75rem',
              }}>
                <div style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>
                  COOLING RATE
                </div>
                <div style={{ color: 'var(--mt-bright)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm, 0.875rem)', fontWeight: 700 }}>
                  {isAboveLcl ? `${MOIST_ADIABATIC_RATE}\u00B0C/1000ft` : `${DRY_ADIABATIC_RATE}\u00B0C/1000ft`}
                </div>
                <div style={{ color: isAboveLcl ? 'var(--mt-weather)' : '#C8A050', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', marginTop: '0.15rem' }}>
                  {isAboveLcl ? 'MOIST ADIABATIC' : 'DRY ADIABATIC'}
                </div>
              </div>
              <div style={{
                background: 'var(--mt-surface)',
                border: '1px solid var(--mt-border)',
                borderRadius: 8,
                padding: '0.75rem',
              }}>
                <div style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>
                  STATUS
                </div>
                <div style={{ color: isAboveLcl ? 'var(--mt-weather)' : 'var(--mt-bright)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm, 0.875rem)', fontWeight: 700 }}>
                  {isAboveLcl ? 'SATURATED' : 'UNSATURATED'}
                </div>
                <div style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', marginTop: '0.15rem' }}>
                  {isAboveLcl ? 'Cloud forming' : 'Clear air'}
                </div>
              </div>
            </div>

            {/* Explanation */}
            {hasInteracted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ marginBottom: '1.5rem' }}
              >
                <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, fontSize: 'var(--text-sm, 0.875rem)', marginBottom: '0.75rem' }}>
                  Below the LCL, unsaturated air cools at the <strong style={{ color: 'var(--mt-bright)' }}>dry adiabatic lapse rate</strong> of
                  3\u00B0C per 1,000 feet. Once the parcel reaches its dew point and becomes saturated, latent heat
                  released by condensation slows the cooling to the <strong style={{ color: 'var(--mt-weather)' }}>moist adiabatic lapse rate</strong> of
                  approximately 1.5\u00B0C per 1,000 feet.
                </p>
              </motion.div>
            )}

            {/* Quiz */}
            {hasInteracted && !quizCorrect && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <QuizBlock
                  question="What happens to the cooling rate when the air parcel reaches the dew point?"
                  options={[
                    { text: 'The cooling rate increases because water vapor absorbs more heat' },
                    { text: 'The cooling rate decreases because condensation releases latent heat', correct: true },
                    { text: 'The cooling rate stays the same regardless of saturation' },
                    { text: 'The parcel stops cooling entirely and begins warming' },
                  ]}
                  explanation="When rising air reaches its dew point, water vapor condenses and releases latent heat into the parcel. This extra heat partially offsets the cooling from expansion, reducing the lapse rate from 3 degrees C/1000ft (dry) to about 1.5 degrees C/1000ft (moist)."
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
                Module complete. You understand adiabatic cooling and the LCL.
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
