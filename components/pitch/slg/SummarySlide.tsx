'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Calendar, FileText, Mail } from 'lucide-react';
import SwissCrossIcon from './SwissCrossIcon';

const keyPoints = [
  {
    title: 'Market Opportunity',
    description: '$10B+ addressable Swiss capital seeking compliant DeFi yield exposure',
  },
  {
    title: 'Unique Position',
    description: 'First CHF stablecoin with native Aave v4 integration and Swiss regulatory alignment',
  },
  {
    title: 'Clear Economics',
    description: 'Profitable at $100M TVL with 50+ bps reserve spread and protocol fees',
  },
  {
    title: 'Execution Ready',
    description: 'Team with Swiss banking + DeFi protocol experience, clear regulatory pathway',
  },
];

const nextSteps = [
  { icon: Calendar, text: 'Schedule deep-dive call', action: 'Book Meeting' },
  { icon: FileText, text: 'Review technical spec', action: 'Request Docs' },
  { icon: Mail, text: 'Connect with team', action: 'Contact Us' },
];

export default function SummarySlide() {
  return (
    <div className="space-y-8">
      {/* Key Points */}
      <div className="space-y-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-sans text-gray-500 uppercase tracking-wider"
        >
          Key Takeaways
        </motion.p>

        {keyPoints.map((point, index) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg"
          >
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[#1A1A1A] font-sans text-sm font-semibold">{point.title}</h4>
              <p className="text-gray-500 font-sans text-xs mt-1">{point.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Why Now */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-5 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg"
      >
        <h3 className="text-[#E53935] font-sans text-sm font-semibold mb-3">Why Now?</h3>
        <ul className="space-y-2">
          <li className="text-gray-700 font-sans text-xs flex items-start gap-2">
            <span className="text-[#E53935]">→</span>
            Aave v4 hub-and-spoke architecture enables regional compliance for the first time
          </li>
          <li className="text-gray-700 font-sans text-xs flex items-start gap-2">
            <span className="text-[#E53935]">→</span>
            Swiss DLT law framework provides clear regulatory pathway
          </li>
          <li className="text-gray-700 font-sans text-xs flex items-start gap-2">
            <span className="text-[#E53935]">→</span>
            SNB rate normalization creates sustainable reserve yield opportunity
          </li>
        </ul>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="space-y-4"
      >
        <p className="text-xs font-sans text-gray-500 uppercase tracking-wider">
          Next Steps
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {nextSteps.map((step, i) => (
            <button
              key={i}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-[#E53935] transition-colors text-left group"
            >
              <step.icon className="w-5 h-5 text-gray-400 group-hover:text-[#E53935] transition-colors mb-3" />
              <p className="text-[#1A1A1A] font-sans text-sm font-medium">{step.action}</p>
              <p className="text-gray-500 font-sans text-xs mt-1">{step.text}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-center pt-4 border-t border-gray-200"
      >
        <p className="text-gray-500 font-sans text-xs">
          Swiss Liquidity Gateway AG (in formation) — Zug, Switzerland
        </p>
        <p className="text-gray-400 font-sans text-xs mt-1">
          contact@slg.swiss — slg.swiss
        </p>
      </motion.div>

    </div>
  );
}
