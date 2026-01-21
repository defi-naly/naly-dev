'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingDown, ExternalLink } from 'lucide-react';
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
  2024: 314.0,
};

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

export default function InflationPersonal({ onComplete }: InflationPersonalProps) {
  const [phase, setPhase] = useState<Phase>('input');
  const [yearInput, setYearInput] = useState('');
  const [birthYear, setBirthYear] = useState(0);
  const [purchasingPower, setPurchasingPower] = useState(0);
  const [error, setError] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (phase === 'input' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase]);

  const handleShowMe = () => {
    const parsed = parseInt(yearInput);
    if (isNaN(parsed) || parsed < 1950 || parsed > 2010) {
      setError('Enter a year between 1950 and 2010');
      return;
    }
    setError('');
    setBirthYear(parsed);
    const pp = calculatePurchasingPower(parsed);
    setPurchasingPower(pp);
    setPhase('reveal');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleShowMe();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setYearInput(value);
    setError('');
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
      className="flex flex-col min-h-[400px]"
    >
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {phase === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-6"
            >
              <div>
                <p className="text-zinc-300 font-mono text-sm">
                  Let's make inflation personal.
                </p>
                <p className="text-zinc-500 font-mono text-sm mt-1">
                  What year were you born?
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={yearInput}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="1990"
                  className="w-32 text-center text-2xl font-mono bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:border-amber-500 focus:outline-none transition-colors"
                />
                <span className="text-xs font-mono text-zinc-600">
                  Type a year (1950-2010)
                </span>
                {error && (
                  <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-mono text-red-500"
                  >
                    {error}
                  </motion.span>
                )}
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

          {phase === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider">
                  $100 in {birthYear}
                </p>
              </div>

              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-zinc-500 font-mono text-xs">{birthYear}</span>
                    <span className="text-white font-mono text-xs">$100</span>
                  </div>
                  <div className="h-8 bg-emerald-500 rounded flex items-center justify-center">
                    <span className="text-zinc-900 font-mono text-sm font-bold">$100</span>
                  </div>
                </div>

                <div className="flex justify-center my-4">
                  <div className="text-center">
                    <TrendingDown className="w-6 h-6 text-red-400 mx-auto" />
                    <p className="text-zinc-600 font-mono text-xs mt-1">
                      {yearsLived} years of "low" inflation
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-zinc-500 font-mono text-xs">2024</span>
                    <span className="text-red-400 font-mono text-xs">
                      ${Math.round(purchasingPower)}
                    </span>
                  </div>
                  <div className="h-8 bg-zinc-800 rounded overflow-hidden">
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

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center"
              >
                <p className="text-amber-500 font-mono text-sm font-medium">
                  You've lived through {Math.round(decayPercent)}% decay.
                </p>
                <p className="text-zinc-400 font-mono text-xs mt-2">
                  That's not a bug — it's the system working as designed.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="text-center"
              >
                <Link
                  href="/tools/decay"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-zinc-500 hover:text-amber-500 font-mono text-xs transition-colors"
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
