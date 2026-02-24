'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveSlider from '../InteractiveSlider';
import QuizBlock from '../QuizBlock';
import DangerMeter from '../DangerMeter';

interface BetweenThermalsProps {
  onComplete: () => void;
}

interface TriggerPoint {
  distance: number; // km from start
  probability: number; // 0-1 chance of thermal
  strength: number; // m/s if found
  label: string;
  found: boolean;
}

type GamePhase = 'briefing' | 'flying' | 'result';

// Paraglider performance
const TRIM_SPEED = 38; // km/h
const MAX_SPEED = 54; // km/h (full bar)
const MIN_SINK_RATE = 1.1; // m/s at trim
const SAFE_ALTITUDE = 300; // meters - minimum to land safely

// Sink rate increases with speed (simplified polar)
function sinkRateAtSpeed(speed: number): number {
  const a = 0.0008;
  const b = -0.058;
  const c = 2.15;
  return a * speed * speed + b * speed + c;
}

// SVG dimensions
const SVG_W = 580;
const SVG_H = 260;
const PROFILE_LEFT = 60;
const PROFILE_RIGHT = SVG_W - 30;
const PROFILE_TOP = 30;
const PROFILE_BOTTOM = 220;
const PROFILE_W = PROFILE_RIGHT - PROFILE_LEFT;
const PROFILE_H = PROFILE_BOTTOM - PROFILE_TOP;

function generateTriggers(): TriggerPoint[] {
  return [
    { distance: 2.5, probability: 0.7, strength: 2.0, label: 'Dark field', found: false },
    { distance: 4.8, probability: 0.5, strength: 2.8, label: 'Ridge spur', found: false },
    { distance: 7.0, probability: 0.9, strength: 3.2, label: 'Town + ridge', found: false },
  ];
}

