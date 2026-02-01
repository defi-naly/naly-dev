'use client';

import { motion } from 'framer-motion';

interface YieldComparisonProps {
  yields: Record<string, number>;
}

const LAYER_INFO = {
  SPY: { name: 'S&P 500', color: '#71717a', role: 'Baseline' },
  POWR: { name: 'Power', color: '#f59e0b', role: 'Energy Layer' },
  IFRA: { name: 'Infrastructure', color: '#8b5cf6', role: 'Physical Layer' },
  BAI: { name: 'AI Innovation', color: '#22c55e', role: 'Intelligence Layer' },
};

export default function YieldComparison({ yields }: YieldComparisonProps) {
  const maxYield = Math.max(...Object.values(yields));
  const sortedTickers = Object.keys(yields).sort((a, b) => yields[b] - yields[a]);

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-white">Dividend Yields</h3>
          <p className="text-xs text-zinc-500 mt-0.5">The "rent collection" metric</p>
        </div>
        <div className="text-[10px] font-mono text-zinc-600 uppercase">
          Annual Yield %
        </div>
      </div>

      <div className="space-y-3">
        {sortedTickers.map((ticker, index) => {
          const info = LAYER_INFO[ticker as keyof typeof LAYER_INFO];
          const yieldValue = yields[ticker];
          const barWidth = (yieldValue / maxYield) * 100;
          const isBeatingSpy = ticker !== 'SPY' && yieldValue > yields.SPY;

          return (
            <motion.div
              key={ticker}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: info.color }}
                  />
                  <span className="text-xs text-zinc-300">{ticker}</span>
                  <span className="text-[10px] text-zinc-600">{info.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-white">
                    {yieldValue.toFixed(2)}%
                  </span>
                  {isBeatingSpy && (
                    <span className="text-[10px] font-mono text-amber-400">
                      +{(yieldValue - yields.SPY).toFixed(2)}%
                    </span>
                  )}
                </div>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${barWidth}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: info.color }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Thesis callout */}
      <div className="mt-4 pt-3 border-t border-zinc-800">
        <p className="text-xs text-zinc-500">
          <span className="text-amber-400">POWR</span> and{' '}
          <span className="text-violet-400">IFRA</span> typically yield more than{' '}
          <span className="text-zinc-400">SPY</span>. This is the "rent" Fink wants you to collect
          while waiting for infrastructure to appreciate.
        </p>
      </div>
    </div>
  );
}
