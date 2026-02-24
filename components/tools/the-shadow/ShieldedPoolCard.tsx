'use client';

import { motion } from 'framer-motion';

interface ShieldedPool {
  name: string;
  zec: number;
  color: string;
}

interface ShieldedPoolCardProps {
  pools: ShieldedPool[];
  totalShielded: number;
  pctOfCirculating: number;
}

export default function ShieldedPoolCard({
  pools,
  totalShielded,
  pctOfCirculating,
}: ShieldedPoolCardProps) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
          Shielded Pool
        </h3>
        <span className="text-xs font-mono text-emerald-400">
          {pctOfCirculating.toFixed(1)}% shielded
        </span>
      </div>

      <div className="text-2xl font-mono text-white mb-4">
        {(totalShielded / 1_000_000).toFixed(1)}M ZEC
      </div>

      {/* Stacked bar */}
      <div className="h-3 rounded-full overflow-hidden flex mb-4 bg-zinc-800">
        {pools.map((pool, i) => {
          const pct = (pool.zec / totalShielded) * 100;
          return (
            <motion.div
              key={pool.name}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: 'easeOut' }}
              className="h-full"
              style={{ backgroundColor: pool.color }}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {pools.map((pool) => (
          <div key={pool.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: pool.color }}
              />
              <span className="text-xs font-mono text-zinc-400">{pool.name}</span>
            </div>
            <span className="text-xs font-mono text-zinc-300">
              {(pool.zec / 1_000_000).toFixed(2)}M
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
