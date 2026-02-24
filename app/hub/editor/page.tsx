'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getDraft, createDraft } from '../lib/drafts';
import type { LocalDraft } from '../data/hub-types';
import ThreadEditor from '../components/ThreadEditor';
import { EditorSkeleton } from '../components/Skeleton';

function EditorInner() {
  const searchParams = useSearchParams();
  const draftId = searchParams.get('id');
  const [draft, setDraft] = useState<LocalDraft | null>(null);

  useEffect(() => {
    if (draftId) {
      const existing = getDraft(draftId);
      if (existing) {
        setDraft(existing);
        return;
      }
    }
    const newDraft = createDraft();
    setDraft(newDraft);
    window.history.replaceState(null, '', `/hub/editor?id=${newDraft.id}`);
  }, [draftId]);

  if (!draft) {
    return <EditorSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <ThreadEditor draft={draft} onUpdate={setDraft} />
    </motion.div>
  );
}

export default function EditorPage() {
  return (
    <>
      <div className="hub-header">
        <h1 className="text-sm font-medium text-[var(--hub-text)]">Editor</h1>
      </div>
      <div className="hub-content">
        <Suspense fallback={<EditorSkeleton />}>
          <EditorInner />
        </Suspense>
      </div>
    </>
  );
}
