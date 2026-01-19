'use client';

import { useState, useEffect } from 'react';

const loadingMessages = [
  'ACCESSING FEDERAL RESERVE DATA...',
  'CALCULATING PURCHASING POWER DECAY...',
  'ANALYZING BASKET OF GOODS...',
  'MEASURING EROSION...',
  'COMPLETE.',
];

export default function TimeMachineLoading() {
  const [visibleLines, setVisibleLines] = useState([]);
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < loadingMessages.length) {
        setVisibleLines(prev => [...prev, loadingMessages[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 280);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="border border-neutral-800 bg-terminal-surface p-4 font-mono text-sm">
      {visibleLines.map((line, i) => (
        <div 
          key={i} 
          className={`flex items-center gap-2 ${
            i === visibleLines.length - 1 && line === 'COMPLETE.'
              ? 'text-terminal-accent'
              : 'text-neutral-400'
          }`}
        >
          <span className="text-terminal-accent">&gt;</span>
          <span>{line}</span>
          {i === visibleLines.length - 1 && line !== 'COMPLETE.' && (
            <span className="w-2 h-4 bg-terminal-accent animate-blink" />
          )}
        </div>
      ))}
    </div>
  );
}
