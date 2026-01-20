'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import AssetBar from './AssetBar';

interface AssetProjection {
  return: number;
  note: string;
}

interface TimedAssetProjection {
  '1y': AssetProjection;
  '3y': AssetProjection;
  '5y': AssetProjection;
}

interface Projection {
  description: string;
  assets: Record<string, TimedAssetProjection>;
  takeaway: string;
}

type Scenario = 'print' | 'restructure';
type TimePeriod = '1y' | '3y' | '5y';

interface ProjectionPanelProps {
  scenario: Scenario;
  projection: Projection;
  timePeriod: TimePeriod;
  onTimePeriodChange: (period: TimePeriod) => void;
}

const TIME_PERIODS: { value: TimePeriod; label: string }[] = [
  { value: '1y', label: '1 Year' },
  { value: '3y', label: '3 Year' },
  { value: '5y', label: '5 Year' },
];

export default function ProjectionPanel({
  scenario,
  projection,
  timePeriod,
  onTimePeriodChange,
}: ProjectionPanelProps) {
  const color = scenario === 'print' ? 'emerald' : 'amber';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${scenario}-${timePeriod}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 sm:p-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              Projected Returns
            </h3>
            <span className="text-zinc-600 hidden sm:inline">—</span>
            <span
              className={`inline-block px-2 py-0.5 text-xs font-mono uppercase tracking-wider rounded w-fit ${
                scenario === 'print'
                  ? 'bg-emerald-500/20 text-emerald-500'
                  : 'bg-amber-500/20 text-amber-500'
              }`}
            >
              {scenario}
            </span>
          </div>

          {/* Time Period Toggle */}
          <div className="flex items-center gap-1 bg-zinc-800/50 rounded-lg p-1">
            {TIME_PERIODS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => onTimePeriodChange(value)}
                className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
                  timePeriod === value
                    ? scenario === 'print'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-amber-500/20 text-amber-400'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-zinc-500 mb-6">
          {projection.description}
        </p>

        {/* Asset Projections */}
        <div className="space-y-1 mb-6">
          {Object.entries(projection.assets).map(([name, timedData]) => {
            const data = timedData[timePeriod];
            return (
              <AssetBar
                key={`${scenario}-${name}-${timePeriod}`}
                name={name === 'realEstate' ? 'Real Estate' : name.charAt(0).toUpperCase() + name.slice(1)}
                returnPct={data.return}
                note={data.note}
              />
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-800 my-6" />

        {/* Takeaway */}
        <div className="flex items-start gap-3">
          <Lightbulb className={`w-5 h-5 shrink-0 mt-0.5 ${
            scenario === 'print' ? 'text-emerald-500' : 'text-amber-500'
          }`} />
          <p className="text-sm text-zinc-300 leading-relaxed">
            {projection.takeaway}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
