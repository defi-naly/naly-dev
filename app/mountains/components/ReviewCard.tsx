'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { SRSCard, Grade } from '../lib/srs';
import { getDomain } from '../data/domains';
import FreeRecallInput from './FreeRecallInput';
import SelfGradeButtons from './SelfGradeButtons';

interface ReviewCardProps {
  card: SRSCard;
  onGrade: (grade: Grade) => void;
}

const cardTypeLabels: Record<string, string> = {
  concept: 'Concept',
  application: 'Application',
  connection: 'Connection',
};

export default function ReviewCard({ card, onGrade }: ReviewCardProps) {
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const domain = getDomain(card.domain);
  const accent = domain?.accent || 'var(--mt-bright)';

  return (
    <motion.div
      className="mt-review-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mt-review-card-header">
        <span
          className="mt-review-card-type"
          style={{ borderColor: accent, color: accent }}
        >
          {cardTypeLabels[card.cardType]}
        </span>
        <span className="mt-review-card-domain" style={{ color: accent }}>
          {domain?.name}
        </span>
      </div>

      <FreeRecallInput
        question={card.question}
        answer={card.answer}
        onRevealed={() => setAnswerRevealed(true)}
      />

      {answerRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="mt-review-card-grade"
        >
          <div className="mt-review-card-grade-label">How well did you know this?</div>
          <SelfGradeButtons onGrade={onGrade} />
        </motion.div>
      )}
    </motion.div>
  );
}
