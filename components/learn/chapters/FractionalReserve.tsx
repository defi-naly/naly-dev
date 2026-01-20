'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { CoinIcon, VaultIcon, PersonIcon } from '@/components/icons/GameIcons';

interface FractionalReserveProps {
  onComplete: () => void;
}

type Phase = 'deposit' | 'flywheel' | 'reveal' | 'bankrun';

const RESERVE_RATIO = 0.1;
const INITIAL_DEPOSIT = 100;
const NUM_ROUNDS = 6;
const ROUND_DELAY = 2000;

const calculateRounds = () => {
  const rounds: { deposit: number; kept: number; lent: number; totalDeposits: number; totalReserves: number }[] = [];
  let currentDeposit = INITIAL_DEPOSIT;
  let totalDeposits = 0;
  let totalReserves = 0;

  for (let i = 0; i < NUM_ROUNDS; i++) {
    const kept = currentDeposit * RESERVE_RATIO;
    const lent = currentDeposit * (1 - RESERVE_RATIO);
    totalDeposits += currentDeposit;
    totalReserves += kept;
    rounds.push({ deposit: currentDeposit, kept, lent, totalDeposits, totalReserves });
    currentDeposit = lent;
  }

  return rounds;
};

const ROUNDS = calculateRounds();
const FINAL_DEPOSITS = Math.round(ROUNDS[ROUNDS.length - 1].totalDeposits);
const FINAL_RESERVES = Math.round(ROUNDS[ROUNDS.length - 1].totalReserves);

