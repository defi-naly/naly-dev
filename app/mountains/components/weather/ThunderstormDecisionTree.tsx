'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DangerMeter from '../DangerMeter';
import QuizBlock from '../QuizBlock';

interface ThunderstormDecisionTreeProps {
  onComplete: () => void;
}

type StabilityLevel = 'stable' | 'marginal' | 'unstable';
type MoistureLevel = 'dry' | 'moderate' | 'high';
type TriggerLevel = 'none' | 'weak' | 'strong';
type ShearLevel = 'low' | 'moderate' | 'high';

interface Outcome {
  level: string;
  threat: number; // 0-100
  description: string;
  color: string;
  hikerAction: string;
  skierAction: string;
  pilotAction: string;
}

function computeOutcome(
  stability: StabilityLevel,
  moisture: MoistureLevel,
  trigger: TriggerLevel,
  shear: ShearLevel,
): Outcome {
  const stabilityScore = { stable: 0, marginal: 1, unstable: 2 }[stability];
  const moistureScore = { dry: 0, moderate: 1, high: 2 }[moisture];
  const triggerScore = { none: 0, weak: 1, strong: 2 }[trigger];
  const shearScore = { low: 0, moderate: 1, high: 2 }[shear];

  const total = stabilityScore + moistureScore + triggerScore + shearScore;

  // Key logic: need instability + moisture + trigger for storms
  // Shear organizes them into severe weather

  if (stabilityScore === 0 || moistureScore === 0) {
    // Stable atmosphere or dry air = no significant storms
    return {
      level: 'No Threat',
      threat: Math.min(15, total * 3),
      description: 'Thunderstorm development is effectively suppressed. Stable air prevents sustained convection, or insufficient moisture means no cloud development even if air rises.',
      color: '#4ADE80',
      hikerAction: 'Proceed normally. Monitor for changes in cloud cover.',
      skierAction: 'Normal operations. Standard avalanche awareness applies.',
      pilotAction: 'Clear to fly. Watch for other hazards (wind shear, terrain).',
    };
  }

  if (triggerScore === 0) {
    // No trigger mechanism
    if (stabilityScore === 2 && moistureScore === 2) {
      return {
        level: 'Latent Instability',
        threat: 20,
        description: 'The atmosphere is loaded -- unstable and moist -- but lacks a trigger to release the energy. Like a loaded gun without a trigger pull. If heating, a front, or terrain forces lift, storms could develop rapidly.',
        color: '#F59E0B',
        hikerAction: 'Be alert. Conditions could change rapidly if heating begins. Have an exit plan.',
        skierAction: 'Watch the sky. Afternoon heating could provide the missing trigger.',
        pilotAction: 'Flyable but stay vigilant. The atmosphere is primed -- any trigger could release violent convection.',
      };
    }
    return {
      level: 'No Threat',
      threat: 10,
      description: 'Without a forcing mechanism (frontal lift, orographic lift, or strong surface heating), convection cannot initiate even if the atmosphere has some instability.',
      color: '#4ADE80',
      hikerAction: 'Proceed normally. Stay weather-aware.',
      skierAction: 'Normal operations.',
      pilotAction: 'Clear to fly.',
    };
  }

  // We have instability + moisture + trigger
  if (stabilityScore === 1 && moistureScore === 1) {
    return {
      level: 'Isolated Afternoon Storms',
      threat: 40,
      description: 'Marginal instability with moderate moisture and a trigger mechanism. Expect scattered, short-lived thunderstorms during peak heating (typically 2-5 PM in mountains). These are the garden-variety "pop-up" storms.',
      color: '#F59E0B',
      hikerAction: 'Plan to be off exposed ridges and summits by early afternoon. Carry rain gear. Watch for darkening cumulus.',
      skierAction: 'Be off high terrain by 1-2 PM. Lightning is the primary threat at elevation.',
      pilotAction: 'Morning flying preferred. Afternoon flights risky. Easy to avoid if you watch cloud development.',
    };
  }

  if (stabilityScore >= 1 && moistureScore >= 1 && shearScore <= 1) {
    const threat = 35 + (stabilityScore + moistureScore + triggerScore) * 7;
    return {
      level: 'Organized Storms',
      threat: Math.min(70, threat),
      description: 'Sufficient instability, moisture, and forcing for organized thunderstorm development. Without strong wind shear, storms will be pulse-type: intense but short-lived. Heavy rain, lightning, and gusty winds expected.',
      color: '#F59E0B',
      hikerAction: 'Shorten your route. Avoid exposed terrain after late morning. Seek shelter in valleys. Do not shelter under isolated trees.',
      skierAction: 'Cease operations in exposed terrain by noon. Lightning and sudden whiteout are the main threats.',
      pilotAction: 'Do not fly in the afternoon. Morning windows may exist but watch for rapid development. Have a landing plan at all times.',
    };
  }

  if (stabilityScore === 2 && moistureScore === 2 && triggerScore === 2 && shearScore === 2) {
    return {
      level: 'Severe Supercell Potential',
      threat: 95,
      description: 'All four ingredients are maximized. This is the recipe for supercell thunderstorms: rotating updrafts, large hail, damaging winds, and possible tornadoes. In mountain terrain, expect extreme flash flood risk, debris flows, and catastrophic wind shear.',
      color: '#CC4444',
      hikerAction: 'DO NOT go into the mountains. Stay in valley shelters. Flash flood and debris flow risk is extreme. This is a life-threatening weather day.',
      skierAction: 'All mountain operations should be suspended. Evacuate exposed areas. Lightning, extreme winds, and sudden temperature drops are likely.',
      pilotAction: 'GROUNDED. No flying under any circumstances. Supercells can produce updrafts exceeding 100 mph and hail the size of baseballs. Even instrument-rated jet aircraft avoid supercells.',
    };
  }

  // High shear + moderate/high everything else
  if (shearScore === 2) {
    const threat = 40 + (stabilityScore + moistureScore + triggerScore) * 8;
    return {
      level: 'Severe Supercell Potential',
      threat: Math.min(90, threat),
      description: 'High wind shear tilts storm updrafts, allowing them to persist and rotate. Combined with instability and moisture, this creates long-lived, dangerous storms with large hail potential and damaging straight-line winds.',
      color: '#CC4444',
      hikerAction: 'Strongly consider canceling mountain plans. If caught out, descend immediately to valley floor. Seek solid shelter.',
      skierAction: 'Suspend mountain operations. Lightning and extreme wind gusts are the primary threats.',
      pilotAction: 'GROUNDED. Do not fly. Severe turbulence, hail, and wind shear make flight extremely dangerous.',
    };
  }

  // Fallback - moderate everything
  return {
    level: 'Organized Storms',
    threat: 50 + total * 3,
    description: 'Multiple ingredients are present for organized thunderstorm development. Monitor conditions closely and be prepared to take shelter.',
    color: '#F59E0B',
    hikerAction: 'Have a bailout plan. Watch cloud development closely. Be off high terrain by early afternoon.',
    skierAction: 'Monitor conditions. Be prepared to evacuate exposed terrain quickly.',
    pilotAction: 'Marginal conditions. Fly early or not at all. Watch for rapid deterioration.',
  };
}

