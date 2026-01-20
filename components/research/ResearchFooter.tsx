'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Mail, CheckCircle } from 'lucide-react';

export default function ResearchFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to Substack or an email service
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <div className="mt-16 pt-12 border-t border-zinc-800">
      {/* Email capture CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg p-6 sm:p-8 mb-12"
      >
        <div className="max-w-xl mx-auto text-center">
          <Mail className="w-10 h-10 text-terminal-accent mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">
            Get Weekly Signal Updates
          </h3>
          <p className="text-sm text-zinc-400 mb-6">
            The signals change. Get notified when key thresholds are crossed.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 font-mono text-sm focus:outline-none focus:border-terminal-accent"
              required
            />
            <button
              type="submit"
              disabled={subscribed}
              className="px-6 py-3 bg-terminal-accent text-zinc-900 font-mono text-sm font-medium rounded-lg hover:bg-terminal-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {subscribed ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Subscribed
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>

          <p className="text-xs font-mono text-zinc-600 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <div className="text-center mb-8">
        <p className="text-xs font-mono text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          This is educational content, not financial advice. Historical returns are not indicative
          of future performance. The author may hold positions in assets discussed. Do your own research.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
        <Link
          href="/tools"
          className="flex items-center gap-2 text-sm font-mono text-zinc-400 hover:text-terminal-accent transition-colors"
        >
          Explore All Tools
          <ArrowRight className="w-3 h-3" />
        </Link>
        <Link
          href="/learn/game"
          className="flex items-center gap-2 text-sm font-mono text-zinc-400 hover:text-terminal-accent transition-colors"
        >
          The Money Game
          <ArrowRight className="w-3 h-3" />
        </Link>
        <Link
          href="/research"
          className="flex items-center gap-2 text-sm font-mono text-zinc-400 hover:text-terminal-accent transition-colors"
        >
          More Research
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
