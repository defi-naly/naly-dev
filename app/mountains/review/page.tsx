'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import MountainsNav from '../components/MountainsNav';
import ReviewSession from '../components/ReviewSession';
import { getDueCards, SRSCard } from '../lib/srs';
import {
  loadKnowledge,
  updateCardAfterReview,
  recordReviewSession,
  validateStreak,
  KnowledgeState,
} from '../lib/knowledge';
import { generateAllMissingCards } from '../lib/cardGenerator';
import Link from 'next/link';

export default function ReviewPage() {
  const [knowledge, setKnowledge] = useState<KnowledgeState | null>(null);
  const [dueCards, setDueCards] = useState<SRSCard[]>([]);

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
      state = {
        ...state,
        cards: [...state.cards, ...newCards],
      };
      // Update module card IDs
      const modules = { ...state.modules };
      for (const card of newCards) {
        const key = `${card.domain}-${card.moduleSlug}`;
        if (modules[key]) {
          modules[key] = {
            ...modules[key],
            cardIds: [...modules[key].cardIds, card.id],
          };
        }
      }
      state = { ...state, modules };
    }

    setKnowledge(state);
    setDueCards(getDueCards(state.cards));
  }, []);

  const handleCardReviewed = useCallback((updatedCard: SRSCard) => {
    setKnowledge(prev => {
      if (!prev) return prev;
      return updateCardAfterReview(prev, updatedCard);
    });
  }, []);

  const handleSessionComplete = useCallback((reviewedCount: number) => {
    setKnowledge(prev => {
      if (!prev) return prev;
      return recordReviewSession(prev, reviewedCount);
    });
  }, []);

  if (!knowledge) {
    return (
      <>
        <MountainsNav />
        <main className="mt-main">
          <div className="mt-container" style={{ paddingTop: '6rem' }}>
            <p style={{ color: 'var(--mt-muted)' }}>Loading...</p>
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
              <div className="mt-domain-header-tag" style={{ color: '#22C55E' }}>
                Spaced Repetition
              </div>
              <h1>Daily Review</h1>
            </div>

            {dueCards.length === 0 ? (
              <div className="mt-review-empty">
                <div className="mt-review-empty-icon">&#10003;</div>
                <h2>All caught up</h2>
                <p>No cards due for review. Complete modules to generate review cards.</p>
                <Link href="/mountains/learn" className="mt-continue-btn" style={{ borderColor: '#22C55E', color: '#22C55E', display: 'inline-flex', marginTop: '1.5rem' }}>
                  Learn More
                </Link>
              </div>
            ) : (
              <ReviewSession
                dueCards={dueCards}
                onCardReviewed={handleCardReviewed}
                onSessionComplete={handleSessionComplete}
                streak={knowledge.stats.currentStreak}
              />
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
}
