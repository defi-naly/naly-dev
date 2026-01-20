'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CrisisCard from '@/components/tools/the-fork/CrisisCard';
import CrisisDetail from '@/components/tools/the-fork/CrisisDetail';
import ScenarioToggle from '@/components/tools/the-fork/ScenarioToggle';
import ProjectionPanel from '@/components/tools/the-fork/ProjectionPanel';

const CRISES = [
  {
    id: '1933',
    year: '1933',
    type: 'RESTRUCTURE' as const,
    title: 'Gold Revaluation',
    description: 'FDR revalued gold from $20.67 to $35. Dollar devalued 40% overnight. Private gold ownership banned.',
    why: 'Debt deflation crushing the economy. Banks failing. 25% unemployment.',
    assets: {
      gold: { return: 69, note: 'Revaluation' },
      stocks: { return: 105, note: 'Volatile recovery' },
      bonds: { return: 20, note: 'Nominal gains' },
      cash: { return: -40, note: 'Dollar devalued' },
    },
    takeaway: 'Hard assets won. Cash holders lost 40% overnight.',
  },
  {
    id: '1940s',
    year: '1940s',
    type: 'PRINT' as const,
    title: 'WW2 Debt Inflation',
    description: 'Fed printed to finance WW2. Yields capped. Inflation ran hot. Debt/GDP fell from 120% to 30% over 20 years.',
    why: "Couldn't raise taxes enough. Couldn't default. Inflate it away.",
    assets: {
      gold: { return: 0, note: 'Fixed at $35' },
      stocks: { return: 60, note: '+25% real' },
      bonds: { return: -15, note: 'Real terms' },
      cash: { return: -30, note: 'Real terms' },
    },
    takeaway: 'Slow bleed. Savers crushed over a decade. Asset owners kept pace.',
  },
  {
    id: '1971',
    year: '1971',
    type: 'RESTRUCTURE' as const,
    title: 'Nixon Shock',
    description: 'Nixon closed the gold window. Dollar floated freely. End of Bretton Woods.',
    why: "Foreign nations redeeming dollars for gold. US didn't have enough gold.",
    assets: {
      gold: { return: 257, note: '$35 → $125' },
      stocks: { return: 45, note: '0% real' },
      bonds: { return: -20, note: 'Real terms' },
      cash: { return: -35, note: 'Real terms' },
    },
    takeaway: 'Gold exploded. Stocks went nowhere in real terms. Cash destroyed.',
  },
  {
    id: '2008',
    year: '2008',
    type: 'PRINT' as const,
    title: 'QE Era',
    description: 'Fed launched QE. Bought trillions in bonds. Near-zero rates for a decade.',
    why: 'Banking system collapsing. Deflation risk. "Too big to fail."',
    assets: {
      gold: { return: 30, note: 'Steady rise' },
      stocks: { return: 180, note: '+160% real' },
      bonds: { return: 25, note: 'QE boost' },
      cash: { return: -10, note: 'Real terms' },
      bitcoin: { return: null, note: '$0 → $300' },
    },
    takeaway: 'Everything went up. Cash still lost. QE inflated all assets.',
  },
];

const PROJECTIONS = {
  print: {
    description: 'Based on historical average of print scenarios (1940s, 2008)',
    assets: {
      cash: { return: -20, note: 'Inflation erodes' },
      bonds: { return: -10, note: 'Negative real yields' },
      stocks: { return: 50, note: 'Nominal gains, flat real' },
      realEstate: { return: 30, note: 'Nominal gains' },
      gold: { return: 60, note: 'Inflation hedge' },
      bitcoin: { return: 150, note: 'Digital scarcity' },
    },
    takeaway: 'Slow bleed. Assets inflate. Cash melts. Wealth gap widens.',
  },
  restructure: {
    description: 'Based on historical average of restructure scenarios (1933, 1971)',
    assets: {
      cash: { return: -40, note: 'Sharp devaluation' },
      bonds: { return: -30, note: 'Possible haircuts' },
      stocks: { return: 40, note: 'Crash then recover' },
      realEstate: { return: 10, note: 'Mixed' },
      gold: { return: 200, note: 'Revaluation' },
      bitcoin: { return: 300, note: 'If seen as neutral' },
    },
    takeaway: 'Sharp reset. Hard assets explode. Dollar holders wiped fast.',
  },
};

export default function TheForkPage() {
  const [selectedCrisis, setSelectedCrisis] = useState<string>('1933');
  const [scenario, setScenario] = useState<'print' | 'restructure'>('print');

  const currentCrisis = CRISES.find(c => c.id === selectedCrisis);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Tools</span>
          </Link>

          {/* Page header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
              The Fork
            </h1>

            {/* About this tool */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
              <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">About this tool</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Governments in debt crises have two options: Print (inflate the debt away) or Restructure (reset the system).
                This dashboard shows historical examples of each path and their real impact on assets. Same fork. Every time.
              </p>
            </div>
          </div>

          {/* Section 1: Historical Crisis Cards */}
          <div className="mb-8">
            <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">
              Historical Precedents
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {CRISES.map((crisis) => (
                <CrisisCard
                  key={crisis.id}
                  year={crisis.year}
                  type={crisis.type}
                  title={crisis.title}
                  isSelected={selectedCrisis === crisis.id}
                  onClick={() => setSelectedCrisis(crisis.id)}
                />
              ))}
            </div>
          </div>

          {/* Section 2: Crisis Detail */}
          <div className="mb-12">
            <AnimatePresence mode="wait">
              {currentCrisis && (
                <CrisisDetail key={currentCrisis.id} crisis={currentCrisis} />
              )}
            </AnimatePresence>
          </div>

          {/* Section 3: What About Now? */}
          <div className="mb-8">
            <ScenarioToggle selected={scenario} onSelect={setScenario} />
          </div>

          {/* Section 4: Projected Asset Impact */}
          <div className="mb-12">
            <ProjectionPanel
              scenario={scenario}
              projection={PROJECTIONS[scenario]}
            />
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <p className="text-xs font-mono text-zinc-600 max-w-xl mx-auto">
              Historical returns are not indicative of future performance. This is educational content, not financial advice.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
