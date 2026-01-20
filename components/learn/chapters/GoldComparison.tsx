'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Eye } from 'lucide-react';

interface GoldComparisonProps {
  onComplete: () => void;
}

type ItemKey = 'fish' | 'shells' | 'cattle' | 'gold';
type PropertyKey = 'durable' | 'divisible' | 'portable' | 'scarce' | 'fungible';

interface Item {
  key: ItemKey;
  emoji: string;
  label: string;
}

interface Property {
  key: PropertyKey;
  label: string;
  description: string;
}

const ITEMS: Item[] = [
  { key: 'fish', emoji: '🐟', label: 'Fish' },
  { key: 'shells', emoji: '🐚', label: 'Shells' },
  { key: 'cattle', emoji: '🐄', label: 'Cattle' },
  { key: 'gold', emoji: '✨', label: 'Gold' },
];

const PROPERTIES: Property[] = [
  { key: 'durable', label: 'Durable', description: 'Doesn\'t rot or decay' },
  { key: 'divisible', label: 'Divisible', description: 'Can be split into smaller units' },
  { key: 'portable', label: 'Portable', description: 'Easy to carry and transport' },
  { key: 'scarce', label: 'Scarce', description: 'Limited supply, hard to create' },
  { key: 'fungible', label: 'Fungible', description: 'Each unit is interchangeable' },
];

// Correct answers: true = has property, false = doesn't
const ANSWERS: Record<ItemKey, Record<PropertyKey, boolean>> = {
  fish: { durable: false, divisible: true, portable: true, scarce: false, fungible: false },
  shells: { durable: true, divisible: false, portable: true, scarce: false, fungible: true },
  cattle: { durable: false, divisible: false, portable: false, scarce: false, fungible: false },
  gold: { durable: true, divisible: true, portable: true, scarce: true, fungible: true },
};

export default function GoldComparison({ onComplete }: GoldComparisonProps) {
  const [guesses, setGuesses] = useState<Record<string, boolean | null>>({});
  const [revealed, setRevealed] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const getCellKey = (item: ItemKey, property: PropertyKey) => `${item}-${property}`;

  const toggleGuess = (item: ItemKey, property: PropertyKey) => {
    if (revealed) return;

    const key = getCellKey(item, property);
    setGuesses(prev => {
      const current = prev[key];
      if (current === null || current === undefined) return { ...prev, [key]: true };
      if (current === true) return { ...prev, [key]: false };
      return { ...prev, [key]: null };
    });
  };

  const getGuess = (item: ItemKey, property: PropertyKey): boolean | null => {
    return guesses[getCellKey(item, property)] ?? null;
  };

  const handleReveal = () => {
    setRevealed(true);
  };

  useEffect(() => {
    if (revealed && !isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [revealed, isComplete, onComplete]);

  const getScore = (item: ItemKey): number => {
    return PROPERTIES.filter(p => ANSWERS[item][p.key]).length;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Instructions */}
      <div className="text-center">
        <p className="text-neutral-400 font-mono text-sm">
          {revealed
            ? 'Gold checks all the boxes. That\'s why it became money.'
            : 'Click cells to mark which items have each property. Then reveal the answers.'
          }
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full font-mono text-sm">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="p-3 text-left text-neutral-500 font-normal">Property</th>
              {ITEMS.map(item => (
                <th
                  key={item.key}
                  className={`p-3 text-center font-medium ${
                    item.key === 'gold' ? 'text-amber-500' : 'text-neutral-400'
                  }`}
                >
                  <span className="text-xl block mb-1">{item.emoji}</span>
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROPERTIES.map((property, propIndex) => (
              <motion.tr
                key={property.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: propIndex * 0.05 }}
                className="border-b border-neutral-800"
              >
                <td className="p-3">
                  <div className="text-neutral-300">{property.label}</div>
                  <div className="text-neutral-600 text-xs">{property.description}</div>
                </td>
                {ITEMS.map(item => {
                  const guess = getGuess(item.key, property.key);
                  const answer = ANSWERS[item.key][property.key];
                  const isGold = item.key === 'gold';

                  return (
                    <td key={item.key} className="p-3 text-center">
                      <motion.button
                        onClick={() => toggleGuess(item.key, property.key)}
                        disabled={revealed}
                        className={`w-10 h-10 rounded flex items-center justify-center transition-all ${
                          revealed
                            ? answer
                              ? 'bg-emerald-500/20 border border-emerald-500/50'
                              : 'bg-neutral-800 border border-neutral-700'
                            : guess === null
                            ? 'bg-neutral-800 border border-neutral-700 hover:border-neutral-600 cursor-pointer'
                            : guess
                            ? 'bg-emerald-500/20 border border-emerald-500/50 cursor-pointer'
                            : 'bg-red-500/20 border border-red-500/50 cursor-pointer'
                        } ${isGold && revealed && answer ? 'ring-2 ring-amber-500/50' : ''}`}
                        whileHover={!revealed ? { scale: 1.1 } : {}}
                        whileTap={!revealed ? { scale: 0.95 } : {}}
                      >
                        {revealed ? (
                          answer ? (
                            <Check className={`w-5 h-5 ${isGold ? 'text-amber-500' : 'text-emerald-500'}`} />
                          ) : (
                            <X className="w-5 h-5 text-neutral-500" />
                          )
                        ) : guess === true ? (
                          <Check className="w-5 h-5 text-emerald-500" />
                        ) : guess === false ? (
                          <X className="w-5 h-5 text-red-400" />
                        ) : (
                          <span className="text-neutral-600">?</span>
                        )}
                      </motion.button>
                    </td>
                  );
                })}
              </motion.tr>
            ))}

            {/* Score Row */}
            {revealed && (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <td className="p-3 font-medium text-neutral-300">Score</td>
                {ITEMS.map(item => (
                  <td
                    key={item.key}
                    className={`p-3 text-center font-bold ${
                      item.key === 'gold' ? 'text-amber-500 text-lg' : 'text-neutral-400'
                    }`}
                  >
                    {getScore(item.key)}/5
                  </td>
                ))}
              </motion.tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Reveal Button */}
      {!revealed && (
        <div className="flex justify-center">
          <motion.button
            onClick={handleReveal}
            className="flex items-center gap-2 bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-6 py-3 rounded hover:bg-amber-400 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Eye className="w-4 h-4" />
            REVEAL ANSWERS
          </motion.button>
        </div>
      )}

      {/* Insight */}
      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center"
        >
          <p className="text-amber-500 font-mono text-sm font-medium">
            Gold: 5/5. Fish: 2/5. Cattle: 0/5.
          </p>
          <p className="text-neutral-400 font-mono text-xs mt-2">
            Gold isn't money because it's shiny. It's money because it works.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
