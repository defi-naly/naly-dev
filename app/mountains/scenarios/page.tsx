'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MountainsNav from '../components/MountainsNav';
import { scenarios } from '../data/scenarios';
import { domains } from '../data/domains';
import { loadKnowledge, getModuleMastery, KnowledgeState } from '../lib/knowledge';

export default function ScenariosPage() {
  const [knowledge, setKnowledge] = useState<KnowledgeState | null>(null);

  useEffect(() => {
    setKnowledge(loadKnowledge());
  }, []);

  const isUnlocked = (scenario: typeof scenarios[0]): boolean => {
    if (!knowledge) return false;
    return scenario.requirements.every(req => {
      const mastery = getModuleMastery(knowledge, req.domain, req.moduleSlug);
      return mastery && mastery.completedAt !== null;
    });
  };

  const getDomainAccent = (domainId: string) => {
    return domains.find(d => d.id === domainId)?.accent || 'var(--mt-muted)';
  };

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
          <div className="mt-domain-header" style={{ borderBottom: 'none', paddingTop: '2rem' }}>
            <h1>Scenarios</h1>
            <div className="mt-domain-header-meta">
              Cross-domain challenges that test integrated decision-making
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
            {scenarios.map((scenario, i) => {
              const unlocked = isUnlocked(scenario);
              return (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {unlocked ? (
                    <Link
                      href={`/mountains/scenarios/${scenario.id}`}
                      className="mt-scenario-card"
                      style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                    >
                      <div className="mt-scenario-card-header">
                        <div className="mt-scenario-card-title">{scenario.title}</div>
                        <div className="mt-scenario-card-difficulty">{scenario.difficulty}</div>
                      </div>
                      <div className="mt-scenario-card-desc">{scenario.description}</div>
                      <div className="mt-scenario-card-domains">
                        {scenario.domains.map(d => (
                          <span
                            key={d}
                            className="mt-scenario-card-domain"
                            style={{ color: getDomainAccent(d), borderColor: getDomainAccent(d) }}
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ) : (
                    <div className="mt-scenario-card locked">
                      <div className="mt-scenario-card-header">
                        <div className="mt-scenario-card-title">{scenario.title}</div>
                        <div className="mt-scenario-card-difficulty">{scenario.difficulty}</div>
                      </div>
                      <div className="mt-scenario-card-desc">{scenario.description}</div>
                      <div className="mt-scenario-card-domains">
                        {scenario.domains.map(d => (
                          <span key={d} className="mt-scenario-card-domain">{d}</span>
                        ))}
                      </div>
                      <div className="mt-scenario-card-lock">
                        Complete required modules to unlock: {scenario.requirements.map(r => r.moduleSlug.replace(/-/g, ' ')).join(', ')}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
