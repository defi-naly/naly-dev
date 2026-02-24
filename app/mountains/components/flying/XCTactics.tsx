'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveSlider from '../InteractiveSlider';
import QuizBlock from '../QuizBlock';
import DangerMeter from '../DangerMeter';

interface XCTacticsProps {
  onComplete: () => void;
}

interface Waypoint {
  x: number;
  y: number;
  id: number;
}

// Terrain features
const RIDGES = [
  { x1: 80, y1: 60, x2: 200, y2: 120, label: 'North Ridge' },
  { x1: 320, y1: 80, x2: 450, y2: 150, label: 'East Ridge' },
  { x1: 150, y1: 280, x2: 300, y2: 350, label: 'South Ridge' },
];

const THERMAL_SOURCES = [
  { x: 120, y: 100, type: 'ridge', label: 'Ridge thermal' },
  { x: 380, y: 120, type: 'ridge', label: 'Ridge thermal' },
  { x: 250, y: 200, type: 'town', label: 'Town thermal' },
  { x: 430, y: 280, type: 'dark-field', label: 'Dark field' },
  { x: 100, y: 300, type: 'dark-field', label: 'Plowed field' },
  { x: 350, y: 350, type: 'town', label: 'Village' },
];

const LANDING_FIELDS = [
  { x: 180, y: 180, w: 30, h: 20, label: 'LZ Alpha' },
  { x: 300, y: 250, w: 35, h: 18, label: 'LZ Bravo' },
  { x: 440, y: 340, w: 28, h: 22, label: 'LZ Charlie' },
  { x: 80, y: 220, w: 32, h: 16, label: 'LZ Delta' },
];

// Elevation shading bands (lighter = higher)
const ELEVATION_BANDS = [
  { yMin: 0, yMax: 100, color: '#1a1c1e' },    // highest terrain
  { yMin: 100, yMax: 200, color: '#171919' },
  { yMin: 200, yMax: 300, color: '#141616' },
  { yMin: 300, yMax: 420, color: '#121414' },   // valley floor
];

const SVG_SIZE = 480;

function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Glide cone radius based on altitude and glide ratio
function glideConeRadius(altitude: number, glideRatio: number): number {
  // 1 pixel ~ 50m horizontal, altitude in meters
  return (altitude * glideRatio) / 50;
}

