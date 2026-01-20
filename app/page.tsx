'use client';

import TerminalInput from '@/components/TerminalInput';
import { motion } from 'framer-motion';

export default function TerminalSplash() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-terminal-bg">
      {/* Terminal container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* Site title - subtle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-zinc-600 font-mono text-xs uppercase tracking-widest mb-8"
        >
          naly.dev
        </motion.p>

        {/* Terminal input */}
        <TerminalInput autoFocus placeholder="type a command..." />

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-zinc-700 font-mono text-xs"
        >
          try: <span className="text-zinc-500">home</span>, <span className="text-zinc-500">learn</span>, <span className="text-zinc-500">tools</span>, or <span className="text-zinc-500">game</span>
        </motion.p>
      </motion.div>
    </div>
  );
}
