'use client';

import { useState, useEffect, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Unlink } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialUrl?: string;
  onApply: (url: string) => void;
  onRemove: () => void;
}

export default function LinkDialog({ open, onOpenChange, initialUrl = '', onApply, onRemove }: Props) {
  const [url, setUrl] = useState(initialUrl);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setUrl(initialUrl);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open, initialUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (trimmed) {
      onApply(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    }
    onOpenChange(false);
  };

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
                className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[var(--hub-surface)] border border-[var(--hub-border)] p-6 shadow-2xl"
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ type: 'spring', duration: 0.2, bounce: 0 }}
                style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
              >
                <Dialog.Title className="text-sm font-semibold text-[var(--hub-text)] mb-1.5 flex items-center gap-2">
                  <Link2 size={14} />
                  {initialUrl ? 'Edit Link' : 'Add Link'}
                </Dialog.Title>
                <Dialog.Description className="text-[13px] text-[var(--hub-text-secondary)] mb-4">
                  Enter the URL for this link.
                </Dialog.Description>

                <form onSubmit={handleSubmit}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 text-sm rounded-lg bg-[var(--hub-bg)] border border-[var(--hub-border)] text-[var(--hub-text)] placeholder:text-[var(--hub-text-muted)] outline-none focus:border-[var(--hub-accent)] transition-colors"
                    autoComplete="off"
                  />

                  <div className="flex items-center justify-between mt-4">
                    {initialUrl ? (
                      <button
                        type="button"
                        onClick={() => { onRemove(); onOpenChange(false); }}
                        className="hub-btn hub-btn-danger text-xs"
                      >
                        <Unlink size={12} />
                        Remove link
                      </button>
                    ) : (
                      <div />
                    )}
                    <div className="flex gap-2">
                      <Dialog.Close className="hub-btn hub-btn-secondary text-xs">
                        Cancel
                      </Dialog.Close>
                      <button type="submit" className="hub-btn hub-btn-primary text-xs">
                        Apply
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
