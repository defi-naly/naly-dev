'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Clock, Plus, Calendar } from 'lucide-react';
import { getScheduledDrafts, getDrafts, deleteDraft } from '../lib/drafts';
import type { LocalDraft } from '../data/hub-types';
import PostCard from '../components/PostCard';
import ConfirmDialog from '../components/ConfirmDialog';
import { PostCardSkeleton } from '../components/Skeleton';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

export default function QueuePage() {
  const [scheduled, setScheduled] = useState<LocalDraft[] | null>(null);
  const [unscheduled, setUnscheduled] = useState<LocalDraft[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const all = getDrafts();
    setScheduled(all.filter(d => d.status === 'scheduled' && d.scheduledAt));
    setUnscheduled(all.filter(d => d.status === 'draft'));
  }, []);

  const handleDelete = () => {
    if (!deleteId) return;
    deleteDraft(deleteId);
    setScheduled(prev => prev?.filter(d => d.id !== deleteId) ?? null);
    setUnscheduled(prev => prev.filter(d => d.id !== deleteId));
    setDeleteId(null);
    toast.success('Draft deleted');
  };

  // Group scheduled by date
  const grouped: Record<string, LocalDraft[]> = {};
  scheduled?.forEach(d => {
    if (d.scheduledAt) {
      const day = new Date(d.scheduledAt).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push(d);
    }
  });

  return (
    <>
      <div className="hub-header">
        <h1 className="text-sm font-medium text-[var(--hub-text)]">Queue</h1>
        <div className="flex-1" />
        <Link href="/hub/calendar" className="hub-btn hub-btn-ghost text-xs">
          <Calendar size={13} />
          Calendar
        </Link>
        <Link href="/hub/editor" className="hub-btn hub-btn-primary text-xs ml-2">
          <Plus size={13} />
          New Post
        </Link>
      </div>

      <div className="hub-content">
        {/* Scheduled */}
        <div className="mb-10">
          <h2 className="text-sm font-medium text-[var(--hub-text)] mb-4 flex items-center gap-2">
            <Clock size={14} className="text-[var(--hub-accent)]" />
            Scheduled
          </h2>

          {scheduled === null ? (
            <div className="grid gap-3">
              <PostCardSkeleton />
              <PostCardSkeleton />
            </div>
          ) : Object.keys(grouped).length === 0 ? (
            <motion.div
              className="py-12 text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--hub-surface)] border border-[var(--hub-border)] mb-4">
                <Clock size={20} className="text-[var(--hub-text-muted)]" />
              </div>
              <p className="text-sm text-[var(--hub-text-secondary)] mb-1">No scheduled posts</p>
              <p className="text-xs text-[var(--hub-text-muted)]">Schedule a post from the editor to see it here</p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {Object.entries(grouped).map(([day, posts]) => (
                <div key={day}>
                  <p className="text-[11px] font-medium text-[var(--hub-text-muted)] uppercase tracking-wider mb-2">{day}</p>
                  <motion.div
                    className="grid gap-2"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    <AnimatePresence>
                      {posts.map(draft => (
                        <motion.div key={draft.id} variants={item} layout>
                          <PostCard draft={draft} onDelete={setDeleteId} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Unscheduled drafts */}
        {unscheduled.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-[var(--hub-text)] mb-4">Unscheduled Drafts</h2>
            <motion.div
              className="grid gap-2"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {unscheduled.slice(0, 10).map(draft => (
                <motion.div key={draft.id} variants={item}>
                  <PostCard draft={draft} onDelete={setDeleteId} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={open => { if (!open) setDeleteId(null); }}
        title="Delete draft?"
        description="This will permanently delete this draft. This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
      />
    </>
  );
}
