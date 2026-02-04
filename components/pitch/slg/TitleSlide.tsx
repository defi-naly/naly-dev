'use client';

import { motion } from 'framer-motion';
import SwissCrossIcon, { SLGLogo } from './SwissCrossIcon';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const concepts = [
  { label: 'CHF Stablecoin', desc: 'Fully-backed Swiss franc digital asset' },
  { label: 'Aave v4 Spoke', desc: 'Regional liquidity hub for DeFi' },
  { label: 'Swiss Compliance', desc: 'FINMA-aligned regulatory framework' },
];

export default function TitleSlide() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-[65vh] flex items-center justify-between px-4 lg:px-12"
    >
      {/* Left: Large Swiss Cross Icon with Shadow */}
      <motion.div
        variants={itemVariants}
        className="hidden lg:block"
      >
        <SwissCrossIcon size={240} withShadow />
      </motion.div>

      {/* Mobile: Smaller cross */}
      <motion.div
        variants={itemVariants}
        className="lg:hidden"
      >
        <SwissCrossIcon size={100} withShadow />
      </motion.div>

      {/* Right: Text Content */}
      <div className="flex-1 lg:flex-none lg:max-w-lg ml-8 lg:ml-12">
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-[#1A1A1A] tracking-tight leading-tight"
        >
          SWISS LIQUIDITY
          <br />
          GATEWAY
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg font-sans text-gray-500 mt-4"
        >
          CHF Stablecoin Infrastructure for Aave v4
        </motion.p>

        {/* Concept Cards */}
        <motion.div
          variants={itemVariants}
          className="mt-8 space-y-3"
        >
          {concepts.map((concept, index) => (
            <motion.div
              key={concept.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="w-3 h-3 bg-[#E53935] rounded-sm flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#1A1A1A] font-sans text-sm font-medium">{concept.label}</p>
                <p className="text-gray-400 font-sans text-xs">{concept.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Version */}
        <motion.p
          variants={itemVariants}
          className="mt-8 text-gray-400 font-sans text-xs"
        >
          Investment Deck v1.0 — February 2025
        </motion.p>
      </div>
    </motion.div>
  );
}
