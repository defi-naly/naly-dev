export function Key({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="5" />
      <path d="M11.5 11.5L22 22" />
      <path d="M18 18l2 2" />
      <path d="M15 21l2-2" />
    </svg>
  )
}
