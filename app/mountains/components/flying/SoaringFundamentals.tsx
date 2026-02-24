'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizBlock from '../QuizBlock';

interface SoaringFundamentalsProps {
  onComplete: () => void;
}

interface LiftType {
  id: 'ridge' | 'thermal' | 'convergence';
  name: string;
  when: string;
  where: string;
  strength: string;
  risks: string;
  description: string;
}

const LIFT_TYPES: LiftType[] = [
  {
    id: 'ridge',
    name: 'Ridge Lift',
    when: 'Wind > 15 km/h perpendicular to ridge',
    where: 'Windward side of ridges, cliffs, and mountain slopes',
    strength: '2-5 m/s (smooth and predictable)',
    risks: 'Rotor turbulence on lee side; terrain proximity; wind changes',
    description:
      'Wind strikes a slope and is deflected upward. The lift band is narrow — confined to the windward face of the ridge. It is the most predictable form of lift: if the wind blows, the lift exists. Pilots fly figure-8 patterns along the ridge, never crossing to the lee side.',
  },
  {
    id: 'thermal',
    name: 'Thermal Lift',
    when: 'Sunny days with surface heating, typically 10:00-17:00',
    where: 'Over dark surfaces, towns, dry fields, south-facing slopes',
    strength: '1-8 m/s (often turbulent, variable)',
    risks: 'Turbulence at edges; collapse risk in strong thermals; overdevelopment',
    description:
      'The sun heats the ground unevenly. Dark surfaces warm faster, creating bubbles of hot air that detach and rise. These bubbles organize into columns of rising air — thermals. Cumulus clouds mark their tops. Thermals are the engine of cross-country soaring, but they are invisible and turbulent.',
  },
  {
    id: 'convergence',
    name: 'Convergence Lift',
    when: 'When opposing air masses or breezes meet (sea breeze fronts, valley convergence)',
    where: 'Along convergence lines — often visible as cloud streets or lines of cumulus',
    strength: '1-4 m/s (wide, smooth bands)',
    risks: 'Can move unpredictably; associated weather changes; weakening without warning',
    description:
      'When two air masses flow toward each other — such as a sea breeze meeting inland air — neither can go sideways. The air is forced upward along the boundary. This creates a wide band of gentle lift that can stretch for tens of kilometers. Skilled pilots use convergence lines to cover huge distances without circling.',
  },
];

const SVG_W = 500;
const SVG_H = 280;

