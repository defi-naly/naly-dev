'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// CPI data approximation
const cpiByYear: Record<number, number> = {
  1971: 40.5,
  1980: 82.4,
  1990: 130.7,
  2000: 172.2,
  2010: 218.1,
  2024: 314.0,
};

const presetYears = [1971, 1990, 2000];

function getPurchasingPowerLoss(birthYear: number): number {
  // Interpolate CPI for birth year
  const years = Object.keys(cpiByYear).map(Number).sort((a, b) => a - b);
  let birthCPI = cpiByYear[1971]; // default

  for (let i = 0; i < years.length - 1; i++) {
    if (birthYear >= years[i] && birthYear <= years[i + 1]) {
      const ratio = (birthYear - years[i]) / (years[i + 1] - years[i]);
      birthCPI = cpiByYear[years[i]] + ratio * (cpiByYear[years[i + 1]] - cpiByYear[years[i]]);
      break;
    }
  }

  if (birthYear < 1971) birthCPI = cpiByYear[1971];
  if (birthYear > 2024) birthCPI = cpiByYear[2024];

  const currentCPI = cpiByYear[2024];
  const lossPercent = ((currentCPI - birthCPI) / currentCPI) * 100;
  return Math.round(lossPercent);
}

function getRealValue(birthYear: number): number {
  const loss = getPurchasingPowerLoss(birthYear);
  return Math.round(100 - loss);
}

export default function DecayCalculatorEmbed() {
  const [birthYear, setBirthYear] = useState(1990);
  const lossPercent = getPurchasingPowerLoss(birthYear);
  const realValue = getRealValue(birthYear);

  return (
    <div>
      {/* Input section */}
      <div className="mb-6">
        <label className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2 block">
          Enter your birth year
        </label>
        <div className="flex items-center gap-4">
          <input
            type="number"
            min="1920"
            max="2024"
            value={birthYear}
            onChange={(e) => setBirthYear(Number(e.target.value))}
            className="w-32 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-mono text-lg focus:outline-none focus:border-terminal-accent"
          />
          <div className="flex gap-2">
            {presetYears.map((year) => (
              <button
                key={year}
                onClick={() => setBirthYear(year)}
                className={`px-3 py-2 text-xs font-mono rounded-lg transition-all ${
                  birthYear === year
                    ? 'bg-terminal-accent/20 text-terminal-accent border border-terminal-accent/30'
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result visualization */}
      <div className="bg-zinc-900 rounded-lg p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
              Since {birthYear}
            </p>
            <p className="text-3xl sm:text-4xl font-mono font-light text-red-400">
              -{lossPercent}%
            </p>
            <p className="text-sm font-mono text-zinc-500 mt-1">
              purchasing power lost
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
              $100 then = today
            </p>
            <p className="text-3xl sm:text-4xl font-mono font-light text-white">
              ${realValue}
            </p>
            <p className="text-sm font-mono text-zinc-500 mt-1">
              real value
            </p>
          </div>
        </div>

        {/* Visual bar */}
        <div className="relative h-8 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
            initial={{ width: '100%' }}
            animate={{ width: `${100 - lossPercent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 bg-gradient-to-l from-red-500 to-red-600/50 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${lossPercent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <span className="text-xs font-mono text-white z-10">${realValue} kept</span>
            <span className="text-xs font-mono text-white z-10">${lossPercent} lost</span>
          </div>
        </div>
      </div>

      {/* Key fact */}
      <div className="p-3 bg-zinc-800/30 rounded-lg border-l-2 border-red-500">
        <p className="text-sm text-zinc-400">
          <span className="text-red-400 font-medium">Since 1971:</span> $100 → $17 in real purchasing power.
          The dollar has lost 83% of its value since Nixon ended the gold standard.
        </p>
      </div>
    </div>
  );
}
