'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveSlider from '../InteractiveSlider';
import QuizBlock from '../QuizBlock';

interface ConvergenceSeaBreezeProps {
  onComplete: () => void;
}

interface SeaBreezeState {
  seaBreezeActive: boolean;
  frontPosition: number; // 0-100, percentage inland (0 = coast, 100 = deep inland)
  convergenceActive: boolean;
  convergenceStrength: number; // 0-1
  liftProfile: { coast: number; mid: number; front: number; inland: number };
  description: string;
  cloudBase: number; // relative height 0-1
  flyingAdvice: string;
}

function getSeaBreezeState(hour: number): SeaBreezeState {
  // hour: 8 = 8am, 18 = 6pm
  if (hour < 9.5) {
    // 8-9:30am: land warming, no sea breeze yet
    const t = (hour - 8) / 1.5;
    return {
      seaBreezeActive: false,
      frontPosition: 0,
      convergenceActive: false,
      convergenceStrength: 0,
      liftProfile: { coast: 0, mid: t * 0.2, front: 0, inland: t * 0.3 },
      description: 'Morning heating begins. The land warms faster than the sea, but the temperature differential is not yet strong enough to generate a sea breeze. Inland thermals start forming from sun-heated surfaces.',
      cloudBase: 0.3 + t * 0.1,
      flyingAdvice: 'Stay inland. Early thermals develop over dark terrain and south-facing slopes. No sea breeze influence yet.',
    };
  } else if (hour < 11.5) {
    // 9:30-11:30am: sea breeze begins at coast, front starts pushing inland
    const t = (hour - 9.5) / 2;
    return {
      seaBreezeActive: true,
      frontPosition: t * 20,
      convergenceActive: false,
      convergenceStrength: 0,
      liftProfile: { coast: 0.3 + t * 0.2, mid: 0.4, front: 0.2 + t * 0.3, inland: 0.5 },
      description: 'The sea breeze establishes along the coast. Cool maritime air pushes inland as rising warm air over land creates a low-pressure zone. The sea breeze front advances slowly, marked by a line of building cumulus.',
      cloudBase: 0.4 + t * 0.1,
      flyingAdvice: 'The sea breeze front is near the coast. Good thermals available inland ahead of the front. Watch for the advancing line of cumulus clouds.',
    };
  } else if (hour < 14) {
    // 11:30am-2pm: front pushes inland, convergence begins
    const t = (hour - 11.5) / 2.5;
    const frontPos = 20 + t * 40;
    return {
      seaBreezeActive: true,
      frontPosition: frontPos,
      convergenceActive: t > 0.3,
      convergenceStrength: Math.max(0, (t - 0.3) * 1.4),
      liftProfile: {
        coast: 0.3,
        mid: 0.4 + t * 0.2,
        front: 0.5 + t * 0.4,
        inland: 0.6 + t * 0.2,
      },
      description: t < 0.4
        ? 'The sea breeze front pushes further inland. Ahead of the front, valley thermals strengthen. Behind the front, the air is more stable and maritime.'
        : 'The sea breeze front meets inland thermal activity. Where these two air masses converge, strong lift develops. This convergence zone is marked by a line of towering cumulus clouds -- the best lift of the day.',
      cloudBase: 0.5 + t * 0.15,
      flyingAdvice: t < 0.4
        ? 'Position yourself inland, ahead of the advancing front. Thermals are strong here. Watch the cumulus line to track the front.'
        : 'The convergence zone is active. Position yourself AT or just ahead of the sea breeze front for the strongest lift. Climbs of 3-5 m/s are possible in the convergence.',
    };
  } else if (hour < 16.5) {
    // 2-4:30pm: peak convergence, front deep inland
    const t = (hour - 14) / 2.5;
    return {
      seaBreezeActive: true,
      frontPosition: 60 + t * 20,
      convergenceActive: true,
      convergenceStrength: 1 - t * 0.3,
      liftProfile: {
        coast: 0.2,
        mid: 0.3,
        front: 0.9 - t * 0.2,
        inland: 0.5 - t * 0.1,
      },
      description: 'The convergence zone is at its strongest. The sea breeze front has pushed deep inland, creating a well-defined line of convergence where maritime and continental air masses collide. Cloud development is vigorous along the front.',
      cloudBase: 0.65 - t * 0.05,
      flyingAdvice: 'Peak conditions at the convergence. The front is well inland now. Fly along the convergence line for extended ridge-like lift. Cross-country flights along the front can cover great distances.',
    };
  } else {
    // 4:30-6pm: weakening, front stalls
    const t = (hour - 16.5) / 1.5;
    return {
      seaBreezeActive: true,
      frontPosition: 80 - t * 5,
      convergenceActive: t < 0.6,
      convergenceStrength: Math.max(0, 0.5 - t * 0.8),
      liftProfile: {
        coast: 0.1,
        mid: 0.15,
        front: Math.max(0.1, 0.4 - t * 0.4),
        inland: 0.2 - t * 0.15,
      },
      description: 'The sea breeze weakens as the land cools. The convergence dissipates and thermals die. The front stalls and begins to retreat. Time to head home and find a landing.',
      cloudBase: 0.55 - t * 0.1,
      flyingAdvice: 'Conditions are deteriorating. Thermals are weak and the convergence is fading. Ensure you have a safe landing option. Do not commit to crossing valleys with waning lift.',
    };
  }
}

