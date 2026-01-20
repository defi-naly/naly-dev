'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  subtext?: string;
  change?: string;
  status: 'danger' | 'warning' | 'normal';
}

const metrics: Metric[] = [
  {
    label: 'National Debt',
    value: '$38.5T',
    subtext: '+$2.3T in 2025',
    status: 'warning',
  },
  {
    label: 'Debt/GDP',
    value: '121%',
    change: '+1.1% from 2024',
    status: 'warning',
  },
  {
    label: 'Per Household',
    value: '$285,127',
    subtext: 'Every US household',
    status: 'warning',
  },
  {
    label: 'Annual Interest',
    value: '$970B',
    subtext: '2nd largest budget item',
    status: 'danger',
  },
];

const statusBorder = {
  danger: 'border-red-500/30',
  warning: 'border-amber-500/30',
  normal: 'border-zinc-800',
};

const statusAccent = {
  danger: 'text-red-500',
  warning: 'text-amber-500',
  normal: 'text-zinc-100',
};

export default function DebtMetricsGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 my-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`p-4 sm:p-5 bg-zinc-900 border ${statusBorder[metric.status]} rounded-lg`}
        >
          <p className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
            {metric.label}
          </p>
          <p className={`text-xl sm:text-2xl font-mono font-light ${statusAccent[metric.status]}`}>
            {metric.value}
          </p>
          {metric.subtext && (
            <p className="text-[10px] sm:text-xs font-mono text-zinc-600 mt-1">
              {metric.subtext}
            </p>
          )}
          {metric.change && (
            <p className="flex items-center gap-1 text-[10px] sm:text-xs font-mono text-amber-500 mt-1">
              <TrendingUp className="w-3 h-3" />
              {metric.change}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
