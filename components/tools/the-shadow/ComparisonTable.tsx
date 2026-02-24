'use client';

import { motion } from 'framer-motion';
import { COMPARISON_DATA } from '@/data/shadow';

export default function ComparisonTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-zinc-800">
        <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
          BTC vs ZEC — Monetary Policy
        </h3>
      </div>

      {/* Header row */}
      <div className="grid grid-cols-3 gap-4 px-4 py-2 border-b border-zinc-800/50">
        <span className="text-[10px] font-mono text-zinc-600 uppercase">Property</span>
        <span className="text-[10px] font-mono text-[#F7931A] uppercase text-center">BTC</span>
        <span className="text-[10px] font-mono text-emerald-400 uppercase text-center">ZEC</span>
      </div>

      {/* Data rows */}
      {COMPARISON_DATA.map((row, i) => (
        <motion.div
          key={row.property}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + i * 0.05 }}
          className="grid grid-cols-3 gap-4 px-4 py-2.5 border-b border-zinc-800/30 last:border-b-0"
        >
          <span className="text-xs font-mono text-zinc-500">{row.property}</span>
          <span className="text-xs font-mono text-zinc-300 text-center">{row.btc}</span>
          <span className="text-xs font-mono text-zinc-300 text-center">{row.zec}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
