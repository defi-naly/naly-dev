'use client';

import { TrendingDown, Briefcase, Timer, Landmark } from 'lucide-react';

export default function OutcomePanel({ outcome }) {
  const {
    marketDrawdown,
    recoveryYears,
    peakUnemployment,
    monthsToBottom,
    narrative,
    policyResponse,
  } = outcome;

  return (
    <div>
      <div className="mb-4">
        <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
          What Happened Next
        </span>
      </div>

      {/* Narrative */}
      <p className="font-mono text-sm text-neutral-300 leading-relaxed mb-4">
        {narrative}
      </p>

      {/* Key Outcomes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-neutral-800/50 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingDown className="w-3 h-3 text-red-400" />
            <span className="font-mono text-[10px] text-neutral-500 uppercase">Market</span>
          </div>
          <span className="font-mono text-base text-red-400">{marketDrawdown}%</span>
        </div>

        <div className="bg-neutral-800/50 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Briefcase className="w-3 h-3 text-amber-400" />
            <span className="font-mono text-[10px] text-neutral-500 uppercase">Jobs Peak</span>
          </div>
          <span className="font-mono text-base text-amber-400">{peakUnemployment}%</span>
        </div>

        <div className="bg-neutral-800/50 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Timer className="w-3 h-3 text-neutral-400" />
            <span className="font-mono text-[10px] text-neutral-500 uppercase">Bottom</span>
          </div>
          <span className="font-mono text-base text-neutral-300">{monthsToBottom} mo</span>
        </div>

        <div className="bg-neutral-800/50 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Timer className="w-3 h-3 text-terminal-accent" />
            <span className="font-mono text-[10px] text-neutral-500 uppercase">Recovery</span>
          </div>
          <span className="font-mono text-base text-terminal-accent">{recoveryYears} yr</span>
        </div>
      </div>

      {/* Policy Response */}
      {policyResponse && (
        <div className="bg-neutral-800/30 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Landmark className="w-3 h-3 text-neutral-500" />
            <span className="font-mono text-[10px] text-neutral-500 uppercase">Policy Response</span>
          </div>
          <p className="font-mono text-xs text-neutral-400 leading-relaxed">
            {policyResponse}
          </p>
        </div>
      )}
    </div>
  );
}
