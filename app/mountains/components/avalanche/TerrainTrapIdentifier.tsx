'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DangerMeter from '../DangerMeter';
import QuizBlock from '../QuizBlock';

interface TerrainTrapIdentifierProps {
  onComplete: () => void;
}

const SVG_W = 400;
const SVG_H = 400;

interface TrapZone {
  id: number;
  name: string;
  description: string;
  danger: string;
  burialImpact: string;
  x: number;
  y: number;
  width: number;
  height: number;
  amplification: number; // 0-100 how much this amplifies danger
}

const TRAP_ZONES: TrapZone[] = [
  {
    id: 0,
    name: 'Gully',
    description: 'A narrow channel that concentrates avalanche debris into a compressed mass.',
    danger: 'Debris funnels and compresses, dramatically increasing burial depth. Even a small slide can bury a victim 2-3 meters deep.',
    burialImpact: 'Burial depth 3-5x deeper than open slope',
    x: 60,
    y: 80,
    width: 50,
    height: 80,
    amplification: 90,
  },
  {
    id: 1,
    name: 'Cliff Band',
    description: 'A vertical rock face below an avalanche path.',
    danger: 'Even a small avalanche can sweep victims over cliffs, turning a survivable slide into a fatal fall. Trauma kills before burial.',
    burialImpact: 'Fall trauma + burial. Often fatal regardless of burial depth.',
    x: 170,
    y: 50,
    width: 60,
    height: 40,
    amplification: 95,
  },
  {
    id: 2,
    name: 'Creek Bed',
    description: 'A depression where a stream or creek runs through the terrain.',
    danger: 'Debris fills the depression first, burying anyone in the creek bed under maximum depth. Water and ice add weight.',
    burialImpact: 'Burial depth 2-4x normal. Water/ice complicates rescue.',
    x: 280,
    y: 180,
    width: 70,
    height: 35,
    amplification: 75,
  },
  {
    id: 3,
    name: 'Rollover',
    description: 'A convex terrain feature where the slope abruptly steepens.',
    danger: 'Skiers often stop just below rollovers without seeing the avalanche path above. Also a common trigger point due to thin snowpack.',
    burialImpact: 'Caught unaware. No time to react.',
    x: 90,
    y: 220,
    width: 65,
    height: 45,
    amplification: 70,
  },
  {
    id: 4,
    name: 'Dense Trees',
    description: 'A thick stand of trees at the bottom of a slope.',
    danger: 'Avalanche debris wraps around and piles up against trees, anchoring the victim in place. Tree wells create additional burial hazards.',
    burialImpact: 'Pinned against trees. Extremely difficult extraction.',
    x: 300,
    y: 290,
    width: 60,
    height: 60,
    amplification: 65,
  },
  {
    id: 5,
    name: 'Flat-to-Steep Transition',
    description: 'Where a flat approach suddenly transitions to a steep slope above.',
    danger: 'People congregate at the base thinking they are safe. Debris from above buries groups. The flat terrain causes rapid deceleration and deep piling.',
    burialImpact: 'Debris deceleration zone. Maximum depth deposition.',
    x: 170,
    y: 310,
    width: 80,
    height: 40,
    amplification: 80,
  },
];

