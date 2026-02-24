'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageOff } from 'lucide-react';
import type { MediaAsset } from '../data/hub-types';
import { MediaTileSkeleton } from './Skeleton';

interface Props {
  selectable?: boolean;
  selectedIds?: string[];
  onSelect?: (ids: string[]) => void;
  maxSelect?: number;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
};

export default function MediaGrid({ selectable, selectedIds = [], onSelect, maxSelect = 4 }: Props) {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hub/media');
      if (res.ok) {
        const data = await res.json();
        setAssets(data.assets || []);
        setTags(data.tags || []);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = activeTag
    ? assets.filter(a => a.tags.includes(activeTag))
    : assets;

  const toggle = (id: string) => {
    if (!selectable || !onSelect) return;
    if (selectedIds.includes(id)) {
      onSelect(selectedIds.filter(s => s !== id));
    } else if (selectedIds.length < maxSelect) {
      onSelect([...selectedIds, id]);
    }
  };

  if (loading) {
    return (
      <div className="hub-media-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <MediaTileSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Tag filter */}
      {tags.length > 0 && (
        <div className="flex items-center gap-1.5 mb-4 flex-wrap">
          {[null, ...tags].map(tag => (
            <button
              key={tag ?? 'all'}
              onClick={() => setActiveTag(tag)}
              className={`relative px-2.5 py-1 text-xs rounded-md transition-colors ${
                activeTag === tag
                  ? 'text-[var(--hub-text)]'
                  : 'text-[var(--hub-text-muted)] hover:text-[var(--hub-text-secondary)]'
              }`}
              type="button"
            >
              {activeTag === tag && (
                <motion.div
                  layoutId="media-tag"
                  className="absolute inset-0 bg-[var(--hub-surface-active)] rounded-md"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  style={{ zIndex: -1 }}
                />
              )}
              {tag ?? 'All'}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <motion.div
          className="py-16 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--hub-surface)] border border-[var(--hub-border)] mb-4">
            <ImageOff size={20} className="text-[var(--hub-text-muted)]" />
          </div>
          <p className="text-sm text-[var(--hub-text-muted)]">No media yet</p>
          <p className="text-xs text-[var(--hub-text-muted)] mt-1">Upload images and videos to build your library</p>
        </motion.div>
      ) : (
        <motion.div
          className="hub-media-grid"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filtered.map(asset => (
            <motion.button
              key={asset.id}
              variants={item}
              layout
              onClick={() => toggle(asset.id)}
              className={`hub-media-item ${selectedIds.includes(asset.id) ? 'selected' : ''}`}
              type="button"
            >
              {asset.mimeType.startsWith('video/') ? (
                <video src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${asset.r2Key}`} muted />
              ) : (
                <img
                  src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${asset.r2Key}`}
                  alt={asset.altText}
                  loading="lazy"
                />
              )}

              {/* Selection indicator */}
              {selectable && selectedIds.includes(asset.id) && (
                <AnimatePresence>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute inset-0 bg-[var(--hub-accent)]/15 flex items-center justify-center"
                  >
                    <div className="w-6 h-6 rounded-full bg-[var(--hub-accent)] flex items-center justify-center text-white text-xs font-bold shadow-lg">
                      {selectedIds.indexOf(asset.id) + 1}
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Tags on hover */}
              {!selectable && asset.tags.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 hover:opacity-100 transition-opacity">
                  <div className="flex gap-1 flex-wrap">
                    {asset.tags.map(t => (
                      <span key={t} className="text-[10px] text-white/80 bg-white/10 px-1.5 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