export default function SoaringFundamentals({ onComplete }: SoaringFundamentalsProps) {
  const [explored, setExplored] = useState<Set<string>>(new Set());
  const [activeLift, setActiveLift] = useState<string | null>(null);
  const [quizReady, setQuizReady] = useState(false);

  const handleExplore = useCallback(
    (id: string) => {
      setActiveLift(id);
      setExplored((prev) => {
        const next = new Set(prev);
        next.add(id);
        if (next.size === 3 && !quizReady) {
          setQuizReady(true);
        }
        return next;
      });
    },
    [quizReady],
  );

  const activeLiftData = LIFT_TYPES.find((l) => l.id === activeLift);

  // ---- Ridge lift animation arrows ----
  const ridgeArrows = (active: boolean) => (
    <g opacity={active ? 1 : 0.25}>
      {/* Slope */}
      <polygon
        points="60,250 160,150 180,250"
        fill="#2a3020"
        stroke="var(--mt-border)"
        strokeWidth={1}
      />
      {/* Wind arrows hitting slope */}
      {[180, 200, 220].map((y, i) => (
        <motion.g
          key={`wind-${i}`}
          initial={false}
          animate={
            active
              ? { x: [0, 20, 20], y: [0, 0, -30], opacity: [1, 1, 0.3] }
              : { x: 0, y: 0, opacity: 0.4 }
          }
          transition={
            active
              ? { duration: 2, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }
              : { duration: 0.3 }
          }
        >
          <line
            x1={20}
            y1={y}
            x2={60}
            y2={y}
            stroke="var(--mt-flying)"
            strokeWidth={1.5}
            markerEnd="url(#arrowFlying)"
          />
        </motion.g>
      ))}
      {/* Upward deflected arrows */}
      {active &&
        [0, 1, 2].map((i) => (
          <motion.line
            key={`up-${i}`}
            x1={120 + i * 15}
            y1={200 - i * 15}
            x2={120 + i * 15}
            y2={160 - i * 15}
            stroke="var(--mt-flying)"
            strokeWidth={1.5}
            strokeDasharray="4,3"
            markerEnd="url(#arrowFlying)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      {/* Label */}
      <text
        x={110}
        y={270}
        textAnchor="middle"
        fill={explored.has('ridge') ? 'var(--mt-flying)' : 'var(--mt-muted)'}
        fontSize={10}
        fontFamily="var(--font-mono)"
      >
        RIDGE
      </text>
    </g>
  );

  // ---- Thermal lift animation ----
  const thermalBubbles = (active: boolean) => (
    <g opacity={active ? 1 : 0.25}>
      {/* Dark ground surface */}
      <rect x={200} y={240} width={100} height={10} fill="#3a2a1a" rx={2} />
      <text
        x={250}
        y={258}
        textAnchor="middle"
        fill="var(--mt-muted)"
        fontSize={7}
        fontFamily="var(--font-mono)"
      >
        dark surface
      </text>
      {/* Rising bubbles */}
      {active &&
        [0, 1, 2].map((i) => (
          <motion.circle
            key={`bubble-${i}`}
            cx={240 + i * 15}
            cy={230}
            r={6 + i * 2}
            fill="none"
            stroke="var(--mt-flying)"
            strokeWidth={1}
            strokeDasharray="3,2"
            initial={{ cy: 230, opacity: 0 }}
            animate={{ cy: [230, 130, 80], opacity: [0, 0.8, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
          />
        ))}
      {/* Cumulus cloud at top */}
      {active && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <ellipse cx={250} cy={70} rx={30} ry={12} fill="rgba(200,210,220,0.3)" />
          <ellipse cx={235} cy={65} rx={18} ry={10} fill="rgba(200,210,220,0.25)" />
          <ellipse cx={265} cy={68} rx={20} ry={9} fill="rgba(200,210,220,0.25)" />
        </motion.g>
      )}
      {/* Label */}
      <text
        x={250}
        y={270}
        textAnchor="middle"
        fill={explored.has('thermal') ? 'var(--mt-flying)' : 'var(--mt-muted)'}
        fontSize={10}
        fontFamily="var(--font-mono)"
      >
        THERMAL
      </text>
    </g>
  );

  // ---- Convergence lift animation ----
  const convergenceZone = (active: boolean) => (
    <g opacity={active ? 1 : 0.25}>
      {/* Two opposing air masses */}
      {active && (
        <>
          {/* Left arrows */}
          {[170, 190, 210, 230].map((y, i) => (
            <motion.line
              key={`conv-l-${i}`}
              x1={340}
              y1={y}
              x2={390}
              y2={y}
              stroke="#7BA7CC"
              strokeWidth={1.5}
              markerEnd="url(#arrowBlue)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0.8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
          {/* Right arrows */}
          {[170, 190, 210, 230].map((y, i) => (
            <motion.line
              key={`conv-r-${i}`}
              x1={460}
              y1={y}
              x2={410}
              y2={y}
              stroke="#CC8866"
              strokeWidth={1.5}
              markerEnd="url(#arrowOrange)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0.8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 + 0.1 }}
            />
          ))}
          {/* Upward lift band */}
          <motion.rect
            x={392}
            y={80}
            width={16}
            height={170}
            rx={8}
            fill="var(--mt-flying)"
            opacity={0.15}
            animate={{ opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          {[130, 160, 190, 220].map((y, i) => (
            <motion.line
              key={`conv-up-${i}`}
              x1={400}
              y1={y}
              x2={400}
              y2={y - 30}
              stroke="var(--mt-flying)"
              strokeWidth={1.5}
              strokeDasharray="3,3"
              markerEnd="url(#arrowFlying)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </>
      )}
      {/* Labels */}
      <text
        x={365}
        y={250}
        textAnchor="middle"
        fill="#7BA7CC"
        fontSize={7}
        fontFamily="var(--font-mono)"
        opacity={active ? 0.7 : 0.3}
      >
        sea breeze
      </text>
      <text
        x={435}
        y={250}
        textAnchor="middle"
        fill="#CC8866"
        fontSize={7}
        fontFamily="var(--font-mono)"
        opacity={active ? 0.7 : 0.3}
      >
        inland air
      </text>
      <text
        x={400}
        y={270}
        textAnchor="middle"
        fill={explored.has('convergence') ? 'var(--mt-flying)' : 'var(--mt-muted)'}
        fontSize={10}
        fontFamily="var(--font-mono)"
      >
        CONVERGENCE
      </text>
    </g>
  );

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <p
        style={{
          color: 'var(--mt-bright)',
          lineHeight: 1.7,
          marginBottom: '0.5rem',
        }}
      >
        Soaring flight depends on finding air that rises faster than you descend. There are three
        primary sources of usable lift. Click each zone below to explore.
      </p>
      <p
        style={{
          color: 'var(--mt-muted)',
          lineHeight: 1.7,
          marginBottom: '1.5rem',
          fontSize: 'var(--text-sm)',
        }}
      >
        Explore all three types to unlock the quiz.
      </p>

      {/* Progress indicator */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}
      >
        {LIFT_TYPES.map((lt) => (
          <div
            key={lt.id}
            style={{
              flex: 1,
              height: 3,
              background: explored.has(lt.id) ? 'var(--mt-flying)' : 'var(--mt-border)',
              transition: 'background 0.4s ease',
            }}
          />
        ))}
      </div>

      <div className="mt-module-split">
        <div>
          {/* SVG cross-section */}
          <div
            style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '1rem',
              overflow: 'hidden',
            }}
          >
            <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: 'block' }}>
              <defs>
                <marker
                  id="arrowFlying"
                  markerWidth={6}
                  markerHeight={4}
                  refX={5}
                  refY={2}
                  orient="auto"
                >
                  <polygon points="0,0 6,2 0,4" fill="var(--mt-flying)" />
                </marker>
                <marker
                  id="arrowBlue"
                  markerWidth={6}
                  markerHeight={4}
                  refX={5}
                  refY={2}
                  orient="auto"
                >
                  <polygon points="0,0 6,2 0,4" fill="#7BA7CC" />
                </marker>
                <marker
                  id="arrowOrange"
                  markerWidth={6}
                  markerHeight={4}
                  refX={1}
                  refY={2}
                  orient="auto"
                >
                  <polygon points="6,0 0,2 6,4" fill="#CC8866" />
                </marker>
                <linearGradient id="skyBg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0a1628" />
                  <stop offset="100%" stopColor="#1a2a3a" />
                </linearGradient>
              </defs>

              {/* Sky background */}
              <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="url(#skyBg)" rx={4} />

              {/* Ground line */}
              <line
                x1={0}
                y1={250}
                x2={SVG_W}
                y2={250}
                stroke="var(--mt-border)"
                strokeWidth={1}
              />

              {/* Clickable zones */}
              {/* Ridge zone */}
              <rect
                x={10}
                y={60}
                width={170}
                height={200}
                fill="transparent"
                cursor="pointer"
                onClick={() => handleExplore('ridge')}
              />
              {ridgeArrows(activeLift === 'ridge')}

              {/* Thermal zone */}
              <rect
                x={190}
                y={60}
                width={120}
                height={200}
                fill="transparent"
                cursor="pointer"
                onClick={() => handleExplore('thermal')}
              />
              {thermalBubbles(activeLift === 'thermal')}

              {/* Convergence zone */}
              <rect
                x={320}
                y={60}
                width={170}
                height={200}
                fill="transparent"
                cursor="pointer"
                onClick={() => handleExplore('convergence')}
              />
              {convergenceZone(activeLift === 'convergence')}
            </svg>
          </div>
        </div>
        <div>
          {/* Info card for active lift type */}
          <AnimatePresence mode="wait">
            {activeLiftData && (
              <motion.div
                key={activeLiftData.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                style={{
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-border)',
                  borderTop: '2px solid var(--mt-flying)',
                  borderRadius: 8,
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'var(--text-lg)',
                    color: 'var(--mt-flying)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    marginBottom: '0.75rem',
                  }}
                >
                  {activeLiftData.name}
                </h3>
                <p
                  style={{
                    color: 'var(--mt-bright)',
                    lineHeight: 1.7,
                    fontSize: 'var(--text-sm)',
                    marginBottom: '1rem',
                  }}
                >
                  {activeLiftData.description}
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.75rem',
                  }}
                >
                  {[
                    { label: 'WHEN', value: activeLiftData.when },
                    { label: 'WHERE', value: activeLiftData.where },
                    { label: 'STRENGTH', value: activeLiftData.strength },
                    { label: 'RISKS', value: activeLiftData.risks },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        background: 'var(--mt-void)',
                        border: '1px solid var(--mt-border)',
                        borderRadius: 6,
                        padding: '0.625rem',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--mt-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '0.25rem',
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--mt-bright)',
                          lineHeight: 1.5,
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quiz */}
          {quizReady && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <QuizBlock
                question="Which type of lift is most commonly used for cross-country flights?"
                options={[
                  {
                    text: 'Ridge lift — it is the most predictable and always available near slopes',
                  },
                  {
                    text: 'Thermal lift — rising columns of warm air allow pilots to gain altitude repeatedly across the landscape',
                    correct: true,
                  },
                  {
                    text: 'Convergence lift — wide bands of lift cover the most distance',
                  },
                ]}
                explanation="Thermals are the primary engine of cross-country soaring. While ridge lift is reliable, it is confined to the ridge. Convergence lift is powerful but less common. Thermals form wherever the sun heats the ground, allowing pilots to climb, glide to the next thermal, and repeat — covering hundreds of kilometers in a single flight."
                onCorrect={onComplete}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
