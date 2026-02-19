'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import MotionReveal from './MotionReveal';

export interface CardData {
  offTitle: string;
  offResult: string;
  onTitle: string;
  onResult: string;
  stat: string;
}

const defaultCards: CardData[] = [
  {
    offTitle: 'Set a range. Price moved. Start over.',
    offResult:
      'Constant monitoring. Gas fees to reposition. Miss a move and you earn nothing.',
    onTitle: 'Deploy once. Ranges auto-adjust.',
    onResult:
      'The pool tracks the market. Your liquidity stays active — zero maintenance required.',
    stat: 'Fire & forget',
  },
  {
    offTitle: 'Your LP position is an NFT.',
    offResult:
      "Can't use it as collateral. Can't stake it. Trapped in one contract, one protocol.",
    onTitle: 'Standard ERC-20 LP tokens.',
    onResult:
      'Collateralize it. Stake it. Compose it across DeFi. Standard fungible ERC-20 tokens.',
    stat: 'Composable',
  },
  {
    offTitle: 'Bots front-run your fees.',
    offResult:
      'JIT liquidity extracts value from every large swap. You provide capital, they take profit.',
    onTitle: 'JIT attacks are uneconomical.',
    onResult:
      'Pool design makes sandwich attacks unprofitable. Your swap fees stay with you.',
    stat: 'MEV resistant',
  },
  {
    offTitle: 'Relies on external oracles.',
    offResult:
      'Oracle manipulation risk. Single point of failure. Trust assumptions you never verified.',
    onTitle: 'Fully on-chain. No oracles.',
    onResult:
      'Range calculations happen in the contract. No external feeds. No keepers. No trust.',
    stat: 'Trustless',
  },
];

const XIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface ProblemSolutionToggleProps {
  cards?: CardData[];
  offLabel?: string;
  onLabel?: string;
}

export default function ProblemSolutionToggle({
  cards = defaultCards,
  offLabel = 'Traditional CL',
  onLabel = 'reCLAMMs',
}: ProblemSolutionToggleProps) {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="judgment-section">
      <MotionReveal delay={0.1}>
        <div className="judgment-toggle-wrapper">
          <span
            className={`judgment-label ${!isOn ? 'active' : 'inactive'}`}
          >
            {offLabel}
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
          <span
            className={`judgment-label ${isOn ? 'active' : 'inactive'}`}
          >
            {onLabel}
          </span>
        </div>
      </MotionReveal>

      <div className="judgment-cards">
        {cards.map((card, i) => (
          <ToggleCard
            key={i}
            card={card}
            isOn={isOn}
            index={i}
            totalCards={cards.length}
          />
        ))}
      </div>
    </div>
  );
}

function ToggleCard({
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
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
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

  const rawMouse = useRef({ x: 0, y: 0 });
  const rafPending = useRef(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    rawMouse.current.x = e.clientX;
    rawMouse.current.y = e.clientY;
    if (rafPending.current) return;
    rafPending.current = true;
    requestAnimationFrame(() => {
      rafPending.current = false;
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: ((rawMouse.current.x - rect.left) / rect.width) * 100,
        y: ((rawMouse.current.y - rect.top) / rect.height) * 100,
      });
    });
  }, []);

  const transitionStyle = prefersReducedMotion
    ? { transitionDuration: '0ms' }
    : { transitionDelay: `${index * 80}ms` };

  const reverseDelayStyle = prefersReducedMotion
    ? { transitionDuration: '0ms' }
    : {
        transitionDelay: isOn
          ? `${index * 80}ms`
          : `${(totalCards - 1 - index) * 60}ms`,
      };

  return (
    <motion.div
      ref={cardRef}
      className={`judgment-card ${isOn ? 'judgment-card-on' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={transitionStyle}
    >
      {showSweep && (
        <div
          className="judgment-card-sweep"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(var(--accent-rgb),0.06) 40%, rgba(var(--accent-rgb),0.1) 50%, rgba(var(--accent-rgb),0.06) 60%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'sweep-upgrade 1.2s ease-out forwards',
          }}
        />
      )}

      {isOn && (
        <div
          className="judgment-card-glow"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(var(--accent-rgb),0.06), transparent 60%)`,
          }}
        />
      )}

      <div className="judgment-card-content">
        {/* Pain state */}
        <div
          className={`judgment-state judgment-state-pain ${
            !isOn
              ? 'judgment-state-active'
              : 'judgment-state-hidden-up'
          }`}
          style={reverseDelayStyle}
        >
          <div className="judgment-card-icon fail">
            <XIcon />
          </div>
          <h4 className="judgment-card-action fail">{card.offTitle}</h4>
          <p className="judgment-card-result fail">{card.offResult}</p>
        </div>

        {/* Solution state */}
        <div
          className={`judgment-state judgment-state-solution ${
            isOn
              ? 'judgment-state-active'
              : 'judgment-state-hidden-down'
          } ${isOn ? 'judgment-stat-shimmer' : ''}`}
          style={transitionStyle}
        >
          <div className="judgment-state-text">
            <div className="judgment-card-icon success">
              <CheckIcon />
            </div>
            <h4 className="judgment-card-action success">
              {card.onTitle}
            </h4>
            <p className="judgment-card-result success">
              {card.onResult}
            </p>
          </div>
          <div className="judgment-stat-container">
            <span className="judgment-stat-badge">{card.stat}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
