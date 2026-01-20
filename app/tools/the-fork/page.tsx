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
      gold: {
        return: 69,
        note: 'Revaluation',
        chartData: [
          { year: 0, value: 100 },
          { year: 1, value: 169 },
          { year: 2, value: 169 },
          { year: 3, value: 169 },
          { year: 4, value: 169 },
          { year: 5, value: 169 },
        ],
      },
      stocks: {
        return: 105,
        note: 'Volatile recovery',
        chartData: [
          { year: 0, value: 100 },
          { year: 1, value: 55 },
          { year: 2, value: 85 },
          { year: 3, value: 120 },
          { year: 4, value: 165 },
          { year: 5, value: 205 },
        ],
      },
      bonds: {
        return: 20,
        note: 'Nominal gains',
        chartData: [
          { year: 0, value: 100 },
          { year: 1, value: 104 },
          { year: 2, value: 108 },
          { year: 3, value: 112 },
          { year: 4, value: 116 },
          { year: 5, value: 120 },
        ],
      },
      cash: {
        return: -40,
        note: 'Dollar devalued',
        chartData: [
          { year: 0, value: 100 },
          { year: 1, value: 60 },
          { year: 2, value: 60 },
          { year: 3, value: 60 },
          { year: 4, value: 60 },
          { year: 5, value: 60 },
        ],
      },
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
      gold: {
        return: 0,
        note: 'Fixed at $35',
        chartData: [
          { year: 0, value: 100 },
          { year: 1, value: 100 },
          { year: 2, value: 100 },
          { year: 3, value: 100 },
          { year: 4, value: 100 },
          { year: 5, value: 100 },
        ],
      },
      stocks: {
        return: 60,
        note: '+25% real',
        chartData: [
          { year: 0, value: 100 },
          { year: 1, value: 108 },
          { year: 2, value: 120 },
          { year: 3, value: 135 },
          { year: 4, value: 148 },
          { year: 5, value: 160 },
        ],
      },
      bonds: {
        return: -15,
        note: 'Real terms',
        chartData: [
          { year: 0, value: 100 },
          { year: 1, value: 97 },
          { year: 2, value: 94 },
          { year: 3, value: 91 },
          { year: 4, value: 88 },
          { year: 5, value: 85 },
        ],
      },
      cash: {
        return: -30,
        note: 'Real terms',
        chartData: [
          { year: 0, value: 100 },
          { year: 1, value: 94 },
          { year: 2, value: 88 },
          { year: 3, value: 82 },
          { year: 4, value: 76 },
          { year: 5, value: 70 },
        ],
      },
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
      gold: {
        return: 257,
        note: '$35 → $125',
        chartData: [
          { year: 0, value: 100 },
          { year: 1, value: 145 },
          { year: 2, value: 210 },
          { year: 3, value: 280 },
          { year: 4, value: 320 },
          { year: 5, value: 357 },
        ],
      },
      stocks: {
        return: 45,
        note: '0% real',
        chartData: [
          { year: 0, value: 100 },
          { year: 1, value: 115 },
          { year: 2, value: 95 },
          { year: 3, value: 75 },
          { year: 4, value: 110 },
          { year: 5, value: 145 },
        ],
      },
      bonds: {
        return: -20,
        note: 'Real terms',
        chartData: [
          { year: 0, value: 100 },
          { year: 1, value: 96 },
          { year: 2, value: 92 },
          { year: 3, value: 88 },
          { year: 4, value: 84 },
          { year: 5, value: 80 },
        ],
      },
      cash: {
        return: -35,
        note: 'Real terms',
        chartData: [
          { year: 0, value: 100 },
          { year: 1, value: 93 },
          { year: 2, value: 85 },
          { year: 3, value: 78 },
          { year: 4, value: 72 },
          { year: 5, value: 65 },
        ],
      },
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
      gold: {
        return: 30,
        note: 'Steady rise',
        chartData: [
          { year: 0, value: 100 },
          { year: 1, value: 125 },
          { year: 2, value: 140 },
          { year: 3, value: 130 },
          { year: 4, value: 120 },
          { year: 5, value: 130 },
        ],
      },
      stocks: {
        return: 180,
        note: '+160% real',
        chartData: [
          { year: 0, value: 100 },
          { year: 1, value: 55 },
          { year: 2, value: 85 },
          { year: 3, value: 140 },
          { year: 4, value: 200 },
          { year: 5, value: 280 },
        ],
      },
      bonds: {
        return: 25,
        note: 'QE boost',
        chartData: [
          { year: 0, value: 100 },
          { year: 1, value: 105 },
          { year: 2, value: 110 },
          { year: 3, value: 115 },
          { year: 4, value: 120 },
          { year: 5, value: 125 },
        ],
      },
      cash: {
        return: -10,
        note: 'Real terms',
        chartData: [
          { year: 0, value: 100 },
          { year: 1, value: 98 },
          { year: 2, value: 96 },
          { year: 3, value: 94 },
          { year: 4, value: 92 },
          { year: 5, value: 90 },
        ],
      },
      bitcoin: { return: null, note: '$0 → $300' },
    },
    takeaway: 'Everything went up. Cash still lost. QE inflated all assets.',
  },
];

