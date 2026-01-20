'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Play } from 'lucide-react';
import { CoinIcon, VaultIcon } from '@/components/icons/GameIcons';

interface FractionalReserveProps {
  onComplete: () => void;
}

type Phase = 'intro' | 'lending' | 'reveal' | 'bankrun';

const RESERVE_RATIO = 0.1;
const INITIAL_DEPOSIT = 100;
const NUM_ROUNDS = 5;

const calculateRounds = () => {
  const rounds: { round: number; deposit: number; kept: number; lent: number; totalClaims: number; totalReserves: number }[] = [];
  let currentDeposit = INITIAL_DEPOSIT;
  let totalClaims = 0;
  let totalReserves = 0;

  for (let i = 0; i < NUM_ROUNDS; i++) {
    const kept = currentDeposit * RESERVE_RATIO;
    const lent = currentDeposit * (1 - RESERVE_RATIO);
    totalClaims += currentDeposit;
    totalReserves += kept;
    rounds.push({ round: i + 1, deposit: currentDeposit, kept, lent, totalClaims, totalReserves });
    currentDeposit = lent;
  }

  return rounds;
};

const ROUNDS = calculateRounds();
const FINAL_CLAIMS = Math.round(ROUNDS[ROUNDS.length - 1].totalClaims);
const FINAL_RESERVES = Math.round(ROUNDS[ROUNDS.length - 1].totalReserves);

