import { useRef } from 'react'
import { SectionHeader } from '../SectionHeader'
import { StatBlock } from '../shared/StatBlock'
import { QuoteBlock } from '../shared/QuoteBlock'
import { useInView } from '../../hooks/useInView'
import { Eye } from '../../icons/Eye'
import { EyeOff } from '../../icons/EyeOff'
import { PRIVACY_STATS } from '../../data/stats'

export function WhyPrivacy() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, 0.1)

  return (
    <section id="privacy" className="section">
      <SectionHeader number="01" title="Why Privacy Matters" />

      <p className="zec-body max-w-[540px] mb-6" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'var(--ink-mid)' }}>
        Every Bitcoin transaction is permanently visible. Your salary, donations,
        medical payments, and political contributions — all on a public ledger,
        forever. Link one address to your identity through an exchange, and your
        entire financial history becomes readable by anyone with a block explorer.
      </p>

      <QuoteBlock
        quote="The necessity to announce all transactions publicly precludes this method, but privacy can still be maintained by breaking the flow of information."
        author="Satoshi Nakamoto"
        role="Bitcoin Whitepaper, Section 10: Privacy (2008)"
        display
      />

      <p className="zec-body max-w-[540px] mb-12" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'var(--ink-mid)' }}>
        Satoshi acknowledged the problem but couldn&apos;t solve it. Bitcoin&apos;s
        transparency was a design tradeoff, not a feature. Every indexed transaction
        is a data point. Every data point is a tool of control. Zcash was built to
        finish what Bitcoin started — money that works like cash, where only the
        people involved know what happened.
      </p>

      <div
        ref={ref}
        className="grid md:grid-cols-2 gap-6 mb-16"
      >
        {/* Transparent card */}
        <div
          className="terminal-card overflow-hidden"
          style={{
            borderColor: 'rgba(239, 68, 68, 0.25)',
          }}
        >
          <div className="px-5 py-3 border-b border-[rgba(239,68,68,0.15)]">
            <h3 className="font-mono text-sm font-medium text-[var(--accent)]">
              {'> transparent_tx.log'}
            </h3>
          </div>
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-5 h-5 text-zec-red flex-shrink-0" />
              <span className="font-mono text-sm text-zec-red font-medium">
                TRANSPARENT
              </span>
            </div>
            {[
              { label: 'Sender', value: 't1Kx9..3nFq' },
              { label: 'Recipient', value: 't1Rv8..7mPk' },
              { label: 'Amount', value: '14.2 ZEC' },
              { label: 'Time', value: '2024-01-15 09:31:02' },
              { label: 'Memo', value: 'Payment for services' },
            ].map((row) => (
              <div
                key={row.label}
                className={`flex justify-between font-mono text-sm transition-all duration-500 ${
                  inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
              >
                <span className="text-zec-text-muted">{row.label}</span>
                <span className="text-zec-text-bright">{row.value}</span>
              </div>
            ))}
            <div className="mt-4 pt-3 border-t border-[rgba(239,68,68,0.12)]">
              <span className="font-mono text-xs text-zec-red/70">
                Anyone can see every detail. Linked to your identity through exchanges.
              </span>
            </div>
          </div>
        </div>

        {/* Shielded card */}
        <div
          className="terminal-card overflow-hidden"
          style={{
            borderColor: 'rgba(34, 197, 94, 0.25)',
          }}
        >
          <div className="px-5 py-3 border-b border-[rgba(34,197,94,0.15)]">
            <h3 className="font-mono text-sm font-medium text-[var(--accent)]">
              {'> shielded_tx.log'}
            </h3>
          </div>
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-3 mb-4">
              <EyeOff className="w-5 h-5 text-zec-green flex-shrink-0" />
              <span className="font-mono text-sm text-zec-green font-medium">
                SHIELDED
              </span>
            </div>
            {[
              { label: 'Sender', value: '••••••••••••' },
              { label: 'Recipient', value: '••••••••••••' },
              { label: 'Amount', value: '••••••••••••' },
              { label: 'Time', value: 'Block 2,140,832' },
              { label: 'Memo', value: '[encrypted]' },
            ].map((row) => (
              <div
                key={row.label}
                className={`flex justify-between font-mono text-sm transition-all duration-500 ${
                  inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}
              >
                <span className="text-zec-text-muted">{row.label}</span>
                <span className="text-zec-text-muted/50">{row.value}</span>
              </div>
            ))}
            <div className="mt-4 pt-3 border-t border-[rgba(34,197,94,0.12)]">
              <span className="font-mono text-xs text-zec-green/70">
                Zero metadata exposed. Mathematically proven valid without revealing content.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {PRIVACY_STATS.map((stat) => (
          <StatBlock
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  )
}
