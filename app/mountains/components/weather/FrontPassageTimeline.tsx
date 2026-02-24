'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveSlider from '../InteractiveSlider';
import QuizBlock from '../QuizBlock';

interface FrontPassageTimelineProps {
  onComplete: () => void;
}

type FrontType = 'warm' | 'cold';

interface TimeStep {
  label: string;
  skyColor: string;
  cloudType: string;
  cloudOpacity: number;
  cloudHeight: number; // 0 = ground, 1 = high
  precipitation: boolean;
  precipIntensity: number; // 0-1
  temp: number;
  pressure: number;
  windDir: string;
  humidity: number;
}

const WARM_FRONT_STEPS: TimeStep[] = [
  { label: '-12h', skyColor: '#1a2a4a', cloudType: 'Clear', cloudOpacity: 0.05, cloudHeight: 1, precipitation: false, precipIntensity: 0, temp: 2, pressure: 1018, windDir: 'SE', humidity: 45 },
  { label: '-9h', skyColor: '#1a2a4a', cloudType: 'Cirrus', cloudOpacity: 0.15, cloudHeight: 0.95, precipitation: false, precipIntensity: 0, temp: 2, pressure: 1016, windDir: 'SE', humidity: 50 },
  { label: '-6h', skyColor: '#1e2e4e', cloudType: 'Cirrostratus', cloudOpacity: 0.3, cloudHeight: 0.85, precipitation: false, precipIntensity: 0, temp: 3, pressure: 1013, windDir: 'S', humidity: 58 },
  { label: '-4h', skyColor: '#222e48', cloudType: 'Altostratus', cloudOpacity: 0.5, cloudHeight: 0.6, precipitation: false, precipIntensity: 0, temp: 4, pressure: 1010, windDir: 'S', humidity: 65 },
  { label: '-2h', skyColor: '#252a3a', cloudType: 'Nimbostratus', cloudOpacity: 0.7, cloudHeight: 0.35, precipitation: true, precipIntensity: 0.3, temp: 5, pressure: 1007, windDir: 'SSW', humidity: 78 },
  { label: 'Front', skyColor: '#2a2a30', cloudType: 'Nimbostratus', cloudOpacity: 0.85, cloudHeight: 0.2, precipitation: true, precipIntensity: 0.7, temp: 7, pressure: 1004, windDir: 'SW', humidity: 90 },
  { label: '+2h', skyColor: '#2a2e38', cloudType: 'Stratus', cloudOpacity: 0.6, cloudHeight: 0.25, precipitation: true, precipIntensity: 0.4, temp: 10, pressure: 1005, windDir: 'SW', humidity: 85 },
  { label: '+4h', skyColor: '#2a3040', cloudType: 'Stratocumulus', cloudOpacity: 0.4, cloudHeight: 0.4, precipitation: false, precipIntensity: 0, temp: 12, pressure: 1006, windDir: 'W', humidity: 72 },
  { label: '+6h', skyColor: '#283248', cloudType: 'Scattered', cloudOpacity: 0.2, cloudHeight: 0.5, precipitation: false, precipIntensity: 0, temp: 13, pressure: 1008, windDir: 'W', humidity: 60 },
];

const COLD_FRONT_STEPS: TimeStep[] = [
  { label: '-6h', skyColor: '#283248', cloudType: 'Clear', cloudOpacity: 0.08, cloudHeight: 0.8, precipitation: false, precipIntensity: 0, temp: 18, pressure: 1010, windDir: 'SW', humidity: 55 },
  { label: '-4h', skyColor: '#263040', cloudType: 'Cumulus', cloudOpacity: 0.15, cloudHeight: 0.5, precipitation: false, precipIntensity: 0, temp: 19, pressure: 1009, windDir: 'SW', humidity: 58 },
  { label: '-2h', skyColor: '#243040', cloudType: 'Towering Cu', cloudOpacity: 0.35, cloudHeight: 0.35, precipitation: false, precipIntensity: 0, temp: 19, pressure: 1007, windDir: 'S', humidity: 65 },
  { label: '-1h', skyColor: '#222830', cloudType: 'Cumulonimbus', cloudOpacity: 0.6, cloudHeight: 0.15, precipitation: false, precipIntensity: 0.1, temp: 18, pressure: 1004, windDir: 'S', humidity: 75 },
  { label: 'Front', skyColor: '#1a1e24', cloudType: 'Cumulonimbus', cloudOpacity: 0.9, cloudHeight: 0.05, precipitation: true, precipIntensity: 1.0, temp: 14, pressure: 1000, windDir: 'W', humidity: 95 },
  { label: '+1h', skyColor: '#222830', cloudType: 'Stratocumulus', cloudOpacity: 0.5, cloudHeight: 0.3, precipitation: true, precipIntensity: 0.3, temp: 10, pressure: 1004, windDir: 'NW', humidity: 70 },
  { label: '+2h', skyColor: '#1e2e48', cloudType: 'Cumulus', cloudOpacity: 0.25, cloudHeight: 0.5, precipitation: false, precipIntensity: 0, temp: 8, pressure: 1008, windDir: 'NW', humidity: 50 },
  { label: '+4h', skyColor: '#1a2a4a', cloudType: 'Fair Cu', cloudOpacity: 0.1, cloudHeight: 0.6, precipitation: false, precipIntensity: 0, temp: 6, pressure: 1012, windDir: 'N', humidity: 40 },
  { label: '+6h', skyColor: '#162844', cloudType: 'Clear', cloudOpacity: 0.03, cloudHeight: 0.8, precipitation: false, precipIntensity: 0, temp: 5, pressure: 1016, windDir: 'N', humidity: 35 },
];

