'use client';

import { motion } from 'framer-motion';

type Scenario = 'print' | 'restructure';

interface ScenarioToggleProps {
  selected: Scenario;
  onSelect: (scenario: Scenario) => void;
}

export default function ScenarioToggle({ selected, onSelect }: ScenarioToggleProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 sm:p-6">
      <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">
        What About Now?
      </h3>

      <p className="text-sm text-zinc-400 leading-relaxed mb-6">
        US debt: <span className="text-zinc-100">130% of GDP</span>. Interest payments: largest budget item.
        Two options. Same as always.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <motion.button
          onClick={() => onSelect('print')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 py-3 px-4 rounded-lg font-mono text-sm font-medium transition-all ${
            selected === 'print'
              ? 'bg-emerald-500 text-zinc-900'
              : 'border border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
          }`}
        >
          PRINT
        </motion.button>

        <motion.button
          onClick={() => onSelect('restructure')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 py-3 px-4 rounded-lg font-mono text-sm font-medium transition-all ${
            selected === 'restructure'
              ? 'bg-amber-500 text-zinc-900'
              : 'border border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
          }`}
        >
          RESTRUCTURE
        </motion.button>
      </div>

      {/* Selection indicator */}
      <div className="flex justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${selected === 'print' ? 'bg-emerald-500' : 'bg-zinc-700'}`} />
          <span className="text-xs font-mono text-zinc-600">Inflate the debt</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${selected === 'restructure' ? 'bg-amber-500' : 'bg-zinc-700'}`} />
          <span className="text-xs font-mono text-zinc-600">Reset the system</span>
        </div>
      </div>
    </div>
  );
}
