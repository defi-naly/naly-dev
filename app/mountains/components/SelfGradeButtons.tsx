'use client';

import type { Grade } from '../lib/srs';

interface SelfGradeButtonsProps {
  onGrade: (grade: Grade) => void;
  disabled?: boolean;
}

const grades: { label: string; grade: Grade; color: string }[] = [
  { label: 'Again', grade: 1, color: 'var(--mt-danger)' },
  { label: 'Hard', grade: 3, color: '#F59E0B' },
  { label: 'Good', grade: 4, color: '#22C55E' },
  { label: 'Easy', grade: 5, color: 'var(--mt-weather)' },
];

export default function SelfGradeButtons({ onGrade, disabled }: SelfGradeButtonsProps) {
  return (
    <div className="mt-grade-buttons">
      {grades.map(g => (
        <button
          key={g.grade}
          className="mt-grade-btn"
          style={{ '--grade-color': g.color } as React.CSSProperties}
          onClick={() => onGrade(g.grade)}
          disabled={disabled}
        >
          {g.label}
        </button>
      ))}
    </div>
  );
}
