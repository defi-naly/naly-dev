'use client';

import { motion } from 'framer-motion';

interface Metric {
  label: string;
  value: string;
  subtext: string;
  status: 'negative' | 'positive' | 'warning';
}

const metrics: Metric[] = [
  {
    label: 'SNB Policy Rate',
    value: '0.00%',
    subtext: 'Swiss National Bank target rate',
    status: 'negative',
  },
  {
    label: 'DeFi CHF Demand',
    value: '3-5%',
    subtext: 'Yield appetite on CHF-denominated assets',
    status: 'positive',
  },
  {
    label: 'Yield Gap',
    value: '250-450 bps',
    subtext: 'Arbitrage opportunity spread',
    status: 'warning',
  },
  {
    label: 'CHF Stablecoin TVL',
    value: '<$50M',
    subtext: 'vs $150B+ USD stablecoin market',
    status: 'negative',
  },
];

const statusColors = {
  negative: { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  positive: { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  warning: { text: 'text-[#E53935]', bg: 'bg-red-50', border: 'border-[#E53935]/30' },
};

export default function ProblemSlide() {
  return (
    <div className="space-y-8">
      {/* Problem Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 bg-gray-50 border border-gray-200 rounded-lg"
      >
        <h3 className="text-lg font-sans font-semibold text-[#1A1A1A] mb-3">The Problem</h3>
        <p className="text-gray-600 font-sans leading-relaxed">
          Swiss franc holders face a structural disadvantage: the SNB&apos;s near-zero (or negative)
          rate policy means CHF savings earn nothing, while global DeFi protocols offer 3-5% yields
          on dollar-denominated stablecoins. There&apos;s no compliant bridge between Swiss capital
          and decentralized yield markets.
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            className={`p-5 bg-white border ${statusColors[metric.status].border} rounded-lg`}
          >
            <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-2">
              {metric.label}
            </p>
            <p className={`text-2xl font-sans font-bold ${statusColors[metric.status].text}`}>
              {metric.value}
            </p>
            <p className="text-xs font-sans text-gray-500 mt-1">
              {metric.subtext}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-3 p-4 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg"
      >
        <div className="w-2 h-2 rounded-full bg-[#E53935] flex-shrink-0" />
        <p className="text-[#1A1A1A] font-sans text-sm">
          <span className="font-semibold">This yield gap represents a $10B+ addressable market</span> of Swiss
          institutional and retail capital seeking compliant yield exposure.
        </p>
      </motion.div>

    </div>
  );
}
