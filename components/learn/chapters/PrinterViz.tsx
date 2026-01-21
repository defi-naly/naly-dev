'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';

interface PrinterVizProps {
  onComplete: () => void;
}

const TARGET = 23_000_000_000_000; // $23 trillion
const YEARS_TO_COUNT = 729_000;

const timeData = [
  { amount: '$1 million', time: '12 days', width: 2 },
  { amount: '$1 billion', time: '32 years', width: 8 },
  { amount: '$1 trillion', time: '31,688 years', width: 40 },
  { amount: '$23 trillion', time: '729,000 years', width: 100 },
];

const accelerationData = [
  {
    label: 'First $1 trillion',
    period: '1944 — 1975',
    years: 31,
    width: 100,
    highlight: false,
  },
  {
    label: 'Second $1 trillion',
    period: '1975 — 1987',
    years: 12,
    width: 39,
    highlight: false,
  },
  {
    label: 'Third $1 trillion',
    period: '1987 — 1994',
    years: 7,
    width: 23,
    highlight: false,
  },
  {
    label: '$15T → $23T',
    period: '2020 — 2026',
    years: 6,
    width: 19,
    highlight: true,
    subtext: '+$8 trillion',
  },
];

// Screen 1: Money Counter
function MoneyCounter({ onReveal }: { onReveal: () => void }) {
  const [counting, setCounting] = useState(false);
  const [count, setCount] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (counting && !revealed) {
      intervalRef.current = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);

      const timeout = setTimeout(() => {
        setRevealed(true);
        setCounting(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        onReveal();
      }, 10000);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        clearTimeout(timeout);
      };
    }
  }, [counting, revealed, onReveal]);

  const handleSkip = () => {
    setRevealed(true);
    setCounting(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    onReveal();
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  const percentComplete = (count / TARGET) * 100;

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-12">
      <h2 className="text-xl md:text-2xl font-medium text-zinc-100 mb-2 text-center">
        How much is $23 trillion?
      </h2>
      <p className="text-zinc-500 text-sm mb-10 text-center">
        Let's count it. $1 per second. No breaks.
      </p>

      {/* Counter display */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-6 py-5 mb-6">
        <p className="text-2xl md:text-4xl font-mono text-amber-500 tracking-wider tabular-nums">
          ${formatNumber(count)}
        </p>
      </div>

      {/* Progress bar */}
      {counting && !revealed && (
        <div className="w-full max-w-sm mb-3">
          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-1000"
              style={{ width: `${Math.max(percentComplete, 0.0000001)}%` }}
            />
          </div>
          <p className="text-zinc-600 text-xs mt-2 text-center font-mono">
            {percentComplete.toFixed(10)}% complete
          </p>
        </div>
      )}

      {/* Elapsed time */}
      {counting && !revealed && (
        <p className="text-zinc-500 text-sm mb-3 font-mono">
          {count} seconds elapsed
        </p>
      )}

      {/* Start button */}
      {!counting && !revealed && (
        <motion.button
          onClick={() => setCounting(true)}
          className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-zinc-950 font-medium rounded-lg hover:bg-amber-400 transition"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play className="w-4 h-4" />
          START COUNTING
        </motion.button>
      )}

      {/* Time remaining (shown while counting) */}
      {counting && !revealed && (
        <div className="mt-6 text-center">
          <p className="text-zinc-500 text-xs">Time to count $23 trillion at this rate:</p>
          <p className="text-xl font-mono text-zinc-100 mt-1">
            {YEARS_TO_COUNT.toLocaleString()} years
          </p>
        </div>
      )}

      {/* Skip button */}
      {counting && !revealed && (
        <button
          onClick={handleSkip}
          className="mt-6 text-zinc-600 hover:text-zinc-400 text-xs transition"
        >
          Skip ahead →
        </button>
      )}

      {/* Revealed state */}
      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-4"
        >
          <p className="text-zinc-500 text-sm mb-2">Time to count $23 trillion:</p>
          <p className="text-2xl font-mono text-amber-500 font-bold">
            {YEARS_TO_COUNT.toLocaleString()} years
          </p>
          <p className="text-zinc-600 text-xs mt-2">Scroll to continue ↓</p>
        </motion.div>
      )}
    </div>
  );
}

