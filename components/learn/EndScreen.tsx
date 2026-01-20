'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Share2, Link2, Twitter, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface EndScreenProps {
  onRestart: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const summaryItems = [
  'Money solves barter\'s coincidence problem',
  'Scarcity (stock-to-flow) makes money hard',
  'Banks multiply claims beyond reserves',
  'Printing transfers wealth through inflation',
  'Scarce assets outpace cash over time',
];

const SHARE_URL = 'https://naly.dev/learn/game';
const SHARE_TEXT = 'Just finished The Money Game - 8 chapters on how money really works. Worth the 20 minutes.';

export default function EndScreen({ onRestart }: EndScreenProps) {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = SHARE_URL;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4"
    >
      {/* Complete Badge */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2 text-emerald-500 font-mono text-sm uppercase tracking-wider"
      >
        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <Check className="w-4 h-4" />
        </div>
        COMPLETE
      </motion.div>

      {/* Title */}
      <motion.h1
        variants={itemVariants}
        className="text-2xl font-mono font-medium text-white mt-4"
      >
        You finished The Money Game
      </motion.h1>

      {/* Summary Box */}
      <motion.div
        variants={itemVariants}
        className="mt-8 p-6 bg-neutral-900 border border-neutral-800 rounded-lg text-left max-w-md w-full"
      >
        <h3 className="text-neutral-500 font-mono text-xs uppercase tracking-wider mb-4">
          What you learned
        </h3>
        <ul className="space-y-3">
          {summaryItems.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-neutral-300 font-mono text-sm flex items-start gap-2"
            >
              <span className="text-amber-500 mt-0.5">•</span>
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        variants={itemVariants}
        className="mt-8 flex flex-col sm:flex-row gap-3"
      >
        <Link href="/learn/resources">
          <motion.button
            className="bg-amber-500 text-zinc-900 font-mono text-sm font-medium px-6 py-3 rounded hover:bg-amber-400 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <BookOpen className="w-4 h-4" />
            GO DEEPER
          </motion.button>
        </Link>
        <Link href="/tools">
          <motion.button
            className="bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono text-sm px-6 py-3 rounded hover:border-amber-500 hover:text-amber-500 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            EXPLORE TOOLS
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
        <motion.button
          onClick={onRestart}
          className="bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono text-sm px-6 py-3 rounded hover:border-amber-500 hover:text-amber-500 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          PLAY AGAIN
        </motion.button>
      </motion.div>

      {/* Share Section */}
      <motion.div
        variants={itemVariants}
        className="mt-8 relative"
      >
        <motion.button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="flex items-center gap-2 text-neutral-500 hover:text-amber-500 font-mono text-xs transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          <Share2 className="w-4 h-4" />
          Share what you learned
        </motion.button>

        {/* Share Menu */}
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-neutral-900 border border-neutral-800 rounded-lg flex gap-2"
          >
            <motion.button
              onClick={handleShareTwitter}
              className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Share on X"
            >
              <Twitter className="w-4 h-4 text-neutral-300" />
            </motion.button>
            <motion.button
              onClick={handleCopyLink}
              className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Copy link"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Link2 className="w-4 h-4 text-neutral-300" />
              )}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
