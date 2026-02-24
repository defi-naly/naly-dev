'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Plus } from 'lucide-react';
import { getDrafts } from '../lib/drafts';
import type { LocalDraft } from '../data/hub-types';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarPage() {
  const [drafts, setDrafts] = useState<LocalDraft[]>([]);
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  useEffect(() => {
    setDrafts(getDrafts().filter(d => d.scheduledAt));
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = month.getFullYear();
  const mo = month.getMonth();

  // Calendar grid — 6 weeks starting from Sunday
  const cells = useMemo(() => {
    const firstDay = new Date(year, mo, 1).getDay();
    const daysInMonth = new Date(year, mo + 1, 0).getDate();
    const daysInPrev = new Date(year, mo, 0).getDate();

    const grid: { date: Date; currentMonth: boolean }[] = [];

    // Previous month fill
    for (let i = firstDay - 1; i >= 0; i--) {
      grid.push({ date: new Date(year, mo - 1, daysInPrev - i), currentMonth: false });
    }
    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      grid.push({ date: new Date(year, mo, d), currentMonth: true });
    }
    // Next month fill
    const remaining = 42 - grid.length;
    for (let d = 1; d <= remaining; d++) {
      grid.push({ date: new Date(year, mo + 1, d), currentMonth: false });
    }

    return grid;
  }, [year, mo]);

  // Map drafts to date keys
  const draftsByDate = useMemo(() => {
    const map: Record<string, LocalDraft[]> = {};
    drafts.forEach(d => {
      if (d.scheduledAt) {
        const key = new Date(d.scheduledAt).toDateString();
        if (!map[key]) map[key] = [];
        map[key].push(d);
      }
    });
    return map;
  }, [drafts]);

  const prevMonth = () => setMonth(new Date(year, mo - 1, 1));
  const nextMonth = () => setMonth(new Date(year, mo + 1, 1));
  const goToday = () => setMonth(new Date(today.getFullYear(), today.getMonth(), 1));

  return (
    <>
      <div className="hub-header">
        <h1 className="text-sm font-medium text-[var(--hub-text)]">Calendar</h1>
        <div className="flex-1" />
        <Link href="/hub/queue" className="hub-btn hub-btn-ghost text-xs">
          <Clock size={13} />
          Queue
        </Link>
        <Link href="/hub/editor" className="hub-btn hub-btn-primary text-xs ml-2">
          <Plus size={13} />
          New Post
        </Link>
      </div>

      <div className="hub-content">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Month navigation */}
          <div className="flex items-center gap-3 mb-4">
            <button onClick={prevMonth} className="hub-btn hub-btn-ghost p-1.5" type="button">
              <ChevronLeft size={16} />
            </button>
            <h2 className="text-sm font-semibold text-[var(--hub-text)] min-w-[160px] text-center">
              {month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button onClick={nextMonth} className="hub-btn hub-btn-ghost p-1.5" type="button">
              <ChevronRight size={16} />
            </button>
            <button onClick={goToday} className="hub-btn hub-btn-ghost text-xs" type="button">
              Today
            </button>
          </div>

          {/* Calendar grid */}
          <div className="hub-calendar-grid">
            {/* Header row */}
            {DAYS.map(d => (
              <div key={d} className="hub-calendar-header">{d}</div>
            ))}

            {/* Day cells */}
            {cells.map(({ date, currentMonth }, i) => {
              const key = date.toDateString();
              const isToday = date.toDateString() === today.toDateString();
              const dayDrafts = draftsByDate[key] || [];

              return (
                <div
                  key={i}
                  className={`hub-calendar-cell ${!currentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[11px] font-medium ${
                      isToday ? 'text-[var(--hub-accent)]' : 'text-[var(--hub-text-secondary)]'
                    }`}>
                      {date.getDate()}
                    </span>
                    {isToday && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--hub-accent)]" />
                    )}
                  </div>

                  <div className="space-y-0.5">
                    {dayDrafts.slice(0, 3).map(draft => (
                      <Link
                        key={draft.id}
                        href={`/hub/editor?id=${draft.id}`}
                        className="hub-calendar-dot block no-underline"
                        title={draft.title || 'Untitled'}
                      >
                        {draft.title || 'Untitled'}
                      </Link>
                    ))}
                    {dayDrafts.length > 3 && (
                      <span className="text-[9px] text-[var(--hub-text-muted)]">
                        +{dayDrafts.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </>
  );
}
