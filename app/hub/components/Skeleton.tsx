'use client';

/* ── Base Skeleton ── */
export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`hub-skeleton ${className}`} />;
}

/* ── PostCard skeleton ── */
export function PostCardSkeleton() {
  return (
    <div className="hub-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-40 rounded" />
        <Skeleton className="h-3 w-12 rounded" />
      </div>
      <Skeleton className="h-3 w-full rounded" />
      <Skeleton className="h-3 w-2/3 rounded" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-3 w-10 rounded" />
        <Skeleton className="h-3 w-16 rounded" />
      </div>
    </div>
  );
}

/* ── Media tile skeleton ── */
export function MediaTileSkeleton() {
  return <div className="hub-skeleton aspect-square rounded-lg" />;
}

/* ── Editor skeleton ── */
export function EditorSkeleton() {
  return (
    <div className="flex gap-6 h-full">
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        <Skeleton className="h-7 w-48 rounded" />
        <div className="hub-card p-0 flex-1 flex flex-col">
          <div className="border-b border-[var(--hub-border)] px-2 py-2.5 flex gap-1">
            <Skeleton className="h-[30px] w-[30px] rounded-md" />
            <Skeleton className="h-[30px] w-[30px] rounded-md" />
            <Skeleton className="h-[30px] w-[30px] rounded-md" />
          </div>
          <div className="p-4 space-y-3 flex-1">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-4/5 rounded" />
            <Skeleton className="h-4 w-3/5 rounded" />
          </div>
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-3 w-20 rounded" />
          <div className="flex-1" />
          <Skeleton className="h-8 w-20 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>
      <div className="w-[380px] flex-shrink-0 hidden lg:block">
        <Skeleton className="h-3 w-16 rounded mb-3" />
        <div className="space-y-3">
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/* ── Stat card skeleton ── */
export function StatCardSkeleton() {
  return (
    <div className="hub-card">
      <Skeleton className="h-3 w-16 rounded mb-2" />
      <Skeleton className="h-7 w-12 rounded" />
    </div>
  );
}
