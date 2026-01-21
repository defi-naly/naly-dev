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

  const topMatch = results[0];
  const otherMatches = results.slice(1);

  return (
    <div className="space-y-6">
      {/* Top Match - Featured */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 border border-zinc-800 rounded-lg p-6"
      >
        <div className="text-xs text-zinc-500 font-mono uppercase tracking-wide mb-4">
          Strongest Match
        </div>
        <div className="flex items-end justify-between mb-4">
          <div className="text-5xl font-mono font-semibold text-amber-500">
            {topMatch.year}
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono text-zinc-100">{topMatch.similarity}%</div>
            <div className="text-xs text-zinc-500">similarity</div>
          </div>
        </div>
        <div className="text-sm text-zinc-300 mb-1">
          {topMatch.name}
        </div>
        <div className="text-[10px] font-mono text-zinc-600 mb-4">
          {topMatch.type?.replace('_', ' ').toUpperCase()}
        </div>

        {/* Outcome Stats */}
        {topMatch.outcome && (
          <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-zinc-950 rounded border border-zinc-800">
            <div>
              <div className="text-xs text-zinc-600 font-mono">drawdown</div>
              <div className="text-lg font-mono text-red-400">{topMatch.outcome.marketDrawdown}%</div>
            </div>
            <div>
              <div className="text-xs text-zinc-600 font-mono">recovery</div>
              <div className="text-lg font-mono text-zinc-300">{topMatch.outcome.recoveryYears}y</div>
            </div>
            <div>
              <div className="text-xs text-zinc-600 font-mono">peak unemp</div>
              <div className="text-lg font-mono text-zinc-300">{topMatch.outcome.peakUnemployment}%</div>
            </div>
          </div>
        )}

        <div className="text-sm text-zinc-400 mb-4">
          {topMatch.outcome?.narrative || topMatch.context}
        </div>

        {/* Resolution */}
        {topMatch.resolution && (
          <div className="pt-4 border-t border-zinc-800">
            <div className="text-xs text-zinc-500 font-mono uppercase mb-2">How it resolved:</div>
            <div className="text-sm text-zinc-300">{topMatch.resolution}</div>
          </div>
        )}
      </motion.div>

      {/* Why This Time Might Be Different */}
      {topMatch.echoBreakerReasons && topMatch.echoBreakerReasons.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-zinc-900 border border-zinc-800 rounded-lg p-6"
        >
          <div className="text-xs text-zinc-500 font-mono uppercase tracking-wide mb-4">
            Why This Time Might Be Different
          </div>
          <ul className="space-y-2">
            {topMatch.echoBreakerReasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="text-emerald-500 mt-0.5">+</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Matching Factors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-zinc-900 border border-zinc-800 rounded-lg p-6"
      >
        <div className="text-xs text-zinc-500 font-mono uppercase tracking-wide mb-4">
          Matching Factors
        </div>
        <div className="space-y-3">
          {Object.entries(metricsConfig).map(([key, config]) => {
            const currentVal = currentMetrics[key];
            const historicalVal = topMatch.metrics[key];
            if (currentVal === undefined || historicalVal === undefined) return null;

            return (
              <div key={key} className="flex items-center justify-between">
                <div className="text-sm text-zinc-400">{config.description}</div>
                <div className="flex items-center gap-3 font-mono text-sm">
                  <span className="text-zinc-500">
                    Now: {config.unit === '%' ? `${currentVal}%` : currentVal}
                  </span>
                  <span className="text-zinc-600">→</span>
                  <span className="text-amber-500">
                    {topMatch.year}: {config.unit === '%' ? `${historicalVal}%` : historicalVal}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Other Matches */}
      {otherMatches.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900 border border-zinc-800 rounded-lg p-6"
        >
          <div className="text-xs text-zinc-500 font-mono uppercase tracking-wide mb-4">
            Other Matches
          </div>
          <div className="space-y-2">
            {otherMatches.map((match) => (
              <div key={match.year} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
                <div>
                  <span className="text-zinc-100 font-mono">{match.year}</span>
                  <span className="text-zinc-500 ml-3">{match.name}</span>
                </div>
                <span className="text-sm font-mono text-zinc-400">{match.similarity}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="border border-zinc-800 bg-zinc-900/50 rounded-lg p-4"
      >
        <p className="font-mono text-xs text-zinc-500 leading-relaxed">
          <span className="text-zinc-400">Disclaimer:</span> Historical patterns are not predictive.
          Markets, policy tools, and global conditions have changed significantly.
          This tool identifies structural similarities, not guaranteed outcomes.
        </p>
      </motion.div>
    </div>
  );
}
