'use client';

import { useState } from 'react';

interface DecisionOption {
  label: string;
  consequence: string;
  correct?: boolean;
}

interface DecisionNodeProps {
  prompt: string;
  options: DecisionOption[];
  onDecide?: (index: number) => void;
}

export default function DecisionNode({ prompt, options, onDecide }: DecisionNodeProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelected(index);
    onDecide?.(index);
  };

  return (
    <div className="mt-decision">
      <div className="mt-decision-prompt">{prompt}</div>
      <div className="mt-decision-options">
        {options.map((opt, i) => (
          <button
            key={i}
            className={`mt-decision-option ${selected === i ? 'selected' : ''}`}
            onClick={() => handleSelect(i)}
            style={
              selected === i
                ? { borderColor: opt.correct ? '#4ADE80' : 'var(--mt-danger)' }
                : undefined
            }
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'var(--text-base)',
              marginBottom: '0.25rem',
            }}>
              {opt.label}
            </div>
          </button>
        ))}
      </div>
      {selected !== null && (
        <div
          className="mt-decision-consequence"
          style={{
            borderColor: options[selected].correct ? '#4ADE80' : 'var(--mt-danger)',
          }}
        >
          {options[selected].consequence}
        </div>
      )}
    </div>
  );
}
