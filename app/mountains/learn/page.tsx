'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MountainsNav from '../components/MountainsNav';
import { domains } from '../data/domains';
import { loadKnowledge, getCompletedModuleCount, getDomainStrength, KnowledgeState } from '../lib/knowledge';

export default function LearnPage() {
  const [knowledge, setKnowledge] = useState<KnowledgeState | null>(null);

  useEffect(() => {
    setKnowledge(loadKnowledge());
  }, []);

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
            <h1>Learn</h1>
            <div className="mt-domain-header-meta">
              30 interactive modules across 3 domains
            </div>
          </div>

          <div className="mt-domains-grid" style={{ marginTop: '2rem' }}>
            {domains.map((domain, i) => {
              const completed = knowledge ? getCompletedModuleCount(knowledge, domain.id) : 0;
              const strength = knowledge ? getDomainStrength(knowledge, domain.id) : 0;
              const percent = (completed / domain.modules.length) * 100;

              return (
                <motion.div
                  key={domain.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={`/mountains/learn/${domain.id}`}
                    className="mt-domain-card"
                    data-domain={domain.id}
                  >
                    <div className="mt-domain-number">0{i + 1}</div>
                    <div className="mt-domain-name">{domain.name}</div>
                    <div className="mt-domain-book">{domain.book} — {domain.author}</div>
                    <div className="mt-domain-subtitle">{domain.subtitle}</div>
                    <div className="mt-domain-description">{domain.description}</div>
                    <div className="mt-domain-progress">
                      <div className="mt-domain-progress-bar">
                        <div
                          className="mt-domain-progress-fill"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="mt-domain-progress-label">
                        {completed}/{domain.modules.length} modules · {strength}% strength
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
