'use client';

import { motion } from 'framer-motion';

const pulseVariants = {
  initial: { scale: 1, opacity: 0.3 },
  animate: {
    scale: [1, 1.5, 1],
    opacity: [0.3, 0.6, 0.3],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const scanLineVariants = {
  initial: { x: '-100%' },
  animate: {
    x: '100%',
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

const textVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0.4, 1, 0.4],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export default function EchoLoading() {
  return (
    <div className="border border-neutral-800 bg-terminal-surface rounded-lg p-8">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Radar/Echo visual */}
        <div className="relative w-24 h-24">
          {/* Concentric circles */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              variants={pulseVariants}
              initial="initial"
              animate="animate"
              style={{ animationDelay: `${ring * 0.3}s` }}
              className="absolute inset-0 rounded-full border border-terminal-accent/30"
              custom={ring}
            />
          ))}

          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-terminal-accent rounded-full shadow-lg shadow-terminal-accent/50" />

          {/* Scanning line */}
          <motion.div
            variants={scanLineVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-terminal-accent to-transparent"
            style={{ left: '50%' }}
          />
        </div>

        {/* Loading text */}
        <div className="text-center">
          <motion.p
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="font-mono text-sm text-terminal-accent"
          >
            Scanning historical patterns...
          </motion.p>
          <p className="font-mono text-xs text-neutral-600 mt-1">
            Comparing 8 economic crises
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-terminal-accent to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
