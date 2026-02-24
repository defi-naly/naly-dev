'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import { Toaster } from 'sonner';

export function HubProviders({ children }: { children: React.ReactNode }) {
  return (
    <Tooltip.Provider delayDuration={400}>
      {children}
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: 'var(--hub-surface)',
            border: '1px solid var(--hub-border)',
            color: 'var(--hub-text)',
            fontSize: '13px',
          },
        }}
      />
    </Tooltip.Provider>
  );
}
