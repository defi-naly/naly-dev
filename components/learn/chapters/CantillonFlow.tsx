'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Printer, Building2, TrendingUp, Wallet, ShoppingCart } from 'lucide-react';

interface CantillonFlowProps {
  onComplete: () => void;
}

interface FlowNode {
  id: string;
  label: string;
  icon: React.ReactNode;
  gains?: { name: string; percent: number }[];
  emoji?: string;
}

const FLOW_NODES: FlowNode[] = [
  {
    id: 'printer',
    label: 'Money Printer',
    icon: <Printer className="w-6 h-6" />,
    emoji: '🖨️',
  },
  {
    id: 'banks',
    label: 'Banks',
    icon: <Building2 className="w-6 h-6" />,
    emoji: '🏦',
  },
  {
    id: 'assets',
    label: 'Assets',
    icon: <TrendingUp className="w-6 h-6" />,
    gains: [
      { name: 'Stocks', percent: 320 },
      { name: 'Houses', percent: 180 },
      { name: 'Gold', percent: 90 },
      { name: 'Bitcoin', percent: 9000 },
    ],
  },
  {
    id: 'wages',
    label: 'Wages',
    icon: <Wallet className="w-6 h-6" />,
    gains: [{ name: 'Wages', percent: 45 }],
    emoji: '💵',
  },
  {
    id: 'groceries',
    label: 'Groceries',
    icon: <ShoppingCart className="w-6 h-6" />,
    gains: [{ name: 'Prices', percent: 120 }],
    emoji: '🛒',
  },
];

const ANIMATION_DELAY = 1000;

type Phase = 'setup' | 'animating' | 'reveal';

export default function CantillonFlow({ onComplete }: CantillonFlowProps) {
  const [phase, setPhase] = useState<Phase>('setup');
  const [activeNode, setActiveNode] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);

  const handleStart = () => {
    setPhase('animating');
    setActiveNode(0);
  };

  // Animate through nodes
  useEffect(() => {
    if (phase !== 'animating') return;

    if (activeNode < FLOW_NODES.length - 1) {
      const timer = setTimeout(() => {
        setActiveNode(prev => prev + 1);
      }, ANIMATION_DELAY);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setPhase('reveal');
      }, ANIMATION_DELAY);
      return () => clearTimeout(timer);
    }
  }, [phase, activeNode]);

  // Complete chapter after reveal
  useEffect(() => {
    if (phase === 'reveal' && !isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        onComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [phase, isComplete, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-[450px]"
    >
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* PHASE 1: Setup */}
          {phase === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-6"
            >
              <p className="text-neutral-400 font-mono text-sm">
                So where does all that printed money go?
              </p>
              <p className="text-neutral-500 font-mono text-sm">
                Not into your pocket.
              </p>

              <motion.button
                onClick={handleStart}
                className="flex items-center gap-2 bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-6 py-3 rounded hover:bg-amber-400 transition-colors mx-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-4 h-4" />
                WATCH
              </motion.button>
            </motion.div>
          )}

          {/* PHASE 2 & 3: Animating and Reveal */}
          {(phase === 'animating' || phase === 'reveal') && (
            <motion.div
              key="flow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              {/* Flow Diagram */}
              <div className="relative">
                {FLOW_NODES.map((node, index) => {
                  const isActive = activeNode >= index;
                  const isCurrent = activeNode === index && phase === 'animating';
                  const isAssets = node.id === 'assets';

                  return (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0.3 }}
                      animate={{
                        opacity: isActive ? 1 : 0.3,
                        scale: isCurrent ? 1.02 : 1,
                      }}
                      className="mb-2"
                    >
                      {/* Arrow from previous node */}
                      {index > 0 && (
                        <div className="flex justify-center mb-2">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: isActive ? 20 : 0,
                              opacity: isActive ? 1 : 0,
                            }}
                            className={`w-0.5 ${
                              index <= 2 ? 'bg-amber-500' :
                              index === 3 ? 'bg-neutral-600' :
                              'bg-red-500'
                            }`}
                          />
                        </div>
                      )}

                      {/* Node */}
                      <div className={`p-3 bg-neutral-900 border rounded-lg ${
                        isActive
                          ? isCurrent
                            ? 'border-amber-500'
                            : 'border-neutral-700'
                          : 'border-neutral-800'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              isActive
                                ? index <= 2
                                  ? 'bg-amber-500/20 text-amber-500'
                                  : index === 3
                                  ? 'bg-neutral-700 text-neutral-400'
                                  : 'bg-red-500/20 text-red-400'
                                : 'bg-neutral-800 text-neutral-600'
                            }`}>
                              {node.icon}
                            </div>
                            <div>
                              <p className={`font-mono text-sm font-medium ${
                                isActive ? 'text-white' : 'text-neutral-600'
                              }`}>
                                {node.label}
                              </p>
                            </div>
                          </div>

                          {/* Gains */}
                          {node.gains && isActive && (
                            <motion.div
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex flex-wrap gap-2 justify-end"
                            >
                              {isAssets ? (
                                // Show asset grid
                                <div className="grid grid-cols-2 gap-1">
                                  {node.gains.map((gain) => (
                                    <span
                                      key={gain.name}
                                      className="text-emerald-500 font-mono text-xs"
                                    >
                                      {gain.name === 'Bitcoin' ? '₿' :
                                       gain.name === 'Stocks' ? '📈' :
                                       gain.name === 'Houses' ? '🏠' : '🥇'}
                                      +{gain.percent}%
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                node.gains.map((gain) => (
                                  <span
                                    key={gain.name}
                                    className={`font-mono text-sm font-bold ${
                                      node.id === 'wages'
                                        ? 'text-neutral-400'
                                        : 'text-red-400'
                                    }`}
                                  >
                                    +{gain.percent}%
                                  </span>
                                ))
                              )}
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Trickle indicator before wages */}
                      {node.id === 'assets' && activeNode >= 3 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center my-1"
                        >
                          <span className="text-neutral-600 font-mono text-xs">
                            ↓ trickle down ↓
                          </span>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Reveal Stats */}
              {phase === 'reveal' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center mt-4"
                >
                  <p className="text-amber-500 font-mono text-sm font-medium">
                    This is the Cantillon Effect.
                  </p>
                  <p className="text-neutral-400 font-mono text-xs mt-2">
                    New money reaches assets first. By the time it reaches you, prices already rose.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
