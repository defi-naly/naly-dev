'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizBlock from '../QuizBlock';

interface StabilityTestSimulatorProps {
  onComplete: () => void;
}

type TapZone = 'wrist' | 'elbow' | 'shoulder';
type Propagation = 'ECTP' | 'ECTN' | null;
type Phase = 'intro' | 'tapping' | 'ect' | 'results' | 'quiz';

function getTapZone(tapNumber: number): TapZone {
  if (tapNumber <= 10) return 'wrist';
  if (tapNumber <= 20) return 'elbow';
  return 'shoulder';
}

function getTapZoneLabel(zone: TapZone): string {
  switch (zone) {
    case 'wrist': return 'Wrist (taps 1-10)';
    case 'elbow': return 'Elbow (taps 11-20)';
    case 'shoulder': return 'Shoulder (taps 21-30)';
  }
}

function getForceLabel(zone: TapZone): string {
  switch (zone) {
    case 'wrist': return 'EASY';
    case 'elbow': return 'MODERATE';
    case 'shoulder': return 'HARD';
  }
}

function getCTInterpretation(score: number): { label: string; color: string; description: string } {
  if (score <= 5) return { label: 'Very Easy', color: '#CC4444', description: 'Weak layer fractured with minimal force. Extreme instability.' };
  if (score <= 10) return { label: 'Easy', color: '#E07030', description: 'Weak layer fractured with light force. High instability.' };
  if (score <= 15) return { label: 'Moderate', color: '#F5A623', description: 'Weak layer fractured with moderate force. Considerable instability.' };
  if (score <= 20) return { label: 'Hard', color: '#4ADE80', description: 'Required significant force to fracture. Lower instability.' };
  return { label: 'Very Hard', color: '#22C55E', description: 'Weak layer very resistant to fracturing. Generally stable.' };
}

function getOverallAssessment(score: number, propagation: Propagation): { level: string; color: string; detail: string } {
  if (propagation === 'ECTP') {
    if (score <= 10) return { level: 'EXTREME DANGER', color: '#CC4444', detail: 'Easy fracture with full propagation. Human triggering very likely. Avoid all avalanche terrain.' };
    if (score <= 18) return { level: 'HIGH DANGER', color: '#E07030', detail: 'Moderate fracture with full propagation. Human triggering likely on steep slopes.' };
    return { level: 'CONSIDERABLE', color: '#F5A623', detail: 'Hard fracture but full propagation. Natural triggers unlikely but human triggering possible.' };
  }
  if (score <= 8) return { level: 'CONSIDERABLE', color: '#F5A623', detail: 'Easy fracture but no propagation. Localized instability. Caution on steep convex rolls.' };
  if (score <= 18) return { level: 'MODERATE', color: '#4ADE80', detail: 'Moderate fracture, no propagation. Instability exists but widespread triggering unlikely.' };
  return { level: 'LOW', color: '#22C55E', detail: 'Hard fracture with no propagation. Snowpack generally stable at this location.' };
}

const SVG_WIDTH = 340;
const SVG_HEIGHT = 400;
const COLUMN_X = 120;
const COLUMN_W = 100;
const COLUMN_TOP = 50;
const COLUMN_H = 300;
const NUM_LAYERS = 8;

