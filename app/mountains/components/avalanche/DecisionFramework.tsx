'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveSlider from '../InteractiveSlider';
import DangerMeter from '../DangerMeter';
import QuizBlock from '../QuizBlock';

interface DecisionFrameworkProps {
  onComplete: () => void;
}

type DangerRating = 1 | 2 | 3 | 4 | 5;
type Aspect = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
type Precipitation = 'none' | 'light' | 'heavy';
type WindLoading = 'none' | 'moderate' | 'heavy';
type TerrainTraps = 'none' | 'minor' | 'major';

const DANGER_LABELS: Record<DangerRating, { name: string; color: string }> = {
  1: { name: 'Low', color: '#4ADE80' },
  2: { name: 'Moderate', color: '#F5A623' },
  3: { name: 'Considerable', color: '#E07030' },
  4: { name: 'High', color: '#CC4444' },
  5: { name: 'Extreme', color: '#8B0000' },
};

const ASPECTS: Aspect[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

interface FactorContribution {
  name: string;
  points: number;
  maxPoints: number;
  tipping: boolean;
}

function calculateRisk(
  dangerRating: DangerRating,
  slopeAngle: number,
  aspect: Aspect,
  precipitation: Precipitation,
  windLoading: WindLoading,
  groupSize: number,
  terrainTraps: TerrainTraps,
): { total: number; factors: FactorContribution[] } {
  const factors: FactorContribution[] = [];

  // Danger rating (0-30 points)
  const dangerPoints = (dangerRating - 1) * 7.5;
  factors.push({ name: 'Danger Rating', points: dangerPoints, maxPoints: 30, tipping: dangerPoints >= 15 });

  // Slope angle (0-25 points) -- peaks at 38 degrees (prime avalanche terrain)
  let slopePoints = 0;
  if (slopeAngle >= 30 && slopeAngle <= 45) {
    slopePoints = 15 + ((Math.min(slopeAngle, 42) - 30) / 12) * 10;
  } else if (slopeAngle > 45) {
    slopePoints = 20; // Very steep -- snow sloughs rather than slabs
  } else if (slopeAngle >= 25) {
    slopePoints = ((slopeAngle - 25) / 5) * 15;
  }
  factors.push({ name: 'Slope Angle', points: slopePoints, maxPoints: 25, tipping: slopePoints >= 15 });

  // Aspect (0-10 points) -- N/NE/NW more dangerous (persistent weak layers)
  const aspectPoints: Record<Aspect, number> = {
    N: 10, NE: 8, NW: 8, E: 5, W: 5, SE: 3, SW: 3, S: 2,
  };
  const aspPts = aspectPoints[aspect];
  factors.push({ name: 'Aspect', points: aspPts, maxPoints: 10, tipping: aspPts >= 8 });

  // Precipitation (0-10 points)
  const precipPoints = precipitation === 'heavy' ? 10 : precipitation === 'light' ? 4 : 0;
  factors.push({ name: 'Recent Precipitation', points: precipPoints, maxPoints: 10, tipping: precipPoints >= 7 });

  // Wind loading (0-12 points)
  const windPoints = windLoading === 'heavy' ? 12 : windLoading === 'moderate' ? 6 : 0;
  factors.push({ name: 'Wind Loading', points: windPoints, maxPoints: 12, tipping: windPoints >= 8 });

  // Group size (0-8 points) -- larger groups = more triggers, harder rescue
  const groupPoints = Math.min((groupSize - 1) * 1.6, 8);
  factors.push({ name: 'Group Size', points: groupPoints, maxPoints: 8, tipping: groupPoints >= 6 });

  // Terrain traps (0-15 points)
  const trapPoints = terrainTraps === 'major' ? 15 : terrainTraps === 'minor' ? 6 : 0;
  factors.push({ name: 'Terrain Traps', points: trapPoints, maxPoints: 15, tipping: trapPoints >= 10 });

  const total = factors.reduce((sum, f) => sum + f.points, 0);
  return { total, factors };
}

export default function DecisionFramework({ onComplete }: DecisionFrameworkProps) {
  const [dangerRating, setDangerRating] = useState<DangerRating>(2);
  const [slopeAngle, setSlopeAngle] = useState(32);
  const [aspect, setAspect] = useState<Aspect>('N');
  const [precipitation, setPrecipitation] = useState<Precipitation>('none');
  const [windLoading, setWindLoading] = useState<WindLoading>('none');
  const [groupSize, setGroupSize] = useState(3);
  const [terrainTraps, setTerrainTraps] = useState<TerrainTraps>('none');
  const [hasCompleteAssessment, setHasCompleteAssessment] = useState(false);
  const [interactedFactors, setInteractedFactors] = useState<Set<string>>(new Set());
  const [quizPassed, setQuizPassed] = useState(false);

  const trackInteraction = useCallback((factor: string) => {
    setInteractedFactors(prev => {
      const next = new Set(prev);
      next.add(factor);
      if (next.size >= 5 && !hasCompleteAssessment) {
        setHasCompleteAssessment(true);
      }
      return next;
    });
  }, [hasCompleteAssessment]);

  const { total, factors } = useMemo(
    () => calculateRisk(dangerRating, slopeAngle, aspect, precipitation, windLoading, groupSize, terrainTraps),
    [dangerRating, slopeAngle, aspect, precipitation, windLoading, groupSize, terrainTraps],
  );

  // Normalize to 0-100
  const maxTotal = 30 + 25 + 10 + 10 + 12 + 8 + 15; // 110
  const riskPercent = Math.min(100, (total / maxTotal) * 100);

  const verdict = riskPercent < 25
    ? { label: 'GO', color: '#4ADE80', description: 'Conditions and terrain are within acceptable risk parameters.' }
    : riskPercent < 50
      ? { label: 'CAUTION', color: '#F5A623', description: 'Elevated risk. Careful route selection and group management required.' }
      : riskPercent < 70
        ? { label: 'CAUTION -- HIGH', color: '#E07030', description: 'Significant risk factors present. Consider alternatives or safer terrain.' }
        : { label: 'NO-GO', color: '#CC4444', description: 'Unacceptable risk. Turn back or choose entirely different terrain.' };

  const tippingFactors = factors.filter(f => f.tipping);

  const handleQuizCorrect = useCallback(() => {
    setQuizPassed(true);
    onComplete();
  }, [onComplete]);

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <p style={{ color: 'var(--mt-bright)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
        A structured decision framework removes emotion from avalanche terrain choices.
        Adjust each factor below to build a cumulative risk assessment for your planned route.
      </p>
      <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: 'var(--text-sm, 0.875rem)' }}>
        Interact with at least 5 factors to complete your assessment.
      </p>

      <div className="mt-module-split">
        {/* Left: Risk bar + Factor breakdown + Verdict */}
        <div>
          {/* Risk bar */}
          <div style={{
            background: 'var(--mt-surface)',
            border: `1px solid ${verdict.color}`,
            borderRadius: 8,
            padding: '1rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: 'var(--mt-muted)',
                letterSpacing: '0.08em',
              }}>
                CUMULATIVE RISK
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: verdict.color,
              }}>
                {verdict.label}
              </div>
            </div>

            {/* Gradient bar */}
            <div style={{
              width: '100%',
              height: 12,
              borderRadius: 6,
              background: 'linear-gradient(to right, #4ADE80 0%, #F5A623 35%, #E07030 55%, #CC4444 75%, #8B0000 100%)',
              position: 'relative',
              marginBottom: '0.5rem',
            }}>
              <motion.div
                style={{
                  position: 'absolute',
                  top: -3,
                  width: 4,
                  height: 18,
                  borderRadius: 2,
                  background: 'var(--mt-bright)',
                  boxShadow: '0 0 6px rgba(255,255,255,0.4)',
                }}
                animate={{ left: `calc(${riskPercent}% - 2px)` }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              />
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs, 0.75rem)',
              color: 'var(--mt-muted)',
            }}>
              <span>GO</span>
              <span>CAUTION</span>
              <span>NO-GO</span>
            </div>
          </div>

          {/* Factor breakdown */}
          <div style={{
            background: 'var(--mt-surface)',
            border: '1px solid var(--mt-border)',
            borderRadius: 8,
            padding: '1rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs, 0.75rem)',
              color: 'var(--mt-muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              marginBottom: '0.75rem',
            }}>
              FACTOR BREAKDOWN
            </div>
            {factors.map(f => (
              <div key={f.name} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs, 0.75rem)',
                  color: f.tipping ? 'var(--mt-danger)' : 'var(--mt-muted)',
                  minWidth: 130,
                }}>
                  {f.name}{f.tipping ? ' *' : ''}
                </div>
                <div style={{
                  flex: 1,
                  height: 6,
                  background: 'var(--mt-void)',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}>
                  <motion.div
                    style={{
                      height: '100%',
                      borderRadius: 3,
                      background: f.tipping ? 'var(--mt-danger)' : f.points / f.maxPoints > 0.5 ? '#F5A623' : '#4ADE80',
                    }}
                    animate={{ width: `${(f.points / f.maxPoints) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  />
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs, 0.75rem)',
                  color: 'var(--mt-bright)',
                  minWidth: 30,
                  textAlign: 'right',
                }}>
                  {f.points.toFixed(0)}
                </div>
              </div>
            ))}

            {tippingFactors.length > 0 && (
              <div style={{
                marginTop: '0.75rem',
                padding: '0.5rem 0.75rem',
                background: 'rgba(204, 68, 68, 0.08)',
                border: '1px solid var(--mt-danger)',
                borderRadius: 6,
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: 'var(--mt-danger)',
              }}>
                TIPPING FACTORS: {tippingFactors.map(f => f.name).join(', ')}
              </div>
            )}
          </div>

          {/* Assessment verdict */}
          <motion.div
            animate={{ borderColor: verdict.color }}
            style={{
              background: 'var(--mt-surface)',
              border: '2px solid',
              borderRadius: 8,
              padding: '1rem',
              textAlign: 'center',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: verdict.color,
              marginBottom: '0.5rem',
            }}>
              {verdict.label}
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm, 0.875rem)',
              color: 'var(--mt-muted)',
              lineHeight: 1.7,
            }}>
              {verdict.description}
            </div>
          </motion.div>
        </div>

        {/* Right: Input factors + Quiz */}
        <div>
          {/* Input factors */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}>
            {/* 1. Danger Rating */}
            <div style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '0.75rem 1rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: 'var(--mt-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                marginBottom: '0.5rem',
              }}>
                1. AVALANCHE DANGER RATING
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {([1, 2, 3, 4, 5] as DangerRating[]).map(rating => (
                  <button
                    key={rating}
                    onClick={() => {
                      setDangerRating(rating);
                      trackInteraction('danger');
                    }}
                    style={{
                      flex: 1,
                      padding: '0.5rem 0.25rem',
                      background: dangerRating === rating ? DANGER_LABELS[rating].color : 'var(--mt-void)',
                      color: dangerRating === rating ? 'var(--mt-void)' : DANGER_LABELS[rating].color,
                      border: `1px solid ${DANGER_LABELS[rating].color}`,
                      borderRadius: 4,
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs, 0.75rem)',
                      fontWeight: dangerRating === rating ? 700 : 400,
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <div>{rating}</div>
                    <div style={{ fontSize: '0.6rem', marginTop: '0.15rem' }}>{DANGER_LABELS[rating].name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Slope Angle */}
            <div style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '0.75rem 1rem',
            }}>
              <InteractiveSlider
                label="2. Slope Angle"
                min={20}
                max={50}
                step={1}
                value={slopeAngle}
                onChange={(v) => { setSlopeAngle(v); trackInteraction('slope'); }}
                formatValue={(v) => `${v}\u00B0`}
              />
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: slopeAngle >= 30 && slopeAngle <= 45 ? 'var(--mt-danger)' : 'var(--mt-muted)',
                marginTop: '0.25rem',
              }}>
                {slopeAngle < 25 ? 'Below avalanche terrain' :
                  slopeAngle < 30 ? 'Marginal avalanche terrain' :
                  slopeAngle <= 45 ? 'PRIME AVALANCHE TERRAIN (30-45\u00B0)' :
                  'Very steep -- sloughs more likely than slabs'}
              </div>
            </div>

            {/* 3. Aspect */}
            <div style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '0.75rem 1rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: 'var(--mt-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                marginBottom: '0.5rem',
              }}>
                3. SLOPE ASPECT
              </div>
              <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                {ASPECTS.map(a => (
                  <button
                    key={a}
                    onClick={() => { setAspect(a); trackInteraction('aspect'); }}
                    style={{
                      padding: '0.4rem 0.6rem',
                      background: aspect === a ? 'var(--mt-avalanche)' : 'var(--mt-void)',
                      color: aspect === a ? 'var(--mt-void)' : 'var(--mt-muted)',
                      border: `1px solid ${aspect === a ? 'var(--mt-avalanche)' : 'var(--mt-border)'}`,
                      borderRadius: 4,
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs, 0.75rem)',
                      fontWeight: aspect === a ? 700 : 400,
                      cursor: 'pointer',
                      minWidth: 32,
                    }}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Recent Precipitation */}
            <div style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '0.75rem 1rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: 'var(--mt-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                marginBottom: '0.5rem',
              }}>
                4. RECENT PRECIPITATION
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {(['none', 'light', 'heavy'] as Precipitation[]).map(p => (
                  <button
                    key={p}
                    onClick={() => { setPrecipitation(p); trackInteraction('precip'); }}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      background: precipitation === p ? 'var(--mt-avalanche)' : 'var(--mt-void)',
                      color: precipitation === p ? 'var(--mt-void)' : 'var(--mt-muted)',
                      border: `1px solid ${precipitation === p ? 'var(--mt-avalanche)' : 'var(--mt-border)'}`,
                      borderRadius: 4,
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs, 0.75rem)',
                      fontWeight: precipitation === p ? 700 : 400,
                      cursor: 'pointer',
                      textTransform: 'capitalize' as const,
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Wind Loading */}
            <div style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '0.75rem 1rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: 'var(--mt-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                marginBottom: '0.5rem',
              }}>
                5. WIND LOADING
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {(['none', 'moderate', 'heavy'] as WindLoading[]).map(w => (
                  <button
                    key={w}
                    onClick={() => { setWindLoading(w); trackInteraction('wind'); }}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      background: windLoading === w ? 'var(--mt-avalanche)' : 'var(--mt-void)',
                      color: windLoading === w ? 'var(--mt-void)' : 'var(--mt-muted)',
                      border: `1px solid ${windLoading === w ? 'var(--mt-avalanche)' : 'var(--mt-border)'}`,
                      borderRadius: 4,
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs, 0.75rem)',
                      fontWeight: windLoading === w ? 700 : 400,
                      cursor: 'pointer',
                      textTransform: 'capitalize' as const,
                    }}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Group Size */}
            <div style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '0.75rem 1rem',
            }}>
              <InteractiveSlider
                label="6. Group Size"
                min={1}
                max={6}
                step={1}
                value={groupSize}
                onChange={(v) => { setGroupSize(v); trackInteraction('group'); }}
                formatValue={(v) => `${v} ${v === 1 ? 'person' : 'people'}`}
              />
            </div>

            {/* 7. Terrain Traps */}
            <div style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '0.75rem 1rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: 'var(--mt-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                marginBottom: '0.5rem',
              }}>
                7. TERRAIN TRAPS
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {(['none', 'minor', 'major'] as TerrainTraps[]).map(t => (
                  <button
                    key={t}
                    onClick={() => { setTerrainTraps(t); trackInteraction('traps'); }}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      background: terrainTraps === t ? (t === 'major' ? 'var(--mt-danger)' : 'var(--mt-avalanche)') : 'var(--mt-void)',
                      color: terrainTraps === t ? (t === 'major' ? 'var(--mt-bright)' : 'var(--mt-void)') : 'var(--mt-muted)',
                      border: `1px solid ${terrainTraps === t ? (t === 'major' ? 'var(--mt-danger)' : 'var(--mt-avalanche)') : 'var(--mt-border)'}`,
                      borderRadius: 4,
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs, 0.75rem)',
                      fontWeight: terrainTraps === t ? 700 : 400,
                      cursor: 'pointer',
                      textTransform: 'capitalize' as const,
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: 'var(--mt-muted)',
                marginTop: '0.35rem',
              }}>
                {terrainTraps === 'none' ? 'Open runout, no cliff bands or gullies' :
                  terrainTraps === 'minor' ? 'Trees, minor terrain features below' :
                  'Cliff bands, deep gullies, or crevasses below -- burial depth multiplied'}
              </div>
            </div>
          </div>

          {/* Quiz */}
          {hasCompleteAssessment && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <QuizBlock
                question="At what avalanche danger rating do most avalanche fatalities occur?"
                options={[
                  { text: 'Level 1 (Low) -- people let their guard down' },
                  { text: 'Level 3 (Considerable) -- most people still go out, but conditions are dangerous enough to kill', correct: true },
                  { text: 'Level 4 (High) -- the conditions are at their most extreme' },
                  { text: 'Level 5 (Extreme) -- everything is avalanching' },
                ]}
                explanation={'The majority of avalanche fatalities occur at Considerable (Level 3) danger. At Low and Moderate, conditions are generally manageable. At High and Extreme, most experienced people stay home. But at Considerable, conditions look deceptively manageable -- the danger exists but is not obvious. People still go out, still find tempting terrain, and the snowpack is unstable enough to kill. This is the "deadly middle" of the danger scale.'}
                onCorrect={handleQuizCorrect}
              />

              {quizPassed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    marginTop: '1.5rem',
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
                  Module complete. You can now build a structured risk assessment for any backcountry objective.
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
