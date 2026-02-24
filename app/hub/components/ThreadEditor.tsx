'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
import TiptapLink from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  Plus, Trash2, Send, Loader2, Split, ImagePlus, Clock,
  Check, X as XIcon,
} from 'lucide-react';
import type { LocalDraft, TweetContent, PostType, MediaAsset } from '../data/hub-types';
import { saveDraft, deleteDraft } from '../lib/drafts';
import { countXChars, tiptapToText } from '../lib/thread-utils';
import { AUTOSAVE_MS, X_CHAR_LIMIT } from '../lib/constants';
import FormatToolbar from './FormatToolbar';
import CharacterCounter from './CharacterCounter';
import ThreadPreview from './ThreadPreview';
import ConfirmDialog from './ConfirmDialog';
import ScheduleDialog from './ScheduleDialog';
import MediaPickerDialog from './MediaPickerDialog';
import HubTooltip from './HubTooltip';

interface Props {
  draft: LocalDraft;
  onUpdate: (draft: LocalDraft) => void;
}

export default function ThreadEditor({ draft, onUpdate }: Props) {
  const [activeTweet, setActiveTweet] = useState(0);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [removeIdx, setRemoveIdx] = useState<number | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaAssets, setMediaAssets] = useState<Record<string, MediaAsset>>({});
  const timerRef = useRef<NodeJS.Timeout>(null);
  const draftRef = useRef(draft);
  draftRef.current = draft;

  const currentContent = draft.content[activeTweet] || draft.content[0];
  const currentMediaIds = draft.mediaIds[activeTweet] || [];

  // Fetch media assets for thumbnail display
  useEffect(() => {
    const allIds = draft.mediaIds.flat();
    if (allIds.length === 0) return;
    fetch('/api/hub/media')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.assets) {
          const map: Record<string, MediaAsset> = {};
          (Array.isArray(data.assets) ? data.assets : Object.values(data.assets)).forEach((a: MediaAsset) => {
            map[a.id] = a;
          });
          setMediaAssets(map);
        }
      })
      .catch(() => {});
  }, [draft.mediaIds]);

  // Build media URLs for preview
  const mediaUrls = useMemo(() => {
    const urls: Record<number, string[]> = {};
    draft.mediaIds.forEach((ids, i) => {
      if (ids.length > 0) {
        urls[i] = ids
          .map(id => mediaAssets[id])
          .filter(Boolean)
          .map(a => `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${a.r2Key}`);
      }
    });
    return urls;
  }, [draft.mediaIds, mediaAssets]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: false, codeBlock: false, blockquote: false, bulletList: false, orderedList: false, horizontalRule: false }),
      CharacterCount,
      TiptapLink.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: activeTweet === 0 ? "What's on your mind?" : 'Continue the thread...' }),
    ],
    content: currentContent,
    onUpdate: ({ editor: e }) => {
      const json = e.getJSON() as TweetContent;
      const newContent = [...draftRef.current.content];
      newContent[activeTweet] = json;
      const updated = { ...draftRef.current, content: newContent };
      onUpdate(updated);
      scheduleAutosave(updated);
    },
  });

  // Sync editor when switching tweets
  useEffect(() => {
    if (editor && draft.content[activeTweet]) {
      const current = JSON.stringify(editor.getJSON());
      const target = JSON.stringify(draft.content[activeTweet]);
      if (current !== target) {
        editor.commands.setContent(draft.content[activeTweet]);
      }
    }
  }, [activeTweet, editor]);

  const scheduleAutosave = useCallback((d: LocalDraft) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSaving(true);
      saveDraft(d);
      setSaving(false);
      setLastSaved(new Date());
    }, AUTOSAVE_MS);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  // ── Thread management ──
  const addTweet = () => {
    const newContent = [...draft.content, { type: 'doc' as const, content: [{ type: 'paragraph' }] }];
    const newMedia = [...draft.mediaIds, []];
    const updated = { ...draft, content: newContent, mediaIds: newMedia, postType: 'thread' as PostType };
    onUpdate(updated);
    saveDraft(updated);
    setActiveTweet(newContent.length - 1);
  };

  const confirmRemoveTweet = () => {
    if (removeIdx === null || draft.content.length <= 1) return;
    const newContent = draft.content.filter((_, i) => i !== removeIdx);
    const newMedia = draft.mediaIds.filter((_, i) => i !== removeIdx);
    const updated = {
      ...draft,
      content: newContent,
      mediaIds: newMedia,
      postType: newContent.length === 1 ? 'single' as PostType : draft.postType,
    };
    onUpdate(updated);
    saveDraft(updated);
    setActiveTweet(Math.min(activeTweet, newContent.length - 1));
    setRemoveIdx(null);
    toast.success('Tweet removed from thread');
  };

  // ── Media ──
  const handleMediaConfirm = (ids: string[]) => {
    const newMedia = [...draft.mediaIds];
    newMedia[activeTweet] = ids;
    const updated = { ...draft, mediaIds: newMedia };
    onUpdate(updated);
    saveDraft(updated);
  };

  const removeMedia = (mediaId: string) => {
    const newMedia = [...draft.mediaIds];
    newMedia[activeTweet] = currentMediaIds.filter(id => id !== mediaId);
    const updated = { ...draft, mediaIds: newMedia };
    onUpdate(updated);
    saveDraft(updated);
  };

  // ── Schedule ──
  const handleSchedule = (iso: string) => {
    const updated = { ...draft, scheduledAt: iso, status: 'scheduled' as const };
    onUpdate(updated);
    saveDraft(updated);
    toast.success(`Scheduled for ${new Date(iso).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}`);
  };

  const handleUnschedule = () => {
    const updated = { ...draft, scheduledAt: null, status: 'draft' as const };
    onUpdate(updated);
    saveDraft(updated);
    toast('Schedule removed');
  };

  // ── Publish ──
  const handlePublish = async () => {
    setPublishing(true);
    try {
      const tweets = draft.content.map(c => tiptapToText(c)).filter(Boolean);
      if (!tweets.length) {
        toast.error('Nothing to publish');
        return;
      }

      const res = await fetch('/api/hub/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweets, mediaMap: {} }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`Published! ${data.ids?.length || 1} tweet(s)`);
        const updated = { ...draft, status: 'published' as const };
        onUpdate(updated);
        saveDraft(updated);
      } else {
        toast.error(data.error || 'Publish failed');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setPublishing(false);
    }
  };

  const handleDelete = () => {
    deleteDraft(draft.id);
    toast.success('Draft deleted');
    window.location.href = '/hub';
  };

  const text = tiptapToText(currentContent);
  const charCount = countXChars(text);

  return (
    <motion.div
      className="flex gap-6 h-full"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Left: Editor */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        {/* Title */}
        <input
          type="text"
          value={draft.title}
          onChange={e => {
            const updated = { ...draft, title: e.target.value };
            onUpdate(updated);
            scheduleAutosave(updated);
          }}
          placeholder="Title (optional)"
          className="bg-transparent text-[var(--hub-text)] text-lg font-medium outline-none placeholder:text-[var(--hub-text-muted)]"
        />

        {/* Schedule badge */}
        {draft.scheduledAt && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <button
              onClick={() => setScheduleOpen(true)}
              className="hub-schedule-badge cursor-pointer hover:bg-[rgba(59,130,246,0.12)] transition-colors"
              type="button"
            >
              <Clock size={11} />
              Scheduled: {new Date(draft.scheduledAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
            </button>
          </motion.div>
        )}

        {/* Thread tabs */}
        {draft.content.length > 1 && (
          <div className="flex items-center gap-1 relative">
            {draft.content.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTweet(i)}
                className={`relative px-3 py-1 text-xs rounded-md transition-colors ${
                  i === activeTweet
                    ? 'text-[var(--hub-text)]'
                    : 'text-[var(--hub-text-muted)] hover:text-[var(--hub-text-secondary)]'
                }`}
                type="button"
              >
                {i === activeTweet && (
                  <motion.div
                    layoutId="thread-tab"
                    className="absolute inset-0 bg-[var(--hub-surface-active)] rounded-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                {i + 1}
              </button>
            ))}
            <HubTooltip label="Add tweet">
              <button onClick={addTweet} className="hub-toolbar-btn text-lg" type="button">
                <Plus size={14} />
              </button>
            </HubTooltip>
          </div>
        )}

        {/* Toolbar + Editor */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTweet}
            className="hub-card p-0 flex-1 flex flex-col"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.15 }}
          >
            <div className="border-b border-[var(--hub-border)] px-2 py-1 flex items-center justify-between">
              <FormatToolbar editor={editor} />
              <CharacterCounter count={charCount} />
            </div>
            <div className="hub-editor flex-1">
              <EditorContent editor={editor} />
            </div>

            {/* Media thumbnails */}
            {currentMediaIds.length > 0 && (
              <div className="border-t border-[var(--hub-border)] px-4 py-3 flex items-center gap-2">
                {currentMediaIds.map(id => {
                  const asset = mediaAssets[id];
                  return (
                    <div key={id} className="hub-media-thumb">
                      {asset ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${asset.r2Key}`}
                          alt={asset.altText}
                        />
                      ) : (
                        <div className="w-full h-full bg-[var(--hub-surface-active)]" />
                      )}
                      <button
                        className="remove-btn"
                        onClick={() => removeMedia(id)}
                        type="button"
                      >
                        <XIcon size={8} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom bar */}
        <div className="flex items-center gap-3">
          {/* Save status */}
          <AnimatePresence mode="wait">
            {saving ? (
              <motion.span
                key="saving"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-[11px] text-[var(--hub-text-muted)]"
              >
                <span className="hub-save-dot" />
                Saving...
              </motion.span>
            ) : lastSaved ? (
              <motion.span
                key="saved"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-[11px] text-[var(--hub-text-muted)]"
              >
                <span className="hub-save-dot-saved" />
                Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </motion.span>
            ) : null}
          </AnimatePresence>

          <div className="flex-1" />

          {/* Media picker */}
          <HubTooltip label="Attach media">
            <button
              onClick={() => setMediaPickerOpen(true)}
              className="hub-btn hub-btn-ghost text-xs"
              type="button"
            >
              <ImagePlus size={14} />
            </button>
          </HubTooltip>

          {/* Thread controls */}
          {draft.content.length === 1 && (
            <button onClick={addTweet} className="hub-btn hub-btn-ghost text-xs" type="button">
              <Split size={12} />
              Thread
            </button>
          )}

          {draft.content.length > 1 && activeTweet > 0 && (
            <button
              onClick={() => setRemoveIdx(activeTweet)}
              className="hub-btn hub-btn-danger text-xs"
              type="button"
            >
              <XIcon size={12} />
              Remove #{activeTweet + 1}
            </button>
          )}

          <button onClick={() => setDeleteOpen(true)} className="hub-btn hub-btn-ghost text-xs" type="button">
            <Trash2 size={12} />
          </button>

          {/* Schedule */}
          <HubTooltip label="Schedule">
            <button
              onClick={() => setScheduleOpen(true)}
              className={`hub-btn text-xs ${draft.scheduledAt ? 'hub-btn-secondary' : 'hub-btn-ghost'}`}
              type="button"
            >
              <Clock size={12} />
            </button>
          </HubTooltip>

          <button
            onClick={handlePublish}
            disabled={publishing || charCount === 0}
            className="hub-btn hub-btn-primary text-xs"
            type="button"
          >
            {publishing ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Send size={12} />
                Publish
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right: Preview */}
      <div className="w-[380px] flex-shrink-0 hidden lg:block">
        <div className="sticky top-[76px]">
          <p className="text-[11px] font-medium text-[var(--hub-text-muted)] uppercase tracking-wider mb-3">
            Preview
          </p>
          <ThreadPreview content={draft.content} mediaUrls={mediaUrls} />
        </div>
      </div>

      {/* Dialogs */}
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete draft?"
        description="This will permanently delete this draft. This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
      />

      <ConfirmDialog
        open={removeIdx !== null}
        onOpenChange={open => { if (!open) setRemoveIdx(null); }}
        title={`Remove tweet #${(removeIdx ?? 0) + 1}?`}
        description="This tweet will be removed from the thread. Its content will be lost."
        confirmLabel="Remove"
        variant="danger"
        onConfirm={confirmRemoveTweet}
      />

      <ScheduleDialog
        open={scheduleOpen}
        onOpenChange={setScheduleOpen}
        initialDate={draft.scheduledAt}
        onSchedule={handleSchedule}
        onUnschedule={handleUnschedule}
      />

      <MediaPickerDialog
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        selectedIds={currentMediaIds}
        onConfirm={handleMediaConfirm}
      />
    </motion.div>
  );
}