const SVG_WIDTH = 400;
const SVG_HEIGHT = 200;

export default function FrontPassageTimeline({ onComplete }: FrontPassageTimelineProps) {
  const [phase, setPhase] = useState<'setup' | 'interact' | 'reveal'>('setup');
  const [frontType, setFrontType] = useState<FrontType>('warm');
  const [timeIndex, setTimeIndex] = useState(0);
  const [hasScrubbedFull, setHasScrubbedFull] = useState(false);
  const [maxScrubbed, setMaxScrubbed] = useState(0);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const steps = frontType === 'warm' ? WARM_FRONT_STEPS : COLD_FRONT_STEPS;
  const current = steps[timeIndex];

  const handleTimeChange = (val: number) => {
    setTimeIndex(val);
    const newMax = Math.max(maxScrubbed, val);
    setMaxScrubbed(newMax);
    if (newMax >= steps.length - 1) {
      setHasScrubbedFull(true);
    }
  };

  const handleQuizCorrect = () => {
    setQuizCorrect(true);
    onComplete();
  };

  // Interpolate rain drops
  const rainDrops = useMemo(() => {
    if (!current.precipitation) return [];
    const count = Math.floor(current.precipIntensity * 30);
    return Array.from({ length: count }, (_, i) => ({
      x: 20 + Math.random() * (SVG_WIDTH - 40),
      y: 40 + Math.random() * (SVG_HEIGHT - 60),
      len: 4 + current.precipIntensity * 8,
      delay: Math.random() * 0.5,
    }));
  }, [current.precipitation, current.precipIntensity, timeIndex]);

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
              Weather fronts mark the boundary between air masses of different temperatures. As a front passes
              your location, you experience characteristic changes in clouds, temperature, pressure, wind, and precipitation.
            </p>
            <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Scrub through the timeline to observe how conditions evolve before, during, and after
              a front passage. Compare warm and cold fronts to see their differences.
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
              Start Timeline
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
            {/* Front type toggle */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}>
              {(['warm', 'cold'] as FrontType[]).map(type => (
                <button
                  key={type}
                  onClick={() => { setFrontType(type); setTimeIndex(0); setMaxScrubbed(0); setHasScrubbedFull(false); }}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    background: frontType === type ? (type === 'warm' ? 'rgba(204, 100, 80, 0.15)' : 'rgba(80, 120, 204, 0.15)') : 'var(--mt-surface)',
                    border: `1px solid ${frontType === type ? (type === 'warm' ? '#CC6650' : '#5080CC') : 'var(--mt-border)'}`,
                    borderRadius: 6,
                    color: frontType === type ? (type === 'warm' ? '#CC6650' : '#5080CC') : 'var(--mt-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm, 0.875rem)',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}
                >
                  {type} Front
                </button>
              ))}
            </div>

            <div className="mt-module-split">
              <div>
                {/* Sky visualization */}
                <div style={{
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 8,
                  overflow: 'hidden',
                }}>
              <svg
                viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                width="100%"
                style={{ display: 'block' }}
              >
                {/* Sky background */}
                <motion.rect
                  width={SVG_WIDTH}
                  height={SVG_HEIGHT}
                  animate={{ fill: current.skyColor }}
                  transition={{ duration: 0.5 }}
                />

                {/* Cloud layers */}
                <motion.g
                  animate={{ opacity: current.cloudOpacity }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Cloud shapes at varying heights */}
                  {[...Array(5)].map((_, i) => {
                    const baseY = 10 + (1 - current.cloudHeight) * 100;
                    const cx = 40 + i * 80;
                    return (
                      <g key={`cloud-${i}`}>
                        <ellipse cx={cx} cy={baseY} rx={50} ry={15} fill="rgba(180, 190, 210, 0.3)" />
                        <ellipse cx={cx - 20} cy={baseY - 8} rx={30} ry={10} fill="rgba(180, 190, 210, 0.25)" />
                        <ellipse cx={cx + 25} cy={baseY - 5} rx={35} ry={12} fill="rgba(180, 190, 210, 0.25)" />
                      </g>
                    );
                  })}
                </motion.g>

                {/* Rain */}
                {rainDrops.map((drop, i) => (
                  <motion.line
                    key={`rain-${i}`}
                    x1={drop.x}
                    y1={drop.y}
                    x2={drop.x - 1}
                    y2={drop.y + drop.len}
                    stroke="rgba(150, 180, 220, 0.5)"
                    strokeWidth={1}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.7, 0] }}
                    transition={{ duration: 0.8, delay: drop.delay, repeat: Infinity }}
                  />
                ))}

                {/* Cloud type label */}
                <text
                  x={SVG_WIDTH / 2}
                  y={SVG_HEIGHT - 12}
                  textAnchor="middle"
                  fill="var(--mt-muted)"
                  fontSize={11}
                  fontFamily="var(--font-mono)"
                  opacity={0.8}
                >
                  {current.cloudType}
                </text>

                {/* Time label */}
                <text
                  x={15}
                  y={SVG_HEIGHT - 12}
                  fill="var(--mt-bright)"
                  fontSize={11}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                >
                  T{current.label}
                </text>
              </svg>
                </div>
              </div>
              <div>
                {/* Timeline slider */}
            <div style={{ marginBottom: '1rem' }}>
              <InteractiveSlider
                label="Timeline"
                min={0}
                max={steps.length - 1}
                value={timeIndex}
                onChange={handleTimeChange}
                formatValue={(v) => steps[v]?.label || ''}
              />
            </div>

            {/* Readings panel */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gap: '0.5rem',
              marginBottom: '1.5rem',
            }}>
              {[
                { label: 'TEMP', value: `${current.temp}\u00B0C`, color: current.temp > 10 ? '#CC8060' : '#6090CC' },
                { label: 'PRESS', value: `${current.pressure} mb`, color: current.pressure < 1005 ? '#CC6650' : 'var(--mt-bright)' },
                { label: 'WIND', value: current.windDir, color: 'var(--mt-bright)' },
                { label: 'RH', value: `${current.humidity}%`, color: current.humidity > 80 ? 'var(--mt-weather)' : 'var(--mt-bright)' },
              ].map(reading => (
                <div key={reading.label} style={{
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 6,
                  padding: '0.5rem',
                  textAlign: 'center',
                }}>
                  <div style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>
                    {reading.label}
                  </div>
                  <motion.div
                    key={`${reading.label}-${reading.value}`}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    style={{ color: reading.color, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm, 0.875rem)', fontWeight: 700 }}
                  >
                    {reading.value}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Sequence description */}
            <div style={{
              background: 'rgba(123, 167, 204, 0.06)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '0.75rem 1rem',
              marginBottom: '1.5rem',
            }}>
              <p style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-sm, 0.875rem)', lineHeight: 1.6, margin: 0 }}>
                {frontType === 'warm' ? (
                  <>
                    <strong style={{ color: '#CC6650' }}>Warm fronts</strong> approach gradually. You will see high cirrus clouds first,
                    followed by progressively lower and thicker cloud layers over 12+ hours. Rain is steady and widespread.
                    After passage, temperatures rise and winds shift from southerly to westerly.
                  </>
                ) : (
                  <>
                    <strong style={{ color: '#5080CC' }}>Cold fronts</strong> arrive abruptly. You may see towering cumulus or
                    cumulonimbus clouds build rapidly, with intense but short-lived precipitation along a narrow band.
                    Temperature drops sharply at frontal passage and pressure rises. Winds shift from southerly to northwesterly.
                  </>
                )}
              </p>
            </div>

            {/* Quiz */}
            {hasScrubbedFull && !quizCorrect && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <QuizBlock
                  question="What type of front shows gradually lowering clouds over many hours before precipitation begins?"
                  options={[
                    { text: 'Cold front -- clouds develop rapidly at the front boundary' },
                    { text: 'Warm front -- the gentle slope produces a long sequence of descending cloud types', correct: true },
                    { text: 'Stationary front -- clouds remain at a fixed height indefinitely' },
                    { text: 'Occluded front -- clouds appear simultaneously at all altitudes' },
                  ]}
                  explanation="Warm fronts have a gentle slope (roughly 1:200). Warm air rides up and over the cooler surface air mass, creating clouds at progressively lower altitudes over 12-24 hours: first cirrus, then cirrostratus, altostratus, and finally nimbostratus with steady precipitation."
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
                Module complete. You can recognize front passage signatures.
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
