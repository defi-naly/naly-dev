'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveSlider from '../InteractiveSlider';
import DangerMeter from '../DangerMeter';
import QuizBlock from '../QuizBlock';

interface ThermalTriggerSimulatorProps {
  onComplete: () => void;
}

interface Surface {
  id: string;
  label: string;
  color: string;
  albedo: number; // 0 = absorbs all, 1 = reflects all
  heatingRate: number; // relative rate (higher = heats faster)
  x: number;
  width: number;
}

const SURFACES: Surface[] = [
  { id: 'parking', label: 'Parking Lot', color: '#333338', albedo: 0.1, heatingRate: 1.0, x: 0, width: 70 },
  { id: 'plowed', label: 'Plowed Field', color: '#5a4030', albedo: 0.15, heatingRate: 0.85, x: 70, width: 75 },
  { id: 'grass', label: 'Grass Field', color: '#3a5a2a', albedo: 0.25, heatingRate: 0.6, x: 145, width: 80 },
  { id: 'forest', label: 'Forest', color: '#1e3a18', albedo: 0.12, heatingRate: 0.35, x: 225, width: 85 },
  { id: 'lake', label: 'Lake', color: '#2a4060', albedo: 0.06, heatingRate: 0.1, x: 310, width: 90 },
];

const TRIGGER_TEMP = 30; // degrees C threshold for thermal launch
const BASE_TEMP = 15; // ambient surface temp at 0 sun angle
const SVG_WIDTH = 400;
const SVG_HEIGHT = 320;
const GROUND_Y = 220;