const FACTOR_OPTIONS = {
  stability: [
    { value: 'stable' as StabilityLevel, label: 'Stable', desc: 'Strong cap, resists vertical motion' },
    { value: 'marginal' as StabilityLevel, label: 'Marginally Unstable', desc: 'Weak cap, moderate CAPE' },
    { value: 'unstable' as StabilityLevel, label: 'Very Unstable', desc: 'No cap, high CAPE, air wants to rise' },
  ],
  moisture: [
    { value: 'dry' as MoistureLevel, label: 'Dry', desc: 'Low dew points, clear skies' },
    { value: 'moderate' as MoistureLevel, label: 'Moderate', desc: 'Some moisture, scattered clouds' },
    { value: 'high' as MoistureLevel, label: 'High', desc: 'Humid, low cloud bases, visible moisture' },
  ],
  trigger: [
    { value: 'none' as TriggerLevel, label: 'None', desc: 'No fronts, no terrain forcing, weak heating' },
    { value: 'weak' as TriggerLevel, label: 'Weak (Frontal)', desc: 'Distant front or weak outflow boundary' },
    { value: 'strong' as TriggerLevel, label: 'Strong (Orographic + Heating)', desc: 'Mountain terrain + afternoon sun' },
  ],
  shear: [
    { value: 'low' as ShearLevel, label: 'Low', desc: 'Winds similar through depth of atmosphere' },
    { value: 'moderate' as ShearLevel, label: 'Moderate', desc: 'Some directional or speed change with height' },
    { value: 'high' as ShearLevel, label: 'High', desc: 'Strong veering/backing, jet stream nearby' },
  ],
};

