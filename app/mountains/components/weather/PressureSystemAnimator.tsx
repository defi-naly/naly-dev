'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveSlider from '../InteractiveSlider';
import QuizBlock from '../QuizBlock';

interface PressureSystemAnimatorProps {
  onComplete: () => void;
}

const SVG_WIDTH = 400;
const SVG_HEIGHT = 400;
const HIGH_CENTER = { x: 130, y: 170 };
const LOW_CENTER = { x: 280, y: 230 };

function polarToCart(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function PressureSystemAnimator({ onComplete }: PressureSystemAnimatorProps) {
  const [phase, setPhase] = useState<'setup' | 'interact' | 'reveal'>('setup');
  const [pressureGradient, setPressureGradient] = useState(50);
  const [animTime, setAnimTime] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);
  const rafRef = useRef<number>(0);

  // Animation loop
  useEffect(() => {
    if (phase !== 'interact' && phase !== 'reveal') return;
    let lastTime = performance.now();
    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      setAnimTime(prev => prev + dt);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  const handleGradientChange = useCallback((val: number) => {
    setPressureGradient(val);
    if (!hasInteracted) setHasInteracted(true);
  }, [hasInteracted]);

  const handleQuizCorrect = () => {
    setQuizCorrect(true);
    onComplete();
  };

  // Isobar spacing is inversely related to gradient strength
  const isobarSpacing = 18 + (100 - pressureGradient) * 0.3;
  const windSpeed = 0.3 + pressureGradient * 0.015; // rotation speed multiplier
  const numIsobars = 4;

  // Generate wind arrows
  const generateArrows = (cx: number, cy: number, clockwise: boolean, numRings: number) => {
    const arrows: { x1: number; y1: number; x2: number; y2: number; angle: number }[] = [];
    for (let ring = 1; ring <= numRings; ring++) {
      const r = ring * isobarSpacing;
      const arrowCount = 4 + ring;
      for (let i = 0; i < arrowCount; i++) {
        const baseAngle = (360 / arrowCount) * i;
        const animAngle = baseAngle + animTime * windSpeed * 60 * (clockwise ? 1 : -1);
        const pos = polarToCart(cx, cy, r, animAngle);
        // Wind direction is tangential (perpendicular to radius)
        const tangentAngle = animAngle + (clockwise ? 90 : -90);
        const len = 8 + pressureGradient * 0.06;
        const end = polarToCart(pos.x, pos.y, len, tangentAngle);
        arrows.push({ x1: pos.x, y1: pos.y, x2: end.x, y2: end.y, angle: tangentAngle });
      }
    }
    return arrows;
  };

  const highArrows = phase !== 'setup' ? generateArrows(HIGH_CENTER.x, HIGH_CENTER.y, true, numIsobars) : [];
  const lowArrows = phase !== 'setup' ? generateArrows(LOW_CENTER.x, LOW_CENTER.y, false, numIsobars) : [];

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
              Pressure systems drive weather. Air flows from <strong>High</strong> to <strong>Low</strong> pressure,
              but the Coriolis effect deflects it, creating rotating wind patterns. In the Northern Hemisphere,
              air spirals <strong>clockwise</strong> around Highs and <strong>counterclockwise</strong> around Lows.
            </p>
            <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              The spacing between isobars (lines of equal pressure) indicates the pressure gradient --
              closer isobars mean stronger winds.
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
              Activate Pressure Systems
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
                {/* SVG Top-down map */}
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
                {/* Background */}
                <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="#0c1420" rx={6} />

                {/* Grid lines */}
                {[...Array(9)].map((_, i) => {
                  const pos = (i + 1) * (SVG_WIDTH / 10);
                  return (
                    <g key={`grid-${i}`}>
                      <line x1={pos} y1={0} x2={pos} y2={SVG_HEIGHT} stroke="var(--mt-border)" strokeWidth={0.3} />
                      <line x1={0} y1={pos} x2={SVG_WIDTH} y2={pos} stroke="var(--mt-border)" strokeWidth={0.3} />
                    </g>
                  );
                })}

                {/* HIGH pressure isobars */}
                {[...Array(numIsobars)].map((_, i) => (
                  <circle
                    key={`h-iso-${i}`}
                    cx={HIGH_CENTER.x}
                    cy={HIGH_CENTER.y}
                    r={(i + 1) * isobarSpacing}
                    fill="none"
                    stroke="rgba(100, 160, 220, 0.3)"
                    strokeWidth={1}
                    strokeDasharray="4,3"
                  />
                ))}

                {/* LOW pressure isobars */}
                {[...Array(numIsobars)].map((_, i) => (
                  <circle
                    key={`l-iso-${i}`}
                    cx={LOW_CENTER.x}
                    cy={LOW_CENTER.y}
                    r={(i + 1) * isobarSpacing}
                    fill="none"
                    stroke="rgba(204, 100, 100, 0.3)"
                    strokeWidth={1}
                    strokeDasharray="4,3"
                  />
                ))}

                {/* Wind arrows - High (clockwise) */}
                {highArrows.map((arrow, i) => (
                  <g key={`ha-${i}`}>
                    <line
                      x1={arrow.x1}
                      y1={arrow.y1}
                      x2={arrow.x2}
                      y2={arrow.y2}
                      stroke="rgba(100, 180, 255, 0.6)"
                      strokeWidth={1.5}
                    />
                    {/* Arrowhead */}
                    <circle
                      cx={arrow.x2}
                      cy={arrow.y2}
                      r={1.5}
                      fill="rgba(100, 180, 255, 0.8)"
                    />
                  </g>
                ))}

                {/* Wind arrows - Low (counterclockwise) */}
                {lowArrows.map((arrow, i) => (
                  <g key={`la-${i}`}>
                    <line
                      x1={arrow.x1}
                      y1={arrow.y1}
                      x2={arrow.x2}
                      y2={arrow.y2}
                      stroke="rgba(255, 120, 100, 0.6)"
                      strokeWidth={1.5}
                    />
                    <circle
                      cx={arrow.x2}
                      cy={arrow.y2}
                      r={1.5}
                      fill="rgba(255, 120, 100, 0.8)"
                    />
                  </g>
                ))}

                {/* H label */}
                <circle cx={HIGH_CENTER.x} cy={HIGH_CENTER.y} r={18} fill="rgba(60, 120, 200, 0.2)" stroke="rgba(100, 160, 220, 0.6)" strokeWidth={1.5} />
                <text
                  x={HIGH_CENTER.x}
                  y={HIGH_CENTER.y + 6}
                  textAnchor="middle"
                  fill="#6699DD"
                  fontSize={18}
                  fontFamily="var(--font-display)"
                  fontWeight={700}
                >
                  H
                </text>

                {/* L label */}
                <circle cx={LOW_CENTER.x} cy={LOW_CENTER.y} r={18} fill="rgba(200, 80, 80, 0.2)" stroke="rgba(204, 100, 100, 0.6)" strokeWidth={1.5} />
                <text
                  x={LOW_CENTER.x}
                  y={LOW_CENTER.y + 6}
                  textAnchor="middle"
                  fill="#CC7766"
                  fontSize={18}
                  fontFamily="var(--font-display)"
                  fontWeight={700}
                >
                  L
                </text>

                {/* Pressure flow arrow H -> L */}
                <defs>
                  <marker id="arrowHead" markerWidth={8} markerHeight={6} refX={8} refY={3} orient="auto">
                    <path d="M0,0 L8,3 L0,6 Z" fill="var(--mt-muted)" opacity={0.5} />
                  </marker>
                </defs>
                <line
                  x1={HIGH_CENTER.x + 25}
                  y1={HIGH_CENTER.y + 10}
                  x2={LOW_CENTER.x - 25}
                  y2={LOW_CENTER.y - 10}
                  stroke="var(--mt-muted)"
                  strokeWidth={1}
                  strokeDasharray="6,4"
                  opacity={0.4}
                  markerEnd="url(#arrowHead)"
                />
                <text
                  x={(HIGH_CENTER.x + LOW_CENTER.x) / 2}
                  y={(HIGH_CENTER.y + LOW_CENTER.y) / 2 - 12}
                  textAnchor="middle"
                  fill="var(--mt-muted)"
                  fontSize={8}
                  fontFamily="var(--font-mono)"
                  opacity={0.6}
                >
                  PRESSURE GRADIENT
                </text>

                {/* Legend */}
                <text x={10} y={SVG_HEIGHT - 10} fill="var(--mt-muted)" fontSize={9} fontFamily="var(--font-mono)">
                  NORTHERN HEMISPHERE
                </text>
                {/* Rotation labels */}
                <text x={HIGH_CENTER.x} y={HIGH_CENTER.y + 30} textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">
                  CW
                </text>
                <text x={LOW_CENTER.x} y={LOW_CENTER.y + 30} textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">
                  CCW
                </text>
              </svg>
                </div>
              </div>
              <div>
                {/* Controls */}
                <div style={{ marginBottom: '1rem' }}>
                  <InteractiveSlider
                    label="Pressure Gradient Strength"
                min={10}
                max={100}
                value={pressureGradient}
                onChange={handleGradientChange}
                formatValue={(v) => v < 33 ? 'Weak' : v < 66 ? 'Moderate' : 'Strong'}
              />
            </div>

            {/* Info panel */}
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
                <div style={{ color: '#6699DD', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>
                  HIGH PRESSURE
                </div>
                <div style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
                  Air sinks and diverges outward. Clockwise rotation (NH). Generally fair weather.
                </div>
              </div>
              <div style={{
                background: 'var(--mt-surface)',
                border: '1px solid var(--mt-border)',
                borderRadius: 8,
                padding: '0.75rem',
              }}>
                <div style={{ color: '#CC7766', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>
                  LOW PRESSURE
                </div>
                <div style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
                  Air converges and rises. Counterclockwise rotation (NH). Clouds and precipitation.
                </div>
              </div>
            </div>

            {/* Coriolis explanation */}
            {hasInteracted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(123, 167, 204, 0.06)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 8,
                  padding: '1rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ color: 'var(--mt-weather)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs, 0.75rem)', marginBottom: '0.5rem' }}>
                  CORIOLIS EFFECT
                </div>
                <p style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-sm, 0.875rem)', lineHeight: 1.6, margin: 0 }}>
                  Wind does not flow directly from High to Low. Earth's rotation deflects moving air
                  to the right in the Northern Hemisphere. This deflection, combined with the pressure gradient force,
                  creates the characteristic rotational flow patterns. The result is called <strong style={{ color: 'var(--mt-bright)' }}>geostrophic wind</strong> --
                  wind that flows parallel to isobars rather than across them.
                </p>
              </motion.div>
            )}

            {/* Quiz */}
            {hasInteracted && !quizCorrect && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <QuizBlock
                  question="In the Northern Hemisphere, which direction does air flow around a Low pressure system?"
                  options={[
                    { text: 'Clockwise, spiraling inward' },
                    { text: 'Counterclockwise, spiraling inward', correct: true },
                    { text: 'Directly from all sides toward the center' },
                    { text: 'Counterclockwise, spiraling outward' },
                  ]}
                  explanation="In the Northern Hemisphere, Coriolis deflection causes air to spiral counterclockwise into Low pressure systems. The air converges at the surface and is forced upward, which is why Lows are associated with clouds and precipitation."
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
                Module complete. You understand pressure systems and the Coriolis effect.
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
