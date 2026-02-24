'use client';

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import type { TweetContent } from '../data/hub-types';
import { tiptapToText, countXChars } from '../lib/thread-utils';
import CharacterCounter from './CharacterCounter';

interface Props {
  content: TweetContent[];
  mediaUrls?: Record<number, string[]>;
}

export default function ThreadPreview({ content, mediaUrls = {} }: Props) {
  if (!content.length) return null;

  return (
    <LayoutGroup>
      <AnimatePresence initial={false}>
        {content.map((tweet, i) => {
          const text = tiptapToText(tweet);
          const count = countXChars(text);
          const isThread = content.length > 1;
          const tweetMedia = mediaUrls[i] || [];

          return (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30, delay: i * 0.05 }}
            >
              {i > 0 && <div className="tweet-connector" />}
              <div className="tweet-preview">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--hub-surface-active)] flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-[var(--hub-text)]">You</span>
                      <span className="text-sm text-[var(--hub-text-muted)]">@handle</span>
                      {isThread && (
                        <span className="text-[11px] text-[var(--hub-text-muted)] ml-auto">
                          {i + 1}/{content.length}
                        </span>
                      )}
                    </div>

                    <div className="text-[0.9375rem] leading-relaxed text-[var(--hub-text)] whitespace-pre-wrap break-words">
                      {text || (
                        <span className="text-[var(--hub-text-muted)] italic text-sm">
                          Start writing...
                        </span>
                      )}
                    </div>

                    {/* Media preview */}
                    {tweetMedia.length > 0 && (
                      <div className={`mt-3 grid gap-1 rounded-xl overflow-hidden ${
                        tweetMedia.length === 1 ? 'grid-cols-1' :
                        tweetMedia.length === 2 ? 'grid-cols-2' :
                        tweetMedia.length === 3 ? 'grid-cols-2' : 'grid-cols-2'
                      }`}>
                        {tweetMedia.map((url, mi) => (
                          <div
                            key={mi}
                            className={`bg-[var(--hub-surface-active)] ${
                              tweetMedia.length === 1 ? 'aspect-video' :
                              tweetMedia.length === 3 && mi === 0 ? 'row-span-2 aspect-square' :
                              'aspect-square'
                            }`}
                          >
                            <img src={url} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[var(--hub-border-subtle)]">
                      <div className="flex items-center gap-5 text-[var(--hub-text-muted)] text-xs">
                        <span>Reply</span>
                        <span>Repost</span>
                        <span>Like</span>
                      </div>
                      <CharacterCounter count={count} size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </LayoutGroup>
  );
}
