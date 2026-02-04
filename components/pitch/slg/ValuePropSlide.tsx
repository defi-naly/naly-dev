'use client';

import { motion } from 'framer-motion';
import { RedSquare } from './QuarterCircle';

const features = [
  {
    title: 'CHF Stablecoin (CHFS)',
    description: 'Fully-backed 1:1 with Swiss franc reserves held at regulated Swiss banks. Transparent proof-of-reserves via on-chain attestations.',
    bullets: [
      'Instant mint/redeem via Swiss banking rails',
      'Quarterly reserve audits by Big 4 firm',
      'Available on Ethereum, Arbitrum, Polygon',
    ],
  },
  {
    title: 'Aave v4 Swiss Spoke',
    description: 'First regional liquidity hub under Aave v4\'s new architecture, enabling compliant DeFi yield for CHF holders.',
    bullets: [
      'Isolated risk parameters for Swiss market',
      'Native CHFS lending/borrowing pools',
      'Cross-spoke liquidity via Aave Hub',
    ],
  },
  {
    title: 'Regulatory Alignment',
    description: 'Structured under Swiss DLT law framework with FINMA guidance, positioning for full licensing pathway.',
    bullets: [
      'VQF membership for AML compliance',
      'Swiss custody partners (Sygnum, SEBA)',
      'Path to FINMA FinTech license',
    ],
  },
];

export default function ValuePropSlide() {
  return (
    <div className="space-y-6">
      {/* Value Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-8"
      >
        <p className="text-gray-600 font-sans text-base leading-relaxed max-w-2xl mx-auto">
          Swiss Liquidity Gateway combines a compliant CHF stablecoin with native Aave v4
          integration, unlocking DeFi yields for Swiss capital while maintaining full regulatory alignment.
        </p>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
            className="p-5 bg-white border border-gray-200 rounded-lg hover:border-[#E53935]/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <RedSquare size={20} />
              <h3 className="text-[#1A1A1A] font-sans text-sm font-semibold">{feature.title}</h3>
            </div>
            <p className="text-gray-600 font-sans text-xs leading-relaxed mb-4">
              {feature.description}
            </p>
            <ul className="space-y-2">
              {feature.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2 text-xs font-sans text-gray-500">
                  <span className="text-[#E53935] mt-0.5">→</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Flow Diagram */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg"
      >
        <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-3">Value Flow</p>
        <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-sans">
          <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded">Swiss CHF</span>
          <span className="text-[#E53935]">→</span>
          <span className="px-3 py-1.5 bg-[#E53935]/10 text-[#E53935] border border-[#E53935]/30 rounded font-medium">CHFS Mint</span>
          <span className="text-[#E53935]">→</span>
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded font-medium">Aave Yield</span>
          <span className="text-[#E53935]">→</span>
          <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded">Swiss CHF</span>
        </div>
      </motion.div>

    </div>
  );
}
