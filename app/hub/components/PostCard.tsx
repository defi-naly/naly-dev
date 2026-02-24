'use client';

import Link from 'next/link';
import { FileText, MessageSquare, ChevronRight, Trash2, Clock } from 'lucide-react';
import type { LocalDraft } from '../data/hub-types';
import { tiptapToText } from '../lib/thread-utils';
import { POST_TYPE_LABELS } from '../lib/constants';

interface Props {
  draft: LocalDraft;
  onDelete?: (id: string) => void;
}

export default function PostCard({ draft, onDelete }: Props) {
  const preview = draft.content?.[0] ? tiptapToText(draft.content[0]) : '';
  const truncated = preview.length > 120 ? preview.slice(0, 120) + '...' : preview;
  const timeAgo = getTimeAgo(draft.updatedAt);
  const isThread = draft.postType === 'thread';

  return (
    <div className="group relative">
      <Link href={`/hub/editor?id=${draft.id}`} className="block no-underline">
        <div className="hub-card hub-card-interactive">
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {isThread ? (
                <MessageSquare size={13} className="text-[var(--hub-text-muted)] flex-shrink-0" />
              ) : (
                <FileText size={13} className="text-[var(--hub-text-muted)] flex-shrink-0" />
              )}
              <h3 className="text-sm font-medium text-[var(--hub-text)] truncate">
                {draft.title || 'Untitled'}
              </h3>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {draft.scheduledAt && (
                <span className="hub-schedule-badge">
                  <Clock size={9} />
                  {new Date(draft.scheduledAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                </span>
              )}
              <span className="text-[11px] text-[var(--hub-text-muted)] whitespace-nowrap">
                {timeAgo}
              </span>
              <ChevronRight
                size={14}
                className="text-[var(--hub-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {truncated && (
            <p className="text-[13px] text-[var(--hub-text-secondary)] line-clamp-2 mb-2 ml-[21px]">
              {truncated}
            </p>
          )}

          <div className="flex items-center gap-2 text-[11px] text-[var(--hub-text-muted)] ml-[21px]">
            <span>{POST_TYPE_LABELS[draft.postType]}</span>
            {draft.content.length > 1 && (
              <>
                <span>·</span>
                <span>{draft.content.length} tweets</span>
              </>
            )}
            {draft.mediaIds.flat().length > 0 && (
              <>
                <span>·</span>
                <span>{draft.mediaIds.flat().length} media</span>
              </>
            )}
          </div>
        </div>
      </Link>

      {/* Delete button — outside the link */}
      {onDelete && (
        <button
          onClick={e => { e.preventDefault(); e.stopPropagation(); onDelete(draft.id); }}
          className="absolute top-3 right-12 p-1.5 rounded-md text-[var(--hub-text-muted)] opacity-0 group-hover:opacity-100 hover:text-[var(--hub-danger)] hover:bg-[rgba(239,68,68,0.08)] transition-all"
          type="button"
          title="Delete draft"
        >
          <Trash2 size={13} />
        </button>
      )}
    </div>
  );
}

function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
