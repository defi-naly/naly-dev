'use client';

import * as Tooltip from '@radix-ui/react-tooltip';

interface Props {
  label: string;
  shortcut?: string;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export default function HubTooltip({ label, shortcut, children, side = 'top' }: Props) {
  return (
    <Tooltip.Root delayDuration={400}>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side={side}
          sideOffset={6}
          className="z-[60] rounded-md bg-[#1c1c20] border border-[var(--hub-border)] px-2.5 py-1.5 text-[11px] text-[var(--hub-text)] shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        >
          <span className="flex items-center gap-2">
            {label}
            {shortcut && (
              <kbd className="text-[10px] text-[var(--hub-text-muted)] bg-[var(--hub-bg)] px-1 py-0.5 rounded font-mono">
                {shortcut}
              </kbd>
            )}
          </span>
          <Tooltip.Arrow className="fill-[#1c1c20]" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
