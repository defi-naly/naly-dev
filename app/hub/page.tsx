'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { FileText, MessageSquare, Image, Plus, PenLine } from 'lucide-react';
import { getDrafts, deleteDraft } from './lib/drafts';
import type { LocalDraft } from './data/hub-types';
import PostCard from './components/PostCard';
import ConfirmDialog from './components/ConfirmDialog';
import { PostCardSkeleton, StatCardSkeleton } from './components/Skeleton';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

export default function HubDashboard() {
  const [drafts, setDrafts] = useState<LocalDraft[] | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setDrafts(getDrafts());
  }, []);

  const handleDelete = () => {
    if (!deleteId) return;
    deleteDraft(deleteId);
    setDrafts(prev => prev?.filter(d => d.id !== deleteId) ?? null);
    setDeleteId(null);
    toast.success('Draft deleted');
  };

  const threadCount = drafts?.filter(d => d.postType === 'thread').length ?? 0;
  const scheduledCount = drafts?.filter(d => d.status === 'scheduled').length ?? 0;

  return (
    <>
      <div className="hub-header">
        <h1 className="text-sm font-medium text-[var(--hub-text)]">Dashboard</h1>
        <div className="flex-1" />
        <Link href="/hub/editor" className="hub-btn hub-btn-primary text-xs">
          <Plus size={13} />
          New Post
        </Link>
      </div>

      <div className="hub-content">
        {/* Quick stats */}
        {drafts === null ? (
          <div className="grid grid-cols-3 gap-3 mb-8">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-3 gap-3 mb-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item} className="hub-card">
              <div className="flex items-center gap-2 mb-1">
                <FileText size={12} className="text-[var(--hub-text-muted)]" />
                <p className="text-[11px] font-medium text-[var(--hub-text-muted)] uppercase tracking-wider">Drafts</p>
              </div>
              <p className="text-2xl font-semibold text-[var(--hub-text)] tracking-tight tabular-nums">{drafts.length}</p>
            </motion.div>
            <motion.div variants={item} className="hub-card">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare size={12} className="text-[var(--hub-text-muted)]" />
                <p className="text-[11px] font-medium text-[var(--hub-text-muted)] uppercase tracking-wider">Threads</p>
              </div>
              <p className="text-2xl font-semibold text-[var(--hub-text)] tracking-tight tabular-nums">{threadCount}</p>
            </motion.div>
            <motion.div variants={item} className="hub-card">
              <div className="flex items-center gap-2 mb-1">
                <Image size={12} className="text-[var(--hub-text-muted)]" />
                <p className="text-[11px] font-medium text-[var(--hub-text-muted)] uppercase tracking-wider">
                  {scheduledCount > 0 ? 'Scheduled' : 'Media'}
                </p>
              </div>
              {scheduledCount > 0 ? (
                <Link href="/hub/queue" className="text-2xl font-semibold text-[var(--hub-accent)] tracking-tight hover:underline tabular-nums">
                  {scheduledCount}
                </Link>
              ) : (
                <Link href="/hub/media" className="text-2xl font-semibold text-[var(--hub-accent)] tracking-tight hover:underline">
                  View
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Recent drafts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-[var(--hub-text)]">Recent Drafts</h2>
          </div>

          {drafts === null ? (
            <div className="grid gap-3">
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
            </div>
          ) : drafts.length === 0 ? (
            <motion.div
              className="py-16 text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--hub-surface)] border border-[var(--hub-border)] mb-4">
                <PenLine size={20} className="text-[var(--hub-text-muted)]" />
              </div>
              <p className="text-sm text-[var(--hub-text-secondary)] mb-1">No drafts yet</p>
              <p className="text-xs text-[var(--hub-text-muted)] mb-4">Start writing your first post</p>
              <Link href="/hub/editor" className="hub-btn hub-btn-primary text-xs">
                <Plus size={13} />
                New Post
              </Link>
            </motion.div>
          ) : (
            <motion.div
              className="grid gap-3"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence>
                {drafts.slice(0, 20).map(draft => (
                  <motion.div
                    key={draft.id}
                    variants={item}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                    layout
                  >
                    <PostCard draft={draft} onDelete={setDeleteId} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
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
