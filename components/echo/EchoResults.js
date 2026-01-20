'use client';

import { motion } from 'framer-motion';
import EchoCard from './EchoCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function EchoResults({ results, currentMetrics, metricsConfig }) {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
          Historical Echoes
        </span>
        <div className="flex-1 h-px bg-neutral-800" />
      </div>

      {/* Results Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {results.map((result, index) => (
          <motion.div key={result.year} variants={itemVariants}>
            <EchoCard
              result={result}
              rank={index + 1}
              currentMetrics={currentMetrics}
              metricsConfig={metricsConfig}
              defaultExpanded={index === 0}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="border border-neutral-800 bg-neutral-900/50 rounded-lg p-4"
      >
        <p className="font-mono text-xs text-neutral-500 leading-relaxed">
          <span className="text-neutral-400">Disclaimer:</span> Historical patterns are not predictive.
          Markets, policy tools, and global conditions have changed significantly.
          This tool identifies structural similarities, not guaranteed outcomes.
          Past performance does not predict future results.
        </p>
      </motion.div>

      {/* Data Sources */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="pt-4 border-t border-neutral-800"
      >
        <p className="font-mono text-[10px] text-neutral-600 leading-relaxed">
          <span className="text-neutral-500">Data Sources:</span>{' '}
          Debt/GDP from Federal Reserve FRED. CAPE ratio from Robert Shiller.{' '}
          Unemployment & CPI from Bureau of Labor Statistics.{' '}
          Fed Funds Rate from Federal Reserve.{' '}
          Top 1% wealth share from Piketty, Saez & Zucman (World Inequality Database).{' '}
          Polarization index from DW-NOMINATE congressional voting data.{' '}
          Gold prices from ICE Benchmark Administration, M2 from Federal Reserve.
        </p>
      </motion.div>
    </div>
  );
}
