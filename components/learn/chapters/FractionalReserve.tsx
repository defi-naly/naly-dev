'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FractionalReserveProps {
  onComplete: () => void;
}

type Phase =
  | 'deposit'
  | 'pitch'
  | 'loan'
  | 'multiplier'
  | 'profits'
  | 'quiz'
  | 'quiz-answer'
  | 'risk'
  | 'bankrun'
  | 'reality'
  | 'alternative'
  | 'choice';

const RESERVE_RATIO = 0.1;
const INITIAL_DEPOSIT = 100;
const BANK_RATE = 7;
const SAVINGS_RATE = 0.5;

const calculateRounds = () => {
  const rounds: { round: number; deposited: number; loaned: number; cumulative: number }[] = [];
  let current = INITIAL_DEPOSIT;
  let cumulative = 0;

  for (let i = 0; i < 8; i++) {
    cumulative += current;
    const loaned = current * (1 - RESERVE_RATIO);
    rounds.push({ round: i + 1, deposited: current, loaned, cumulative });
    current = loaned;
  }

  return rounds;
};

const ROUNDS = calculateRounds();

const BANK_FAILURES = [
  { name: 'SILICON VALLEY BANK', date: 'March 2023', deposits: '$175B', withdrawn: '$42B in 24hrs', result: 'Collapsed. FDIC takeover.' },
  { name: 'SIGNATURE BANK', date: 'March 2023', deposits: '$88B', withdrawn: 'Bank run', result: 'Collapsed 2 days later.' },
  { name: 'FIRST REPUBLIC', date: 'May 2023', deposits: '$176B', withdrawn: 'Deposit flight', result: 'Collapsed 2 months later.' },
];

