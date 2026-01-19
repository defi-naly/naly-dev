'use client';

export default function SummaryStats({ data }) {
  const { 
    generation, 
    erosion, 
    genRank, 
    totalGenerations,
    birthYear,
    finalPurchasingPower 
  } = data;
  
  // Generate brutal truth based on erosion
  const getBrutalTruth = () => {
    if (erosion >= 90) {
      return `The dollar you were born with barely exists anymore.`;
    }
    if (erosion >= 80) {
      return `Your dollar has lost more value than it kept.`;
    }
    if (erosion >= 70) {
      return `You've been alive for ${erosion.toFixed(0)}% of your dollar's death.`;
    }
    if (erosion >= 50) {
      return `More than half your purchasing power has evaporated.`;
    }
    return `Your generation has already lost ${erosion.toFixed(0)}% — and counting.`;
  };
  
  return (
    <div className="border border-neutral-800 bg-terminal-surface h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-neutral-800">
        <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
          Summary
        </span>
      </div>
      
      {/* Stats Grid */}
      <div className="p-4 flex-1">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Generation */}
          <div>
            <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-1">
              Generation
            </div>
            <div className="font-mono text-lg text-white">
              {generation}
            </div>
          </div>
          
          {/* Erosion */}
          <div>
            <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-1">
              Erosion
            </div>
            <div className="font-mono text-lg text-red-400">
              -{erosion.toFixed(1)}%
            </div>
          </div>
          
          {/* Rank */}
          <div>
            <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-1">
              Rank
            </div>
            <div className="font-mono text-lg text-white">
              #{genRank}<span className="text-neutral-500">/{totalGenerations}</span>
            </div>
          </div>
          
          {/* Remaining */}
          <div>
            <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-1">
              Remaining
            </div>
            <div className="font-mono text-lg text-terminal-accent">
              ${finalPurchasingPower.toFixed(2)}
            </div>
          </div>
        </div>
        
        {/* Brutal Truth */}
        <div className="p-4 border border-terminal-accent/30 bg-terminal-accent/5">
          <p className="font-mono text-sm text-neutral-300 leading-relaxed">
            "{getBrutalTruth()}"
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-4 py-3 border-t border-neutral-800 mt-auto">
        <p className="font-mono text-xs text-neutral-600">
          Based on CPI data from {birthYear} to 2024
        </p>
      </div>
    </div>
  );
}
