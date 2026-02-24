'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FreeRecallInputProps {
  question: string;
  answer: string;
  onRevealed: () => void;
}

export default function FreeRecallInput({ question, answer, onRevealed }: FreeRecallInputProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
    onRevealed();
  };

  return (
    <div className="mt-recall">
      <div className="mt-recall-question">{question}</div>
      <textarea
        className="mt-recall-input"
        placeholder="Type your answer..."
        value={userAnswer}
        onChange={e => setUserAnswer(e.target.value)}
        rows={3}
        disabled={revealed}
      />
      {!revealed && (
        <button
          className="mt-recall-reveal"
          onClick={handleReveal}
        >
          Show Answer
        </button>
      )}
      <AnimatePresence>
        {revealed && (
          <motion.div
            className="mt-recall-answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-recall-answer-label">Answer</div>
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
