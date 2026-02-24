'use client';

import { motion } from 'framer-motion';
import { BTC_BLOCK_REWARD, BTC_ANNUAL_INFLATION } from '@/data/shadow';

interface EmissionCardProps {
  zecBlockReward: number;
  zecDailyEmission: number;
  zecAnnualInflation: number;
  nextHalvingDate: string;
  daysUntilHalving: number;
  btcEquivDate: string;
  zecAgeDays: number;
}

export default function EmissionCard({
  zecBlockReward,
  zecDailyEmission,
  zecAnnualInflation,
  nextHalvingDate,
  daysUntilHalving,
  btcEquivDate,
  zecAgeDays,
}: EmissionCardProps) {
  const btcEquivYear = new Date(btcEquivDate).getFullYear();
  const zecYears = Math.floor(zecAgeDays / 365);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4"
    >
      <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">
        Emission
      </h3>

      {/* Next halving countdown */}
      <div className="mb-4">
        <div className="text-xs text-zinc-500 font-mono mb-1">Next ZEC Halving</div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-mono text-amber-400">
            ~{daysUntilHalving.toLocaleString()}
          </span>
          <span className="text-xs font-mono text-zinc-500">days</span>
        </div>
        <div className="text-[10px] font-mono text-zinc-600 mt-0.5">
          Epoch 3 — {new Date(nextHalvingDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </div>
      </div>

      {/* Block rewards comparison */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <div className="text-[10px] font-mono text-zinc-600 mb-1">ZEC Block Reward</div>
          <div className="text-sm font-mono text-emerald-400">{zecBlockReward} ZEC</div>
          <div className="text-[10px] font-mono text-zinc-600">
            {zecDailyEmission.toFixed(0)}/day
          </div>
        </div>
        <div>
          <div className="text-[10px] font-mono text-zinc-600 mb-1">BTC Block Reward</div>
          <div className="text-sm font-mono text-[#F7931A]">{BTC_BLOCK_REWARD} BTC</div>
          <div className="text-[10px] font-mono text-zinc-600">450/day</div>
        </div>
      </div>

      {/* Inflation rates */}
      <div className="grid grid-cols-2 gap-3 mb-4 pt-3 border-t border-zinc-800/50">
        <div>
          <div className="text-[10px] font-mono text-zinc-600 mb-1">ZEC Inflation</div>
          <div className="text-sm font-mono text-zinc-300">~{zecAnnualInflation}%</div>
        </div>
        <div>
          <div className="text-[10px] font-mono text-zinc-600 mb-1">BTC Inflation</div>
          <div className="text-sm font-mono text-zinc-300">~{BTC_ANNUAL_INFLATION}%</div>
        </div>
      </div>

      {/* BTC equivalent epoch */}
      <div className="pt-3 border-t border-zinc-800/50">
        <div className="text-[10px] font-mono text-zinc-600 mb-1">ZEC Maturity Equivalent</div>
        <div className="text-sm font-mono text-zinc-300">
          BTC&apos;s ~Day {zecAgeDays.toLocaleString()}{' '}
          <span className="text-zinc-500">({'\u2248'} Year {btcEquivYear})</span>
        </div>
        <div className="text-[10px] font-mono text-zinc-600 mt-0.5">
          ZEC is {zecYears} years into its cycle
        </div>
      </div>
    </motion.div>
  );
}
