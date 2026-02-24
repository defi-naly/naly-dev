'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveSlider from '../InteractiveSlider';
import QuizBlock from '../QuizBlock';

interface ValleyFlyingProps {
  onComplete: () => void;
}

interface ValleyState {
  sunAngle: number;
  eastWallLit: boolean;
  westWallLit: boolean;
  thermalEast: number;
  thermalWest: number;
  windType: 'calm' | 'anabatic-east' | 'both' | 'anabatic-west' | 'up-valley' | 'katabatic';
  windLabel: string;
  description: string;
  liftZones: { east: 'green' | 'yellow' | 'red'; west: 'green' | 'yellow' | 'red'; center: 'green' | 'yellow' | 'red' };
}

function getValleyState(hour: number): ValleyState {
  // hour: 6 = 6am, 20 = 8pm
  if (hour < 8) {
    // 6-8am: early morning, sun hits east wall
    const t = (hour - 6) / 2;
    return {
      sunAngle: -60 + t * 30,
      eastWallLit: hour >= 7,
      westWallLit: false,
      thermalEast: t * 0.4,
      thermalWest: 0,
      windType: hour < 7 ? 'calm' : 'anabatic-east',
      windLabel: hour < 7 ? 'Early morning calm' : 'Anabatic on east wall',
      description: hour < 7
        ? 'Dawn. The valley is calm. Cool air pools on the valley floor from overnight katabatic drainage. Wait for the sun to hit the slopes.'
        : 'Morning sun strikes the east-facing wall first. Thermals begin to develop on the sunlit side. Anabatic (up-slope) wind starts on the east wall.',
      liftZones: {
        east: hour >= 7 ? 'green' : 'yellow',
        west: 'red',
        center: 'red',
      },
    };
  } else if (hour < 11) {
    // 8-11am: east wall strong, valley wind building
    const t = (hour - 8) / 3;
    return {
      sunAngle: -30 + t * 30,
      eastWallLit: true,
      westWallLit: hour >= 10,
      thermalEast: 0.5 + t * 0.4,
      thermalWest: hour >= 10 ? 0.2 : 0,
      windType: 'anabatic-east',
      windLabel: 'Strong anabatic east wall + up-valley wind building',
      description: 'The east wall is fully lit and producing strong thermals. The up-valley wind is building as differential heating creates a pressure gradient along the valley axis. Favor the east wall for best lift.',
      liftZones: {
        east: 'green',
        west: hour >= 10 ? 'yellow' : 'red',
        center: 'yellow',
      },
    };
  } else if (hour < 14) {
    // 11am-2pm: both walls lit, peak conditions
    const t = (hour - 11) / 3;
    return {
      sunAngle: 0 + t * 15,
      eastWallLit: true,
      westWallLit: true,
      thermalEast: 0.7 + t * 0.15,
      thermalWest: 0.5 + t * 0.3,
      windType: 'up-valley',
      windLabel: 'Peak: both walls active + strong up-valley wind',
      description: 'Midday. Both valley walls are sunlit and generating thermals. The up-valley wind is strong and steady. Thermals are available on both sides. The center of the valley has sink -- stay near the walls.',
      liftZones: {
        east: 'green',
        west: 'green',
        center: 'red',
      },
    };
  } else if (hour < 17) {
    // 2-5pm: west wall dominant
    const t = (hour - 14) / 3;
    return {
      sunAngle: 15 + t * 30,
      eastWallLit: hour < 15,
      westWallLit: true,
      thermalEast: hour < 15 ? 0.4 - t * 0.3 : 0.1,
      thermalWest: 0.8 - t * 0.15,
      windType: 'anabatic-west',
      windLabel: 'Afternoon: thermals shift to west wall',
      description: 'The afternoon sun favors the west-facing wall. East wall thermals weaken as it falls into shadow. Up-valley wind continues but will begin to weaken. Switch to the west wall for best lift.',
      liftZones: {
        east: hour < 15 ? 'yellow' : 'red',
        west: 'green',
        center: 'red',
      },
    };
  } else if (hour < 19) {
    // 5-7pm: winds dying, transition
    const t = (hour - 17) / 2;
    return {
      sunAngle: 45 + t * 20,
      eastWallLit: false,
      westWallLit: hour < 18,
      thermalEast: 0,
      thermalWest: Math.max(0, 0.3 - t * 0.3),
      windType: 'calm',
      windLabel: 'Evening transition -- winds dying',
      description: 'Evening. Thermals collapse. The up-valley wind dies. This is the transition period before katabatic (down-slope) drainage begins. Time to land.',
      liftZones: {
        east: 'red',
        west: hour < 18 ? 'yellow' : 'red',
        center: 'red',
      },
    };
  } else {
    // 7-8pm: katabatic
    return {
      sunAngle: 70,
      eastWallLit: false,
      westWallLit: false,
      thermalEast: 0,
      thermalWest: 0,
      windType: 'katabatic',
      windLabel: 'Katabatic drainage -- cold air flowing downhill',
      description: 'Night approaches. Cool air drains down both valley walls and flows down-valley. No thermal lift available. Katabatic winds can be gusty near the valley floor.',
      liftZones: {
        east: 'red',
        west: 'red',
        center: 'red',
      },
    };
  }
}