export default function BetweenThermals({ onComplete }: BetweenThermalsProps) {
  const [phase, setPhase] = useState<GamePhase>('briefing');
  const [speed, setSpeed] = useState(40); // km/h
  const [detour, setDetour] = useState(false);
  const [startAltitude] = useState(1800); // meters
  const [triggers, setTriggers] = useState<TriggerPoint[]>(generateTriggers);
  const [distanceCovered, setDistanceCovered] = useState(0);
  const [currentAltitude, setCurrentAltitude] = useState(1800);
  const [isFlying, setIsFlying] = useState(false);
  const [result, setResult] = useState<{ success: boolean; thermal: TriggerPoint | null; altRemaining: number; score: number } | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const totalRouteDistance = detour ? 8.5 : 7.5; // km, detour adds distance but passes closer to triggers

  // Distance to X coordinate
  const distToX = useCallback((d: number) => {
    return PROFILE_LEFT + (d / totalRouteDistance) * PROFILE_W;
  }, [totalRouteDistance]);

  // Altitude to Y coordinate
  const altToY = useCallback((alt: number) => {
    return PROFILE_TOP + (1 - (alt - SAFE_ALTITUDE * 0.5) / (startAltitude - SAFE_ALTITUDE * 0.5)) * PROFILE_H;
  }, [startAltitude]);

  // Calculate the glide path at current speed
  const glidePath = useMemo(() => {
    const sink = sinkRateAtSpeed(speed);
    const groundSpeed = detour ? speed * 0.92 : speed; // detour slightly reduces effective ground speed
    const points: { x: number; y: number; dist: number; alt: number }[] = [];
    let alt = startAltitude;
    for (let d = 0; d <= totalRouteDistance; d += 0.05) {
      const timeToReach = (d * 1000) / (groundSpeed / 3.6); // seconds
      alt = startAltitude - sink * timeToReach;
      if (alt < 0) break;
      points.push({ x: distToX(d), y: altToY(alt), dist: d, alt });
    }
    return points;
  }, [speed, startAltitude, totalRouteDistance, detour, distToX, altToY]);

  // Animation loop
  useEffect(() => {
    if (!isFlying) return;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = (timestamp - lastTimeRef.current) / 1000; // seconds
      lastTimeRef.current = timestamp;

      const sink = sinkRateAtSpeed(speed);
      const groundSpeed = detour ? speed * 0.92 : speed;

      setDistanceCovered(prev => {
        const newDist = prev + (groundSpeed / 3600) * delta * 8; // 8x speed multiplier
        return newDist;
      });
      setCurrentAltitude(prev => {
        const newAlt = prev - sink * delta * 8;
        return newAlt;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      lastTimeRef.current = 0;
    };
  }, [isFlying, speed, detour]);

  // Check for trigger encounters and game end
  useEffect(() => {
    if (!isFlying) return;

    // Check if we reached a trigger
    for (const trigger of triggers) {
      if (trigger.found) continue;
      const triggerDist = detour ? trigger.distance * 0.85 : trigger.distance; // detour passes closer
      const detourBonus = detour ? 0.15 : 0; // higher probability if detouring toward triggers

      if (Math.abs(distanceCovered - triggerDist) < 0.3) {
        const roll = Math.random();
        const effectiveProb = Math.min(1, trigger.probability + detourBonus);

        if (roll < effectiveProb && currentAltitude > SAFE_ALTITUDE) {
          // Found a thermal!
          setIsFlying(false);
          const altRemaining = currentAltitude;
          const score = Math.round((altRemaining / startAltitude) * 60 + (1 - distanceCovered / totalRouteDistance) * 40);
          const finalResult = { success: true, thermal: trigger, altRemaining, score };
          setResult(finalResult);
          setBestScore(prev => Math.max(prev, score));
          setAttempts(prev => prev + 1);
          setPhase('result');

          setTriggers(prev => prev.map(t => t === trigger ? { ...t, found: true } : t));

          if (attempts >= 1 || score > 50) {
            setTimeout(() => setShowQuiz(true), 800);
          }
          return;
        } else {
          setTriggers(prev => prev.map(t => t === trigger ? { ...t, found: true } : t));
        }
      }
    }

    // Check if altitude too low
    if (currentAltitude <= SAFE_ALTITUDE) {
      setIsFlying(false);
      setResult({ success: false, thermal: null, altRemaining: currentAltitude, score: 0 });
      setAttempts(prev => prev + 1);
      setPhase('result');
      if (attempts >= 1) {
        setTimeout(() => setShowQuiz(true), 800);
      }
    }

    // Check if past all triggers
    if (distanceCovered > totalRouteDistance) {
      setIsFlying(false);
      setResult({ success: false, thermal: null, altRemaining: currentAltitude, score: 0 });
      setAttempts(prev => prev + 1);
      setPhase('result');
      if (attempts >= 1) {
        setTimeout(() => setShowQuiz(true), 800);
      }
    }
  }, [isFlying, distanceCovered, currentAltitude, triggers, detour, startAltitude, totalRouteDistance, attempts]);

  const startFlight = useCallback(() => {
    setPhase('flying');
    setDistanceCovered(0);
    setCurrentAltitude(startAltitude);
    setTriggers(generateTriggers());
    setResult(null);
    setIsFlying(true);
  }, [startAltitude]);

  const retryFlight = useCallback(() => {
    setPhase('briefing');
    setDistanceCovered(0);
    setCurrentAltitude(startAltitude);
    setTriggers(generateTriggers());
    setResult(null);
  }, [startAltitude]);

  // Pilot position
  const pilotX = distToX(distanceCovered);
  const pilotY = altToY(currentAltitude);

  // Danger level based on altitude
  const dangerLevel = Math.max(0, Math.min(100, ((startAltitude - currentAltitude) / (startAltitude - SAFE_ALTITUDE)) * 100));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.95rem',
        lineHeight: 1.7,
        color: 'var(--mt-muted)',
      }}>
        You just topped out in a thermal. Ahead are three possible trigger points where
        thermals might form. Your altitude is finite. Choose your speed and decide: take a
        direct line or detour toward trigger points? Reach one with enough altitude to
        climb again.
      </div>

      <div className="mt-module-split">
        <div>
          {/* Flight profile SVG */}
          <div style={{
            background: 'var(--mt-surface)',
            border: '1px solid var(--mt-border)',
            borderRadius: 8,
            overflow: 'hidden',
          }}>
            <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} style={{ width: '100%', display: 'block' }}>
              {/* Background */}
              <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="var(--mt-void)" />

              {/* Grid */}
              {[0, 500, 1000, 1500].map(alt => (
                <g key={`alt-${alt}`}>
                  <line
                    x1={PROFILE_LEFT} y1={altToY(alt)}
                    x2={PROFILE_RIGHT} y2={altToY(alt)}
                    stroke="var(--mt-border)" strokeWidth={0.5} strokeDasharray="4,4"
                  />
                  <text
                    x={PROFILE_LEFT - 8} y={altToY(alt) + 4}
                    textAnchor="end" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)"
                  >
                    {alt}m
                  </text>
                </g>
              ))}

              {/* Safe altitude line */}
              <line
                x1={PROFILE_LEFT} y1={altToY(SAFE_ALTITUDE)}
                x2={PROFILE_RIGHT} y2={altToY(SAFE_ALTITUDE)}
                stroke="#EF4444" strokeWidth={1.5} strokeDasharray="6,3"
              />
              <text
                x={PROFILE_RIGHT + 2} y={altToY(SAFE_ALTITUDE) + 4}
                fill="#EF4444" fontSize={7} fontFamily="var(--font-mono)"
              >
                MIN
              </text>

              {/* Terrain profile (ground) */}
              <path
                d={`M ${PROFILE_LEFT} ${PROFILE_BOTTOM + 10}
                    L ${PROFILE_LEFT} ${PROFILE_BOTTOM}
                    Q ${PROFILE_LEFT + PROFILE_W * 0.15} ${PROFILE_BOTTOM - 8}, ${PROFILE_LEFT + PROFILE_W * 0.3} ${PROFILE_BOTTOM}
                    Q ${PROFILE_LEFT + PROFILE_W * 0.5} ${PROFILE_BOTTOM + 3}, ${PROFILE_LEFT + PROFILE_W * 0.65} ${PROFILE_BOTTOM - 5}
                    Q ${PROFILE_LEFT + PROFILE_W * 0.8} ${PROFILE_BOTTOM - 12}, ${PROFILE_LEFT + PROFILE_W * 0.9} ${PROFILE_BOTTOM - 3}
                    L ${PROFILE_RIGHT} ${PROFILE_BOTTOM}
                    L ${PROFILE_RIGHT} ${PROFILE_BOTTOM + 10} Z`}
                fill="#1a1a10"
                stroke="#2a2a18"
                strokeWidth={1}
              />

              {/* Predicted glide path */}
              {phase !== 'result' && glidePath.length > 1 && (
                <path
                  d={glidePath.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')}
                  fill="none"
                  stroke="var(--mt-flying)"
                  strokeWidth={1.5}
                  strokeDasharray="6,4"
                  opacity={0.5}
                />
              )}

              {/* Trigger points */}
              {triggers.map((trigger, i) => {
                const tx = distToX(detour ? trigger.distance * 0.85 : trigger.distance);
                const triggerColor = trigger.found
                  ? 'var(--mt-muted)'
                  : trigger.probability > 0.7 ? '#4ADE80' : trigger.probability > 0.5 ? '#F59E0B' : '#EF4444';

                return (
                  <g key={`trigger-${i}`}>
                    {/* Trigger column */}
                    <line
                      x1={tx} y1={PROFILE_TOP + 15}
                      x2={tx} y2={PROFILE_BOTTOM}
                      stroke={triggerColor} strokeWidth={1} strokeDasharray="3,5" opacity={trigger.found ? 0.3 : 0.5}
                    />
                    {/* Trigger marker */}
                    <rect
                      x={tx - 28} y={PROFILE_BOTTOM + 2}
                      width={56} height={14} rx={2}
                      fill="var(--mt-void)" stroke={triggerColor} strokeWidth={0.8}
                      opacity={trigger.found ? 0.4 : 1}
                    />
                    <text
                      x={tx} y={PROFILE_BOTTOM + 12}
                      textAnchor="middle" fill={triggerColor} fontSize={7} fontFamily="var(--font-mono)"
                      opacity={trigger.found ? 0.4 : 1}
                    >
                      {trigger.label}
                    </text>
                    {/* Probability badge */}
                    {!trigger.found && (
                      <g>
                        <rect
                          x={tx - 14} y={PROFILE_TOP + 5}
                          width={28} height={14} rx={3}
                          fill="var(--mt-void)" stroke={triggerColor} strokeWidth={0.6}
                        />
                        <text
                          x={tx} y={PROFILE_TOP + 15}
                          textAnchor="middle" fill={triggerColor} fontSize={7} fontFamily="var(--font-mono)" fontWeight={700}
                        >
                          {Math.round(trigger.probability * 100 + (detour ? 15 : 0))}%
                        </text>
                      </g>
                    )}
                    {/* Strength label */}
                    {!trigger.found && (
                      <text
                        x={tx} y={PROFILE_TOP + 30}
                        textAnchor="middle" fill="var(--mt-muted)" fontSize={6} fontFamily="var(--font-mono)"
                      >
                        {trigger.strength} m/s
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Actual flight path (traced so far) */}
              {phase === 'flying' && distanceCovered > 0 && (
                <line
                  x1={distToX(0)} y1={altToY(startAltitude)}
                  x2={pilotX} y2={pilotY}
                  stroke="var(--mt-flying)" strokeWidth={2}
                />
              )}

              {/* Pilot marker */}
              {(phase === 'flying' || phase === 'result') && (
                <motion.g
                  animate={{ x: 0, y: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  {/* Glider shape */}
                  <polygon
                    points={`${pilotX - 8},${pilotY + 2} ${pilotX},${pilotY - 4} ${pilotX + 8},${pilotY + 2}`}
                    fill="var(--mt-flying)"
                    stroke="var(--mt-void)"
                    strokeWidth={1}
                  />
                  {/* Altitude readout */}
                  <rect
                    x={pilotX + 12} y={pilotY - 10}
                    width={48} height={16} rx={3}
                    fill="var(--mt-void)" stroke="var(--mt-border)" strokeWidth={0.8}
                  />
                  <text
                    x={pilotX + 36} y={pilotY + 2}
                    textAnchor="middle" fill={currentAltitude < SAFE_ALTITUDE * 1.5 ? '#EF4444' : 'var(--mt-bright)'}
                    fontSize={9} fontFamily="var(--font-mono)" fontWeight={700}
                  >
                    {Math.round(currentAltitude)}m
                  </text>
                </motion.g>
              )}

              {/* Start position */}
              <circle cx={distToX(0)} cy={altToY(startAltitude)} r={5} fill="var(--mt-flying)" stroke="var(--mt-void)" strokeWidth={1.5} />

              {/* Title */}
              <text
                x={SVG_W / 2} y={16}
                textAnchor="middle" fill="var(--mt-bright)" fontSize={11} fontFamily="var(--font-display)" fontWeight={700}
              >
                GLIDE TO NEXT THERMAL
              </text>
            </svg>
          </div>
        </div>
        <div>
          {/* Danger meter */}
          {phase === 'flying' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <DangerMeter value={dangerLevel} label="Altitude reserve" />
            </div>
          )}

          {/* Controls */}
          {phase === 'briefing' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <InteractiveSlider
                label="Airspeed"
                min={TRIM_SPEED}
                max={MAX_SPEED}
                step={1}
                value={speed}
                onChange={setSpeed}
                formatValue={(v) => `${v} km/h (sink: ${sinkRateAtSpeed(v).toFixed(1)} m/s)`}
              />

              <div
                onClick={() => setDetour(!detour)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  background: detour ? 'rgba(232,168,124,0.08)' : 'var(--mt-surface)',
                  border: `1px solid ${detour ? 'var(--mt-flying)' : 'var(--mt-border)'}`,
                  borderRadius: 6,
                  cursor: 'pointer',
                  userSelect: 'none' as const,
                }}
              >
                <div style={{
                  width: 20, height: 20,
                  borderRadius: 4,
                  border: `2px solid ${detour ? 'var(--mt-flying)' : 'var(--mt-muted)'}`,
                  background: detour ? 'var(--mt-flying)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {detour && (
                    <svg width={12} height={12} viewBox="0 0 12 12">
                      <polyline points="2,6 5,9 10,3" fill="none" stroke="var(--mt-void)" strokeWidth={2} />
                    </svg>
                  )}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--mt-bright)', fontWeight: 600 }}>
                    Detour toward triggers
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--mt-muted)', marginTop: '0.15rem' }}>
                    Adds 1 km but increases probability of finding thermals by ~15%
                  </div>
                </div>
              </div>

              {/* Flight stats preview */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
              }}>
                {[
                  { label: 'Sink Rate', value: `${sinkRateAtSpeed(speed).toFixed(1)} m/s`, color: sinkRateAtSpeed(speed) > 1.8 ? '#F59E0B' : 'var(--mt-bright)' },
                  { label: 'Route Dist', value: `${totalRouteDistance.toFixed(1)} km`, color: 'var(--mt-bright)' },
                  { label: 'L/D at Speed', value: `${((speed / 3.6) / sinkRateAtSpeed(speed)).toFixed(1)}:1`, color: 'var(--mt-flying)' },
                ].map(item => (
                  <div key={item.label} style={{
                    background: 'var(--mt-surface)',
                    border: '1px solid var(--mt-border)',
                    borderRadius: 6,
                    padding: '0.6rem',
                  }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--mt-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: '0.2rem' }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: item.color }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={startFlight}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'transparent',
                  border: '1px solid var(--mt-flying)',
                  color: 'var(--mt-flying)',
                  borderRadius: 8,
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Launch Glide
              </button>

              {bestScore > 0 && (
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--mt-muted)',
                  textAlign: 'center',
                }}>
                  Best score: {bestScore} / 100 | Attempts: {attempts}
                </div>
              )}
            </motion.div>
          )}

          {/* Flying controls */}
          {phase === 'flying' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
            >
              <InteractiveSlider
                label="Adjust Speed (live)"
                min={TRIM_SPEED}
                max={MAX_SPEED}
                step={1}
                value={speed}
                onChange={setSpeed}
                formatValue={(v) => `${v} km/h`}
              />
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
              }}>
                <div style={{ color: 'var(--mt-muted)' }}>
                  Dist: <span style={{ color: 'var(--mt-bright)' }}>{distanceCovered.toFixed(1)} km</span>
                </div>
                <div style={{ color: 'var(--mt-muted)' }}>
                  Alt: <span style={{ color: currentAltitude < SAFE_ALTITUDE * 1.5 ? '#EF4444' : 'var(--mt-bright)' }}>{Math.round(currentAltitude)}m</span>
                </div>
                <div style={{ color: 'var(--mt-muted)' }}>
                  Sink: <span style={{ color: 'var(--mt-flying)' }}>{sinkRateAtSpeed(speed).toFixed(1)} m/s</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Result */}
          <AnimatePresence>
            {phase === 'result' && result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: result.success ? 'rgba(74,222,128,0.08)' : 'rgba(239,68,68,0.08)',
                  border: `1px solid ${result.success ? '#4ADE80' : '#EF4444'}`,
                  borderRadius: 8,
                  padding: '1.25rem',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: result.success ? '#4ADE80' : '#EF4444',
                  marginBottom: '0.5rem',
                }}>
                  {result.success ? 'Thermal found!' : 'Landed out'}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                  color: 'var(--mt-muted)',
                  marginBottom: '0.75rem',
                }}>
                  {result.success && result.thermal
                    ? `You reached "${result.thermal.label}" with ${Math.round(result.altRemaining)}m remaining. The thermal is ${result.thermal.strength} m/s. Score: ${result.score}/100.`
                    : `You ran out of altitude before reaching a thermal. ${currentAltitude > 0 ? 'At least you landed safely.' : 'You needed a better strategy.'}`
                  }
                </div>
                {result.success && (
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--mt-bright)',
                    marginBottom: '0.75rem',
                  }}>
                    Score: {result.score}/100 {result.score > 70 ? '- Excellent!' : result.score > 40 ? '- Good, try to optimize' : '- Try a different strategy'}
                  </div>
                )}
                <button
                  onClick={retryFlight}
                  style={{
                    padding: '0.6rem 1.25rem',
                    background: 'transparent',
                    border: '1px solid var(--mt-flying)',
                    color: 'var(--mt-flying)',
                    borderRadius: 6,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Strategy insight */}
          {attempts >= 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'var(--mt-muted)',
                padding: '0.75rem 1rem',
                background: 'var(--mt-surface)',
                border: '1px solid var(--mt-border)',
                borderRadius: 6,
                marginTop: '1.5rem',
              }}
            >
              <span style={{ color: 'var(--mt-bright)', fontWeight: 600 }}>Strategy tips:</span> Flying
              fast gets you to trigger points sooner but drains altitude faster. Flying slow conserves
              altitude but means less distance covered before you run out. The optimal approach:
              fly fast in sink (between triggers) and slow down when searching near a trigger point.
              Detouring costs distance but improves your odds of connecting with a thermal.
            </motion.div>
          )}

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
                  question="What is the primary trade-off when choosing your speed between thermals?"
                  options={[
                    { text: 'Comfort vs performance -- faster is less comfortable' },
                    { text: 'Speed vs altitude -- flying faster covers more ground but uses more altitude per kilometer', correct: true },
                    { text: 'Safety vs distance -- slower is always safer' },
                    { text: 'There is no trade-off -- always fly at trim speed' },
                  ]}
                  explanation="The fundamental trade-off is speed versus altitude. Flying faster increases your sink rate (you lose altitude faster per unit time), but you cover more ground. The McCready theory tells us that when strong thermals await, it pays to fly fast because the altitude lost will be quickly recovered. When thermals are weak or uncertain, conserving altitude by flying slower gives you more options. This is the essence of cross-country paragliding strategy."
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
