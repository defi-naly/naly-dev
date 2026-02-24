export function Footer() {
  return (
    <footer
      className="relative z-[1] py-20 px-[clamp(24px,4vw,48px)]"
      style={{
        borderTop: '1px solid var(--rule)',
      }}
    >
      <div className="max-w-[var(--container-max)] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2" style={{ color: 'var(--ink-light)' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 1 L16 5 L16 10 C16 13.5 13 16 9 17 C5 16 2 13.5 2 10 L2 5 Z"
              stroke="var(--accent)"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
          </svg>
          <span className="font-mono text-xs">
            An open educational resource about Zcash
          </span>
        </div>
        <div className="flex items-center gap-6">
          {[
            { label: 'z.cash', href: 'https://z.cash' },
            { label: 'Electric Coin Co', href: 'https://electriccoin.co' },
            { label: 'Zcash Foundation', href: 'https://zfnd.org' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs transition-colors"
              style={{ color: 'var(--ink-light)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink-mid)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-light)')}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