const ZONE_COLORS = {
  green: { fill: 'rgba(74,222,128,0.15)', stroke: '#4ADE80', label: 'Good lift' },
  yellow: { fill: 'rgba(245,158,11,0.12)', stroke: '#F59E0B', label: 'Transition' },
  red: { fill: 'rgba(239,68,68,0.10)', stroke: '#EF4444', label: 'Sink' },
};

function formatHour(h: number): string {
  const period = h >= 12 ? 'PM' : 'AM';
  const display = h > 12 ? h - 12 : h;
  return `${display}:00 ${period}`;
}

export default function ValleyFlying({ onComplete }: ValleyFlyingProps) {
  const [time, setTime] = useState(9);
  const [exploredPhases, setExploredPhases] = useState<Set<string>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);

  const state = useMemo(() => getValleyState(time), [time]);

  const handleTimeChange = useCallback((value: number) => {
    setTime(value);
    setExploredPhases(prev => {
      const next = new Set(prev);
      if (value < 8) next.add('dawn');
      else if (value < 11) next.add('morning');
      else if (value < 14) next.add('midday');
      else if (value < 17) next.add('afternoon');
      else next.add('evening');
      if (next.size >= 4 && !showQuiz) {
        setTimeout(() => setShowQuiz(true), 400);
      }
      return next;
    });
  }, [showQuiz]);

  // Sun position in SVG coordinates
  const sunProgress = Math.max(0, Math.min(1, (time - 6) / 14));
  const sunX = 80 + sunProgress * 440;
  const sunY = 30 + 100 * (1 - Math.sin(sunProgress * Math.PI));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.95rem',
        lineHeight: 1.7,
        color: 'var(--mt-muted)',
      }}>
        Valley flying follows the sun. As it crosses the sky, thermals shift from one wall
        to the other, and the valley wind system builds and decays. Scrub through the day to
        see where the lift is.
      </div>

      <div className="mt-module-split">
        <div>
          {/* SVG valley cross-section */}
          <div style={{
            background: 'var(--mt-surface)',
            border: '1px solid var(--mt-border)',
            borderRadius: 8,
            overflow: 'hidden',
          }}>
            <svg viewBox="0 0 600 320" style={{ width: '100%', display: 'block' }}>
              <defs>
                <linearGradient id="vf-sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={time < 7 || time > 19 ? '#0a1628' : '#2a5080'} />
                  <stop offset="100%" stopColor={time < 7 || time > 19 ? '#0f1e3a' : '#6aa0d0'} />
                </linearGradient>
                <marker id="vf-arrow-up" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
                  <polygon points="0 0, 7 2.5, 0 5" fill="#F5A623" />
                </marker>
                <marker id="vf-arrow-down" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
                  <polygon points="0 0, 7 2.5, 0 5" fill="#7BA7CC" />
                </marker>
                <marker id="vf-arrow-valley" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
                  <polygon points="0 0, 7 2.5, 0 5" fill="var(--mt-bright)" />
                </marker>
              </defs>

              {/* Sky */}
              <rect x={0} y={0} width={600} height={320} fill="url(#vf-sky)" />

              {/* Sun */}
              {time >= 6 && time <= 20 && (
                <motion.g
                  animate={{ opacity: time < 7 || time > 19 ? 0.3 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <circle cx={sunX} cy={sunY} r={16} fill="#F5C542" opacity={0.3} />
                  <circle cx={sunX} cy={sunY} r={11} fill="#F5C542" />
                  {/* Sun rays toward lit wall */}
                  {state.eastWallLit && (
                    <line x1={sunX - 20} y1={sunY + 15} x2={120} y2={180} stroke="#F5C542" strokeWidth={0.8} opacity={0.25} strokeDasharray="4,4" />
                  )}
                  {state.westWallLit && (
                    <line x1={sunX + 20} y1={sunY + 15} x2={480} y2={180} stroke="#F5C542" strokeWidth={0.8} opacity={0.25} strokeDasharray="4,4" />
                  )}
                </motion.g>
              )}

              {/* East mountain wall (left) */}
              <polygon points="0,320 0,70 200,240 200,320" fill={state.eastWallLit ? '#3d3520' : '#222018'} />
              <polygon points="0,70 15,78 200,240" fill={state.eastWallLit ? '#4a4228' : '#2a2518'} opacity={0.6} />

              {/* West mountain wall (right) */}
              <polygon points="600,320 600,90 400,240 400,320" fill={state.westWallLit ? '#3d3520' : '#222018'} />
              <polygon points="600,90 585,98 400,240" fill={state.westWallLit ? '#4a4228' : '#2a2518'} opacity={0.6} />

              {/* Valley floor */}
              <rect x={200} y={270} width={200} height={50} fill="#1a1a10" />
              <line x1={200} y1={270} x2={400} y2={270} stroke="#3a3520" strokeWidth={1} />

              {/* Lift zone overlays - East wall */}
              <motion.polygon
                points="30,120 170,230 170,270 30,200"
                fill={ZONE_COLORS[state.liftZones.east].fill}
                stroke={ZONE_COLORS[state.liftZones.east].stroke}
                strokeWidth={1}
                strokeDasharray="4,3"
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.5 }}
              />

              {/* Lift zone overlays - Center */}
              <motion.rect
                x={210} y={170} width={180} height={95}
                fill={ZONE_COLORS[state.liftZones.center].fill}
                stroke={ZONE_COLORS[state.liftZones.center].stroke}
                strokeWidth={0.8}
                strokeDasharray="3,4"
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.5 }}
              />

              {/* Lift zone overlays - West wall */}
              <motion.polygon
                points="570,140 430,230 430,270 570,210"
                fill={ZONE_COLORS[state.liftZones.west].fill}
                stroke={ZONE_COLORS[state.liftZones.west].stroke}
                strokeWidth={1}
                strokeDasharray="4,3"
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.5 }}
              />

              {/* Energy lines along east wall (thermals) */}
              {state.thermalEast > 0.1 && Array.from({ length: Math.ceil(state.thermalEast * 5) }).map((_, i) => {
                const t = (i + 1) / (Math.ceil(state.thermalEast * 5) + 1);
                const baseX = 40 + t * 110;
                const baseY = 130 + t * 100;
                return (
                  <motion.line
                    key={`et-${i}`}
                    x1={baseX + 15}
                    y1={baseY + 20}
                    x2={baseX}
                    y2={baseY - 20}
                    stroke="#F5A623"
                    strokeWidth={1.8}
                    markerEnd="url(#vf-arrow-up)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: state.thermalEast * 0.8 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  />
                );
              })}

              {/* Energy lines along west wall (thermals) */}
              {state.thermalWest > 0.1 && Array.from({ length: Math.ceil(state.thermalWest * 5) }).map((_, i) => {
                const t = (i + 1) / (Math.ceil(state.thermalWest * 5) + 1);
                const baseX = 560 - t * 110;
                const baseY = 150 + t * 90;
                return (
                  <motion.line
                    key={`wt-${i}`}
                    x1={baseX - 15}
                    y1={baseY + 20}
                    x2={baseX}
                    y2={baseY - 20}
                    stroke="#F5A623"
                    strokeWidth={1.8}
                    markerEnd="url(#vf-arrow-up)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: state.thermalWest * 0.8 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  />
                );
              })}

              {/* Valley wind arrows (horizontal, along valley floor) */}
              {(state.windType === 'up-valley' || state.windType === 'anabatic-east' || state.windType === 'anabatic-west') && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 0.4 }}
                >
                  <line x1={220} y1={258} x2={270} y2={258} stroke="var(--mt-bright)" strokeWidth={1.5} markerEnd="url(#vf-arrow-valley)" />
                  <line x1={290} y1={258} x2={340} y2={258} stroke="var(--mt-bright)" strokeWidth={1.5} markerEnd="url(#vf-arrow-valley)" />
                  <text x={300} y={253} textAnchor="middle" fill="var(--mt-muted)" fontSize={7} fontFamily="var(--font-mono)">UP-VALLEY</text>
                </motion.g>
              )}

              {/* Katabatic arrows */}
              {state.windType === 'katabatic' && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ duration: 0.4 }}
                >
                  {[0.3, 0.5, 0.7].map((t, i) => (
                    <g key={`kat-e-${i}`}>
                      <line
                        x1={40 + t * 100} y1={130 + t * 90 - 15}
                        x2={55 + t * 100} y2={140 + t * 90 + 10}
                        stroke="#7BA7CC" strokeWidth={1.8} markerEnd="url(#vf-arrow-down)"
                      />
                    </g>
                  ))}
                  {[0.3, 0.5, 0.7].map((t, i) => (
                    <g key={`kat-w-${i}`}>
                      <line
                        x1={555 - t * 100} y1={145 + t * 80 - 15}
                        x2={540 - t * 100} y2={155 + t * 80 + 10}
                        stroke="#7BA7CC" strokeWidth={1.8} markerEnd="url(#vf-arrow-down)"
                      />
                    </g>
                  ))}
                  <text x={300} y={253} textAnchor="middle" fill="#7BA7CC" fontSize={7} fontFamily="var(--font-mono)">KATABATIC DRAINAGE</text>
                </motion.g>
              )}

              {/* Zone labels */}
              <text x={90} y={165} textAnchor="middle" fill={ZONE_COLORS[state.liftZones.east].stroke} fontSize={8} fontFamily="var(--font-mono)" fontWeight={700}>
                {ZONE_COLORS[state.liftZones.east].label.toUpperCase()}
              </text>
              <text x={300} y={215} textAnchor="middle" fill={ZONE_COLORS[state.liftZones.center].stroke} fontSize={8} fontFamily="var(--font-mono)" fontWeight={700}>
                {ZONE_COLORS[state.liftZones.center].label.toUpperCase()}
              </text>
              <text x={510} y={175} textAnchor="middle" fill={ZONE_COLORS[state.liftZones.west].stroke} fontSize={8} fontFamily="var(--font-mono)" fontWeight={700}>
                {ZONE_COLORS[state.liftZones.west].label.toUpperCase()}
              </text>

              {/* Time label */}
              <text x={300} y={18} textAnchor="middle" fill="var(--mt-bright)" fontSize={12} fontFamily="var(--font-display)" fontWeight={700}>
                {formatHour(time)} -- {state.windLabel}
              </text>

              {/* Wall labels */}
              <text x={25} y={310} fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">East Wall</text>
              <text x={540} y={310} fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">West Wall</text>
            </svg>
          </div>
        </div>
        <div>
          {/* Time slider */}
          <InteractiveSlider
            label="Time of Day"
            min={6}
            max={20}
            step={0.5}
            value={time}
            onChange={handleTimeChange}
            formatValue={(v) => formatHour(Math.round(v))}
          />

          {/* Readouts */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem',
            marginTop: '1.5rem',
          }}>
            {[
              {
                label: 'East Wall',
                value: state.thermalEast > 0.1 ? `${(state.thermalEast * 4).toFixed(1)} m/s` : 'None',
                color: ZONE_COLORS[state.liftZones.east].stroke,
              },
              {
                label: 'West Wall',
                value: state.thermalWest > 0.1 ? `${(state.thermalWest * 4).toFixed(1)} m/s` : 'None',
                color: ZONE_COLORS[state.liftZones.west].stroke,
              },
              {
                label: 'Valley Center',
                value: state.liftZones.center === 'red' ? 'Sink' : 'Weak lift',
                color: ZONE_COLORS[state.liftZones.center].stroke,
              },
            ].map(item => (
              <div key={item.label} style={{
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
                  {item.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: item.color,
                }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <motion.div
            key={state.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem',
              lineHeight: 1.65,
              color: 'var(--mt-muted)',
              padding: '0.75rem 1rem',
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 6,
              marginTop: '1.5rem',
            }}
          >
            {state.description}
          </motion.div>

          {/* Legend */}
          <div style={{
            display: 'flex',
            gap: '1.25rem',
            flexWrap: 'wrap',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            marginTop: '1.5rem',
          }}>
            {[
              { color: '#4ADE80', label: 'Good lift' },
              { color: '#F59E0B', label: 'Transition' },
              { color: '#EF4444', label: 'Sink zone' },
              { color: '#F5A623', label: 'Thermal arrows' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: item.color, opacity: 0.7 }} />
                <span style={{ color: 'var(--mt-muted)' }}>{item.label}</span>
              </div>
            ))}
          </div>

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
                  question="When flying in a valley, which side should you favor in the morning?"
                  options={[
                    { text: 'The west-facing wall, because it gets afternoon sun' },
                    { text: 'The east-facing wall, because it receives the first sunlight and develops thermals earliest', correct: true },
                    { text: 'The valley center, because thermals converge there' },
                    { text: 'Either wall -- it makes no difference in the morning' },
                  ]}
                  explanation="In the morning, the sun strikes the east-facing valley wall first. This wall heats up and begins producing thermals while the west wall remains in shadow. Anabatic (up-slope) winds develop on the sunlit side, creating reliable lift. As the day progresses and the sun moves overhead, thermals shift to the west wall in the afternoon."
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
