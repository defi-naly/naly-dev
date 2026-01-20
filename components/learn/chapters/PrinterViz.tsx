'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, Printer } from 'lucide-react';
import Link from 'next/link';

interface PrinterVizProps {
  onComplete: () => void;
}

// M2 Money Supply data (in trillions)
// Source: Federal Reserve FRED
const M2_MILESTONES = [
  { year: 1971, value: 0.69, label: 'Nixon ends gold standard', color: 'amber' },
  { year: 2008, value: 8.2, label: 'Financial crisis', color: 'blue' },
  { year: 2020, value: 15.4, label: 'COVID response begins', color: 'red' },
  { year: 2024, value: 21.5, label: 'Today', color: 'emerald' },
];

const MAX_VALUE = 22;
const ANIMATION_DURATION = 5000; // 5 seconds total

type Phase = 'setup' | 'animating' | 'reveal';

export default function PrinterViz({ onComplete }: PrinterVizProps) {
  const [phase, setPhase] = useState<Phase>('setup');
  const [currentYear, setCurrentYear] = useState(1971);
  const [currentValue, setCurrentValue] = useState(0.69);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleStart = () => {
    setPhase('animating');
  };

  // Animate through years
  useEffect(() => {
    if (phase !== 'animating') return;

    const startTime = Date.now();
    const startYear = 1971;
    const endYear = 2024;
    const yearRange = endYear - startYear;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

      // Eased progress for smoother animation
      const easedProgress = 1 - Math.pow(1 - progress, 2);

      const year = Math.floor(startYear + yearRange * easedProgress);
      setCurrentYear(year);

      // Calculate value based on exponential growth approximation
      const yearProgress = (year - 1971) / (2024 - 1971);
      const value = 0.69 * Math.pow(21.5 / 0.69, yearProgress);
      setCurrentValue(value);

      // Check milestones
      const milestoneIndex = M2_MILESTONES.findIndex((m, i) =>
        year >= m.year && (i === M2_MILESTONES.length - 1 || year < M2_MILESTONES[i + 1].year)
      );
      if (milestoneIndex >= 0) {
        setActiveMilestone(milestoneIndex);
      }

      if (progress < 1) {
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

  const barHeight = (currentValue / MAX_VALUE) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-[450px]"
    >
      {/* Header */}
      <div className="text-center mb-4">
        <p className="text-neutral-500 font-mono text-xs uppercase tracking-wider">
          M2 Money Supply (Trillions USD)
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
                <Printer className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <p className="text-neutral-300 font-mono text-sm">
                  Since 1971, the dollar hasn't been backed by gold.
                </p>
                <p className="text-neutral-500 font-mono text-sm mt-2">
                  So what happened to the money supply?
                </p>
              </div>

              <motion.button
                onClick={handleStart}
                className="flex items-center gap-2 bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-6 py-3 rounded hover:bg-amber-400 transition-colors mx-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-4 h-4" />
                START
              </motion.button>
            </motion.div>
          )}

          {/* PHASE 2 & 3: Animating and Reveal */}
          {(phase === 'animating' || phase === 'reveal') && (
            <motion.div
              key="chart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Chart Area */}
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
                {/* Y-axis labels and bar */}
                <div className="flex gap-4">
                  {/* Y-axis */}
                  <div className="flex flex-col justify-between h-48 text-right">
                    <span className="text-neutral-600 font-mono text-xs">$22T</span>
                    <span className="text-neutral-600 font-mono text-xs">$11T</span>
                    <span className="text-neutral-600 font-mono text-xs">$0</span>
                  </div>

                  {/* Bar Chart */}
                  <div className="flex-1 h-48 bg-neutral-800 rounded relative overflow-hidden">
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-600 to-amber-400"
                      style={{ height: `${barHeight}%` }}
                      transition={{ duration: 0.1 }}
                    />

                    {/* Milestone markers */}
                    {M2_MILESTONES.map((milestone, i) => {
                      const markerHeight = (milestone.value / MAX_VALUE) * 100;
                      const isActive = phase === 'reveal' || currentValue >= milestone.value;

                      return (
                        <motion.div
                          key={milestone.year}
                          className="absolute left-0 right-0 flex items-center"
                          style={{ bottom: `${markerHeight}%` }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isActive ? 1 : 0.3 }}
                        >
                          <div className="w-full border-t border-dashed border-neutral-600" />
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="absolute right-2 bg-neutral-900 px-2 py-1 rounded"
                            >
                              <span className={`font-mono text-xs ${
                                milestone.color === 'amber' ? 'text-amber-500' :
                                milestone.color === 'blue' ? 'text-blue-400' :
                                milestone.color === 'red' ? 'text-red-400' :
                                'text-emerald-500'
                              }`}>
                                {milestone.year}: ${milestone.value}T
                              </span>
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Current Value Display */}
                <div className="mt-4 text-center">
                  <span className="text-neutral-500 font-mono text-sm">{currentYear}</span>
                  <span className="text-white font-mono text-2xl font-bold ml-4">
                    ${currentValue.toFixed(1)}T
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-2 h-1 bg-neutral-800 rounded overflow-hidden">
                  <motion.div
                    className="h-full bg-amber-500"
                    style={{ width: `${((currentYear - 1971) / (2024 - 1971)) * 100}%` }}
                  />
                </div>
              </div>

              {/* Milestone Labels */}
              {phase === 'animating' && activeMilestone >= 0 && (
                <motion.div
                  key={activeMilestone}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <span className={`font-mono text-sm ${
                    M2_MILESTONES[activeMilestone].color === 'amber' ? 'text-amber-500' :
                    M2_MILESTONES[activeMilestone].color === 'blue' ? 'text-blue-400' :
                    M2_MILESTONES[activeMilestone].color === 'red' ? 'text-red-400' :
                    'text-emerald-500'
                  }`}>
                    {M2_MILESTONES[activeMilestone].label}
                  </span>
                </motion.div>
              )}

              {/* Reveal Stats */}
              {phase === 'reveal' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center">
                    <p className="text-amber-500 font-mono text-sm font-medium">
                      $0.69T → $21.5T — that's 31x more dollars.
                    </p>
                    <p className="text-neutral-400 font-mono text-xs mt-2">
                      40% of all dollars in existence were created since 2020.
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
