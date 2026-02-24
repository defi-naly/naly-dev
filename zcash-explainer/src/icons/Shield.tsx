export function Shield({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M12 2l9 4v6c0 5.5-3.8 10.3-9 12-5.2-1.7-9-6.5-9-12V6l9-4z" />
    </svg>
  )
}