export default function ThermalTriggerSimulator({ onComplete }: ThermalTriggerSimulatorProps) {
  const [phase, setPhase] = useState<'setup' | 'interact' | 'reveal'>('setup');
  const [sunAngle, setSunAngle] = useState(30);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);
  const [animTime, setAnimTime] = useState(0);
  const rafRef = useRef<number>(0);

  // Animation for thermals
  useEffect(() => {
    if (phase !== 'interact' && phase !== 'reveal') return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setAnimTime(prev => prev + dt);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  // Calculate surface temperatures based on sun angle
  // Higher sun angle = more energy = higher temp
  // Albedo and heating rate affect how quickly each surface heats
  const surfaceTemps = useMemo(() => {
    const solarInput = Math.sin((sunAngle * Math.PI) / 180); // 0 at 0 degrees, 1 at 90 degrees
    return SURFACES.map(s => {
      const absorbedEnergy = solarInput * (1 - s.albedo) * s.heatingRate;
      const temp = BASE_TEMP + absorbedEnergy * 30;
      return { ...s, temp };
    });
  }, [sunAngle]);

  // Check if any surface has triggered
  const triggeredSurfaces = surfaceTemps.filter(s => s.temp >= TRIGGER_TEMP);

  useEffect(() => {
    if (triggeredSurfaces.length > 0 && !hasTriggered) {
      setHasTriggered(true);
    }
  }, [triggeredSurfaces.length, hasTriggered]);

  const handleSunAngleChange = (val: number) => {
    setSunAngle(val);
  };

  const handleQuizCorrect = () => {
    setQuizCorrect(true);
    onComplete();
  };

  // Sun position in SVG
  const sunX = 50 + (sunAngle / 90) * 300;
  const sunY = 40 + (1 - Math.sin((sunAngle * Math.PI) / 180)) * 100;

  // Generate thermal bubbles for triggered surfaces
  const thermalBubbles = useMemo(() => {
    const bubbles: { cx: number; cy: number; r: number; phase: number; surfaceId: string }[] = [];
    surfaceTemps.forEach(s => {
      if (s.temp >= TRIGGER_TEMP) {
        const excessTemp = s.temp - TRIGGER_TEMP;
        const count = Math.min(4, Math.floor(excessTemp / 2) + 1);
        for (let i = 0; i < count; i++) {
          const cx = s.x + s.width / 2 + (i - count / 2) * 12;
          const phaseOffset = i * 1.5 + s.x * 0.02;
          bubbles.push({ cx, cy: GROUND_Y, r: 4 + excessTemp * 0.3, phase: phaseOffset, surfaceId: s.id });
        }
      }
    });
    return bubbles;
  }, [surfaceTemps]);

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
              Thermals form when the sun heats the ground unevenly. Dark, dry surfaces like asphalt absorb more
              solar energy and heat up faster than reflective or moist surfaces like water. When a surface reaches
              the <strong>trigger temperature</strong>, warm air bubbles break free and rise as thermals.
            </p>
            <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Adjust the sun angle to see which surfaces trigger thermals first. The higher the sun,
              the more energy reaches the ground.
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
              Start Heating
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
                {/* SVG landscape */}
                <div style={{
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 8,
                  padding: '0.5rem',
                  overflow: 'hidden',
                }}>
              <svg
                viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                width="100%"
                style={{ display: 'block' }}
              >
                {/* Sky */}
                <rect width={SVG_WIDTH} height={GROUND_Y} fill="#0e1828" rx={4} />

                {/* Sun */}
                <motion.g animate={{ x: sunX, y: sunY }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}>
                  <circle cx={0} cy={0} r={20} fill="rgba(255, 200, 80, 0.15)" />
                  <circle cx={0} cy={0} r={12} fill="rgba(255, 200, 80, 0.3)" />
                  <circle cx={0} cy={0} r={6} fill="#FFCC50" />
                  {/* Sun rays */}
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * 45 * Math.PI) / 180;
                    return (
                      <line
                        key={i}
                        x1={Math.cos(angle) * 14}
                        y1={Math.sin(angle) * 14}
                        x2={Math.cos(angle) * 22}
                        y2={Math.sin(angle) * 22}
                        stroke="#FFCC50"
                        strokeWidth={1}
                        opacity={0.4}
                      />
                    );
                  })}
                </motion.g>

                {/* Sun rays to ground (when angle > 0) */}
                {sunAngle > 5 && SURFACES.map(s => (
                  <line
                    key={`ray-${s.id}`}
                    x1={sunX}
                    y1={sunY}
                    x2={s.x + s.width / 2}
                    y2={GROUND_Y}
                    stroke="rgba(255, 200, 80, 0.06)"
                    strokeWidth={s.width * 0.3}
                  />
                ))}

                {/* Trigger temperature line */}
                <line
                  x1={0}
                  y1={GROUND_Y - 3}
                  x2={SVG_WIDTH}
                  y2={GROUND_Y - 3}
                  stroke="rgba(204, 80, 80, 0.3)"
                  strokeWidth={1}
                  strokeDasharray="4,4"
                />
                <text
                  x={SVG_WIDTH - 5}
                  y={GROUND_Y - 8}
                  textAnchor="end"
                  fill="rgba(204, 80, 80, 0.5)"
                  fontSize={8}
                  fontFamily="var(--font-mono)"
                >
                  TRIGGER {TRIGGER_TEMP}\u00B0C
                </text>

                {/* Thermal bubbles */}
                {thermalBubbles.map((bubble, i) => {
                  const cyclePos = ((animTime + bubble.phase) % 3) / 3; // 0-1 over 3 seconds
                  const y = GROUND_Y - cyclePos * 180;
                  const opacity = cyclePos < 0.1 ? cyclePos * 10 : cyclePos > 0.8 ? (1 - cyclePos) * 5 : 1;
                  return (
                    <circle
                      key={`thermal-${i}`}
                      cx={bubble.cx}
                      cy={y}
                      r={bubble.r * (1 + cyclePos * 0.5)}
                      fill="rgba(255, 180, 80, 0.2)"
                      stroke="rgba(255, 180, 80, 0.3)"
                      strokeWidth={0.5}
                      opacity={opacity * 0.7}
                    />
                  );
                })}

                {/* Ground surfaces */}
                {surfaceTemps.map(s => {
                  const isTriggered = s.temp >= TRIGGER_TEMP;
                  return (
                    <g key={s.id}>
                      <rect
                        x={s.x}
                        y={GROUND_Y}
                        width={s.width}
                        height={SVG_HEIGHT - GROUND_Y}
                        fill={s.color}
                        stroke={isTriggered ? 'rgba(255, 180, 80, 0.5)' : 'var(--mt-border)'}
                        strokeWidth={isTriggered ? 1.5 : 0.5}
                      />

                      {/* Surface details */}
                      {s.id === 'forest' && [...Array(6)].map((_, i) => (
                        <polygon
                          key={`tree-${i}`}
                          points={`${s.x + 8 + i * 14},${GROUND_Y} ${s.x + 14 + i * 14},${GROUND_Y - 15} ${s.x + 20 + i * 14},${GROUND_Y}`}
                          fill="#254520"
                        />
                      ))}
                      {s.id === 'lake' && (
                        <>
                          <line x1={s.x + 10} y1={GROUND_Y + 30} x2={s.x + 50} y2={GROUND_Y + 30} stroke="rgba(80, 130, 180, 0.3)" strokeWidth={1} />
                          <line x1={s.x + 30} y1={GROUND_Y + 50} x2={s.x + 75} y2={GROUND_Y + 50} stroke="rgba(80, 130, 180, 0.3)" strokeWidth={1} />
                        </>
                      )}

                      {/* Surface label */}
                      <text
                        x={s.x + s.width / 2}
                        y={GROUND_Y + 15}
                        textAnchor="middle"
                        fill="var(--mt-muted)"
                        fontSize={7}
                        fontFamily="var(--font-mono)"
                      >
                        {s.label}
                      </text>

                      {/* Temperature readout */}
                      <text
                        x={s.x + s.width / 2}
                        y={GROUND_Y + 28}
                        textAnchor="middle"
                        fill={isTriggered ? '#FFAA40' : 'var(--mt-bright)'}
                        fontSize={10}
                        fontFamily="var(--font-mono)"
                        fontWeight={700}
                      >
                        {s.temp.toFixed(1)}\u00B0
                      </text>
                    </g>
                  );
                })}

                {/* Sun angle label */}
                <text
                  x={10}
                  y={20}
                  fill="var(--mt-muted)"
                  fontSize={10}
                  fontFamily="var(--font-mono)"
                >
                  Sun angle: {sunAngle}\u00B0
                </text>
              </svg>
                </div>
              </div>
              <div>
                {/* Sun angle slider */}
            <div style={{ marginBottom: '1rem' }}>
              <InteractiveSlider
                label="Sun Angle"
                min={0}
                max={90}
                value={sunAngle}
                onChange={handleSunAngleChange}
                formatValue={(v) => `${v}\u00B0 ${v < 20 ? '(dawn/dusk)' : v < 45 ? '(morning/evening)' : v < 70 ? '(midday)' : '(solar noon)'}`}
              />
            </div>

            {/* Surface temperature comparison */}
            <div style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '0.75rem',
              marginBottom: '1rem',
            }}>
              <div style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
                SURFACE HEATING (sorted by temperature)
              </div>
              {[...surfaceTemps].sort((a, b) => b.temp - a.temp).map(s => {
                const pct = Math.min(100, ((s.temp - BASE_TEMP) / (TRIGGER_TEMP - BASE_TEMP + 10)) * 100);
                const isTriggered = s.temp >= TRIGGER_TEMP;
                return (
                  <div key={s.id} style={{ marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.15rem' }}>
                      <span style={{ color: isTriggered ? '#FFAA40' : 'var(--mt-muted)', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)' }}>
                        {s.label} {isTriggered ? '-- THERMAL' : ''}
                      </span>
                      <span style={{ color: isTriggered ? '#FFAA40' : 'var(--mt-bright)', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        {s.temp.toFixed(1)}\u00B0C
                      </span>
                    </div>
                    <div style={{ height: 4, background: 'var(--mt-void)', borderRadius: 2 }}>
                      <motion.div
                        style={{
                          height: '100%',
                          borderRadius: 2,
                          background: isTriggered ? '#FFAA40' : 'var(--mt-muted)',
                        }}
                        animate={{ width: `${Math.max(0, pct)}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Thermal activity meter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <DangerMeter
                value={Math.min(100, (triggeredSurfaces.length / SURFACES.length) * 100 + (sunAngle > 60 ? 20 : 0))}
                label="Thermal Activity"
              />
            </div>

            {/* Explanation */}
            {hasTriggered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(255, 180, 80, 0.06)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 8,
                  padding: '0.75rem 1rem',
                  marginBottom: '1.5rem',
                }}
              >
                <p style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-sm, 0.875rem)', lineHeight: 1.6, margin: 0 }}>
                  Dark, dry surfaces with low albedo (like asphalt parking lots) absorb most incoming
                  solar radiation and convert it to heat. Water has enormous <strong style={{ color: 'var(--mt-bright)' }}>thermal inertia</strong> --
                  it absorbs heat slowly without significant temperature change. This is why thermals
                  are rare over lakes but common over dark fields and pavement.
                </p>
              </motion.div>
            )}

            {/* Quiz */}
            {hasTriggered && !quizCorrect && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <QuizBlock
                  question="Why do lakes generate few thermals compared to dark asphalt?"
                  options={[
                    { text: 'Water reflects all sunlight back into space' },
                    { text: 'Lakes are always shaded by surrounding terrain' },
                    { text: 'Water has high thermal inertia -- it absorbs enormous energy with minimal temperature increase', correct: true },
                    { text: 'Wind over lakes prevents air from heating up' },
                  ]}
                  explanation="Water has one of the highest specific heat capacities of any common substance. It takes far more energy to raise water temperature by 1 degree C than it does for soil or asphalt. Additionally, energy is distributed through a large volume via mixing and evaporation, so surface water temperatures change slowly compared to land."
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
                Module complete. You understand differential surface heating and thermal triggers.
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
