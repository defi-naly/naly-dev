'use client';

import { motion } from 'framer-motion';
import { RedSquare } from './QuarterCircle';

// SVG Icons for borrower segments
const BuildingIcon = () => (
  <svg className="w-5 h-5 text-[#E53935]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg className="w-5 h-5 text-[#E53935]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const WalletIcon = () => (
  <svg className="w-5 h-5 text-[#E53935]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-5 h-5 text-[#E53935]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
  </svg>
);

// Borrower segments data
const borrowerSegments = [
  {
    segment: 'Corporate Exporters',
    icon: BuildingIcon,
    subtitle: 'Pharma, Luxury, Machinery',
    motivation: 'USD Revenue Hedge: US exports reached $73.9B in 2024. Borrow CHF to sell for USD, creating a "short" that offsets losses when CHF strengthens.',
    whyUs: 'Speed: Capture currency moves in seconds, not 2-week bank approval.',
  },
  {
    segment: 'Global Carry Traders',
    icon: TrendingUpIcon,
    subtitle: 'Hedge funds, prop desks',
    motivation: 'Funding Arbitrage: Borrow CHF at 4% to earn 7-9% on USD-stablecoins or BTC-yield in Global Hub.',
    whyUs: 'Leverage: Banks cap LTV at 50%; we provide up to 80% on-chain.',
  },
  {
    segment: 'Digital Asset Whales',
    icon: WalletIcon,
    subtitle: 'HNW crypto holders',
    motivation: 'Tax-Efficient Liquidity: Need cash without selling BTC and triggering a 20%+ tax event.',
    whyUs: 'Collateral: Swiss banks cap BTC LTV at 30% or refuse it. We treat it as Tier-1.',
  },
  {
    segment: 'SME Treasurers',
    icon: BriefcaseIcon,
    subtitle: 'Mid-market Swiss firms',
    motivation: 'Working Capital: Access liquidity at SFTA benchmark rates (1.5-3.5%) without diluting equity.',
    whyUs: 'Accessibility: SMEs are under-banked for rapid credit; permissionless for KYC\'d entities.',
  },
];

// Market sizing data
const marketSizing = [
  { segment: 'US Export Hedging', tam: '$73.9B', capture: '0.5%', tvl: '$370M' },
  { segment: 'Carry Trade Capital', tam: '$50B+', capture: '0.3%', tvl: '$150M' },
  { segment: 'Crypto Collateral', tam: '$20B', capture: '1.0%', tvl: '$200M' },
  { segment: 'SME Working Capital', tam: '$30B', capture: '0.2%', tvl: '$60M' },
];

export default function HedgingUseCaseSlide() {
  return (
    <div className="space-y-4">
      {/* Section 1: Core Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg"
      >
        <div className="flex items-start gap-3">
          <RedSquare size={16} className="flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[#1A1A1A] font-sans text-sm font-semibold mb-1">
              Capturing the Institutional Liquidity Gap
            </h4>
            <p className="text-gray-600 font-sans text-xs leading-relaxed">
              We aren&apos;t competing with the SNB&apos;s interest rate — we&apos;re competing with{' '}
              <span className="font-semibold text-[#E53935]">bank friction</span> and{' '}
              <span className="font-semibold text-[#E53935]">currency exposure</span>.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Section 2: Borrower Segments Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="overflow-x-auto"
      >
        <table className="w-full text-xs font-sans">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-2 py-2 text-left text-gray-500 w-1/4">Segment</th>
              <th className="px-2 py-2 text-left text-gray-500 w-2/5">Borrowing Motivation</th>
              <th className="px-2 py-2 text-left text-[#E53935] bg-red-50 w-1/3">Why Our Spoke?</th>
            </tr>
          </thead>
          <tbody>
            {borrowerSegments.map((row, i) => {
              const Icon = row.icon;
              return (
                <motion.tr
                  key={row.segment}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="border-b border-gray-100"
                >
                  <td className="px-2 py-2">
                    <div className="flex items-center gap-2">
                      <Icon />
                      <div>
                        <p className="text-[#1A1A1A] font-semibold">{row.segment}</p>
                        <p className="text-gray-400 text-[10px]">{row.subtitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-2 text-gray-600 leading-relaxed">
                    {row.motivation}
                  </td>
                  <td className="px-2 py-2 text-[#1A1A1A] bg-red-50/50 font-medium">
                    {row.whyUs}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>

      {/* Section 3: Market Sizing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-2">
          Addressable Market → Target TVL
        </p>
        <div className="grid grid-cols-4 gap-2">
          {marketSizing.map((item, i) => (
            <motion.div
              key={item.segment}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.05 }}
              className="p-2 bg-gray-50 border border-gray-200 rounded text-center"
            >
              <p className="text-[10px] font-sans text-gray-500 mb-1">{item.segment}</p>
              <p className="text-xs font-sans text-gray-400">
                {item.tam} × {item.capture}
              </p>
              <p className="text-sm font-sans font-bold text-[#E53935]">{item.tvl}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-[10px] font-sans text-gray-400 mt-2 text-right">
          Total addressable TVL: <span className="font-semibold text-[#E53935]">$780M</span> at conservative capture rates
        </p>
      </motion.div>

      {/* Section 4: Strategic Advantage */}
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
              The &ldquo;Volatility Tax&rdquo; — Our Strategic Moat
            </p>
            <p className="text-xs font-sans text-emerald-700 leading-relaxed">
              When CHF strengthens (safe-haven spike), <span className="font-semibold">buying</span> CHF for hedging is prohibitive.{' '}
              <span className="font-semibold">Borrowing</span> via our Spoke becomes the only viable path for mid-sized Swiss firms.
              Our 4% rate aligns with 2026 SFTA Safe Harbour benchmarks — the &ldquo;Goldilocks&rdquo; choice for tax-compliant institutional debt.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
