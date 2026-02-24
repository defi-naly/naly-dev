'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizBlock from '../QuizBlock';

interface SnowpackLayerBuilderProps {
  onComplete: () => void;
}

interface CrystalType {
  id: string;
  name: string;
  shortName: string;
  color: string;
  pattern: string; // SVG pattern description
  strength: number; // 0-100
  strengthLabel: string;
  description: string;
}

interface StackedLayer {
  crystal: CrystalType;
  id: number;
}

const CRYSTAL_TYPES: CrystalType[] = [
  {
    id: 'rounds',
    name: 'Rounded Grains',
    shortName: 'Rounds',
    color: '#8888AA',
    pattern: 'circles',
    strength: 85,
    strengthLabel: 'Strong',
    description: 'Well-bonded, sintered snow. The strongest grain type. Forms through equilibrium metamorphism.',
  },
  {
    id: 'facets',
    name: 'Faceted Grains',
    shortName: 'Facets',
    color: '#CC4444',
    pattern: 'diamonds',
    strength: 20,
    strengthLabel: 'Weak',
    description: 'Angular, poorly bonded crystals. Form under strong temperature gradients. The most common weak layer type in avalanche accidents.',
  },
  {
    id: 'surface-hoar',
    name: 'Surface Hoar',
    shortName: 'Surf. Hoar',
    color: '#FF6666',
    pattern: 'feathers',
    strength: 10,
    strengthLabel: 'Very Weak',
    description: 'Feathery ice crystals that grow on the snow surface during cold, clear nights. Nearly invisible but extremely dangerous when buried by new snow.',
  },
  {
    id: 'crust',
    name: 'Crust',
    shortName: 'Crust',
    color: '#AAAACC',
    pattern: 'line',
    strength: 60,
    strengthLabel: 'Variable',
    description: 'Melt-freeze or rain crust. Can be strong but creates a poor bonding surface. Facets often develop above or below crusts.',
  },
  {
    id: 'new-snow',
    name: 'New Snow',
    shortName: 'New',
    color: '#CCCCDD',
    pattern: 'stars',
    strength: 50,
    strengthLabel: 'Variable',
    description: 'Recently deposited snow. Strength depends on density, temperature, and wind loading. Can be a slab or a weak layer depending on conditions.',
  },
];

const MAX_LAYERS = 8;
const COLUMN_W = 120;
const COLUMN_H = 320;
const LAYER_H = COLUMN_H / MAX_LAYERS;
const SVG_W = 280;
const SVG_H = 380;
const COL_X = (SVG_W - COLUMN_W) / 2;
const COL_Y = 30;

let layerIdCounter = 0;

