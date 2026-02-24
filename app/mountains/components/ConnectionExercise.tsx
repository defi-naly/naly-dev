'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Module } from '../data/domains';
import { getModule } from '../data/domains';

interface ConnectionExerciseProps {
  module: Module;
  domainAccent: string;
  onComplete: () => void;
}

export default function ConnectionExercise({ module, domainAccent, onComplete }: ConnectionExerciseProps) {
  const [answer, setAnswer] = useState('');
  const [revealed, setRevealed] = useState(false);

  const relatedMod = module.relatedModules?.[0]
    ? getModule(module.relatedModules[0].domain, module.relatedModules[0].slug)
    : null;

  const prompt = module.connectionPrompt
    || (relatedMod
      ? `How does ${module.title.toLowerCase()} connect to ${relatedMod.title.toLowerCase()}?`
      : `How does ${module.title.toLowerCase()} connect to safety decision-making in the mountains?`);

  const exampleAnswer = relatedMod
    ? `${module.title}: ${module.takeaway}\n\n${relatedMod.title}: ${relatedMod.takeaway}\n\nThese concepts are interconnected — understanding one deepens your grasp of the other.`
    : `${module.takeaway}\n\nThis knowledge directly informs decision-making in mountain environments.`;

  const handleReveal = () => {
    setRevealed(true);
    onComplete();
  };

  return (
    <div className="mt-recall">
      <div className="mt-recall-question">{prompt}</div>
      <textarea
        className="mt-recall-input"
        placeholder="Describe the connection..."
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        rows={3}
        disabled={revealed}
      />
      {!revealed && (
        <button className="mt-recall-reveal" onClick={handleReveal}>
          Show Example Answer
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
            <div className="mt-recall-answer-label" style={{ color: domainAccent }}>
              Example Connection
            </div>
            <p>{exampleAnswer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
