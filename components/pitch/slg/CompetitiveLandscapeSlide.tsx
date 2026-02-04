'use client';

import { motion } from 'framer-motion';
import { RedSquare } from './QuarterCircle';

// Competitive comparison data
const competitiveComparison = [
  {
    asset: 'CHF vs. USD',
    profile: 'The Carry Trader',
    logic: 'The 400bps Engine: SNB at 0%, Fed at 3.75%. USD/CHF carry trade is most efficient globally. Borrow CHF, earn USD yields.',
  },
  {
    asset: 'CHF vs. EUR',
    profile: 'The SME Exporter',
    logic: 'The Safe-Haven Hedge: CHF at decade-highs vs Euro. Borrow CHF to sell for EUR — "short" protects margins from Franc appreciation.',
  },
  {
    asset: 'CHF vs. BTC',
    profile: 'The Digital Whale',
    logic: 'Antifragile Collateral: BTC and CHF correlate in crises. Borrowing CHF against BTC provides "Natural Hedge" USD loans lack.',
  },
];

// Historical proof points
const historicalProof = [
  {
    title: 'Funding Bias',
    stat: 'Stable+',
    description: 'Swiss domestic lending remained stable to increasing during 2015-2022 negative rates.',
  },
  {
    title: 'Asset Shortage',
    stat: 'Inflows',
    description: 'Foreign investors poured into CHF due to shortage of investable CHF assets. Our Spoke fills this gap.',
  },
  {
    title: 'Bank Resistance',
    stat: 'Bypassed',
    description: 'Banks refused to pass negative rates to clients. Our Spoke lets the market set the price.',
  },
];

// SFTA Safe Harbour rates
const sftaRates = [
  { currency: 'CHF', rate: '3.5%', note: 'Operating loans up to 1M CHF' },
  { currency: 'USD', rate: '4.0%', note: '2026 benchmark' },
  { currency: 'EUR', rate: '2.5%', note: '2026 benchmark' },
];

export default function CompetitiveLandscapeSlide() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg"
      >
        <div className="flex items-start gap-3">
          <RedSquare size={16} className="flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[#1A1A1A] font-sans text-sm font-semibold mb-1">
              The &ldquo;Safe-Haven&rdquo; Squeeze
            </h4>
            <p className="text-gray-600 font-sans text-xs leading-relaxed">
              In 2026, CHF is not just a currency — it&apos;s a specialized <span className="font-semibold text-[#E53935]">financial tool</span>.
              Borrowers pay for <span className="font-semibold">Strategic Liquidity</span>, not cheap debt.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Competitive Comparison Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="overflow-x-auto"
      >
        <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-2">
          CHF vs. USD, EUR, BTC — Why They Pay 4%+
        </p>
        <table className="w-full text-[10px] font-sans">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-2 py-1.5 text-left text-gray-500 w-[18%]">Asset Pair</th>
              <th className="px-2 py-1.5 text-left text-[#E53935] w-[18%]">Borrower Profile</th>
              <th className="px-2 py-1.5 text-left text-gray-500 w-[64%]">Market Logic in 0% / Negative Rates</th>
            </tr>
          </thead>
          <tbody>
            {competitiveComparison.map((row, i) => (
              <motion.tr
                key={row.asset}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="border-b border-gray-100"
              >
                <td className="px-2 py-2 font-semibold text-[#1A1A1A]">{row.asset}</td>
                <td className="px-2 py-2 text-[#E53935] font-medium">{row.profile}</td>
                <td className="px-2 py-2 text-gray-600 leading-relaxed">{row.logic}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Two Column: Historical Proof + SFTA Rates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Historical Proof */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="p-3 bg-white border border-gray-200 rounded-lg"
        >
          <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-2">
            Historical Proof: Demand at -0.75%
          </p>
          <div className="space-y-2">
            {historicalProof.map((item) => (
              <div key={item.title} className="flex items-start gap-2">
                <span className="text-[#E53935] font-semibold text-xs w-16 flex-shrink-0">{item.stat}</span>
                <div>
                  <span className="text-[#1A1A1A] font-semibold text-[10px]">{item.title}: </span>
                  <span className="text-gray-600 text-[10px]">{item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SFTA Safe Harbour */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="p-3 bg-white border border-gray-200 rounded-lg"
        >
          <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-2">
            2026 SFTA Safe Harbour Rates
          </p>
          <p className="text-[10px] font-sans text-gray-500 mb-2">
            We don&apos;t guess the rate — the Swiss Federal Tax Administration anchors it:
          </p>
          <div className="space-y-1.5">
            {sftaRates.map((item) => (
              <div key={item.currency} className="flex items-center justify-between p-1.5 bg-gray-50 rounded">
                <span className="text-[#1A1A1A] font-semibold text-xs">{item.currency}</span>
                <span className="text-[#E53935] font-bold text-sm">{item.rate}</span>
                <span className="text-gray-400 text-[9px]">{item.note}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg"
      >
        <div className="flex items-start gap-3">
          <div className="w-4 h-4 rounded-full bg-emerald-500 flex-shrink-0 mt-0.5 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-sans text-emerald-800 font-semibold mb-1">
              The &ldquo;Safe Harbour&rdquo; Sweet Spot
            </p>
            <p className="text-xs font-sans text-emerald-700 leading-relaxed">
              By targeting <span className="font-semibold">4%–4.5%</span>, our Spoke sits within the institutional &ldquo;Safe Harbour&rdquo; window —
              making us the <span className="font-semibold">default choice for tax-compliant Swiss corporate debt</span>.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
