'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { ImagePlus, X } from 'lucide-react';
import MediaGrid from './MediaGrid';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedIds: string[];
  onConfirm: (ids: string[]) => void;
  maxSelect?: number;
}

export default function MediaPickerDialog({ open, onOpenChange, selectedIds, onConfirm, maxSelect = 4 }: Props) {
  const [selection, setSelection] = useState<string[]>(selectedIds);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) setSelection(selectedIds);
    onOpenChange(isOpen);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpen}>
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
                className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-[640px] max-h-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[var(--hub-surface)] border border-[var(--hub-border)] shadow-2xl flex flex-col overflow-hidden"
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ type: 'spring', duration: 0.2, bounce: 0 }}
                style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--hub-border)]">
                  <Dialog.Title className="text-sm font-semibold text-[var(--hub-text)] flex items-center gap-2">
                    <ImagePlus size={14} />
                    Attach Media
                    <span className="text-[11px] text-[var(--hub-text-muted)] font-normal">
                      {selection.length}/{maxSelect}
                    </span>
                  </Dialog.Title>
                  <Dialog.Close className="text-[var(--hub-text-muted)] hover:text-[var(--hub-text)] transition-colors">
                    <X size={16} />
                  </Dialog.Close>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <MediaGrid
                    selectable
                    selectedIds={selection}
                    onSelect={setSelection}
                    maxSelect={maxSelect}
                  />
                </div>

                <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--hub-border)]">
                  <p className="text-[11px] text-[var(--hub-text-muted)]">
                    {selection.length === 0 ? 'Select images to attach' : `${selection.length} selected`}
                  </p>
                  <div className="flex gap-2">
                    {selection.length > 0 && (
                      <button
                        onClick={() => setSelection([])}
                        className="hub-btn hub-btn-ghost text-xs"
                        type="button"
                      >
                        Clear
                      </button>
                    )}
                    <Dialog.Close className="hub-btn hub-btn-secondary text-xs">
                      Cancel
                    </Dialog.Close>
                    <button
                      onClick={() => { onConfirm(selection); onOpenChange(false); }}
                      className="hub-btn hub-btn-primary text-xs"
                      type="button"
                    >
                      Attach{selection.length > 0 ? ` (${selection.length})` : ''}
                    </button>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