export default function TerrainTrapIdentifier({ onComplete }: TerrainTrapIdentifierProps) {
  const [foundTraps, setFoundTraps] = useState<Set<number>>(new Set());
  const [selectedTrap, setSelectedTrap] = useState<number | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const handleTrapClick = (id: number) => {
    setFoundTraps(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setSelectedTrap(id);
  };

  const handleQuizCorrect = () => {
    setQuizCorrect(true);
    onComplete();
  };

  const cumulativeDanger = useMemo(() => {
    if (foundTraps.size === 0) return 0;
    const total = Array.from(foundTraps).reduce((sum, id) => sum + TRAP_ZONES[id].amplification, 0);
    return Math.min(100, Math.round(total / foundTraps.size));
  }, [foundTraps]);

  const selectedData = selectedTrap !== null ? TRAP_ZONES[selectedTrap] : null;
  const allFound = foundTraps.size === TRAP_ZONES.length;

  // Contour lines for topo effect
  const contourLines = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 12; i++) {
      const cx = SVG_W / 2 + (i % 3 - 1) * 40;
      const cy = SVG_H / 2 + Math.floor(i / 3) * 30 - 45;
      const rx = 60 + i * 12;
      const ry = 40 + i * 8;
      lines.push({ cx, cy, rx, ry });
    }
    return lines;
  }, []);

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <p style={{ color: 'var(--mt-bright)', lineHeight: 1.7, marginBottom: '1rem' }}>
        <strong>Terrain traps</strong> are features that amplify the consequences of even small
        avalanches. A size 1 avalanche (barely enough to bury a person) becomes lethal when it
        deposits debris into a gully, over a cliff, or against trees.
      </p>
      <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        Study this topographic map and click to identify the 6 hidden terrain traps. Each zone
        reveals the trap type and explains why it amplifies danger.
      </p>

      {/* Progress indicator */}
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
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs, 0.75rem)', color: 'var(--mt-muted)' }}>
          TRAPS IDENTIFIED
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {TRAP_ZONES.map((_, i) => (
            <div key={i} style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: foundTraps.has(i) ? 'var(--mt-danger)' : 'var(--mt-border)',
              transition: 'background 0.3s ease',
            }} />
          ))}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs, 0.75rem)', color: 'var(--mt-bright)', marginLeft: '0.5rem' }}>
            {foundTraps.size}/{TRAP_ZONES.length}
          </span>
        </div>
      </div>

      <div className="mt-module-split">
        <div>
          {/* SVG Topo Map */}
          <div style={{
            background: 'var(--mt-surface)',
            border: '1px solid var(--mt-border)',
            borderRadius: 8,
            padding: '1rem',
            marginBottom: '1.5rem',
            overflow: 'hidden',
            cursor: 'crosshair',
          }}>
            <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: 'block' }}>
              {/* Background */}
              <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="var(--mt-void)" />

              {/* Contour lines */}
              {contourLines.map((line, i) => (
                <ellipse
                  key={`contour-${i}`}
                  cx={line.cx}
                  cy={line.cy}
                  rx={line.rx}
                  ry={line.ry}
                  fill="none"
                  stroke="var(--mt-border)"
                  strokeWidth={0.8}
                  opacity={0.6}
                />
              ))}

              {/* Elevation markers */}
              <text x={SVG_W / 2} y={SVG_H / 2 - 60} textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)" opacity={0.5}>3200m</text>
              <text x={SVG_W / 2 + 80} y={SVG_H / 2} textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)" opacity={0.5}>2800m</text>
              <text x={SVG_W / 2 - 30} y={SVG_H / 2 + 80} textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)" opacity={0.5}>2400m</text>

              {/* Ridge lines */}
              <line x1={100} y1={30} x2={200} y2={200} stroke="var(--mt-border)" strokeWidth={1.5} strokeDasharray="8,4" opacity={0.4} />
              <line x1={300} y1={40} x2={200} y2={200} stroke="var(--mt-border)" strokeWidth={1.5} strokeDasharray="8,4" opacity={0.4} />

              {/* Gully representation - narrow V lines */}
              <line x1={85} y1={70} x2={75} y2={160} stroke="var(--mt-border)" strokeWidth={1} opacity={0.5} />
              <line x1={85} y1={70} x2={95} y2={160} stroke="var(--mt-border)" strokeWidth={1} opacity={0.5} />

              {/* Creek bed representation - wavy line */}
              <path d="M 270 170 Q 290 185 280 200 Q 270 215 290 230" fill="none" stroke="rgba(123,167,204,0.3)" strokeWidth={1} />

              {/* Cliff band representation - hatched area */}
              {[0, 1, 2, 3, 4].map(i => (
                <line key={`cliff-${i}`} x1={170 + i * 12} y1={52} x2={175 + i * 12} y2={88} stroke="var(--mt-muted)" strokeWidth={0.8} opacity={0.3} />
              ))}

              {/* Dense trees representation */}
              {[0, 1, 2, 3, 4, 5].map(i => (
                <circle key={`tree-${i}`} cx={310 + (i % 3) * 15} cy={300 + Math.floor(i / 3) * 18} r={5} fill="none" stroke="rgba(74, 222, 128, 0.2)" strokeWidth={1} />
              ))}

              {/* Trap zones - clickable */}
              {TRAP_ZONES.map((trap) => {
                const found = foundTraps.has(trap.id);
                const isSelected = selectedTrap === trap.id;

                return (
                  <g key={trap.id} onClick={() => handleTrapClick(trap.id)} style={{ cursor: 'pointer' }}>
                    {/* Clickable area */}
                    <rect
                      x={trap.x}
                      y={trap.y}
                      width={trap.width}
                      height={trap.height}
                      fill={found ? 'rgba(204, 68, 68, 0.15)' : 'transparent'}
                      stroke={found ? 'var(--mt-danger)' : 'transparent'}
                      strokeWidth={isSelected ? 2 : 1}
                      strokeDasharray={found ? 'none' : '4,4'}
                      rx={4}
                    />

                    {/* Hover hint for unfound traps */}
                    {!found && (
                      <rect
                        x={trap.x}
                        y={trap.y}
                        width={trap.width}
                        height={trap.height}
                        fill="rgba(255,255,255,0.02)"
                        rx={4}
                        className="trap-hint"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.3;0.8;0.3"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </rect>
                    )}

                    {/* Found label */}
                    {found && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <text
                          x={trap.x + trap.width / 2}
                          y={trap.y + trap.height / 2 + 4}
                          textAnchor="middle"
                          fill="var(--mt-danger)"
                          fontSize={9}
                          fontFamily="var(--font-mono)"
                          fontWeight={700}
                        >
                          {trap.name.toUpperCase()}
                        </text>
                      </motion.g>
                    )}

                    {/* Danger icon for found traps */}
                    {found && (
                      <motion.circle
                        cx={trap.x + trap.width - 6}
                        cy={trap.y + 6}
                        r={4}
                        fill="var(--mt-danger)"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        style={{ transformOrigin: `${trap.x + trap.width - 6}px ${trap.y + 6}px` }}
                      />
                    )}
                  </g>
                );
              })}

              {/* Compass */}
              <g transform={`translate(${SVG_W - 30}, 30)`}>
                <circle cx={0} cy={0} r={14} fill="none" stroke="var(--mt-border)" strokeWidth={1} />
                <text x={0} y={-4} textAnchor="middle" fill="var(--mt-bright)" fontSize={8} fontFamily="var(--font-mono)" fontWeight={700}>N</text>
                <line x1={0} y1={2} x2={0} y2={10} stroke="var(--mt-muted)" strokeWidth={1} />
              </g>

              {/* Scale bar */}
              <g transform={`translate(20, ${SVG_H - 20})`}>
                <line x1={0} y1={0} x2={60} y2={0} stroke="var(--mt-muted)" strokeWidth={1} />
                <line x1={0} y1={-3} x2={0} y2={3} stroke="var(--mt-muted)" strokeWidth={1} />
                <line x1={60} y1={-3} x2={60} y2={3} stroke="var(--mt-muted)" strokeWidth={1} />
                <text x={30} y={-6} textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">200m</text>
              </g>
            </svg>
          </div>
        </div>
        <div>
          {/* Trap detail card */}
          <AnimatePresence mode="wait">
            {selectedData && (
              <motion.div
                key={selectedTrap}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-danger)',
                  borderRadius: 8,
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '0.75rem',
                }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs, 0.75rem)', color: 'var(--mt-muted)', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                      TERRAIN TRAP
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg, 1.25rem)', color: 'var(--mt-bright)' }}>
                      {selectedData.name}
                    </div>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs, 0.75rem)',
                    color: 'var(--mt-danger)',
                    padding: '0.2rem 0.5rem',
                    border: '1px solid var(--mt-danger)',
                    borderRadius: 4,
                  }}>
                    +{selectedData.amplification}% DANGER
                  </div>
                </div>

                <p style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-sm, 0.875rem)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                  {selectedData.description}
                </p>

                <div style={{
                  background: 'rgba(204, 68, 68, 0.08)',
                  border: '1px solid rgba(204, 68, 68, 0.2)',
                  borderRadius: 6,
                  padding: '0.75rem',
                  marginBottom: '0.75rem',
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs, 0.75rem)', color: 'var(--mt-danger)', marginBottom: '0.25rem', letterSpacing: '0.05em' }}>
                    WHY IT IS DANGEROUS
                  </div>
                  <p style={{ color: 'var(--mt-bright)', fontSize: 'var(--text-sm, 0.875rem)', lineHeight: 1.6, margin: 0 }}>
                    {selectedData.danger}
                  </p>
                </div>

                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs, 0.75rem)',
                  color: 'var(--mt-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  <span style={{ color: 'var(--mt-danger)' }}>BURIAL:</span> {selectedData.burialImpact}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Consequence meter */}
          <div style={{ marginBottom: '1.5rem' }}>
            <DangerMeter value={cumulativeDanger} label="Terrain Trap Consequence Amplification" />
          </div>

          {/* All found message */}
          {allFound && !quizCorrect && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--mt-border)',
                borderRadius: 8,
                padding: '1rem',
                marginBottom: '1.5rem',
                color: 'var(--mt-muted)',
                fontSize: 'var(--text-sm, 0.875rem)',
                lineHeight: 1.7,
              }}
            >
              All 6 terrain traps identified. The key takeaway: <strong style={{ color: 'var(--mt-bright)' }}>avalanche size is not the
              only factor in survival</strong>. A small slide into a terrain trap can be more deadly than a
              large slide on open terrain because debris concentrates, burial is deeper, and rescue is
              harder.
            </motion.div>
          )}

          {/* Quiz */}
          {allFound && !quizCorrect && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <QuizBlock
                question="Why is a small avalanche into a terrain trap potentially more deadly than a large avalanche on open terrain?"
                options={[
                  { text: 'Small avalanches move faster and are harder to escape' },
                  { text: 'Terrain traps concentrate debris, increasing burial depth and complicating rescue', correct: true },
                  { text: 'Large avalanches on open terrain are always survivable' },
                  { text: 'Terrain traps cause the avalanche to grow in size' },
                ]}
                explanation="Terrain traps concentrate avalanche debris into confined spaces -- gullies funnel snow, creek beds fill with debris, cliffs add trauma, trees pin victims. A size 1 avalanche (barely large enough to bury a person on open terrain) can bury someone 3-5 meters deep in a gully. Deeper burial means longer rescue time, and survival drops to near zero after 15 minutes of complete burial."
                onCorrect={handleQuizCorrect}
              />
            </motion.div>
          )}

          {/* Completion */}
          {quizCorrect && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
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
              Module complete. You can identify terrain traps and understand how they amplify consequences.
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
