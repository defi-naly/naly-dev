'use client';

import { motion } from 'framer-motion';
import { RedSquare } from './QuarterCircle';

// Macro scenarios
const macroScenarios = [
  {
    scenario: 'Dollar Debasement',
    subtitle: 'Fiscal Dominance',
    outlook: 'US debt forces Fed to keep rates low → weakening USD',
    chfImpact: 'Massive safe-haven inflow. CHF strengthens vertically.',
    squeeze: 'Swiss exporters lose 10-15% of USD-revenue value instantly.',
    revenue: 'Hedging demand triples. Firms pay 4% as "Insurance Premium."',
    color: 'amber',
  },
  {
    scenario: 'Global Liquidity Crunch',
    subtitle: 'The 2020 Model',
    outlook: 'Geopolitical "Black Swan" triggers rush for USD cash',
    chfImpact: 'Temporary dip as world chases USD liquidity.',
    squeeze: 'Interest rate gap becomes 500bps+ chasm (0% SNB vs spiking Fed).',
    revenue: 'Carry trade volume hits ceiling. 100% utilization + Risk Premiums.',
    color: 'blue',
  },
];

// Antifragile comparison
const antifragileComparison = [
  {
    entity: 'Traditional Banks',
    label: 'Fragile',
    behavior: 'Stop lending during crises to protect their own balance sheets.',
    color: 'red',
  },
  {
    entity: 'Our Spoke',
    label: 'Antifragile',
    behavior: 'Smart contracts automatically raise rates during high demand — always liquid, capturing highest margin when market is most desperate.',
    color: 'emerald',
  },
];

export default function AntifragilitySlide() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg"
      >
        <div className="flex items-start gap-3">
          <RedSquare size={16} className="flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[#1A1A1A] font-sans text-sm font-semibold mb-1">
              Designed for Chaos
            </h4>
            <p className="text-gray-600 font-sans text-xs leading-relaxed">
              Whether the Dollar collapses or the Franc spikes, our Spoke <span className="font-semibold text-[#E53935]">captures the spread</span>.
              We don&apos;t need a stable world — we need a volatile one.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Two Macro Scenarios */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-2">
          Macro Stress Scenarios
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {macroScenarios.map((item, index) => (
            <motion.div
              key={item.scenario}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="p-3 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${item.color === 'amber' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                <h4 className="text-[#1A1A1A] font-sans text-xs font-semibold">{item.scenario}</h4>
                <span className="text-gray-400 font-sans text-[10px]">({item.subtitle})</span>
              </div>

              <div className="space-y-1.5 text-[10px] font-sans">
                <div className="flex gap-2">
                  <span className="text-gray-400 w-14 flex-shrink-0">Outlook:</span>
                  <span className="text-gray-600">{item.outlook}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-400 w-14 flex-shrink-0">CHF:</span>
                  <span className="text-gray-600">{item.chfImpact}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-400 w-14 flex-shrink-0">Squeeze:</span>
                  <span className="text-gray-600">{item.squeeze}</span>
                </div>
                <div className="flex gap-2 pt-1 border-t border-gray-100">
                  <span className="text-[#E53935] w-14 flex-shrink-0 font-semibold">Revenue:</span>
                  <span className="text-[#E53935] font-medium">{item.revenue}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Fragile vs Antifragile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-2">
          Why We Are Antifragile
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {antifragileComparison.map((item) => (
            <div
              key={item.entity}
              className={`p-3 rounded-lg border ${
                item.color === 'red'
                  ? 'bg-red-50 border-red-200'
                  : 'bg-emerald-50 border-emerald-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-xs font-semibold ${
                  item.color === 'red' ? 'text-red-600' : 'text-emerald-600'
                }`}>
                  {item.entity}
                </span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                  item.color === 'red'
                    ? 'bg-red-200 text-red-700'
                    : 'bg-emerald-200 text-emerald-700'
                }`}>
                  {item.label}
                </span>
              </div>
              <p className={`text-[10px] leading-relaxed ${
                item.color === 'red' ? 'text-red-700' : 'text-emerald-700'
              }`}>
                {item.behavior}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Executive Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="p-3 bg-gray-50 border border-gray-200 rounded-lg"
      >
        <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-2">
          Executive Summary
        </p>
        <p className="text-sm font-sans text-gray-700 leading-relaxed">
          &ldquo;Most fintechs fear a currency crisis. We built our architecture to <span className="text-[#E53935] font-semibold">harvest it</span>.
          Whether the Dollar collapses or the Franc spikes, our Spoke captures the spread.
          We don&apos;t need a stable world; we need a <span className="text-emerald-600 font-semibold">volatile one</span>.&rdquo;
        </p>
      </motion.div>
    </div>
  );
}
