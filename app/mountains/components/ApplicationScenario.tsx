'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ApplicationScenario as Scenario } from '../data/domains';

interface ApplicationScenarioProps {
  scenario: Scenario;
  domainAccent: string;
  onComplete: (correct: boolean) => void;
}

export default function ApplicationScenario({ scenario, domainAccent, onComplete }: ApplicationScenarioProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
    const correct = !!scenario.options[index].correct;
    onComplete(correct);
  };

  return (
    <div className="mt-quiz">
      <div className="mt-quiz-question">{scenario.situation}</div>
      <div className="mt-quiz-options">
        {scenario.options.map((opt, i) => {
          let className = 'mt-quiz-option';
          if (revealed && i === selected) {
            className += opt.correct ? ' correct' : ' incorrect';
          } else if (revealed && opt.correct) {
            className += ' correct';
          }
          if (i === selected) className += ' selected';

          return (
            <button key={i} className={className} onClick={() => handleSelect(i)}>
              {opt.label}
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {revealed && selected !== null && (
          <motion.div
            className="mt-quiz-explanation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            {scenario.options[selected].explanation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
