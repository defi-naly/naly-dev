'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Building2, AlertTriangle } from 'lucide-react';

interface FractionalReserveProps {
  onComplete: () => void;
}

type Phase = 'deposit' | 'scheme' | 'reveal' | 'bankrun';

const RESERVE_RATIO = 0.1;
const INITIAL_DEPOSIT = 100;
const NUM_ROUNDS = 7;

// Pre-calculate all rounds
const calculateRounds = () => {
  const rounds: { kept: number; lent: number; totalDeposits: number }[] = [];
  let currentLent = INITIAL_DEPOSIT;
  let totalDeposits = 0;

  for (let i = 0; i < NUM_ROUNDS; i++) {
    const kept = currentLent * RESERVE_RATIO;
    const lent = currentLent * (1 - RESERVE_RATIO);
    totalDeposits += currentLent;
    rounds.push({ kept, lent, totalDeposits });
    currentLent = lent;
  }

  return rounds;
};

const ROUNDS = calculateRounds();
const FINAL_DEPOSITS = ROUNDS[ROUNDS.length - 1].totalDeposits;
const FINAL_RESERVES = ROUNDS.reduce((sum, r) => sum + r.kept, 0);

export default function FractionalReserve({ onComplete }: FractionalReserveProps) {
  const [phase, setPhase] = useState<Phase>('deposit');
  const [currentRound, setCurrentRound] = useState(-1);
  const [displayedDeposits, setDisplayedDeposits] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Auto-animate through rounds in scheme phase
  useEffect(() => {
    if (phase === 'scheme' && currentRound < NUM_ROUNDS - 1) {
      const timer = setTimeout(() => {
        const nextRound = currentRound + 1;
        setCurrentRound(nextRound);
        setDisplayedDeposits(ROUNDS[nextRound].totalDeposits);
      }, 800);
      return () => clearTimeout(timer);
    } else if (phase === 'scheme' && currentRound === NUM_ROUNDS - 1) {
      // Animation complete, move to reveal after a pause
      const timer = setTimeout(() => {
        setPhase('reveal');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [phase, currentRound]);

  // Complete chapter after bankrun
  useEffect(() => {
    if (phase === 'bankrun' && !isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase, isComplete, onComplete]);

  const handleDeposit = useCallback(() => {
    setPhase('scheme');
    setCurrentRound(0);
    setDisplayedDeposits(ROUNDS[0].totalDeposits);
  }, []);

  const handleWithdraw = useCallback(() => {
    setPhase('bankrun');
  }, []);

  const vaultPercent = currentRound >= 0
    ? (ROUNDS.slice(0, currentRound + 1).reduce((sum, r) => sum + r.kept, 0) / INITIAL_DEPOSIT) * 100
    : 0;

  const lentPercent = 100 - vaultPercent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-[450px]"
    >
      {/* Top Stats Bar */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-center">
          <p className="text-neutral-500 font-mono text-xs uppercase">Real Gold</p>
          <p className="text-amber-500 font-mono text-2xl font-bold">{INITIAL_DEPOSIT}</p>
        </div>
        <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-center">
          <p className="text-neutral-500 font-mono text-xs uppercase">Total "Deposits"</p>
          <motion.p
            className="text-emerald-500 font-mono text-2xl font-bold"
            key={displayedDeposits}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {Math.round(displayedDeposits)}
          </motion.p>
        </div>
      </div>

      {/* Main Visualization Area */}
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* PHASE 1: Deposit */}
          {phase === 'deposit' && (
            <motion.div
              key="deposit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-6"
            >
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-5xl mb-2">🪙</div>
                  <p className="text-amber-500 font-mono text-sm font-medium">100 Gold</p>
                </div>
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-neutral-600"
                >
                  →
                </motion.div>
                <div className="text-center">
                  <Building2 className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                  <p className="text-neutral-400 font-mono text-sm">Goldsmith</p>
                </div>
              </div>
              <p className="text-neutral-500 font-mono text-xs">
                "I'll keep it safe for you."
              </p>
            </motion.div>
          )}

          {/* PHASE 2: Scheme (Auto-animates) */}
          {phase === 'scheme' && (
            <motion.div
              key="scheme"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <p className="text-neutral-400 font-mono text-sm text-center">
                "They won't all withdraw at once..."
              </p>

              {/* Vault vs Lent Bar */}
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-amber-500 font-mono text-xs uppercase">Vault</span>
                  <span className="text-emerald-500 font-mono text-xs uppercase">Lent Out</span>
                </div>
                <div className="h-8 bg-neutral-800 rounded overflow-hidden flex">
                  <motion.div
                    className="bg-amber-500 flex items-center justify-center"
                    initial={{ width: '100%' }}
                    animate={{ width: `${Math.max(vaultPercent, 5)}%` }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-zinc-900 font-mono text-xs font-bold">
                      {vaultPercent > 10 ? `${Math.round(vaultPercent)}%` : ''}
                    </span>
                  </motion.div>
                  <motion.div
                    className="bg-emerald-500 flex items-center justify-center"
                    initial={{ width: '0%' }}
                    animate={{ width: `${lentPercent}%` }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-zinc-900 font-mono text-xs font-bold">
                      {lentPercent > 15 ? `${Math.round(lentPercent)}%` : ''}
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Round Counter */}
              <div className="text-center">
                <p className="text-neutral-600 font-mono text-xs">
                  Round {currentRound + 1}: Kept {Math.round(ROUNDS[currentRound]?.kept || 0)},
                  Lent {Math.round(ROUNDS[currentRound]?.lent || 0)}
                </p>
                <div className="flex justify-center gap-1 mt-2">
                  {ROUNDS.map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i <= currentRound ? 'bg-amber-500' : 'bg-neutral-700'
                      }`}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: i === currentRound ? 1.2 : 1 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* PHASE 3: Reveal */}
          {phase === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-6"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="p-4 bg-neutral-900 border border-amber-500/30 rounded-lg">
                  <p className="text-neutral-500 font-mono text-xs uppercase mb-1">Real Gold</p>
                  <p className="text-amber-500 font-mono text-3xl font-bold">{INITIAL_DEPOSIT}</p>
                </div>
                <span className="text-neutral-500 font-mono text-2xl">→</span>
                <div className="p-4 bg-neutral-900 border border-emerald-500/30 rounded-lg">
                  <p className="text-neutral-500 font-mono text-xs uppercase mb-1">Total "Balances"</p>
                  <p className="text-emerald-500 font-mono text-3xl font-bold">{Math.round(FINAL_DEPOSITS)}</p>
                </div>
              </div>
              <p className="text-neutral-400 font-mono text-sm max-w-xs mx-auto">
                The same 100 coins now back {Math.round(FINAL_DEPOSITS)} in "deposits."
                Money was created from nothing.
              </p>
            </motion.div>
          )}

          {/* PHASE 4: Bank Run */}
          {phase === 'bankrun' && (
            <motion.div
              key="bankrun"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-6"
            >
              <div className="p-6 bg-neutral-900 border border-red-500/30 rounded-lg max-w-sm mx-auto">
                <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-4" />
                <p className="text-white font-mono text-sm mb-2">
                  "I'd like my 100 gold back."
                </p>
                <p className="text-neutral-400 font-mono text-sm">
                  Goldsmith: "Sorry, I only have {Math.round(FINAL_RESERVES)} in the vault.
                  Come back next week?"
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-4xl"
              >
                🏃💨
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Action Button */}
      <div className="h-16 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {phase === 'deposit' && (
            <motion.button
              key="deposit-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={handleDeposit}
              className="flex items-center gap-2 bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-6 py-3 rounded hover:bg-amber-400 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Coins className="w-4 h-4" />
              DEPOSIT GOLD
            </motion.button>
          )}

          {phase === 'scheme' && (
            <motion.p
              key="scheme-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-neutral-600 font-mono text-xs"
            >
              Watching the magic happen...
            </motion.p>
          )}

          {phase === 'reveal' && (
            <motion.button
              key="withdraw-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={handleWithdraw}
              className="flex items-center gap-2 bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-6 py-3 rounded hover:bg-amber-400 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              TRY TO WITHDRAW
            </motion.button>
          )}

          {phase === 'bankrun' && (
            <motion.p
              key="bankrun-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-neutral-500 font-mono text-xs"
            >
              This is fractional reserve banking.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
