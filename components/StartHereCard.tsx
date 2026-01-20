'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, ArrowRight, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'money-game-progress';

interface SavedProgress {
  chapter: number;
  completed: boolean;
}

export default function StartHereCard() {
  const [progress, setProgress] = useState<SavedProgress | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as SavedProgress;
        if (parsed.chapter > 1 || parsed.completed) {
          setProgress(parsed);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const getButtonText = () => {
    if (!progress) return 'START';
    if (progress.completed) return 'PLAY AGAIN';
    return `CONTINUE CH. ${progress.chapter}`;
  };

  const getButtonIcon = () => {
    if (progress?.completed) return <RotateCcw className="w-4 h-4" />;
    return <Play className="w-4 h-4" />;
  };

  const progressPercent = progress
    ? progress.completed
      ? 100
      : Math.round(((progress.chapter - 1) / 8) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Link href="/learn/game">
        <div className="group relative bg-gradient-to-br from-amber-500/10 via-terminal-surface to-terminal-surface border border-amber-500/20 rounded-xl p-6 hover:border-amber-500/40 transition-all duration-300 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Content */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl font-mono font-medium text-white group-hover:text-amber-500 transition-colors">
                  The Money Game
                </h3>
                <p className="text-neutral-400 font-mono text-xs sm:text-sm mt-1">
                  8 chapters. 20 min. Understand how money really works.
                </p>

                {/* Progress bar */}
                {mounted && progressPercent > 0 && (
                  <div className="mt-2 sm:mt-3 flex items-center gap-2 sm:gap-3">
                    <div className="w-24 sm:w-32 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className={`h-full rounded-full ${
                          progress?.completed ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                    </div>
                    <span className="text-neutral-500 font-mono text-[10px] sm:text-xs">
                      {progress?.completed ? 'Complete' : `${progressPercent}%`}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              className="flex items-center justify-center gap-2 bg-amber-500 text-zinc-900 font-mono text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg group-hover:bg-amber-400 transition-colors whitespace-nowrap w-full sm:w-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {mounted && getButtonIcon()}
              {mounted ? getButtonText() : 'START'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
