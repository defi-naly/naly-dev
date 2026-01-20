'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Terminal-style prefix */}
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-sm text-terminal-accent">~/naly</span>
          <span className="font-mono text-sm text-neutral-500">$</span>
          <span className="font-mono text-sm text-neutral-400">cat README.md</span>
          <span className="w-2 h-4 bg-terminal-accent animate-blink" />
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1] mb-6">
          De<span className="text-neutral-400">code</span>ing money.
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-neutral-400 max-w-xl leading-relaxed">
          A digital garden of interactive financial dashboards, 
          economic analysis, and long-form writing.
        </p>

        {/* Status indicator */}
        <div className="mt-8 flex items-center gap-6 text-sm font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-terminal-accent animate-pulse" />
            <span className="text-neutral-500">SYSTEMS ONLINE</span>
          </div>
          <div className="h-4 w-px bg-neutral-800" />
          <span className="text-neutral-600">
            {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            }).toUpperCase()}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
