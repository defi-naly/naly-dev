'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveSlider from '../InteractiveSlider';
import QuizBlock from '../QuizBlock';

interface MountainWaveVisualizerProps {
  onComplete: () => void;
}

function generateStreamlines(
  windSpeed: number,
  stability: number,
): { path: string; isWave: boolean; yBase: number }[] {
  const lines: { path: string; isWave: boolean; yBase: number }[] = [];
  const numLines = 8;

  // Wave amplitude scales with wind speed and stability
  const waveAmplitude = (windSpeed / 60) * (stability / 100) * 60;
  const wavelength = 120 - (windSpeed / 60) * 30; // Shorter wavelength with more wind

  for (let i = 0; i < numLines; i++) {
    const yBase = 40 + i * 25;
    const points: string[] = [];
    let isWave = false;

    for (let x = 0; x <= 600; x += 3) {
      let y = yBase;

      if (x < 200) {
        // Approaching flow - mostly laminar
        y = yBase;
      } else if (x >= 200 && x < 280) {
        // Flowing over the mountain
        const mountainInfluence = Math.sin(((x - 200) / 80) * Math.PI);
        const ridgeHeight = 100;
        y = yBase - mountainInfluence * (ridgeHeight - yBase * 0.3);
        if (y > 220) y = 220; // Don't go below ground on approach
      } else {
        // Lee side - wave pattern
        isWave = true;
        const distFromRidge = x - 280;
        const decay = Math.exp(-distFromRidge * 0.002 * (1.1 - stability / 100));
        const waveY = Math.sin((distFromRidge / wavelength) * Math.PI * 2) * waveAmplitude * decay;
        y = yBase + waveY;
      }

      // Clamp to avoid going into mountain or below ground
      y = Math.max(10, Math.min(270, y));

      if (x === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }

    lines.push({ path: points.join(' '), isWave, yBase });
  }

  return lines;
}

export default function MountainWaveVisualizer({ onComplete }: MountainWaveVisualizerProps) {
  const [windSpeed, setWindSpeed] = useState(35);
  const [stability, setStability] = useState(70);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);

  const streamlines = useMemo(() => generateStreamlines(windSpeed, stability), [windSpeed, stability]);

  const waveAmplitude = (windSpeed / 60) * (stability / 100) * 60;
  const isSignificantWave = waveAmplitude > 20;

  const handleSliderChange = useCallback((setter: (v: number) => void) => (value: number) => {
    setter(value);
    setInteractionCount(prev => {
      const next = prev + 1;
      if (next >= 8 && !hasInteracted) {
        setHasInteracted(true);
        setTimeout(() => setShowQuiz(true), 600);
      }
      return next;
    });
  }, [hasInteracted]);

  const handleQuizCorrect = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Lenticular cloud positions (at wave crests on lee side)
  const wavelength = 120 - (windSpeed / 60) * 30;
  const lenticularPositions = isSignificantWave
    ? [
        { x: 280 + wavelength * 0.5, y: 40 - waveAmplitude * 0.6 },
        { x: 280 + wavelength * 1.5, y: 45 - waveAmplitude * 0.4 },
        { x: 280 + wavelength * 2.5, y: 50 - waveAmplitude * 0.25 },
      ].filter(p => p.x < 580 && p.y > 15)
    : [];

  // Rotor zone positions (below wave crests, closer to ground)
  const rotorPositions = isSignificantWave
    ? [
        { x: 280 + wavelength * 0.5, y: 210, width: wavelength * 0.4 },
        { x: 280 + wavelength * 1.5, y: 215, width: wavelength * 0.3 },
      ].filter(p => p.x < 560)
    : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Intro */}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.95rem',
        lineHeight: 1.7,
        color: 'var(--mt-muted)',
      }}>
        When stable air flows over a mountain ridge, it can create standing waves on the lee side.
        These waves produce some of the smoothest, most powerful lift in aviation -- but the rotor
        zones beneath them contain severe, aircraft-breaking turbulence. Adjust wind speed and
        atmospheric stability to see how waves form.
      </div>

      <div className="mt-module-split">
        <div>
          {/* SVG cross-section */}
          <div style={{
            background: 'var(--mt-surface)',
            border: '1px solid var(--mt-border)',
            borderRadius: 8,
            overflow: 'hidden',
            position: 'relative',
          }}>
        <svg viewBox="0 0 600 300" style={{ width: '100%', display: 'block' }}>
          <defs>
            <linearGradient id="waveSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a3050" />
              <stop offset="100%" stopColor="#3a6090" />
            </linearGradient>
            <linearGradient id="rotorGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(204,68,68,0.3)" />
              <stop offset="100%" stopColor="rgba(204,68,68,0.05)" />
            </linearGradient>
          </defs>

          {/* Sky */}
          <rect x={0} y={0} width={600} height={300} fill="url(#waveSky)" />

          {/* Wind direction indicator */}
          <line x1={20} y1={30} x2={80} y2={30} stroke="var(--mt-bright)" strokeWidth={2} markerEnd="url(#windArrow)" />
          <text x={50} y={20} textAnchor="middle" fill="var(--mt-bright)" fontSize={9} fontFamily="var(--font-mono)">
            WIND {windSpeed} kt
          </text>
          <defs>
            <marker id="windArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="var(--mt-bright)" />
            </marker>
          </defs>

          {/* Mountain ridge */}
          <polygon
            points="120,280 200,240 240,140 260,120 280,140 300,200 340,260 380,280"
            fill="#2a2a1e"
          />
          <polygon
            points="200,240 240,140 260,120 270,145 230,230"
            fill="#353520"
            opacity={0.4}
          />

          {/* Ground */}
          <rect x={0} y={280} width={600} height={20} fill="#1a1a10" />
          <line x1={0} y1={280} x2={120} y2={280} stroke="#3a3520" strokeWidth={1} />
          <line x1={380} y1={280} x2={600} y2={280} stroke="#3a3520" strokeWidth={1} />

          {/* Streamlines */}
          {streamlines.map((line, i) => (
            <motion.path
              key={i}
              d={line.path}
              fill="none"
              stroke="var(--mt-weather)"
              strokeWidth={1.2}
              opacity={0.5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeOut' }}
            />
          ))}

          {/* Lenticular clouds at wave crests */}
          {lenticularPositions.map((pos, i) => (
            <motion.g
              key={`lent-${i}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
            >
              <ellipse
                cx={pos.x}
                cy={pos.y}
                rx={25 - i * 4}
                ry={8 - i * 1.5}
                fill="#C8DCE8"
                opacity={0.7 - i * 0.15}
              />
              <text
                x={pos.x}
                y={pos.y - 14}
                textAnchor="middle"
                fill="#C8DCE8"
                fontSize={7}
                fontFamily="var(--font-mono)"
                opacity={i === 0 ? 0.9 : 0.5}
              >
                {i === 0 ? 'LENTICULAR' : ''}
              </text>
            </motion.g>
          ))}

          {/* Rotor zones */}
          {rotorPositions.map((pos, i) => (
            <motion.g
              key={`rotor-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <rect
                x={pos.x - pos.width / 2}
                y={pos.y}
                width={pos.width}
                height={280 - pos.y}
                fill="url(#rotorGrad)"
                rx={4}
              />
              {/* Turbulence swirls */}
              <motion.path
                d={`M${pos.x - 15} ${pos.y + 20} Q${pos.x - 5} ${pos.y + 10} ${pos.x} ${pos.y + 25} Q${pos.x + 5} ${pos.y + 15} ${pos.x + 15} ${pos.y + 22}`}
                fill="none"
                stroke="#CC4444"
                strokeWidth={1.5}
                opacity={0.6}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.path
                d={`M${pos.x - 10} ${pos.y + 40} Q${pos.x} ${pos.y + 30} ${pos.x + 5} ${pos.y + 42} Q${pos.x + 10} ${pos.y + 35} ${pos.x + 12} ${pos.y + 38}`}
                fill="none"
                stroke="#CC4444"
                strokeWidth={1}
                opacity={0.4}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
              />
              {i === 0 && (
                <text
                  x={pos.x}
                  y={pos.y - 5}
                  textAnchor="middle"
                  fill="#CC4444"
                  fontSize={7}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                >
                  ROTOR ZONE
                </text>
              )}
            </motion.g>
          ))}

          {/* Lift zone labels at wave crests */}
          {isSignificantWave && lenticularPositions.length > 0 && (
            <text
              x={lenticularPositions[0].x}
              y={lenticularPositions[0].y + 22}
              textAnchor="middle"
              fill="#4ADE80"
              fontSize={7}
              fontFamily="var(--font-mono)"
              fontWeight={700}
            >
              SMOOTH LIFT
            </text>
          )}

          {/* Windward / Leeward labels */}
          <text x={160} y={295} textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">
            WINDWARD
          </text>
          <text x={450} y={295} textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">
            LEEWARD
          </text>
        </svg>
          </div>
        </div>
        <div>
          {/* Controls */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
      }}>
        <InteractiveSlider
          label="Wind Speed"
          min={10}
          max={60}
          step={5}
          value={windSpeed}
          onChange={handleSliderChange(setWindSpeed)}
          unit=" kt"
        />
        <InteractiveSlider
          label="Atmospheric Stability"
          min={20}
          max={100}
          step={5}
          value={stability}
          onChange={handleSliderChange(setStability)}
          formatValue={(v) => v < 40 ? 'Slightly Stable' : v < 70 ? 'Stable' : 'Very Stable'}
        />
      </div>

      {/* Status readout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
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
            Wave Activity
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 700,
            color: isSignificantWave ? '#4ADE80' : 'var(--mt-muted)',
          }}>
            {waveAmplitude < 10 ? 'Negligible' : waveAmplitude < 25 ? 'Weak' : waveAmplitude < 45 ? 'Moderate' : 'Strong'}
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
            Rotor Turbulence
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 700,
            color: isSignificantWave ? '#CC4444' : 'var(--mt-muted)',
          }}>
            {waveAmplitude < 10 ? 'None' : waveAmplitude < 25 ? 'Light' : waveAmplitude < 45 ? 'Severe' : 'Extreme'}
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
            Lenticular Clouds
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 700,
            color: lenticularPositions.length > 0 ? 'var(--mt-weather)' : 'var(--mt-muted)',
          }}>
            {lenticularPositions.length > 0 ? `${lenticularPositions.length} visible` : 'None'}
          </div>
        </div>
      </div>

      {/* Educational note */}
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
        {isSignificantWave
          ? 'Mountain waves can extend to the stratosphere and produce sustained lift of 1,000+ ft/min. Glider pilots have used them to reach altitudes above 50,000 ft. But the rotor zones beneath the wave crests contain violent, chaotic turbulence that has destroyed aircraft. The key visual indicator: smooth, lens-shaped lenticular clouds hovering motionless above the peaks.'
          : 'Increase wind speed and stability to see wave patterns develop. Mountain waves require a strong, perpendicular wind flow across a ridge and a stable atmosphere that resists vertical displacement.'}
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
              question="What cloud type is a reliable indicator of mountain wave activity?"
              options={[
                { text: 'Cumulus -- puffy fair-weather clouds' },
                { text: 'Lenticular (Altocumulus lenticularis) -- smooth, lens-shaped clouds that remain stationary', correct: true },
                { text: 'Cirrus -- high wispy ice crystals' },
                { text: 'Stratus -- flat gray layers' },
              ]}
              explanation="Lenticular clouds (Altocumulus lenticularis) form at the crests of mountain waves where air rises and cools to its dew point. Unlike other clouds that drift with the wind, lenticulars appear stationary because they continuously form on the upwind side and dissipate on the downwind side. Their smooth, stacked lens shape is unmistakable and always signals wave activity -- and potential severe turbulence in the rotor zones below."
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
