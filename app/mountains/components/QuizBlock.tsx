'use client';

import { useState } from 'react';

interface QuizOption {
  text: string;
  correct?: boolean;
}

interface QuizBlockProps {
  question: string;
  options: QuizOption[];
  explanation: string;
  onCorrect?: () => void;
}

export default function QuizBlock({ question, options, explanation, onCorrect }: QuizBlockProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
    if (options[index].correct && onCorrect) {
      onCorrect();
    }
  };

  const handleRetry = () => {
    setSelected(null);
    setRevealed(false);
  };

  const isWrong = revealed && selected !== null && !options[selected].correct;

  return (
    <div className="mt-quiz">
      <div className="mt-quiz-question">{question}</div>
      <div className="mt-quiz-options">
        {options.map((opt, i) => {
          let className = 'mt-quiz-option';
          if (revealed && i === selected) {
            className += opt.correct ? ' correct' : ' incorrect';
          } else if (revealed && opt.correct) {
            className += ' correct';
          }
          if (i === selected) className += ' selected';

          return (
            <button key={i} className={className} onClick={() => handleSelect(i)}>
              {opt.text}
            </button>
          );
        })}
      </div>
      {revealed && (
        <div className="mt-quiz-explanation">{explanation}</div>
      )}
      {isWrong && (
        <button
          className="mt-quiz-retry"
          onClick={handleRetry}
        >
          Try Again
        </button>
      )}
    </div>
  );
}
