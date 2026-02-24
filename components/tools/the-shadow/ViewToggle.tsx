'use client';

import { motion } from 'framer-motion';

export type ViewMode = 'price' | 'indexed';

const views: ViewMode[] = ['indexed', 'price'];
const viewLabels: Record<ViewMode, string> = {
  indexed: 'Indexed',
  price: 'Price',
};

interface ViewToggleProps {
  selected: ViewMode;
  onChange: (view: ViewMode) => void;
}

export default function ViewToggle({ selected, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1">
      {views.map((view) => (
        <button
          key={view}
          onClick={() => onChange(view)}
          className={`
            relative px-4 py-1.5 text-sm font-mono rounded-md transition-colors
            ${selected === view ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-300'}
          `}
        >
          {selected === view && (
            <motion.div
              layoutId="viewModeIndicator"
              className="absolute inset-0 bg-amber-500 rounded-md"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10">{viewLabels[view]}</span>
        </button>
      ))}
    </div>
  );
}
