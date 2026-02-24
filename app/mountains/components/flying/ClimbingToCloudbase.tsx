'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import DangerMeter from '../DangerMeter';
import QuizBlock from '../QuizBlock';

interface ClimbingToCloudbaseProps {
  onComplete: () => void;
}

const SVG_W = 120;
const SVG_H = 500;
const MARGIN = { top: 30, bottom: 30 };
const GAUGE_H = SVG_H - MARGIN.top - MARGIN.bottom;

const MAX_ALT = 10000; // feet
const CLIMB_RATE_BASE = 80; // ft per tick at peak
const TICK_INTERVAL = 100; // ms

function altToY(alt: number): number {
  return MARGIN.top + GAUGE_H - (alt / MAX_ALT) * GAUGE_H;
}

export default function ClimbingToCloudbase({ onComplete }: ClimbingToCloudbaseProps) {
  // Random parameters for each attempt
  const params = useMemo(() => {
    const cloudbase = 7000 + Math.random() * 2500; // 7000-9500ft
    const inversion = 4000 + Math.random() * 2000; // 4000-6000ft (thermal weakens temporarily)
    const cloudSuckStart = cloudbase - 600; // danger zone begins
    const optimal = cloudbase - 750; // sweet spot: 500-1000ft below cloudbase
    return { cloudbase, inversion, cloudSuckStart, optimal };
  }, []);

  const [altitude, setAltitude] = useState(1500);
  const [running, setRunning] = useState(false);
  const [departed, setDeparted] = useState(false);
  const [departureAlt, setDepartureAlt] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [cloudSuckEntered, setCloudSuckEntered] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Thermal strength as a function of altitude
  const thermalStrength = useCallback(
    (alt: number): number => {
      // Weak at low altitude
      if (alt < 2000) return 0.3 + (alt / 2000) * 0.4;
      // Strong in the middle
      if (alt < params.inversion) return 0.7 + ((alt - 2000) / (params.inversion - 2000)) * 0.3;
      // Weakens through inversion
      if (alt < params.inversion + 800) {
        const t = (alt - params.inversion) / 800;
        return 1.0 - t * 0.5; // drops to 0.5
      }
      // Rebuilds above inversion
      if (alt < params.cloudSuckStart) {
        const t = (alt - params.inversion - 800) / (params.cloudSuckStart - params.inversion - 800);
        return 0.5 + t * 0.5;
      }
      // Cloud suck zone: very strong but dangerous
      if (alt < params.cloudbase) {
        return 1.0 + ((alt - params.cloudSuckStart) / (params.cloudbase - params.cloudSuckStart)) * 0.8;
      }
      // Above cloudbase: no lift
      return 0;
    },
    [params],
  );

  const currentStrength = thermalStrength(altitude);
  const climbRate = currentStrength * CLIMB_RATE_BASE;
  const inCloudSuck = altitude >= params.cloudSuckStart;
  const dangerLevel = inCloudSuck
    ? Math.min(100, ((altitude - params.cloudSuckStart) / (params.cloudbase - params.cloudSuckStart)) * 100)
    : 0;

  // Climbing loop
  useEffect(() => {
    if (!running) return;

    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + TICK_INTERVAL);
      setAltitude((prev) => {
        const newAlt = prev + climbRate * (TICK_INTERVAL / 1000);
        if (newAlt >= params.cloudbase) {
          // Entered cloud -- forced departure, worst outcome
          setDeparted(true);
          setDepartureAlt(params.cloudbase);
          setRunning(false);
          setCloudSuckEntered(true);
          return params.cloudbase;
        }
        if (newAlt >= params.cloudSuckStart && !cloudSuckEntered) {
          setCloudSuckEntered(true);
        }
        return newAlt;
      });
    }, TICK_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running, climbRate, params, cloudSuckEntered]);

  // Calculate score when departed
  useEffect(() => {
    if (!departed || departureAlt === null) return;

    const diff = Math.abs(departureAlt - params.optimal);
    // Perfect = 0ft diff = 100 score; > 2000ft diff = 0
    const raw = Math.max(0, 100 - (diff / 2000) * 100);

    // Penalty for entering cloud suck zone
    let penalty = 0;
    if (departureAlt >= params.cloudbase) {
      penalty = 50; // Entered cloud, major penalty
    } else if (departureAlt >= params.cloudSuckStart) {
      penalty = 15; // Was in danger zone
    } else if (departureAlt < params.optimal - 1500) {
      penalty = 10; // Left way too early
    }

    setScore(Math.max(0, Math.round(raw - penalty)));
  }, [departed, departureAlt, params]);

  const handleStart = useCallback(() => {
    setAltitude(1500);
    setRunning(true);
    setDeparted(false);
    setDepartureAlt(null);
    setScore(null);
    setElapsed(0);
    setCloudSuckEntered(false);
  }, []);

  const handleLeave = useCallback(() => {
    setDeparted(true);
    setDepartureAlt(altitude);
    setRunning(false);
  }, [altitude]);

  // Altitude ticks
  const altTicks = [0, 2000, 4000, 6000, 8000, 10000];

  const scoreLabel =
    score === null
      ? ''
      : score >= 80
        ? 'EXCELLENT'
        : score >= 60
          ? 'GOOD'
          : score >= 40
            ? 'MARGINAL'
            : 'POOR';
  const scoreColor =
    score === null
      ? 'var(--mt-muted)'
      : score >= 80
        ? '#4ADE80'
        : score >= 60
          ? 'var(--mt-flying)'
          : score >= 40
            ? '#F59E0B'
            : 'var(--mt-danger)';

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <p style={{ color: 'var(--mt-bright)', lineHeight: 1.7, marginBottom: '0.5rem' }}>
        You are climbing in a thermal. The lift strengthens, then weakens through an inversion, then
        surges again near cloudbase. But the &quot;cloud suck&quot; zone near the top is dangerous — strong
        lift that can pull you into the cloud where you lose visual reference.
      </p>
      <p
        style={{
          color: 'var(--mt-muted)',
          lineHeight: 1.7,
          marginBottom: '1.5rem',
          fontSize: 'var(--text-sm)',
        }}
      >
        Leave the thermal at the right altitude: 500-1000 ft below cloudbase. Too early wastes
        altitude. Too late means entering the cloud suck zone.
      </p>

      {!running && !departed && (
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
          Enter Thermal
        </button>
      )}

      {(running || departed) && (
        <div className="mt-module-split">
          <div>
            {/* Altitude gauge */}
            <div
              style={{
                background: 'var(--mt-surface)',
                border: '1px solid var(--mt-border)',
                borderRadius: 8,
                padding: '0.5rem',
                overflow: 'hidden',
              }}
            >
              <svg
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                width={100}
                height={400}
                style={{ display: 'block' }}
              >
                <rect width={SVG_W} height={SVG_H} fill="var(--mt-void)" rx={4} />

                {/* Cloud zone at top */}
                <rect
                  x={0}
                  y={MARGIN.top}
                  width={SVG_W}
                  height={Math.max(0, altToY(params.cloudbase) - MARGIN.top)}
                  fill="rgba(200,210,230,0.08)"
                  rx={4}
                />

                {/* Cloud suck danger zone */}
                <rect
                  x={0}
                  y={altToY(params.cloudbase)}
                  width={SVG_W}
                  height={altToY(params.cloudSuckStart) - altToY(params.cloudbase)}
                  fill="rgba(204,68,68,0.12)"
                />
                <text
                  x={SVG_W / 2}
                  y={altToY((params.cloudbase + params.cloudSuckStart) / 2) + 3}
                  textAnchor="middle"
                  fill="var(--mt-danger)"
                  fontSize={7}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                >
                  CLOUD SUCK
                </text>

                {/* Cloudbase line */}
                <line
                  x1={0}
                  y1={altToY(params.cloudbase)}
                  x2={SVG_W}
                  y2={altToY(params.cloudbase)}
                  stroke="rgba(200,210,230,0.4)"
                  strokeWidth={1.5}
                  strokeDasharray="4,3"
                />
                <text
                  x={SVG_W / 2}
                  y={altToY(params.cloudbase) - 5}
                  textAnchor="middle"
                  fill="rgba(200,210,230,0.6)"
                  fontSize={7}
                  fontFamily="var(--font-mono)"
                >
                  CLOUDBASE
                </text>

                {/* Inversion layer */}
                <line
                  x1={20}
                  y1={altToY(params.inversion)}
                  x2={SVG_W - 20}
                  y2={altToY(params.inversion)}
                  stroke="var(--mt-flying)"
                  strokeWidth={1}
                  strokeDasharray="3,4"
                  opacity={0.4}
                />
                <text
                  x={SVG_W / 2}
                  y={altToY(params.inversion) + 12}
                  textAnchor="middle"
                  fill="var(--mt-flying)"
                  fontSize={6}
                  fontFamily="var(--font-mono)"
                  opacity={0.5}
                >
                  INVERSION
                </text>

                {/* Optimal departure zone */}
                <rect
                  x={SVG_W - 16}
                  y={altToY(params.cloudbase - 500)}
                  width={12}
                  height={altToY(params.cloudbase - 1000) - altToY(params.cloudbase - 500)}
                  fill="rgba(74,222,128,0.2)"
                  rx={2}
                />
                <text
                  x={SVG_W - 10}
                  y={altToY(params.optimal) - 5}
                  textAnchor="middle"
                  fill="#4ADE80"
                  fontSize={5}
                  fontFamily="var(--font-mono)"
                  opacity={0.7}
                >
                  SWEET
                </text>

                {/* Altitude ticks */}
                {altTicks.map((alt) => {
                  const y = altToY(alt);
                  return (
                    <g key={alt}>
                      <line
                        x1={0}
                        y1={y}
                        x2={8}
                        y2={y}
                        stroke="var(--mt-muted)"
                        strokeWidth={0.5}
                      />
                      <text
                        x={12}
                        y={y + 3}
                        fill="var(--mt-muted)"
                        fontSize={7}
                        fontFamily="var(--font-mono)"
                      >
                        {(alt / 1000).toFixed(0)}k
                      </text>
                    </g>
                  );
                })}

                {/* Thermal strength indicator (gradient bar on left) */}
                {Array.from({ length: 50 }).map((_, i) => {
                  const alt = (i / 49) * MAX_ALT;
                  const y = altToY(alt);
                  const strength = thermalStrength(alt);
                  const color =
                    alt >= params.cloudSuckStart
                      ? `rgba(204,68,68,${strength * 0.5})`
                      : `rgba(232,168,124,${strength * 0.5})`;
                  return (
                    <rect
                      key={i}
                      x={35}
                      y={y - (GAUGE_H / 49) / 2}
                      width={6}
                      height={GAUGE_H / 49 + 1}
                      fill={color}
                    />
                  );
                })}

                {/* Pilot marker */}
                <motion.g animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                  <rect
                    x={48}
                    y={altToY(altitude) - 8}
                    width={SVG_W - 60}
                    height={16}
                    rx={3}
                    fill={inCloudSuck ? 'rgba(204,68,68,0.3)' : 'rgba(232,168,124,0.2)'}
                    stroke={inCloudSuck ? 'var(--mt-danger)' : 'var(--mt-flying)'}
                    strokeWidth={1}
                  />
                  <text
                    x={SVG_W / 2 + 10}
                    y={altToY(altitude) + 4}
                    textAnchor="middle"
                    fill={inCloudSuck ? 'var(--mt-danger)' : 'var(--mt-bright)'}
                    fontSize={9}
                    fontFamily="var(--font-mono)"
                    fontWeight={700}
                  >
                    {Math.round(altitude)} ft
                  </text>
                </motion.g>

                {/* Departure marker */}
                {departureAlt !== null && (
                  <g>
                    <line
                      x1={48}
                      y1={altToY(departureAlt)}
                      x2={SVG_W - 12}
                      y2={altToY(departureAlt)}
                      stroke={scoreColor}
                      strokeWidth={1.5}
                    />
                    <circle
                      cx={48}
                      cy={altToY(departureAlt)}
                      r={4}
                      fill={scoreColor}
                    />
                  </g>
                )}
              </svg>
            </div>
          </div>

          <div>
            {/* Right panel: stats + controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Climb rate */}
              <div
                style={{
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 8,
                  padding: '0.75rem',
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
                  CLIMB RATE
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 700,
                    color: inCloudSuck ? 'var(--mt-danger)' : 'var(--mt-flying)',
                  }}
                >
                  +{climbRate.toFixed(0)} ft/min
                </div>
              </div>

              {/* Altitude */}
              <div
                style={{
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 8,
                  padding: '0.75rem',
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
                  ALTITUDE
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 700,
                    color: 'var(--mt-bright)',
                  }}
                >
                  {Math.round(altitude).toLocaleString()} ft
                </div>
              </div>

              {/* Danger meter */}
              <DangerMeter
                value={dangerLevel}
                label="Cloud Suck Risk"
              />

              {/* Timer */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--mt-muted)',
                  textAlign: 'center',
                }}
              >
                {(elapsed / 1000).toFixed(1)}s
              </div>

              {/* Leave button */}
              {running && (
                <button
                  onClick={handleLeave}
                  style={{
                    padding: '0.75rem',
                    background: inCloudSuck
                      ? 'rgba(204,68,68,0.15)'
                      : 'transparent',
                    border: `1px solid ${inCloudSuck ? 'var(--mt-danger)' : 'var(--mt-flying)'}`,
                    color: inCloudSuck ? 'var(--mt-danger)' : 'var(--mt-flying)',
                    borderRadius: 8,
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Leave Thermal
                </button>
              )}
            </div>

            {/* Results */}
          {departed && score !== null && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                style={{
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 8,
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--mt-muted)',
                        textTransform: 'uppercase',
                        marginBottom: '0.25rem',
                      }}
                    >
                      YOUR EXIT
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 700,
                        color: scoreColor,
                      }}
                    >
                      {Math.round(departureAlt!).toLocaleString()} ft
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--mt-muted)',
                        textTransform: 'uppercase',
                        marginBottom: '0.25rem',
                      }}
                    >
                      OPTIMAL
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 700,
                        color: '#4ADE80',
                      }}
                    >
                      {Math.round(params.optimal).toLocaleString()} ft
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--mt-muted)',
                        textTransform: 'uppercase',
                        marginBottom: '0.25rem',
                      }}
                    >
                      SCORE
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 700,
                        color: scoreColor,
                      }}
                    >
                      {score}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: scoreColor,
                      }}
                    >
                      {scoreLabel}
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    color: 'var(--mt-muted)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: 1.7,
                    borderTop: '1px solid var(--mt-border)',
                    paddingTop: '0.75rem',
                  }}
                >
                  {departureAlt! >= params.cloudbase
                    ? 'You entered the cloud. Without instruments and IFR training, flying inside a cloud is extremely dangerous — spatial disorientation, structural icing, and collision risk. This is a critical safety failure.'
                    : departureAlt! >= params.cloudSuckStart
                      ? 'You departed from the cloud suck zone. While you gained maximum altitude, the strong lift near cloudbase risks pulling you into the cloud. Leave earlier to maintain a safety margin.'
                      : departureAlt! >= params.optimal - 500 && departureAlt! <= params.optimal + 500
                        ? 'Excellent decision. You left with enough altitude to glide efficiently to the next thermal while maintaining a safe distance from cloudbase.'
                        : departureAlt! < params.optimal - 500
                          ? 'You left too early. The thermal still had usable lift, and the extra altitude would have extended your glide range to the next thermal. Patience pays off — but never at the cost of safety.'
                          : 'Good timing, but closer to cloudbase than ideal. A slightly earlier departure gives you the same practical glide range with more safety margin.'}
                </p>
              </div>

              {/* Retry button */}
              <button
                onClick={handleStart}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  background: 'transparent',
                  border: '1px solid var(--mt-border)',
                  color: 'var(--mt-muted)',
                  borderRadius: 8,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '1.5rem',
                }}
              >
                Try Again (new cloudbase)
              </button>

              {/* Quiz */}
              <QuizBlock
                question="Why should pilots leave thermals before reaching cloudbase rather than climbing as high as possible?"
                options={[
                  {
                    text: 'The air above cloudbase is always turbulent and causes structural damage',
                  },
                  {
                    text: 'Climbing higher wastes time that could be spent gliding forward',
                  },
                  {
                    text: 'Near cloudbase, "cloud suck" can pull the aircraft into the cloud where VFR pilots lose visual reference, risking disorientation and collision',
                    correct: true,
                  },
                  {
                    text: 'Thermals always reverse direction near cloudbase, causing sink',
                  },
                ]}
                explanation="The 'cloud suck' zone near cloudbase produces very strong lift that can quickly pull an aircraft into the cloud. Inside a cloud, VFR pilots lose all visual references, leading to spatial disorientation — a deadly condition. Even instrument-rated pilots avoid uncontrolled cloud entry in thermals due to severe turbulence, icing risk, and traffic deconfliction. The standard practice is to leave 500-1000 ft below cloudbase."
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