export default function SnowpackLayerBuilder({ onComplete }: SnowpackLayerBuilderProps) {
  const [layers, setLayers] = useState<StackedLayer[]>([]);
  const [testRun, setTestRun] = useState(false);
  const [fractureResult, setFractureResult] = useState<{ layerIndex: number; crystal: CrystalType } | null>(null);
  const [animating, setAnimating] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const addLayer = useCallback((crystal: CrystalType) => {
    if (layers.length >= MAX_LAYERS) return;
    setLayers(prev => [...prev, { crystal, id: ++layerIdCounter }]);
    // Reset test if modifying
    if (testRun) {
      setTestRun(false);
      setFractureResult(null);
      setScore(null);
    }
  }, [layers.length, testRun]);

  const removeLayer = useCallback((index: number) => {
    setLayers(prev => prev.filter((_, i) => i !== index));
    if (testRun) {
      setTestRun(false);
      setFractureResult(null);
      setScore(null);
    }
  }, [testRun]);

  const runStressTest = useCallback(() => {
    if (layers.length < 3 || animating) return;

    setAnimating(true);
    setTestRun(true);

    // Find weakest layer (not the top layer — need something above it)
    let weakestIndex = -1;
    let weakestStrength = 101;

    for (let i = 0; i < layers.length - 1; i++) {
      if (layers[i].crystal.strength < weakestStrength) {
        weakestStrength = layers[i].crystal.strength;
        weakestIndex = i;
      }
    }

    // Determine if fracture occurs
    const willFracture = weakestStrength < 40;

    setTimeout(() => {
      if (willFracture && weakestIndex >= 0) {
        setFractureResult({ layerIndex: weakestIndex, crystal: layers[weakestIndex].crystal });
        // Score: how well did the user identify the weak layer?
        const weakLayers = layers.filter((l, i) => i < layers.length - 1 && l.crystal.strength < 40);
        setScore(weakLayers.length > 0 ? 100 : 0);
      } else {
        setFractureResult(null);
        const hasNoWeakLayers = layers.every(l => l.crystal.strength >= 40);
        setScore(hasNoWeakLayers ? 100 : 50);
      }
      setAnimating(false);
    }, 1500);
  }, [layers, animating]);

  const handleQuizCorrect = () => {
    setQuizCorrect(true);
    onComplete();
  };

  // Render pattern for crystal type in SVG
  const renderCrystalPattern = (crystal: CrystalType, x: number, y: number, w: number, h: number) => {
    const elements = [];
    switch (crystal.pattern) {
      case 'circles':
        for (let i = 0; i < 5; i++) {
          const cx = x + 15 + i * (w - 30) / 4;
          const cy = y + h / 2;
          elements.push(
            <circle key={`p-${i}`} cx={cx} cy={cy} r={3} fill="none" stroke={crystal.color} strokeWidth={1} opacity={0.6} />
          );
        }
        break;
      case 'diamonds':
        for (let i = 0; i < 5; i++) {
          const cx = x + 15 + i * (w - 30) / 4;
          const cy = y + h / 2;
          elements.push(
            <polygon key={`p-${i}`} points={`${cx},${cy - 4} ${cx + 4},${cy} ${cx},${cy + 4} ${cx - 4},${cy}`} fill="none" stroke={crystal.color} strokeWidth={1} opacity={0.6} />
          );
        }
        break;
      case 'feathers':
        for (let i = 0; i < 6; i++) {
          const bx = x + 10 + i * (w - 20) / 5;
          const by = y + h / 2;
          elements.push(
            <g key={`p-${i}`}>
              <line x1={bx} y1={by + 4} x2={bx} y2={by - 6} stroke={crystal.color} strokeWidth={0.8} opacity={0.6} />
              <line x1={bx - 3} y1={by - 2} x2={bx} y2={by - 6} stroke={crystal.color} strokeWidth={0.8} opacity={0.6} />
              <line x1={bx + 3} y1={by - 2} x2={bx} y2={by - 6} stroke={crystal.color} strokeWidth={0.8} opacity={0.6} />
            </g>
          );
        }
        break;
      case 'line':
        elements.push(
          <line key="p-0" x1={x + 5} y1={y + h / 2} x2={x + w - 5} y2={y + h / 2} stroke={crystal.color} strokeWidth={2} opacity={0.5} />
        );
        break;
      case 'stars':
        for (let i = 0; i < 4; i++) {
          const cx = x + 20 + i * (w - 40) / 3;
          const cy = y + h / 2;
          elements.push(
            <g key={`p-${i}`}>
              <line x1={cx} y1={cy - 3} x2={cx} y2={cy + 3} stroke={crystal.color} strokeWidth={0.8} opacity={0.5} />
              <line x1={cx - 3} y1={cy} x2={cx + 3} y2={cy} stroke={crystal.color} strokeWidth={0.8} opacity={0.5} />
              <line x1={cx - 2} y1={cy - 2} x2={cx + 2} y2={cy + 2} stroke={crystal.color} strokeWidth={0.8} opacity={0.5} />
            </g>
          );
        }
        break;
    }
    return elements;
  };

  const hasEnoughLayers = layers.length >= 3;
  const hasTestedWithResult = testRun && score !== null;

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <p style={{ color: 'var(--mt-bright)', lineHeight: 1.7, marginBottom: '1rem' }}>
        Avalanche slabs fail on <strong>weak layers</strong> buried within the snowpack. Different
        crystal types have vastly different strengths. Build a snowpack column by selecting crystal
        types, then stress-test it to see if and where it fractures.
      </p>
      <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        Click crystal types to add layers (bottom to top). Build at least 3 layers, then run the
        stress test. Experiment with different combinations.
      </p>

      <div className="mt-module-split">
        <div>
          {/* Snow column SVG */}
          <div style={{
            background: 'var(--mt-surface)',
            border: '1px solid var(--mt-border)',
            borderRadius: 8,
            padding: '0.5rem',
            overflow: 'hidden',
          }}>
            <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: 'block' }}>
              {/* Column outline */}
              <rect
                x={COL_X}
                y={COL_Y}
                width={COLUMN_W}
                height={COLUMN_H}
                fill="none"
                stroke="var(--mt-border)"
                strokeWidth={1}
                strokeDasharray="4,4"
              />

              {/* Ground */}
              <rect
                x={COL_X}
                y={COL_Y + COLUMN_H}
                width={COLUMN_W}
                height={20}
                fill="#3A2A1A"
                stroke="var(--mt-border)"
                strokeWidth={1}
              />
              <text
                x={COL_X + COLUMN_W / 2}
                y={COL_Y + COLUMN_H + 14}
                textAnchor="middle"
                fill="var(--mt-muted)"
                fontSize={8}
                fontFamily="var(--font-mono)"
              >
                GROUND
              </text>

              {/* Layers (bottom to top) */}
              {layers.map((layer, i) => {
                const layerY = COL_Y + COLUMN_H - (i + 1) * LAYER_H;
                const isFractured = testRun && fractureResult && fractureResult.layerIndex === i;
                const isAboveFracture = testRun && fractureResult && i > fractureResult.layerIndex;

                return (
                  <motion.g
                    key={layer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: isAboveFracture && !animating ? 15 : 0,
                      x: isAboveFracture && !animating ? 8 : 0,
                    }}
                    transition={{ duration: 0.3, delay: isAboveFracture ? 0.5 : 0 }}
                  >
                    {/* Layer background */}
                    <rect
                      x={COL_X}
                      y={layerY}
                      width={COLUMN_W}
                      height={LAYER_H}
                      fill={`${layer.crystal.color}20`}
                      stroke={isFractured ? '#FF4444' : `${layer.crystal.color}40`}
                      strokeWidth={isFractured ? 2 : 1}
                    />

                    {/* Crystal pattern */}
                    {renderCrystalPattern(layer.crystal, COL_X, layerY, COLUMN_W, LAYER_H)}

                    {/* Fracture line */}
                    {isFractured && !animating && (
                      <motion.line
                        x1={COL_X}
                        y1={layerY + LAYER_H}
                        x2={COL_X + COLUMN_W}
                        y2={layerY + LAYER_H}
                        stroke="#FF4444"
                        strokeWidth={3}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      />
                    )}

                    {/* Layer label */}
                    <text
                      x={COL_X + COLUMN_W + 8}
                      y={layerY + LAYER_H / 2 + 3}
                      fill={layer.crystal.strength < 40 ? 'var(--mt-danger)' : 'var(--mt-muted)'}
                      fontSize={8}
                      fontFamily="var(--font-mono)"
                    >
                      {layer.crystal.shortName}
                    </text>

                    {/* Remove button */}
                    {!testRun && (
                      <g onClick={(e) => { e.stopPropagation(); removeLayer(i); }} style={{ cursor: 'pointer' }}>
                        <rect
                          x={COL_X - 18}
                          y={layerY + LAYER_H / 2 - 7}
                          width={14}
                          height={14}
                          rx={2}
                          fill="var(--mt-surface)"
                          stroke="var(--mt-border)"
                          strokeWidth={1}
                        />
                        <text
                          x={COL_X - 11}
                          y={layerY + LAYER_H / 2 + 4}
                          textAnchor="middle"
                          fill="var(--mt-muted)"
                          fontSize={10}
                          fontFamily="var(--font-mono)"
                        >
                          x
                        </text>
                      </g>
                    )}
                  </motion.g>
                );
              })}

              {/* Empty state */}
              {layers.length === 0 && (
                <text
                  x={SVG_W / 2}
                  y={COL_Y + COLUMN_H / 2}
                  textAnchor="middle"
                  fill="var(--mt-muted)"
                  fontSize={10}
                  fontFamily="var(--font-mono)"
                  opacity={0.5}
                >
                  Click crystals to add layers
                </text>
              )}

              {/* Stress test arrow */}
              {animating && (
                <motion.g
                  initial={{ y: -30 }}
                  animate={{ y: [- 30, 0, -10, 0] }}
                  transition={{ duration: 1.5, times: [0, 0.5, 0.7, 1] }}
                >
                  <polygon
                    points={`${SVG_W / 2 - 8},${COL_Y - 15} ${SVG_W / 2 + 8},${COL_Y - 15} ${SVG_W / 2},${COL_Y - 3}`}
                    fill="var(--mt-bright)"
                  />
                  <text
                    x={SVG_W / 2}
                    y={COL_Y - 22}
                    textAnchor="middle"
                    fill="var(--mt-bright)"
                    fontSize={9}
                    fontFamily="var(--font-mono)"
                    fontWeight={700}
                  >
                    STRESS
                  </text>
                </motion.g>
              )}

              {/* Layer count */}
              <text
                x={SVG_W / 2}
                y={SVG_H - 5}
                textAnchor="middle"
                fill="var(--mt-muted)"
                fontSize={9}
                fontFamily="var(--font-mono)"
              >
                {layers.length}/{MAX_LAYERS} layers
              </text>
            </svg>
          </div>
        </div>
        <div>
          {/* Crystal Palette */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '0.5rem',
            marginBottom: '1.5rem',
          }}>
            {CRYSTAL_TYPES.map(crystal => (
              <button
                key={crystal.id}
                onClick={() => addLayer(crystal)}
                disabled={layers.length >= MAX_LAYERS}
                style={{
                  background: 'var(--mt-surface)',
                  border: `1px solid ${crystal.color}40`,
                  borderRadius: 6,
                  padding: '0.6rem 0.75rem',
                  cursor: layers.length >= MAX_LAYERS ? 'not-allowed' : 'pointer',
                  opacity: layers.length >= MAX_LAYERS ? 0.4 : 1,
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: crystal.color,
                  }} />
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xs, 0.75rem)', color: 'var(--mt-bright)' }}>
                    {crystal.shortName}
                  </span>
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  color: crystal.strength < 40 ? 'var(--mt-danger)' : 'var(--mt-muted)',
                }}>
                  {crystal.strengthLabel} ({crystal.strength})
                </div>
              </button>
            ))}
          </div>

          {/* Strength profile */}
          <div style={{
            background: 'var(--mt-surface)',
            border: '1px solid var(--mt-border)',
            borderRadius: 8,
            padding: '0.75rem',
            marginBottom: '0.75rem',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs, 0.75rem)', color: 'var(--mt-muted)', marginBottom: '0.75rem', letterSpacing: '0.08em' }}>
              STRENGTH PROFILE
            </div>
            {layers.length === 0 ? (
              <div style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', opacity: 0.5 }}>
                No layers yet
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '0.25rem' }}>
                {layers.map((layer, i) => (
                  <div key={layer.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: 6,
                      height: 6,
                      borderRadius: 1,
                      background: layer.crystal.color,
                      flexShrink: 0,
                    }} />
                    <div style={{
                      flex: 1,
                      height: 4,
                      background: 'var(--mt-border)',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${layer.crystal.strength}%`,
                        height: '100%',
                        background: layer.crystal.strength < 40 ? 'var(--mt-danger)' : layer.crystal.strength < 60 ? '#F59E0B' : '#4ADE80',
                        transition: 'width 0.3s ease',
                      }} />
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.625rem',
                      color: layer.crystal.strength < 40 ? 'var(--mt-danger)' : 'var(--mt-muted)',
                      minWidth: 24,
                      textAlign: 'right',
                    }}>
                      {layer.crystal.strength}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Test result */}
          {hasTestedWithResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: fractureResult ? 'rgba(204, 68, 68, 0.1)' : 'rgba(74, 222, 128, 0.1)',
                border: `1px solid ${fractureResult ? 'var(--mt-danger)' : '#4ADE80'}`,
                borderRadius: 8,
                padding: '0.75rem',
                marginBottom: '0.75rem',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                color: fractureResult ? 'var(--mt-danger)' : '#4ADE80',
                marginBottom: '0.25rem',
                letterSpacing: '0.08em',
              }}>
                {fractureResult ? 'FRACTURE DETECTED' : 'COLUMN STABLE'}
              </div>
              <div style={{ color: 'var(--mt-bright)', fontSize: 'var(--text-sm, 0.875rem)', lineHeight: 1.5 }}>
                {fractureResult
                  ? `Failed on ${fractureResult.crystal.name} layer (strength: ${fractureResult.crystal.strength}). ${fractureResult.crystal.description}`
                  : 'No weak layers found. This snowpack resisted the stress test without fracturing.'
                }
              </div>
            </motion.div>
          )}

          {/* Crystal descriptions for most recently added */}
          {layers.length > 0 && !testRun && (
            <div style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '0.75rem',
              marginBottom: '0.75rem',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs, 0.75rem)', color: 'var(--mt-muted)', marginBottom: '0.25rem' }}>
                LAST ADDED
              </div>
              <div style={{ color: 'var(--mt-bright)', fontSize: 'var(--text-sm, 0.875rem)', lineHeight: 1.5 }}>
                {layers[layers.length - 1].crystal.description}
              </div>
            </div>
          )}

          {/* Stress test button */}
          <button
            onClick={runStressTest}
            disabled={!hasEnoughLayers || animating}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: hasEnoughLayers ? 'transparent' : 'var(--mt-surface)',
              border: `1px solid ${hasEnoughLayers ? 'var(--mt-avalanche)' : 'var(--mt-border)'}`,
              color: hasEnoughLayers ? 'var(--mt-avalanche)' : 'var(--mt-muted)',
              borderRadius: 8,
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-base, 1rem)',
              fontWeight: 700,
              cursor: hasEnoughLayers && !animating ? 'pointer' : 'not-allowed',
              opacity: animating ? 0.5 : 1,
              letterSpacing: '0.05em',
              marginBottom: '1.5rem',
            }}
          >
            {animating ? 'APPLYING STRESS...' : testRun ? 'RE-TEST COLUMN' : 'APPLY STRESS TEST'}
          </button>

          {/* Educational section */}
          {hasTestedWithResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginBottom: '1.5rem' }}
            >
              <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, fontSize: 'var(--text-sm, 0.875rem)' }}>
                In the field, backcountry travelers perform similar tests: the <strong style={{ color: 'var(--mt-bright)' }}>Extended Column Test (ECT)</strong> and
                the <strong style={{ color: 'var(--mt-bright)' }}>Compression Test (CT)</strong> apply
                stress to isolated columns of snow to identify weak layers and test whether fractures
                propagate. Surface hoar and faceted grains are the crystal types most commonly associated
                with persistent weak layers and avalanche fatalities.
              </p>
            </motion.div>
          )}

          {/* Quiz */}
          {hasTestedWithResult && !quizCorrect && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <QuizBlock
                question="Which crystal type forms on cold clear nights and is nearly invisible but extremely dangerous?"
                options={[
                  { text: 'Faceted grains -- they grow in the dark and are hard to see' },
                  { text: 'Rounded grains -- they are small and blend in with surrounding snow' },
                  { text: 'Surface hoar -- feathery crystals that grow on the surface and get buried', correct: true },
                  { text: 'Crust -- a thin ice layer that forms overnight' },
                ]}
                explanation="Surface hoar forms through direct deposition of water vapor onto the cold snow surface during clear, calm nights. The resulting feathery crystals (think frozen dew) are delicate, beautiful, and nearly invisible once buried by subsequent snowfall. When buried, surface hoar creates an extremely weak layer that can persist for weeks or months, making it one of the most insidious avalanche problems."
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
              Module complete. You understand snowpack structure and how crystal types determine stability.
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
