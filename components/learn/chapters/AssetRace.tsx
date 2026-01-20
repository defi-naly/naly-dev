'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, Trophy } from 'lucide-react';
import Link from 'next/link';

interface AssetRaceProps {
  onComplete: () => void;
}

// Asset performance data (inflation-adjusted, 1974 = 100)
// Sources: S&P 500, Case-Shiller, Gold prices, CPI
interface Asset {
  name: string;
  color: string;
  finalValue: number;
  emoji: string;
}

const ASSETS: Asset[] = [
  { name: 'S&P 500', color: 'emerald', finalValue: 340, emoji: '📈' },
  { name: 'Housing', color: 'blue', finalValue: 180, emoji: '🏠' },
  { name: 'Gold', color: 'amber', finalValue: 100, emoji: '🥇' },
  { name: 'Cash', color: 'red', finalValue: 18, emoji: '💵' },
];

const START_YEAR = 1974;
const END_YEAR = 2024;
const ANIMATION_DURATION = 6000;

type Phase = 'setup' | 'racing' | 'reveal';

export default function AssetRace({ onComplete }: AssetRaceProps) {
  const [phase, setPhase] = useState<Phase>('setup');
  const [currentYear, setCurrentYear] = useState(START_YEAR);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleStart = () => {
    setPhase('racing');
  };

  // Animate the race
  useEffect(() => {
    if (phase !== 'racing') return;

    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / ANIMATION_DURATION, 1);

      // Eased progress
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);

      setProgress(easedProgress);
      setCurrentYear(Math.floor(START_YEAR + (END_YEAR - START_YEAR) * easedProgress));

      if (rawProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        setPhase('reveal');
      }
    };

    requestAnimationFrame(animate);
  }, [phase]);

  // Complete chapter after reveal
  useEffect(() => {
    if (phase === 'reveal' && !isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        onComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase, isComplete, onComplete]);

  // Calculate current value for each asset (exponential interpolation)
  const getCurrentValue = (asset: Asset): number => {
    const startValue = 100;
    const endValue = asset.finalValue;
    // Use exponential interpolation for more realistic growth curves
    return startValue * Math.pow(endValue / startValue, progress);
  };

  // Find max value for scaling
  const maxValue = Math.max(...ASSETS.map(a => getCurrentValue(a)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-[450px]"
    >
      {/* Header */}
      <div className="text-center mb-4">
        <p className="text-neutral-500 font-mono text-xs uppercase tracking-wider">
          Assets vs Cash (Inflation-Adjusted, 1974 = 100)
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* PHASE 1: Setup */}
          {phase === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-6"
            >
              <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-lg">
                <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <p className="text-neutral-300 font-mono text-sm">
                  So what wins long-term?
                </p>
                <p className="text-neutral-500 font-mono text-sm mt-2">
                  Let's race 50 years of data. Not in dollars. In real terms.
                </p>
              </div>

              <motion.button
                onClick={handleStart}
                className="flex items-center gap-2 bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-6 py-3 rounded hover:bg-amber-400 transition-colors mx-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-4 h-4" />
                START RACE
              </motion.button>
            </motion.div>
          )}

          {/* PHASE 2 & 3: Racing and Reveal */}
          {(phase === 'racing' || phase === 'reveal') && (
            <motion.div
              key="race"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Year Display */}
              <div className="text-center">
                <span className="text-amber-500 font-mono text-2xl font-bold">
                  {currentYear}
                </span>
              </div>

              {/* Race Bars */}
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg space-y-3">
                {ASSETS.map((asset) => {
                  const currentValue = getCurrentValue(asset);
                  const barWidth = (currentValue / maxValue) * 100;
                  const isWinner = phase === 'reveal' && asset.finalValue === Math.max(...ASSETS.map(a => a.finalValue));
                  const isLoser = phase === 'reveal' && asset.finalValue === Math.min(...ASSETS.map(a => a.finalValue));

                  return (
                    <div key={asset.name} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-400 font-mono text-xs flex items-center gap-2">
                          <span>{asset.emoji}</span>
                          {asset.name}
                          {isWinner && <Trophy className="w-3 h-3 text-amber-500" />}
                        </span>
                        <span className={`font-mono text-xs font-bold ${
                          asset.color === 'emerald' ? 'text-emerald-500' :
                          asset.color === 'blue' ? 'text-blue-400' :
                          asset.color === 'amber' ? 'text-amber-500' :
                          'text-red-400'
                        }`}>
                          {Math.round(currentValue)}
                        </span>
                      </div>
                      <div className="h-6 bg-neutral-800 rounded overflow-hidden">
                        <motion.div
                          className={`h-full rounded flex items-center justify-end pr-2 ${
                            asset.color === 'emerald' ? 'bg-emerald-500' :
                            asset.color === 'blue' ? 'bg-blue-500' :
                            asset.color === 'amber' ? 'bg-amber-500' :
                            'bg-red-500'
                          } ${isLoser ? 'opacity-50' : ''}`}
                          style={{ width: `${Math.max(barWidth, 5)}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-2">
                <span className="text-neutral-600 font-mono text-xs">{START_YEAR}</span>
                <div className="flex-1 h-1 bg-neutral-800 rounded overflow-hidden">
                  <motion.div
                    className="h-full bg-amber-500"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <span className="text-neutral-600 font-mono text-xs">{END_YEAR}</span>
              </div>

              {/* Reveal Stats */}
              {phase === 'reveal' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center">
                    <p className="text-amber-500 font-mono text-sm font-medium">
                      S&P 500: 340. Cash: 18.
                    </p>
                    <p className="text-neutral-400 font-mono text-xs mt-2">
                      Cash lost 82% of its purchasing power. The rich don't hold cash. Now you know why.
                    </p>
                  </div>

                  <div className="text-center">
                    <Link
                      href="/tools/truvalue"
                      target="_blank"
                      className="inline-flex items-center gap-2 text-neutral-500 hover:text-amber-500 font-mono text-xs transition-colors"
                    >
                      Explore Full Dashboard
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
