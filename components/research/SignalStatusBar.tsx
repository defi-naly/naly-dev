'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface Signal {
  label: string;
  value: string;
  change?: 'up' | 'down' | 'neutral';
  status: 'danger' | 'warning' | 'normal';
}

const signals: Signal[] = [
  { label: 'LINE', value: '1.55', change: 'down', status: 'warning' },
  { label: 'CYCLE', value: 'Yr 17', status: 'warning' },
  { label: 'DEBT/GDP', value: '121%', change: 'up', status: 'warning' },
  { label: 'INTEREST', value: '$970B', change: 'up', status: 'danger' },
];

const statusColors = {
  danger: 'text-red-500',
  warning: 'text-amber-500',
  normal: 'text-zinc-100',
};

const statusBg = {
  danger: 'bg-red-500/10',
  warning: 'bg-amber-500/10',
  normal: 'bg-zinc-800/50',
};

function ChangeIcon({ change }: { change?: 'up' | 'down' | 'neutral' }) {
  if (change === 'up') return <TrendingUp className="w-3 h-3" />;
  if (change === 'down') return <TrendingDown className="w-3 h-3" />;
  return null;
}

export default function SignalStatusBar() {
  const elevatedCount = signals.filter(s => s.status !== 'normal').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-14 z-40 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 overflow-x-auto">
          {/* Signals */}
          <div className="flex items-center gap-2 sm:gap-4">
            {signals.map((signal, index) => (
              <div
                key={signal.label}
                className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-md ${statusBg[signal.status]}`}
              >
                <span className="text-[10px] sm:text-xs font-mono text-zinc-500">
                  {signal.label}:
                </span>
                <span className={`text-xs sm:text-sm font-mono font-medium ${statusColors[signal.status]}`}>
                  {signal.value}
                </span>
                {signal.change && (
                  <span className={statusColors[signal.status]}>
                    <ChangeIcon change={signal.change} />
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Summary badge */}
          <div className="flex items-center gap-2 pl-4 border-l border-zinc-800 ml-2 shrink-0">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-mono text-amber-500">
              {elevatedCount}/4 elevated
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
