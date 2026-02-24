'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveSlider from '../InteractiveSlider';
import DangerMeter from '../DangerMeter';
import QuizBlock from '../QuizBlock';

interface AvalancheTriangleProps {
  onComplete: () => void;
}

const SVG_W = 400;
const SVG_H = 380;
const CX = SVG_W / 2;
const CY = SVG_H / 2 - 10;
const R = 140;

// Equilateral triangle vertices
const VERTICES = [
  { x: CX, y: CY - R, label: 'TERRAIN', angle: -90 },
  { x: CX - R * Math.cos(Math.PI / 6), y: CY + R * Math.sin(Math.PI / 6), label: 'WEATHER', angle: 210 },
  { x: CX + R * Math.cos(Math.PI / 6), y: CY + R * Math.sin(Math.PI / 6), label: 'SNOWPACK', angle: 330 },
];

const trianglePath = `M ${VERTICES[0].x} ${VERTICES[0].y} L ${VERTICES[1].x} ${VERTICES[1].y} L ${VERTICES[2].x} ${VERTICES[2].y} Z`;

export default function AvalancheTriangle({ onComplete }: AvalancheTriangleProps) {
  const [terrain, setTerrain] = useState(30);
  const [weather, setWeather] = useState(30);
  const [snowpack, setSnowpack] = useState(30);
  const [humanFactor, setHumanFactor] = useState(25);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [slabReleased, setSlabReleased] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const combinedRisk = useMemo(() => {
    return Math.round((terrain + weather + snowpack) / 3);
  }, [terrain, weather, snowpack]);

  const overallRisk = useMemo(() => {
    const base = combinedRisk;
    const humanMultiplier = 1 + (humanFactor / 100) * 0.5;
    return Math.min(100, Math.round(base * humanMultiplier));
  }, [combinedRisk, humanFactor]);

  const shouldRelease = terrain > 60 && weather > 60 && snowpack > 60 && humanFactor > 50;

  const fillOpacity = useMemo(() => {
    return combinedRisk / 100 * 0.6;
  }, [combinedRisk]);

  const handleSliderChange = (setter: (v: number) => void) => (value: number) => {
    setter(value);
    if (!hasInteracted) setHasInteracted(true);

    // Check release condition after state updates using the latest values
    const newTerrain = setter === setTerrain ? value : terrain;
    const newWeather = setter === setWeather ? value : weather;
    const newSnowpack = setter === setSnowpack ? value : snowpack;
    const newHuman = setter === setHumanFactor ? value : humanFactor;

    if (newTerrain > 60 && newWeather > 60 && newSnowpack > 60 && newHuman > 50) {
      if (!slabReleased) setSlabReleased(true);
    }
  };

  const handleQuizCorrect = () => {
    setQuizCorrect(true);
    onComplete();
  };

  // Label offsets from vertices
  const labelOffsets = [
    { dx: 0, dy: -18 },
    { dx: -20, dy: 18 },
    { dx: 20, dy: 18 },
  ];

  // Risk values per vertex for visual
  const riskValues = [terrain, weather, snowpack];
  const riskColors = riskValues.map(v =>
    v < 30 ? '#4ADE80' : v < 60 ? '#F59E0B' : '#CC4444'
  );

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <p style={{ color: 'var(--mt-bright)', lineHeight: 1.7, marginBottom: '1rem' }}>
        The <strong>Avalanche Triangle</strong> is the foundational framework for understanding
        avalanche risk. Three environmental factors -- terrain, weather, and snowpack -- combine
        to create avalanche conditions. But there is a fourth, hidden factor: the human element.
      </p>
      <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        Adjust each factor to see how risk compounds. When all three environmental factors are
        high and human overconfidence takes hold, the result is catastrophic.
      </p>

      <div className="mt-module-split">
        <div>
          {/* SVG Triangle Visualization */}
          <div style={{
            background: 'var(--mt-surface)',
            border: '1px solid var(--mt-border)',
            borderRadius: 8,
            padding: '1rem',
            marginBottom: '1.5rem',
            overflow: 'hidden',
          }}>
            <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: 'block' }}>
              <defs>
                <filter id="avTriGlow">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id="humanGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity={humanFactor / 100 * 0.6} />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
                </radialGradient>
              </defs>

              {/* Triangle fill — risk-proportional red */}
              <motion.path
                d={trianglePath}
                fill={`rgba(204, 68, 68, ${fillOpacity})`}
                stroke="none"
                animate={{ opacity: 1 }}
              />

              {/* Triangle outline */}
              <path
                d={trianglePath}
                fill="none"
                stroke="var(--mt-border)"
                strokeWidth={2}
              />

              {/* Edge highlights based on individual risk */}
              {[0, 1, 2].map(i => {
                const next = (i + 1) % 3;
                return (
                  <motion.line
                    key={`edge-${i}`}
                    x1={VERTICES[i].x}
                    y1={VERTICES[i].y}
                    x2={VERTICES[next].x}
                    y2={VERTICES[next].y}
                    stroke={riskColors[i]}
                    strokeWidth={2}
                    animate={{ opacity: riskValues[i] / 100 * 0.8 + 0.2 }}
                    transition={{ duration: 0.3 }}
                  />
                );
              })}

              {/* Vertex labels and risk indicators */}
              {VERTICES.map((v, i) => (
                <g key={v.label}>
                  {/* Vertex dot */}
                  <motion.circle
                    cx={v.x}
                    cy={v.y}
                    r={8}
                    fill={riskColors[i]}
                    animate={{ scale: 0.8 + riskValues[i] / 100 * 0.5 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: `${v.x}px ${v.y}px` }}
                  />
                  {/* Label */}
                  <text
                    x={v.x + labelOffsets[i].dx}
                    y={v.y + labelOffsets[i].dy}
                    textAnchor="middle"
                    fill="var(--mt-bright)"
                    fontSize={11}
                    fontFamily="var(--font-display)"
                    fontWeight={700}
                    letterSpacing="0.08em"
                  >
                    {v.label}
                  </text>
                  {/* Risk value */}
                  <text
                    x={v.x + labelOffsets[i].dx}
                    y={v.y + labelOffsets[i].dy + (labelOffsets[i].dy < 0 ? -13 : 15)}
                    textAnchor="middle"
                    fill={riskColors[i]}
                    fontSize={10}
                    fontFamily="var(--font-mono)"
                  >
                    {riskValues[i]}%
                  </text>
                </g>
              ))}

              {/* Human Factor — center circle */}
              <circle
                cx={CX}
                cy={CY}
                r={35}
                fill="url(#humanGrad)"
              />
              <circle
                cx={CX}
                cy={CY}
                r={28}
                fill="none"
                stroke={humanFactor > 50 ? '#F59E0B' : 'var(--mt-border)'}
                strokeWidth={1.5}
                strokeDasharray="4,3"
              />
              <text
                x={CX}
                y={CY - 8}
                textAnchor="middle"
                fill="var(--mt-muted)"
                fontSize={8}
                fontFamily="var(--font-mono)"
                letterSpacing="0.05em"
              >
                HUMAN
              </text>
              <text
                x={CX}
                y={CY + 6}
                textAnchor="middle"
                fill={humanFactor > 50 ? '#F59E0B' : 'var(--mt-bright)'}
                fontSize={14}
                fontFamily="var(--font-mono)"
                fontWeight={700}
              >
                {humanFactor}%
              </text>
              <text
                x={CX}
                y={CY + 18}
                textAnchor="middle"
                fill="var(--mt-muted)"
                fontSize={7}
                fontFamily="var(--font-mono)"
              >
                overconfidence
              </text>

              {/* Slab release flash */}
              <AnimatePresence>
                {slabReleased && shouldRelease && (
                  <motion.rect
                    x={0}
                    y={0}
                    width={SVG_W}
                    height={SVG_H}
                    fill="var(--mt-danger)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0.1, 0.3, 0] }}
                    transition={{ duration: 1.2, times: [0, 0.1, 0.3, 0.5, 1] }}
                  />
                )}
              </AnimatePresence>
            </svg>
          </div>
        </div>
        <div>
          {/* Slab release warning */}
          <AnimatePresence>
            {shouldRelease && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  background: 'rgba(204, 68, 68, 0.15)',
                  border: '1px solid var(--mt-danger)',
                  borderRadius: 8,
                  padding: '1rem',
                  marginBottom: '1.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm, 0.875rem)',
                  color: 'var(--mt-danger)',
                  textAlign: 'center',
                }}
              >
                SLAB RELEASE -- All environmental factors elevated + human overconfidence. This is how
                people die in avalanches.
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sliders */}
          <div style={{ marginBottom: '0.5rem' }}>
            <InteractiveSlider
              label="Terrain Risk"
              min={0}
              max={100}
              value={terrain}
              onChange={handleSliderChange(setTerrain)}
              formatValue={(v) => `${v}%`}
            />
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <InteractiveSlider
              label="Weather Risk"
              min={0}
              max={100}
              value={weather}
              onChange={handleSliderChange(setWeather)}
              formatValue={(v) => `${v}%`}
            />
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <InteractiveSlider
              label="Snowpack Risk"
              min={0}
              max={100}
              value={snowpack}
              onChange={handleSliderChange(setSnowpack)}
              formatValue={(v) => `${v}%`}
            />
          </div>
          <div style={{
            marginBottom: '1.5rem',
            padding: '1rem',
            background: 'rgba(245, 158, 35, 0.05)',
            border: '1px solid rgba(245, 158, 35, 0.2)',
            borderRadius: 8,
          }}>
            <InteractiveSlider
              label="Human Factor (Overconfidence)"
              min={0}
              max={100}
              value={humanFactor}
              onChange={handleSliderChange(setHumanFactor)}
              formatValue={(v) => `${v}%`}
            />
          </div>

          {/* Danger Meter */}
          <div style={{ marginBottom: '1.5rem' }}>
            <DangerMeter value={overallRisk} label="Overall Avalanche Risk" />
          </div>

          {/* Stats panel */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '0.75rem',
            }}>
              <div style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>
                ENVIRONMENTAL
              </div>
              <div style={{ color: 'var(--mt-bright)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm, 0.875rem)', fontWeight: 700 }}>
                {combinedRisk}%
              </div>
              <div style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', marginTop: '0.15rem' }}>
                Avg of 3 factors
              </div>
            </div>
            <div style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '0.75rem',
            }}>
              <div style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>
                HUMAN MULTIPLIER
              </div>
              <div style={{ color: humanFactor > 50 ? '#F59E0B' : 'var(--mt-bright)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm, 0.875rem)', fontWeight: 700 }}>
                {(1 + (humanFactor / 100) * 0.5).toFixed(2)}x
              </div>
              <div style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', marginTop: '0.15rem' }}>
                {humanFactor > 50 ? 'Elevated bias' : 'Within reason'}
              </div>
            </div>
          </div>

          {/* Educational note */}
          {hasInteracted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ marginBottom: '1.5rem' }}
            >
              <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, fontSize: 'var(--text-sm, 0.875rem)' }}>
                The three environmental factors -- terrain, weather, and snowpack -- are fixed
                conditions you cannot change. The only lever you can pull is the human factor: your
                decisions about where to go, when, and with what information. Overconfidence, summit
                fever, and social pressure are the real killers.
              </p>
            </motion.div>
          )}

          {/* Quiz */}
          {hasInteracted && !quizCorrect && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <QuizBlock
                question="Which factor of the avalanche triangle is the only one that humans can control?"
                options={[
                  { text: 'Terrain -- you can reshape the slope with explosives' },
                  { text: 'Weather -- you can wait for better conditions, effectively controlling exposure' },
                  { text: 'Snowpack -- you can stabilize it by ski-cutting' },
                  { text: 'The human factor -- your decisions about where, when, and whether to go', correct: true },
                ]}
                explanation="Terrain, weather, and snowpack are given conditions. You cannot change the angle of a slope, stop a storm, or restructure weak layers. The only factor within your control is the human factor: your route choices, your willingness to turn around, and your resistance to group pressure and overconfidence."
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
              Module complete. You understand the avalanche triangle and the critical role of human factors.
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
