'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type TimeRange = '5Y' | '10Y' | '20Y' | 'ALL';

// Simplified data for embedding
const chartData = {
  currentValue: 1.55,
  dangerLine: 1.50,
  percentAboveDanger: 3.3,
};

export default function LineChartEmbed() {
  const [timeRange, setTimeRange] = useState<TimeRange>('10Y');

  return (
    <div>
      {/* Current value display */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
            Current S&P/Gold Ratio
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-mono font-light text-amber-500">
              {chartData.currentValue}
            </span>
            <span className="text-sm font-mono text-zinc-500">
              ({chartData.percentAboveDanger}% above danger)
            </span>
          </div>
        </div>

        {/* Time range toggles */}
        <div className="flex items-center gap-1 bg-zinc-800/50 rounded-lg p-1">
          {(['5Y', '10Y', '20Y', 'ALL'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
                timeRange === range
                  ? 'bg-terminal-accent/20 text-terminal-accent'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Simplified chart visualization */}
      <div className="relative h-64 sm:h-80 bg-zinc-900/50 rounded-lg p-4">
        <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="50" x2="400" y2="50" stroke="#27272a" strokeWidth="1" />
          <line x1="0" y1="100" x2="400" y2="100" stroke="#27272a" strokeWidth="1" />
          <line x1="0" y1="150" x2="400" y2="150" stroke="#27272a" strokeWidth="1" />

          {/* Danger zone */}
          <rect x="0" y="100" width="400" height="100" fill="#ef4444" opacity="0.05" />

          {/* Danger line at 1.50 */}
          <line x1="0" y1="100" x2="400" y2="100" stroke="#ef4444" strokeWidth="2" strokeDasharray="8,4" />
          <text x="390" y="95" fill="#ef4444" fontSize="10" fontFamily="monospace" textAnchor="end">1.50</text>

          {/* Data line (simplified) */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Area fill */}
          <path
            d="M0,70 Q50,65 100,80 T200,55 T300,45 T400,85 L400,200 L0,200 Z"
            fill="url(#lineGradient)"
          />

          {/* Main line */}
          <motion.path
            d="M0,70 Q50,65 100,80 T200,55 T300,45 T400,85"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Current point */}
          <circle cx="400" cy="85" r="6" fill="#f59e0b" filter="url(#glow)">
            <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Breach markers */}
          <g>
            <circle cx="120" cy="110" r="4" fill="#ef4444" opacity="0.8" />
            <text x="120" y="130" fill="#ef4444" fontSize="8" fontFamily="monospace" textAnchor="middle">2008</text>
          </g>
          <g>
            <circle cx="350" cy="105" r="4" fill="#ef4444" opacity="0.8" />
            <text x="350" y="125" fill="#ef4444" fontSize="8" fontFamily="monospace" textAnchor="middle">2020</text>
          </g>
        </svg>

        {/* Y-axis labels */}
        <div className="absolute left-2 top-4 flex flex-col justify-between h-[calc(100%-2rem)] text-[10px] font-mono text-zinc-600">
          <span>3.0</span>
          <span>2.0</span>
          <span className="text-red-500">1.5</span>
          <span>1.0</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-emerald-500" />
          <span className="text-xs font-mono text-zinc-500">S&P/Gold Ratio</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-red-500 opacity-50" style={{ borderStyle: 'dashed' }} />
          <span className="text-xs font-mono text-zinc-500">Danger Line (1.50)</span>
        </div>
      </div>
    </div>
  );
}
