'use client';

import { motion } from 'framer-motion';

interface CrisisEra {
  start: number;
  end: number;
  label: string;
  resolution: string;
}

const crisisEras: CrisisEra[] = [
  { start: 1773, end: 1794, label: 'Revolution', resolution: 'Constitution' },
  { start: 1860, end: 1865, label: 'Civil War', resolution: 'Union preserved' },
  { start: 1929, end: 1945, label: 'Depression/WW2', resolution: 'Bretton Woods' },
  { start: 2008, end: 2030, label: 'Current Crisis', resolution: '?' },
];

const currentYear = 2026;
const crisisStart = 2008;
const crisisEnd = 2030;
const yearsInCrisis = currentYear - crisisStart;
const totalYears = crisisEnd - crisisStart;

export default function SaeculumTimelineEmbed() {
  return (
    <div>
      {/* Current position header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
            Cycle Position
          </p>
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl font-mono font-light text-white">
              Year {yearsInCrisis}
            </span>
            <span className="text-sm font-mono text-zinc-500">
              of ~{totalYears}
            </span>
          </div>
        </div>

        {/* Season indicator */}
        <div className="text-right">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
            Season
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-zinc-700" title="Spring" />
              <span className="w-2 h-2 rounded-full bg-zinc-700" title="Summer" />
              <span className="w-2 h-2 rounded-full bg-zinc-700" title="Fall" />
              <span className="w-3 h-3 rounded-full bg-amber-400 ring-2 ring-amber-400/30" title="Winter" />
            </div>
            <span className="font-mono text-sm text-amber-400">WINTER</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="h-4 bg-zinc-800 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(yearsInCrisis / totalYears) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          {/* You are here marker */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-amber-500 shadow-lg"
            initial={{ left: 0 }}
            animate={{ left: `calc(${(yearsInCrisis / totalYears) * 100}% - 8px)` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs font-mono text-zinc-500">{crisisStart}</span>
          <span className="text-xs font-mono text-amber-400">You are here</span>
          <span className="text-xs font-mono text-zinc-500">~{crisisEnd}</span>
        </div>
      </div>

      {/* Historical crises timeline */}
      <div className="bg-zinc-900/50 rounded-lg p-4">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">
          Historical Fourth Turnings
        </p>

        <div className="space-y-3">
          {crisisEras.map((era, index) => {
            const isCurrent = era.start === 2008;
            return (
              <motion.div
                key={era.start}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex items-center gap-4 p-3 rounded-lg ${
                  isCurrent ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-zinc-800/50'
                }`}
              >
                <span className={`font-mono text-sm ${isCurrent ? 'text-amber-400' : 'text-zinc-400'}`}>
                  {era.start}–{era.end}
                </span>
                <span className={`flex-1 text-sm ${isCurrent ? 'text-white' : 'text-zinc-300'}`}>
                  {era.label}
                </span>
                <span className={`text-xs font-mono ${isCurrent ? 'text-amber-400' : 'text-zinc-500'}`}>
                  {era.resolution}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-4 p-3 bg-zinc-800/30 rounded-lg border-l-2 border-amber-500">
        <p className="text-sm text-zinc-400">
          <span className="text-amber-400 font-medium">Pattern:</span> Each crisis era lasted 15–22 years
          and ended with a resolution that reset the institutional order—and the monetary system.
        </p>
      </div>
    </div>
  );
}
