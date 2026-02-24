'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizBlock from '../QuizBlock';

interface SlopeAngleAnalyzerProps {
  onComplete: () => void;
}

const SVG_W = 400;
const SVG_H = 300;

interface TerrainPoint {
  x: number;
  y: number;
  angle: number;
  id: number;
}

// Generate a mountain profile with varying slopes
const TERRAIN_POINTS: TerrainPoint[] = [
  { x: 10, y: 270, angle: 15, id: 0 },
  { x: 60, y: 250, angle: 22, id: 1 },
  { x: 110, y: 210, angle: 28, id: 2 },
  { x: 145, y: 170, angle: 35, id: 3 },
  { x: 175, y: 130, angle: 42, id: 4 },
  { x: 200, y: 80, angle: 50, id: 5 },
  { x: 220, y: 55, angle: 38, id: 6 },
  { x: 260, y: 90, angle: 32, id: 7 },
  { x: 310, y: 150, angle: 27, id: 8 },
  { x: 370, y: 220, angle: 18, id: 9 },
];

// Build the mountain path for the SVG
const mountainPath = (() => {
  let d = `M 0 ${SVG_H} L ${TERRAIN_POINTS[0].x} ${TERRAIN_POINTS[0].y}`;
  for (let i = 1; i < TERRAIN_POINTS.length; i++) {
    const prev = TERRAIN_POINTS[i - 1];
    const curr = TERRAIN_POINTS[i];
    const cpx1 = prev.x + (curr.x - prev.x) * 0.4;
    const cpy1 = prev.y;
    const cpx2 = prev.x + (curr.x - prev.x) * 0.6;
    const cpy2 = curr.y;
    d += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${curr.x} ${curr.y}`;
  }
  d += ` L ${SVG_W} ${SVG_H} Z`;
  return d;
})();

function getDangerZone(angle: number): { color: string; label: string; level: string } {
  if (angle < 25) return { color: '#4ADE80', label: 'Low risk', level: 'GREEN' };
  if (angle <= 30) return { color: '#F59E0B', label: 'Moderate risk', level: 'YELLOW' };
  if (angle <= 45) return { color: '#CC4444', label: 'Prime avalanche terrain', level: 'RED' };
  return { color: '#E8A87C', label: 'Sluffs, less slab danger', level: 'ORANGE' };
}

export default function SlopeAngleAnalyzer({ onComplete }: SlopeAngleAnalyzerProps) {
  const [revealedPoints, setRevealedPoints] = useState<Set<number>>(new Set());
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [routePhase, setRoutePhase] = useState(false);
  const [routePoints, setRoutePoints] = useState<number[]>([]);
  const [routeComplete, setRouteComplete] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const handlePointClick = useCallback((id: number) => {
    if (routePhase) {
      // Route planning mode
      const point = TERRAIN_POINTS[id];
      const zone = getDangerZone(point.angle);
      if (zone.level === 'GREEN' || zone.level === 'YELLOW') {
        setRoutePoints(prev => {
          const next = [...prev, id];
          if (next.length >= 4) {
            setRouteComplete(true);
          }
          return next;
        });
      }
      return;
    }

    // Exploration mode
    setRevealedPoints(prev => {
      const next = new Set(prev);
      next.add(id);
      if (next.size >= 6 && !routePhase) {
        // Enable route phase after exploring 6+ points
        setTimeout(() => setRoutePhase(true), 800);
      }
      return next;
    });
    setSelectedPoint(id);
  }, [routePhase]);

  const handleQuizCorrect = () => {
    setQuizCorrect(true);
    onComplete();
  };

  const selectedData = selectedPoint !== null ? TERRAIN_POINTS[selectedPoint] : null;
  const selectedZone = selectedData ? getDangerZone(selectedData.angle) : null;

  // Stats
  const dangerZoneCount = useMemo(() => {
    return TERRAIN_POINTS.filter(p => p.angle >= 30 && p.angle <= 45).length;
  }, []);

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <p style={{ color: 'var(--mt-bright)', lineHeight: 1.7, marginBottom: '1rem' }}>
        <strong>Slope angle is the single most important terrain factor</strong> in avalanche risk.
        93% of fatal avalanches occur on slopes between 30 and 45 degrees. Learning to read slope
        angle -- even visually -- is a critical backcountry skill.
      </p>
      <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        Click points on the mountain to reveal slope angles. Each is color-coded by danger zone.
        {!routePhase && ' Explore at least 6 points to unlock route planning.'}
        {routePhase && !routeComplete && ' Now plan a safe route by clicking 4 green or yellow points.'}
      </p>

      {/* Legend */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
        flexWrap: 'wrap',
      }}>
        {[
          { color: '#4ADE80', label: '< 25\u00B0 Low' },
          { color: '#F59E0B', label: '25-30\u00B0 Moderate' },
          { color: '#CC4444', label: '30-45\u00B0 Prime' },
          { color: '#E8A87C', label: '> 45\u00B0 Steep' },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: item.color,
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs, 0.75rem)',
              color: 'var(--mt-muted)',
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-module-split">
        <div>
          {/* SVG Mountain Profile */}
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
              <defs>
                <linearGradient id="slopeSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0a1628" />
                  <stop offset="100%" stopColor="#1a2a3a" />
                </linearGradient>
                <linearGradient id="slopeMtn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E0E0E4" />
                  <stop offset="100%" stopColor="#888890" />
                </linearGradient>
              </defs>

              {/* Background */}
              <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="url(#slopeSky)" />

              {/* Mountain fill */}
              <path d={mountainPath} fill="url(#slopeMtn)" opacity={0.3} />
              <path d={mountainPath} fill="none" stroke="var(--mt-bright)" strokeWidth={1.5} opacity={0.6} />

              {/* Route lines */}
              {routePoints.length > 1 && routePoints.map((id, i) => {
                if (i === 0) return null;
                const prev = TERRAIN_POINTS[routePoints[i - 1]];
                const curr = TERRAIN_POINTS[id];
                return (
                  <motion.line
                    key={`route-${i}`}
                    x1={prev.x}
                    y1={prev.y}
                    x2={curr.x}
                    y2={curr.y}
                    stroke="#4ADE80"
                    strokeWidth={2}
                    strokeDasharray="6,3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    transition={{ duration: 0.3 }}
                  />
                );
              })}

              {/* Clickable points */}
              {TERRAIN_POINTS.map((point) => {
                const revealed = revealedPoints.has(point.id);
                const zone = getDangerZone(point.angle);
                const isInRoute = routePoints.includes(point.id);

                return (
                  <g key={point.id} onClick={() => handlePointClick(point.id)} style={{ cursor: 'pointer' }}>
                    {/* Hit area */}
                    <circle cx={point.x} cy={point.y} r={18} fill="transparent" />

                    {/* Point marker */}
                    <motion.circle
                      cx={point.x}
                      cy={point.y}
                      r={revealed ? 8 : 6}
                      fill={revealed ? zone.color : 'rgba(255,255,255,0.3)'}
                      stroke={isInRoute ? '#4ADE80' : revealed ? zone.color : 'rgba(255,255,255,0.5)'}
                      strokeWidth={isInRoute ? 3 : 1.5}
                      whileHover={{ scale: 1.3 }}
                      transition={{ duration: 0.15 }}
                    />

                    {/* Angle label */}
                    {revealed && (
                      <motion.g
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <rect
                          x={point.x - 16}
                          y={point.y - 26}
                          width={32}
                          height={16}
                          rx={3}
                          fill="var(--mt-void)"
                          stroke={zone.color}
                          strokeWidth={1}
                          opacity={0.9}
                        />
                        <text
                          x={point.x}
                          y={point.y - 15}
                          textAnchor="middle"
                          fill={zone.color}
                          fontSize={10}
                          fontFamily="var(--font-mono)"
                          fontWeight={700}
                        >
                          {point.angle}\u00B0
                        </text>
                      </motion.g>
                    )}

                    {/* Pulse animation for unexplored */}
                    {!revealed && !routePhase && (
                      <motion.circle
                        cx={point.x}
                        cy={point.y}
                        r={6}
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth={1}
                        animate={{ r: [6, 14, 6], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: point.id * 0.2 }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
        <div>
          {/* Selected point info */}
          <AnimatePresence mode="wait">
            {selectedData && selectedZone && !routePhase && (
              <motion.div
                key={selectedPoint}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: 'var(--mt-surface)',
                  border: `1px solid ${selectedZone.color}`,
                  borderRadius: 8,
                  padding: '1rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>
                      SLOPE ANGLE
                    </div>
                    <div style={{ color: selectedZone.color, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-lg, 1.25rem)', fontWeight: 700 }}>
                      {selectedData.angle}\u00B0
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs, 0.75rem)',
                      color: selectedZone.color,
                      padding: '0.2rem 0.5rem',
                      border: `1px solid ${selectedZone.color}`,
                      borderRadius: 4,
                      letterSpacing: '0.08em',
                    }}>
                      {selectedZone.level}
                    </div>
                    <div style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-body)', marginTop: '0.25rem' }}>
                      {selectedZone.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress */}
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
                POINTS EXPLORED
              </div>
              <div style={{ color: 'var(--mt-bright)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm, 0.875rem)', fontWeight: 700 }}>
                {revealedPoints.size} / {TERRAIN_POINTS.length}
              </div>
            </div>
            <div style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '0.75rem',
            }}>
              <div style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>
                DANGER ZONE POINTS
              </div>
              <div style={{ color: 'var(--mt-danger)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm, 0.875rem)', fontWeight: 700 }}>
                {dangerZoneCount} of {TERRAIN_POINTS.length} (30-45\u00B0)
              </div>
            </div>
          </div>

          {/* Stats callout */}
          <div style={{
            background: 'rgba(204, 68, 68, 0.08)',
            border: '1px solid rgba(204, 68, 68, 0.3)',
            borderRadius: 8,
            padding: '1rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs, 0.75rem)', color: 'var(--mt-muted)', marginBottom: '0.25rem', letterSpacing: '0.1em' }}>
              CRITICAL STATISTIC
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg, 1.25rem)', color: 'var(--mt-danger)', fontWeight: 700 }}>
              93% of avalanche fatalities occur on 30-45\u00B0 slopes
            </div>
          </div>

          {/* Route planning phase */}
          <AnimatePresence>
            {routePhase && !routeComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(74, 222, 128, 0.08)',
                  border: '1px solid rgba(74, 222, 128, 0.3)',
                  borderRadius: 8,
                  padding: '1rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base, 1rem)', color: '#4ADE80', marginBottom: '0.5rem' }}>
                  Route Planning
                </div>
                <p style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-sm, 0.875rem)', lineHeight: 1.6 }}>
                  Click a sequence of 4 green or yellow points to draw a safe route across the mountain.
                  Red and orange points will be rejected.
                </p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs, 0.75rem)', color: '#4ADE80', marginTop: '0.5rem' }}>
                  Route points: {routePoints.length} / 4
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Route complete message */}
          {routeComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(74, 222, 128, 0.08)',
                border: '1px solid rgba(74, 222, 128, 0.3)',
                borderRadius: 8,
                padding: '1rem',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm, 0.875rem)',
                color: '#4ADE80',
              }}
            >
              Safe route planned. In reality, you would also consider terrain traps, exposure, and
              the avalanche forecast. Slope angle is the starting point, not the full picture.
            </motion.div>
          )}

          {/* Quiz */}
          {routeComplete && !quizCorrect && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <QuizBlock
                question="Why are slopes steeper than 45\u00B0 actually less dangerous than 30-45\u00B0 slopes?"
                options={[
                  { text: 'Steeper slopes have stronger snowpacks due to compression' },
                  { text: 'Snow constantly sluffs off steep slopes, preventing dangerous slab buildup', correct: true },
                  { text: 'Wind removes all snow from slopes above 45\u00B0' },
                  { text: 'Steep slopes are too difficult to access, so fewer people are exposed' },
                ]}
                explanation="Slopes above 45\u00B0 are too steep for cohesive slabs to accumulate. Snow tends to sluff (loose-snow slide) frequently in small amounts, preventing the buildup of large, dangerous slabs. The 30-45\u00B0 range is the sweet spot where slabs can form, bond poorly to weak layers, and release catastrophically when triggered."
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
              Module complete. You can identify slope angle danger zones and plan safer routes.
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
