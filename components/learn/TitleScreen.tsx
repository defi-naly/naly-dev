'use client';

import { motion } from 'framer-motion';
import { Terminal, Play, RotateCcw } from 'lucide-react';

interface TitleScreenProps {
  onStart: () => void;
  onResume?: () => void;
  savedChapter?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function TitleScreen({ onStart, onResume, savedChapter }: TitleScreenProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4"
    >
      {/* Icon */}
      <motion.div
        variants={itemVariants}
        className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-8"
      >
        <Terminal className="w-7 h-7 text-amber-500" />
      </motion.div>

      {/* Title */}
      <motion.h1
        variants={itemVariants}
        className="text-3xl sm:text-4xl font-mono font-medium text-white tracking-tight"
      >
        THE MONEY GAME
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="text-neutral-400 font-mono text-sm mt-4 max-w-md leading-relaxed"
      >
        8 chapters. 20 minutes. A lifetime of clarity.
      </motion.p>

      {/* Buttons */}
      <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row gap-3">
        {onResume && savedChapter && (
          <motion.button
            onClick={onResume}
            className="flex items-center justify-center gap-2 bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-8 py-3 rounded hover:bg-amber-400 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="w-4 h-4" />
            CONTINUE (CH. {savedChapter})
          </motion.button>
        )}
        <motion.button
          onClick={onStart}
          className={`flex items-center justify-center gap-2 font-mono text-sm font-medium px-8 py-3 rounded transition-colors ${
            onResume
              ? 'bg-neutral-800 border border-neutral-700 text-neutral-300 hover:border-amber-500 hover:text-amber-500'
              : 'bg-amber-500 text-zinc-900 hover:bg-amber-400'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {onResume ? (
            <>
              <RotateCcw className="w-4 h-4" />
              START OVER
            </>
          ) : (
            'BEGIN'
          )}
        </motion.button>
      </motion.div>

      {/* Meta */}
      <motion.p
        variants={itemVariants}
        className="mt-6 text-neutral-600 font-mono text-xs"
      >
        An interactive guide to how money actually works
      </motion.p>
    </motion.div>
  );
}
