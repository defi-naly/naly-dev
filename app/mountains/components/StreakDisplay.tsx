'use client';

import { motion } from 'framer-motion';
import type { ReviewStats } from '../lib/knowledge';
import { toDateString } from '../lib/srs';

interface StreakDisplayProps {
  stats: ReviewStats;
}

export default function StreakDisplay({ stats }: StreakDisplayProps) {
  // Generate last 30 days for heatmap
  const days: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = toDateString(d);
    days.push({
      date: dateStr,
      count: stats.reviewHistory[dateStr] || 0,
    });
  }

  const maxCount = Math.max(...days.map(d => d.count), 1);

  return (
    <div className="mt-streak">
      <div className="mt-streak-header">
        <div className="mt-streak-current">
          <motion.span
            className="mt-streak-number"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {stats.currentStreak}
          </motion.span>
          <span className="mt-streak-label">day streak</span>
        </div>
        <div className="mt-streak-meta">
          <span>Best: {stats.longestStreak}</span>
          <span>Total: {stats.totalReviews} reviews</span>
        </div>
      </div>

      <div className="mt-streak-heatmap">
        {days.map((day, i) => {
          const intensity = day.count > 0 ? 0.3 + (day.count / maxCount) * 0.7 : 0;
          const dayOfWeek = new Date(day.date + 'T00:00:00').toLocaleDateString('en', { weekday: 'short' }).charAt(0);
          return (
            <div
              key={day.date}
              className="mt-streak-day"
              style={{
                background: day.count > 0
                  ? `rgba(34, 197, 94, ${intensity})`
                  : 'var(--mt-border)',
              }}
              title={`${day.date}: ${day.count} reviews`}
            />
          );
        })}
      </div>
      <div className="mt-streak-heatmap-labels">
        <span>30 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}
