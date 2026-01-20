'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, Building2, TrendingUp, Briefcase, User, Play } from 'lucide-react';

interface AssetFlowVizProps {
  onComplete: () => void;
}

interface FlowStep {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  priceImpact: string;
}

const FLOW_STEPS: FlowStep[] = [
  {
    id: 'fed',
    label: 'Central Bank',
    icon: <Printer className="w-5 h-5" />,
    description: 'Creates new money out of thin air',
    priceImpact: 'Prices: unchanged',
  },
  {
    id: 'banks',
    label: 'Big Banks',
    icon: <Building2 className="w-5 h-5" />,
    description: 'Get cheap loans first, buy assets',
    priceImpact: 'Prices: +2%',
  },
  {
    id: 'assets',
    label: 'Asset Owners',
    icon: <TrendingUp className="w-5 h-5" />,
    description: 'Stocks, real estate, bonds go up',
    priceImpact: 'Prices: +8%',
  },
  {
    id: 'business',
    label: 'Businesses',
    icon: <Briefcase className="w-5 h-5" />,
    description: 'Borrow to expand, hire, spend',
    priceImpact: 'Prices: +15%',
  },
  {
    id: 'workers',
    label: 'Workers',
    icon: <User className="w-5 h-5" />,
    description: 'Finally get a raise... but prices already up',
    priceImpact: 'Prices: +20%',
  },
];

export default function AssetFlowViz({ onComplete }: AssetFlowVizProps) {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [showInsight, setShowInsight] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleStart = () => {
    setStarted(true);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (started && currentStep >= 0 && currentStep < FLOW_STEPS.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else if (currentStep === FLOW_STEPS.length - 1) {
      const timer = setTimeout(() => {
        setShowInsight(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [started, currentStep]);

  useEffect(() => {
    if (showInsight && !isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showInsight, isComplete, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Instructions */}
      <div className="text-center">
        <p className="text-neutral-400 font-mono text-sm">
          {!started
            ? 'Watch where new money goes when the central bank prints.'
            : showInsight
            ? 'By the time money reaches you, prices already went up.'
            : 'Money flows from the top down. Watch who benefits first.'}
        </p>
      </div>

      {/* Flow Visualization - Simplified vertical layout */}
      <div className="relative max-w-md mx-auto">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-neutral-800" />

        {/* Money flow animation */}
        {started && (
          <motion.div
            className="absolute left-5 top-0 w-0.5 bg-amber-500"
            initial={{ height: 0 }}
            animate={{ height: `${((currentStep + 1) / FLOW_STEPS.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Steps */}
        <div className="space-y-4">
          {FLOW_STEPS.map((step, index) => {
            const isActive = started && currentStep >= index;
            const isCurrent = started && currentStep === index;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: isActive ? 1 : 0.3,
                  scale: isCurrent ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="relative pl-14"
              >
                {/* Icon */}
                <div className="absolute left-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isActive
                        ? 'bg-amber-500/20 border-amber-500 text-amber-500'
                        : 'bg-neutral-900 border-neutral-700 text-neutral-600'
                    }`}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`p-3 sm:p-4 bg-neutral-900 border rounded-lg transition-colors ${
                    isActive ? 'border-amber-500/50' : 'border-neutral-800'
                  }`}
                >
                  <p className={`font-mono text-sm font-medium ${isActive ? 'text-white' : 'text-neutral-600'}`}>
                    {step.label}
                  </p>
                  <p className={`font-mono text-xs mt-1 ${isActive ? 'text-neutral-400' : 'text-neutral-700'}`}>
                    {step.description}
                  </p>
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`font-mono text-xs mt-2 font-medium ${
                          index === FLOW_STEPS.length - 1 ? 'text-red-400' : 'text-emerald-500'
                        }`}
                      >
                        {step.priceImpact}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Start Button */}
      {!started && (
        <div className="flex justify-center pt-4">
          <motion.button
            onClick={handleStart}
            className="flex items-center gap-2 bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-6 py-3 rounded hover:bg-amber-400 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="w-4 h-4" />
            PRINT MONEY
          </motion.button>
        </div>
      )}

      {/* Summary Stats */}
      {showInsight && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 gap-3 sm:gap-4"
        >
          <div className="p-3 sm:p-4 bg-neutral-900 border border-emerald-500/30 rounded-lg text-center">
            <p className="text-neutral-500 font-mono text-[10px] sm:text-xs uppercase">Banks & Asset Owners</p>
            <p className="text-emerald-500 font-mono text-lg sm:text-xl font-bold">+20%</p>
            <p className="text-neutral-600 font-mono text-[10px] sm:text-xs">wealth gain</p>
          </div>
          <div className="p-3 sm:p-4 bg-neutral-900 border border-red-500/30 rounded-lg text-center">
            <p className="text-neutral-500 font-mono text-[10px] sm:text-xs uppercase">Workers & Savers</p>
            <p className="text-red-400 font-mono text-lg sm:text-xl font-bold">-20%</p>
            <p className="text-neutral-600 font-mono text-[10px] sm:text-xs">purchasing power</p>
          </div>
        </motion.div>
      )}

      {/* Insight */}
      {showInsight && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center"
        >
          <p className="text-amber-500 font-mono text-sm font-medium">
            This is the Cantillon Effect.
          </p>
          <p className="text-neutral-400 font-mono text-xs mt-2">
            Those closest to the money printer benefit. Everyone else pays the inflation tax.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
