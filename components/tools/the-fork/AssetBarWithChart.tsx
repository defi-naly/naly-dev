'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import AssetChart from './AssetChart';

interface ChartData {
  year: number;
  value: number;
}

interface AssetBarWithChartProps {
  name: string;
  returnPct: number | null;
  note?: string;
  chartData?: ChartData[];
  maxScale?: number;
}

export default function AssetBarWithChart({
  name,
  returnPct,
  note,
  chartData,
  maxScale = 300
}: AssetBarWithChartProps) {
  const [showChart, setShowChart] = useState(false);

  if (returnPct === null) {
    return (
      <div className="py-2">
        <div className="flex items-center gap-4">
          <span className="w-24 sm:w-28 text-sm font-mono text-zinc-400 shrink-0">{name}</span>
          <div className="flex-1 flex items-center justify-center">
            <span className="text-xs font-mono text-zinc-600">{note || 'N/A'}</span>
          </div>
        </div>
      </div>
    );
  }

  const isPositive = returnPct >= 0;
  const absReturn = Math.abs(returnPct);
  const barWidth = Math.min((absReturn / maxScale) * 100, 100);
  const color = isPositive ? '#10b981' : '#ef4444';

  return (
    <div className="py-1">
      <button
        onClick={() => chartData && setShowChart(!showChart)}
        className={`w-full ${chartData ? 'cursor-pointer hover:bg-zinc-800/30 rounded transition-colors' : ''}`}
        disabled={!chartData}
      >
        <div className="flex items-center gap-4 py-1">
          <span className="w-24 sm:w-28 text-sm font-mono text-zinc-400 shrink-0 text-left flex items-center gap-1">
            {name}
            {chartData && (
              showChart ?
                <ChevronUp className="w-3 h-3 text-zinc-600" /> :
                <ChevronDown className="w-3 h-3 text-zinc-600" />
            )}
          </span>

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
      </button>

      {/* Expandable chart */}
      <AnimatePresence>
        {showChart && chartData && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-3 pl-28 sm:pl-32 pr-4">
              <div className="bg-zinc-800/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">5-Year Performance</span>
                  <span className={`text-xs font-mono ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isPositive ? '+' : ''}{returnPct}%
                  </span>
                </div>
                <AssetChart data={chartData} color={color} />
                <div className="flex justify-between text-[10px] font-mono text-zinc-600 mt-1">
                  <span>Year 0</span>
                  <span>Year 5</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
