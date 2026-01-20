'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface EndScreenProps {
  onRestart: () => void;
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

const summaryItems = [
  'Money solves barter\'s coincidence problem',
  'Scarcity (stock-to-flow) makes money hard',
  'Banks multiply claims beyond reserves',
  'Printing transfers wealth through inflation',
  'Scarce assets outpace cash over time',
];

export default function EndScreen({ onRestart }: EndScreenProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4"
    >
      {/* Complete Badge */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2 text-emerald-500 font-mono text-sm uppercase tracking-wider"
      >
        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <Check className="w-4 h-4" />
        </div>
        COMPLETE
      </motion.div>

      {/* Title */}
      <motion.h1
        variants={itemVariants}
        className="text-2xl font-mono font-medium text-white mt-4"
      >
        You finished The Money Game
      </motion.h1>

      {/* Summary Box */}
      <motion.div
        variants={itemVariants}
        className="mt-8 p-6 bg-neutral-900 border border-neutral-800 rounded-lg text-left max-w-md w-full"
      >
        <h3 className="text-neutral-500 font-mono text-xs uppercase tracking-wider mb-4">
          What you learned
        </h3>
        <ul className="space-y-3">
          {summaryItems.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-neutral-300 font-mono text-sm flex items-start gap-2"
            >
              <span className="text-amber-500 mt-0.5">•</span>
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Buttons */}
      <motion.div
        variants={itemVariants}
        className="mt-8 flex flex-col sm:flex-row gap-3"
      >
        <Link href="/tools">
          <motion.button
            className="bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-6 py-3 rounded hover:bg-amber-400 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            EXPLORE TOOLS
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
        <motion.button
          onClick={onRestart}
          className="bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono text-sm px-6 py-3 rounded hover:border-amber-500 hover:text-amber-500 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          PLAY AGAIN
        </motion.button>
      </motion.div>

      {/* Share Link (placeholder for Sprint 4) */}
      <motion.p
        variants={itemVariants}
        className="mt-6 text-neutral-600 font-mono text-xs cursor-not-allowed"
      >
        Share what you learned →
      </motion.p>
    </motion.div>
  );
}