export default function ThunderstormDecisionTree({ onComplete }: ThunderstormDecisionTreeProps) {
  const [stability, setStability] = useState<StabilityLevel | null>(null);
  const [moisture, setMoisture] = useState<MoistureLevel | null>(null);
  const [trigger, setTrigger] = useState<TriggerLevel | null>(null);
  const [shear, setShear] = useState<ShearLevel | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const allSet = stability !== null && moisture !== null && trigger !== null && shear !== null;

  const outcome = useMemo(() => {
    if (!allSet) return null;
    return computeOutcome(stability!, moisture!, trigger!, shear!);
  }, [stability, moisture, trigger, shear, allSet]);

  // Show quiz once user has set all 4 factors
  const handleFactorSet = useCallback(() => {
    // We check on next render if all are set
  }, []);

  // Use an effect-like check to show quiz
  useMemo(() => {
    if (allSet && !showQuiz) {
      setTimeout(() => setShowQuiz(true), 800);
    }
  }, [allSet, showQuiz]);

  const handleQuizCorrect = useCallback(() => {
    onComplete();
  }, [onComplete]);

  const factorGroups: {
    key: string;
    label: string;
    icon: string;
    options: { value: string; label: string; desc: string }[];
    selected: string | null;
    onSelect: (v: string) => void;
  }[] = [
    {
      key: 'stability',
      label: '1. Atmospheric Stability',
      icon: '\u2195',
      options: FACTOR_OPTIONS.stability,
      selected: stability,
      onSelect: (v) => { setStability(v as StabilityLevel); handleFactorSet(); },
    },
    {
      key: 'moisture',
      label: '2. Moisture',
      icon: '\u2601',
      options: FACTOR_OPTIONS.moisture,
      selected: moisture,
      onSelect: (v) => { setMoisture(v as MoistureLevel); handleFactorSet(); },
    },
    {
      key: 'trigger',
      label: '3. Trigger Mechanism',
      icon: '\u26A1',
      options: FACTOR_OPTIONS.trigger,
      selected: trigger,
      onSelect: (v) => { setTrigger(v as TriggerLevel); handleFactorSet(); },
    },
    {
      key: 'shear',
      label: '4. Wind Shear',
      icon: '\u21C6',
      options: FACTOR_OPTIONS.shear,
      selected: shear,
      onSelect: (v) => { setShear(v as ShearLevel); handleFactorSet(); },
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Intro */}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.95rem',
        lineHeight: 1.7,
        color: 'var(--mt-muted)',
      }}>
        Thunderstorms require four ingredients: instability, moisture, a trigger mechanism, and
        wind shear (which organizes them into severe weather). Set each factor below to see how
        they combine to determine the threat level.
      </div>

      <div className="mt-module-split">
        <div>
          {/* Factor selectors */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}>
        {factorGroups.map((group, gi) => (
          <motion.div
            key={group.key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.1 }}
            style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '1rem',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              fontWeight: 700,
              color: 'var(--mt-bright)',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span style={{ fontSize: '1rem' }}>{group.icon}</span>
              {group.label}
              {group.selected && (
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--mt-weather)',
                  marginLeft: 'auto',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.05em',
                }}>
                  Set
                </span>
              )}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '0.5rem',
            }}>
              {group.options.map((opt) => {
                const isSelected = group.selected === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => group.onSelect(opt.value)}
                    style={{
                      background: isSelected ? 'rgba(123,167,204,0.12)' : 'var(--mt-void)',
                      border: `1px solid ${isSelected ? 'var(--mt-weather)' : 'var(--mt-border)'}`,
                      borderRadius: 6,
                      padding: '0.6rem 0.75rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: isSelected ? 'var(--mt-bright)' : 'var(--mt-muted)',
                      marginBottom: '0.2rem',
                    }}>
                      {opt.label}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.7rem',
                      color: 'var(--mt-muted)',
                      lineHeight: 1.4,
                      opacity: isSelected ? 1 : 0.7,
                    }}>
                      {opt.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decision tree visualization */}
      {allSet && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'var(--mt-surface)',
            border: '1px solid var(--mt-border)',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <svg viewBox="0 0 500 200" style={{ width: '100%', display: 'block' }}>
            {/* Tree branches */}
            {/* Root */}
            <rect x={220} y={10} width={60} height={24} rx={4} fill="var(--mt-void)" stroke="var(--mt-border)" />
            <text x={250} y={26} textAnchor="middle" fill="var(--mt-bright)" fontSize={8} fontFamily="var(--font-mono)">ASSESS</text>

            {/* Level 1: Four factors */}
            {factorGroups.map((g, i) => {
              const x = 50 + i * 120;
              const color = g.selected === g.options[0].value ? '#4ADE80' :
                           g.selected === g.options[2].value ? '#CC4444' : '#F59E0B';
              return (
                <g key={g.key}>
                  <line x1={250} y1={34} x2={x + 30} y2={60} stroke="var(--mt-border)" strokeWidth={1} />
                  <rect x={x} y={60} width={60} height={32} rx={4} fill="var(--mt-void)" stroke={color} strokeWidth={1} />
                  <text x={x + 30} y={73} textAnchor="middle" fill={color} fontSize={6} fontFamily="var(--font-mono)">
                    {g.label.split('. ')[1]?.substring(0, 10) || g.label.substring(0, 10)}
                  </text>
                  <text x={x + 30} y={84} textAnchor="middle" fill="var(--mt-bright)" fontSize={7} fontFamily="var(--font-mono)" fontWeight={700}>
                    {g.options.find(o => o.value === g.selected)?.label.substring(0, 12)}
                  </text>
                </g>
              );
            })}

            {/* Converging lines to outcome */}
            {factorGroups.map((_, i) => {
              const x = 80 + i * 120;
              return (
                <line key={`conv-${i}`} x1={x} y1={92} x2={250} y2={130} stroke="var(--mt-border)" strokeWidth={1} />
              );
            })}

            {/* Outcome */}
            <rect
              x={160}
              y={130}
              width={180}
              height={50}
              rx={6}
              fill={outcome ? `${outcome.color}10` : 'var(--mt-void)'}
              stroke={outcome?.color || 'var(--mt-border)'}
              strokeWidth={1.5}
            />
            <text x={250} y={150} textAnchor="middle" fill={outcome?.color} fontSize={10} fontFamily="var(--font-display)" fontWeight={700}>
              {outcome?.level}
            </text>
            <text x={250} y={168} textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">
              Threat Level: {outcome?.threat}%
            </text>
          </svg>
        </motion.div>
      )}
        </div>
        <div>
          {/* Danger meter */}
      <AnimatePresence>
        {outcome && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DangerMeter
              value={outcome.threat}
              label="Thunderstorm Threat Level"
              showValue
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Outcome details */}
      <AnimatePresence>
        {outcome && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              background: 'var(--mt-surface)',
              border: `1px solid ${outcome.color}30`,
              borderRadius: 8,
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: outcome.color,
                marginBottom: '0.5rem',
              }}>
                {outcome.level}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                lineHeight: 1.65,
                color: 'var(--mt-muted)',
              }}>
                {outcome.description}
              </div>
            </div>

            {/* Action recommendations */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '0.75rem',
            }}>
              {[
                { role: 'Hikers / Climbers', action: outcome.hikerAction, icon: '\u26F0' },
                { role: 'Skiers', action: outcome.skierAction, icon: '\u26F7' },
                { role: 'Pilots', action: outcome.pilotAction, icon: '\u2708' },
              ].map(rec => (
                <div key={rec.role} style={{
                  background: 'var(--mt-void)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 6,
                  padding: '0.75rem',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--mt-weather)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    marginBottom: '0.35rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}>
                    <span style={{ fontSize: '0.85rem' }}>{rec.icon}</span>
                    {rec.role}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.78rem',
                    lineHeight: 1.5,
                    color: 'var(--mt-bright)',
                  }}>
                    {rec.action}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset button */}
      {allSet && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => {
              setStability(null);
              setMoisture(null);
              setTrigger(null);
              setShear(null);
            }}
            style={{
              background: 'none',
              border: '1px solid var(--mt-border)',
              borderRadius: 6,
              padding: '0.5rem 1.25rem',
              color: 'var(--mt-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              letterSpacing: '0.05em',
              textTransform: 'uppercase' as const,
            }}
          >
            Reset Factors
          </button>
        </div>
      )}

      {/* Quiz */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <QuizBlock
              question="Which of the four ingredients is most often the 'missing piece' that prevents thunderstorm formation?"
              options={[
                { text: 'Wind shear -- storms can not organize without it' },
                { text: 'Moisture -- dry air always prevents storms' },
                { text: 'Trigger mechanism -- even unstable, humid air needs a push to start convecting', correct: true },
                { text: 'Instability -- the atmosphere is usually too stable' },
              ]}
              explanation="The trigger mechanism is most often the missing ingredient. The atmosphere can be unstable and loaded with moisture, but without something to initiate lift -- surface heating, a front, orographic forcing, or an outflow boundary -- the energy remains trapped. This is why mountain terrain is so prone to afternoon thunderstorms: the slopes themselves act as a trigger mechanism, heating unevenly and forcing air upward. Meteorologists call this the 'cap' problem: a warm layer aloft can suppress convection until a strong enough trigger breaks through it."
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
