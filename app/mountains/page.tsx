'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import MountainsNav from './components/MountainsNav';
import KnowledgeMap from './components/KnowledgeMap';
import ReadinessScore from './components/ReadinessScore';
import StreakDisplay from './components/StreakDisplay';
import { loadKnowledge, validateStreak, getDueCardCount, getCompletedModuleCount, getDomainStrength, KnowledgeState } from './lib/knowledge';
import { domains } from './data/domains';
import { generateAllMissingCards } from './lib/cardGenerator';
import { saveKnowledge } from './lib/knowledge';

const TerrainMesh = dynamic(() => import('./components/TerrainMesh'), { ssr: false });
const DangerMap = dynamic(() => import('./components/DangerMap'), { ssr: false });

export default function MountainsPage() {
  const [knowledge, setKnowledge] = useState<KnowledgeState | null>(null);

  useEffect(() => {
    let state = loadKnowledge();
    state = validateStreak(state);

    // Generate any missing cards for completed modules
    const completedModules = Object.values(state.modules)
      .filter(m => m.completedAt !== null)
      .map(m => ({ domain: m.domain, slug: m.moduleSlug }));
    const existingIds = new Set(state.cards.map(c => c.id));
    const newCards = generateAllMissingCards(existingIds, completedModules);
    if (newCards.length > 0) {
      state = { ...state, cards: [...state.cards, ...newCards] };
      const modules = { ...state.modules };
      for (const card of newCards) {
        const key = `${card.domain}-${card.moduleSlug}`;
        if (modules[key]) {
          modules[key] = { ...modules[key], cardIds: [...modules[key].cardIds, card.id] };
        }
      }
      state = { ...state, modules };
      saveKnowledge(state);
    }

    setKnowledge(state);
  }, []);

  const dueCount = knowledge ? getDueCardCount(knowledge) : 0;
  const completedTotal = knowledge ? getCompletedModuleCount(knowledge) : 0;

  return (
    <>
      <div className="mt-bg">
        <div className="mt-bg-topo" />
        <div className="mt-bg-noise" />
        <div className="mt-bg-vignette" />
      </div>

      <MountainsNav />

      <main className="mt-main">
        {/* Hero — full-height with terrain mesh background */}
        <section className="mt-hero">
          <TerrainMesh />
          <motion.h1
            className="mt-wordmark"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Mountains
          </motion.h1>
          <motion.p
            className="mt-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{ color: 'var(--mt-weather)' }}>Weather</span>
            <span style={{ color: 'var(--mt-muted)' }}> &middot; </span>
            <span style={{ color: 'var(--mt-avalanche)' }}>Avalanche</span>
            <span style={{ color: 'var(--mt-muted)' }}> &middot; </span>
            <span style={{ color: 'var(--mt-flying)' }}>Flight</span>
          </motion.p>
        </section>

        {/* Avalanche Danger Map */}
        <div className="mt-container">
          <motion.div
            className="mt-danger-map-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <DangerMap />
          </motion.div>
        </div>

        {/* Domain Cards */}
        <div className="mt-container" style={{ paddingBottom: '2rem' }}>
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

        {/* Dashboard */}
        {knowledge && (
          <div className="mt-container" style={{ paddingBottom: '6rem' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {/* Review CTA */}
              {dueCount > 0 && (
                <Link href="/mountains/review" className="mt-review-cta">
                  <div className="mt-review-cta-count">{dueCount}</div>
                  <div className="mt-review-cta-text">
                    <span>cards due for review</span>
                    <span className="mt-review-cta-action">Start review session</span>
                  </div>
                </Link>
              )}

              <div className="mt-dashboard-grid">
                <div className="mt-dashboard-left">
                  <ReadinessScore knowledge={knowledge} />
                  <StreakDisplay stats={knowledge.stats} />
                </div>
                <div className="mt-dashboard-right">
                  <KnowledgeMap knowledge={knowledge} />
                </div>
              </div>

              {/* Quick links */}
              <div className="mt-dashboard-actions">
                <Link href="/mountains/learn" className="mt-dashboard-action">
                  <span className="mt-dashboard-action-label">Learn</span>
                  <span className="mt-dashboard-action-meta">{completedTotal}/30 modules</span>
                </Link>
                <Link href="/mountains/scenarios" className="mt-dashboard-action">
                  <span className="mt-dashboard-action-label">Scenarios</span>
                  <span className="mt-dashboard-action-meta">Cross-domain challenges</span>
                </Link>
                <Link href="/mountains/field" className="mt-dashboard-action">
                  <span className="mt-dashboard-action-label">Field</span>
                  <span className="mt-dashboard-action-meta">Checklists & references</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </>
  );
}
