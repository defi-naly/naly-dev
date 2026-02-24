'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveSlider from '../InteractiveSlider';
import QuizBlock from '../QuizBlock';

interface WindState {
  direction: 'katabatic' | 'calm' | 'anabatic';
  strength: number; // 0-1
  temperature: number; // celsius
  windSpeed: number; // km/h
  description: string;
  isLaunchWindow: boolean;
}

function getWindState(hour: number): WindState {
  // 4am = 0 on slider, 10pm = 18
  const h = hour;

  if (h <= 1.5) {
    // 4:00 - 5:30 AM: strong katabatic
    return {
      direction: 'katabatic',
      strength: 0.8,
      temperature: 2 + h * 0.3,
      windSpeed: 12 + (1.5 - h) * 2,
      description: 'Cool, dense air drains down slopes into the valley floor. Katabatic winds are steady and predictable.',
      isLaunchWindow: false,
    };
  } else if (h <= 3) {
    // 5:30 - 7:00 AM: weakening katabatic
    const t = (h - 1.5) / 1.5;
    return {
      direction: 'katabatic',
      strength: 0.8 - t * 0.6,
      temperature: 2.5 + t * 4,
      windSpeed: 12 - t * 9,
      description: 'Katabatic winds weaken as the sun begins to warm the slopes.',
      isLaunchWindow: false,
    };
  } else if (h <= 4.5) {
    // 7:00 - 8:30 AM: morning calm transition
    return {
      direction: 'calm',
      strength: 0.1,
      temperature: 7 + (h - 3) * 2,
      windSpeed: 2 + Math.random() * 2,
      description: 'Morning calm. The transition period between katabatic and anabatic winds. Ideal for early launches.',
      isLaunchWindow: true,
    };
  } else if (h <= 6) {
    // 8:30 - 10:00 AM: building anabatic
    const t = (h - 4.5) / 1.5;
    return {
      direction: 'anabatic',
      strength: 0.2 + t * 0.4,
      temperature: 10 + t * 5,
      windSpeed: 4 + t * 8,
      description: 'Sun-heated slopes create rising air. Anabatic (up-slope) winds begin to establish.',
      isLaunchWindow: true,
    };
  } else if (h <= 10) {
    // 10:00 AM - 2:00 PM: strong anabatic
    const peak = 1 - Math.abs(h - 8) / 4;
    return {
      direction: 'anabatic',
      strength: 0.6 + peak * 0.4,
      temperature: 18 + peak * 6,
      windSpeed: 12 + peak * 10,
      description: 'Peak thermal activity. Strong up-slope winds carry warm air toward the ridgelines. Best soaring conditions.',
      isLaunchWindow: true,
    };
  } else if (h <= 12) {
    // 2:00 - 4:00 PM: weakening anabatic
    const t = (h - 10) / 2;
    return {
      direction: 'anabatic',
      strength: 0.7 - t * 0.5,
      temperature: 22 - t * 4,
      windSpeed: 14 - t * 8,
      description: 'Anabatic winds weaken as the sun angle lowers and heating diminishes.',
      isLaunchWindow: h < 11,
    };
  } else if (h <= 14) {
    // 4:00 - 6:00 PM: evening calm transition
    return {
      direction: 'calm',
      strength: 0.1,
      temperature: 16 - (h - 12) * 3,
      windSpeed: 3 + Math.random() * 2,
      description: 'Evening calm. The second transition period. Slopes cool and winds die.',
      isLaunchWindow: false,
    };
  } else {
    // 6:00 - 10:00 PM: katabatic returns
    const t = Math.min(1, (h - 14) / 3);
    return {
      direction: 'katabatic',
      strength: 0.2 + t * 0.6,
      temperature: 10 - t * 5,
      windSpeed: 4 + t * 10,
      description: 'Cooling slopes generate katabatic drainage winds again. Cool air flows downhill into the valley.',
      isLaunchWindow: false,
    };
  }
}

