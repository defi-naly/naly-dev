'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AlertTriangle, ArrowRight } from 'lucide-react';

interface Indicator {
  name: string;
  current: string;
  context: string;
  status: 'danger' | 'warning' | 'normal';
  toolPath: string;
}

const indicators: Indicator[] = [
  {
    name: 'S&P/Gold Ratio',
    current: '1.55',
    context: 'Lowest since March 2020',
    status: 'warning',
    toolPath: '/tools/the-line',
  },
  {
    name: 'Fourth Turning',
    current: 'Year 17 of ~22',
    context: 'Deep in crisis era',
    status: 'warning',
    toolPath: '/tools/saeculum',
  },
  {
    name: 'Debt/GDP',
    current: '121%',
    context: 'Highest since WW2',
    status: 'warning',
    toolPath: '/tools/truvalue',
  },
  {
    name: 'Interest/GDP',
    current: '3.2%',
    context: 'Eclipsing 1991 record',
    status: 'danger',
    toolPath: '/tools/the-fork',
  },
];

const statusColors = {
  danger: 'text-red-500 bg-red-500/10',
  warning: 'text-amber-500 bg-amber-500/10',
  normal: 'text-zinc-300 bg-zinc-800',
};

export default function ExecutiveSummary() {
  const elevatedCount = indicators.filter(i => i.status !== 'normal').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-8 sm:my-12 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
        <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-wider">
          Executive Summary
        </h3>
        <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-mono bg-amber-500/20 text-amber-500 rounded">
          <AlertTriangle className="w-3 h-3" />
          {elevatedCount} of 4 elevated
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-mono text-zinc-500 uppercase tracking-wider">
                Indicator
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-mono text-zinc-500 uppercase tracking-wider">
                Current
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-mono text-zinc-500 uppercase tracking-wider hidden sm:table-cell">
                Context
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-mono text-zinc-500 uppercase tracking-wider">
                Tool
              </th>
            </tr>
          </thead>
          <tbody>
            {indicators.map((indicator, index) => (
              <motion.tr
                key={indicator.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-b border-zinc-800/50 last:border-0"
              >
                <td className="px-4 sm:px-6 py-4">
                  <span className="text-sm text-zinc-200">{indicator.name}</span>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <span className={`inline-block px-2 py-0.5 text-sm font-mono rounded ${statusColors[indicator.status]}`}>
                    {indicator.current}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                  <span className="text-sm text-zinc-500">{indicator.context}</span>
                </td>
                <td className="px-4 sm:px-6 py-4 text-right">
                  <Link
                    href={indicator.toolPath}
                    className="inline-flex items-center gap-1 text-xs font-mono text-terminal-accent hover:underline"
                  >
                    View
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
