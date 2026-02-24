'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { SRSCard, Grade } from '../lib/srs';
import { calculateNextReview } from '../lib/srs';
import ReviewCard from './ReviewCard';

type SessionState = 'reviewing' | 'complete';

interface ReviewSessionProps {
  dueCards: SRSCard[];
  onCardReviewed: (updatedCard: SRSCard) => void;
  onSessionComplete: (reviewedCount: number) => void;
  streak: number;
}

export default function ReviewSession({
  dueCards,
  onCardReviewed,
  onSessionComplete,
  streak,
}: ReviewSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionState, setSessionState] = useState<SessionState>('reviewing');
  const [reviewedCount, setReviewedCount] = useState(0);

  const handleGrade = useCallback((grade: Grade) => {
    const card = dueCards[currentIndex];
    const updated = calculateNextReview(card, grade);
    onCardReviewed(updated);

    const newCount = reviewedCount + 1;
    setReviewedCount(newCount);

    if (currentIndex + 1 >= dueCards.length) {
      setSessionState('complete');
      onSessionComplete(newCount);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, dueCards, onCardReviewed, onSessionComplete, reviewedCount]);

  if (sessionState === 'complete') {
    return (
      <motion.div
        className="mt-review-complete"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mt-review-complete-icon">&#10003;</div>
        <h2>Review Complete</h2>
        <p className="mt-review-complete-stats">
          {reviewedCount} card{reviewedCount !== 1 ? 's' : ''} reviewed
        </p>
        {streak > 0 && (
          <p className="mt-review-complete-streak">
            {streak} day streak
          </p>
        )}
      </motion.div>
    );
  }

  const card = dueCards[currentIndex];

  return (
    <div className="mt-review-session">
      <div className="mt-review-progress-bar">
        <div className="mt-review-progress-label">
          {currentIndex + 1}/{dueCards.length} reviews
        </div>
        <div className="mt-progress-bar">
          <motion.div
            className="mt-progress-fill"
            style={{ background: '#22C55E' }}
            animate={{ width: `${((currentIndex + 1) / dueCards.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <ReviewCard
          key={card.id + '-' + currentIndex}
          card={card}
          onGrade={handleGrade}
        />
      </AnimatePresence>
    </div>
  );
}
