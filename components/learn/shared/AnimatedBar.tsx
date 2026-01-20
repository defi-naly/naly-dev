'use client';

import { motion } from 'framer-motion';

interface AnimatedBarProps {
  percent: number;
  color?: string;
  duration?: number;
  height?: number;
  showLabel?: boolean;
  className?: string;
}

export default function AnimatedBar({
  percent,
  color = 'bg-amber-500',
  duration = 2,
  height = 8,
  showLabel = false,
  className = '',
}: AnimatedBarProps) {
  return (
    <div className={`bg-neutral-800 rounded overflow-hidden ${className}`} style={{ height }}>
      <motion.div
        className={`h-full ${color} flex items-center justify-end pr-2`}
        initial={{ width: '100%' }}
        animate={{ width: `${Math.max(percent, 2)}%` }}
        transition={{ duration, ease: 'easeOut' }}
      >
        {showLabel && percent > 15 && (
          <span className="text-zinc-900 font-mono text-xs font-bold">
            {Math.round(percent)}%
          </span>
        )}
      </motion.div>
    </div>
  );
}
