'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveSlider from '../InteractiveSlider';
import QuizBlock from '../QuizBlock';

interface SlabPhysicsProps {
  onComplete: () => void;
}

const SVG_W = 400;
const SVG_H = 320;
const GROUND_Y = 280;
const OLD_SNOW_Y = 240;
const WEAK_LAYER_Y = 220;
const WEAK_LAYER_H = 20;
const SLAB_Y = 160;
const SLAB_TOP = 130;

// Stress thresholds
const CRACK_THRESHOLD = 35;
const PROPAGATION_THRESHOLD = 60;
const RELEASE_THRESHOLD = 80;

type Phase = 'stable' | 'cracking' | 'propagation' | 'release';

export default function SlabPhysics({ onComplete }: SlabPhysicsProps) {
  const [stress, setStress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [peakStressReached, setPeakStressReached] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);

  const phase: Phase = useMemo(() => {
    if (stress >= RELEASE_THRESHOLD) return 'release';
    if (stress >= PROPAGATION_THRESHOLD) return 'propagation';
    if (stress >= CRACK_THRESHOLD) return 'cracking';
    return 'stable';
  }, [stress]);

  const handleStressChange = (value: number) => {
    setStress(value);
    if (!hasInteracted && value > 20) setHasInteracted(true);
    if (value >= RELEASE_THRESHOLD && !peakStressReached) setPeakStressReached(true);
  };

  const handleQuizCorrect = () => {
    setQuizCorrect(true);
    onComplete();
  };

  // Crack generation along weak layer
  const crackCount = useMemo(() => {
    if (stress < CRACK_THRESHOLD) return 0;
    if (stress < PROPAGATION_THRESHOLD) return Math.floor((stress - CRACK_THRESHOLD) / 5) + 1;
    return 8;
  }, [stress]);

  // Fracture line propagation
  const propagationWidth = useMemo(() => {
    if (stress < PROPAGATION_THRESHOLD) return 0;
    const progress = (stress - PROPAGATION_THRESHOLD) / (RELEASE_THRESHOLD - PROPAGATION_THRESHOLD);
    return Math.min(1, progress) * SVG_W;
  }, [stress]);

  // Slab slide offset
  const slideOffset = useMemo(() => {
    if (stress < RELEASE_THRESHOLD) return { x: 0, y: 0 };
    const progress = (stress - RELEASE_THRESHOLD) / (100 - RELEASE_THRESHOLD);
    return {
      x: progress * 60,
      y: progress * 40,
    };
  }, [stress]);

  // Generate facet crystal shapes for weak layer
  const facetCrystals = useMemo(() => {
    const crystals = [];
    for (let i = 0; i < 20; i++) {
      const x = 20 + (i * (SVG_W - 40)) / 19;
      const y = WEAK_LAYER_Y + Math.random() * WEAK_LAYER_H;
      const size = 3 + Math.random() * 3;
      crystals.push({ x, y, size, rotation: Math.random() * 360 });
    }
    return crystals;
  }, []);

  // Generate rounded grains for old snow
  const roundedGrains = useMemo(() => {
    const grains = [];
    for (let i = 0; i < 30; i++) {
      const x = 15 + Math.random() * (SVG_W - 30);
      const y = OLD_SNOW_Y + Math.random() * (WEAK_LAYER_Y - OLD_SNOW_Y);
      const r = 1.5 + Math.random() * 2;
      grains.push({ x, y, r });
    }
    return grains;
  }, []);

  // Generate micro-cracks
  const cracks = useMemo(() => {
    const result = [];
    for (let i = 0; i < crackCount; i++) {
      const centerX = 40 + (i * (SVG_W - 80)) / Math.max(crackCount - 1, 1);
      const y1 = WEAK_LAYER_Y + 2;
      const y2 = WEAK_LAYER_Y + WEAK_LAYER_H - 2;
      result.push({ x: centerX, y1, y2, offset: (Math.random() - 0.5) * 6 });
    }
    return result;
  }, [crackCount]);

  const phaseLabel = {
    stable: 'STABLE',
    cracking: 'MICRO-CRACKING',
    propagation: 'FRACTURE PROPAGATION',
    release: 'SLAB RELEASE',
  };

  const phaseColor = {
    stable: '#4ADE80',
    cracking: '#F59E0B',
    propagation: '#CC4444',
    release: '#FF2222',
  };

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <p style={{ color: 'var(--mt-bright)', lineHeight: 1.7, marginBottom: '1rem' }}>
        An avalanche slab sits on top of a <strong>weak layer</strong> -- a fragile stratum of
        faceted crystals within the snowpack. When stress exceeds the weak layer&#39;s strength,
        a fracture initiates and propagates across the slope at up to 100 m/s.
      </p>
      <p style={{ color: 'var(--mt-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        Increase the applied stress to watch the fracture mechanics unfold: micro-cracks form,
        a fracture line propagates, and the slab releases.
      </p>

      <div className="mt-module-split">
        <div>
          {/* SVG Cross-Section */}
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
                <linearGradient id="slabGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E8E8EC" />
                  <stop offset="100%" stopColor="#C8C8D0" />
                </linearGradient>
                <linearGradient id="oldSnowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A0A0A8" />
                  <stop offset="100%" stopColor="#808088" />
                </linearGradient>
                <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4A3A2A" />
                  <stop offset="100%" stopColor="#3A2A1A" />
                </linearGradient>
              </defs>

              {/* Sky background */}
              <rect x={0} y={0} width={SVG_W} height={SLAB_TOP} fill="#1a2030" />

              {/* Ground layer */}
              <rect x={0} y={GROUND_Y} width={SVG_W} height={SVG_H - GROUND_Y} fill="url(#groundGrad)" />

              {/* Old snow layer */}
              <rect x={0} y={OLD_SNOW_Y} width={SVG_W} height={GROUND_Y - OLD_SNOW_Y} fill="url(#oldSnowGrad)" opacity={0.6} />

              {/* Rounded grains in old snow */}
              {roundedGrains.map((g, i) => (
                <circle key={`grain-${i}`} cx={g.x} cy={g.y} r={g.r} fill="rgba(180, 180, 190, 0.5)" />
              ))}

              {/* Weak layer */}
              <rect x={0} y={WEAK_LAYER_Y} width={SVG_W} height={WEAK_LAYER_H} fill="rgba(204, 68, 68, 0.15)" />

              {/* Faceted crystals in weak layer */}
              {facetCrystals.map((c, i) => (
                <g key={`facet-${i}`} transform={`translate(${c.x}, ${c.y}) rotate(${c.rotation})`}>
                  <polygon
                    points={`0,${-c.size} ${c.size * 0.87},${c.size * 0.5} ${-c.size * 0.87},${c.size * 0.5}`}
                    fill="none"
                    stroke="rgba(204, 68, 68, 0.5)"
                    strokeWidth={0.8}
                  />
                </g>
              ))}

              {/* Micro-cracks in weak layer */}
              {cracks.map((crack, i) => (
                <motion.line
                  key={`crack-${i}`}
                  x1={crack.x + crack.offset}
                  y1={crack.y1}
                  x2={crack.x - crack.offset}
                  y2={crack.y2}
                  stroke="var(--mt-danger)"
                  strokeWidth={1.5}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                />
              ))}

              {/* Fracture propagation line */}
              {propagationWidth > 0 && (
                <motion.line
                  x1={SVG_W / 2 - propagationWidth / 2}
                  y1={WEAK_LAYER_Y + WEAK_LAYER_H / 2}
                  x2={SVG_W / 2 + propagationWidth / 2}
                  y2={WEAK_LAYER_Y + WEAK_LAYER_H / 2}
                  stroke="#FF4444"
                  strokeWidth={2.5}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.15 }}
                />
              )}

              {/* Slab layer (slides on release) */}
              <motion.g
                animate={{
                  x: slideOffset.x,
                  y: slideOffset.y,
                }}
                transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              >
                <rect
                  x={0}
                  y={SLAB_TOP}
                  width={SVG_W}
                  height={WEAK_LAYER_Y - SLAB_TOP}
                  fill="url(#slabGrad)"
                  opacity={0.85}
                />
                {/* Slab texture lines */}
                {[0, 1, 2, 3, 4].map(i => (
                  <line
                    key={`slab-line-${i}`}
                    x1={0}
                    y1={SLAB_TOP + 12 + i * 14}
                    x2={SVG_W}
                    y2={SLAB_TOP + 12 + i * 14}
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth={0.5}
                  />
                ))}
              </motion.g>

              {/* Skier icon */}
              <motion.g
                animate={{
                  x: slideOffset.x,
                  y: slideOffset.y,
                }}
                transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              >
                <circle
                  cx={SVG_W / 2}
                  cy={SLAB_TOP - 12}
                  r={6}
                  fill="var(--mt-bright)"
                  stroke="var(--mt-void)"
                  strokeWidth={1.5}
                />
                <line
                  x1={SVG_W / 2}
                  y1={SLAB_TOP - 6}
                  x2={SVG_W / 2}
                  y2={SLAB_TOP}
                  stroke="var(--mt-bright)"
                  strokeWidth={2}
                />
                {/* Skier pressure indicator */}
                {stress > 0 && (
                  <motion.line
                    x1={SVG_W / 2}
                    y1={SLAB_TOP}
                    x2={SVG_W / 2}
                    y2={SLAB_TOP + (stress / 100) * 30}
                    stroke="var(--mt-danger)"
                    strokeWidth={1}
                    strokeDasharray="3,2"
                    opacity={0.6}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                  />
                )}
              </motion.g>

              {/* Layer labels */}
              <text x={SVG_W - 10} y={SLAB_TOP + 20} textAnchor="end" fill="var(--mt-muted)" fontSize={9} fontFamily="var(--font-mono)">SLAB</text>
              <text x={SVG_W - 10} y={WEAK_LAYER_Y + 13} textAnchor="end" fill="var(--mt-danger)" fontSize={9} fontFamily="var(--font-mono)">WEAK LAYER</text>
              <text x={SVG_W - 10} y={OLD_SNOW_Y + 20} textAnchor="end" fill="var(--mt-muted)" fontSize={9} fontFamily="var(--font-mono)">OLD SNOW</text>
              <text x={SVG_W - 10} y={GROUND_Y + 15} textAnchor="end" fill="var(--mt-muted)" fontSize={9} fontFamily="var(--font-mono)">GROUND</text>

              {/* Release flash */}
              <AnimatePresence>
                {phase === 'release' && (
                  <motion.rect
                    x={0}
                    y={0}
                    width={SVG_W}
                    height={SVG_H}
                    fill="#FFFFFF"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </AnimatePresence>
            </svg>
          </div>
        </div>
        <div>
          {/* Phase indicator */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            padding: '0.75rem 1rem',
            background: 'var(--mt-surface)',
            border: '1px solid var(--mt-border)',
            borderRadius: 8,
          }}>
            <div>
              <div style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', marginBottom: '0.15rem' }}>
                PHASE
              </div>
              <div style={{ color: phaseColor[phase], fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm, 0.875rem)', fontWeight: 700 }}>
                {phaseLabel[phase]}
              </div>
            </div>
            {phase === 'propagation' || phase === 'release' ? (
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'var(--mt-muted)', fontSize: 'var(--text-xs, 0.75rem)', fontFamily: 'var(--font-mono)', marginBottom: '0.15rem' }}>
                  FRACTURE SPEED
                </div>
                <div style={{ color: 'var(--mt-bright)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm, 0.875rem)', fontWeight: 700 }}>
                  ~100 m/s
                </div>
              </div>
            ) : null}
          </div>

          {/* Stress slider */}
          <div style={{ marginBottom: '1.5rem' }}>
            <InteractiveSlider
              label="Applied Stress (Skier Weight)"
              min={0}
              max={100}
              value={stress}
              onChange={handleStressChange}
              formatValue={(v) => {
                if (v < CRACK_THRESHOLD) return `${v}% -- stable`;
                if (v < PROPAGATION_THRESHOLD) return `${v}% -- cracking`;
                if (v < RELEASE_THRESHOLD) return `${v}% -- propagating`;
                return `${v}% -- RELEASED`;
              }}
            />
          </div>

          {/* Phase progression bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.25rem',
            marginBottom: '1.5rem',
          }}>
            {(['stable', 'cracking', 'propagation', 'release'] as Phase[]).map((p) => (
              <div key={p} style={{
                padding: '0.5rem',
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs, 0.75rem)',
                background: phase === p ? `${phaseColor[p]}15` : 'var(--mt-surface)',
                border: `1px solid ${phase === p ? phaseColor[p] : 'var(--mt-border)'}`,
                borderRadius: 4,
                color: phase === p ? phaseColor[p] : 'var(--mt-muted)',
                letterSpacing: '0.03em',
              }}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </div>
            ))}
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
                The key insight: an initial fracture (crack initiation) is necessary but not sufficient
                for an avalanche. What matters is whether that fracture <strong style={{ color: 'var(--mt-bright)' }}>propagates</strong> across
                the weak layer. A fracture that arrests after a few centimeters is harmless. One that
                propagates at 100 m/s across an entire slope face releases a slab that can weigh
                thousands of tons.
              </p>
            </motion.div>
          )}

          {/* Quiz */}
          {peakStressReached && !quizCorrect && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <QuizBlock
                question="What determines whether an avalanche will actually release -- the initial fracture or the propagation?"
                options={[
                  { text: 'The initial fracture -- if the weak layer cracks at all, the slab will always slide' },
                  { text: 'The propagation -- a fracture must travel across the slope for the slab to release', correct: true },
                  { text: 'Neither -- avalanches are purely random events' },
                  { text: 'The slab thickness -- only thick slabs can avalanche' },
                ]}
                explanation="Fracture initiation happens frequently in weak layers without causing avalanches. The critical factor is fracture propagation: the crack must travel far enough across the weak layer to release a slab. This is why propagation tests (like the Extended Column Test) are so valuable -- they test not just whether a fracture initiates, but whether it propagates."
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
              Module complete. You understand slab mechanics and the critical role of fracture propagation.
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
