'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveSlider from '../InteractiveSlider';
import QuizBlock from '../QuizBlock';

interface ConvergenceZoneFinderProps {
  onComplete: () => void;
}

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function directionLabel(deg: number): string {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(deg / 22.5) % 16;
  return dirs[index];
}

function computeConvergence(
  dir1: number,
  dir2: number,
): { hasConvergence: boolean; lineAngle: number; lineX: number; lineY: number; strength: number } {
  // Convert wind directions to vectors (direction wind is blowing FROM, so reverse for motion)
  const rad1 = degToRad(dir1 + 180); // wind blows TO this direction
  const rad2 = degToRad(dir2 + 180);

  const vx1 = Math.sin(rad1);
  const vy1 = -Math.cos(rad1);
  const vx2 = Math.sin(rad2);
  const vy2 = -Math.cos(rad2);

  // Dot product tells us if winds oppose each other
  const dot = vx1 * vx2 + vy1 * vy2;

  // Convergence happens when winds face each other (dot < 0)
  // Maximum convergence when directly opposed (dot = -1)
  const convergenceStrength = Math.max(0, -dot);

  // The convergence line is perpendicular to the average wind direction
  const avgAngle = ((dir1 + dir2) / 2) % 360;
  const lineAngle = (avgAngle + 90) % 360;

  // Position the convergence zone - midpoint of the map, biased by relative wind directions
  const cx = 250 + (vx1 + vx2) * 30;
  const cy = 175 + (vy1 + vy2) * 30;

  return {
    hasConvergence: convergenceStrength > 0.3,
    lineAngle,
    lineX: cx,
    lineY: cy,
    strength: convergenceStrength,
  };
}