const PROJECTIONS = {
  print: {
    description: 'Based on historical average of print scenarios (1940s, 2008)',
    assets: {
      cash: {
        '1y': { return: -4, note: 'Inflation erodes' },
        '3y': { return: -12, note: 'Inflation erodes' },
        '5y': { return: -20, note: 'Inflation erodes' },
      },
      bonds: {
        '1y': { return: -2, note: 'Negative real yields' },
        '3y': { return: -6, note: 'Negative real yields' },
        '5y': { return: -10, note: 'Negative real yields' },
      },
      stocks: {
        '1y': { return: 10, note: 'Nominal gains' },
        '3y': { return: 30, note: 'Nominal gains' },
        '5y': { return: 50, note: 'Nominal gains, flat real' },
      },
      realEstate: {
        '1y': { return: 6, note: 'Nominal gains' },
        '3y': { return: 18, note: 'Nominal gains' },
        '5y': { return: 30, note: 'Nominal gains' },
      },
      gold: {
        '1y': { return: 12, note: 'Inflation hedge' },
        '3y': { return: 35, note: 'Inflation hedge' },
        '5y': { return: 60, note: 'Inflation hedge' },
      },
      bitcoin: {
        '1y': { return: 30, note: 'Digital scarcity' },
        '3y': { return: 80, note: 'Digital scarcity' },
        '5y': { return: 150, note: 'Digital scarcity' },
      },
    },
    takeaway: 'Slow bleed. Assets inflate. Cash melts. Wealth gap widens.',
  },
  restructure: {
    description: 'Based on historical average of restructure scenarios (1933, 1971)',
    assets: {
      cash: {
        '1y': { return: -30, note: 'Sharp devaluation' },
        '3y': { return: -35, note: 'Partial recovery' },
        '5y': { return: -40, note: 'New equilibrium' },
      },
      bonds: {
        '1y': { return: -20, note: 'Possible haircuts' },
        '3y': { return: -25, note: 'Restructuring' },
        '5y': { return: -30, note: 'Possible haircuts' },
      },
      stocks: {
        '1y': { return: -30, note: 'Initial crash' },
        '3y': { return: 10, note: 'Recovery begins' },
        '5y': { return: 40, note: 'Crash then recover' },
      },
      realEstate: {
        '1y': { return: -10, note: 'Uncertainty' },
        '3y': { return: 0, note: 'Stabilizing' },
        '5y': { return: 10, note: 'Mixed' },
      },
      gold: {
        '1y': { return: 80, note: 'Flight to safety' },
        '3y': { return: 150, note: 'Revaluation' },
        '5y': { return: 200, note: 'Revaluation' },
      },
      bitcoin: {
        '1y': { return: 100, note: 'If seen as neutral' },
        '3y': { return: 200, note: 'If seen as neutral' },
        '5y': { return: 300, note: 'If seen as neutral' },
      },
    },
    takeaway: 'Sharp reset. Hard assets explode. Dollar holders wiped fast.',
  },
};

export default function TheForkPage() {
  const [selectedCrisis, setSelectedCrisis] = useState<string>('1933');
  const [scenario, setScenario] = useState<'print' | 'restructure'>('print');
  const [timePeriod, setTimePeriod] = useState<'1y' | '3y' | '5y'>('5y');

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
              timePeriod={timePeriod}
              onTimePeriodChange={setTimePeriod}
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
