'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, TrendingDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import AnimatedNumber from '../shared/AnimatedNumber';

interface InflationPersonalProps {
  onComplete: () => void;
}

// CPI data (approximate annual averages, base 1982-84=100)
// Source: Bureau of Labor Statistics
const CPI_DATA: Record<number, number> = {
  1950: 24.1, 1955: 26.8, 1960: 29.6, 1965: 31.5, 1970: 38.8,
  1975: 53.8, 1980: 82.4, 1985: 107.6, 1990: 130.7, 1995: 152.4,
  2000: 172.2, 2005: 195.3, 2010: 218.1, 2015: 237.0, 2020: 258.8,
  2024: 314.0, // Estimated
};

// Interpolate CPI for any year
const getCPI = (year: number): number => {
  const years = Object.keys(CPI_DATA).map(Number).sort((a, b) => a - b);

  if (year <= years[0]) return CPI_DATA[years[0]];
  if (year >= years[years.length - 1]) return CPI_DATA[years[years.length - 1]];

  let lower = years[0];
  let upper = years[years.length - 1];

  for (const y of years) {
    if (y <= year) lower = y;
    if (y >= year && upper === years[years.length - 1]) upper = y;
  }

  if (lower === upper) return CPI_DATA[lower];

  const ratio = (year - lower) / (upper - lower);
  return CPI_DATA[lower] + ratio * (CPI_DATA[upper] - CPI_DATA[lower]);
};

const calculatePurchasingPower = (birthYear: number): number => {
  const birthCPI = getCPI(birthYear);
  const currentCPI = getCPI(2024);
  return (birthCPI / currentCPI) * 100;
};

type Phase = 'input' | 'reveal';

const BIRTH_YEARS = Array.from({ length: 75 }, (_, i) => 1950 + i);

export default function InflationPersonal({ onComplete }: InflationPersonalProps) {
  const [phase, setPhase] = useState<Phase>('input');
  const [birthYear, setBirthYear] = useState(1990);
  const [purchasingPower, setPurchasingPower] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleShowMe = () => {
    const pp = calculatePurchasingPower(birthYear);
    setPurchasingPower(pp);
    setPhase('reveal');
  };

  useEffect(() => {
    if (phase === 'reveal' && !isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        onComplete();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [phase, isComplete, onComplete]);

  const yearsLived = 2024 - birthYear;
  const decayPercent = 100 - purchasingPower;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-[450px]"
    >
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* PHASE 1: Input */}
          {phase === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-8"
            >
              <div>
                <p className="text-neutral-400 font-mono text-sm mb-2">
                  Let's make inflation personal.
                </p>
                <p className="text-neutral-500 font-mono text-xs">
                  When were you born?
                </p>
              </div>

              {/* Year Selector */}
              <div className="max-w-xs mx-auto">
                <div className="flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-neutral-500 flex-shrink-0" />
                  <select
                    value={birthYear}
                    onChange={(e) => setBirthYear(Number(e.target.value))}
                    className="flex-1 bg-neutral-900 border border-neutral-700 rounded px-4 py-3 font-mono text-lg text-white focus:border-amber-500 focus:outline-none"
                  >
                    {BIRTH_YEARS.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <motion.button
                onClick={handleShowMe}
                className="bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-6 py-3 rounded hover:bg-amber-400 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                SHOW ME
              </motion.button>
            </motion.div>
          )}

          {/* PHASE 2: Reveal */}
          {phase === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Title */}
              <div className="text-center">
                <p className="text-neutral-500 font-mono text-xs uppercase tracking-wider">
                  $100 in {birthYear}
                </p>
              </div>

              {/* Shrinking Bar Visualization */}
              <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-lg">
                {/* Starting value */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-500 font-mono text-xs">{birthYear}</span>
                    <span className="text-white font-mono text-xs">$100</span>
                  </div>
                  <div className="h-8 bg-emerald-500 rounded flex items-center justify-center">
                    <span className="text-zinc-900 font-mono text-sm font-bold">$100</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center my-4">
                  <div className="text-center">
                    <TrendingDown className="w-6 h-6 text-red-400 mx-auto" />
                    <p className="text-neutral-600 font-mono text-xs mt-1">
                      {yearsLived} years of "low" inflation
                    </p>
                  </div>
                </div>

                {/* Ending value */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-500 font-mono text-xs">2024</span>
                    <span className="text-red-400 font-mono text-xs">
                      ${Math.round(purchasingPower)}
                    </span>
                  </div>
                  <div className="h-8 bg-neutral-800 rounded overflow-hidden">
                    <motion.div
                      className="h-full bg-red-500 rounded flex items-center justify-center"
                      initial={{ width: '100%' }}
                      animate={{ width: `${purchasingPower}%` }}
                      transition={{ duration: 2, ease: 'easeOut' }}
                    >
                      {purchasingPower > 20 && (
                        <span className="text-zinc-900 font-mono text-sm font-bold">
                          $<AnimatedNumber value={purchasingPower} duration={2} decimals={0} />
                        </span>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Personal Message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center"
              >
                <p className="text-amber-500 font-mono text-sm font-medium">
                  You've lived through {Math.round(decayPercent)}% decay.
                </p>
                <p className="text-neutral-400 font-mono text-xs mt-2">
                  That's not a bug — it's the system working as designed.
                </p>
              </motion.div>

              {/* Link to full tool */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="text-center"
              >
                <Link
                  href="/tools/decay"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-neutral-500 hover:text-amber-500 font-mono text-xs transition-colors"
                >
                  Explore Full Tool
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
