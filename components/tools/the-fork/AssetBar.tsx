'use client';

import { motion } from 'framer-motion';

interface AssetBarProps {
  name: string;
  returnPct: number | null;
  note?: string;
  maxScale?: number;
}

export default function AssetBar({ name, returnPct, note, maxScale = 300 }: AssetBarProps) {
  if (returnPct === null) {
    return (
      <div className="flex items-center gap-4 py-2">
        <span className="w-24 sm:w-28 text-sm font-mono text-zinc-400 shrink-0">{name}</span>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-xs font-mono text-zinc-600">{note || 'N/A'}</span>
        </div>
      </div>
    );
  }

  const isPositive = returnPct >= 0;
  const absReturn = Math.abs(returnPct);
  const barWidth = Math.min((absReturn / maxScale) * 100, 100);

  return (
    <div className="flex items-center gap-4 py-2">
      <span className="w-24 sm:w-28 text-sm font-mono text-zinc-400 shrink-0">{name}</span>

      <div className="flex-1 flex items-center">
        {/* Negative bar area */}
        <div className="w-1/3 flex justify-end">
          {!isPositive && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${barWidth}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-6 bg-red-500/80 rounded-l flex items-center justify-start pl-2"
            >
              <span className="text-xs font-mono text-white whitespace-nowrap">
                {returnPct}%
              </span>
            </motion.div>
          )}
        </div>

        {/* Center divider */}
        <div className="w-px h-6 bg-zinc-700 shrink-0" />

        {/* Positive bar area */}
        <div className="w-2/3 flex justify-start">
          {isPositive && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${barWidth}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-6 bg-emerald-500/80 rounded-r flex items-center justify-end pr-2"
            >
              <span className="text-xs font-mono text-white whitespace-nowrap">
                +{returnPct}%
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {note && (
        <span className="w-24 sm:w-32 text-xs font-mono text-zinc-600 text-right shrink-0 hidden sm:block">
          {note}
        </span>
      )}
    </div>
  );
}
