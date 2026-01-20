'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, FileText, Building2, ArrowRight, RotateCcw } from 'lucide-react';

interface FractionalReserveProps {
  onComplete: () => void;
}

interface BankState {
  round: number;
  deposited: number;
  reserves: number;
  loaned: number;
}

const RESERVE_RATIO = 0.1; // 10% reserve requirement
const INITIAL_DEPOSIT = 100;

export default function FractionalReserve({ onComplete }: FractionalReserveProps) {
  const [started, setStarted] = useState(false);
  const [bankHistory, setBankHistory] = useState<BankState[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [showInsight, setShowInsight] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const totalDeposits = bankHistory.reduce((sum, b) => sum + b.deposited, 0);
  const totalReserves = bankHistory.reduce((sum, b) => sum + b.reserves, 0);
  const totalLoaned = bankHistory.reduce((sum, b) => sum + b.loaned, 0);

  const handleStart = () => {
    setStarted(true);
    // Initial deposit
    const firstRound: BankState = {
      round: 1,
      deposited: INITIAL_DEPOSIT,
      reserves: INITIAL_DEPOSIT * RESERVE_RATIO,
      loaned: INITIAL_DEPOSIT * (1 - RESERVE_RATIO),
    };
    setBankHistory([firstRound]);
    setCurrentRound(1);
  };

  const handleNextRound = () => {
    if (currentRound >= 6) {
      setShowInsight(true);
      return;
    }

    const lastRound = bankHistory[bankHistory.length - 1];
    const newDeposit = lastRound.loaned;

    if (newDeposit < 1) {
      setShowInsight(true);
      return;
    }

    const newRound: BankState = {
      round: currentRound + 1,
      deposited: newDeposit,
      reserves: newDeposit * RESERVE_RATIO,
      loaned: newDeposit * (1 - RESERVE_RATIO),
    };

    setBankHistory(prev => [...prev, newRound]);
    setCurrentRound(prev => prev + 1);
  };

  const handleReset = () => {
    setStarted(false);
    setBankHistory([]);
    setCurrentRound(0);
    setShowInsight(false);
  };

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
            ? 'You deposit 100 gold coins at the bank. Watch what happens next.'
            : showInsight
            ? 'From 100 coins, the system created hundreds in "money."'
            : `Round ${currentRound}: The bank keeps 10%, lends out 90%.`}
        </p>
      </div>

      {/* Initial State */}
      {!started && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-lg text-center">
            <div className="text-4xl mb-2">🪙</div>
            <p className="text-amber-500 font-mono text-2xl font-bold">100 Gold</p>
            <p className="text-neutral-500 font-mono text-xs mt-1">Your savings</p>
          </div>

          <ArrowRight className="w-6 h-6 text-neutral-600" />

          <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-lg text-center">
            <Building2 className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
            <p className="text-white font-mono font-medium">The Bank</p>
            <p className="text-neutral-500 font-mono text-xs mt-1">"We'll keep it safe"</p>
          </div>

          <motion.button
            onClick={handleStart}
            className="flex items-center gap-2 bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-6 py-3 rounded hover:bg-amber-400 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Coins className="w-4 h-4" />
            DEPOSIT GOLD
          </motion.button>
        </motion.div>
      )}

      {/* Banking Simulation */}
      {started && (
        <>
          {/* Summary Bar */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-center">
              <p className="text-neutral-500 font-mono text-xs uppercase">Real Gold</p>
              <p className="text-amber-500 font-mono text-xl font-bold">{INITIAL_DEPOSIT}</p>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-center">
              <p className="text-neutral-500 font-mono text-xs uppercase">Total "Deposits"</p>
              <p className="text-emerald-500 font-mono text-xl font-bold">
                {totalDeposits.toFixed(0)}
              </p>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-center">
              <p className="text-neutral-500 font-mono text-xs uppercase">Multiplier</p>
              <p className="text-white font-mono text-xl font-bold">
                {(totalDeposits / INITIAL_DEPOSIT).toFixed(1)}x
              </p>
            </div>
          </div>

          {/* Bank Rounds */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            <AnimatePresence>
              {bankHistory.map((bank, index) => (
                <motion.div
                  key={bank.round}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-neutral-500 font-mono text-xs uppercase">
                      {bank.round === 1 ? 'Your Deposit' : `Round ${bank.round}`}
                    </span>
                    <Building2 className="w-4 h-4 text-neutral-600" />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-neutral-600 font-mono text-xs">Received</p>
                      <p className="text-white font-mono text-sm">
                        {bank.deposited.toFixed(1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-neutral-600 font-mono text-xs">Kept (10%)</p>
                      <p className="text-amber-500 font-mono text-sm">
                        {bank.reserves.toFixed(1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-neutral-600 font-mono text-xs">Lent Out</p>
                      <p className="text-emerald-500 font-mono text-sm">
                        {bank.loaned.toFixed(1)}
                      </p>
                    </div>
                  </div>

                  {/* Visual Bar */}
                  <div className="mt-3 h-2 bg-neutral-800 rounded overflow-hidden flex">
                    <div
                      className="bg-amber-500"
                      style={{ width: `${RESERVE_RATIO * 100}%` }}
                    />
                    <div
                      className="bg-emerald-500"
                      style={{ width: `${(1 - RESERVE_RATIO) * 100}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Receipt Animation */}
          {currentRound === 1 && !showInsight && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg text-center"
            >
              <FileText className="w-6 h-6 text-neutral-400 mx-auto mb-2" />
              <p className="text-neutral-400 font-mono text-sm">
                You get a paper receipt for 100 gold.
              </p>
              <p className="text-neutral-600 font-mono text-xs mt-1">
                But the bank only kept 10. They lent 90 to someone else.
              </p>
            </motion.div>
          )}

          {/* Continue Button */}
          {!showInsight && (
            <div className="flex justify-center gap-4">
              <motion.button
                onClick={handleNextRound}
                className="flex items-center gap-2 bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-6 py-3 rounded hover:bg-amber-400 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {currentRound >= 6 ? 'SEE THE RESULT' : 'LEND IT OUT AGAIN'}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          )}

          {/* Reset */}
          {showInsight && (
            <div className="flex justify-center">
              <motion.button
                onClick={handleReset}
                className="flex items-center gap-2 bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono text-sm px-4 py-2 rounded hover:border-amber-500 hover:text-amber-500 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw className="w-4 h-4" />
                RESET
              </motion.button>
            </div>
          )}
        </>
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
            100 gold → {totalDeposits.toFixed(0)} in "deposits." Only {totalReserves.toFixed(0)} gold actually exists.
          </p>
          <p className="text-neutral-400 font-mono text-xs mt-2">
            This is fractional reserve banking. Your money is mostly promises.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
