'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

interface ScoreSelectorProps {
  rubric: [string, string, string, string, string];
  value: number | null;
  onChange: (score: number) => void;
}

export default function ScoreSelector({ rubric, value, onChange }: ScoreSelectorProps) {
  const [hoveredScore, setHoveredScore] = useState<number | null>(null);
  const displayScore = hoveredScore ?? value;

  return (
    <div className="score-selector">
      <div className="score-buttons">
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            className={`score-btn ${value === score ? 'active' : ''} ${hoveredScore === score ? 'hovered' : ''}`}
            onClick={() => onChange(score)}
            onMouseEnter={() => setHoveredScore(score)}
            onMouseLeave={() => setHoveredScore(null)}
          >
            {score}
          </button>
        ))}
      </div>
      <div className="score-rubric">
        {displayScore ? (
          <motion.p
            key={displayScore}
            className="score-rubric-text"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {rubric[displayScore - 1]}
          </motion.p>
        ) : (
          <p className="score-rubric-hint">Select a score to see the rubric description</p>
        )}
      </div>
    </div>
  );
}
