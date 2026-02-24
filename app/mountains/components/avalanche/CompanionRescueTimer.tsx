'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizBlock from '../QuizBlock';

interface CompanionRescueTimerProps {
  onComplete: () => void;
}

type Phase = 'intro' | 'signal' | 'fine' | 'probe' | 'excavate' | 'result';

// Survival probability curve (approximation of the burial time survival curve)
function survivalProbability(secondsElapsed: number): number {
  const minutes = secondsElapsed / 60;
  if (minutes <= 0) return 92;
  if (minutes <= 10) return 92 - (minutes / 10) * 15; // 92% -> 77% in first 10 min
  if (minutes <= 18) return 77 - ((minutes - 10) / 8) * 47; // 77% -> 30% by 18 min
  if (minutes <= 35) return 30 - ((minutes - 18) / 17) * 17; // 30% -> 13% by 35 min
  if (minutes <= 60) return 13 - ((minutes - 35) / 25) * 6; // 13% -> 7% by 60 min
  return Math.max(3, 7 - ((minutes - 60) / 60) * 4);
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Signal search: random signal appears 5-8 seconds after starting
// Fine search: slider zeroing in
// Probe: spiral pattern click
// Excavate: rapid clicking

export default function CompanionRescueTimer({ onComplete }: CompanionRescueTimerProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  // Signal search state
  const [signalStrength, setSignalStrength] = useState(0);
  const [signalFound, setSignalFound] = useState(false);
  const [signalAppearTime] = useState(() => 5 + Math.random() * 3); // 5-8 seconds
  const signalStartRef = useRef<number>(0);

  // Fine search state
  const [finePosition, setFinePosition] = useState(50);
  const [targetPosition] = useState(() => 15 + Math.random() * 70); // Random target
  const [fineComplete, setFineComplete] = useState(false);

  // Probe state
  const [probeHits, setProbeHits] = useState(0);
  const [probeTarget] = useState(() => Math.floor(Math.random() * 4) + 3); // 3-6 probes to find
  const [probePositions, setProbePositions] = useState<{ x: number; y: number; hit: boolean }[]>([]);
  const [probeFound, setProbeFound] = useState(false);

  // Excavate state
  const [digProgress, setDigProgress] = useState(0);

  // Timer
  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const survival = survivalProbability(elapsedSeconds);
  const survivalColor = survival > 70 ? '#4ADE80' : survival > 40 ? '#F5A623' : '#CC4444';

  // Start the rescue
  const handleStart = useCallback(() => {
    setPhase('signal');
    setTimerRunning(true);
    signalStartRef.current = Date.now();
  }, []);

  // Signal search - signal strength increases as time passes
  useEffect(() => {
    if (phase !== 'signal' || signalFound) return;
    const interval = setInterval(() => {
      const elapsed = (Date.now() - signalStartRef.current) / 1000;
      if (elapsed >= signalAppearTime) {
        // Signal appears and grows
        const signalElapsed = elapsed - signalAppearTime;
        const strength = Math.min(100, signalElapsed * 30);
        setSignalStrength(strength);
      } else {
        // Random low noise
        setSignalStrength(Math.random() * 10);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [phase, signalFound, signalAppearTime]);

  const handleSignalFound = useCallback(() => {
    if (signalStrength > 30) {
      setSignalFound(true);
      setTimeout(() => setPhase('fine'), 500);
    }
  }, [signalStrength]);

  // Fine search - check if position is close enough
  const handleFineSearch = useCallback((value: number) => {
    setFinePosition(value);
    const distance = Math.abs(value - targetPosition);
    if (distance < 3 && !fineComplete) {
      setFineComplete(true);
      setTimeout(() => setPhase('probe'), 500);
    }
  }, [targetPosition, fineComplete]);

  // Probe search
  const handleProbe = useCallback(() => {
    if (probeFound) return;
    const newProbe = {
      x: 30 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      hit: probeHits + 1 >= probeTarget,
    };
    setProbePositions(prev => [...prev, newProbe]);

    if (probeHits + 1 >= probeTarget) {
      setProbeFound(true);
      setProbeHits(prev => prev + 1);
      setTimeout(() => setPhase('excavate'), 600);
    } else {
      setProbeHits(prev => prev + 1);
    }
  }, [probeHits, probeTarget, probeFound]);

  // Excavation
  const handleDig = useCallback(() => {
    setDigProgress(prev => {
      const next = Math.min(100, prev + 3 + Math.random() * 2);
      if (next >= 100) {
        setTimerRunning(false);
        setTimeout(() => setPhase('result'), 300);
      }
      return next;
    });
  }, []);

  const handleQuizCorrect = useCallback(() => {
    setQuizPassed(true);
    onComplete();
  }, [onComplete]);

  // Fine search distance indicator
  const fineDistance = Math.abs(finePosition - targetPosition);
  const fineIndicator = fineDistance < 3 ? 'CONTACT' : fineDistance < 10 ? 'VERY CLOSE' : fineDistance < 25 ? 'CLOSE' : fineDistance < 45 ? 'MODERATE' : 'FAR';
  const fineColor = fineDistance < 3 ? '#4ADE80' : fineDistance < 10 ? '#F5A623' : fineDistance < 25 ? '#E07030' : '#CC4444';

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
              Your partner has been buried in an avalanche. You have their approximate last-seen point.
              The clock starts now.
            </p>

            {/* Survival curve */}
            <div style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '1rem',
              marginBottom: '1.25rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: 'var(--mt-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                marginBottom: '0.75rem',
              }}>
                BURIAL TIME SURVIVAL CURVE
              </div>
              <svg viewBox="0 0 320 100" width="100%" style={{ display: 'block' }}>
                <rect x={0} y={0} width={320} height={100} fill="var(--mt-void)" rx={4} />
                {/* Grid */}
                {[0, 10, 18, 35, 60].map(min => {
                  const x = 30 + (min / 60) * 270;
                  return (
                    <g key={min}>
                      <line x1={x} y1={10} x2={x} y2={85} stroke="var(--mt-border)" strokeWidth={0.5} strokeDasharray="2,3" />
                      <text x={x} y={95} textAnchor="middle" fill="var(--mt-muted)" fontSize={7} fontFamily="var(--font-mono)">
                        {min}m
                      </text>
                    </g>
                  );
                })}
                {/* Y axis labels */}
                {[92, 70, 50, 30].map(pct => {
                  const y = 10 + ((92 - pct) / 92) * 75;
                  return (
                    <text key={pct} x={25} y={y + 3} textAnchor="end" fill="var(--mt-muted)" fontSize={7} fontFamily="var(--font-mono)">
                      {pct}%
                    </text>
                  );
                })}
                {/* Curve */}
                <path
                  d={`M30,${10 + ((92 - 92) / 92) * 75} ` +
                    `L${30 + (10 / 60) * 270},${10 + ((92 - 77) / 92) * 75} ` +
                    `L${30 + (18 / 60) * 270},${10 + ((92 - 30) / 92) * 75} ` +
                    `L${30 + (35 / 60) * 270},${10 + ((92 - 13) / 92) * 75} ` +
                    `L${30 + (60 / 60) * 270},${10 + ((92 - 7) / 92) * 75}`}
                  fill="none"
                  stroke="var(--mt-danger)"
                  strokeWidth={2}
                />
                {/* 18 min marker */}
                <line
                  x1={30 + (18 / 60) * 270}
                  y1={10}
                  x2={30 + (18 / 60) * 270}
                  y2={85}
                  stroke="var(--mt-avalanche)"
                  strokeWidth={1}
                  strokeDasharray="4,2"
                />
                <text
                  x={30 + (18 / 60) * 270}
                  y={8}
                  textAnchor="middle"
                  fill="var(--mt-avalanche)"
                  fontSize={7}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                >
                  18 MIN
                </text>
              </svg>
            </div>

            <div style={{
              background: 'rgba(204, 68, 68, 0.08)',
              border: '1px solid var(--mt-danger)',
              borderRadius: 8,
              padding: '0.75rem 1rem',
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm, 0.875rem)',
              color: 'var(--mt-bright)',
              lineHeight: 1.7,
            }}>
              <strong style={{ color: 'var(--mt-danger)' }}>Survival drops from 92% to 30% after 18 minutes.</strong> After that,
              asphyxiation from CO2 buildup becomes the primary killer. Your beacon, probe, and shovel
              must get them out before this window closes.
            </div>

            <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: 'var(--text-sm, 0.875rem)' }}>
              Complete all four phases: <strong style={{ color: 'var(--mt-bright)' }}>Signal Search</strong>,{' '}
              <strong style={{ color: 'var(--mt-bright)' }}>Fine Search</strong>,{' '}
              <strong style={{ color: 'var(--mt-bright)' }}>Probe Strike</strong>, and{' '}
              <strong style={{ color: 'var(--mt-bright)' }}>Excavation</strong>.
            </p>

            <button
              onClick={handleStart}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'var(--mt-danger)',
                border: 'none',
                color: 'var(--mt-bright)',
                borderRadius: 8,
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.05em',
              }}
            >
              START RESCUE
            </button>
          </motion.div>
        )}

        {/* Timer header -- shown during all rescue phases */}
        {phase !== 'intro' && phase !== 'result' && (
          <motion.div
            key={`active-${phase}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Timer bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 1rem',
              background: 'var(--mt-surface)',
              border: `1px solid ${survivalColor}`,
              borderRadius: 8,
              marginBottom: '1rem',
            }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs, 0.75rem)',
                  color: 'var(--mt-muted)',
                  letterSpacing: '0.08em',
                  marginBottom: '0.1rem',
                }}>
                  ELAPSED
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: elapsedSeconds > 1080 ? 'var(--mt-danger)' : 'var(--mt-bright)',
                }}>
                  {formatTime(elapsedSeconds)}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs, 0.75rem)',
                  color: 'var(--mt-muted)',
                  letterSpacing: '0.08em',
                  marginBottom: '0.1rem',
                }}>
                  SURVIVAL
                </div>
                <motion.div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: survivalColor,
                  }}
                  animate={{ color: survivalColor }}
                >
                  {survival.toFixed(0)}%
                </motion.div>
              </div>
            </div>

            {/* Phase indicator */}
            <div style={{
              display: 'flex',
              gap: '0.25rem',
              marginBottom: '1.25rem',
            }}>
              {(['signal', 'fine', 'probe', 'excavate'] as const).map((p, i) => {
                const phaseOrder = ['signal', 'fine', 'probe', 'excavate'];
                const currentIdx = phaseOrder.indexOf(phase);
                const isActive = p === phase;
                const isDone = phaseOrder.indexOf(p) < currentIdx;
                return (
                  <div key={p} style={{
                    flex: 1,
                    padding: '0.35rem',
                    background: isActive ? 'var(--mt-avalanche)' : isDone ? 'rgba(74, 222, 128, 0.15)' : 'var(--mt-surface)',
                    border: `1px solid ${isActive ? 'var(--mt-avalanche)' : isDone ? '#4ADE80' : 'var(--mt-border)'}`,
                    borderRadius: 4,
                    textAlign: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs, 0.75rem)',
                    color: isActive ? 'var(--mt-void)' : isDone ? '#4ADE80' : 'var(--mt-muted)',
                    fontWeight: isActive ? 700 : 400,
                  }}>
                    {i + 1}. {p.charAt(0).toUpperCase() + p.slice(1)}
                  </div>
                );
              })}
            </div>

            {/* Phase-specific content */}
            {phase === 'signal' && (
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--mt-bright)',
                  marginBottom: '0.5rem',
                }}>
                  Phase 1: Signal Search
                </div>
                <p style={{
                  color: 'var(--mt-muted)',
                  fontSize: 'var(--text-sm, 0.875rem)',
                  lineHeight: 1.7,
                  marginBottom: '1rem',
                }}>
                  Switch your beacon to SEARCH mode. Move in a systematic pattern from the last-seen
                  point. Watch for the signal indicator -- click when you pick up a signal.
                </p>

                <div className="mt-module-split">
                  {/* Left: Signal strength visualization */}
                  <div>
                    <div style={{
                      background: 'var(--mt-void)',
                      border: '1px solid var(--mt-border)',
                      borderRadius: 8,
                      padding: '1rem',
                    }}>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs, 0.75rem)',
                        color: 'var(--mt-muted)',
                        letterSpacing: '0.08em',
                        marginBottom: '0.5rem',
                      }}>
                        BEACON SIGNAL
                      </div>
                      {/* Signal bars */}
                      <div style={{
                        display: 'flex',
                        gap: '3px',
                        alignItems: 'flex-end',
                        height: 50,
                        marginBottom: '0.5rem',
                      }}>
                        {Array.from({ length: 20 }, (_, i) => {
                          const barHeight = (i / 20) * 100;
                          const filled = signalStrength >= barHeight;
                          return (
                            <motion.div
                              key={i}
                              style={{
                                flex: 1,
                                height: `${20 + (i / 20) * 80}%`,
                                borderRadius: 2,
                              }}
                              animate={{
                                background: filled ? (signalStrength > 60 ? '#4ADE80' : signalStrength > 30 ? '#F5A623' : 'var(--mt-danger)') : 'var(--mt-surface)',
                              }}
                              transition={{ duration: 0.1 }}
                            />
                          );
                        })}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: signalStrength > 30 ? '#4ADE80' : 'var(--mt-muted)',
                        textAlign: 'center',
                      }}>
                        {signalStrength > 30 ? 'SIGNAL DETECTED' : 'Searching...'}
                      </div>
                    </div>
                  </div>

                  {/* Right: Action button */}
                  <div>
                    <button
                      onClick={handleSignalFound}
                      disabled={signalStrength < 30}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: signalStrength > 30 ? '#4ADE80' : 'var(--mt-surface)',
                        border: `1px solid ${signalStrength > 30 ? '#4ADE80' : 'var(--mt-border)'}`,
                        color: signalStrength > 30 ? 'var(--mt-void)' : 'var(--mt-muted)',
                        borderRadius: 8,
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-base, 1rem)',
                        fontWeight: 700,
                        cursor: signalStrength > 30 ? 'pointer' : 'default',
                        opacity: signalStrength > 30 ? 1 : 0.5,
                      }}
                    >
                      {signalStrength > 30 ? 'SIGNAL FOUND -- Proceed to Fine Search' : 'Waiting for signal...'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {phase === 'fine' && (
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--mt-bright)',
                  marginBottom: '0.5rem',
                }}>
                  Phase 2: Fine Search (Bracket Pattern)
                </div>
                <p style={{
                  color: 'var(--mt-muted)',
                  fontSize: 'var(--text-sm, 0.875rem)',
                  lineHeight: 1.7,
                  marginBottom: '1rem',
                }}>
                  Move the beacon slowly close to the snow surface. Use the bracket pattern:
                  move in one direction until the signal weakens, then reverse. Zero in on the
                  lowest reading.
                </p>

                <div className="mt-module-split">
                  {/* Left: Fine search slider */}
                  <div>
                    <div style={{
                      background: 'var(--mt-void)',
                      border: '1px solid var(--mt-border)',
                      borderRadius: 8,
                      padding: '1rem',
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem',
                      }}>
                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs, 0.75rem)',
                          color: 'var(--mt-muted)',
                        }}>
                          DISTANCE READING
                        </div>
                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-sm, 0.875rem)',
                          fontWeight: 700,
                          color: fineColor,
                        }}>
                          {fineIndicator} ({fineDistance < 3 ? '0.0' : fineDistance.toFixed(1)}m)
                        </div>
                      </div>

                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={finePosition}
                        onChange={(e) => handleFineSearch(Number(e.target.value))}
                        style={{
                          width: '100%',
                          accentColor: fineColor,
                        }}
                      />

                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '0.75rem',
                      }}>
                        <motion.div
                          animate={{
                            scale: fineDistance < 5 ? [1, 1.3, 1] : 1,
                            boxShadow: fineDistance < 3 ? '0 0 20px rgba(74, 222, 128, 0.6)' : 'none',
                          }}
                          transition={{ repeat: fineDistance < 10 ? Infinity : 0, duration: fineDistance < 5 ? 0.3 : 0.8 }}
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            background: fineColor,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right: Status */}
                  <div>
                    {fineComplete && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          textAlign: 'center',
                          color: '#4ADE80',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          fontSize: 'var(--text-sm, 0.875rem)',
                          padding: '0.5rem',
                        }}
                      >
                        MINIMUM FOUND -- Proceeding to probe...
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {phase === 'probe' && (
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--mt-bright)',
                  marginBottom: '0.5rem',
                }}>
                  Phase 3: Probe Strike
                </div>
                <p style={{
                  color: 'var(--mt-muted)',
                  fontSize: 'var(--text-sm, 0.875rem)',
                  lineHeight: 1.7,
                  marginBottom: '1rem',
                }}>
                  Assemble your probe and strike in a spiral pattern outward from the beacon
                  minimum point. You are looking for a distinct &quot;body strike&quot; -- a soft resistance
                  different from hard ground.
                </p>

                <div className="mt-module-split">
                  {/* Left: Probe grid SVG */}
                  <div>
                    <div style={{
                      background: 'var(--mt-void)',
                      border: '1px solid var(--mt-border)',
                      borderRadius: 8,
                      padding: '1rem',
                    }}>
                      <svg viewBox="0 0 200 120" width="100%" style={{ display: 'block', cursor: 'pointer' }} onClick={handleProbe}>
                        {/* Snow surface */}
                        <rect x={0} y={0} width={200} height={120} fill="rgba(220, 225, 235, 0.08)" rx={4} />

                        {/* Grid lines */}
                        {[25, 50, 75, 100, 125, 150, 175].map(x => (
                          <line key={`vl${x}`} x1={x} y1={0} x2={x} y2={120} stroke="var(--mt-border)" strokeWidth={0.5} strokeDasharray="2,4" />
                        ))}
                        {[30, 60, 90].map(y => (
                          <line key={`hl${y}`} x1={0} y1={y} x2={200} y2={y} stroke="var(--mt-border)" strokeWidth={0.5} strokeDasharray="2,4" />
                        ))}

                        {/* Center beacon mark */}
                        <circle cx={100} cy={60} r={4} fill="none" stroke="var(--mt-avalanche)" strokeWidth={1} strokeDasharray="2,2" />
                        <line x1={96} y1={60} x2={104} y2={60} stroke="var(--mt-avalanche)" strokeWidth={1} />
                        <line x1={100} y1={56} x2={100} y2={64} stroke="var(--mt-avalanche)" strokeWidth={1} />

                        {/* Probe marks */}
                        {probePositions.map((p, i) => (
                          <g key={i}>
                            <circle
                              cx={p.x * 2}
                              cy={p.y * 1.2}
                              r={p.hit ? 6 : 3}
                              fill={p.hit ? '#4ADE80' : 'var(--mt-muted)'}
                              opacity={p.hit ? 1 : 0.6}
                            />
                            {p.hit && (
                              <text
                                x={p.x * 2}
                                y={p.y * 1.2 + 3}
                                textAnchor="middle"
                                fill="var(--mt-void)"
                                fontSize={7}
                                fontWeight={700}
                                fontFamily="var(--font-mono)"
                              >
                                HIT
                              </text>
                            )}
                          </g>
                        ))}

                        {/* Instructions */}
                        <text x={100} y={115} textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">
                          Click to probe ({probeHits}/{probeTarget} strikes)
                        </text>
                      </svg>
                    </div>
                  </div>

                  {/* Right: Probe button + status */}
                  <div>
                    {!probeFound && (
                      <button
                        onClick={handleProbe}
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
                        PROBE (Spiral Pattern)
                      </button>
                    )}

                    {probeFound && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          textAlign: 'center',
                          color: '#4ADE80',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          fontSize: 'var(--text-sm, 0.875rem)',
                          padding: '0.5rem',
                        }}
                      >
                        BODY STRIKE CONFIRMED -- Leave probe in place. Begin excavation.
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {phase === 'excavate' && (
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--mt-bright)',
                  marginBottom: '0.5rem',
                }}>
                  Phase 4: Strategic Excavation
                </div>
                <p style={{
                  color: 'var(--mt-muted)',
                  fontSize: 'var(--text-sm, 0.875rem)',
                  lineHeight: 1.7,
                  marginBottom: '1rem',
                }}>
                  Dig from the downhill side. Create a ramp, not a hole. Move snow downhill --
                  this is the most physically exhausting part. Click rapidly to dig.
                </p>

                <div className="mt-module-split">
                  {/* Left: Dig progress */}
                  <div>
                    <div style={{
                      background: 'var(--mt-void)',
                      border: '1px solid var(--mt-border)',
                      borderRadius: 8,
                      padding: '1rem',
                    }}>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs, 0.75rem)',
                        color: 'var(--mt-muted)',
                        marginBottom: '0.5rem',
                      }}>
                        EXCAVATION PROGRESS
                      </div>
                      <div style={{
                        width: '100%',
                        height: 20,
                        background: 'var(--mt-surface)',
                        borderRadius: 10,
                        overflow: 'hidden',
                        marginBottom: '0.5rem',
                      }}>
                        <motion.div
                          style={{
                            height: '100%',
                            background: digProgress > 80 ? '#4ADE80' : digProgress > 50 ? '#F5A623' : 'var(--mt-avalanche)',
                            borderRadius: 10,
                          }}
                          animate={{ width: `${digProgress}%` }}
                          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                        />
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'var(--mt-bright)',
                        textAlign: 'center',
                      }}>
                        {digProgress.toFixed(0)}%
                      </div>
                    </div>
                  </div>

                  {/* Right: Dig button */}
                  <div>
                    <button
                      onClick={handleDig}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'var(--mt-danger)',
                        border: 'none',
                        color: 'var(--mt-bright)',
                        borderRadius: 8,
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        letterSpacing: '0.05em',
                      }}
                    >
                      DIG! DIG! DIG!
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Result */}
            <div style={{
              background: 'var(--mt-surface)',
              border: `1px solid ${survival >= 50 ? '#4ADE80' : survival >= 30 ? '#F5A623' : 'var(--mt-danger)'}`,
              borderRadius: 8,
              padding: '1.5rem',
              textAlign: 'center',
              marginBottom: '1.5rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: 'var(--mt-muted)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                marginBottom: '0.5rem',
              }}>
                RESCUE COMPLETE
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '2.5rem',
                fontWeight: 700,
                color: 'var(--mt-bright)',
                marginBottom: '0.25rem',
              }}>
                {formatTime(elapsedSeconds)}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm, 0.875rem)',
                color: 'var(--mt-muted)',
                marginBottom: '1rem',
              }}>
                Total rescue time
              </div>

              <div style={{
                display: 'flex',
                gap: '1.5rem',
                justifyContent: 'center',
              }}>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: survivalColor,
                  }}>
                    {survival.toFixed(0)}%
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs, 0.75rem)',
                    color: 'var(--mt-muted)',
                  }}>
                    Survival probability
                  </div>
                </div>
              </div>

              {elapsedSeconds <= 1080 ? (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  background: 'rgba(74, 222, 128, 0.1)',
                  border: '1px solid #4ADE80',
                  borderRadius: 6,
                  color: '#4ADE80',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm, 0.875rem)',
                  lineHeight: 1.7,
                }}>
                  You completed the rescue within the critical 18-minute window. At this time,
                  your partner has a strong chance of survival if their airway is clear.
                </div>
              ) : (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  background: 'rgba(204, 68, 68, 0.1)',
                  border: '1px solid var(--mt-danger)',
                  borderRadius: 6,
                  color: 'var(--mt-danger)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm, 0.875rem)',
                  lineHeight: 1.7,
                }}>
                  The rescue took longer than 18 minutes. Survival probability has dropped significantly.
                  This is why practice and efficiency are critical -- every second matters.
                </div>
              )}
            </div>

            {/* Key takeaways */}
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
                KEY FACTS
              </div>
              {[
                'Survival drops from 92% to 30% after 18 minutes buried',
                'The #1 cause of death shifts from trauma to asphyxiation after 10 minutes',
                'Organized rescue teams average 2+ hours to arrive -- your partner will almost certainly be dead',
                'Practice companion rescue until you can complete it in under 5 minutes',
                'Excavation takes the most time -- an average of 60% of total rescue time',
              ].map((fact, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'flex-start',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm, 0.875rem)',
                  color: 'var(--mt-bright)',
                  lineHeight: 1.6,
                }}>
                  <span style={{ color: 'var(--mt-danger)', fontWeight: 700, flexShrink: 0 }}>--</span>
                  <span>{fact}</span>
                </div>
              ))}
            </div>

            {/* Quiz */}
            <QuizBlock
              question="What is the most time-consuming phase of a companion rescue?"
              options={[
                { text: 'Signal search -- finding the initial beacon signal' },
                { text: 'Fine search -- zeroing in on the exact location' },
                { text: 'Probing -- confirming the burial location' },
                { text: 'Excavation -- digging the victim out of the debris', correct: true },
              ]}
              explanation="Excavation accounts for roughly 60% of total rescue time. Avalanche debris sets up like concrete within minutes. This is why shovel technique matters enormously: dig from the downhill side, create a ramp (not a vertical hole), and use a conveyor-belt system if multiple rescuers are present. A good shovel and efficient technique can cut excavation time in half."
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
                Module complete. Practice companion rescue regularly -- when it matters, you will not rise to the occasion, you will fall to the level of your training.
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
