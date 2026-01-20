'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

interface CantillonFlowProps {
  onComplete: () => void;
}

interface FlowNode {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  level: number;
}

const NODES: FlowNode[] = [
  { id: 'printer', label: 'PRINTER', x: 200, y: 30, level: 0 },
  { id: 'banks', label: 'BANKS', x: 200, y: 90, level: 1 },
  { id: 'stocks', label: 'STOCKS', sublabel: '+320%', x: 65, y: 160, level: 2 },
  { id: 'houses', label: 'HOUSES', sublabel: '+180%', x: 140, y: 160, level: 2 },
  { id: 'gold', label: 'GOLD', sublabel: '+90%', x: 215, y: 160, level: 2 },
  { id: 'btc', label: 'BTC', sublabel: '+9000%', x: 290, y: 160, level: 2 },
  { id: 'wages', label: 'WAGES', sublabel: '+45%', x: 200, y: 240, level: 3 },
  { id: 'groceries', label: 'GROCERIES', sublabel: '+120%', x: 200, y: 310, level: 4 },
];

interface Edge {
  from: string;
  to: string;
  dashed?: boolean;
}

const EDGES: Edge[] = [
  { from: 'printer', to: 'banks' },
  { from: 'banks', to: 'stocks' },
  { from: 'banks', to: 'houses' },
  { from: 'banks', to: 'gold' },
  { from: 'banks', to: 'btc' },
  { from: 'banks', to: 'wages', dashed: true },
  { from: 'wages', to: 'groceries' },
];

type Phase = 'setup' | 'animating' | 'reveal';

const ANIMATION_DELAY = 1500;

export default function CantillonFlow({ onComplete }: CantillonFlowProps) {
  const [phase, setPhase] = useState<Phase>('setup');
  const [activeLevel, setActiveLevel] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);

  const handleStart = () => {
    setPhase('animating');
    setActiveLevel(0);
  };

  useEffect(() => {
    if (phase !== 'animating') return;

    if (activeLevel < 4) {
      const timer = setTimeout(() => {
        setActiveLevel(prev => prev + 1);
      }, ANIMATION_DELAY);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setPhase('reveal');
      }, ANIMATION_DELAY);
      return () => clearTimeout(timer);
    }
  }, [phase, activeLevel]);

  useEffect(() => {
    if (phase === 'reveal' && !isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        onComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [phase, isComplete, onComplete]);

  const isNodeActive = (node: FlowNode) => activeLevel >= node.level;

  const isEdgeActive = (edge: Edge) => {
    const fromNode = NODES.find(n => n.id === edge.from);
    const toNode = NODES.find(n => n.id === edge.to);
    if (!fromNode || !toNode) return false;
    return activeLevel >= toNode.level;
  };

  const getNodeColor = (node: FlowNode, isActive: boolean) => {
    if (!isActive) return { stroke: '#3f3f46', fill: '#18181b', text: '#52525b', sublabel: '#52525b' };

    if (node.level <= 2) {
      return { stroke: '#f59e0b', fill: '#18181b', text: '#fafafa', sublabel: '#10b981' };
    }
    if (node.id === 'wages') {
      return { stroke: '#52525b', fill: '#18181b', text: '#a1a1aa', sublabel: '#a1a1aa' };
    }
    return { stroke: '#ef4444', fill: '#18181b', text: '#fafafa', sublabel: '#ef4444' };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-[450px]"
    >
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {phase === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-6"
            >
              <p className="text-neutral-400 font-mono text-sm">
                Where does printed money go?
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

          {(phase === 'animating' || phase === 'reveal') && (
            <motion.div
              key="flow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <svg viewBox="0 0 400 360" className="w-full max-w-md mx-auto">
                {/* Edges */}
                {EDGES.map((edge, i) => {
                  const fromNode = NODES.find(n => n.id === edge.from)!;
                  const toNode = NODES.find(n => n.id === edge.to)!;
                  const isActive = isEdgeActive(edge);

                  const fromY = fromNode.y + 18;
                  const toY = toNode.y - 14;

                  return (
                    <motion.line
                      key={i}
                      x1={fromNode.x}
                      y1={fromY}
                      x2={toNode.x}
                      y2={toY}
                      stroke={isActive ? (edge.dashed ? '#52525b' : '#f59e0b') : '#27272a'}
                      strokeWidth={edge.dashed ? 1 : 2}
                      strokeDasharray={edge.dashed ? '4 4' : undefined}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isActive ? 1 : 0.2 }}
                      transition={{ duration: 0.5 }}
                    />
                  );
                })}

                {/* Trickle down label */}
                {activeLevel >= 3 && (
                  <motion.text
                    x="200"
                    y="205"
                    textAnchor="middle"
                    className="font-mono text-[10px] fill-zinc-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    (trickle down)
                  </motion.text>
                )}

                {/* Nodes */}
                {NODES.map((node) => {
                  const isActive = isNodeActive(node);
                  const colors = getNodeColor(node, isActive);
                  const nodeWidth = node.sublabel ? 60 : 55;
                  const nodeHeight = node.sublabel ? 32 : 24;

                  return (
                    <motion.g
                      key={node.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: isActive ? 1 : 0.3,
                        scale: isActive ? 1 : 0.95
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <rect
                        x={node.x - nodeWidth / 2}
                        y={node.y - nodeHeight / 2}
                        width={nodeWidth}
                        height={nodeHeight}
                        rx="4"
                        fill={colors.fill}
                        stroke={colors.stroke}
                        strokeWidth="1.5"
                      />
                      <text
                        x={node.x}
                        y={node.sublabel ? node.y - 2 : node.y + 4}
                        textAnchor="middle"
                        fill={colors.text}
                        className="font-mono text-[10px]"
                      >
                        {node.label}
                      </text>
                      {node.sublabel && (
                        <text
                          x={node.x}
                          y={node.y + 11}
                          textAnchor="middle"
                          fill={colors.sublabel}
                          className="font-mono text-[9px] font-medium"
                        >
                          {node.sublabel}
                        </text>
                      )}
                    </motion.g>
                  );
                })}
              </svg>

              {phase === 'reveal' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center"
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
