'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import MountainsNav from '../../components/MountainsNav';
import ScenarioRunner from '../../components/ScenarioRunner';
import { getScenario } from '../../data/scenarios';
import Link from 'next/link';

export default function ScenarioPage() {
  const params = useParams();
  const scenarioId = params.id as string;
  const scenario = getScenario(scenarioId);

  if (!scenario) {
    return (
      <>
        <MountainsNav />
        <main className="mt-main">
          <div className="mt-container" style={{ paddingTop: '6rem' }}>
            <p style={{ color: 'var(--mt-muted)' }}>Scenario not found.</p>
            <Link href="/mountains/scenarios" style={{ color: 'var(--mt-bright)' }}>
              Back to Scenarios
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <div className="mt-bg">
        <div className="mt-bg-topo" />
        <div className="mt-bg-noise" />
        <div className="mt-bg-vignette" />
      </div>

      <MountainsNav />

      <main className="mt-main">
        <div className="mt-container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-domain-header" style={{ borderBottom: 'none', paddingTop: '2rem' }}>
              <div className="mt-domain-header-tag" style={{ color: 'var(--mt-muted)' }}>
                Scenario
              </div>
              <h1>{scenario.title}</h1>
              <div className="mt-domain-header-meta">
                {scenario.description}
              </div>
            </div>

            <ScenarioRunner
              scenario={scenario}
              onComplete={() => {}}
            />
          </motion.div>
        </div>
      </main>
    </>
  );
}