function formatHour(h: number): string {
  const whole = Math.floor(h);
  const mins = Math.round((h - whole) * 60);
  const period = whole >= 12 ? 'PM' : 'AM';
  const display = whole > 12 ? whole - 12 : whole;
  return `${display}:${mins.toString().padStart(2, '0')} ${period}`;
}

export default function ConvergenceSeaBreeze({ onComplete }: ConvergenceSeaBreezeProps) {
  const [time, setTime] = useState(12);
  const [exploredPhases, setExploredPhases] = useState<Set<string>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);

  const state = useMemo(() => getSeaBreezeState(time), [time]);

  const handleTimeChange = useCallback((value: number) => {
    setTime(value);
    setExploredPhases(prev => {
      const next = new Set(prev);
      if (value < 10) next.add('morning');
      else if (value < 12) next.add('onset');
      else if (value < 15) next.add('convergence');
      else next.add('decay');
      if (next.size >= 3 && !showQuiz) {
        setTimeout(() => setShowQuiz(true), 500);
      }
      return next;
    });
  }, [showQuiz]);

  // SVG dimensions
  const W = 600;
  const H = 300;

  // Front position in pixels
  const frontX = 100 + (state.frontPosition / 100) * 400;

  // Lift profile bar chart data
  const liftPositions = [
    { label: 'Coast', x: 130, value: state.liftProfile.coast },
    { label: 'Mid', x: 230, value: state.liftProfile.mid },
    { label: 'Front', x: 330, value: state.liftProfile.front },
    { label: 'Inland', x: 430, value: state.liftProfile.inland },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.95rem',
        lineHeight: 1.7,
        color: 'var(--mt-muted)',
      }}>
        Near coastlines, the sea breeze creates one of the most powerful convergence zones in
        thermal flying. When cool maritime air collides with warm inland thermals, the result
        is a line of strong, organized lift. Timing and position are everything.
      </div>

      <div className="mt-module-split">
        <div>
          {/* Cross-section SVG */}
          <div style={{
            background: 'var(--mt-surface)',
            border: '1px solid var(--mt-border)',
            borderRadius: 8,
            overflow: 'hidden',
          }}>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block' }}>
              <defs>
                <linearGradient id="csb-sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2a5080" />
                  <stop offset="100%" stopColor="#6aa0d0" />
                </linearGradient>
                <linearGradient id="csb-ocean" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a3a60" />
                  <stop offset="100%" stopColor="#0f2440" />
                </linearGradient>
                <linearGradient id="csb-land" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2a2a18" />
                  <stop offset="100%" stopColor="#1a1a10" />
                </linearGradient>
                <marker id="csb-arrow" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
                  <polygon points="0 0, 7 2.5, 0 5" fill="#7BA7CC" />
                </marker>
                <marker id="csb-arrow-warm" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
                  <polygon points="0 0, 7 2.5, 0 5" fill="#F5A623" />
                </marker>
              </defs>

              {/* Sky */}
              <rect x={0} y={0} width={W} height={H} fill="url(#csb-sky)" />

              {/* Ocean */}
              <rect x={0} y={220} width={100} height={80} fill="url(#csb-ocean)" />
              {/* Waves */}
              <path d="M 0 230 Q 25 225, 50 230 Q 75 235, 100 230" fill="none" stroke="#2a5a90" strokeWidth={1} opacity={0.4} />
              <path d="M 0 245 Q 25 240, 50 245 Q 75 250, 100 245" fill="none" stroke="#2a5a90" strokeWidth={1} opacity={0.3} />

              {/* Coastline */}
              <line x1={100} y1={0} x2={100} y2={H} stroke="#4a6a40" strokeWidth={2} />

              {/* Land - slight elevation increase toward mountains */}
              <polygon points="100,220 600,220 600,300 100,300" fill="url(#csb-land)" />
              {/* Mountains far inland */}
              <polygon points="500,220 540,140 580,170 600,130 600,220" fill="#2a2820" />
              <polygon points="540,140 555,160 580,170" fill="#353025" opacity={0.5} />

              {/* Sun */}
              <circle cx={300} cy={30} r={14} fill="#F5C542" />

              {/* Sea breeze arrows (horizontal, from sea to land) */}
              {state.seaBreezeActive && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 0.5 }}
                >
                  {[0, 1, 2, 3].map(i => {
                    const arrowX = 30 + i * 30;
                    if (arrowX > frontX - 20) return null;
                    return (
                      <line
                        key={`sb-${i}`}
                        x1={arrowX} y1={200}
                        x2={arrowX + 20} y2={200}
                        stroke="#7BA7CC" strokeWidth={1.8} markerEnd="url(#csb-arrow)"
                      />
                    );
                  })}
                  {/* More arrows past coast */}
                  {[0, 1, 2, 3, 4, 5, 6].map(i => {
                    const arrowX = 110 + i * 40;
                    if (arrowX > frontX - 20) return null;
                    return (
                      <line
                        key={`sb-land-${i}`}
                        x1={arrowX} y1={205}
                        x2={arrowX + 25} y2={205}
                        stroke="#7BA7CC" strokeWidth={1.5} markerEnd="url(#csb-arrow)"
                      />
                    );
                  })}
                  <text x={60} y={190} textAnchor="middle" fill="#7BA7CC" fontSize={7} fontFamily="var(--font-mono)">
                    SEA BREEZE
                  </text>
                </motion.g>
              )}

              {/* Inland thermal arrows (vertical, rising) */}
              {[0, 1, 2].map(i => {
                const tX = frontX + 40 + i * 60;
                if (tX > 550) return null;
                const strength = tX < frontX + 80 ? state.liftProfile.front : state.liftProfile.inland;
                if (strength < 0.1) return null;
                return (
                  <motion.line
                    key={`th-${i}`}
                    x1={tX} y1={200}
                    x2={tX} y2={200 - strength * 80}
                    stroke="#F5A623" strokeWidth={1.8} markerEnd="url(#csb-arrow-warm)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: strength * 0.8 }}
                    transition={{ duration: 0.4 }}
                  />
                );
              })}

              {/* Convergence front line */}
              {state.seaBreezeActive && (
                <motion.g
                  animate={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.line
                    x1={frontX} y1={40}
                    x2={frontX} y2={220}
                    stroke={state.convergenceActive ? '#4ADE80' : '#F59E0B'}
                    strokeWidth={state.convergenceActive ? 2.5 : 1.5}
                    strokeDasharray={state.convergenceActive ? '0' : '6,4'}
                    animate={{
                      x1: frontX,
                      x2: frontX,
                      opacity: state.convergenceActive ? [0.6, 1, 0.6] : 0.5,
                    }}
                    transition={state.convergenceActive
                      ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.3 }
                    }
                  />
                  <text
                    x={frontX} y={35}
                    textAnchor="middle"
                    fill={state.convergenceActive ? '#4ADE80' : '#F59E0B'}
                    fontSize={8} fontFamily="var(--font-mono)" fontWeight={700}
                  >
                    {state.convergenceActive ? 'CONVERGENCE ZONE' : 'SEA BREEZE FRONT'}
                  </text>
                </motion.g>
              )}

              {/* Cumulus clouds at convergence */}
              {state.convergenceActive && (
                <motion.g
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: state.convergenceStrength * 0.8, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {[-20, 0, 20].map((offset, i) => {
                    const cx = frontX + offset;
                    const cy = 60 + i * 8;
                    const size = 12 + state.convergenceStrength * 10;
                    return (
                      <g key={`cloud-${i}`}>
                        <ellipse cx={cx} cy={cy} rx={size * 1.2} ry={size * 0.7} fill="rgba(220,230,240,0.5)" />
                        <ellipse cx={cx - size * 0.6} cy={cy - size * 0.3} rx={size * 0.8} ry={size * 0.5} fill="rgba(220,230,240,0.4)" />
                        <ellipse cx={cx + size * 0.5} cy={cy - size * 0.2} rx={size * 0.9} ry={size * 0.55} fill="rgba(220,230,240,0.4)" />
                      </g>
                    );
                  })}
                </motion.g>
              )}

              {/* Convergence updraft */}
              {state.convergenceActive && state.convergenceStrength > 0.2 && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: state.convergenceStrength * 0.7 }}
                  transition={{ duration: 0.4 }}
                >
                  {[0, 1, 2].map(i => (
                    <line
                      key={`conv-up-${i}`}
                      x1={frontX - 8 + i * 8} y1={200}
                      x2={frontX - 8 + i * 8} y2={80}
                      stroke="#4ADE80" strokeWidth={2} markerEnd="url(#csb-arrow-warm)"
                      strokeDasharray="4,3"
                    />
                  ))}
                </motion.g>
              )}

              {/* Best flying position marker */}
              {state.seaBreezeActive && (
                <motion.g
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <rect
                    x={state.convergenceActive ? frontX - 30 : frontX + 20}
                    y={140}
                    width={50} height={18} rx={3}
                    fill="rgba(74,222,128,0.15)" stroke="#4ADE80" strokeWidth={1}
                  />
                  <text
                    x={state.convergenceActive ? frontX - 5 : frontX + 45}
                    y={153}
                    textAnchor="middle" fill="#4ADE80" fontSize={7} fontFamily="var(--font-mono)" fontWeight={700}
                  >
                    FLY HERE
                  </text>
                </motion.g>
              )}

              {/* Labels */}
              <text x={50} y={260} textAnchor="middle" fill="var(--mt-muted)" fontSize={9} fontFamily="var(--font-mono)">OCEAN</text>
              <text x={350} y={240} textAnchor="middle" fill="var(--mt-muted)" fontSize={9} fontFamily="var(--font-mono)">LAND</text>
              <text x={560} y={135} textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">MOUNTAINS</text>

              {/* Time label */}
              <text x={300} y={18} textAnchor="middle" fill="var(--mt-bright)" fontSize={12} fontFamily="var(--font-display)" fontWeight={700}>
                {formatHour(time)}
              </text>
            </svg>
          </div>
        </div>
        <div>
          {/* Lift strength chart */}
          <div style={{
            background: 'var(--mt-surface)',
            border: '1px solid var(--mt-border)',
            borderRadius: 8,
            padding: '0.75rem 1rem',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--mt-muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              marginBottom: '0.75rem',
            }}>
              Lift Strength by Position
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: 60 }}>
              {liftPositions.map(pos => {
                const barHeight = Math.max(2, pos.value * 55);
                const isConvergence = pos.label === 'Front' && state.convergenceActive;
                return (
                  <div key={pos.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      color: isConvergence ? '#4ADE80' : 'var(--mt-muted)',
                    }}>
                      {(pos.value * 4).toFixed(1)}
                    </div>
                    <motion.div
                      animate={{ height: barHeight }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: '100%',
                        maxWidth: 40,
                        background: isConvergence
                          ? 'linear-gradient(to top, rgba(74,222,128,0.3), rgba(74,222,128,0.6))'
                          : pos.value > 0.5
                            ? 'linear-gradient(to top, rgba(245,166,35,0.2), rgba(245,166,35,0.5))'
                            : 'linear-gradient(to top, rgba(138,135,128,0.1), rgba(138,135,128,0.3))',
                        border: `1px solid ${isConvergence ? '#4ADE80' : pos.value > 0.5 ? '#F5A623' : 'var(--mt-border)'}`,
                        borderRadius: '3px 3px 0 0',
                      }}
                    />
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      color: isConvergence ? '#4ADE80' : 'var(--mt-muted)',
                      fontWeight: isConvergence ? 700 : 400,
                    }}>
                      {pos.label}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--mt-muted)',
              textAlign: 'right',
              marginTop: '0.25rem',
            }}>
              m/s
            </div>
          </div>

          {/* Time slider */}
          <div style={{ marginTop: '1.5rem' }}>
            <InteractiveSlider
              label="Time of Day"
              min={8}
              max={18}
              step={0.25}
              value={time}
              onChange={handleTimeChange}
              formatValue={(v) => formatHour(v)}
            />
          </div>

          {/* Description + advice */}
          <motion.div
            key={state.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem',
              lineHeight: 1.65,
              color: 'var(--mt-muted)',
              padding: '0.75rem 1rem',
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 6,
              marginTop: '1.5rem',
            }}
          >
            {state.description}
          </motion.div>

          <motion.div
            key={state.flyingAdvice}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              lineHeight: 1.6,
              color: 'var(--mt-flying)',
              padding: '0.75rem 1rem',
              background: 'rgba(232,168,124,0.06)',
              border: '1px solid rgba(232,168,124,0.2)',
              borderRadius: 6,
              marginTop: '1.5rem',
            }}
          >
            {state.flyingAdvice}
          </motion.div>

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
                  question="What happens when the sea breeze front meets rising valley thermals?"
                  options={[
                    { text: 'The thermals are suppressed by the cool maritime air' },
                    { text: 'Nothing special -- the two air masses mix smoothly' },
                    { text: 'A convergence zone forms with strong, organized lift where the two air masses collide', correct: true },
                    { text: 'The sea breeze reverses direction and flows back to sea' },
                  ]}
                  explanation="When the cool, dense sea breeze air meets the warm, rising thermal air inland, neither can pass through the other. The warm air is forced upward along the boundary, creating a convergence zone with strong, organized lift. This zone is often marked by a line of cumulus clouds and can produce climbs of 3-5 m/s. Skilled pilots fly along this line for long cross-country distances."
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