export default function ConvergenceZoneFinder({ onComplete }: ConvergenceZoneFinderProps) {
  const [windDir1, setWindDir1] = useState(180); // South wind (blowing from south)
  const [windDir2, setWindDir2] = useState(0); // North wind (blowing from north)
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);

  const convergence = useMemo(() => computeConvergence(windDir1, windDir2), [windDir1, windDir2]);

  const handleDirChange = useCallback((setter: (v: number) => void) => (value: number) => {
    setter(value);
    setInteractionCount(prev => {
      const next = prev + 1;
      if (next >= 6 && !hasInteracted) {
        setHasInteracted(true);
        setTimeout(() => setShowQuiz(true), 500);
      }
      return next;
    });
  }, [hasInteracted]);

  const handleQuizCorrect = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Generate wind arrows from each direction
  const arrows1 = useMemo(() => {
    const arr: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const rad = degToRad(windDir1 + 180); // blowing toward
    const dx = Math.sin(rad) * 35;
    const dy = -Math.cos(rad) * 35;

    // Starting positions - left/top side based on wind direction
    const startRad = degToRad(windDir1);
    const startX = 250 + Math.sin(startRad) * 140;
    const startY = 175 - Math.cos(startRad) * 120;

    for (let i = -2; i <= 2; i++) {
      const perpRad = degToRad(windDir1 + 90);
      const offsetX = Math.sin(perpRad) * i * 30;
      const offsetY = -Math.cos(perpRad) * i * 30;

      const sx = startX + offsetX;
      const sy = startY + offsetY;

      if (sx > 30 && sx < 470 && sy > 20 && sy < 330) {
        arr.push({ x1: sx, y1: sy, x2: sx + dx, y2: sy + dy });
      }
    }
    return arr;
  }, [windDir1]);

  const arrows2 = useMemo(() => {
    const arr: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const rad = degToRad(windDir2 + 180);
    const dx = Math.sin(rad) * 35;
    const dy = -Math.cos(rad) * 35;

    const startRad = degToRad(windDir2);
    const startX = 250 + Math.sin(startRad) * 140;
    const startY = 175 - Math.cos(startRad) * 120;

    for (let i = -2; i <= 2; i++) {
      const perpRad = degToRad(windDir2 + 90);
      const offsetX = Math.sin(perpRad) * i * 30;
      const offsetY = -Math.cos(perpRad) * i * 30;

      const sx = startX + offsetX;
      const sy = startY + offsetY;

      if (sx > 30 && sx < 470 && sy > 20 && sy < 330) {
        arr.push({ x1: sx, y1: sy, x2: sx + dx, y2: sy + dy });
      }
    }
    return arr;
  }, [windDir2]);

  // Convergence line endpoints
  const convLineLen = 80 * convergence.strength;
  const convRad = degToRad(convergence.lineAngle);
  const convX1 = convergence.lineX - Math.sin(convRad) * convLineLen;
  const convY1 = convergence.lineY + Math.cos(convRad) * convLineLen;
  const convX2 = convergence.lineX + Math.sin(convRad) * convLineLen;
  const convY2 = convergence.lineY - Math.cos(convRad) * convLineLen;

  // Check for divergence (winds blowing apart)
  const isDiverging = !convergence.hasConvergence && convergence.strength < 0.1;
  const dot = (() => {
    const rad1 = degToRad(windDir1 + 180);
    const rad2 = degToRad(windDir2 + 180);
    return Math.sin(rad1) * Math.sin(rad2) + Math.cos(rad1) * Math.cos(rad2);
  })();
  const isParallel = dot > 0.7;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Intro */}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.95rem',
        lineHeight: 1.7,
        color: 'var(--mt-muted)',
      }}>
        When two air masses flow toward each other, they collide and create a convergence zone --
        a line of rising air that produces lift and often triggers cloud formation. Adjust the two
        wind directions to find convergence zones and understand where lift and sink occur.
      </div>

      <div className="mt-module-split">
        <div>
          {/* SVG top-down terrain view */}
          <div style={{
            background: 'var(--mt-surface)',
            border: '1px solid var(--mt-border)',
            borderRadius: 8,
            overflow: 'hidden',
          }}>
        <svg viewBox="0 0 500 350" style={{ width: '100%', display: 'block' }}>
          {/* Background terrain */}
          <rect x={0} y={0} width={500} height={350} fill="#0f1612" />

          {/* Terrain contours - simple mountain/valley outlines */}
          <ellipse cx={120} cy={100} rx={50} ry={35} fill="none" stroke="#2a3a2a" strokeWidth={1} opacity={0.5} />
          <ellipse cx={120} cy={100} rx={30} ry={20} fill="none" stroke="#2a3a2a" strokeWidth={1} opacity={0.4} />
          <text x={120} y={105} textAnchor="middle" fill="#2a3a2a" fontSize={8} fontFamily="var(--font-mono)">Peak</text>

          <ellipse cx={380} cy={80} rx={60} ry={30} fill="none" stroke="#2a3a2a" strokeWidth={1} opacity={0.5} />
          <ellipse cx={380} cy={80} rx={35} ry={18} fill="none" stroke="#2a3a2a" strokeWidth={1} opacity={0.4} />
          <text x={380} y={85} textAnchor="middle" fill="#2a3a2a" fontSize={8} fontFamily="var(--font-mono)">Peak</text>

          {/* Valley between mountains */}
          <path d="M 80 160 Q 250 130 420 140" fill="none" stroke="#1a2a1a" strokeWidth={1.5} strokeDasharray="6 4" />
          <text x={250} y={125} textAnchor="middle" fill="#1a2a1a" fontSize={8} fontFamily="var(--font-mono)">Valley</text>

          <ellipse cx={250} cy={280} rx={70} ry={40} fill="none" stroke="#2a3a2a" strokeWidth={1} opacity={0.4} />
          <text x={250} y={285} textAnchor="middle" fill="#2a3a2a" fontSize={8} fontFamily="var(--font-mono)">Ridge</text>

          {/* Compass rose */}
          <g opacity={0.4}>
            <text x={250} y={15} textAnchor="middle" fill="var(--mt-muted)" fontSize={9} fontFamily="var(--font-mono)">N</text>
            <text x={250} y={345} textAnchor="middle" fill="var(--mt-muted)" fontSize={9} fontFamily="var(--font-mono)">S</text>
            <text x={10} y={178} textAnchor="start" fill="var(--mt-muted)" fontSize={9} fontFamily="var(--font-mono)">W</text>
            <text x={490} y={178} textAnchor="end" fill="var(--mt-muted)" fontSize={9} fontFamily="var(--font-mono)">E</text>
          </g>

          {/* Arrow markers */}
          <defs>
            <marker id="convArrow1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#7BA7CC" />
            </marker>
            <marker id="convArrow2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#F5A623" />
            </marker>
          </defs>

          {/* Wind system 1 arrows */}
          {arrows1.map((a, i) => (
            <motion.line
              key={`w1-${i}`}
              x1={a.x1}
              y1={a.y1}
              x2={a.x2}
              y2={a.y2}
              stroke="#7BA7CC"
              strokeWidth={2}
              markerEnd="url(#convArrow1)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: i * 0.05 }}
            />
          ))}

          {/* Wind system 2 arrows */}
          {arrows2.map((a, i) => (
            <motion.line
              key={`w2-${i}`}
              x1={a.x1}
              y1={a.y1}
              x2={a.x2}
              y2={a.y2}
              stroke="#F5A623"
              strokeWidth={2}
              markerEnd="url(#convArrow2)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: i * 0.05 }}
            />
          ))}

          {/* Convergence line */}
          {convergence.hasConvergence && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <line
                x1={convX1}
                y1={convY1}
                x2={convX2}
                y2={convY2}
                stroke="#4ADE80"
                strokeWidth={3}
                strokeDasharray="8 4"
                opacity={convergence.strength}
              />

              {/* Lift zone glow */}
              <motion.line
                x1={convX1}
                y1={convY1}
                x2={convX2}
                y2={convY2}
                stroke="#4ADE80"
                strokeWidth={16}
                opacity={0.1 * convergence.strength}
                animate={{ opacity: [0.05, 0.15, 0.05] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Upward arrows along convergence line */}
              {[0.25, 0.5, 0.75].map((t, i) => {
                const ax = convX1 + (convX2 - convX1) * t;
                const ay = convY1 + (convY2 - convY1) * t;
                return (
                  <motion.g
                    key={`up-${i}`}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  >
                    <circle cx={ax} cy={ay} r={6} fill="rgba(74,222,128,0.2)" />
                    <text x={ax} y={ay + 3} textAnchor="middle" fill="#4ADE80" fontSize={10} fontWeight={700}>
                      {'\u2191'}
                    </text>
                  </motion.g>
                );
              })}

              <text
                x={convergence.lineX}
                y={convergence.lineY - 20}
                textAnchor="middle"
                fill="#4ADE80"
                fontSize={10}
                fontFamily="var(--font-mono)"
                fontWeight={700}
              >
                CONVERGENCE - LIFT
              </text>
            </motion.g>
          )}

          {/* Divergence indicator */}
          {!convergence.hasConvergence && !isParallel && (
            <motion.text
              x={250}
              y={175}
              textAnchor="middle"
              fill="#CC4444"
              fontSize={10}
              fontFamily="var(--font-mono)"
              fontWeight={700}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
            >
              {isDiverging ? 'DIVERGENCE - SINK' : 'WEAK INTERACTION'}
            </motion.text>
          )}

          {isParallel && (
            <motion.text
              x={250}
              y={175}
              textAnchor="middle"
              fill="var(--mt-muted)"
              fontSize={10}
              fontFamily="var(--font-mono)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
            >
              PARALLEL FLOW - NO CONVERGENCE
            </motion.text>
          )}

          {/* Wind direction labels */}
          <rect x={10} y={310} width={100} height={28} rx={4} fill="rgba(123,167,204,0.1)" stroke="#7BA7CC" strokeWidth={0.5} />
          <text x={60} y={328} textAnchor="middle" fill="#7BA7CC" fontSize={9} fontFamily="var(--font-mono)">
            System A: {directionLabel(windDir1)}
          </text>

          <rect x={390} y={310} width={100} height={28} rx={4} fill="rgba(245,166,35,0.1)" stroke="#F5A623" strokeWidth={0.5} />
          <text x={440} y={328} textAnchor="middle" fill="#F5A623" fontSize={9} fontFamily="var(--font-mono)">
            System B: {directionLabel(windDir2)}
          </text>
        </svg>
          </div>
        </div>
        <div>
          {/* Wind direction controls */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
      }}>
        <div>
          <InteractiveSlider
            label="Wind System A (blue)"
            min={0}
            max={350}
            step={10}
            value={windDir1}
            onChange={handleDirChange(setWindDir1)}
            formatValue={(v) => `${v}\u00B0 (${directionLabel(v)})`}
          />
        </div>
        <div>
          <InteractiveSlider
            label="Wind System B (amber)"
            min={0}
            max={350}
            step={10}
            value={windDir2}
            onChange={handleDirChange(setWindDir2)}
            formatValue={(v) => `${v}\u00B0 (${directionLabel(v)})`}
          />
        </div>
      </div>

      {/* Readout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '0.75rem',
      }}>
        <div style={{
          background: 'var(--mt-surface)',
          border: '1px solid var(--mt-border)',
          borderRadius: 6,
          padding: '0.75rem',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--mt-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            marginBottom: '0.25rem',
          }}>
            Convergence Strength
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 700,
            color: convergence.hasConvergence ? '#4ADE80' : 'var(--mt-muted)',
          }}>
            {convergence.strength < 0.1 ? 'None' : convergence.strength < 0.3 ? 'Weak' : convergence.strength < 0.7 ? 'Moderate' : 'Strong'}
          </div>
        </div>

        <div style={{
          background: 'var(--mt-surface)',
          border: '1px solid var(--mt-border)',
          borderRadius: 6,
          padding: '0.75rem',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--mt-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            marginBottom: '0.25rem',
          }}>
            Result
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 700,
            color: convergence.hasConvergence ? '#4ADE80' : isParallel ? 'var(--mt-muted)' : '#CC4444',
          }}>
            {convergence.hasConvergence ? 'Lift Zone' : isParallel ? 'No Effect' : 'Sink / Neutral'}
          </div>
        </div>

        <div style={{
          background: 'var(--mt-surface)',
          border: '1px solid var(--mt-border)',
          borderRadius: 6,
          padding: '0.75rem',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--mt-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            marginBottom: '0.25rem',
          }}>
            Angle Between
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--mt-bright)',
          }}>
            {Math.abs(((windDir1 - windDir2 + 540) % 360) - 180)}{'\u00B0'}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.85rem',
        lineHeight: 1.6,
        color: 'var(--mt-muted)',
        padding: '0.75rem 1rem',
        background: 'var(--mt-surface)',
        border: '1px solid var(--mt-border)',
        borderRadius: 6,
      }}>
        {convergence.hasConvergence
          ? 'When two air masses flow toward each other, they have nowhere to go but up. This convergence line produces a band of rising air that can trigger cumulus clouds and sustain soaring flight. The stronger the opposition, the stronger the lift. In mountain terrain, valley breezes from opposite sides often converge along the valley axis.'
          : isParallel
          ? 'These wind systems are flowing roughly parallel. Without opposition, there is no forcing mechanism to push air upward. No convergence, no lift.'
          : 'When winds diverge (flow away from each other), air from above must descend to fill the gap. This creates sinking air -- the opposite of what pilots want. Divergence zones are areas of widespread sink.'}
      </div>

      {/* Quiz */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <QuizBlock
              question="What happens when two air masses moving toward each other collide?"
              options={[
                { text: 'The air accelerates horizontally, creating strong surface winds' },
                { text: 'The air is forced upward, creating a zone of lift and potential cloud formation', correct: true },
                { text: 'The air cancels out and becomes perfectly still' },
                { text: 'The warmer air mass always pushes the cooler one aside' },
              ]}
              explanation="When two air masses converge, the air has nowhere to go but up. This forced ascent creates a convergence zone -- a line of rising air that can trigger cumulus development, sustain soaring flight, and in extreme cases, initiate thunderstorms. This is one of the most important concepts in mountain meteorology: convergence equals lift, divergence equals sink."
              onCorrect={handleQuizCorrect}
            />
          </motion.div>
        )}
      </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
