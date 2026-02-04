'use client';

import { motion } from 'framer-motion';
import { RedSquare } from './QuarterCircle';

interface Pillar {
  title: string;
  headline: string;
  dataPoints: { label: string; value: string }[];
  source: string;
}

const pillars: Pillar[] = [
  {
    title: 'Speed & Capital Efficiency',
    headline: 'Instant liquidity vs T+2 settlement',
    dataPoints: [
      { label: 'Traditional CHF loan', value: '2-5 days' },
      { label: 'CHFS collateralized loan', value: '<1 min' },
      { label: 'LTV ratio available', value: 'Up to 80%' },
      { label: 'Liquidation efficiency', value: 'Real-time' },
    ],
    source: 'Aave Protocol Analytics',
  },
  {
    title: 'Carry Trade Opportunity',
    headline: 'Borrow CHF, earn USD yield',
    dataPoints: [
      { label: 'CHFS borrow rate (projected)', value: '1.5-2%' },
      { label: 'USDC supply yield', value: '4-6%' },
      { label: 'Net carry spread', value: '2.5-4%' },
      { label: 'Capital efficiency', value: '5-10x' },
    ],
    source: 'DeFiLlama, Aave Markets',
  },
  {
    title: 'SFTA Benchmark Alignment',
    headline: 'Meets Swiss institutional standards',
    dataPoints: [
      { label: 'Reserve transparency', value: 'Daily' },
      { label: 'Audit frequency', value: 'Quarterly' },
      { label: 'Custody standard', value: 'ISAE 3402' },
      { label: 'AML compliance', value: 'FATF/VQF' },
    ],
    source: 'Swiss Finance + Technology Association',
  },
];

export default function DataEvidenceSlide() {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-600 font-sans text-sm text-center"
      >
        Market validation across three critical dimensions
      </motion.p>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {pillars.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            className="p-5 bg-white border border-gray-200 rounded-lg"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <RedSquare size={16} />
              <h3 className="text-[#1A1A1A] font-sans text-sm font-semibold">{pillar.title}</h3>
            </div>

            {/* Headline */}
            <p className="text-[#E53935] font-sans text-xs font-medium mb-4 pb-4 border-b border-gray-100">
              {pillar.headline}
            </p>

            {/* Data Points */}
            <div className="space-y-3">
              {pillar.dataPoints.map((point, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-gray-500 font-sans text-xs">{point.label}</span>
                  <span className="text-[#1A1A1A] font-sans text-xs font-semibold">{point.value}</span>
                </div>
              ))}
            </div>

            {/* Source */}
            <p className="text-gray-400 font-sans text-[10px] mt-4 pt-4 border-t border-gray-100">
              Source: {pillar.source}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Key Metrics Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-3 gap-4"
      >
        {[
          { label: 'Addressable Market', value: '$10B+', subtext: 'Swiss HNW + institutional' },
          { label: 'Target TVL Year 1', value: '$50M', subtext: 'Conservative estimate' },
          { label: 'Revenue at Scale', value: '$2.5M', subtext: 'At $500M TVL' },
        ].map((stat, i) => (
          <div key={i} className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <p className="text-xs font-sans text-gray-500 uppercase tracking-wider">{stat.label}</p>
            <p className="text-base font-sans font-semibold text-[#E53935] mt-1">{stat.value}</p>
            <p className="text-[10px] font-sans text-gray-400 mt-1">{stat.subtext}</p>
          </div>
        ))}
      </motion.div>

    </div>
  );
}