function formatTime(hour: number): string {
  const actualHour = 4 + hour;
  const h = Math.floor(actualHour);
  const m = Math.round((actualHour - h) * 60);
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${displayH}:${m.toString().padStart(2, '0')} ${period}`;
}

interface ValleyWindCycleAnimatorProps {
  onComplete: () => void;
}

export default function ValleyWindCycleAnimator({ onComplete }: ValleyWindCycleAnimatorProps) {
  const [time, setTime] = useState(4); // Start at 8:00 AM
  const [hasExplored, setHasExplored] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [exploredTimes, setExploredTimes] = useState<Set<number>>(new Set());

  const wind = useMemo(() => getWindState(time), [time]);

  const handleTimeChange = useCallback((value: number) => {
    setTime(value);
    setExploredTimes(prev => {
      const next = new Set(prev);
      // Track which quarter of the day has been explored
      next.add(Math.floor(value / 4.5));
      if (next.size >= 4 && !hasExplored) {
        setHasExplored(true);
        setTimeout(() => setShowQuiz(true), 500);
      }
      return next;
    });
  }, [hasExplored]);

  const handleQuizCorrect = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Arrow positions for wind visualization
  const arrowCount = Math.max(1, Math.round(wind.strength * 5));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Intro text */}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.95rem',
        lineHeight: 1.7,
        color: 'var(--mt-muted)',
      }}>
        Mountain valleys breathe with a daily rhythm. Use the time slider to watch how
        winds shift from down-slope (katabatic) at night to up-slope (anabatic) during the day.
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
        <svg viewBox="0 0 600 300" style={{ width: '100%', display: 'block' }}>
          {/* Sky gradient */}
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={time < 2 || time > 16 ? '#0a1628' : time < 4 ? '#1a3050' : '#3a6090'} />
              <stop offset="100%" stopColor={time < 2 || time > 16 ? '#0f1e3a' : time < 4 ? '#2a4a70' : '#7BA7CC'} />
            </linearGradient>
            <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a3520" />
              <stop offset="100%" stopColor="#1a1a10" />
            </linearGradient>
          </defs>

          {/* Sky */}
          <rect x={0} y={0} width={600} height={300} fill="url(#sky)" />

          {/* Sun position */}
          {time >= 2 && time <= 16 && (
            <motion.circle
              cx={300}
              cy={40 + 120 * (1 - Math.sin(((time - 2) / 14) * Math.PI))}
              r={14}
              fill="#F5C542"
              opacity={Math.min(1, Math.sin(((time - 2) / 14) * Math.PI) + 0.2)}
              animate={{
                cy: 40 + 120 * (1 - Math.sin(((time - 2) / 14) * Math.PI)),
                opacity: Math.min(1, Math.sin(((time - 2) / 14) * Math.PI) + 0.2),
              }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Left mountain slope */}
          <polygon points="0,300 0,80 180,220 180,300" fill="#2a2a1e" />
          <polygon points="0,80 20,90 180,220" fill="#353520" opacity={0.5} />

          {/* Right mountain slope */}
          <polygon points="600,300 600,100 420,220 420,300" fill="#2a2a1e" />
          <polygon points="600,100 580,110 420,220" fill="#353520" opacity={0.5} />

          {/* Valley floor */}
          <rect x={180} y={260} width={240} height={40} fill="url(#ground)" />
          <line x1={180} y1={260} x2={420} y2={260} stroke="#4a4530" strokeWidth={1} />

          {/* Wind arrows - left slope */}
          {Array.from({ length: arrowCount }).map((_, i) => {
            const t = (i + 1) / (arrowCount + 1);
            const slopeX = 30 + t * 130;
            const slopeY = 100 + t * 130;

            if (wind.direction === 'katabatic') {
              // Down-slope arrows
              return (
                <motion.g
                  key={`left-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: wind.strength * 0.8 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                >
                  <line
                    x1={slopeX}
                    y1={slopeY - 15}
                    x2={slopeX + 18}
                    y2={slopeY + 10}
                    stroke="#7BA7CC"
                    strokeWidth={2}
                    markerEnd="url(#arrowhead)"
                  />
                </motion.g>
              );
            } else if (wind.direction === 'anabatic') {
              // Up-slope arrows
              return (
                <motion.g
                  key={`left-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: wind.strength * 0.8 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                >
                  <line
                    x1={slopeX + 18}
                    y1={slopeY + 10}
                    x2={slopeX}
                    y2={slopeY - 15}
                    stroke="#F5A623"
                    strokeWidth={2}
                    markerEnd="url(#arrowheadWarm)"
                  />
                </motion.g>
              );
            }
            return null;
          })}

          {/* Wind arrows - right slope */}
          {Array.from({ length: arrowCount }).map((_, i) => {
            const t = (i + 1) / (arrowCount + 1);
            const slopeX = 570 - t * 130;
            const slopeY = 120 + t * 110;

            if (wind.direction === 'katabatic') {
              return (
                <motion.g
                  key={`right-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: wind.strength * 0.8 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                >
                  <line
                    x1={slopeX}
                    y1={slopeY - 15}
                    x2={slopeX - 18}
                    y2={slopeY + 10}
                    stroke="#7BA7CC"
                    strokeWidth={2}
                    markerEnd="url(#arrowhead)"
                  />
                </motion.g>
              );
            } else if (wind.direction === 'anabatic') {
              return (
                <motion.g
                  key={`right-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: wind.strength * 0.8 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                >
                  <line
                    x1={slopeX - 18}
                    y1={slopeY + 10}
                    x2={slopeX}
                    y2={slopeY - 15}
                    stroke="#F5A623"
                    strokeWidth={2}
                    markerEnd="url(#arrowheadWarm)"
                  />
                </motion.g>
              );
            }
            return null;
          })}

          {/* Valley floor arrows for katabatic pooling */}
          {wind.direction === 'katabatic' && (
            <>
              <motion.line
                x1={220} y1={250} x2={280} y2={250}
                stroke="#7BA7CC" strokeWidth={1.5} opacity={wind.strength * 0.5}
                animate={{ opacity: wind.strength * 0.5 }}
              />
              <motion.line
                x1={320} y1={250} x2={380} y2={250}
                stroke="#7BA7CC" strokeWidth={1.5} opacity={wind.strength * 0.5}
                animate={{ opacity: wind.strength * 0.5 }}
              />
            </>
          )}

          {/* Arrow markers */}
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#7BA7CC" />
            </marker>
            <marker id="arrowheadWarm" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#F5A623" />
            </marker>
          </defs>

          {/* Launch window indicator */}
          {wind.isLaunchWindow && (
            <motion.rect
              x={240}
              y={230}
              width={120}
              height={24}
              rx={4}
              fill="rgba(74,222,128,0.12)"
              stroke="#4ADE80"
              strokeWidth={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          {wind.isLaunchWindow && (
            <text x={300} y={246} textAnchor="middle" fill="#4ADE80" fontSize={9} fontFamily="var(--font-mono)" fontWeight={700}>
              LAUNCH WINDOW
            </text>
          )}

          {/* Wind direction label */}
          <text x={300} y={22} textAnchor="middle" fill="var(--mt-bright)" fontSize={12} fontFamily="var(--font-display)" fontWeight={700}>
            {wind.direction === 'katabatic' ? 'KATABATIC (Down-slope)' : wind.direction === 'anabatic' ? 'ANABATIC (Up-slope)' : 'CALM TRANSITION'}
          </text>

          {/* Labels */}
          <text x={50} y={300 - 5} fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">
            Valley Floor
          </text>
        </svg>
          </div>
        </div>
        <div>
          {/* Time slider */}
      <InteractiveSlider
        label="Time of Day"
        min={0}
        max={18}
        step={0.5}
        value={time}
        onChange={handleTimeChange}
        formatValue={(v) => formatTime(v)}
      />

      {/* Readouts */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '0.75rem',
      }}>
        {[
          { label: 'Temperature', value: `${wind.temperature.toFixed(1)}\u00B0C`, color: wind.temperature > 15 ? '#F5A623' : '#7BA7CC' },
          { label: 'Wind Speed', value: `${wind.windSpeed.toFixed(0)} km/h`, color: wind.windSpeed > 15 ? '#F5A623' : 'var(--mt-bright)' },
          { label: 'Wind Type', value: wind.direction === 'calm' ? 'Calm' : wind.direction.charAt(0).toUpperCase() + wind.direction.slice(1), color: wind.direction === 'anabatic' ? '#F5A623' : wind.direction === 'katabatic' ? '#7BA7CC' : 'var(--mt-muted)' },
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
              fontSize: '1.1rem',
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
        key={wind.description}
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
        }}
      >
        {wind.description}
      </motion.div>

      {/* Quiz */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <QuizBlock
              question="At what time of day are valley winds typically calmest?"
              options={[
                { text: 'Midday, when the sun is strongest' },
                { text: 'Early morning and evening, during the transition between katabatic and anabatic phases', correct: true },
                { text: 'Late at night, when everything cools down' },
                { text: 'Just after sunrise, before thermals develop' },
              ]}
              explanation="Valley winds are calmest during the two daily transition periods: early morning (as katabatic winds fade and anabatic winds have not yet established) and early evening (as anabatic winds die and katabatic winds begin). These calm windows are typically 30-90 minutes long and are prized by paraglider pilots as the safest launch times."
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
