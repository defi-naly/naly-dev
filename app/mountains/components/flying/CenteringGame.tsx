'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import QuizBlock from '../QuizBlock';

interface CenteringGameProps {
  onComplete: () => void;
}

const SVG_SIZE = 400;
const CENTER = SVG_SIZE / 2;
const THERMAL_MAX_RADIUS = 120;
const CORE_RADIUS = 35;
const ORBIT_SPEED = 0.03; // radians per frame
const SHIFT_STEP = 8;
const RADIUS_STEP = 5;

// Thermal strength: Gaussian centered on thermal core
function thermalStrength(px: number, py: number, coreX: number, coreY: number): number {
  const dist = Math.sqrt((px - coreX) ** 2 + (py - coreY) ** 2);
  if (dist > THERMAL_MAX_RADIUS) return 0;
  const normalized = dist / THERMAL_MAX_RADIUS;
  return Math.max(0, Math.exp(-4 * normalized * normalized));
}

export default function CenteringGame({ onComplete }: CenteringGameProps) {
  // Thermal core is randomly placed but not too far from center
  const coreRef = useRef({
    x: CENTER + (Math.random() - 0.5) * 120,
    y: CENTER + (Math.random() - 0.5) * 120,
  });

  const [orbitCenter, setOrbitCenter] = useState({ x: CENTER, y: CENTER });
  const [orbitRadius, setOrbitRadius] = useState(60);
  const [angle, setAngle] = useState(0);
  const [vario, setVario] = useState(0);
  const [running, setRunning] = useState(false);
  const [varioHistory, setVarioHistory] = useState<number[]>([]);
  const [avgVario, setAvgVario] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [elapsedFrames, setElapsedFrames] = useState(0);
  const [peakAngle, setPeakAngle] = useState<number | null>(null);

  const animRef = useRef<number>(0);
  const historyRef = useRef<number[]>([]);
  const targetFps = 30;
  const frameInterval = 1000 / targetFps;

  // Pilot position on the orbit
  const pilotX = orbitCenter.x + Math.cos(angle) * orbitRadius;
  const pilotY = orbitCenter.y + Math.sin(angle) * orbitRadius;

  // Animation loop
  useEffect(() => {
    if (!running) return;

    let lastTime = 0;
    const core = coreRef.current;

    const loop = (timestamp: number) => {
      if (timestamp - lastTime < frameInterval) {
        animRef.current = requestAnimationFrame(loop);
        return;
      }
      lastTime = timestamp;

      setAngle((prev) => {
        const next = prev + ORBIT_SPEED;
        return next;
      });

      setElapsedFrames((prev) => prev + 1);

      // Calculate vario at current position
      const currentAngle = angle + ORBIT_SPEED;
      const px = orbitCenter.x + Math.cos(currentAngle) * orbitRadius;
      const py = orbitCenter.y + Math.sin(currentAngle) * orbitRadius;
      const strength = thermalStrength(px, py, core.x, core.y);
      const varioVal = strength * 5; // 0-5 m/s

      setVario(varioVal);

      // Track peak
      if (varioVal > (historyRef.current.length > 0 ? Math.max(...historyRef.current.slice(-10)) : 0)) {
        setPeakAngle(currentAngle);
      }

      // Update history
      historyRef.current.push(varioVal);
      if (historyRef.current.length > 300) {
        historyRef.current = historyRef.current.slice(-300);
      }
      setVarioHistory([...historyRef.current]);

      // Calculate rolling average (last 300 frames = ~10 seconds)
      const recent = historyRef.current.slice(-300);
      const avg = recent.reduce((s, v) => s + v, 0) / recent.length;
      setAvgVario(avg);

      // Efficiency as percentage of max possible (5 m/s)
      const eff = Math.round((avg / 5) * 100);
      setEfficiency(eff);

      // Win condition: sustained > 70% efficiency for at least 300 frames
      if (eff >= 70 && historyRef.current.length >= 300) {
        setGameComplete(true);
        setRunning(false);
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [running, orbitCenter, orbitRadius, angle, frameInterval]);

  const handleStart = useCallback(() => {
    historyRef.current = [];
    setVarioHistory([]);
    setElapsedFrames(0);
    setRunning(true);
    setGameComplete(false);
  }, []);

  const shiftLeft = useCallback(() => {
    setOrbitCenter((prev) => ({ ...prev, x: prev.x - SHIFT_STEP }));
  }, []);

  const shiftRight = useCallback(() => {
    setOrbitCenter((prev) => ({ ...prev, x: prev.x + SHIFT_STEP }));
  }, []);

  const shiftUp = useCallback(() => {
    setOrbitCenter((prev) => ({ ...prev, y: prev.y - SHIFT_STEP }));
  }, []);

  const shiftDown = useCallback(() => {
    setOrbitCenter((prev) => ({ ...prev, y: prev.y + SHIFT_STEP }));
  }, []);

  const tighten = useCallback(() => {
    setOrbitRadius((prev) => Math.max(20, prev - RADIUS_STEP));
  }, []);

  const widen = useCallback(() => {
    setOrbitRadius((prev) => Math.min(150, prev + RADIUS_STEP));
  }, []);

  // Vario bar height (0-100%)
  const varioPercent = Math.min(100, (vario / 5) * 100);
  const varioColor = vario > 3 ? '#4ADE80' : vario > 1.5 ? 'var(--mt-flying)' : vario > 0.5 ? '#F59E0B' : 'var(--mt-danger)';

  // Mini vario trace (last 60 readings)
  const tracePoints = varioHistory.slice(-60);

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <p style={{ color: 'var(--mt-bright)', lineHeight: 1.7, marginBottom: '0.5rem' }}>
        You are circling in a thermal but the core is invisible. Use the variometer readings to
        figure out where the strongest lift is, then shift your circle center to maximize your
        average climb rate.
      </p>

      <div
        style={{
          background: 'rgba(232,168,124,0.08)',
          border: '1px solid rgba(232,168,124,0.2)',
          borderRadius: 8,
          padding: '0.75rem 1rem',
          marginBottom: '1.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--mt-flying)',
          lineHeight: 1.6,
        }}
      >
        Key rule: When the vario peaks, the core is toward you. Shift your circle toward the
        strongest reading. Achieve 70% efficiency to complete.
      </div>

      {!running && !gameComplete && (
        <button
          onClick={handleStart}
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
          Start Centering
        </button>
      )}

      {(running || gameComplete) && (
        <div className="mt-module-split">
          <div>
            {/* Main display: SVG + Vario bar side by side */}
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
              }}
            >
              {/* SVG top-down view */}
              <div
                style={{
                  flex: 1,
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 8,
                  padding: '0.5rem',
                  overflow: 'hidden',
                }}
              >
                <svg viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} width="100%" style={{ display: 'block' }}>
                  <rect width={SVG_SIZE} height={SVG_SIZE} fill="var(--mt-void)" rx={4} />

                  {/* Grid lines */}
                  {[100, 200, 300].map((v) => (
                    <g key={v}>
                      <line x1={v} y1={0} x2={v} y2={SVG_SIZE} stroke="var(--mt-border)" strokeWidth={0.3} />
                      <line x1={0} y1={v} x2={SVG_SIZE} y2={v} stroke="var(--mt-border)" strokeWidth={0.3} />
                    </g>
                  ))}

                  {/* Orbit circle */}
                  <circle
                    cx={orbitCenter.x}
                    cy={orbitCenter.y}
                    r={orbitRadius}
                    fill="none"
                    stroke="var(--mt-bright)"
                    strokeWidth={0.8}
                    strokeDasharray="4,4"
                    opacity={0.3}
                  />

                  {/* Orbit center marker */}
                  <g opacity={0.4}>
                    <line
                      x1={orbitCenter.x - 6}
                      y1={orbitCenter.y}
                      x2={orbitCenter.x + 6}
                      y2={orbitCenter.y}
                      stroke="var(--mt-muted)"
                      strokeWidth={0.8}
                    />
                    <line
                      x1={orbitCenter.x}
                      y1={orbitCenter.y - 6}
                      x2={orbitCenter.x}
                      y2={orbitCenter.y + 6}
                      stroke="var(--mt-muted)"
                      strokeWidth={0.8}
                    />
                  </g>

                  {/* Pilot */}
                  <circle cx={pilotX} cy={pilotY} r={6} fill="var(--mt-bright)" />
                  <circle cx={pilotX} cy={pilotY} r={10} fill="none" stroke={varioColor} strokeWidth={1.5} opacity={0.6} />

                  {/* Vario trace on orbit - color the recent path */}
                  {tracePoints.length > 1 && (
                    <g>
                      {tracePoints.slice(1).map((v, i) => {
                        const traceAngle = angle - (tracePoints.length - 1 - i) * ORBIT_SPEED;
                        const tx = orbitCenter.x + Math.cos(traceAngle) * orbitRadius;
                        const ty = orbitCenter.y + Math.sin(traceAngle) * orbitRadius;
                        const c = v > 3 ? '#4ADE80' : v > 1.5 ? 'var(--mt-flying)' : v > 0.5 ? '#F59E0B' : '#444';
                        return (
                          <circle
                            key={i}
                            cx={tx}
                            cy={ty}
                            r={2}
                            fill={c}
                            opacity={0.15 + (i / tracePoints.length) * 0.5}
                          />
                        );
                      })}
                    </g>
                  )}

                  {/* Labels */}
                  <text x={10} y={20} fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">
                    TOP-DOWN VIEW
                  </text>
                  {gameComplete && (
                    <text x={CENTER} y={CENTER} textAnchor="middle" fill="#4ADE80" fontSize={12} fontFamily="var(--font-display)" fontWeight={700}>
                      CENTERED
                    </text>
                  )}
                </svg>
              </div>

              {/* Vario bar */}
              <div
                style={{
                  width: 60,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--mt-muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  VARIO
                </div>
                <div
                  style={{
                    flex: 1,
                    width: 24,
                    background: 'var(--mt-surface)',
                    border: '1px solid var(--mt-border)',
                    borderRadius: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: 200,
                  }}
                >
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: varioColor,
                      borderRadius: '0 0 3px 3px',
                    }}
                    animate={{ height: `${varioPercent}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 700,
                    color: varioColor,
                  }}
                >
                  {vario.toFixed(1)}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--mt-muted)',
                  }}
                >
                  m/s
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* Controls */}
            {running && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gridTemplateRows: 'auto auto auto',
                  gap: '0.4rem',
                  maxWidth: 280,
                  margin: '0 auto 1rem',
                }}
              >
                {/* Row 1: empty, up, empty */}
                <div />
                <ControlButton label="Up" onClick={shiftUp} />
                <div />
                {/* Row 2: left, tighten/widen, right */}
                <ControlButton label="Left" onClick={shiftLeft} />
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <ControlButton label="-" onClick={tighten} small />
                  <ControlButton label="+" onClick={widen} small />
                </div>
                <ControlButton label="Right" onClick={shiftRight} />
                {/* Row 3: empty, down, empty */}
                <div />
                <ControlButton label="Down" onClick={shiftDown} />
                <div />
              </div>
            )}

            {/* Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '0.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <StatBox label="AVG CLIMB" value={`${avgVario.toFixed(1)} m/s`} />
              <StatBox
                label="EFFICIENCY"
                value={`${efficiency}%`}
                color={efficiency >= 70 ? '#4ADE80' : efficiency >= 40 ? 'var(--mt-flying)' : 'var(--mt-muted)'}
              />
              <StatBox label="RADIUS" value={`${orbitRadius}m`} />
            </div>

            {/* Quiz after completion */}
            {gameComplete && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div
                  style={{
                    background: 'rgba(74,222,128,0.08)',
                    border: '1px solid rgba(74,222,128,0.3)',
                    borderRadius: 8,
                    padding: '1rem',
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    color: '#4ADE80',
                  }}
                >
                  Thermal centered. Average climb: {avgVario.toFixed(1)} m/s ({efficiency}%
                  efficiency).
                </div>

                <QuizBlock
                  question="When you feel the strongest lift in your turn, what should you do?"
                  options={[
                    {
                      text: 'Steepen the turn to circle tighter in the strong area',
                    },
                    {
                      text: 'Flatten the turn (reduce bank) to shift the circle toward the strong side, then resume normal bank',
                      correct: true,
                    },
                    {
                      text: 'Reverse your turn direction to stay in the strong lift',
                    },
                    {
                      text: 'Maintain the same bank angle and wait for the lift to come around again',
                    },
                  ]}
                  explanation="When the vario peaks, the thermal core is toward you at that moment. By flattening your bank briefly, you fly straighter and shift your entire circle center toward the strong side. Then you resume normal bank. This is the fundamental centering technique: flatten on the surge, steepen on the sink. Repeat until centered."
                  onCorrect={onComplete}
                />
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ControlButton({
  label,
  onClick,
  small,
}: {
  label: string;
  onClick: () => void;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: small ? '0.4rem' : '0.5rem 0.75rem',
        background: 'var(--mt-surface)',
        border: '1px solid var(--mt-border)',
        borderRadius: 6,
        color: 'var(--mt-bright)',
        fontFamily: 'var(--font-mono)',
        fontSize: small ? 'var(--text-sm)' : 'var(--text-xs)',
        cursor: 'pointer',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        flex: small ? 1 : undefined,
        transition: 'border-color 0.15s ease',
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLButtonElement).style.borderColor = 'var(--mt-flying)';
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLButtonElement).style.borderColor = 'var(--mt-border)';
      }}
    >
      {label}
    </button>
  );
}

function StatBox({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div
      style={{
        background: 'var(--mt-surface)',
        border: '1px solid var(--mt-border)',
        borderRadius: 8,
        padding: '0.6rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--mt-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '0.2rem',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-sm)',
          fontWeight: 700,
          color: color || 'var(--mt-bright)',
        }}
      >
        {value}
      </div>
    </div>
  );
}
