'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight } from 'lucide-react';

interface BarterGameProps {
  onComplete: () => void;
}

type Item = 'fish' | 'carrots' | 'bread' | 'wood' | 'hammer';

interface NPC {
  id: string;
  name: string;
  has: Item;
  wants: Item;
  emoji: string;
}

const ITEMS: Record<Item, { emoji: string; label: string }> = {
  fish: { emoji: '🐟', label: 'Fish' },
  carrots: { emoji: '🥕', label: 'Carrots' },
  bread: { emoji: '🍞', label: 'Bread' },
  wood: { emoji: '🪵', label: 'Wood' },
  hammer: { emoji: '🔨', label: 'Hammer' },
};

const NPCS: NPC[] = [
  { id: 'farmer', name: 'Farmer', has: 'carrots', wants: 'fish', emoji: '👨‍🌾' },
  { id: 'baker', name: 'Baker', has: 'bread', wants: 'carrots', emoji: '👨‍🍳' },
  { id: 'lumber', name: 'Lumberjack', has: 'wood', wants: 'bread', emoji: '🪓' },
  { id: 'smith', name: 'Blacksmith', has: 'hammer', wants: 'wood', emoji: '⚒️' },
];

interface TradeLog {
  success: boolean;
  message: string;
}

export default function BarterGame({ onComplete }: BarterGameProps) {
  const [inventory, setInventory] = useState<Item>('fish');
  const [tradeLog, setTradeLog] = useState<TradeLog[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [tradeCount, setTradeCount] = useState(0);

  useEffect(() => {
    if (inventory === 'hammer') {
      setIsComplete(true);
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [inventory, onComplete]);

  const attemptTrade = (npc: NPC) => {
    if (isComplete) return;

    if (npc.wants === inventory) {
      // Successful trade
      setTradeLog(prev => [...prev, {
        success: true,
        message: `${ITEMS[inventory].emoji} → ${npc.name} → ${ITEMS[npc.has].emoji} ${ITEMS[npc.has].label}`,
      }]);
      setInventory(npc.has);
      setTradeCount(prev => prev + 1);
    } else {
      // Failed trade
      setTradeLog(prev => [...prev, {
        success: false,
        message: `${npc.name} doesn't want ${ITEMS[inventory].label}. Wants ${ITEMS[npc.wants].label}.`,
      }]);
    }
  };

  const canTradeWith = (npc: NPC) => npc.wants === inventory;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Goal */}
      <div className="text-center">
        <span className="text-neutral-500 font-mono text-xs uppercase tracking-wider">
          Goal: Get a hammer to fix your boat
        </span>
      </div>

      {/* Inventory */}
      <div className="flex justify-center">
        <motion.div
          key={inventory}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg inline-flex items-center gap-3"
        >
          <span className="text-neutral-500 font-mono text-xs uppercase">You have:</span>
          <span className="text-3xl">{ITEMS[inventory].emoji}</span>
          <span className="text-white font-mono font-medium">{ITEMS[inventory].label}</span>
        </motion.div>
      </div>

      {/* NPCs */}
      <div>
        <p className="text-neutral-500 font-mono text-xs uppercase tracking-wider mb-3 text-center">
          Trade with:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {NPCS.map((npc) => {
            const canTrade = canTradeWith(npc);
            const alreadyHas = inventory === npc.has;

            return (
              <motion.button
                key={npc.id}
                onClick={() => attemptTrade(npc)}
                disabled={isComplete || alreadyHas}
                className={`p-4 bg-neutral-900 border rounded-lg text-center transition-all ${
                  alreadyHas
                    ? 'border-neutral-800 opacity-40 cursor-not-allowed'
                    : canTrade
                    ? 'border-amber-500/50 hover:border-amber-500 cursor-pointer'
                    : 'border-neutral-800 hover:border-neutral-700 cursor-pointer'
                }`}
                whileHover={!isComplete && !alreadyHas ? { scale: 1.02 } : {}}
                whileTap={!isComplete && !alreadyHas ? { scale: 0.98 } : {}}
              >
                <div className="text-2xl mb-2">{npc.emoji}</div>
                <div className="text-white font-mono text-sm font-medium">{npc.name}</div>
                <div className="mt-2 text-xs font-mono text-neutral-500">
                  Has: {ITEMS[npc.has].emoji} {ITEMS[npc.has].label}
                </div>
                <div className="text-xs font-mono text-neutral-600">
                  Wants: {ITEMS[npc.wants].emoji} {ITEMS[npc.wants].label}
                </div>
                {canTrade && !alreadyHas && (
                  <div className="mt-2 text-xs font-mono text-amber-500">
                    Will trade
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Trade Log */}
      {tradeLog.length > 0 && (
        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg">
          <p className="text-neutral-500 font-mono text-xs uppercase tracking-wider mb-2">
            Trade Log:
          </p>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            <AnimatePresence>
              {tradeLog.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-2 font-mono text-xs ${
                    log.success ? 'text-emerald-500' : 'text-red-400'
                  }`}
                >
                  {log.success ? (
                    <Check className="w-3 h-3 flex-shrink-0" />
                  ) : (
                    <X className="w-3 h-3 flex-shrink-0" />
                  )}
                  <span>{log.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Completion */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center"
          >
            <p className="text-amber-500 font-mono text-sm font-medium">
              You got the hammer — but it took {tradeCount} trades.
            </p>
            <p className="text-neutral-400 font-mono text-xs mt-2">
              Imagine doing this for everything you need.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
