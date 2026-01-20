'use client';

import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import AssetBarWithChart from './AssetBarWithChart';

interface ChartData {
  year: number;
  value: number;
}

interface AssetReturn {
  return: number | null;
  note: string;
  chartData?: ChartData[];
}

interface Crisis {
  id: string;
  year: string;
  type: 'PRINT' | 'RESTRUCTURE';
  title: string;
  description: string;
  why: string;
  assets: Record<string, AssetReturn>;
  takeaway: string;
}

interface CrisisDetailProps {
  crisis: Crisis;
}

export default function CrisisDetail({ crisis }: CrisisDetailProps) {
  const typeColor = crisis.type === 'RESTRUCTURE' ? 'amber' : 'emerald';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 sm:p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xl sm:text-2xl font-light text-zinc-100">
          {crisis.year}
        </span>
        <span className="text-zinc-600">—</span>
        <span
          className={`px-2 py-0.5 text-xs font-mono uppercase tracking-wider rounded ${
            crisis.type === 'RESTRUCTURE'
              ? 'bg-amber-500/20 text-amber-500'
              : 'bg-emerald-500/20 text-emerald-500'
          }`}
        >
          {crisis.type}
        </span>
      </div>

      {/* What happened */}
      <div className="mb-6">
        <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
          What happened
        </h3>
        <p className="text-sm text-zinc-300 leading-relaxed">
          {crisis.description}
        </p>
      </div>

      {/* Why */}
      <div className="mb-6">
        <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
          Why
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed">
          {crisis.why}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-zinc-800 my-6" />

      {/* Asset Returns */}
      <div className="mb-6">
        <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">
          5-Year Asset Returns
        </h3>
        <div className="space-y-1">
          {Object.entries(crisis.assets).map(([name, data]) => (
            <AssetBarWithChart
              key={name}
              name={name.charAt(0).toUpperCase() + name.slice(1)}
              returnPct={data.return}
              note={data.note}
              chartData={data.chartData}
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-zinc-800 my-6" />

      {/* Takeaway */}
      <div className="flex items-start gap-3">
        <Lightbulb className={`w-5 h-5 shrink-0 mt-0.5 ${
          crisis.type === 'RESTRUCTURE' ? 'text-amber-500' : 'text-emerald-500'
        }`} />
        <p className="text-sm text-zinc-300 leading-relaxed">
          {crisis.takeaway}
        </p>
      </div>
    </motion.div>
  );
}