// Screen 2: Time Reveal
function TimeReveal() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center px-4 py-12 max-w-lg mx-auto">
      <h2 className="text-lg md:text-xl font-medium text-zinc-100 mb-10 text-center">
        Counting at $1 per second
      </h2>

      <div className="space-y-6 mb-12">
        {timeData.map((item, index) => (
          <motion.div
            key={item.amount}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-zinc-400 text-sm">To count {item.amount}</span>
              <span className="text-zinc-100 font-mono text-sm">{item.time}</span>
            </div>
            <div className="h-2.5 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-amber-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${item.width}%` }}
                transition={{ delay: index * 0.15 + 0.2, duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-50px' }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="border-t border-zinc-800 pt-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-zinc-500 text-sm mb-3">
          Homo sapiens have existed for 300,000 years.
        </p>
        <p className="text-zinc-100 text-base mb-3">
          You'd need to count for more than{' '}
          <span className="text-amber-500 font-semibold">
            twice the entire history of humanity.
          </span>
        </p>
        <p className="text-zinc-600 text-sm">
          The Fed created this in 82 years.
        </p>
      </motion.div>
    </div>
  );
}

// Screen 3: Acceleration Chart
function AccelerationChart() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center px-4 py-12 max-w-lg mx-auto">
      <h2 className="text-lg md:text-xl font-medium text-zinc-100 mb-10 text-center">
        When did they print it?
      </h2>

      <div className="space-y-5 mb-12">
        {accelerationData.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12, duration: 0.4 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className="flex justify-between items-baseline mb-1.5">
              <div>
                <span
                  className={
                    item.highlight
                      ? 'text-amber-500 font-medium text-sm'
                      : 'text-zinc-400 text-sm'
                  }
                >
                  {item.label}
                </span>
                {item.subtext && (
                  <span className="text-zinc-600 text-xs ml-2">({item.subtext})</span>
                )}
              </div>
              <div className="text-right">
                <span className="text-zinc-600 text-xs mr-2">{item.period}</span>
                <span
                  className={`font-mono text-sm ${
                    item.highlight ? 'text-amber-500' : 'text-zinc-100'
                  }`}
                >
                  {item.years} yrs
                </span>
              </div>
            </div>
            <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  item.highlight ? 'bg-amber-500' : 'bg-zinc-600'
                }`}
                initial={{ width: 0 }}
                whileInView={{ width: `${item.width}%` }}
                transition={{ delay: index * 0.12 + 0.15, duration: 0.5, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-50px' }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="border-t border-zinc-800 pt-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-zinc-500 text-sm mb-1">
          The first trillion took <span className="text-zinc-100">31 years</span>.
        </p>
        <p className="text-lg text-zinc-100">
          The last 8 trillion took <span className="text-amber-500 font-semibold">6 years</span>.
        </p>
      </motion.div>
    </div>
  );
}

// Screen 4: Moon Stack (Scroll-driven)
function MoonStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const stackHeight = useTransform(scrollYProgress, [0.3, 0.7], ['5%', '95%']);
  const progressWidth = useTransform(scrollYProgress, [0.3, 0.7], ['0%', '100%']);

  return (
    <div ref={containerRef} className="min-h-[150vh] relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center px-4 py-12">
        <h2 className="text-lg md:text-xl font-medium text-zinc-100 mb-1 text-center">
          Still can't picture it?
        </h2>
        <p className="text-zinc-500 text-sm mb-8 text-center">
          Stack $23 trillion in $1 bills
        </p>

        {/* Moon visualization */}
        <div className="relative w-full max-w-[200px] h-64 mb-6">
          {/* Moon */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-3xl">
            🌙
          </div>

          {/* Moon line */}
          <div className="absolute top-10 left-0 right-0 border-t border-dashed border-zinc-700">
            <span className="absolute -top-3 right-0 text-[10px] text-zinc-600 font-mono">
              MOON
            </span>
          </div>

          {/* Stack container */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-48 flex items-end">
            <motion.div
              className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t"
              style={{ height: stackHeight }}
            />
          </div>

          {/* Earth */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl">
            🌍
          </div>
        </div>

        {/* Timeline */}
        <div className="w-full max-w-xs">
          <div className="flex justify-between text-xs mb-2">
            <div className="text-left">
              <p className="text-zinc-500">1944</p>
              <p className="text-zinc-400 font-mono">$150B</p>
              <p className="text-zinc-600 text-[10px]">London → NYC</p>
            </div>
            <div className="text-right">
              <p className="text-zinc-500">2026</p>
              <p className="text-amber-500 font-mono">$23T</p>
              <p className="text-amber-500/70 text-[10px]">3.3× to the Moon</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-amber-500 rounded-full"
              style={{ width: progressWidth }}
            />
          </div>
        </div>

        {/* Bottom text */}
        <motion.p
          className="mt-8 text-zinc-500 text-sm text-center max-w-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          That's not growth.
          <br />
          <span className="text-zinc-100">That's a different system entirely.</span>
        </motion.p>
      </div>
    </div>
  );
}

// Screen 5: Punchline
function Punchline({ onComplete }: { onComplete: () => void }) {
  const [hasTriggered, setHasTriggered] = useState(false);

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="text-zinc-400 text-base mb-2">
          Then governments discovered something amazing:
        </p>
        <p className="text-zinc-100 text-lg md:text-xl font-medium">
          If money is just paper,
          <br />
          you don't even need the gold.
        </p>
      </motion.div>

      <motion.div
        className="border-t border-zinc-800 pt-12 w-full max-w-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        onAnimationComplete={() => {
          if (!hasTriggered) {
            setHasTriggered(true);
            setTimeout(onComplete, 2000);
          }
        }}
        transition={{ delay: 0.3, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <motion.p
          className="text-6xl md:text-7xl font-mono font-bold text-amber-500 mb-3"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4, type: 'spring' }}
          viewport={{ once: true }}
        >
          40%
        </motion.p>
        <p className="text-zinc-400 text-sm">
          of all dollars in existence
          <br />
          were created since 2020.
        </p>
      </motion.div>

      <motion.div
        className="mt-12 grid grid-cols-2 gap-4 w-full max-w-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-center">
          <p className="text-zinc-500 text-[10px] font-mono mb-1">2008 CRISIS</p>
          <p className="text-blue-400 font-mono text-lg font-bold">+$3.5T</p>
          <p className="text-zinc-600 text-[10px]">QE1 + QE2 + QE3</p>
        </div>
        <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-center">
          <p className="text-zinc-500 text-[10px] font-mono mb-1">2020 COVID</p>
          <p className="text-red-400 font-mono text-lg font-bold">+$6.0T</p>
          <p className="text-zinc-600 text-[10px]">In just 2 years</p>
        </div>
      </motion.div>
    </div>
  );
}

// Main Component
export default function PrinterViz({ onComplete }: PrinterVizProps) {
  const [counterRevealed, setCounterRevealed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col"
    >
      {/* Screen 1: Counter */}
      <MoneyCounter onReveal={() => setCounterRevealed(true)} />

      {/* Only show remaining screens after counter is revealed */}
      {counterRevealed && (
        <>
          {/* Screen 2: Time Reveal */}
          <TimeReveal />

          {/* Screen 3: Acceleration */}
          <AccelerationChart />

          {/* Screen 4: Moon Stack */}
          <MoonStack />

          {/* Screen 5: Punchline */}
          <Punchline onComplete={onComplete} />
        </>
      )}
    </motion.div>
  );
}
