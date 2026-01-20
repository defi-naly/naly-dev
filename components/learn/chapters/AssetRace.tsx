'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { TrophyIcon, ChartUpIcon, HouseIcon, GoldBarIcon, DollarIcon } from '@/components/icons/GameIcons';

interface AssetRaceProps {
  onComplete: () => void;
}

interface Asset {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  startValue: number;
  endValue: number;
  icon: React.ReactNode;
}

const ASSETS: Asset[] = [
  {
    id: 'sp500',
    name: 'S&P 500',
    color: '#10b981',
    bgColor: 'bg-emerald-500/10',
    startValue: 100,
    endValue: 2100,
    icon: <ChartUpIcon className="w-4 h-4" />,
  },
  {
    id: 'gold',
    name: 'Gold',
    color: '#f59e0b',
    bgColor: 'bg-amber-500/10',
    startValue: 100,
    endValue: 890,
    icon: <GoldBarIcon className="w-4 h-4" />,
  },
  {
    id: 'housing',
    name: 'Housing',
    color: '#3b82f6',
    bgColor: 'bg-blue-500/10',
    startValue: 100,
    endValue: 650,
    icon: <HouseIcon className="w-4 h-4" />,
  },
  {
    id: 'cash',
    name: 'Cash',
    color: '#ef4444',
    bgColor: 'bg-red-500/10',
    startValue: 100,
    endValue: 18,
    icon: <DollarIcon className="w-4 h-4" />,
  },
];

const START_YEAR = 1974;
const END_YEAR = 2024;
const ANIMATION_DURATION = 10000;

type Phase = 'intro' | 'racing' | 'complete';

export default function AssetRace({ onComplete }: AssetRaceProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentYear, setCurrentYear] = useState(START_YEAR);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleStart = () => {
    setPhase('racing');
  };

  useEffect(() => {
    if (phase !== 'racing') return;

    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / ANIMATION_DURATION, 1);

      const easedProgress = 1 - Math.pow(1 - rawProgress, 2);

      setProgress(easedProgress);
      setCurrentYear(Math.floor(START_YEAR + (END_YEAR - START_YEAR) * easedProgress));

      if (rawProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        setPhase('complete');
      }
    };

    requestAnimationFrame(animate);
  }, [phase]);

  useEffect(() => {
    if (phase === 'complete' && !isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        onComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase, isComplete, onComplete]);

  const getCurrentValue = (asset: Asset): number => {
    const startValue = asset.startValue;
    const endValue = asset.endValue;
    return startValue * Math.pow(endValue / startValue, progress);
  };

  const maxValue = Math.max(...ASSETS.map(a => a.endValue));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-[450px]"
    >
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-6"
            >
              <div>
                <h3 className="text-lg text-zinc-100 font-mono">
                  Let's race $100 across 50 years.
                </h3>
                <p className="text-zinc-500 font-mono text-sm mt-2">
                  Same starting amount. Different stores of value.
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-5 text-left max-w-sm mx-auto">
                <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-4">
                  $100 in 1974 invested in:
                </p>
                <div className="space-y-3">
                  {ASSETS.map((asset) => (
                    <div key={asset.id} className="flex items-center gap-3">
                      <div
                        className="w-4 h-1 rounded-full"
                        style={{ backgroundColor: asset.color }}
                      />
                      <span className="font-mono text-sm text-zinc-300">
                        {asset.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={handleStart}
                className="flex items-center gap-2 bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-6 py-3 rounded hover:bg-amber-400 transition-colors mx-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-4 h-4" />
                START THE RACE
              </motion.button>
            </motion.div>
          )}

          {(phase === 'racing' || phase === 'complete') && (
            <motion.div
              key="race"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="text-center">
                <span className="font-mono text-xs text-zinc-500">
                  $100 in 1974 → Today (Inflation-Adjusted)
                </span>
              </div>

              <div className="text-center mb-2">
                <span className="text-amber-500 font-mono text-2xl font-bold">
                  {currentYear}
                </span>
              </div>

              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg space-y-3">
                {ASSETS.map((asset) => {
                  const currentValue = getCurrentValue(asset);
                  const barWidth = (currentValue / maxValue) * 100;
                  const isWinner = phase === 'complete' && asset.id === 'sp500';
                  const isLoser = phase === 'complete' && asset.id === 'cash';

                  return (
                    <div key={asset.id} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400 font-mono text-xs flex items-center gap-2">
                          <span style={{ color: asset.color }}>{asset.icon}</span>
                          {asset.name}
                          {isWinner && (
                            <TrophyIcon className="w-3 h-3 text-amber-500" />
                          )}
                        </span>
                        <span
                          className="font-mono text-xs font-bold"
                          style={{ color: asset.color }}
                        >
                          ${Math.round(currentValue).toLocaleString()}
                        </span>
                      </div>
                      <div className="h-5 bg-zinc-800 rounded overflow-hidden">
                        <motion.div
                          className={`h-full rounded ${isLoser ? 'opacity-50' : ''}`}
                          style={{
                            backgroundColor: asset.color,
                            width: `${Math.max(barWidth, 2)}%`,
                          }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-zinc-600 font-mono text-xs">{START_YEAR}</span>
                <div className="flex-1 h-1 bg-zinc-800 rounded overflow-hidden">
                  <motion.div
                    className="h-full bg-zinc-600"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <span className="text-zinc-600 font-mono text-xs">{END_YEAR}</span>
              </div>

              {phase === 'complete' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center">
                    <p className="text-amber-500 font-mono text-sm font-medium">
                      S&P 500: $2,100. Cash: $18.
                    </p>
                    <p className="text-neutral-400 font-mono text-xs mt-2">
                      Cash lost 82% of its purchasing power. The rich don't hold cash.
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