export default function FractionalReserve({ onComplete }: FractionalReserveProps) {
  const [phase, setPhase] = useState<Phase>('deposit');
  const [multiplierRound, setMultiplierRound] = useState(0);
  const [bankrunProgress, setBankrunProgress] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [realityIndex, setRealityIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Multiplier animation
  useEffect(() => {
    if (phase === 'multiplier' && multiplierRound < ROUNDS.length) {
      const timer = setTimeout(() => {
        setMultiplierRound(prev => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [phase, multiplierRound]);

  // Bank run animation
  useEffect(() => {
    if (phase === 'bankrun' && bankrunProgress < 100) {
      const timer = setTimeout(() => {
        setBankrunProgress(prev => Math.min(prev + 2, 100));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [phase, bankrunProgress]);

  // Reality slideshow
  useEffect(() => {
    if (phase === 'reality' && realityIndex < BANK_FAILURES.length - 1) {
      const timer = setTimeout(() => {
        setRealityIndex(prev => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase, realityIndex]);

  // Mark complete on final phase
  useEffect(() => {
    if (phase === 'choice' && !isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, isComplete, onComplete]);

  const handleQuizAnswer = useCallback((answer: number) => {
    setQuizAnswer(answer);
    setTimeout(() => setPhase('quiz-answer'), 500);
  }, []);

  const nextPhase = useCallback(() => {
    const phases: Phase[] = ['deposit', 'pitch', 'loan', 'multiplier', 'profits', 'quiz', 'quiz-answer', 'risk', 'bankrun', 'reality', 'alternative', 'choice'];
    const currentIndex = phases.indexOf(phase);
    if (currentIndex < phases.length - 1) {
      // Skip quiz-answer if we haven't answered yet
      if (phases[currentIndex + 1] === 'quiz-answer' && quizAnswer === null) {
        return;
      }
      setPhase(phases[currentIndex + 1]);
    }
  }, [phase, quizAnswer]);

  const vaultRemaining = Math.max(0, 100 - bankrunProgress);
  const bankFailed = bankrunProgress >= 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col max-w-lg mx-auto"
    >
      <AnimatePresence mode="wait">
        {/* DEPOSIT */}
        {phase === 'deposit' && (
          <motion.div
            key="deposit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-zinc-900 border border-zinc-800 font-mono">
              <p className="text-zinc-400 text-sm mb-4">You deposit $100 at First National Bank.</p>
              <p className="text-white text-sm mb-4">"Thank you! Your money is safe with us."</p>
              <p className="text-zinc-500 text-sm italic">Is it though?</p>
            </div>
            <button
              onClick={nextPhase}
              className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-sm transition-colors"
            >
              Continue
            </button>
          </motion.div>
        )}

        {/* PITCH */}
        {phase === 'pitch' && (
          <motion.div
            key="pitch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-zinc-900 border border-zinc-800 font-mono">
              <p className="text-zinc-400 text-sm mb-4">The bank offers you a savings account.</p>
              <p className="text-emerald-400 text-lg mb-2">"Earn 0.5% interest annually!"</p>
              <p className="text-zinc-500 text-sm mb-4">That's 50 cents per year on your $100.</p>
              <p className="text-zinc-400 text-sm">But what is the bank doing with your money?</p>
            </div>
            <button
              onClick={nextPhase}
              className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-sm transition-colors"
            >
              Show me
            </button>
          </motion.div>
        )}

        {/* LOAN */}
        {phase === 'loan' && (
          <motion.div
            key="loan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-zinc-900 border border-zinc-800 font-mono">
              <p className="text-zinc-400 text-sm mb-4">Meet Jake. He wants to buy a car.</p>
              <p className="text-zinc-400 text-sm mb-6">The bank loans him $90 of YOUR deposit.</p>

              {/* Flow diagram */}
              <div className="text-center mb-6">
                <p className="text-white text-sm mb-2">YOUR $100</p>
                <p className="text-zinc-600">↓</p>
                <div className="inline-block px-6 py-2 border border-zinc-700 my-2">
                  <span className="text-zinc-400 text-sm">BANK</span>
                </div>
                <div className="flex justify-center gap-8 mt-2">
                  <div className="text-center">
                    <p className="text-zinc-600">↓</p>
                    <p className="text-amber-400 text-sm">$10</p>
                    <p className="text-zinc-600 text-[10px]">kept</p>
                  </div>
                  <div className="text-center">
                    <p className="text-zinc-600">↓</p>
                    <p className="text-white text-sm">$90 → Jake</p>
                    <p className="text-zinc-600 text-[10px]">loaned at 7%</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between border-t border-zinc-800 pt-4">
                <div>
                  <p className="text-zinc-600 text-[10px]">YOU EARN</p>
                  <p className="text-zinc-400 text-sm">0.5%</p>
                </div>
                <div className="text-right">
                  <p className="text-zinc-600 text-[10px]">BANK EARNS</p>
                  <p className="text-emerald-400 text-sm">7%</p>
                </div>
              </div>
            </div>
            <button
              onClick={nextPhase}
              className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-sm transition-colors"
            >
              Continue
            </button>
          </motion.div>
        )}

        {/* MULTIPLIER */}
        {phase === 'multiplier' && (
          <motion.div
            key="multiplier"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-zinc-900 border border-zinc-800 font-mono">
              <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-4">YOUR $100 DEPOSIT</p>

              <div className="space-y-1 mb-4">
                {ROUNDS.slice(0, multiplierRound).map((round) => (
                  <motion.div
                    key={round.round}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-zinc-600">Round {round.round}:</span>
                    <span className="text-zinc-400">
                      ${round.deposited.toFixed(2)} deposited → ${round.loaned.toFixed(2)} loaned
                    </span>
                  </motion.div>
                ))}
                {multiplierRound < ROUNDS.length && (
                  <div className="text-zinc-700 text-sm">...</div>
                )}
              </div>

              {multiplierRound >= ROUNDS.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t border-zinc-800 pt-4 space-y-2"
                >
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-sm">TOTAL "MONEY" CREATED:</span>
                    <span className="text-emerald-400 text-lg font-bold">$1,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-sm">ACTUAL CASH IN SYSTEM:</span>
                    <span className="text-amber-400 text-lg font-bold">$100</span>
                  </div>
                </motion.div>
              )}
            </div>

            {multiplierRound >= ROUNDS.length && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={nextPhase}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-sm transition-colors"
              >
                This is fractional reserve banking
              </motion.button>
            )}
          </motion.div>
        )}

        {/* PROFITS */}
        {phase === 'profits' && (
          <motion.div
            key="profits"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-zinc-900 border border-zinc-800 font-mono">
              <p className="text-zinc-400 text-sm mb-4">Let's count the profits.</p>

              <div className="space-y-4">
                <div className="p-4 bg-zinc-800/50 border border-zinc-700">
                  <p className="text-zinc-500 text-[10px] uppercase mb-2">BANK EARNINGS (on the chain)</p>
                  <div className="text-zinc-400 text-sm space-y-1">
                    <p>$90 × 7% = $6.30</p>
                    <p>$81 × 7% = $5.67</p>
                    <p>$72.90 × 7% = $5.10</p>
                    <p className="text-zinc-600">...</p>
                  </div>
                  <p className="text-emerald-400 text-sm mt-2">Total: ~$70/year across the system</p>
                </div>

                <div className="p-4 bg-zinc-800/50 border border-zinc-700">
                  <p className="text-zinc-500 text-[10px] uppercase mb-2">YOUR EARNINGS</p>
                  <p className="text-zinc-400 text-sm">$100 × 0.5% = <span className="text-red-400">$0.50/year</span></p>
                </div>
              </div>

              <p className="text-zinc-500 text-sm mt-4">
                The banks turned your $100 into $1,000 of loans. They earn interest on all of it. You get 50 cents.
              </p>
            </div>
            <button
              onClick={nextPhase}
              className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-sm transition-colors"
            >
              Continue
            </button>
          </motion.div>
        )}

        {/* QUIZ */}
        {phase === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-zinc-900 border border-zinc-800 font-mono">
              <p className="text-zinc-400 text-sm mb-6">
                Quick question: How much of your $100 does First National actually have in the vault right now?
              </p>

              <div className="space-y-2">
                {[
                  { value: 100, label: '$100 — all of it' },
                  { value: 90, label: '$90 — most of it' },
                  { value: 10, label: '$10 — just a fraction' },
                  { value: 0, label: '$0 — they loaned it all' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleQuizAnswer(option.value)}
                    className={`w-full p-3 text-left border transition-colors ${
                      quizAnswer === option.value
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                        : 'border-zinc-700 hover:border-zinc-600 text-zinc-400'
                    }`}
                  >
                    <span className="text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* QUIZ ANSWER */}
        {phase === 'quiz-answer' && (
          <motion.div
            key="quiz-answer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-zinc-900 border border-zinc-800 font-mono">
              <p className="text-lg mb-4">
                {quizAnswer === 10 ? (
                  <span className="text-emerald-400">Correct!</span>
                ) : (
                  <span className="text-red-400">Not quite.</span>
                )}
              </p>

              <p className="text-zinc-400 text-sm mb-4">
                Answer: <span className="text-white">$10</span>
              </p>

              <p className="text-zinc-400 text-sm mb-4">
                They kept 10%. Loaned out 90%. This is called the "reserve ratio."
              </p>

              <div className="p-4 bg-red-500/10 border border-red-500/30 mt-4">
                <p className="text-zinc-400 text-sm">
                  In the US, as of 2020, the required reserve ratio is:
                </p>
                <p className="text-red-400 text-2xl font-bold mt-2">0%</p>
                <p className="text-zinc-500 text-sm mt-2">Banks can loan out everything.</p>
              </div>
            </div>
            <button
              onClick={nextPhase}
              className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-sm transition-colors"
            >
              Wait, what?
            </button>
          </motion.div>
        )}

        {/* RISK */}
        {phase === 'risk' && (
          <motion.div
            key="risk"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-zinc-900 border border-zinc-800 font-mono">
              <p className="text-zinc-400 text-sm mb-4">
                So what happens if you want your $100 back?
              </p>
              <p className="text-zinc-500 text-sm mb-4">
                No problem. Banks have other deposits. They shuffle money around. You get paid.
              </p>
              <p className="text-white text-sm mb-2">
                But what if EVERYONE wants their money back?
              </p>
              <p className="text-zinc-400 text-sm italic">At the same time?</p>
            </div>
            <button
              onClick={nextPhase}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-zinc-900 font-mono text-sm font-medium transition-colors"
            >
              Show me
            </button>
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
            <div className="p-6 bg-zinc-900 border border-zinc-800 font-mono">
              <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-4">BANK RUN SIMULATOR</p>

              <div className="mb-4">
                <p className="text-white text-sm">FIRST NATIONAL BANK</p>
                <div className="flex justify-between text-zinc-500 text-xs mt-2">
                  <span>Deposits: $10,000,000</span>
                  <span>In vault: $1,000,000</span>
                </div>
              </div>

              <div className="h-4 bg-zinc-800 mb-4 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-red-500"
                  style={{ width: `${bankrunProgress}%` }}
                />
              </div>

              <div className="space-y-1 text-sm mb-4 h-32 overflow-hidden">
                {bankrunProgress > 0 && <p className="text-zinc-400">Person 1 withdraws $5,000 <span className="text-emerald-400">✓</span></p>}
                {bankrunProgress > 10 && <p className="text-zinc-400">Person 2 withdraws $12,000 <span className="text-emerald-400">✓</span></p>}
                {bankrunProgress > 20 && <p className="text-zinc-400">Person 3 withdraws $8,000 <span className="text-emerald-400">✓</span></p>}
                {bankrunProgress > 30 && <p className="text-zinc-600">...</p>}
                {bankrunProgress > 50 && (
                  <p className="text-amber-400 text-xs">NEWS: "First National running low on cash"</p>
                )}
                {bankrunProgress > 60 && <p className="text-zinc-400">Persons 849-6000 all request withdrawals...</p>}
                {bankrunProgress >= 100 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 font-bold"
                  >
                    BANK STATUS: FAILED
                  </motion.p>
                )}
              </div>

              <div className="flex justify-between border-t border-zinc-800 pt-4">
                <span className="text-zinc-500 text-sm">Vault remaining:</span>
                <span className={`text-sm font-bold ${bankFailed ? 'text-red-400' : 'text-amber-400'}`}>
                  ${bankFailed ? '0' : Math.round(vaultRemaining * 10000).toLocaleString()}
                </span>
              </div>
            </div>

            {bankFailed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-center text-zinc-500 font-mono text-sm mb-4">
                  This is called a BANK RUN.
                </p>
                <button
                  onClick={nextPhase}
                  className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-sm transition-colors"
                >
                  Continue
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* REALITY - 2023 Bank Failures */}
        {phase === 'reality' && (
          <motion.div
            key="reality"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-zinc-900 border border-zinc-800 font-mono">
              <p className="text-zinc-400 text-sm mb-6">This isn't theory. It happened.</p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={realityIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-zinc-800/50 border border-red-500/30"
                >
                  <p className="text-white text-sm font-bold">{BANK_FAILURES[realityIndex].name}</p>
                  <p className="text-zinc-500 text-xs mb-3">{BANK_FAILURES[realityIndex].date}</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-zinc-400">Deposits: {BANK_FAILURES[realityIndex].deposits}</p>
                    <p className="text-zinc-400">Withdrawn: {BANK_FAILURES[realityIndex].withdrawn}</p>
                    <p className="text-red-400">Result: {BANK_FAILURES[realityIndex].result}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-2 mt-4">
                {BANK_FAILURES.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${i <= realityIndex ? 'bg-red-400' : 'bg-zinc-700'}`}
                  />
                ))}
              </div>

              {realityIndex >= BANK_FAILURES.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 pt-4 border-t border-zinc-800"
                >
                  <p className="text-zinc-500 text-sm">
                    3 of the 4 largest bank failures in US history. All in 2023. All from the same thing:
                    <span className="text-white"> people wanted their money.</span>
                  </p>
                </motion.div>
              )}
            </div>

            {realityIndex >= BANK_FAILURES.length - 1 && (
              <button
                onClick={nextPhase}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-sm transition-colors"
              >
                Continue
              </button>
            )}
          </motion.div>
        )}

        {/* ALTERNATIVE */}
        {phase === 'alternative' && (
          <motion.div
            key="alternative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-zinc-900 border border-zinc-800 font-mono">
              <p className="text-zinc-400 text-sm mb-4">Now imagine a different system.</p>
              <p className="text-zinc-400 text-sm mb-6">
                You deposit $100 at a "full reserve" institution.
              </p>

              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-zinc-400 text-sm">They keep:</span>
                  <span className="text-emerald-400 text-sm font-bold">$100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400 text-sm">They loan out:</span>
                  <span className="text-emerald-400 text-sm font-bold">$0</span>
                </div>
              </div>

              <p className="text-zinc-400 text-sm mb-2">
                Your $100 is YOUR $100. Always there. Always available.
              </p>
              <p className="text-zinc-500 text-sm">
                No multiplication. No leverage. No risk of runs.
              </p>

              <div className="mt-4 pt-4 border-t border-zinc-800">
                <p className="text-zinc-500 text-sm">The trade-off?</p>
                <p className="text-zinc-400 text-sm mt-2">
                  They can't pay you interest (they're not lending). But they also can't lose your money.
                </p>
              </div>
            </div>
            <button
              onClick={nextPhase}
              className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-sm transition-colors"
            >
              Continue
            </button>
          </motion.div>
        )}

        {/* CHOICE */}
        {phase === 'choice' && (
          <motion.div
            key="choice"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-zinc-900 border border-zinc-800 font-mono">
              <p className="text-zinc-400 text-sm mb-6">Two models:</p>

              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 border border-zinc-700">
                  <p className="text-white text-sm font-bold mb-3">FRACTIONAL RESERVE</p>
                  <p className="text-zinc-600 text-xs mb-2">(traditional banks)</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-emerald-400">✓ Earn tiny interest (0.5%)</p>
                    <p className="text-red-400">✗ Your money is loaned out</p>
                    <p className="text-red-400">✗ Bank run risk</p>
                    <p className="text-red-400">✗ Requires trust + FDIC insurance</p>
                  </div>
                </div>

                <div className="p-4 border border-emerald-500/30">
                  <p className="text-white text-sm font-bold mb-3">FULL RESERVE</p>
                  <p className="text-zinc-600 text-xs mb-2">(some crypto custodians)</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-red-400">✗ No interest earned</p>
                    <p className="text-emerald-400">✓ Your money is always there</p>
                    <p className="text-emerald-400">✓ No bank run risk</p>
                    <p className="text-emerald-400">✓ 1:1 backing, verifiable</p>
                  </div>
                </div>
              </div>

              <p className="text-zinc-500 text-sm mt-6 text-center">
                Neither is "right." But only one is honest about what's happening.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
