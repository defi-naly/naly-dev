'use client';

import { motion } from 'framer-motion';
import { RedSquare } from './QuarterCircle';

// Rate sensitivity analysis across SNB environments
const rateSensitivity = [
  {
    env: 'Squeeze',
    snbRate: '-0.75%',
    borrowRate: '4.50%',
    supplyRate: '0.10%',
    bankCost: '-$750k',
    revenue: '$5.75M',
    highlight: true,
  },
  {
    env: 'Negative',
    snbRate: '-0.25%',
    borrowRate: '4.25%',
    supplyRate: '0.25%',
    bankCost: '-$250k',
    revenue: '$4.50M',
    highlight: false,
  },
  {
    env: 'Zero (Target)',
    snbRate: '0.00%',
    borrowRate: '4.00%',
    supplyRate: '0.50%',
    bankCost: '$0',
    revenue: '$3.50M',
    highlight: false,
  },
  {
    env: 'Current',
    snbRate: '0.50%',
    borrowRate: '3.75%',
    supplyRate: '0.75%',
    bankCost: '$0',
    revenue: '$2.75M',
    highlight: false,
  },
  {
    env: 'Elevated',
    snbRate: '1.50%',
    borrowRate: '3.25%',
    supplyRate: '1.25%',
    bankCost: '$0',
    revenue: '$1.75M',
    highlight: false,
  },
];

export default function UnitEconomicsSlide() {
  return (
    <div className="space-y-4">
      {/* Section 1: The Institutional Profit Model */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg"
      >
        <div className="flex items-start gap-3">
          <RedSquare size={16} className="flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[#1A1A1A] font-sans text-sm font-semibold mb-1">
              The Institutional Profit Model ($100M TVL)
            </h4>
            <p className="text-gray-600 font-sans text-xs leading-relaxed">
              100% focus on <span className="font-semibold text-[#E53935]">Tier 1 (Core)</span> assets (CHFS, USDC, Gold).
              Profitability driven by the <span className="font-semibold">Institutional Basis</span> —
              the gap between global demand for CHF liquidity and the SNB&apos;s local policy rate.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Section 2: Rate Sensitivity Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-2">
          Rate Sensitivity Analysis — Across SNB Environments
        </p>
        <table className="w-full text-xs font-sans">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-2 py-1.5 text-left text-gray-500">Environment</th>
              <th className="px-2 py-1.5 text-right text-gray-500">SNB Rate</th>
              <th className="px-2 py-1.5 text-right text-[#E53935]">Borrow Rate</th>
              <th className="px-2 py-1.5 text-right text-gray-500">Supply Rate</th>
              <th className="px-2 py-1.5 text-right text-gray-500">Bank Cost</th>
              <th className="px-2 py-1.5 text-right text-emerald-600 bg-emerald-50">Net Revenue</th>
            </tr>
          </thead>
          <tbody>
            {rateSensitivity.map((row, i) => (
              <motion.tr
                key={row.env}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.04 }}
                className={`border-b border-gray-100 ${row.highlight ? 'bg-red-50/30' : ''}`}
              >
                <td className="px-2 py-1.5">
                  <span className={`font-medium ${row.highlight ? 'text-[#E53935]' : 'text-gray-700'}`}>
                    {row.env}
                  </span>
                </td>
                <td className={`px-2 py-1.5 text-right font-medium ${
                  row.snbRate.startsWith('-') ? 'text-red-500' : 'text-gray-600'
                }`}>{row.snbRate}</td>
                <td className="px-2 py-1.5 text-right text-[#E53935] font-semibold">{row.borrowRate}</td>
                <td className="px-2 py-1.5 text-right text-gray-600">{row.supplyRate}</td>
                <td className={`px-2 py-1.5 text-right ${
                  row.bankCost.startsWith('-') ? 'text-red-500' : 'text-gray-500'
                }`}>{row.bankCost}</td>
                <td className="px-2 py-1.5 text-right text-emerald-600 font-semibold bg-emerald-50">{row.revenue}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        <p className="text-[10px] font-sans text-gray-400 mt-1.5">
          Based on 50% average utilization and 1:1 backing reserve strategy.
        </p>
      </motion.div>

      {/* Section 3: Why Revenue Spikes in Negative Markets */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-2"
      >
        <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-[10px] font-sans text-[#E53935] uppercase tracking-wider font-semibold mb-1">
            The &ldquo;Floor&rdquo; Effect
          </p>
          <p className="text-[10px] font-sans text-gray-600 leading-relaxed">
            Our <span className="font-semibold">Borrow Rate stays high</span> because it&apos;s anchored to global USD demand for carry trades, not local Swiss rates.
          </p>
        </div>
        <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-[10px] font-sans text-[#E53935] uppercase tracking-wider font-semibold mb-1">
            Zero Lower Bound Arbitrage
          </p>
          <p className="text-[10px] font-sans text-gray-600 leading-relaxed">
            Banks won&apos;t pass -0.75% to depositors. By offering <span className="font-semibold">0.10% yield</span>, we capture &ldquo;free&rdquo; liquidity from institutions escaping storage fees.
          </p>
        </div>
        <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-[10px] font-sans text-[#E53935] uppercase tracking-wider font-semibold mb-1">
            Operational Leverage
          </p>
          <p className="text-[10px] font-sans text-gray-600 leading-relaxed">
            At -0.75%, bank cost is $750k, but borrower revenue is <span className="font-semibold">$6.5M+</span> at 90% utilization. Demand surge offsets storage costs.
          </p>
        </div>
      </motion.div>

      {/* Section 4: Strategic Outlook */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-2"
      >
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p className="text-[10px] font-sans text-emerald-700 uppercase tracking-wider font-semibold mb-1">
            Dollar Debasement Hedge
          </p>
          <p className="text-[10px] font-sans text-emerald-700 leading-relaxed">
            As USD weakens, CHF strengthens as safe haven. Corporate hedgers <span className="font-semibold">must borrow CHF</span> to protect books — we charge a premium for liquidity.
          </p>
        </div>
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p className="text-[10px] font-sans text-emerald-700 uppercase tracking-wider font-semibold mb-1">
            SFTA Compliance
          </p>
          <p className="text-[10px] font-sans text-emerald-700 leading-relaxed">
            Our 3.50% – 4.50% rates align with <span className="font-semibold">2026 SFTA Safe Harbour</span> benchmarks — legally and tax-defensible for Swiss institutions.
          </p>
        </div>
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
          &ldquo;We have replaced &lsquo;Volatile Yield&rsquo; with <span className="text-[#E53935] font-semibold">Compliance Yield</span>.
          By removing BTC/Alts from the initial phase, we eliminate black-swan risk for banking partners.
          We profit from the <span className="text-emerald-600 font-semibold">Institutional Basis</span> —
          the persistent gap between global USD demand and the SNB&apos;s negative rate policy.&rdquo;
        </p>
      </motion.div>
    </div>
  );
}
