'use client';

import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, X } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialDate?: string | null;
  onSchedule: (iso: string) => void;
  onUnschedule: () => void;
}

export default function ScheduleDialog({ open, onOpenChange, initialDate, onSchedule, onUnschedule }: Props) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (open && initialDate) {
      const d = new Date(initialDate);
      setDate(d.toISOString().split('T')[0]);
      setTime(d.toTimeString().slice(0, 5));
    } else if (open) {
      // Default to tomorrow at 9:00 AM
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(9, 0, 0, 0);
      setDate(tomorrow.toISOString().split('T')[0]);
      setTime('09:00');
    }
  }, [open, initialDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && time) {
      const iso = new Date(`${date}T${time}`).toISOString();
      onSchedule(iso);
      onOpenChange(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[var(--hub-surface)] border border-[var(--hub-border)] p-6 shadow-2xl"
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ type: 'spring', duration: 0.2, bounce: 0 }}
                style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title className="text-sm font-semibold text-[var(--hub-text)] flex items-center gap-2">
                    <Calendar size={14} />
                    Schedule Post
                  </Dialog.Title>
                  <Dialog.Close className="text-[var(--hub-text-muted)] hover:text-[var(--hub-text)] transition-colors">
                    <X size={16} />
                  </Dialog.Close>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-[11px] font-medium text-[var(--hub-text-muted)] uppercase tracking-wider mb-1.5 block">
                      Date
                    </label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--hub-text-muted)]" />
                      <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        min={minDate}
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-[var(--hub-bg)] border border-[var(--hub-border)] text-[var(--hub-text)] outline-none focus:border-[var(--hub-accent)] transition-colors [color-scheme:dark]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[var(--hub-text-muted)] uppercase tracking-wider mb-1.5 block">
                      Time
                    </label>
                    <div className="relative">
                      <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--hub-text-muted)]" />
                      <input
                        type="time"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-[var(--hub-bg)] border border-[var(--hub-border)] text-[var(--hub-text)] outline-none focus:border-[var(--hub-accent)] transition-colors [color-scheme:dark]"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {initialDate ? (
                      <button
                        type="button"
                        onClick={() => { onUnschedule(); onOpenChange(false); }}
                        className="hub-btn hub-btn-danger text-xs"
                      >
                        Unschedule
                      </button>
                    ) : (
                      <div />
                    )}
                    <div className="flex gap-2">
                      <Dialog.Close className="hub-btn hub-btn-secondary text-xs">
                        Cancel
                      </Dialog.Close>
                      <button type="submit" className="hub-btn hub-btn-primary text-xs">
                        <Clock size={12} />
                        {initialDate ? 'Update Schedule' : 'Schedule'}
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
