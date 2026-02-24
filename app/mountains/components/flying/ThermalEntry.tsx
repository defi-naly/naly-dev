'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import InteractiveSlider from '../InteractiveSlider';
import QuizBlock from '../QuizBlock';

interface ThermalEntryProps {
  onComplete: () => void;
}

const SVG_SIZE = 400;
const CENTER = SVG_SIZE / 2;
const THERMAL_RADIUS = 80;
const CORE_RADIUS = 30;

// Thermal strength based on distance from center (bell curve)
function thermalStrength(dist: number): number {
  if (dist > THERMAL_RADIUS) return 0;
  // Gaussian-like falloff
  const normalized = dist / THERMAL_RADIUS;
  return Math.exp(-3 * normalized * normalized);
}

export default function ThermalEntry({ onComplete }: ThermalEntryProps) {
  const [entryAngle, setEntryAngle] = useState(45);
  const [bankAngle, setBankAngle] = useState(30);
  const [hasSimulated, setHasSimulated] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  // Compute the flight path and score
  const simulation = useMemo(() => {
    // Pilot approaches from the left side
    const approachY = CENTER + 40;
    const entryRad = (entryAngle * Math.PI) / 180;

    // Entry point on thermal boundary
    const entryX = CENTER - THERMAL_RADIUS;
    const entryY = approachY;

    // Direction vector based on entry angle
    // 0 = tangential (moving along the edge), 90 = head-on (pointing at center)
    const toCenter = Math.atan2(CENTER - entryY, CENTER - entryX);
    const tangent = toCenter + Math.PI / 2;
    const dir = tangent - entryRad * (Math.PI / 180 - 0.01);

    // Turn radius from bank angle: r = v^2 / (g * tan(bank))
    // Simplified: lower bank = wider turn, higher bank = tighter turn
    const turnRadius = 120 - bankAngle * 2; // 60-90 range
    const clampedRadius = Math.max(20, Math.min(100, turnRadius));

    // Generate flight path points
    const points: { x: number; y: number; vario: number }[] = [];
    const numPoints = 80;

    // Approach line
    for (let i = 0; i < 15; i++) {
      const t = i / 14;
      const x = 30 + (entryX - 30) * t;
      const y = approachY;
      const dist = Math.sqrt((x - CENTER) ** 2 + (y - CENTER) ** 2);
      points.push({ x, y, vario: thermalStrength(dist) });
    }

    // Turning phase after entry
    // For tangential entry (low angle), pilot arcs smoothly into a circle
    // For head-on entry (high angle), pilot passes through and exits
    const turnCenterOffsetAngle = toCenter + (Math.PI / 2) * (entryAngle < 45 ? 1 : -0.3);
    const turnCenterX = entryX + Math.cos(turnCenterOffsetAngle) * clampedRadius;
    const turnCenterY = entryY + Math.sin(turnCenterOffsetAngle) * clampedRadius;

    const startAngleOnCircle = Math.atan2(entryY - turnCenterY, entryX - turnCenterX);

    for (let i = 0; i < numPoints - 15; i++) {
      const t = i / (numPoints - 16);
      const sweepAngle = entryAngle < 30 ? Math.PI * 2.5 : entryAngle < 60 ? Math.PI * 1.8 : Math.PI * 1.2;
      const angle = startAngleOnCircle - t * sweepAngle;

      // Gradually tighten toward thermal center for tangential entries
      const spiralFactor = entryAngle < 30 ? 1 - t * 0.3 : 1;
      const r = clampedRadius * spiralFactor;

      // For head-on entries, shift the turn center
      const headOnDrift = entryAngle > 60 ? t * 40 : 0;

      const x = turnCenterX + Math.cos(angle) * r + headOnDrift * Math.cos(toCenter + Math.PI);
      const y = turnCenterY + Math.sin(angle) * r + headOnDrift * Math.sin(toCenter + Math.PI);

      const dist = Math.sqrt((x - CENTER) ** 2 + (y - CENTER) ** 2);
      points.push({ x, y, vario: thermalStrength(dist) });
    }

    // Average vario reading
    const avgVario = points.reduce((s, p) => s + p.vario, 0) / points.length;
    const score = Math.round(avgVario * 100);

    return { points, score, turnRadius: clampedRadius };
  }, [entryAngle, bankAngle]);

  const handleSimulate = useCallback(() => {
    setHasSimulated(true);
    if (simulation.score > bestScore) {
      setBestScore(simulation.score);
    }
  }, [simulation.score, bestScore]);

  // Score label
  const scoreLabel =
    simulation.score >= 60
      ? 'EXCELLENT'
      : simulation.score >= 40
        ? 'GOOD'
        : simulation.score >= 20
          ? 'MARGINAL'
          : 'POOR';
  const scoreColor =
    simulation.score >= 60 ? '#4ADE80' : simulation.score >= 40 ? 'var(--mt-flying)' : simulation.score >= 20 ? '#F59E0B' : 'var(--mt-danger)';

  // Build SVG path from points
  const pathD = simulation.points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <p style={{ color: 'var(--mt-bright)', lineHeight: 1.7, marginBottom: '0.5rem' }}>
        How you enter a thermal determines whether you stay in it or punch straight through.
        A tangential entry lets you smoothly join the rotation. A head-on entry means you fly
        through the lift and out the other side.
      </p>
      <p
        style={{
          color: 'var(--mt-muted)',
          lineHeight: 1.7,
          marginBottom: '1.5rem',
          fontSize: 'var(--text-sm)',
        }}
      >
        Adjust entry angle and bank angle, then observe the flight path and variometer reading.
      </p>

      <div className="mt-module-split">
        <div>
          {/* SVG top-down view */}
          <div
            style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '1rem',
              overflow: 'hidden',
            }}
          >
            <svg viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} width="100%" style={{ display: 'block' }}>
              <defs>
                <radialGradient id="thermalGrad" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="var(--mt-flying)" stopOpacity={0.3} />
                  <stop offset="40%" stopColor="var(--mt-flying)" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="var(--mt-flying)" stopOpacity={0} />
                </radialGradient>
              </defs>

              {/* Background */}
              <rect width={SVG_SIZE} height={SVG_SIZE} fill="var(--mt-void)" rx={4} />

              {/* Thermal rings */}
              <circle cx={CENTER} cy={CENTER} r={THERMAL_RADIUS} fill="url(#thermalGrad)" />
              <circle
                cx={CENTER}
                cy={CENTER}
                r={THERMAL_RADIUS}
                fill="none"
                stroke="var(--mt-flying)"
                strokeWidth={0.5}
                strokeDasharray="4,4"
                opacity={0.3}
              />
              <circle
                cx={CENTER}
                cy={CENTER}
                r={THERMAL_RADIUS * 0.65}
                fill="none"
                stroke="var(--mt-flying)"
                strokeWidth={0.5}
                strokeDasharray="3,4"
                opacity={0.2}
              />
              <circle
                cx={CENTER}
                cy={CENTER}
                r={CORE_RADIUS}
                fill="none"
                stroke="var(--mt-flying)"
                strokeWidth={1}
                strokeDasharray="2,3"
                opacity={0.5}
              />

              {/* Core label */}
              <text
                x={CENTER}
                y={CENTER + 4}
                textAnchor="middle"
                fill="var(--mt-flying)"
                fontSize={8}
                fontFamily="var(--font-mono)"
                opacity={0.6}
              >
                CORE
              </text>

              {/* Outer label */}
              <text
                x={CENTER}
                y={CENTER + THERMAL_RADIUS + 14}
                textAnchor="middle"
                fill="var(--mt-muted)"
                fontSize={7}
                fontFamily="var(--font-mono)"
              >
                thermal boundary
              </text>

              {/* Flight path */}
              {hasSimulated && (
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="var(--mt-bright)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
              )}

              {/* Pilot start position */}
              <g>
                <circle cx={30} cy={CENTER + 40} r={5} fill="var(--mt-bright)" opacity={0.8} />
                <text
                  x={30}
                  y={CENTER + 55}
                  textAnchor="middle"
                  fill="var(--mt-muted)"
                  fontSize={7}
                  fontFamily="var(--font-mono)"
                >
                  PILOT
                </text>
              </g>

              {/* Angle indicator */}
              <g>
                <text
                  x={CENTER - THERMAL_RADIUS - 35}
                  y={CENTER + 44}
                  textAnchor="middle"
                  fill="var(--mt-muted)"
                  fontSize={7}
                  fontFamily="var(--font-mono)"
                >
                  {entryAngle}deg
                </text>
              </g>

              {/* Legend */}
              <g>
                <text
                  x={10}
                  y={20}
                  fill="var(--mt-muted)"
                  fontSize={8}
                  fontFamily="var(--font-mono)"
                >
                  TOP-DOWN VIEW
                </text>
              </g>
            </svg>
          </div>
        </div>
        <div>
          {/* Sliders */}
          <div style={{ marginBottom: '0.5rem' }}>
            <InteractiveSlider
              label="Entry Angle"
              min={0}
              max={90}
              step={5}
              value={entryAngle}
              onChange={(v) => {
                setEntryAngle(v);
                setHasSimulated(false);
              }}
              unit="deg"
              formatValue={(v) =>
                v <= 20 ? `${v}\u00B0 (tangential)` : v >= 70 ? `${v}\u00B0 (head-on)` : `${v}\u00B0`
              }
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <InteractiveSlider
              label="Bank Angle"
              min={15}
              max={45}
              step={1}
              value={bankAngle}
              onChange={(v) => {
                setBankAngle(v);
                setHasSimulated(false);
              }}
              unit="deg"
              formatValue={(v) =>
                v <= 20
                  ? `${v}\u00B0 (shallow)`
                  : v >= 40
                    ? `${v}\u00B0 (steep)`
                    : `${v}\u00B0`
              }
            />
          </div>

          {/* Simulate button */}
          <button
            onClick={handleSimulate}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'transparent',
              border: '1px solid var(--mt-flying)',
              color: 'var(--mt-flying)',
              borderRadius: 8,
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-base)',
              cursor: 'pointer',
              marginBottom: '1.5rem',
            }}
          >
            Simulate Entry
          </button>

          {/* Variometer readout */}
          {hasSimulated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    background: 'var(--mt-surface)',
                    border: '1px solid var(--mt-border)',
                    borderRadius: 8,
                    padding: '0.75rem',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--mt-muted)',
                      textTransform: 'uppercase',
                      marginBottom: '0.25rem',
                    }}
                  >
                    EFFICIENCY
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 700,
                      color: scoreColor,
                    }}
                  >
                    {simulation.score}%
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: scoreColor,
                      marginTop: '0.15rem',
                    }}
                  >
                    {scoreLabel}
                  </div>
                </div>

                <div
                  style={{
                    background: 'var(--mt-surface)',
                    border: '1px solid var(--mt-border)',
                    borderRadius: 8,
                    padding: '0.75rem',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--mt-muted)',
                      textTransform: 'uppercase',
                      marginBottom: '0.25rem',
                    }}
                  >
                    TURN RADIUS
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 700,
                      color: 'var(--mt-bright)',
                    }}
                  >
                    {simulation.turnRadius}m
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--mt-muted)',
                      marginTop: '0.15rem',
                    }}
                  >
                    {bankAngle <= 20 ? 'WIDE' : bankAngle >= 40 ? 'TIGHT' : 'MODERATE'}
                  </div>
                </div>

                <div
                  style={{
                    background: 'var(--mt-surface)',
                    border: '1px solid var(--mt-border)',
                    borderRadius: 8,
                    padding: '0.75rem',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--mt-muted)',
                      textTransform: 'uppercase',
                      marginBottom: '0.25rem',
                    }}
                  >
                    BEST
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 700,
                      color: 'var(--mt-flying)',
                    }}
                  >
                    {bestScore}%
                  </div>
                </div>
              </div>

              {/* Tips based on settings */}
              <div
                style={{
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 8,
                  padding: '1rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--mt-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '0.5rem',
                  }}
                >
                  ANALYSIS
                </div>
                <p
                  style={{
                    color: 'var(--mt-bright)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: 1.7,
                  }}
                >
                  {entryAngle <= 20
                    ? 'Tangential entry. You joined the thermal rotation smoothly and stayed in the lift band. This is the textbook approach.'
                    : entryAngle <= 45
                      ? 'Moderate entry angle. You caught some lift but did not join the rotation as cleanly as a tangential entry would allow.'
                      : entryAngle <= 65
                        ? 'Steep entry. You passed through part of the thermal before your turn brought you back. Significant lift was missed on the initial pass.'
                        : 'Head-on entry. You flew through the thermal core and exited the other side before your turn radius could keep you in the lift. Most of the thermal was wasted.'}
                  {bankAngle <= 20
                    ? ' Your shallow bank angle creates a wide turn circle that extends well outside the thermal boundaries.'
                    : bankAngle >= 40
                      ? ' Your steep bank angle creates a tight turn, keeping you close to the core — but requires more skill and higher G-loading.'
                      : ' Your moderate bank angle balances turn radius with control, a good compromise for most conditions.'}
                </p>
              </div>

              {/* Quiz */}
              <QuizBlock
                question="Why is a tangential entry preferred over flying directly into a thermal?"
                options={[
                  {
                    text: 'It reduces the turbulence felt by the pilot',
                  },
                  {
                    text: 'It allows the pilot to smoothly join the circular flow and remain in the lift zone, rather than punching through and losing it',
                    correct: true,
                  },
                  {
                    text: 'It is faster and covers more distance',
                  },
                  {
                    text: 'It gives more time to assess the thermal before committing',
                  },
                ]}
                explanation="A tangential entry means approaching along the edge of the thermal and banking into a turn that follows the lift. This keeps the pilot inside the rising air continuously. A head-on entry means flying straight through the thermal — the pilot experiences a brief burst of lift but exits before establishing a sustained climb. The difference between a 2-minute climb and a missed thermal often comes down to entry technique."
                onCorrect={onComplete}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
