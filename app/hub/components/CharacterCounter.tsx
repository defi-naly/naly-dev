'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X_CHAR_LIMIT } from '../lib/constants';
import { charStatus } from '../lib/thread-utils';

export default function CharacterCounter({ count, size = 26 }: { count: number; size?: number }) {
  const status = charStatus(count);
  const r = (size - 3) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(count / X_CHAR_LIMIT, 1));
  const remaining = X_CHAR_LIMIT - count;
  const show = remaining <= 20;

  return (
    <div className="flex items-center gap-1.5">
      <svg width={size} height={size} className="char-ring" viewBox={`0 0 ${size} ${size}`}>
        <circle className="track" cx={size / 2} cy={size / 2} r={r} />
        <circle
          className={`bar ${status}`}
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <AnimatePresence mode="wait">
        {show && (
          <motion.span
            key={remaining}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.12 }}
            className={`text-[11px] font-medium tabular-nums ${
              remaining < 0 ? 'text-[var(--hub-danger)]' :
              status === 'danger' ? 'text-[var(--hub-danger)]' :
              status === 'warn' ? 'text-[var(--hub-warn)]' :
              'text-[var(--hub-text-muted)]'
            }`}
          >
            {remaining}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
