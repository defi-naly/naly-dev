'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizBlock from '../QuizBlock';

interface CloudType {
  id: string;
  name: string;
  altitudeRange: string;
  altitudeFt: [number, number];
  band: 'high' | 'mid' | 'low';
  description: string;
  weatherSign: string;
  liftPotential: string;
  danger: string;
  svgY: number; // vertical position in the column (0=top)
  color: string;
}

const CLOUDS: CloudType[] = [
  {
    id: 'cirrus',
    name: 'Cirrus',
    altitudeRange: '20,000 - 40,000 ft',
    altitudeFt: [20000, 40000],
    band: 'high',
    description: 'Thin, wispy ice crystal clouds that streak across the sky like brushstrokes.',
    weatherSign: 'Fair weather now, but increasing cirrus can signal an approaching warm front 24-48 hours out.',
    liftPotential: 'None directly. Too high for most soaring.',
    danger: 'Low. Can indicate deteriorating conditions ahead.',
    svgY: 40,
    color: '#D4E6F1',
  },
  {
    id: 'cirrostratus',
    name: 'Cirrostratus',
    altitudeRange: '20,000 - 40,000 ft',
    altitudeFt: [20000, 40000],
    band: 'high',
    description: 'Thin, sheet-like veil that often produces a halo around the sun or moon.',
    weatherSign: 'Warm front approaching within 12-24 hours. Rain or snow likely coming.',
    liftPotential: 'None directly.',
    danger: 'Low cloud itself, but warns of frontal weather arriving.',
    svgY: 70,
    color: '#C8DCE8',
  },
  {
    id: 'altocumulus',
    name: 'Altocumulus',
    altitudeRange: '6,500 - 20,000 ft',
    altitudeFt: [6500, 20000],
    band: 'mid',
    description: 'White or gray patches, often in rows or waves. "Mackerel sky" pattern.',
    weatherSign: 'Unstable air at mid-levels. Morning altocumulus on a warm, humid day can signal afternoon thunderstorms.',
    liftPotential: 'Moderate. Indicates mid-level instability and possible wave activity.',
    danger: 'Moderate. Morning altocumulus castellanus is a strong thunderstorm predictor.',
    svgY: 140,
    color: '#A8C6D8',
  },
  {
    id: 'altostratus',
    name: 'Altostratus',
    altitudeRange: '6,500 - 20,000 ft',
    altitudeFt: [6500, 20000],
    band: 'mid',
    description: 'Gray or blue-gray sheet covering the sky. Sun appears as if through frosted glass.',
    weatherSign: 'Continuous rain or snow likely within hours. Frontal system overhead.',
    liftPotential: 'Poor. Overcast kills thermal activity.',
    danger: 'Moderate. Reduced visibility, icing in winter.',
    svgY: 175,
    color: '#8CAAB8',
  },
  {
    id: 'cumulonimbus',
    name: 'Cumulonimbus',
    altitudeRange: '2,000 - 60,000+ ft',
    altitudeFt: [2000, 60000],
    band: 'low',
    description: 'Towering thunderstorm cloud with anvil top. The king of clouds, spanning all altitude bands.',
    weatherSign: 'Thunderstorms active or imminent. Heavy rain, hail, lightning, strong winds.',
    liftPotential: 'Extreme updrafts (3,000+ ft/min) but absolutely unsurvivable for aircraft.',
    danger: 'EXTREME. Lightning, hail, severe turbulence, tornadoes. The single most dangerous cloud for any pilot or mountaineer.',
    svgY: 100,
    color: '#4A6B7C',
  },
  {
    id: 'cumulus',
    name: 'Cumulus',
    altitudeRange: '2,000 - 6,500 ft',
    altitudeFt: [2000, 6500],
    band: 'low',
    description: 'Puffy white "fair-weather" clouds with flat bases and rounded tops.',
    weatherSign: 'Fair weather if small and scattered. Growing cumulus signals increasing instability.',
    liftPotential: 'Excellent. Marks the top of thermals. Flat base = condensation level.',
    danger: 'Low when small. Watch for rapid vertical growth into towering cumulus.',
    svgY: 250,
    color: '#E8EEF2',
  },
  {
    id: 'stratus',
    name: 'Stratus',
    altitudeRange: '0 - 6,500 ft',
    altitudeFt: [0, 6500],
    band: 'low',
    description: 'Flat, gray, uniform layer like a blanket. Fog that has lifted off the ground.',
    weatherSign: 'Drizzle possible. Stable conditions. Poor visibility on mountains.',
    liftPotential: 'None. Indicates stable, suppressed air.',
    danger: 'Moderate for aviation. Obscures mountain terrain. Ridge and summit whiteout.',
    svgY: 300,
    color: '#96A8B0',
  },
  {
    id: 'stratocumulus',
    name: 'Stratocumulus',
    altitudeRange: '2,000 - 6,500 ft',
    altitudeFt: [2000, 6500],
    band: 'low',
    description: 'Low, lumpy gray-white layer with gaps showing blue sky. Most common cloud type worldwide.',
    weatherSign: 'Generally stable conditions. Light precipitation possible.',
    liftPotential: 'Weak. Some turbulence below but no usable lift.',
    danger: 'Low to moderate. Can lower onto terrain.',
    svgY: 275,
    color: '#B0BEC5',
  },
];