export default function StabilityTestSimulator({ onComplete }: StabilityTestSimulatorProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [tapCount, setTapCount] = useState(0);
  const [fractureScore] = useState(() => Math.floor(Math.random() * 22) + 5); // CT5 to CT26
  const [fractured, setFractured] = useState(false);
  const [propagation, setPropagation] = useState<Propagation>(null);
  const [impactFlash, setImpactFlash] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  // Weak layer position (one of the middle layers)
  const weakLayerIndex = useMemo(() => 2 + Math.floor(Math.random() * 4), []);
  const weakLayerY = COLUMN_TOP + (weakLayerIndex / NUM_LAYERS) * COLUMN_H;

  const currentZone = getTapZone(tapCount + 1);

  const handleTap = useCallback(() => {
    if (fractured) return;
    const nextTap = tapCount + 1;
    setTapCount(nextTap);
    setImpactFlash(true);
    setTimeout(() => setImpactFlash(false), 150);

    if (nextTap >= fractureScore) {
      setFractured(true);
      setTimeout(() => setPhase('ect'), 1200);
    }
  }, [tapCount, fractureScore, fractured]);

  const handleECT = useCallback((result: 'ECTP' | 'ECTN') => {
    setPropagation(result);
    // Randomize with slight bias toward propagation for lower CT scores
    setTimeout(() => setPhase('results'), 400);
  }, []);

  const handleStartTest = () => setPhase('tapping');

  const handleShowQuiz = () => setPhase('quiz');

  const handleQuizCorrect = useCallback(() => {
    setQuizPassed(true);
    onComplete();
  }, [onComplete]);

  const ctLabel = `CT${fractureScore}`;
  const ctInterpretation = getCTInterpretation(fractureScore);
  const assessment = propagation ? getOverallAssessment(fractureScore, propagation) : null;

  // Snow layer colors
  const layerColors = useMemo(() => {
    const colors: string[] = [];
    for (let i = 0; i < NUM_LAYERS; i++) {
      if (i === weakLayerIndex) {
        colors.push('rgba(200, 180, 140, 0.5)'); // Weak layer - faceted/depth hoar color
      } else {
        const brightness = 180 + Math.floor(Math.random() * 50);
        colors.push(`rgba(${brightness}, ${brightness + 10}, ${brightness + 20}, 0.7)`);
      }
    }
    return colors;
  }, [weakLayerIndex]);

  // Fracture displacement for visualization
  const fractureOffset = fractured ? 4 : 0;

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <p style={{ color: 'var(--mt-bright)', lineHeight: 1.7, marginBottom: '1rem' }}>
              The <strong>Compression Test (CT)</strong> is the most common snowpack stability test
              used in avalanche terrain. You isolate a 30cm x 30cm column of snow and tap it with
              increasing force to see when and how a weak layer fractures.
            </p>
            <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
              The test has 30 taps in three phases: 10 from the <strong style={{ color: 'var(--mt-bright)' }}>wrist</strong>,
              10 from the <strong style={{ color: 'var(--mt-bright)' }}>elbow</strong>, and 10 from
              the <strong style={{ color: 'var(--mt-bright)' }}>shoulder</strong>. Lower scores
              mean easier fracture and more danger.
            </p>
            <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              After the CT, the <strong style={{ color: 'var(--mt-bright)' }}>Extended Column Test (ECT)</strong> checks
              whether the fracture propagates across the entire column -- the key indicator of
              whether a slope-wide avalanche is possible.
            </p>

            <button
              onClick={handleStartTest}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'transparent',
                border: '1px solid var(--mt-avalanche)',
                color: 'var(--mt-avalanche)',
                borderRadius: 8,
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-base, 1rem)',
                cursor: 'pointer',
              }}
            >
              Begin Compression Test
            </button>
          </motion.div>
        )}

        {phase === 'tapping' && (
          <motion.div
            key="tapping"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mt-module-split">
              <div>
                {/* SVG Snow Column */}
                <div style={{
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 8,
                  padding: '1rem',
                  marginBottom: '1rem',
                  overflow: 'hidden',
                }}>
                  <svg
                    viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                    width="100%"
                    style={{ display: 'block' }}
                  >
                    {/* Background */}
                    <rect x={0} y={0} width={SVG_WIDTH} height={SVG_HEIGHT} fill="var(--mt-void)" rx={4} />

                    {/* Side view label */}
                    <text
                      x={SVG_WIDTH / 2}
                      y={24}
                      textAnchor="middle"
                      fill="var(--mt-muted)"
                      fontSize={10}
                      fontFamily="var(--font-mono)"
                      letterSpacing="0.1em"
                    >
                      SNOW COLUMN -- SIDE VIEW (30cm x 30cm)
                    </text>

                    {/* Column outline */}
                    <rect
                      x={COLUMN_X}
                      y={COLUMN_TOP}
                      width={COLUMN_W}
                      height={COLUMN_H}
                      fill="none"
                      stroke="var(--mt-border)"
                      strokeWidth={1}
                      strokeDasharray="4,4"
                    />

                    {/* Snow layers */}
                    {layerColors.map((color, i) => {
                      const layerH = COLUMN_H / NUM_LAYERS;
                      const y = COLUMN_TOP + i * layerH;
                      const isWeak = i === weakLayerIndex;
                      const isAboveWeak = i < weakLayerIndex;
                      const displaceY = fractured && isAboveWeak ? -fractureOffset : 0;

                      return (
                        <g key={i}>
                          <motion.rect
                            x={COLUMN_X + 1}
                            y={y + 1}
                            width={COLUMN_W - 2}
                            height={layerH - 2}
                            fill={color}
                            rx={1}
                            animate={{ y: y + 1 + displaceY }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                          />
                          {isWeak && (
                            <>
                              {/* Weak layer markers */}
                              <motion.line
                                x1={COLUMN_X + 5}
                                y1={y + layerH / 2}
                                x2={COLUMN_X + COLUMN_W - 5}
                                y2={y + layerH / 2}
                                stroke={fractured ? 'var(--mt-danger)' : 'rgba(200, 180, 140, 0.3)'}
                                strokeWidth={fractured ? 2 : 1}
                                strokeDasharray={fractured ? 'none' : '3,3'}
                                animate={{
                                  y1: y + layerH / 2,
                                  y2: y + layerH / 2,
                                }}
                              />
                              {/* Depth hoar symbols (triangles) */}
                              {!fractured && [0, 1, 2, 3, 4].map(j => {
                                const tx = COLUMN_X + 15 + j * 18;
                                const ty = y + layerH / 2;
                                return (
                                  <polygon
                                    key={j}
                                    points={`${tx},${ty - 4} ${tx + 4},${ty + 4} ${tx - 4},${ty + 4}`}
                                    fill="rgba(200, 180, 140, 0.4)"
                                    stroke="rgba(200, 180, 140, 0.6)"
                                    strokeWidth={0.5}
                                  />
                                );
                              })}
                              {/* Label */}
                              <text
                                x={COLUMN_X + COLUMN_W + 10}
                                y={y + layerH / 2 + 4}
                                fill={fractured ? 'var(--mt-danger)' : 'rgba(200, 180, 140, 0.7)'}
                                fontSize={9}
                                fontFamily="var(--font-mono)"
                              >
                                {fractured ? 'FRACTURE' : 'Weak layer'}
                              </text>
                            </>
                          )}
                        </g>
                      );
                    })}

                    {/* Fracture line */}
                    {fractured && (
                      <motion.line
                        x1={COLUMN_X}
                        y1={weakLayerY + (COLUMN_H / NUM_LAYERS) / 2}
                        x2={COLUMN_X + COLUMN_W}
                        y2={weakLayerY + (COLUMN_H / NUM_LAYERS) / 2}
                        stroke="var(--mt-danger)"
                        strokeWidth={3}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                    )}

                    {/* Impact flash */}
                    {impactFlash && (
                      <motion.rect
                        x={COLUMN_X}
                        y={COLUMN_TOP}
                        width={COLUMN_W}
                        height={10}
                        fill="rgba(255, 255, 255, 0.6)"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        rx={2}
                      />
                    )}

                    {/* Shovel / hand indicator */}
                    <g>
                      <motion.rect
                        x={COLUMN_X + COLUMN_W / 2 - 15}
                        y={COLUMN_TOP - 25}
                        width={30}
                        height={20}
                        rx={4}
                        fill="var(--mt-surface)"
                        stroke={
                          currentZone === 'wrist' ? '#4ADE80' :
                          currentZone === 'elbow' ? '#F5A623' : '#CC4444'
                        }
                        strokeWidth={1.5}
                        animate={impactFlash ? { y: COLUMN_TOP - 18 } : { y: COLUMN_TOP - 25 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      />
                      <motion.text
                        x={COLUMN_X + COLUMN_W / 2}
                        y={COLUMN_TOP - 12}
                        textAnchor="middle"
                        fill={
                          currentZone === 'wrist' ? '#4ADE80' :
                          currentZone === 'elbow' ? '#F5A623' : '#CC4444'
                        }
                        fontSize={8}
                        fontFamily="var(--font-mono)"
                        fontWeight={700}
                        animate={impactFlash ? { y: COLUMN_TOP - 5 } : { y: COLUMN_TOP - 12 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      >
                        {getForceLabel(currentZone)}
                      </motion.text>
                    </g>

                    {/* Ground */}
                    <rect
                      x={COLUMN_X - 20}
                      y={COLUMN_TOP + COLUMN_H}
                      width={COLUMN_W + 40}
                      height={30}
                      fill="#2a2a1e"
                      rx={2}
                    />
                    <text
                      x={COLUMN_X + COLUMN_W / 2}
                      y={COLUMN_TOP + COLUMN_H + 18}
                      textAnchor="middle"
                      fill="var(--mt-muted)"
                      fontSize={8}
                      fontFamily="var(--font-mono)"
                    >
                      GROUND
                    </text>

                    {/* Depth scale */}
                    {[0, 50, 100, 150, 200, 250, 300].map(cm => {
                      const y = COLUMN_TOP + (cm / 300) * COLUMN_H;
                      return (
                        <g key={cm}>
                          <line
                            x1={COLUMN_X - 5}
                            y1={y}
                            x2={COLUMN_X - 15}
                            y2={y}
                            stroke="var(--mt-muted)"
                            strokeWidth={0.5}
                          />
                          <text
                            x={COLUMN_X - 18}
                            y={y + 3}
                            textAnchor="end"
                            fill="var(--mt-muted)"
                            fontSize={7}
                            fontFamily="var(--font-mono)"
                          >
                            {cm}cm
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
              <div>
                {/* Status bar */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  padding: '0.75rem 1rem',
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 8,
                }}>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs, 0.75rem)',
                      color: 'var(--mt-muted)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase' as const,
                      marginBottom: '0.15rem',
                    }}>
                      TAP COUNT
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: fractured ? 'var(--mt-danger)' : 'var(--mt-bright)',
                    }}>
                      {tapCount} / 30
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs, 0.75rem)',
                      color: 'var(--mt-muted)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase' as const,
                      marginBottom: '0.15rem',
                    }}>
                      FORCE
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-sm, 0.875rem)',
                      fontWeight: 700,
                      color: currentZone === 'wrist' ? '#4ADE80' : currentZone === 'elbow' ? '#F5A623' : '#CC4444',
                    }}>
                      {getTapZoneLabel(currentZone)}
                    </div>
                  </div>
                </div>

                {/* Tap button or fractured message */}
                {!fractured ? (
                  <button
                    onClick={handleTap}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'transparent',
                      border: `2px solid ${
                        currentZone === 'wrist' ? '#4ADE80' :
                        currentZone === 'elbow' ? '#F5A623' : '#CC4444'
                      }`,
                      color: currentZone === 'wrist' ? '#4ADE80' :
                        currentZone === 'elbow' ? '#F5A623' : '#CC4444',
                      borderRadius: 8,
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      letterSpacing: '0.05em',
                    }}
                  >
                    TAP ({currentZone.toUpperCase()}) -- #{tapCount + 1}
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      background: 'rgba(204, 68, 68, 0.1)',
                      border: '1px solid var(--mt-danger)',
                      borderRadius: 8,
                      padding: '1rem',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: 'var(--mt-danger)',
                      marginBottom: '0.25rem',
                    }}>
                      FRACTURE -- {ctLabel}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm, 0.875rem)',
                      color: 'var(--mt-muted)',
                    }}>
                      Weak layer fractured on tap {fractureScore} ({getTapZone(fractureScore)} force).
                      Proceeding to Extended Column Test...
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'ect' && (
          <motion.div
            key="ect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mt-module-split">
              <div>
                {/* SVG showing ECT column */}
                <div style={{
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 8,
                  padding: '1rem',
                  marginBottom: '1.5rem',
                }}>
                  <svg viewBox="0 0 340 120" width="100%" style={{ display: 'block' }}>
                    <rect x={0} y={0} width={340} height={120} fill="var(--mt-void)" rx={4} />
                    <text x={170} y={18} textAnchor="middle" fill="var(--mt-muted)" fontSize={9} fontFamily="var(--font-mono)">
                      EXTENDED COLUMN -- TOP VIEW (90cm x 30cm)
                    </text>

                    {/* Column */}
                    <rect x={20} y={30} width={300} height={60} fill="rgba(220, 220, 230, 0.15)" stroke="var(--mt-border)" strokeWidth={1} rx={2} />

                    {/* Fracture origin */}
                    <circle cx={50} cy={60} r={8} fill="rgba(204, 68, 68, 0.3)" stroke="var(--mt-danger)" strokeWidth={1.5} />
                    <text x={50} y={63} textAnchor="middle" fill="var(--mt-danger)" fontSize={8} fontFamily="var(--font-mono)" fontWeight={700}>
                      CT
                    </text>

                    {/* Question mark for propagation */}
                    <line x1={65} y1={60} x2={290} y2={60} stroke="var(--mt-muted)" strokeWidth={1} strokeDasharray="6,4" />
                    <text x={177} y={55} textAnchor="middle" fill="var(--mt-muted)" fontSize={10} fontFamily="var(--font-mono)">
                      Did the fracture propagate?
                    </text>

                    {/* Right edge marker */}
                    <circle cx={305} cy={60} r={6} fill="none" stroke="var(--mt-muted)" strokeWidth={1} strokeDasharray="3,2" />
                    <text x={305} y={63} textAnchor="middle" fill="var(--mt-muted)" fontSize={7} fontFamily="var(--font-mono)">?</text>
                  </svg>
                </div>
              </div>
              <div>
                <div style={{
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 8,
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--mt-bright)',
                    marginBottom: '0.75rem',
                  }}>
                    Extended Column Test (ECT)
                  </div>
                  <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, marginBottom: '0.75rem', fontSize: 'var(--text-sm, 0.875rem)' }}>
                    The compression test showed the weak layer fractured at <strong style={{ color: 'var(--mt-danger)' }}>{ctLabel}</strong>.
                    Now we check: did the fracture propagate across the entire 90cm column, or did it stay local?
                  </p>
                  <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, marginBottom: '0.5rem', fontSize: 'var(--text-sm, 0.875rem)' }}>
                    <strong style={{ color: 'var(--mt-bright)' }}>ECTP</strong> (Propagation) = fracture ran across the full column.
                    This means the weak layer can sustain a running crack -- slope-wide failure is possible.
                  </p>
                  <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, fontSize: 'var(--text-sm, 0.875rem)' }}>
                    <strong style={{ color: 'var(--mt-bright)' }}>ECTN</strong> (No propagation) = fracture stayed local.
                    The weak layer cannot sustain a running crack at this location.
                  </p>
                </div>

                <p style={{
                  color: 'var(--mt-muted)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm, 0.875rem)',
                  lineHeight: 1.7,
                  marginBottom: '1rem',
                  textAlign: 'center',
                }}>
                  Observe the column. Did the fracture propagate to the far end?
                </p>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => handleECT('ECTP')}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: 'rgba(204, 68, 68, 0.1)',
                      border: '1px solid var(--mt-danger)',
                      color: 'var(--mt-danger)',
                      borderRadius: 8,
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-base, 1rem)',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    ECTP -- Full Propagation
                  </button>
                  <button
                    onClick={() => handleECT('ECTN')}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: 'rgba(74, 222, 128, 0.1)',
                      border: '1px solid #4ADE80',
                      color: '#4ADE80',
                      borderRadius: 8,
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-base, 1rem)',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    ECTN -- No Propagation
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'results' && assessment && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {/* Result header */}
            <div style={{
              background: 'var(--mt-surface)',
              border: `1px solid ${assessment.color}`,
              borderRadius: 8,
              padding: '1.25rem',
              marginBottom: '1.25rem',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: 'var(--mt-muted)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                marginBottom: '0.5rem',
              }}>
                TEST RESULT
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '2rem',
                fontWeight: 700,
                color: assessment.color,
                marginBottom: '0.25rem',
              }}>
                {ctLabel} {propagation === 'ECTP' ? 'SP' : 'RP'}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm, 0.875rem)',
                color: 'var(--mt-muted)',
              }}>
                {propagation === 'ECTP' ? 'Sudden Planar (full propagation)' : 'Resistant Planar (no propagation)'}
              </div>
            </div>

            {/* Interpretation grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              marginBottom: '1.25rem',
            }}>
              <div style={{
                background: 'var(--mt-surface)',
                border: '1px solid var(--mt-border)',
                borderRadius: 8,
                padding: '0.75rem',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs, 0.75rem)',
                  color: 'var(--mt-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  marginBottom: '0.25rem',
                }}>
                  CT SCORE
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: ctInterpretation.color,
                }}>
                  {ctLabel} -- {ctInterpretation.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs, 0.75rem)',
                  color: 'var(--mt-muted)',
                  marginTop: '0.25rem',
                  lineHeight: 1.5,
                }}>
                  {ctInterpretation.description}
                </div>
              </div>

              <div style={{
                background: 'var(--mt-surface)',
                border: '1px solid var(--mt-border)',
                borderRadius: 8,
                padding: '0.75rem',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs, 0.75rem)',
                  color: 'var(--mt-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  marginBottom: '0.25rem',
                }}>
                  ECT RESULT
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: propagation === 'ECTP' ? 'var(--mt-danger)' : '#4ADE80',
                }}>
                  {propagation === 'ECTP' ? 'PROPAGATION' : 'NO PROPAGATION'}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs, 0.75rem)',
                  color: 'var(--mt-muted)',
                  marginTop: '0.25rem',
                  lineHeight: 1.5,
                }}>
                  {propagation === 'ECTP'
                    ? 'Fracture ran across entire column. Running crack possible on the slope.'
                    : 'Fracture stayed local. Running crack unlikely at this location.'}
                </div>
              </div>
            </div>

            {/* Overall assessment */}
            <div style={{
              background: `rgba(${assessment.color === '#CC4444' ? '204,68,68' : assessment.color === '#E07030' ? '224,112,48' : assessment.color === '#F5A623' ? '245,166,35' : assessment.color === '#4ADE80' ? '74,222,128' : '34,197,94'}, 0.1)`,
              border: `1px solid ${assessment.color}`,
              borderRadius: 8,
              padding: '1rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: 'var(--mt-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                marginBottom: '0.5rem',
              }}>
                DANGER ASSESSMENT
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: assessment.color,
                marginBottom: '0.5rem',
              }}>
                {assessment.level}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm, 0.875rem)',
                color: 'var(--mt-muted)',
                lineHeight: 1.7,
              }}>
                {assessment.detail}
              </div>
            </div>

            {/* Reference table */}
            <div style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '1rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: 'var(--mt-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                marginBottom: '0.75rem',
              }}>
                CT SCORE REFERENCE
              </div>
              {[
                { range: 'CT1-5', label: 'Very Easy', color: '#CC4444' },
                { range: 'CT6-10', label: 'Easy', color: '#E07030' },
                { range: 'CT11-15', label: 'Moderate', color: '#F5A623' },
                { range: 'CT16-20', label: 'Hard', color: '#4ADE80' },
                { range: 'CT21-30', label: 'Very Hard', color: '#22C55E' },
              ].map(row => (
                <div key={row.range} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.35rem 0',
                  borderBottom: '1px solid var(--mt-border)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs, 0.75rem)',
                }}>
                  <span style={{ color: 'var(--mt-bright)' }}>{row.range}</span>
                  <span style={{ color: row.color }}>{row.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleShowQuiz}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'transparent',
                border: '1px solid var(--mt-avalanche)',
                color: 'var(--mt-avalanche)',
                borderRadius: 8,
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-base, 1rem)',
                cursor: 'pointer',
              }}
            >
              Continue to Quiz
            </button>
          </motion.div>
        )}

        {phase === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <QuizBlock
              question="A CT15 with full propagation (ECTP) is found. What does this tell you?"
              options={[
                { text: 'The snowpack is stable -- CT15 is in the moderate range so it is safe to ski' },
                { text: 'The weak layer requires moderate force to fracture but CAN propagate, making human triggering likely on steep slopes', correct: true },
                { text: 'Only natural avalanches are possible since the fracture required elbow-force taps' },
                { text: 'The test is inconclusive and should be repeated at a different location' },
              ]}
              explanation="A CT15 means the weak layer fractured with moderate force (elbow range), but the critical finding is the ECTP -- full propagation. Even though it was not an easy fracture, the fact that the crack ran across the entire column means the weak layer can sustain a running fracture. On a loaded slope, a human trigger (like a skier) could initiate the same propagating failure. This combination warrants avoiding steep avalanche terrain."
              onCorrect={handleQuizCorrect}
            />

            {quizPassed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  marginTop: '1.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--mt-avalanche)',
                  borderRadius: 8,
                  padding: '1rem',
                  textAlign: 'center',
                  color: 'var(--mt-avalanche)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm, 0.875rem)',
                }}
              >
                Module complete. You understand compression tests and propagation assessment.
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
