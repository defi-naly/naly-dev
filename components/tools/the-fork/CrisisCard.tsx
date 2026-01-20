'use client';

import { motion } from 'framer-motion';

interface CrisisCardProps {
  year: string;
  type: 'PRINT' | 'RESTRUCTURE';
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function CrisisCard({ year, type, title, isSelected, onClick }: CrisisCardProps) {
  const typeColor = type === 'RESTRUCTURE' ? 'amber' : 'emerald';

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left p-4 sm:p-5 rounded-lg border transition-all duration-200 ${
        isSelected
          ? `border-${typeColor}-500 bg-${typeColor}-500/10`
          : 'border-zinc-700 bg-zinc-900 hover:border-zinc-600'
      }`}
      style={isSelected ? {
        borderColor: type === 'RESTRUCTURE' ? 'rgb(245 158 11)' : 'rgb(16 185 129)',
        backgroundColor: type === 'RESTRUCTURE' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)',
      } : undefined}
    >
      <div className="font-mono text-2xl sm:text-3xl font-light text-zinc-100 mb-3">
        {year}
      </div>

      <div
        className={`inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded mb-3 ${
          type === 'RESTRUCTURE'
            ? 'bg-amber-500/20 text-amber-500'
            : 'bg-emerald-500/20 text-emerald-500'
        }`}
      >
        {type}
      </div>

      <div className="font-mono text-sm text-zinc-300 leading-snug">
        {title}
      </div>
    </motion.button>
  );
}
