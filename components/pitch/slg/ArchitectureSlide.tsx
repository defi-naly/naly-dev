'use client';

import { motion } from 'framer-motion';
import { RedSquare } from './QuarterCircle';

// SVG Icons
const SlidersIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

// Hub and Spoke Diagram Component (Aave-style)
const HubSpokeDiagram = () => (
  <svg viewBox="0 0 320 240" className="w-full h-auto">
    {/* Background */}
    <rect width="320" height="240" fill="#FAFAFA" rx="8" />

    {/* Connection lines (dashed) */}
    {/* Hub to Swiss Spoke (top-left) */}
    <line x1="160" y1="120" x2="60" y2="50" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 3" />
    {/* Hub to EU Spoke (top-right) */}
    <line x1="160" y1="120" x2="260" y2="50" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 3" />
    {/* Hub to US Spoke (bottom-right) */}
    <line x1="160" y1="120" x2="260" y2="190" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 3" />
    {/* Hub to APAC Spoke (bottom-left) */}
    <line x1="160" y1="120" x2="60" y2="190" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 3" />

    {/* Arrows on lines */}
    {/* Swiss arrow */}
    <polygon points="85,70 80,78 90,76" fill="#9CA3AF" />
    <polygon points="135,95 140,103 130,101" fill="#9CA3AF" />
    {/* EU arrow */}
    <polygon points="235,70 230,78 240,76" fill="#9CA3AF" />
    <polygon points="185,95 180,103 190,101" fill="#9CA3AF" />

    {/* Central Hub */}
    <rect x="110" y="85" width="100" height="70" rx="12" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1" />
    <text x="160" y="115" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="600" fontFamily="system-ui">AAVE V4</text>
    <text x="160" y="130" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="600" fontFamily="system-ui">HUB</text>
    <text x="160" y="145" textAnchor="middle" fill="#6B7280" fontSize="8" fontFamily="system-ui">Global Liquidity</text>

    {/* Swiss Spoke (highlighted - top left) */}
    <g>
      <circle cx="60" cy="50" r="32" fill="#E53935" />
      <text x="60" y="46" textAnchor="middle" fill="white" fontSize="9" fontWeight="600" fontFamily="system-ui">SWISS</text>
      <text x="60" y="57" textAnchor="middle" fill="white" fontSize="9" fontWeight="600" fontFamily="system-ui">SPOKE</text>
      {/* Swiss cross icon */}
      <rect x="55" y="28" width="10" height="4" fill="white" />
      <rect x="58" y="25" width="4" height="10" fill="white" />
    </g>

    {/* EU Spoke (top right) */}
    <g>
      <circle cx="260" cy="50" r="28" fill="#9CA3AF" />
      <text x="260" y="46" textAnchor="middle" fill="white" fontSize="9" fontWeight="500" fontFamily="system-ui">EU</text>
      <text x="260" y="57" textAnchor="middle" fill="white" fontSize="9" fontWeight="500" fontFamily="system-ui">SPOKE</text>
    </g>

    {/* US Spoke (bottom right) */}
    <g>
      <circle cx="260" cy="190" r="28" fill="#9CA3AF" />
      <text x="260" y="186" textAnchor="middle" fill="white" fontSize="9" fontWeight="500" fontFamily="system-ui">US</text>
      <text x="260" y="197" textAnchor="middle" fill="white" fontSize="9" fontWeight="500" fontFamily="system-ui">SPOKE</text>
    </g>

    {/* APAC Spoke (bottom left) */}
    <g>
      <circle cx="60" cy="190" r="28" fill="#9CA3AF" />
      <text x="60" y="186" textAnchor="middle" fill="white" fontSize="9" fontWeight="500" fontFamily="system-ui">APAC</text>
      <text x="60" y="197" textAnchor="middle" fill="white" fontSize="9" fontWeight="500" fontFamily="system-ui">SPOKE</text>
    </g>

    {/* Labels */}
    <text x="30" y="230" fill="#E53935" fontSize="8" fontWeight="600" fontFamily="system-ui">● Your Regional Controller</text>
    <text x="180" y="230" fill="#9CA3AF" fontSize="8" fontFamily="system-ui">○ Other Regional Spokes</text>
  </svg>
);

