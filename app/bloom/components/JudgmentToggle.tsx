'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import MotionReveal from './MotionReveal';

interface CardData {
  offTitle: string;
  offResult: string;
  onTitle: string;
  onResult: string;
  stat: string;
}

const cards: CardData[] = [
  {
    offTitle: 'Gave every team AI tools',
    offResult: 'Faster output. Same bad decisions. More confident about them.',
    onTitle: 'Cut to 4 producers. Gave them everything.',
    onResult: 'Small team. Full leverage. No committees.',
    stat: '10x output/person',
  },
  {
    offTitle: 'Automated content creation',
    offResult: '10x the volume. Same revenue. Nobody noticed.',
    onTitle: 'Built products, not content.',
    onResult: 'Revenue-generating software. Not posts.',
    stat: '$120B+ facilitated',
  },
  {
    offTitle: 'Hired AI strategy consultants',
    offResult: '6 months of workshops. Nothing in production.',
    onTitle: 'One system-level intervention.',
    onResult: 'Changed the structure. Not the tools.',
    stat: 'Same stack, 5 products',
  },
  {
    offTitle: 'Built internal AI tools',
    offResult: 'Beautiful demos at the all-hands. Zero adoption by month 3.',
    onTitle: 'Judgment first. Speed second.',
    onResult: 'Every product shipped. Every product used.',
    stat: '5 live, 0 killed',
  },
];

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function JudgmentToggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="judgment-section">
      <MotionReveal>
        <h2 className="judgment-headline">
          The difference isn&apos;t speed. It&apos;s judgment.
        </h2>
      </MotionReveal>

      <MotionReveal delay={0.1}>
        <div className="judgment-toggle-wrapper">
          <span className={`judgment-label ${!isOn ? 'active' : 'inactive'}`}>
            AI Without Judgment
          </span>
          <button
            type="button"
            className={`judgment-switch ${isOn ? 'active' : ''}`}
            onClick={() => setIsOn(!isOn)}
            aria-checked={isOn}
            role="switch"
          >
            <motion.div
              className="judgment-switch-thumb"
              animate={{ left: isOn ? 31 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`judgment-label ${isOn ? 'active' : 'inactive'}`}>
            AI With Judgment
          </span>
        </div>
      </MotionReveal>

      <div className="judgment-cards">
        {cards.map((card, i) => (
          <JudgmentCard key={i} card={card} isOn={isOn} index={i} totalCards={cards.length} />
        ))}
      </div>
    </div>
  );
}

function JudgmentCard({
  card,
  isOn,
  index,
  totalCards,
}: {
  card: CardData;
  isOn: boolean;
  index: number;
  totalCards: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasSwept, setHasSwept] = useState(false);
  const [showSweep, setShowSweep] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isOn && !hasSwept && !prefersReducedMotion) {
      setShowSweep(true);
      setHasSwept(true);
      const timer = setTimeout(() => setShowSweep(false), 1400);
      return () => clearTimeout(timer);
    }
  }, [isOn, hasSwept, prefersReducedMotion]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const transitionStyle = prefersReducedMotion
    ? { transitionDuration: '0ms' }
    : { transitionDelay: `${index * 80}ms` };

  const reverseDelayStyle = prefersReducedMotion
    ? { transitionDuration: '0ms' }
    : { transitionDelay: isOn ? `${index * 80}ms` : `${(totalCards - 1 - index) * 60}ms` };

  return (
    <motion.div
      ref={cardRef}
      className={`judgment-card ${isOn ? 'judgment-card-on' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={transitionStyle}
    >
      {/* Sweep animation — fires once on first toggle */}
      {showSweep && (
        <div
          className="judgment-card-sweep"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 60%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'sweep-upgrade 1.2s ease-out forwards',
          }}
        />
      )}

      {/* Mouse glow — percentage-based, only when hovered + on */}
      {isOn && (
        <div
          className="judgment-card-glow"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.06), transparent 60%)`,
          }}
        />
      )}

      <div className="judgment-card-content">
        {/* Pain state — visible when OFF */}
        <div
          className={`judgment-state judgment-state-pain ${!isOn ? 'judgment-state-active' : 'judgment-state-hidden-up'}`}
          style={reverseDelayStyle}
        >
          <div className="judgment-card-icon fail">
            <XIcon />
          </div>
          <h4 className="judgment-card-action fail">{card.offTitle}</h4>
          <p className="judgment-card-result fail">{card.offResult}</p>
        </div>

        {/* Solution state — visible when ON */}
        <div
          className={`judgment-state judgment-state-solution ${isOn ? 'judgment-state-active' : 'judgment-state-hidden-down'} ${isOn ? 'judgment-stat-shimmer' : ''}`}
          style={transitionStyle}
        >
          <div className="judgment-state-text">
            <div className="judgment-card-icon success">
              <CheckIcon />
            </div>
            <h4 className="judgment-card-action success">{card.onTitle}</h4>
            <p className="judgment-card-result success">{card.onResult}</p>
          </div>
          <div className="judgment-stat-container">
            <span className="judgment-stat-badge">{card.stat}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
