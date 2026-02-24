'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveSlider from '../InteractiveSlider';
import DangerMeter from '../DangerMeter';
import QuizBlock from '../QuizBlock';

interface WeatherLoadingSimulatorProps {
  onComplete: () => void;
}

type CompassDirection = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

const DIRECTIONS: CompassDirection[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
const DIRECTION_ANGLES: Record<CompassDirection, number> = {
  N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315,
};

function getOppositeDirection(dir: CompassDirection): CompassDirection {
  const idx = DIRECTIONS.indexOf(dir);
  return DIRECTIONS[(idx + 4) % 8];
}

function getLeeAspect(windDir: CompassDirection): string {
  const opposite = getOppositeDirection(windDir);
  return opposite;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
}

const SVG_WIDTH = 360;
const SVG_HEIGHT = 320;

// Mountain ridge profile points
const RIDGE_PEAK_X = SVG_WIDTH / 2;
const RIDGE_PEAK_Y = 80;
const RIDGE_LEFT_X = 40;
const RIDGE_LEFT_Y = 260;
const RIDGE_RIGHT_X = 320;
const RIDGE_RIGHT_Y = 260;

export default function WeatherLoadingSimulator({ onComplete }: WeatherLoadingSimulatorProps) {
  const [windDirection, setWindDirection] = useState<CompassDirection>('W');
  const [windSpeed, setWindSpeed] = useState(15);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [depositThickness, setDepositThickness] = useState(0);
  const [scourDepth, setScourDepth] = useState(0);
  const [quizPassed, setQuizPassed] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const nextId = useRef(0);
  const animFrameRef = useRef<number>(0);

  const leeAspect = getLeeAspect(windDirection);

  // Calculate danger based on wind speed and deposit thickness
  const dangerValue = useMemo(() => {
    const speedFactor = Math.min(windSpeed / 50, 1) * 50;
    const depositFactor = Math.min(depositThickness / 30, 1) * 50;
    return Math.min(100, speedFactor + depositFactor);
  }, [windSpeed, depositThickness]);

  // Wind angle relative to the ridge (for particle direction)
  const windAngle = DIRECTION_ANGLES[windDirection];
  // Determine if wind blows left-to-right or right-to-left across the ridge
  const windFromLeft = windAngle >= 180 && windAngle <= 360 || windAngle === 0 ? false : true;
  // Simplified: W, NW, SW, N blow left-to-right visually; E, NE, SE, S blow right-to-left
  const blowsRight = ['W', 'NW', 'SW'].includes(windDirection);
  const blowsLeft = ['E', 'NE', 'SE'].includes(windDirection);

  // Accumulate deposit over time based on wind speed
  useEffect(() => {
    if (windSpeed < 10) return;

    const interval = setInterval(() => {
      setDepositThickness(prev => {
        const rate = (windSpeed / 50) * 0.8;
        const maxDeposit = (windSpeed / 50) * 40;
        if (prev >= maxDeposit) return prev;
        return Math.min(maxDeposit, prev + rate);
      });
      setScourDepth(prev => {
        const rate = (windSpeed / 50) * 0.3;
        const maxScour = (windSpeed / 50) * 15;
        if (prev >= maxScour) return prev;
        return Math.min(maxScour, prev + rate);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [windSpeed]);

  // Generate wind particles
  useEffect(() => {
    if (windSpeed < 5) {
      setParticles([]);
      return;
    }

    const interval = setInterval(() => {
      setParticles(prev => {
        const filtered = prev.filter(p => {
          if (blowsRight) return p.x < SVG_WIDTH + 20;
          if (blowsLeft) return p.x > -20;
          return p.y < SVG_HEIGHT + 20;
        });

        // Spawn new particles
        const spawnCount = Math.floor(windSpeed / 10);
        const newParticles: Particle[] = [];
        for (let i = 0; i < spawnCount; i++) {
          const id = nextId.current++;
          if (blowsRight) {
            newParticles.push({
              id,
              x: -10 + Math.random() * 10,
              y: 20 + Math.random() * 180,
              speed: 2 + (windSpeed / 50) * 6 + Math.random() * 2,
              size: 1 + Math.random() * 2,
            });
          } else if (blowsLeft) {
            newParticles.push({
              id,
              x: SVG_WIDTH + Math.random() * 10,
              y: 20 + Math.random() * 180,
              speed: 2 + (windSpeed / 50) * 6 + Math.random() * 2,
              size: 1 + Math.random() * 2,
            });
          } else {
            // N/S winds -- particles move downward/upward
            newParticles.push({
              id,
              x: 40 + Math.random() * 280,
              y: windDirection === 'N' ? -10 : SVG_HEIGHT + 10,
              speed: 2 + (windSpeed / 50) * 4 + Math.random() * 2,
              size: 1 + Math.random() * 2,
            });
          }
        }

        // Move existing particles
        const moved = filtered.map(p => ({
          ...p,
          x: blowsRight ? p.x + p.speed : blowsLeft ? p.x - p.speed : p.x + (Math.random() - 0.5) * 2,
          y: blowsRight || blowsLeft
            ? p.y + (Math.random() - 0.5) * 1.5
            : windDirection === 'N' ? p.y + p.speed : p.y - p.speed,
        }));

        return [...moved, ...newParticles].slice(-60);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [windSpeed, windDirection, blowsRight, blowsLeft]);

  const handleWindSpeedChange = useCallback((val: number) => {
    setWindSpeed(val);
    if (!hasInteracted && val > 20) {
      setHasInteracted(true);
    }
  }, [hasInteracted]);

  const handleDirectionChange = useCallback((dir: CompassDirection) => {
    setWindDirection(dir);
    setDepositThickness(0);
    setScourDepth(0);
    if (!hasInteracted) setHasInteracted(true);
  }, [hasInteracted]);

  const handleQuizCorrect = useCallback(() => {
    setQuizPassed(true);
    onComplete();
  }, [onComplete]);

  // Deposit polygon on lee side
  const depositPoints = useMemo(() => {
    if (depositThickness <= 0) return '';
    const thickness = Math.min(depositThickness, 40);
    if (blowsRight) {
      // Lee side is on the right slope
      const baseTop = `${RIDGE_PEAK_X},${RIDGE_PEAK_Y}`;
      const baseBot = `${RIDGE_RIGHT_X},${RIDGE_RIGHT_Y}`;
      // Offset points inward (perpendicular to slope)
      const dx = RIDGE_RIGHT_X - RIDGE_PEAK_X;
      const dy = RIDGE_RIGHT_Y - RIDGE_PEAK_Y;
      const len = Math.sqrt(dx * dx + dy * dy);
      const nx = -dy / len;
      const ny = dx / len;
      const off = thickness * 0.6;
      const depositTop = `${RIDGE_PEAK_X + nx * off * 0.3},${RIDGE_PEAK_Y + ny * off * 0.3}`;
      const depositMid = `${RIDGE_PEAK_X + (RIDGE_RIGHT_X - RIDGE_PEAK_X) * 0.4 + nx * off},${RIDGE_PEAK_Y + (RIDGE_RIGHT_Y - RIDGE_PEAK_Y) * 0.4 + ny * off}`;
      const depositBot = `${RIDGE_RIGHT_X + nx * off * 0.2},${RIDGE_RIGHT_Y + ny * off * 0.2}`;
      return `${baseTop} ${depositTop} ${depositMid} ${depositBot} ${baseBot}`;
    } else if (blowsLeft) {
      // Lee side is on the left slope
      const baseTop = `${RIDGE_PEAK_X},${RIDGE_PEAK_Y}`;
      const baseBot = `${RIDGE_LEFT_X},${RIDGE_LEFT_Y}`;
      const dx = RIDGE_LEFT_X - RIDGE_PEAK_X;
      const dy = RIDGE_LEFT_Y - RIDGE_PEAK_Y;
      const len = Math.sqrt(dx * dx + dy * dy);
      const nx = dy / len;
      const ny = -dx / len;
      const off = thickness * 0.6;
      const depositTop = `${RIDGE_PEAK_X + nx * off * 0.3},${RIDGE_PEAK_Y + ny * off * 0.3}`;
      const depositMid = `${RIDGE_PEAK_X + (RIDGE_LEFT_X - RIDGE_PEAK_X) * 0.4 + nx * off},${RIDGE_PEAK_Y + (RIDGE_LEFT_Y - RIDGE_PEAK_Y) * 0.4 + ny * off}`;
      const depositBot = `${RIDGE_LEFT_X + nx * off * 0.2},${RIDGE_LEFT_Y + ny * off * 0.2}`;
      return `${baseTop} ${depositTop} ${depositMid} ${depositBot} ${baseBot}`;
    }
    return '';
  }, [depositThickness, blowsRight, blowsLeft]);

  // Scour effect on windward side
  const scourOpacity = useMemo(() => {
    return Math.min(scourDepth / 15, 0.6);
  }, [scourDepth]);

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <p style={{ color: 'var(--mt-bright)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
        Wind is the architect of avalanches. It scours snow from <strong>windward slopes</strong> and
        deposits it on <strong>lee slopes</strong>, creating dense, cohesive <strong>wind slabs</strong> that
        can fail catastrophically.
      </p>
      <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: 'var(--text-sm, 0.875rem)' }}>
        Set the wind direction and speed to see how snow loads onto lee slopes.
      </p>

      {/* Wind direction selector */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1.25rem',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs, 0.75rem)',
          color: 'var(--mt-muted)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
          minWidth: 100,
        }}>
          WIND FROM
        </div>
        <div style={{
          display: 'flex',
          gap: '0.25rem',
          flexWrap: 'wrap',
        }}>
          {DIRECTIONS.map(dir => (
            <button
              key={dir}
              onClick={() => handleDirectionChange(dir)}
              style={{
                padding: '0.4rem 0.6rem',
                background: windDirection === dir ? 'var(--mt-avalanche)' : 'var(--mt-surface)',
                color: windDirection === dir ? 'var(--mt-void)' : 'var(--mt-muted)',
                border: `1px solid ${windDirection === dir ? 'var(--mt-avalanche)' : 'var(--mt-border)'}`,
                borderRadius: 4,
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                fontWeight: windDirection === dir ? 700 : 400,
                cursor: 'pointer',
                minWidth: 32,
              }}
            >
              {dir}
            </button>
          ))}
        </div>
      </div>

      {/* Wind speed slider */}
      <div style={{ marginBottom: '1.25rem' }}>
        <InteractiveSlider
          label="Wind Speed"
          min={5}
          max={50}
          step={1}
          value={windSpeed}
          onChange={handleWindSpeedChange}
          unit=" km/h"
          formatValue={(v) => `${v} km/h`}
        />
      </div>

      <div className="mt-module-split">
        <div>
          {/* SVG Mountain Ridge */}
          <div style={{
            background: 'var(--mt-surface)',
            border: '1px solid var(--mt-border)',
            borderRadius: 8,
            padding: '1rem',
            marginBottom: '1.25rem',
            overflow: 'hidden',
          }}>
            <svg
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              width="100%"
              style={{ display: 'block' }}
            >
              {/* Sky background */}
              <defs>
                <linearGradient id="skyBg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0a1628" />
                  <stop offset="60%" stopColor="#1a2a4a" />
                  <stop offset="100%" stopColor="#2a3a4a" />
                </linearGradient>
                <clipPath id="mountainClip">
                  <polygon points={`${RIDGE_LEFT_X},${RIDGE_LEFT_Y} ${RIDGE_PEAK_X},${RIDGE_PEAK_Y} ${RIDGE_RIGHT_X},${RIDGE_RIGHT_Y} ${RIDGE_RIGHT_X},${SVG_HEIGHT} ${RIDGE_LEFT_X},${SVG_HEIGHT}`} />
                </clipPath>
              </defs>

              <rect x={0} y={0} width={SVG_WIDTH} height={SVG_HEIGHT} fill="url(#skyBg)" rx={4} />

              {/* Mountain */}
              <polygon
                points={`${RIDGE_LEFT_X},${RIDGE_LEFT_Y} ${RIDGE_PEAK_X},${RIDGE_PEAK_Y} ${RIDGE_RIGHT_X},${RIDGE_RIGHT_Y} ${RIDGE_RIGHT_X},${SVG_HEIGHT} ${RIDGE_LEFT_X},${SVG_HEIGHT}`}
                fill="#2a3028"
                stroke="var(--mt-border)"
                strokeWidth={1}
              />

              {/* Snow cover on mountain */}
              <polygon
                points={`${RIDGE_LEFT_X + 10},${RIDGE_LEFT_Y - 5} ${RIDGE_PEAK_X},${RIDGE_PEAK_Y - 3} ${RIDGE_RIGHT_X - 10},${RIDGE_RIGHT_Y - 5} ${RIDGE_RIGHT_X - 10},${RIDGE_RIGHT_Y} ${RIDGE_PEAK_X},${RIDGE_PEAK_Y + 5} ${RIDGE_LEFT_X + 10},${RIDGE_LEFT_Y}`}
                fill="rgba(220, 225, 235, 0.25)"
              />

              {/* Scour effect on windward side */}
              {scourOpacity > 0 && (blowsRight || blowsLeft) && (
                <polygon
                  points={blowsRight
                    ? `${RIDGE_LEFT_X + 10},${RIDGE_LEFT_Y - 5} ${RIDGE_PEAK_X},${RIDGE_PEAK_Y - 3} ${RIDGE_PEAK_X},${RIDGE_PEAK_Y + 5} ${RIDGE_LEFT_X + 10},${RIDGE_LEFT_Y}`
                    : `${RIDGE_PEAK_X},${RIDGE_PEAK_Y - 3} ${RIDGE_RIGHT_X - 10},${RIDGE_RIGHT_Y - 5} ${RIDGE_RIGHT_X - 10},${RIDGE_RIGHT_Y} ${RIDGE_PEAK_X},${RIDGE_PEAK_Y + 5}`}
                  fill="var(--mt-void)"
                  opacity={scourOpacity}
                />
              )}

              {/* Deposit on lee side */}
              {depositPoints && depositThickness > 1 && (
                <motion.polygon
                  points={depositPoints}
                  fill="rgba(230, 235, 245, 0.5)"
                  stroke="rgba(230, 235, 245, 0.3)"
                  strokeWidth={1}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Wind particles */}
              {particles.map(p => (
                <circle
                  key={p.id}
                  cx={p.x}
                  cy={p.y}
                  r={p.size}
                  fill="rgba(220, 225, 240, 0.6)"
                />
              ))}

              {/* Labels */}
              <text
                x={RIDGE_PEAK_X}
                y={RIDGE_PEAK_Y - 12}
                textAnchor="middle"
                fill="var(--mt-muted)"
                fontSize={9}
                fontFamily="var(--font-mono)"
              >
                RIDGE
              </text>

              {/* Windward / Lee labels */}
              {(blowsRight || blowsLeft) && (
                <>
                  <text
                    x={blowsRight ? RIDGE_LEFT_X + 50 : RIDGE_RIGHT_X - 50}
                    y={180}
                    textAnchor="middle"
                    fill="var(--mt-muted)"
                    fontSize={10}
                    fontFamily="var(--font-mono)"
                    fontWeight={700}
                    opacity={0.7}
                  >
                    WINDWARD
                  </text>
                  <text
                    x={blowsRight ? RIDGE_LEFT_X + 50 : RIDGE_RIGHT_X - 50}
                    y={195}
                    textAnchor="middle"
                    fill="var(--mt-muted)"
                    fontSize={8}
                    fontFamily="var(--font-mono)"
                    opacity={0.5}
                  >
                    (scoured)
                  </text>
                  <text
                    x={blowsRight ? RIDGE_RIGHT_X - 50 : RIDGE_LEFT_X + 50}
                    y={180}
                    textAnchor="middle"
                    fill="var(--mt-avalanche)"
                    fontSize={10}
                    fontFamily="var(--font-mono)"
                    fontWeight={700}
                    opacity={0.9}
                  >
                    LEE
                  </text>
                  <text
                    x={blowsRight ? RIDGE_RIGHT_X - 50 : RIDGE_LEFT_X + 50}
                    y={195}
                    textAnchor="middle"
                    fill="var(--mt-avalanche)"
                    fontSize={8}
                    fontFamily="var(--font-mono)"
                    opacity={0.7}
                  >
                    (loaded)
                  </text>
                </>
              )}

              {/* Wind direction arrow */}
              <g>
                <text
                  x={blowsRight ? 20 : SVG_WIDTH - 20}
                  y={40}
                  textAnchor={blowsRight ? 'start' : 'end'}
                  fill="var(--mt-bright)"
                  fontSize={10}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                >
                  WIND {windDirection}
                </text>
                <text
                  x={blowsRight ? 20 : SVG_WIDTH - 20}
                  y={54}
                  textAnchor={blowsRight ? 'start' : 'end'}
                  fill="var(--mt-muted)"
                  fontSize={9}
                  fontFamily="var(--font-mono)"
                >
                  {windSpeed} km/h
                </text>
              </g>

              {/* Ground */}
              <rect
                x={0}
                y={RIDGE_LEFT_Y}
                width={RIDGE_LEFT_X}
                height={SVG_HEIGHT - RIDGE_LEFT_Y}
                fill="#1a2018"
              />
              <rect
                x={RIDGE_RIGHT_X}
                y={RIDGE_RIGHT_Y}
                width={SVG_WIDTH - RIDGE_RIGHT_X}
                height={SVG_HEIGHT - RIDGE_RIGHT_Y}
                fill="#1a2018"
              />
            </svg>
          </div>
        </div>
        <div>
          {/* Danger meter */}
          <div style={{ marginBottom: '1.25rem' }}>
            <DangerMeter value={dangerValue} label="Wind Slab Danger" />
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '0.75rem',
            marginBottom: '1.25rem',
          }}>
            <div style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '0.75rem',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: 'var(--mt-muted)',
                letterSpacing: '0.08em',
                marginBottom: '0.25rem',
              }}>
                DEPOSIT
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: depositThickness > 15 ? 'var(--mt-danger)' : depositThickness > 5 ? '#F5A623' : 'var(--mt-bright)',
              }}>
                {depositThickness.toFixed(1)}cm
              </div>
            </div>
            <div style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '0.75rem',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: 'var(--mt-muted)',
                letterSpacing: '0.08em',
                marginBottom: '0.25rem',
              }}>
                LEE ASPECT
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--mt-avalanche)',
              }}>
                {leeAspect}
              </div>
            </div>
            <div style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '0.75rem',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: 'var(--mt-muted)',
                letterSpacing: '0.08em',
                marginBottom: '0.25rem',
              }}>
                EQUIVALENT
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: depositThickness > 10 ? 'var(--mt-danger)' : '#F5A623',
              }}>
                {(depositThickness * 10).toFixed(0)}cm
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: 'var(--mt-muted)',
                marginTop: '0.15rem',
              }}>
                natural snow
              </div>
            </div>
          </div>

          {/* Key fact */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--mt-border)',
            borderLeft: '3px solid var(--mt-avalanche)',
            borderRadius: '0 8px 8px 0',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs, 0.75rem)',
              color: 'var(--mt-avalanche)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              marginBottom: '0.35rem',
            }}>
              KEY FACT
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm, 0.875rem)',
              color: 'var(--mt-bright)',
              lineHeight: 1.7,
            }}>
              2cm of wind slab equals approximately 20cm of natural snowfall in terms of danger.
              Wind-deposited snow is dense, cohesive, and bonds poorly to the surface beneath it --
              creating the perfect recipe for slab avalanches.
            </div>
          </div>

          {/* Quiz */}
          {hasInteracted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <QuizBlock
                question="After a storm with strong westerly winds, which aspect slope is most likely to have dangerous wind slabs?"
                options={[
                  { text: 'West-facing slopes, because they receive the most wind' },
                  { text: 'East-facing slopes, because they are on the lee side of westerly winds', correct: true },
                  { text: 'South-facing slopes, because they receive the most solar radiation' },
                  { text: 'North-facing slopes, because they retain the most cold snow' },
                ]}
                explanation="Westerly winds blow FROM the west. Snow is scoured from west-facing (windward) slopes and deposited on east-facing (lee) slopes. The lee side receives wind-loaded snow that forms dense, dangerous wind slabs. Always think about where the wind has been depositing snow -- the lee side is where the danger concentrates."
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
                  Module complete. You understand wind loading and lee-slope danger.
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
