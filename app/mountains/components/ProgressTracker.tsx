'use client';

interface ProgressTrackerProps {
  completed: number;
  total: number;
  accent: string;
  label?: string;
}

export default function ProgressTracker({ completed, total, accent, label }: ProgressTrackerProps) {
  const percent = total > 0 ? (completed / total) * 100 : 0;
  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="mt-progress-tracker">
      <div className="mt-progress-ring">
        <svg viewBox="0 0 44 44" width="48" height="48">
          <circle className="mt-progress-ring-bg" cx="22" cy="22" r="18" />
          <circle
            className="mt-progress-ring-fill"
            cx="22"
            cy="22"
            r="18"
            stroke={accent}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
      </div>
      <div className="mt-progress-count">
        {completed}/{total} {label || 'modules'}
      </div>
    </div>
  );
}