export default function XCTactics({ onComplete }: XCTacticsProps) {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [windDirection, setWindDirection] = useState(270); // degrees, 270 = from west
  const [windSpeed, setWindSpeed] = useState(10); // km/h
  const [altitude, setAltitude] = useState(1500); // meters
  const [glideRatio] = useState(9); // typical paraglider
  const [nextId, setNextId] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [hasPlacedEnough, setHasPlacedEnough] = useState(false);

  const handleMapClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (waypoints.length >= 5) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const scaleX = SVG_SIZE / rect.width;
    const scaleY = SVG_SIZE / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setWaypoints(prev => {
      const next = [...prev, { x, y, id: nextId }];
      if (next.length >= 3 && !hasPlacedEnough) {
        setHasPlacedEnough(true);
        setTimeout(() => setShowQuiz(true), 800);
      }
      return next;
    });
    setNextId(prev => prev + 1);
  }, [waypoints.length, nextId, hasPlacedEnough]);

  const clearWaypoints = useCallback(() => {
    setWaypoints([]);
  }, []);

  // Wind vector for display
  const windRad = (windDirection * Math.PI) / 180;
  const windDx = Math.cos(windRad);
  const windDy = Math.sin(windRad);

  // Glide cone for each waypoint (ellipse stretched by wind)
  const coneRadius = glideConeRadius(altitude, glideRatio);
  const windStretchFactor = 1 + (windSpeed / 30) * 0.6;

  // Route scoring
  const routeScore = useMemo(() => {
    if (waypoints.length < 2) return null;

    let totalDistance = 0;
    let thermalCoverage = 0;
    let landingOptions = 0;
    let windPenalty = 0;

    for (let i = 0; i < waypoints.length - 1; i++) {
      const wp = waypoints[i];
      const next = waypoints[i + 1];
      const segDist = distance(wp.x, wp.y, next.x, next.y);
      totalDistance += segDist;

      // Check thermal sources near segment
      const segMidX = (wp.x + next.x) / 2;
      const segMidY = (wp.y + next.y) / 2;
      THERMAL_SOURCES.forEach(ts => {
        if (distance(segMidX, segMidY, ts.x, ts.y) < 80) thermalCoverage++;
      });

      // Check landing fields along route
      LANDING_FIELDS.forEach(lf => {
        const lfCenterX = lf.x + lf.w / 2;
        const lfCenterY = lf.y + lf.h / 2;
        if (distance(segMidX, segMidY, lfCenterX, lfCenterY) < 100) landingOptions++;
      });

      // Wind penalty: flying into wind costs more
      const segDx = next.x - wp.x;
      const segDy = next.y - wp.y;
      const segLen = Math.sqrt(segDx * segDx + segDy * segDy) || 1;
      const dotProduct = (segDx / segLen) * (-windDx) + (segDy / segLen) * (-windDy);
      if (dotProduct > 0) windPenalty += dotProduct * windSpeed * 0.5;
    }

    const distScore = Math.min(100, (totalDistance / 300) * 100);
    const thermalScore = Math.min(100, (thermalCoverage / (waypoints.length - 1)) * 50);
    const landingScore = Math.min(100, landingOptions * 25);
    const windScore = Math.max(0, 100 - windPenalty * 2);

    const overall = (distScore * 0.25 + thermalScore * 0.35 + landingScore * 0.2 + windScore * 0.2);

    return {
      totalDistance: (totalDistance * 50) / 1000, // convert to km
      thermalCoverage: Math.round(thermalScore),
      landingOptions: Math.min(landingOptions, 4),
      windPenalty: Math.round(100 - windScore),
      overall: Math.round(overall),
    };
  }, [waypoints, windDx, windDy, windSpeed]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.95rem',
        lineHeight: 1.7,
        color: 'var(--mt-muted)',
      }}>
        Plan a cross-country route on the map below. Click to place waypoints (max 5).
        Each waypoint shows your glide cone -- the area you can reach from that altitude.
        Wind distorts the cone. Route along thermal sources and near landing fields.
      </div>

      <div className="mt-module-split">
        <div>
          {/* Map */}
          <div style={{
            background: 'var(--mt-surface)',
            border: '1px solid var(--mt-border)',
            borderRadius: 8,
            overflow: 'hidden',
            position: 'relative',
          }}>
            <svg
              viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
              style={{ width: '100%', display: 'block', cursor: waypoints.length < 5 ? 'crosshair' : 'default' }}
              onClick={handleMapClick}
            >
              {/* Elevation shading */}
              {ELEVATION_BANDS.map((band, i) => (
                <rect key={i} x={0} y={band.yMin} width={SVG_SIZE} height={band.yMax - band.yMin} fill={band.color} />
              ))}

              {/* Ridges */}
              {RIDGES.map((ridge, i) => (
                <g key={`ridge-${i}`}>
                  <line
                    x1={ridge.x1} y1={ridge.y1} x2={ridge.x2} y2={ridge.y2}
                    stroke="#2a2820" strokeWidth={8} strokeLinecap="round"
                  />
                  <line
                    x1={ridge.x1} y1={ridge.y1} x2={ridge.x2} y2={ridge.y2}
                    stroke="#3a3525" strokeWidth={4} strokeLinecap="round"
                  />
                  <text
                    x={(ridge.x1 + ridge.x2) / 2}
                    y={(ridge.y1 + ridge.y2) / 2 - 8}
                    textAnchor="middle" fill="var(--mt-muted)" fontSize={7} fontFamily="var(--font-mono)"
                    opacity={0.6}
                  >
                    {ridge.label}
                  </text>
                </g>
              ))}

              {/* Thermal sources */}
              {THERMAL_SOURCES.map((ts, i) => (
                <g key={`thermal-${i}`}>
                  <circle
                    cx={ts.x} cy={ts.y} r={10}
                    fill={ts.type === 'ridge' ? 'rgba(245,166,35,0.15)' : ts.type === 'town' ? 'rgba(200,160,80,0.15)' : 'rgba(139,90,43,0.2)'}
                    stroke={ts.type === 'ridge' ? '#F5A623' : ts.type === 'town' ? '#C8A050' : '#8B5A2B'}
                    strokeWidth={1}
                    strokeDasharray="3,2"
                  />
                  <text
                    x={ts.x} y={ts.y + 18}
                    textAnchor="middle" fill="var(--mt-muted)" fontSize={6} fontFamily="var(--font-mono)"
                  >
                    {ts.label}
                  </text>
                  {/* Thermal symbol */}
                  <text
                    x={ts.x} y={ts.y + 3}
                    textAnchor="middle" fill={ts.type === 'ridge' ? '#F5A623' : '#C8A050'} fontSize={9} fontFamily="var(--font-mono)"
                  >
                    ^
                  </text>
                </g>
              ))}

              {/* Landing fields */}
              {LANDING_FIELDS.map((lf, i) => (
                <g key={`lz-${i}`}>
                  <rect
                    x={lf.x} y={lf.y} width={lf.w} height={lf.h}
                    fill="rgba(74,222,128,0.2)" stroke="#4ADE80" strokeWidth={1} rx={2}
                  />
                  <text
                    x={lf.x + lf.w / 2} y={lf.y - 4}
                    textAnchor="middle" fill="#4ADE80" fontSize={6} fontFamily="var(--font-mono)"
                  >
                    {lf.label}
                  </text>
                </g>
              ))}

              {/* Wind arrow */}
              <g>
                <line
                  x1={SVG_SIZE - 60} y1={30}
                  x2={SVG_SIZE - 60 + windDx * 25} y2={30 + windDy * 25}
                  stroke="var(--mt-bright)" strokeWidth={2}
                />
                <polygon
                  points={`${SVG_SIZE - 60 + windDx * 30},${30 + windDy * 30} ${SVG_SIZE - 60 + windDx * 22 - windDy * 5},${30 + windDy * 22 + windDx * 5} ${SVG_SIZE - 60 + windDx * 22 + windDy * 5},${30 + windDy * 22 - windDx * 5}`}
                  fill="var(--mt-bright)"
                />
                <text
                  x={SVG_SIZE - 60} y={18}
                  textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)"
                >
                  WIND {windSpeed} km/h
                </text>
              </g>

              {/* Glide cones for waypoints */}
              {waypoints.map((wp) => {
                // Ellipse: stretched downwind
                const rx = coneRadius;
                const ry = coneRadius;
                // Offset center downwind
                const offsetX = windDx * coneRadius * (windStretchFactor - 1) * 0.5;
                const offsetY = windDy * coneRadius * (windStretchFactor - 1) * 0.5;
                // Stretch in wind direction
                const angle = (windDirection * 180) / Math.PI; // for rotation

                return (
                  <motion.g key={wp.id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                    <ellipse
                      cx={wp.x + offsetX}
                      cy={wp.y + offsetY}
                      rx={rx * windStretchFactor}
                      ry={ry / windStretchFactor}
                      transform={`rotate(${windDirection}, ${wp.x + offsetX}, ${wp.y + offsetY})`}
                      fill="rgba(232,168,124,0.08)"
                      stroke="var(--mt-flying)"
                      strokeWidth={1}
                      strokeDasharray="4,3"
                    />
                  </motion.g>
                );
              })}

              {/* Route lines */}
              {waypoints.length > 1 && waypoints.map((wp, i) => {
                if (i === 0) return null;
                const prev = waypoints[i - 1];
                return (
                  <motion.line
                    key={`route-${wp.id}`}
                    x1={prev.x} y1={prev.y}
                    x2={wp.x} y2={wp.y}
                    stroke="var(--mt-flying)"
                    strokeWidth={2}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    transition={{ duration: 0.4 }}
                  />
                );
              })}

              {/* Waypoint markers */}
              {waypoints.map((wp, i) => (
                <motion.g key={wp.id} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                  <circle cx={wp.x} cy={wp.y} r={8} fill="var(--mt-flying)" stroke="var(--mt-void)" strokeWidth={2} />
                  <text
                    x={wp.x} y={wp.y + 4}
                    textAnchor="middle" fill="var(--mt-void)" fontSize={9} fontFamily="var(--font-mono)" fontWeight={700}
                  >
                    {i + 1}
                  </text>
                </motion.g>
              ))}

              {/* Map border */}
              <rect x={0} y={0} width={SVG_SIZE} height={SVG_SIZE} fill="none" stroke="var(--mt-border)" strokeWidth={1} />

              {/* Instructions */}
              {waypoints.length === 0 && (
                <text
                  x={SVG_SIZE / 2} y={SVG_SIZE / 2}
                  textAnchor="middle" fill="var(--mt-muted)" fontSize={11} fontFamily="var(--font-body)"
                >
                  Click to place waypoints
                </text>
              )}

              {/* Legend */}
              <g transform="translate(10, 400)">
                <rect x={0} y={0} width={120} height={68} fill="var(--mt-void)" stroke="var(--mt-border)" strokeWidth={0.5} rx={4} opacity={0.9} />
                <circle cx={12} cy={14} r={4} fill="var(--mt-flying)" />
                <text x={22} y={17} fill="var(--mt-muted)" fontSize={7} fontFamily="var(--font-mono)">Waypoint</text>
                <text x={12} y={32} fill="#F5A623" fontSize={8} fontFamily="var(--font-mono)">^</text>
                <text x={22} y={32} fill="var(--mt-muted)" fontSize={7} fontFamily="var(--font-mono)">Thermal source</text>
                <rect x={8} y={40} width={8} height={6} fill="rgba(74,222,128,0.3)" stroke="#4ADE80" strokeWidth={0.5} />
                <text x={22} y={47} fill="var(--mt-muted)" fontSize={7} fontFamily="var(--font-mono)">Landing zone</text>
                <line x1={8} y1={58} x2={18} y2={58} stroke="#3a3525" strokeWidth={2} />
                <text x={22} y={61} fill="var(--mt-muted)" fontSize={7} fontFamily="var(--font-mono)">Ridge</text>
              </g>
            </svg>
          </div>
        </div>
        <div>
          {/* Controls */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <button
              onClick={clearWaypoints}
              style={{
                padding: '0.5rem 1rem',
                background: 'transparent',
                border: '1px solid var(--mt-border)',
                color: 'var(--mt-muted)',
                borderRadius: 6,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              Clear Route
            </button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--mt-muted)' }}>
              {waypoints.length}/5 waypoints
            </span>
          </div>

          <InteractiveSlider
            label="Wind Direction"
            min={0}
            max={359}
            step={5}
            value={windDirection}
            onChange={setWindDirection}
            formatValue={(v) => {
              const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
              return `${dirs[Math.round(v / 45) % 8]} (${v}\u00B0)`;
            }}
          />
          <div style={{ marginTop: '1.5rem' }}>
            <InteractiveSlider
              label="Wind Speed"
              min={0}
              max={40}
              step={1}
              value={windSpeed}
              onChange={setWindSpeed}
              unit=" km/h"
            />
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <InteractiveSlider
              label="Altitude AGL"
              min={500}
              max={3000}
              step={100}
              value={altitude}
              onChange={setAltitude}
              formatValue={(v) => `${v}m`}
            />
          </div>

          {/* Route score */}
          {routeScore && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'var(--mt-surface)',
                border: '1px solid var(--mt-border)',
                borderRadius: 8,
                padding: '1rem',
                marginTop: '1.5rem',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--mt-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                marginBottom: '0.75rem',
              }}>
                Route Analysis
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                marginBottom: '0.75rem',
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--mt-muted)' }}>DISTANCE</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--mt-bright)' }}>
                    {routeScore.totalDistance.toFixed(1)} km
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--mt-muted)' }}>THERMAL COVERAGE</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: routeScore.thermalCoverage > 50 ? '#4ADE80' : '#F59E0B' }}>
                    {routeScore.thermalCoverage}%
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--mt-muted)' }}>LANDING OPTIONS</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: routeScore.landingOptions >= 2 ? '#4ADE80' : '#EF4444' }}>
                    {routeScore.landingOptions} fields
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--mt-muted)' }}>WIND PENALTY</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: routeScore.windPenalty < 30 ? '#4ADE80' : '#EF4444' }}>
                    {routeScore.windPenalty}%
                  </div>
                </div>
              </div>
              <DangerMeter
                value={100 - routeScore.overall}
                label="Route risk"
              />
            </motion.div>
          )}

          {/* Quiz */}
          <AnimatePresence>
            {showQuiz && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ marginTop: '1.5rem' }}
              >
                <QuizBlock
                  question="When planning a cross-country route, why is it better to fly along ridges rather than across valleys?"
                  options={[
                    { text: 'Ridges are lower, making it easier to stay below airspace limits' },
                    { text: 'Ridges generate thermals and ridge lift, and provide more landing options along the route', correct: true },
                    { text: 'Valleys have stronger wind that prevents forward progress' },
                    { text: 'There is no difference -- valleys and ridges are equally good for XC flying' },
                  ]}
                  explanation="Ridges are thermal factories. Sun-heated slopes generate thermals, and wind deflected up ridge faces creates ridge lift. Flying along ridges keeps you near continuous lift sources and often near launchable slopes if you need to scratch back up. Crossing valleys means flying through sink with no lift sources, requiring more altitude reserve and increasing the risk of landing out."
                  onCorrect={onComplete}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