export default function FractionalReserve({ onComplete }: FractionalReserveProps) {
  const [phase, setPhase] = useState<Phase>('deposit');
  const [currentRound, setCurrentRound] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (phase === 'flywheel' && currentRound < NUM_ROUNDS - 1) {
      const timer = setTimeout(() => {
        setCurrentRound(prev => prev + 1);
      }, ROUND_DELAY);
      return () => clearTimeout(timer);
    } else if (phase === 'flywheel' && currentRound === NUM_ROUNDS - 1) {
      const timer = setTimeout(() => {
        setPhase('reveal');
      }, ROUND_DELAY);
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

  const handleDeposit = useCallback(() => {
    setPhase('flywheel');
    setCurrentRound(0);
  }, []);

  const handleWithdraw = useCallback(() => {
    setPhase('bankrun');
  }, []);

  const currentData = currentRound >= 0 ? ROUNDS[currentRound] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-[450px]"
    >
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
              <p className="text-neutral-400 font-mono text-sm">
                You deposit 100 gold with the bank for safekeeping.
              </p>

              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-2">
                    <PersonIcon className="w-8 h-8 text-amber-500" />
                  </div>
                  <p className="text-zinc-400 font-mono text-xs">YOU</p>
                </div>

                <motion.div
                  className="flex items-center gap-1"
                  animate={{ x: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <CoinIcon className="w-5 h-5 text-amber-500" />
                  <span className="text-amber-500 font-mono text-sm">100</span>
                  <span className="text-zinc-600">→</span>
                </motion.div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto mb-2">
                    <VaultIcon className="w-8 h-8 text-zinc-400" />
                  </div>
                  <p className="text-zinc-400 font-mono text-xs">BANK</p>
                </div>
              </div>

              <motion.button
                onClick={handleDeposit}
                className="flex items-center gap-2 bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-6 py-3 rounded hover:bg-amber-400 transition-colors mx-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CoinIcon className="w-4 h-4" />
                DEPOSIT GOLD
              </motion.button>
            </motion.div>
          )}

          {/* PHASE 2: Flywheel */}
          {phase === 'flywheel' && currentData && (
            <motion.div
              key="flywheel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <p className="text-neutral-400 font-mono text-sm text-center">
                "They won't all withdraw at once..."
              </p>

              {/* Flywheel SVG */}
              <svg viewBox="0 0 360 200" className="w-full max-w-sm mx-auto">
                {/* Bank node - top center */}
                <g transform="translate(180, 30)">
                  <motion.rect
                    x="-40" y="-18"
                    width="80" height="36"
                    rx="4"
                    fill="#18181b"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                  />
                  <text x="0" y="-2" textAnchor="middle" fill="#fafafa" className="font-mono text-[10px]">
                    BANK
                  </text>
                  <text x="0" y="10" textAnchor="middle" fill="#f59e0b" className="font-mono text-[9px]">
                    Vault: {Math.round(currentData.kept)}
                  </text>
                </g>

                {/* Borrower node - right */}
                <g transform="translate(300, 100)">
                  <motion.rect
                    x="-35" y="-14"
                    width="70" height="28"
                    rx="4"
                    fill="#18181b"
                    stroke="#3f3f46"
                    strokeWidth="1.5"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  />
                  <text x="0" y="4" textAnchor="middle" fill="#a1a1aa" className="font-mono text-[10px]">
                    BORROWER
                  </text>
                </g>

                {/* Merchant node - bottom center */}
                <g transform="translate(180, 170)">
                  <motion.rect
                    x="-35" y="-14"
                    width="70" height="28"
                    rx="4"
                    fill="#18181b"
                    stroke="#3f3f46"
                    strokeWidth="1.5"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  />
                  <text x="0" y="4" textAnchor="middle" fill="#a1a1aa" className="font-mono text-[10px]">
                    MERCHANT
                  </text>
                </g>

                {/* Flow paths */}
                {/* Bank to Borrower */}
                <motion.path
                  d="M 220 42 Q 280 60 280 86"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <motion.text
                  x="260" y="55"
                  fill="#f59e0b"
                  className="font-mono text-[9px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Lends {Math.round(currentData.lent)}
                </motion.text>

                {/* Borrower to Merchant */}
                <motion.path
                  d="M 280 114 Q 280 140 230 156"
                  fill="none"
                  stroke="#52525b"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
                <motion.text
                  x="265" y="140"
                  fill="#71717a"
                  className="font-mono text-[8px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  spends
                </motion.text>

                {/* Merchant back to Bank */}
                <motion.path
                  d="M 145 160 Q 60 140 80 80 Q 100 40 140 30"
                  fill="none"
                  stroke="#52525b"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                />
                <motion.text
                  x="70" y="100"
                  fill="#71717a"
                  className="font-mono text-[8px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  deposits
                </motion.text>

                {/* Animated coin */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    times: [0, 0.1, 0.5, 0.9, 1],
                    repeat: Infinity,
                  }}
                >
                  <motion.circle
                    cx="0" cy="0" r="6"
                    fill="#f59e0b"
                    animate={{
                      cx: [220, 280, 280, 180, 140],
                      cy: [42, 80, 130, 156, 30],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.g>
              </svg>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-center">
                  <p className="text-zinc-500 font-mono text-[10px] uppercase">Real Gold</p>
                  <p className="text-amber-500 font-mono text-lg font-bold">{INITIAL_DEPOSIT}</p>
                </div>
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-center">
                  <p className="text-zinc-500 font-mono text-[10px] uppercase">Total Deposits</p>
                  <motion.p
                    className="text-emerald-500 font-mono text-lg font-bold"
                    key={currentData.totalDeposits}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                  >
                    {Math.round(currentData.totalDeposits)}
                  </motion.p>
                </div>
              </div>

              {/* Round indicator */}
              <div className="text-center">
                <p className="text-zinc-600 font-mono text-xs mb-2">
                  Round {currentRound + 1}: Bank keeps {Math.round(currentData.kept)}, lends {Math.round(currentData.lent)}
                </p>
                <div className="flex justify-center gap-1">
                  {ROUNDS.map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i <= currentRound ? 'bg-amber-500' : 'bg-zinc-700'
                      }`}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: i === currentRound ? 1.3 : 1 }}
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
                <div className="p-4 bg-zinc-900 border border-amber-500/30 rounded-lg">
                  <CoinIcon className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-zinc-500 font-mono text-[10px] uppercase">Real Gold</p>
                  <p className="text-amber-500 font-mono text-2xl font-bold">{INITIAL_DEPOSIT}</p>
                </div>
                <span className="text-zinc-600 font-mono text-xl">→</span>
                <div className="p-4 bg-zinc-900 border border-emerald-500/30 rounded-lg">
                  <div className="flex justify-center mb-2">
                    <CoinIcon className="w-6 h-6 text-emerald-500" />
                    <CoinIcon className="w-6 h-6 text-emerald-500 -ml-2" />
                    <CoinIcon className="w-6 h-6 text-emerald-500 -ml-2" />
                  </div>
                  <p className="text-zinc-500 font-mono text-[10px] uppercase">Total "Balances"</p>
                  <p className="text-emerald-500 font-mono text-2xl font-bold">{FINAL_DEPOSITS}</p>
                </div>
              </div>

              <p className="text-zinc-400 font-mono text-sm max-w-xs mx-auto">
                The same 100 gold now backs {FINAL_DEPOSITS} in account balances.
                Money was created from thin air.
              </p>

              <motion.button
                onClick={handleWithdraw}
                className="flex items-center gap-2 bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-6 py-3 rounded hover:bg-amber-400 transition-colors mx-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                TRY TO WITHDRAW
              </motion.button>
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
              <div className="p-6 bg-zinc-900 border border-red-500/30 rounded-lg max-w-sm mx-auto">
                <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-4" />
                <p className="text-white font-mono text-sm mb-3">
                  "I'd like my 100 gold back."
                </p>
                <div className="p-3 bg-zinc-800 rounded-lg">
                  <p className="text-zinc-400 font-mono text-sm">
                    Bank: "We only have <span className="text-red-400 font-bold">{FINAL_RESERVES}</span> in the vault right now.
                    Come back next week?"
                  </p>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-zinc-500 font-mono text-xs"
              >
                This is fractional reserve banking.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
