import type { LocalDraft, PostType, DraftStatus } from '../data/hub-types';
import { DRAFTS_STORAGE_KEY } from './constants';

function readAll(): LocalDraft[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(DRAFTS_STORAGE_KEY);
    const drafts: LocalDraft[] = raw ? JSON.parse(raw) : [];
    // Migrate old drafts missing new fields
    return drafts.map(d => ({
      ...d,
      status: d.status || 'draft',
      scheduledAt: d.scheduledAt ?? null,
    }));
  } catch {
    return [];
  }
}

function writeAll(drafts: LocalDraft[]) {
  localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
}

export function getDrafts(): LocalDraft[] {
  return readAll().sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function getScheduledDrafts(): LocalDraft[] {
  return readAll()
    .filter(d => d.status === 'scheduled' && d.scheduledAt)
    .sort((a, b) => new Date(a.scheduledAt!).getTime() - new Date(b.scheduledAt!).getTime());
}

export function getDraft(id: string): LocalDraft | null {
  return readAll().find(d => d.id === id) || null;
}

export function createDraft(postType: PostType = 'single'): LocalDraft {
  const draft: LocalDraft = {
    id: crypto.randomUUID(),
    title: '',
    content: [{ type: 'doc', content: [{ type: 'paragraph' }] }],
    postType,
    mediaIds: [[]],
    status: 'draft',
    scheduledAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const all = readAll();
  all.push(draft);
  writeAll(all);
  return draft;
}

export function saveDraft(draft: LocalDraft) {
  const all = readAll();
  const idx = all.findIndex(d => d.id === draft.id);
  const updated = { ...draft, updatedAt: new Date().toISOString() };

  if (idx >= 0) {
    all[idx] = updated;
  } else {
    all.push(updated);
  }

  writeAll(all);
  return updated;
}

export function deleteDraft(id: string) {
  writeAll(readAll().filter(d => d.id !== id));
}