export default function FractionalReserve({ onComplete }: FractionalReserveProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentRound, setCurrentRound] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (phase === 'lending' && currentRound < NUM_ROUNDS) {
      const timer = setTimeout(() => {
        setCurrentRound(prev => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else if (phase === 'lending' && currentRound === NUM_ROUNDS) {
      const timer = setTimeout(() => {
        setPhase('reveal');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, currentRound]);

  useEffect(() => {
    if (phase === 'bankrun' && !isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        onComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [phase, isComplete, onComplete]);

  const handleStart = useCallback(() => {
    setPhase('lending');
    setCurrentRound(1);
  }, []);

  const handleWithdraw = useCallback(() => {
    setPhase('bankrun');
  }, []);

  const currentData = currentRound > 0 ? ROUNDS[currentRound - 1] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col"
    >
      <AnimatePresence mode="wait">
        {/* INTRO */}
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <CoinIcon className="w-8 h-8 text-amber-500" />
              </div>
              <div className="text-left">
                <p className="text-white font-mono text-lg font-medium">100 Gold</p>
                <p className="text-zinc-500 font-mono text-xs">Your life savings</p>
              </div>
            </div>

            <p className="text-zinc-400 font-mono text-sm max-w-sm mx-auto">
              You deposit it with the bank for safekeeping. They promise it's always available.
            </p>

            <motion.button
              onClick={handleStart}
              className="flex items-center gap-2 bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-6 py-3 rounded hover:bg-amber-400 transition-colors mx-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-4 h-4" />
              DEPOSIT
            </motion.button>
          </motion.div>
        )}

        {/* LENDING VISUALIZATION */}
        {phase === 'lending' && currentData && (
          <motion.div
            key="lending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <p className="text-zinc-500 font-mono text-xs text-center uppercase tracking-wider">
              "They won't all withdraw at once..."
            </p>

            {/* Money multiplication bars */}
            <div className="space-y-2 max-w-md mx-auto">
              {ROUNDS.slice(0, currentRound).map((round, idx) => (
                <motion.div
                  key={round.round}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-zinc-600 font-mono text-xs w-6">{round.round}.</span>

                  {/* Kept (reserve) */}
                  <div className="flex-1 flex items-center gap-1">
                    <motion.div
                      className="h-8 bg-amber-500/20 border border-amber-500/40 rounded flex items-center justify-center"
                      style={{ width: `${(round.kept / INITIAL_DEPOSIT) * 100}%`, minWidth: '40px' }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                    >
                      <span className="text-amber-500 font-mono text-[10px] font-medium">
                        {Math.round(round.kept)}
                      </span>
                    </motion.div>

                    {/* Lent out */}
                    <motion.div
                      className="h-8 bg-zinc-800 border border-zinc-700 rounded flex items-center justify-center px-2"
                      style={{ width: `${(round.lent / INITIAL_DEPOSIT) * 100}%` }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-zinc-400 font-mono text-[10px]">
                        {Math.round(round.lent)} lent →
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Running totals */}
            <div className="flex justify-center gap-6 pt-4 border-t border-zinc-800">
              <div className="text-center">
                <p className="text-zinc-600 font-mono text-[10px] uppercase">Real Gold</p>
                <p className="text-amber-500 font-mono text-xl font-bold">{INITIAL_DEPOSIT}</p>
              </div>
              <div className="w-px bg-zinc-800" />
              <div className="text-center">
                <p className="text-zinc-600 font-mono text-[10px] uppercase">Total Claims</p>
                <motion.p
                  key={currentData.totalClaims}
                  className="text-emerald-400 font-mono text-xl font-bold"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {Math.round(currentData.totalClaims)}
                </motion.p>
              </div>
              <div className="w-px bg-zinc-800" />
              <div className="text-center">
                <p className="text-zinc-600 font-mono text-[10px] uppercase">In Vault</p>
                <p className="text-zinc-400 font-mono text-xl font-bold">{Math.round(currentData.totalReserves)}</p>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-1.5">
              {ROUNDS.map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < currentRound ? 'bg-amber-500' : 'bg-zinc-700'
                  }`}
                  animate={{ scale: i === currentRound - 1 ? 1.3 : 1 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* REVEAL */}
        {phase === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* The problem visualized */}
            <div className="flex items-center justify-center gap-4">
              <div className="p-4 bg-zinc-900 border border-zinc-700 rounded-lg text-center">
                <VaultIcon className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                <p className="text-zinc-500 font-mono text-[10px] uppercase">In Vault</p>
                <p className="text-zinc-300 font-mono text-2xl font-bold">{FINAL_RESERVES}</p>
              </div>

              <div className="text-zinc-600 font-mono text-lg">vs</div>

              <div className="p-4 bg-zinc-900 border border-emerald-500/30 rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  <CoinIcon className="w-6 h-6 text-emerald-400" />
                  <CoinIcon className="w-6 h-6 text-emerald-400 -ml-2" />
                  <CoinIcon className="w-6 h-6 text-emerald-400 -ml-2" />
                </div>
                <p className="text-zinc-500 font-mono text-[10px] uppercase">Total Owed</p>
                <p className="text-emerald-400 font-mono text-2xl font-bold">{FINAL_CLAIMS}</p>
              </div>
            </div>

            {/* Ratio visualization */}
            <div className="max-w-sm mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-zinc-500 font-mono text-xs">Coverage:</span>
                <span className="text-red-400 font-mono text-xs font-medium">
                  {Math.round((FINAL_RESERVES / FINAL_CLAIMS) * 100)}%
                </span>
              </div>
              <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(FINAL_RESERVES / FINAL_CLAIMS) * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <p className="text-zinc-600 font-mono text-[10px] mt-2 text-center">
                {FINAL_CLAIMS - FINAL_RESERVES} gold exists only as numbers in a ledger
              </p>
            </div>

            <motion.button
              onClick={handleWithdraw}
              className="flex items-center gap-2 bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-6 py-3 rounded hover:bg-amber-400 transition-colors mx-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              TRY TO WITHDRAW YOUR 100
            </motion.button>
          </motion.div>
        )}

        {/* BANK RUN */}
        {phase === 'bankrun' && (
          <motion.div
            key="bankrun"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-zinc-900 border border-red-500/30 rounded-lg max-w-sm mx-auto text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10 }}
              >
                <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              </motion.div>

              <p className="text-white font-mono text-sm mb-4">
                "I'd like my 100 gold back, please."
              </p>

              <motion.div
                className="p-3 bg-zinc-800/50 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-zinc-400 font-mono text-sm">
                  Bank: "We only have{' '}
                  <span className="text-red-400 font-bold">{FINAL_RESERVES}</span>{' '}
                  in the vault right now."
                </p>
                <p className="text-zinc-500 font-mono text-xs mt-2">
                  "The rest is... out on loan."
                </p>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center text-zinc-500 font-mono text-xs"
            >
              This is fractional reserve banking.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="text-center text-zinc-600 font-mono text-[10px] max-w-xs mx-auto"
            >
              It works—until everyone wants their money at once.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
