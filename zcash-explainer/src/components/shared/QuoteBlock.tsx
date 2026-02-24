interface QuoteBlockProps {
  quote: string
  author: string
  role?: string
  display?: boolean
}

export function QuoteBlock({ quote, author, role, display }: QuoteBlockProps) {
  if (display) {
    return (
      <blockquote className="relative pl-6 md:pl-8 py-4 my-10">
        {/* Solid accent left border — roots style */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{ background: 'var(--rule)' }}
        />
        <p
          className="font-mono italic leading-snug mb-4"
          style={{
            fontSize: 'clamp(1.25rem, 1rem + 1.25vw, 2rem)',
            color: 'var(--accent)',
          }}
        >
          &ldquo;{quote}&rdquo;
        </p>
        <footer className="font-mono text-sm flex items-center gap-2" style={{ color: 'var(--ink-light)' }}>
          <span className="w-4 h-px" style={{ background: 'var(--accent)', opacity: 0.4 }} />
          <span>
            &mdash; {author}
            {role && <span style={{ color: 'var(--ink-faint)' }}>, {role}</span>}
          </span>
        </footer>
      </blockquote>
    )
  }

  return (
    <blockquote className="relative pl-6 py-2 my-8">
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: 'var(--rule)' }}
      />
      <p
        className="font-mono italic leading-relaxed mb-3"
        style={{
          fontSize: 'clamp(1.25rem, 1rem + 1.25vw, 2rem)',
          color: 'var(--ink)',
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="font-mono text-sm flex items-center gap-2" style={{ color: 'var(--ink-light)' }}>
        <span className="w-3 h-px" style={{ background: 'var(--accent)', opacity: 0.4 }} />
        <span>
          &mdash; {author}
          {role && <span style={{ color: 'var(--ink-faint)' }}>, {role}</span>}
        </span>
      </footer>
    </blockquote>
  )
}