const BAND_LABELS: { band: string; yStart: number; yEnd: number; label: string; range: string }[] = [
  { band: 'high', yStart: 20, yEnd: 115, label: 'HIGH', range: '> 20,000 ft' },
  { band: 'mid', yStart: 115, yEnd: 210, label: 'MID', range: '6,500 - 20,000 ft' },
  { band: 'low', yStart: 210, yEnd: 340, label: 'LOW', range: '< 6,500 ft' },
];

interface CloudTypeIdentifierProps {
  onComplete: () => void;
}

export default function CloudTypeIdentifier({ onComplete }: CloudTypeIdentifierProps) {
  const [selectedCloud, setSelectedCloud] = useState<string | null>(null);
  const [identifiedClouds, setIdentifiedClouds] = useState<Set<string>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  const handleCloudClick = useCallback((cloudId: string) => {
    setSelectedCloud(cloudId);
    setIdentifiedClouds(prev => {
      const next = new Set(prev);
      next.add(cloudId);
      if (next.size >= 6 && !showQuiz) {
        setTimeout(() => setShowQuiz(true), 600);
      }
      return next;
    });
  }, [showQuiz]);

  const handleQuizCorrect = useCallback(() => {
    setQuizPassed(true);
    onComplete();
  }, [onComplete]);

  const selected = CLOUDS.find(c => c.id === selectedCloud);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.95rem',
        lineHeight: 1.7,
        color: 'var(--mt-muted)',
      }}>
        Click on each cloud to learn what it tells you about the weather. Identify at least 6 cloud
        types to unlock the quiz.
      </div>

      {/* Progress indicator */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: identifiedClouds.size >= 6 ? 'var(--mt-weather)' : 'var(--mt-muted)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase' as const,
      }}>
        Identified: {identifiedClouds.size} / 8
        {identifiedClouds.size >= 6 && !quizPassed && ' -- Quiz unlocked'}
        {quizPassed && ' -- Complete'}
      </div>

      {/* Main layout: SVG column + knowledge card */}
      <div className="mt-module-split">
        {/* SVG altitude column */}
        <div>
          <svg
            viewBox="0 0 360 370"
            style={{
              width: '100%',
              maxWidth: 400,
              background: 'var(--mt-surface)',
              borderRadius: 8,
              border: '1px solid var(--mt-border)',
            }}
          >
            {/* Altitude band backgrounds */}
            {BAND_LABELS.map(band => (
              <g key={band.band}>
                <rect
                  x={50}
                  y={band.yStart}
                  width={300}
                  height={band.yEnd - band.yStart}
                  fill={band.band === 'high' ? 'rgba(100,140,200,0.06)' : band.band === 'mid' ? 'rgba(100,140,200,0.03)' : 'rgba(100,140,200,0.01)'}
                  stroke="var(--mt-border)"
                  strokeWidth={0.5}
                  strokeDasharray="4 4"
                />
                <text
                  x={42}
                  y={(band.yStart + band.yEnd) / 2 - 6}
                  textAnchor="end"
                  fill="var(--mt-muted)"
                  fontSize={9}
                  fontFamily="var(--font-mono)"
                >
                  {band.label}
                </text>
                <text
                  x={42}
                  y={(band.yStart + band.yEnd) / 2 + 6}
                  textAnchor="end"
                  fill="var(--mt-muted)"
                  fontSize={7}
                  fontFamily="var(--font-mono)"
                  opacity={0.6}
                >
                  {band.range}
                </text>
              </g>
            ))}

            {/* Cloud shapes */}
            {CLOUDS.map(cloud => {
              const isIdentified = identifiedClouds.has(cloud.id);
              const isSelected = selectedCloud === cloud.id;
              const cx = cloud.id === 'cumulonimbus' ? 280 :
                         cloud.band === 'high' ? 140 + Math.random() * 0 :
                         cloud.band === 'mid' ? 180 : 160;

              // Position clouds at specific x positions for readability
              const positions: Record<string, number> = {
                cirrus: 150,
                cirrostratus: 250,
                altocumulus: 140,
                altostratus: 260,
                cumulonimbus: 310,
                cumulus: 130,
                stratus: 250,
                stratocumulus: 160,
              };

              const px = positions[cloud.id] || 180;

              return (
                <g
                  key={cloud.id}
                  onClick={() => handleCloudClick(cloud.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Cloud body */}
                  {cloud.id === 'cumulonimbus' ? (
                    // Tall towering cloud
                    <>
                      <rect
                        x={px - 20}
                        y={40}
                        width={40}
                        height={280}
                        rx={8}
                        fill={cloud.color}
                        opacity={isSelected ? 1 : isIdentified ? 0.8 : 0.5}
                        stroke={isSelected ? 'var(--mt-weather)' : 'transparent'}
                        strokeWidth={isSelected ? 2 : 0}
                      />
                      {/* Anvil top */}
                      <ellipse
                        cx={px}
                        cy={40}
                        rx={30}
                        ry={10}
                        fill={cloud.color}
                        opacity={isSelected ? 1 : isIdentified ? 0.8 : 0.5}
                      />
                    </>
                  ) : cloud.id === 'stratus' || cloud.id === 'altostratus' ? (
                    // Flat sheet clouds
                    <rect
                      x={px - 45}
                      y={cloud.svgY - 6}
                      width={90}
                      height={12}
                      rx={6}
                      fill={cloud.color}
                      opacity={isSelected ? 1 : isIdentified ? 0.8 : 0.5}
                      stroke={isSelected ? 'var(--mt-weather)' : 'transparent'}
                      strokeWidth={isSelected ? 2 : 0}
                    />
                  ) : cloud.id === 'cirrus' ? (
                    // Wispy streaks
                    <path
                      d={`M${px - 30} ${cloud.svgY} Q${px - 10} ${cloud.svgY - 8} ${px + 5} ${cloud.svgY - 3} Q${px + 20} ${cloud.svgY + 2} ${px + 35} ${cloud.svgY - 5}`}
                      fill="none"
                      stroke={cloud.color}
                      strokeWidth={3}
                      opacity={isSelected ? 1 : isIdentified ? 0.8 : 0.5}
                      strokeLinecap="round"
                    />
                  ) : cloud.id === 'cirrostratus' ? (
                    // Thin veil
                    <rect
                      x={px - 40}
                      y={cloud.svgY - 4}
                      width={80}
                      height={8}
                      rx={4}
                      fill={cloud.color}
                      opacity={isSelected ? 0.7 : isIdentified ? 0.5 : 0.3}
                      stroke={isSelected ? 'var(--mt-weather)' : 'transparent'}
                      strokeWidth={isSelected ? 2 : 0}
                    />
                  ) : (
                    // Puffy / lumpy clouds
                    <ellipse
                      cx={px}
                      cy={cloud.svgY}
                      rx={cloud.id === 'cumulus' ? 25 : 35}
                      ry={cloud.id === 'cumulus' ? 18 : 12}
                      fill={cloud.color}
                      opacity={isSelected ? 1 : isIdentified ? 0.8 : 0.5}
                      stroke={isSelected ? 'var(--mt-weather)' : 'transparent'}
                      strokeWidth={isSelected ? 2 : 0}
                    />
                  )}

                  {/* Label */}
                  <text
                    x={cloud.id === 'cumulonimbus' ? px : px}
                    y={cloud.id === 'cumulonimbus' ? 335 : cloud.svgY + (cloud.id === 'stratus' || cloud.id === 'altostratus' ? 22 : cloud.id === 'cirrus' || cloud.id === 'cirrostratus' ? 18 : 30)}
                    textAnchor="middle"
                    fill={isSelected ? 'var(--mt-bright)' : isIdentified ? 'var(--mt-weather)' : 'var(--mt-muted)'}
                    fontSize={8}
                    fontFamily="var(--font-mono)"
                    fontWeight={isSelected ? 700 : 400}
                  >
                    {cloud.name}
                  </text>

                  {/* Identified check */}
                  {isIdentified && cloud.id !== 'cumulonimbus' && (
                    <circle
                      cx={px + (cloud.id === 'stratus' || cloud.id === 'altostratus' || cloud.id === 'cirrostratus' ? 50 : cloud.id === 'cirrus' ? 42 : 30)}
                      cy={cloud.svgY - 2}
                      r={5}
                      fill="var(--mt-weather)"
                      opacity={0.9}
                    />
                  )}
                </g>
              );
            })}

            {/* Ground */}
            <rect x={50} y={340} width={300} height={30} fill="#2a2a1e" rx={0} />
            <text x={200} y={358} textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">
              GROUND LEVEL
            </text>
          </svg>
        </div>

        {/* Knowledge card + Quiz */}
        <div>
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 8,
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--mt-bright)',
                }}>
                  {selected.name}
                </div>

                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--mt-weather)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase' as const,
                  display: 'flex',
                  gap: '0.75rem',
                }}>
                  <span>{selected.band} level</span>
                  <span style={{ color: 'var(--mt-muted)' }}>|</span>
                  <span>{selected.altitudeRange}</span>
                </div>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  lineHeight: 1.65,
                  color: 'var(--mt-muted)',
                  margin: 0,
                }}>
                  {selected.description}
                </p>

                {[
                  { label: 'Weather sign', value: selected.weatherSign },
                  { label: 'Lift potential', value: selected.liftPotential },
                  { label: 'Danger', value: selected.danger },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--mt-weather)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase' as const,
                      marginBottom: '0.25rem',
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.82rem',
                      lineHeight: 1.55,
                      color: 'var(--mt-bright)',
                    }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  background: 'var(--mt-surface)',
                  border: '1px dashed var(--mt-border)',
                  borderRadius: 8,
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  color: 'var(--mt-muted)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                }}
              >
                Click on a cloud in the altitude column to learn about it.
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quiz section */}
          <AnimatePresence>
            {showQuiz && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ marginTop: '1rem' }}
              >
                <QuizBlock
                  question="Which cloud type indicates the strongest lift for a pilot but also the greatest danger?"
                  options={[
                    { text: 'Cumulus -- reliable thermals with flat bases' },
                    { text: 'Cumulonimbus -- extreme updrafts but lightning, hail, and severe turbulence', correct: true },
                    { text: 'Altocumulus -- mid-level instability with moderate lift' },
                    { text: 'Cirrus -- high altitude ice crystals indicating jet stream' },
                  ]}
                  explanation="Cumulonimbus clouds generate updrafts exceeding 3,000 ft/min, far stronger than any other cloud type. But they also produce lightning, hail, severe turbulence, microbursts, and even tornadoes. No pilot should ever intentionally enter a cumulonimbus. The lift inside is unsurvivable -- aircraft have been torn apart or carried to altitudes where pilots lose consciousness."
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
