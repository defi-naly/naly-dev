'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import AssetBar from './AssetBar';

interface AssetProjection {
  return: number;
  note: string;
}

interface Projection {
  description: string;
  assets: Record<string, AssetProjection>;
  takeaway: string;
}

type Scenario = 'print' | 'restructure';

interface ProjectionPanelProps {
  scenario: Scenario;
  projection: Projection;
}

export default function ProjectionPanel({ scenario, projection }: ProjectionPanelProps) {
  const color = scenario === 'print' ? 'emerald' : 'amber';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={scenario}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 sm:p-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
          <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
            Projected 5-Year Returns
          </h3>
          <span className="text-zinc-600">—</span>
          <span
            className={`inline-block px-2 py-0.5 text-xs font-mono uppercase tracking-wider rounded ${
              scenario === 'print'
                ? 'bg-emerald-500/20 text-emerald-500'
                : 'bg-amber-500/20 text-amber-500'
            }`}
          >
            {scenario}
          </span>
        </div>

        <p className="text-xs text-zinc-500 mb-6">
          {projection.description}
        </p>

        {/* Asset Projections */}
        <div className="space-y-1 mb-6">
          {Object.entries(projection.assets).map(([name, data]) => (
            <AssetBar
              key={`${scenario}-${name}`}
              name={name === 'realEstate' ? 'Real Estate' : name.charAt(0).toUpperCase() + name.slice(1)}
              returnPct={data.return}
              note={data.note}
            />
          ))}
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
