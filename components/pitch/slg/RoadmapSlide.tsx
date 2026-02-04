'use client';

import { motion } from 'framer-motion';
import { FileText, Code, Users, Rocket } from 'lucide-react';

interface Phase {
  icon: typeof FileText;
  phase: string;
  timeline: string;
  title: string;
  milestones: string[];
  status: 'active' | 'upcoming' | 'future';
}

const phases: Phase[] = [
  {
    icon: FileText,
    phase: 'Phase 1',
    timeline: 'Months 1-2',
    title: 'Foundation',
    milestones: [
      'Legal entity setup (Swiss AG)',
      'VQF membership application',
      'Banking partnership discussions',
      'Smart contract specification',
    ],
    status: 'active',
  },
  {
    icon: Code,
    phase: 'Phase 2',
    timeline: 'Months 3-4',
    title: 'Development',
    milestones: [
      'CHFS smart contract development',
      'Aave v4 Spoke integration spec',
      'Reserve management system',
      'Security audit (Trail of Bits)',
    ],
    status: 'upcoming',
  },
  {
    icon: Users,
    phase: 'Phase 3',
    timeline: 'Months 5-6',
    title: 'Beta Launch',
    milestones: [
      'Private beta with select users',
      'Banking rail integration testing',
      'Aave governance proposal',
      'Bug bounty program',
    ],
    status: 'future',
  },
  {
    icon: Rocket,
    phase: 'Phase 4',
    timeline: 'Month 7+',
    title: 'Public Launch',
    milestones: [
      'Public CHFS availability',
      'Aave v4 Swiss Spoke live',
      'L2 deployments (Arbitrum, Polygon)',
      'Institutional onboarding',
    ],
    status: 'future',
  },
];

const statusColors = {
  active: {
    border: 'border-[#E53935]',
    badge: 'bg-[#E53935] text-white',
    icon: 'bg-[#E53935]/10 text-[#E53935]',
  },
  upcoming: {
    border: 'border-gray-300',
    badge: 'bg-gray-200 text-gray-600',
    icon: 'bg-gray-100 text-gray-500',
  },
  future: {
    border: 'border-gray-200',
    badge: 'bg-gray-100 text-gray-400',
    icon: 'bg-gray-50 text-gray-400',
  },
};

export default function RoadmapSlide() {
  return (
    <div className="space-y-6">
      {/* Timeline Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.phase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`p-5 bg-white border ${statusColors[phase.status].border} rounded-lg`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${statusColors[phase.status].icon}`}>
                <phase.icon className="w-4 h-4" />
              </div>
              <span className={`px-2 py-0.5 text-[10px] font-sans rounded ${statusColors[phase.status].badge}`}>
                {phase.timeline}
              </span>
            </div>

            {/* Title */}
            <p className="text-[#E53935] font-sans text-xs uppercase tracking-wider mb-1">
              {phase.phase}
            </p>
            <h4 className="text-[#1A1A1A] font-sans text-sm font-semibold mb-4">
              {phase.title}
            </h4>

            {/* Milestones */}
            <ul className="space-y-2">
              {phase.milestones.map((milestone, i) => (
                <li key={i} className="text-xs font-sans text-gray-500 flex items-start gap-2">
                  <span className="text-gray-300 mt-1">○</span>
                  {milestone}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Key Dependencies */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
      >
        <p className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-3">
          Critical Path Dependencies
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#E53935]" />
            <span className="text-xs font-sans text-gray-600">Banking partnership signed</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#E53935]" />
            <span className="text-xs font-sans text-gray-600">Aave v4 Spoke approval</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#E53935]" />
            <span className="text-xs font-sans text-gray-600">Security audit completion</span>
          </div>
        </div>
      </motion.div>

      {/* Funding Ask */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="p-4 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#E53935] font-sans text-sm font-semibold">Seed Round: $2M</p>
            <p className="text-gray-600 font-sans text-xs mt-1">
              18 months runway through public launch + initial growth
            </p>
          </div>
          <div className="text-right">
            <p className="text-[#1A1A1A] font-sans text-sm font-medium">Use of Funds</p>
            <p className="text-gray-500 font-sans text-xs mt-1">
              40% Eng • 25% Legal • 20% Ops • 15% Reserve
            </p>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
