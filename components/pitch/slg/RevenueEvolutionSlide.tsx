'use client';

import { motion } from 'framer-motion';
import { RedSquare } from './QuarterCircle';

// Phase comparison data
const phases = [
  {
    phase: 'Stage 1',
    name: 'The Volatility Harvester',
    scale: '$50M – $100M TVL',
    strategy: 'Exploiting the Squeeze: Capturing high borrow rates from carry traders during currency spikes and safe-haven rotations.',
    margin: '250 – 500 bps',
    borrowers: 'Hedge funds, prop desks, arbitrageurs',
    role: 'Alpha Generator',
    roleDesc: 'High-conviction, high-margin revenue',
    color: 'red',
  },
  {
    phase: 'Stage 2',
    name: 'The Swiss Utility',
    scale: '$500M+ TVL',
    strategy: 'Market Integration: Providing the default, low-cost liquidity rail for Swiss institutional treasury management.',
    margin: '50 – 75 bps',
    borrowers: 'Pension funds, corporate treasurers, retail fintechs',
    role: 'Beta Infrastructure',
    roleDesc: 'Stable, predictable, scalable cash flow',
    color: 'emerald',
  },
];

export default function RevenueEvolutionSlide() {
  return (
    <div className="space-y-4">
      {/* Section 1: The Narrative Bridge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg"
      >
        <div className="flex items-start gap-3">
          <RedSquare size={16} className="flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[#1A1A1A] font-sans text-sm font-semibold mb-1">
              From Alpha to Utility
            </h4>
            <p className="text-gray-600 font-sans text-xs leading-relaxed">
              The profit model <span className="font-semibold text-[#E53935]">shifts as TVL grows</span>.
              We start by capturing high-margin &ldquo;inefficiencies&rdquo; and transition toward
              capturing massive, low-margin &ldquo;market share.&rdquo;
            </p>
          </div>
        </div>
      </motion.div>

      {/* Section 2: Phase Comparison */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-3"
      >
        {phases.map((p, i) => (
          <motion.div
            key={p.phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className={`p-3 rounded-lg border ${
              p.color === 'red'
                ? 'bg-[#E53935]/5 border-[#E53935]/30'
                : 'bg-emerald-50 border-emerald-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-semibold uppercase ${
                p.color === 'red' ? 'text-[#E53935]' : 'text-emerald-600'
              }`}>{p.phase}</span>
              <span className={`text-xs font-semibold ${
                p.color === 'red' ? 'text-[#E53935]' : 'text-emerald-600'
              }`}>{p.scale}</span>
            </div>
            <h4 className="text-[#1A1A1A] font-sans text-sm font-semibold mb-2">{p.name}</h4>
            <p className="text-[10px] font-sans text-gray-600 leading-relaxed mb-3">{p.strategy}</p>

            <div className="space-y-1.5 text-[10px] font-sans border-t border-gray-200 pt-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Net Margin:</span>
                <span className={`font-semibold ${p.color === 'red' ? 'text-[#E53935]' : 'text-emerald-600'}`}>{p.margin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Borrowers:</span>
                <span className="text-gray-700">{p.borrowers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Portfolio Role:</span>
                <span className={`font-semibold ${p.color === 'red' ? 'text-[#E53935]' : 'text-emerald-600'}`}>{p.role}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Section 3: Reconciling the Math */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-2">
          Reconciling the Math: $3.5M vs $2.5M
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-[10px] font-sans text-[#E53935] uppercase tracking-wider font-semibold mb-1">
              Early Alpha ($100M)
            </p>
            <p className="text-[10px] font-sans text-gray-600 leading-relaxed">
              Higher relative profit because it&apos;s optimized for <span className="font-semibold">&ldquo;Crisis Demand&rdquo;</span>.
              Traders gladly pay 4% for CHF liquidity during the Institutional Basis.
            </p>
          </div>
          <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-[10px] font-sans text-emerald-600 uppercase tracking-wider font-semibold mb-1">
              Scalable Utility ($500M)
            </p>
            <p className="text-[10px] font-sans text-gray-600 leading-relaxed">
              Borrow rates compress to 1.5%–2.0% to compete with traditional credit.
              We capture bulk of the <span className="font-semibold">$10B+ addressable market</span> with low-maintenance revenue.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Section 4: Black Swan Bonus */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-3 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg"
      >
        <p className="text-[10px] font-sans text-[#E53935] uppercase tracking-wider font-semibold mb-1">
          The &ldquo;Black Swan&rdquo; Bonus — Antifragile at Scale
        </p>
        <p className="text-[10px] font-sans text-gray-700 leading-relaxed">
          Even at utility scale, the Volatility Harvester logic remains <span className="font-semibold">dormant</span>.
          If SNB returns to -0.75%, the $500M pool instantly reverts to &ldquo;Squeeze&rdquo; mode:
          <span className="font-semibold text-[#E53935]"> $25M+ annualized revenue</span> vs the $2.5M floor we model.
        </p>
      </motion.div>

      {/* Section 5: Executive Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="p-3 bg-gray-50 border border-gray-200 rounded-lg"
      >
        <p className="text-[10px] font-sans text-gray-500 uppercase tracking-wider mb-1.5">
          Executive Summary
        </p>
        <p className="text-sm font-sans text-gray-700 leading-relaxed">
          &ldquo;We start as a <span className="text-[#E53935] font-semibold">High-Margin Gateway</span> for those who need liquidity most urgently.
          We scale into a <span className="text-emerald-600 font-semibold">High-Volume Utility</span> for the entire Swiss ecosystem.
          By $500M TVL, SLG is the de facto benchmark for on-chain Swiss Franc liquidity.&rdquo;
        </p>
      </motion.div>
    </div>
  );
}
