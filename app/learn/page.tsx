'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Play, BookOpen } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function LearnPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {/* Hero */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-sm text-terminal-accent">~/learn</span>
                <span className="font-mono text-sm text-neutral-500">$</span>
                <span className="font-mono text-sm text-neutral-400">cat intro.md</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-mono font-medium tracking-tight text-white">
                Decode the money game
              </h1>
              <p className="text-neutral-400 font-mono text-sm leading-relaxed max-w-2xl">
                Most people work for money their whole lives without understanding what it is,
                where it comes from, or why it keeps buying less.
              </p>
            </motion.div>

            {/* The Money Game Card */}
            <motion.div variants={itemVariants}>
              <Link href="/learn/game">
                <div className="group relative bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-amber-500/50 transition-all duration-300">
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded">
                      INTERACTIVE
                    </span>
                  </div>

                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Play className="w-5 h-5 text-amber-500" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-mono font-medium text-white group-hover:text-amber-500 transition-colors">
                        The Money Game
                      </h2>
                      <p className="text-neutral-400 font-mono text-sm mt-2 leading-relaxed">
                        8 chapters. 20 minutes. From barter to Bitcoin, understand why the
                        rules changed — and who they favor.
                      </p>

                      <div className="flex items-center gap-4 mt-4">
                        <span className="inline-flex items-center gap-2 text-amber-500 font-mono text-sm font-medium group-hover:gap-3 transition-all">
                          START
                          <ArrowRight className="w-4 h-4" />
                        </span>
                        <span className="text-neutral-600 font-mono text-xs">
                          ~20 min · 8 chapters
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Resources Link */}
            <motion.div variants={itemVariants}>
              <Link href="/learn/resources">
                <div className="group border-t border-neutral-800 pt-8">
                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center flex-shrink-0 group-hover:border-amber-500/50 transition-colors">
                      <BookOpen className="w-4 h-4 text-neutral-500 group-hover:text-amber-500 transition-colors" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-mono font-medium text-white group-hover:text-amber-500 transition-colors">
                        Resources
                      </h3>
                      <p className="text-neutral-500 font-mono text-sm mt-1">
                        Books, videos, and articles to go deeper. Fourth Turning, Ray Dalio, Lyn Alden, and more.
                      </p>

                      <span className="mt-4 inline-flex items-center gap-2 text-amber-500 font-mono text-sm group-hover:gap-3 transition-all">
                        BROWSE RESOURCES
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
