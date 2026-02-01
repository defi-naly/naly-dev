'use client';

import { motion } from 'framer-motion';
import { timeRanges, timeRangeLabels, type TimeRange } from '@/data/stack-layers';

interface TimeRangeToggleProps {
  selected: TimeRange;
  onChange: (range: TimeRange) => void;
}

export default function TimeRangeToggle({ selected, onChange }: TimeRangeToggleProps) {
  return (
    <div className="inline-flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1">
      {timeRanges.map((range) => (
        <button
          key={range}
          onClick={() => onChange(range)}
          className={`
            relative px-4 py-1.5 text-sm font-mono rounded-md transition-colors
            ${selected === range ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-300'}
          `}
        >
          {selected === range && (
            <motion.div
              layoutId="timeRangeIndicator"
              className="absolute inset-0 bg-amber-500 rounded-md"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10">{timeRangeLabels[range]}</span>
        </button>
      ))}
    </div>
  );
}
