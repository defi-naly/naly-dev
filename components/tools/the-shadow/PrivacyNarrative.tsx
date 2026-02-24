'use client';

import { motion } from 'framer-motion';
import { Eye, Lock, Cpu, TrendingUp } from 'lucide-react';

const cards = [
  {
    icon: Eye,
    title: 'AI-Powered Surveillance',
    body: 'Every transparent blockchain transaction is training data for AI pattern analysis. BTC pseudonymity is obsolete against modern machine learning. ZEC shielded transactions produce no data to analyze.',
    accent: 'text-red-400',
    border: 'border-red-500/20',
  },
  {
    icon: Lock,
    title: 'CBDCs & Programmable Money',
    body: 'CBDCs give governments transaction-level control over citizens. Private money is the exit. ZEC has Bitcoin\'s monetary policy with actual privacy.',
    accent: 'text-amber-400',
    border: 'border-amber-500/20',
  },
  {
    icon: Cpu,
    title: 'Financial Censorship',
    body: 'AI agents managing payments create machine-readable paper trails. Pattern recognition can flag and block transactions preemptively. Private money preserves human financial agency.',
    accent: 'text-violet-400',
    border: 'border-violet-500/20',
  },
  {
    icon: TrendingUp,
    title: 'The Convergence',
    body: 'BTC proved decentralized hard-cap money works. ZEC adds the missing property: privacy. Same emission curve, same 21M cap. Digital gold vs digital cash.',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/20',
  },
];

export default function PrivacyNarrative() {
  return (
    <div>
      <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">
        The Case for Private Money
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className={`bg-zinc-900/50 border ${card.border} rounded-lg p-4`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-4 h-4 ${card.accent}`} />
                <h4 className={`text-sm font-medium ${card.accent}`}>{card.title}</h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{card.body}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
