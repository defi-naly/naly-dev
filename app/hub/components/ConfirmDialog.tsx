'use client';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  variant?: 'default' | 'danger';
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  variant = 'default',
  onConfirm,
}: Props) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <AlertDialog.Portal forceMount>
            <AlertDialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            </AlertDialog.Overlay>
            <AlertDialog.Content asChild>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[var(--hub-surface)] border border-[var(--hub-border)] p-6 shadow-2xl"
                initial={{ opacity: 0, scale: 0.96, y: 8, x: '-50%', translateY: '-50%' }}
                animate={{ opacity: 1, scale: 1, y: 0, x: '-50%', translateY: '-50%' }}
                exit={{ opacity: 0, scale: 0.96, y: 8, x: '-50%', translateY: '-50%' }}
                transition={{ type: 'spring', duration: 0.2, bounce: 0 }}
                style={{ left: '50%', top: '50%' }}
              >
                <AlertDialog.Title className="text-sm font-semibold text-[var(--hub-text)] mb-1.5">
                  {title}
                </AlertDialog.Title>
                <AlertDialog.Description className="text-[13px] text-[var(--hub-text-secondary)] leading-relaxed mb-5">
                  {description}
                </AlertDialog.Description>
                <div className="flex justify-end gap-2">
                  <AlertDialog.Cancel className="hub-btn hub-btn-secondary text-xs">
                    Cancel
                  </AlertDialog.Cancel>
                  <AlertDialog.Action
                    className={`hub-btn text-xs ${
                      variant === 'danger'
                        ? 'bg-[var(--hub-danger)] text-white hover:bg-red-600'
                        : 'hub-btn-primary'
                    }`}
                    onClick={onConfirm}
                  >
                    {confirmLabel}
                  </AlertDialog.Action>
                </div>
              </motion.div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        )}
      </AnimatePresence>
    </AlertDialog.Root>
  );
}
