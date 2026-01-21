'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, TrendingDown, Users, Clock, AlertTriangle } from 'lucide-react';
import ComparisonTable from './ComparisonTable';
import OutcomePanel from './OutcomePanel';

function getSimilarityColor(similarity) {
  if (similarity >= 80) return 'text-red-400';
  if (similarity >= 60) return 'text-amber-400';
  return 'text-terminal-accent';
}

function getSimilarityBg(similarity) {
  if (similarity >= 80) return 'bg-red-500/10 border-red-500/30';
  if (similarity >= 60) return 'bg-amber-500/10 border-amber-500/30';
  return 'bg-terminal-accent/10 border-terminal-accent/30';
}

export default function EchoCard({
  result,
  rank,
  currentMetrics,
  metricsConfig,
  defaultExpanded = false,
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const { year, name, similarity, outcome, echoBreakerReasons, resolution } = result;
  const similarityColor = getSimilarityColor(similarity);
  const similarityBg = getSimilarityBg(similarity);

  return (
    <div className="border border-neutral-800 bg-terminal-surface rounded-lg overflow-hidden">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-4 flex items-center justify-between hover:bg-neutral-800/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          {/* Rank badge */}
          <span className="font-mono text-xs text-neutral-600">#{rank}</span>

          {/* Year and name */}
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-mono text-lg text-white">{year}</span>
              <span className="text-neutral-400">—</span>
              <span className="text-neutral-300">{name}</span>
            </div>
            {resolution && (
              <p className="text-xs text-neutral-500 mt-1 max-w-md">
                Resolved: {resolution}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Similarity badge */}
          <div className={`px-3 py-1 rounded-full border ${similarityBg}`}>
            <span className={`font-mono text-sm font-medium ${similarityColor}`}>
              {similarity}% MATCH
            </span>
          </div>

          {/* Expand icon */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-neutral-500" />
          </motion.div>
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-t border-neutral-800">
              {/* Quick Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-neutral-800">
                <div className="bg-terminal-surface px-4 py-3">
                  <div className="flex items-center gap-2 text-neutral-500 mb-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span className="font-mono text-[10px] uppercase">Market</span>
                  </div>
                  <span className="font-mono text-lg text-red-400">
                    {outcome.marketDrawdown}%
                  </span>
                </div>

                <div className="bg-terminal-surface px-4 py-3">
                  <div className="flex items-center gap-2 text-neutral-500 mb-1">
                    <Users className="w-3.5 h-3.5" />
                    <span className="font-mono text-[10px] uppercase">Unemployment</span>
                  </div>
                  <span className="font-mono text-lg text-amber-400">
                    {outcome.peakUnemployment}%
                  </span>
                </div>

                <div className="bg-terminal-surface px-4 py-3">
                  <div className="flex items-center gap-2 text-neutral-500 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-mono text-[10px] uppercase">To Bottom</span>
                  </div>
                  <span className="font-mono text-lg text-neutral-300">
                    {outcome.monthsToBottom}mo
                  </span>
                </div>

                <div className="bg-terminal-surface px-4 py-3">
                  <div className="flex items-center gap-2 text-neutral-500 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-mono text-[10px] uppercase">Recovery</span>
                  </div>
                  <span className="font-mono text-lg text-terminal-accent">
                    {outcome.recoveryYears}yr
                  </span>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="p-4 border-t border-neutral-800">
                <ComparisonTable
                  currentMetrics={currentMetrics}
                  historicalMetrics={result.metrics}
                  metricsConfig={metricsConfig}
                  year={year}
                />
              </div>

              {/* Outcome Panel */}
              <div className="p-4 border-t border-neutral-800">
                <OutcomePanel outcome={outcome} />
              </div>

              {/* Echo Breaker Reasons */}
              {echoBreakerReasons && echoBreakerReasons.length > 0 && (
                <div className="p-4 border-t border-neutral-800 bg-neutral-900/50">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-terminal-accent" />
                    <span className="font-mono text-xs text-terminal-accent uppercase tracking-wider">
                      Why This Echo Might Break
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {echoBreakerReasons.map((reason, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 font-mono text-sm text-neutral-400"
                      >
                        <span className="text-neutral-600">•</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