// Profit levers
const profitLevers = [
  {
    icon: SlidersIcon,
    title: 'Dynamic Protocol Fee',
    intro: 'V4 allows Spoke operators to adjust fees independently of the global Hub.',
    details: [
      'Positive rates: Standard 0.50% service charge',
      'Negative rates: Increase fee on borrowers to offset storage costs',
    ],
  },
  {
    icon: ChartIcon,
    title: 'Risk Premium Surcharges',
    intro: 'V4 moves away from uniform rates — premiums flow directly to treasury.',
    details: [
      'Volatile collateral = Base Rate + Risk Premium',
      'High-margin revenue decoupled from central bank rates',
    ],
  },
  {
    icon: ShieldIcon,
    title: 'Compliance Layer (ZK-Gating)',
    intro: 'The Spoke acts as a Compliance Firewall with ZK identity proofs.',
    details: [
      'Only KYC-verified entities interact with CHF pool',
      'Charge Institutional Premium for "Clean Pool" access',
    ],
  },
];

// Architecture flow table
const architectureFlow = [
  { feature: 'Liquidity Hub', role: 'Global assets (USDC, ETH, BTC)', impact: '"Credit Line" to Spokes' },
  { feature: 'Swiss Spoke', role: 'CHFS rules + KYC gating', impact: 'Local Spread + Protocol Fees' },
  { feature: 'Risk Premium', role: 'Collateral-based charges', impact: 'Non-Interest Income' },
  { feature: 'Utilization Curve', role: 'Demand-based rate adjustment', impact: 'Margin protection' },
];

export default function ArchitectureSlide() {
  return (
    <div className="space-y-4">
      {/* Top Section: Diagram + Profit Levers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Hub-Spoke Diagram */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="p-4 bg-white border border-gray-200 rounded-lg"
        >
          <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-3">
            Hub-and-Spoke Architecture
          </p>
          <HubSpokeDiagram />
        </motion.div>

        {/* Profit Levers */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-3"
        >
          <div className="p-3 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg">
            <div className="flex items-start gap-2">
              <RedSquare size={14} className="flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[#1A1A1A] font-sans text-xs font-semibold mb-1">
                  The Swiss Spoke: Your Regional Controller
                </h4>
                <p className="text-gray-600 font-sans text-[11px] leading-relaxed">
                  Governs <span className="font-semibold text-[#E53935]">local risk and fee logic</span> with
                  three primary levers for profitability.
                </p>
              </div>
            </div>
          </div>

          {profitLevers.map((lever, index) => {
            const Icon = lever.icon;
            return (
              <motion.div
                key={lever.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="p-2.5 bg-white border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 bg-[#E53935]/10 rounded text-[#E53935]">
                    <Icon />
                  </div>
                  <h4 className="text-[#1A1A1A] font-sans text-xs font-semibold">{lever.title}</h4>
                </div>
                <p className="text-[10px] font-sans text-gray-500 mb-1.5 ml-7">{lever.intro}</p>
                <ul className="space-y-0.5 ml-7">
                  {lever.details.map((detail, i) => (
                    <li key={i} className="text-[10px] font-sans text-gray-600 flex items-start gap-1.5">
                      <span className="text-[#E53935]">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Architecture Flow Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="overflow-x-auto"
      >
        <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-2">
          Architecture Flow
        </p>
        <table className="w-full text-xs font-sans">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-2 py-1.5 text-left text-gray-500 w-1/4">Feature</th>
              <th className="px-2 py-1.5 text-left text-gray-500 w-2/5">Role</th>
              <th className="px-2 py-1.5 text-left text-[#E53935] bg-red-50 w-1/3">Profitability Impact</th>
            </tr>
          </thead>
          <tbody>
            {architectureFlow.map((row, i) => (
              <tr key={row.feature} className="border-b border-gray-100">
                <td className="px-2 py-1.5 font-semibold text-[#1A1A1A]">{row.feature}</td>
                <td className="px-2 py-1.5 text-gray-600">{row.role}</td>
                <td className="px-2 py-1.5 text-[#1A1A1A] bg-red-50/50 font-medium">{row.impact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

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
              Spoke-Level Control = Rate Independence
            </p>
            <p className="text-xs font-sans text-emerald-700 leading-relaxed">
              Adjust Protocol Fees and Risk Premiums to maintain profitability even at <span className="font-semibold">-0.75% SNB</span>. Revenue decoupled from central bank policy.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
