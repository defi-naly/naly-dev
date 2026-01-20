'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface EmbeddedToolProps {
  title: string;
  toolPath: string;
  liveIndicator?: boolean;
  children: React.ReactNode;
}

export default function EmbeddedTool({
  title,
  toolPath,
  liveIndicator = false,
  children,
}: EmbeddedToolProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="my-8 sm:my-12 border border-zinc-800 rounded-lg overflow-hidden"
    >
      {/* Terminal-style header */}
      <div className="bg-zinc-900 px-4 py-3 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-3">
          {/* Traffic light dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-zinc-700" />
            <span className="w-3 h-3 rounded-full bg-zinc-700" />
            <span className="w-3 h-3 rounded-full bg-zinc-700" />
          </div>

          {/* Title */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-zinc-300">{title}</span>
            {liveIndicator && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono bg-emerald-500/20 text-emerald-400 rounded">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            )}
          </div>
        </div>

        {/* Open full tool link */}
        <Link
          href={toolPath}
          className="flex items-center gap-1 text-xs font-mono text-zinc-500 hover:text-terminal-accent transition-colors"
        >
          Open full tool
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Tool content */}
      <div className="bg-zinc-950 p-4 sm:p-6">
        {children}
      </div>
    </motion.div>
  );
}
