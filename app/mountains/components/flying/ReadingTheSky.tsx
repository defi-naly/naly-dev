'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizBlock from '../QuizBlock';

interface ReadingTheSkyProps {
  onComplete: () => void;
}

interface SkyScene {
  id: number;
  title: string;
  correctAnswer: number;
  correctLabel: string;
  explanation: string;
  options: string[];
  render: () => React.ReactNode;
}

const SVG_W = 420;
const SVG_H = 220;

function CumulusCloud({ cx, cy, scale = 1, opacity = 0.6 }: { cx: number; cy: number; scale?: number; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <ellipse cx={cx} cy={cy} rx={28 * scale} ry={14 * scale} fill="rgba(210,215,225,0.5)" />
      <ellipse cx={cx - 15 * scale} cy={cy - 8 * scale} rx={18 * scale} ry={12 * scale} fill="rgba(215,220,230,0.45)" />
      <ellipse cx={cx + 12 * scale} cy={cy - 6 * scale} rx={22 * scale} ry={13 * scale} fill="rgba(215,220,230,0.45)" />
      <ellipse cx={cx + 5 * scale} cy={cy - 14 * scale} rx={16 * scale} ry={10 * scale} fill="rgba(220,225,235,0.4)" />
    </g>
  );
}

const SKY_SCENES: SkyScene[] = [
  {
    id: 1,
    title: 'Scene 1',
    correctAnswer: 0,
    correctLabel: 'Active thermals below',
    explanation: 'Well-formed cumulus with flat bases indicate active thermals. The flat base marks the Lifted Condensation Level where rising air cools to its dew point. These are the clouds you want to fly toward.',
    options: ['Active thermals below', 'Storm approaching', 'Stable air, no lift'],
    render: () => (
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a3a6a" />
            <stop offset="100%" stopColor="#3a6a9a" />
          </linearGradient>
        </defs>
        <rect width={SVG_W} height={SVG_H} fill="url(#sky1)" rx={6} />
        {/* Well-formed cumulus with distinct flat bases */}
        <CumulusCloud cx={100} cy={90} scale={1.3} opacity={0.7} />
        <line x1={62} y1={104} x2={138} y2={104} stroke="rgba(200,200,220,0.3)" strokeWidth={1} />
        <CumulusCloud cx={250} cy={80} scale={1.5} opacity={0.75} />
        <line x1={204} y1={97} x2={296} y2={97} stroke="rgba(200,200,220,0.3)" strokeWidth={1} />
        <CumulusCloud cx={370} cy={95} scale={1.1} opacity={0.65} />
        <line x1={335} y1={109} x2={405} y2={109} stroke="rgba(200,200,220,0.3)" strokeWidth={1} />
        {/* Ground */}
        <rect x={0} y={190} width={SVG_W} height={30} fill="#2a3a20" rx={0} />
        <text x={SVG_W / 2} y={210} textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">flat cloud bases visible</text>
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Scene 2',
    correctAnswer: 1,
    correctLabel: 'Dying thermals, lift ending',
    explanation: 'Wispy, dissolving cumulus with ragged edges indicate that thermals are weakening. The clouds are evaporating because the air feeding them has stopped rising. Time to plan your landing or find a new source of lift.',
    options: ['Strong thermals, climb now', 'Dying thermals, lift ending', 'Convergence zone nearby'],
    render: () => (
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a4a7a" />
            <stop offset="100%" stopColor="#5a8aaa" />
          </linearGradient>
        </defs>
        <rect width={SVG_W} height={SVG_H} fill="url(#sky2)" rx={6} />
        {/* Wispy dissolving clouds */}
        {[80, 200, 320].map((x, i) => (
          <g key={i} opacity={0.35 + i * 0.05}>
            <ellipse cx={x} cy={90 + i * 10} rx={25 + i * 5} ry={6} fill="rgba(220,225,235,0.25)" />
            <ellipse cx={x + 15} cy={85 + i * 10} rx={15} ry={4} fill="rgba(220,225,235,0.15)" />
            <ellipse cx={x - 20} cy={92 + i * 10} rx={12} ry={3} fill="rgba(220,225,235,0.12)" />
            {/* Wispy trailing edges */}
            <line x1={x + 30} y1={90 + i * 10} x2={x + 55} y2={93 + i * 10} stroke="rgba(220,225,235,0.15)" strokeWidth={2} strokeLinecap="round" />
          </g>
        ))}
        <rect x={0} y={190} width={SVG_W} height={30} fill="#2a3a20" />
        <text x={SVG_W / 2} y={210} textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">ragged, dissolving edges</text>
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Scene 3',
    correctAnswer: 2,
    correctLabel: 'Strong lift, possible overdevelopment',
    explanation: 'A cumulus with a very dark, flat base signals strong lift underneath, but warns of possible overdevelopment into a cumulonimbus (thunderstorm). The darkness comes from the cloud\'s depth blocking sunlight. Approach with caution.',
    options: ['Light lift, safe conditions', 'Rain imminent, land immediately', 'Strong lift, possible overdevelopment'],
    render: () => (
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="sky3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a2a4a" />
            <stop offset="100%" stopColor="#3a5a7a" />
          </linearGradient>
        </defs>
        <rect width={SVG_W} height={SVG_H} fill="url(#sky3)" rx={6} />
        {/* Large cloud with dark base */}
        <g>
          {/* Bright tops */}
          <ellipse cx={210} cy={40} rx={60} ry={30} fill="rgba(220,225,235,0.5)" />
          <ellipse cx={180} cy={50} rx={45} ry={25} fill="rgba(200,210,225,0.45)" />
          <ellipse cx={245} cy={48} rx={50} ry={28} fill="rgba(200,210,225,0.45)" />
          <ellipse cx={210} cy={25} rx={35} ry={20} fill="rgba(230,235,245,0.4)" />
          {/* Dark base */}
          <rect x={140} y={80} width={140} height={20} rx={4} fill="rgba(40,45,60,0.7)" />
          <rect x={150} y={85} width={120} height={12} rx={3} fill="rgba(30,35,50,0.6)" />
        </g>
        {/* Smaller normal cumulus for contrast */}
        <CumulusCloud cx={60} cy={100} scale={0.8} opacity={0.4} />
        <CumulusCloud cx={380} cy={95} scale={0.7} opacity={0.35} />
        <rect x={0} y={190} width={SVG_W} height={30} fill="#2a3a20" />
        <text x={SVG_W / 2} y={210} textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">dark base, towering vertical development</text>
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Scene 4',
    correctAnswer: 0,
    correctLabel: 'Strong sink area, avoid',
    explanation: 'A "blue hole" — a gap of clear blue sky surrounded by cumulus — indicates a zone of sinking air. The descending air suppresses cloud formation. Flying into a blue hole means encountering strong sink with no lift. Experienced pilots route around them.',
    options: ['Strong sink area, avoid', 'Clear air thermal, climb here', 'Wind shear zone'],
    render: () => (
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="sky4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a3a6a" />
            <stop offset="100%" stopColor="#3a6a9a" />
          </linearGradient>
        </defs>
        <rect width={SVG_W} height={SVG_H} fill="url(#sky4)" rx={6} />
        {/* Surrounding cumulus */}
        <CumulusCloud cx={50} cy={80} scale={1.2} opacity={0.7} />
        <CumulusCloud cx={130} cy={75} scale={1.0} opacity={0.65} />
        <CumulusCloud cx={320} cy={78} scale={1.3} opacity={0.7} />
        <CumulusCloud cx={400} cy={85} scale={1.0} opacity={0.6} />
        <CumulusCloud cx={60} cy={120} scale={0.9} opacity={0.5} />
        <CumulusCloud cx={370} cy={115} scale={1.1} opacity={0.55} />
        {/* Blue hole in center — just blue sky, highlighted */}
        <rect x={170} y={55} width={100} height={100} fill="transparent" stroke="rgba(100,160,220,0.2)" strokeWidth={1} strokeDasharray="4,4" rx={6} />
        {/* Downward arrows in the hole */}
        {[200, 220, 240].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={75 + i * 5} x2={x} y2={130 + i * 5} stroke="rgba(100,160,220,0.3)" strokeWidth={1} strokeDasharray="3,3" />
            <polygon points={`${x - 3},${125 + i * 5} ${x + 3},${125 + i * 5} ${x},${132 + i * 5}`} fill="rgba(100,160,220,0.3)" />
          </g>
        ))}
        <rect x={0} y={190} width={SVG_W} height={30} fill="#2a3a20" />
        <text x={SVG_W / 2} y={210} textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">blue hole surrounded by cumulus</text>
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Scene 5',
    correctAnswer: 1,
    correctLabel: 'Strong thermal nearby at surface',
    explanation: 'Dust devils are visible evidence of strong thermals forming at the surface. The rotating column of dust marks where a thermal is detaching from the ground. A thermal strong enough to create a dust devil typically offers powerful lift — but approach at altitude, not near the surface.',
    options: ['Dangerous wind shear, stay away', 'Strong thermal nearby at surface', 'Downdraft forming'],
    render: () => (
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="sky5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a4a6a" />
            <stop offset="100%" stopColor="#6a8aaa" />
          </linearGradient>
        </defs>
        <rect width={SVG_W} height={SVG_H} fill="url(#sky5)" rx={6} />
        {/* Ground */}
        <rect x={0} y={170} width={SVG_W} height={50} fill="#8a7a5a" />
        {/* Dust devil */}
        <g>
          {/* Spiral column */}
          <path
            d="M 210,170 Q 205,140 215,120 Q 225,100 208,80 Q 200,65 215,50"
            fill="none"
            stroke="rgba(180,160,120,0.5)"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <path
            d="M 215,170 Q 220,145 210,125 Q 200,105 218,85 Q 228,70 212,55"
            fill="none"
            stroke="rgba(180,160,120,0.35)"
            strokeWidth={2}
            strokeLinecap="round"
          />
          {/* Dust particles at base */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <circle
              key={i}
              cx={200 + Math.cos(i * 1.1) * (10 + i * 3)}
              cy={165 - i * 4}
              r={1.5 - i * 0.15}
              fill="rgba(180,160,120,0.5)"
            />
          ))}
          {/* Wider dust at base */}
          <ellipse cx={212} cy={172} rx={20} ry={5} fill="rgba(180,160,120,0.3)" />
        </g>
        {/* Clear sky above */}
        <CumulusCloud cx={80} cy={60} scale={0.7} opacity={0.3} />
        <CumulusCloud cx={370} cy={55} scale={0.8} opacity={0.35} />
        <text x={SVG_W / 2} y={198} textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">rotating dust column from surface</text>
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Scene 6',
    correctAnswer: 2,
    correctLabel: 'Thermal marked by wildlife',
    explanation: 'Soaring birds (hawks, eagles, vultures) circle in thermals to gain altitude without flapping. A tight, rising circle of birds is one of the most reliable visual indicators of a thermal. Pilots call this "following the birds."',
    options: ['Calm air, no significant weather', 'Predator activity, unrelated to lift', 'Thermal marked by wildlife'],
    render: () => (
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="sky6" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a3a6a" />
            <stop offset="100%" stopColor="#4a7aaa" />
          </linearGradient>
        </defs>
        <rect width={SVG_W} height={SVG_H} fill="url(#sky6)" rx={6} />
        {/* Birds circling */}
        {[0, 1, 2, 3, 4].map(i => {
          const angle = (i / 5) * Math.PI * 2;
          const r = 25 + i * 3;
          const cx = 210 + Math.cos(angle) * r;
          const cy = 95 + Math.sin(angle) * (r * 0.5) - i * 6;
          return (
            <g key={i}>
              {/* Simple bird shape */}
              <path
                d={`M ${cx - 6},${cy} Q ${cx - 3},${cy - 3} ${cx},${cy - 1} Q ${cx + 3},${cy - 3} ${cx + 6},${cy}`}
                fill="none"
                stroke="rgba(40,40,50,0.8)"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            </g>
          );
        })}
        {/* Dotted circle to show circling pattern */}
        <circle cx={210} cy={90} r={35} fill="none" stroke="rgba(232,168,124,0.15)" strokeWidth={1} strokeDasharray="4,4" />
        {/* Subtle cumulus above */}
        <CumulusCloud cx={210} cy={40} scale={1.0} opacity={0.35} />
        <rect x={0} y={190} width={SVG_W} height={30} fill="#2a3a20" />
        <text x={SVG_W / 2} y={210} textAnchor="middle" fill="var(--mt-muted)" fontSize={8} fontFamily="var(--font-mono)">birds circling in tight formation</text>
      </svg>
    ),
  },
];

export default function ReadingTheSky({ onComplete }: ReadingTheSkyProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(SKY_SCENES.length).fill(null));
  const [revealed, setRevealed] = useState<boolean[]>(Array(SKY_SCENES.length).fill(false));
  const [allDone, setAllDone] = useState(false);

  const scene = SKY_SCENES[currentScene];
  const correctCount = answers.reduce(
    (sum, a, i) => sum + (a !== null && a === SKY_SCENES[i].correctAnswer ? 1 : 0),
    0,
  );
  const answeredCount = answers.filter((a) => a !== null).length;

  const handleAnswer = (optIndex: number) => {
    if (revealed[currentScene]) return;
    const next = [...answers];
    next[currentScene] = optIndex;
    setAnswers(next);

    const nextRevealed = [...revealed];
    nextRevealed[currentScene] = true;
    setRevealed(nextRevealed);

    // Check if all scenes answered
    const totalAnswered = next.filter((a) => a !== null).length;
    if (totalAnswered === SKY_SCENES.length) {
      setAllDone(true);
    }
  };

  const handleNext = () => {
    if (currentScene < SKY_SCENES.length - 1) {
      setCurrentScene(currentScene + 1);
    }
  };

  const handlePrev = () => {
    if (currentScene > 0) {
      setCurrentScene(currentScene - 1);
    }
  };

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <p style={{ color: 'var(--mt-bright)', lineHeight: 1.7, marginBottom: '0.5rem' }}>
        The sky is a weather map. Every cloud shape, every shadow, every gap tells you where lift
        lives and where it has died. Identify what each sky scene is telling you.
      </p>

      {/* Progress */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--mt-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {answeredCount}/{SKY_SCENES.length} answered
        </div>
        <div style={{ flex: 1, display: 'flex', gap: 3 }}>
          {SKY_SCENES.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 3,
                background:
                  answers[i] !== null
                    ? answers[i] === SKY_SCENES[i].correctAnswer
                      ? '#4ADE80'
                      : 'var(--mt-danger)'
                    : 'var(--mt-border)',
                transition: 'background 0.3s ease',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentScene(i)}
            />
          ))}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: correctCount === answeredCount && answeredCount > 0 ? '#4ADE80' : 'var(--mt-muted)',
          }}
        >
          {correctCount} correct
        </div>
      </div>

      {/* Scene display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          {/* Scene header */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--mt-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '0.5rem',
            }}
          >
            Scene {currentScene + 1} of {SKY_SCENES.length}
          </div>

          <div className="mt-module-split">
            <div>
              {/* SVG illustration */}
              <div
                style={{
                  background: 'var(--mt-surface)',
                  border: '1px solid var(--mt-border)',
                  borderRadius: 8,
                  padding: '0.75rem',
                  overflow: 'hidden',
                }}
              >
                {scene.render()}
              </div>
            </div>
            <div>
              {/* Options */}
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'var(--text-base)',
                  marginBottom: '0.75rem',
                  color: 'var(--mt-bright)',
                }}
              >
                What does this sky tell you?
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {scene.options.map((opt, i) => {
                  const isRevealed = revealed[currentScene];
                  const isSelected = answers[currentScene] === i;
                  const isCorrect = i === scene.correctAnswer;
                  let bg = 'rgba(255,255,255,0.02)';
                  let borderColor = 'var(--mt-border)';
                  if (isRevealed && isSelected && isCorrect) {
                    bg = 'rgba(74, 222, 128, 0.1)';
                    borderColor = '#4ADE80';
                  } else if (isRevealed && isSelected && !isCorrect) {
                    bg = 'rgba(204, 68, 68, 0.1)';
                    borderColor = 'var(--mt-danger)';
                  } else if (isRevealed && isCorrect) {
                    bg = 'rgba(74, 222, 128, 0.06)';
                    borderColor = '#4ADE80';
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      style={{
                        padding: '0.75rem 1rem',
                        border: `1px solid ${borderColor}`,
                        background: bg,
                        cursor: isRevealed ? 'default' : 'pointer',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        textAlign: 'left',
                        color: 'var(--mt-bright)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {revealed[currentScene] && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderTop: '1px solid var(--mt-border)',
                    color: 'var(--mt-muted)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: 1.7,
                  }}
                >
                  {scene.explanation}
                </motion.div>
              )}

              {/* Navigation */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '1rem',
                  gap: '0.75rem',
                }}
              >
                <button
                  onClick={handlePrev}
                  disabled={currentScene === 0}
                  style={{
                    padding: '0.5rem 1.25rem',
                    background: 'transparent',
                    border: '1px solid var(--mt-border)',
                    color: currentScene === 0 ? 'var(--mt-border)' : 'var(--mt-muted)',
                    cursor: currentScene === 0 ? 'not-allowed' : 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentScene === SKY_SCENES.length - 1}
                  style={{
                    padding: '0.5rem 1.25rem',
                    background: 'transparent',
                    border: '1px solid var(--mt-border)',
                    color:
                      currentScene === SKY_SCENES.length - 1 ? 'var(--mt-border)' : 'var(--mt-muted)',
                    cursor: currentScene === SKY_SCENES.length - 1 ? 'not-allowed' : 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Final quiz after all scenes */}
      {allDone && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{ marginTop: '2rem' }}
        >
          <div
            style={{
              background: 'var(--mt-surface)',
              border: '1px solid var(--mt-border)',
              borderRadius: 8,
              padding: '1rem',
              marginBottom: '1.5rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                color: correctCount >= 5 ? '#4ADE80' : 'var(--mt-flying)',
              }}
            >
              Score: {correctCount}/{SKY_SCENES.length}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--mt-muted)',
                marginTop: '0.25rem',
              }}
            >
              {correctCount === 6
                ? 'Perfect. You can read the sky.'
                : correctCount >= 4
                  ? 'Good sky awareness. Review the scenes you missed.'
                  : 'Keep studying. The sky always has something to tell you.'}
            </div>
          </div>

          <QuizBlock
            question="What does a cumulus cloud with a very dark, flat base indicate?"
            options={[
              { text: 'The cloud is dissolving and thermals are ending' },
              { text: 'Light rain is imminent but no strong lift' },
              {
                text: 'Strong lift beneath the cloud, but risk of overdevelopment into a thunderstorm',
                correct: true,
              },
              { text: 'A convergence zone has formed above the cloud' },
            ]}
            explanation="A dark base means the cloud has significant vertical depth — sunlight cannot penetrate. This depth comes from powerful updrafts feeding moisture into the cloud. While the lift underneath is strong, the same energy can push the cloud into cumulonimbus territory, producing thunderstorms, rain, and dangerous turbulence."
            onCorrect={onComplete}
          />
        </motion.div>
      )}
    </div>
  );
}
