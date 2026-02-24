import { useRef, useEffect } from 'react'
import { SectionHeader } from '../SectionHeader'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Shield } from '../../icons/Shield'
import { Lock } from '../../icons/Lock'

const COMPETITORS = [
  {
    name: 'Monero',
    approach: 'Ring signatures + stealth addresses',
    icon: Lock,
    color: 'text-zec-gold',
    borderColor: 'rgba(201, 168, 76, 0.25)',
    comparison:
      'Monero mandates opacity — every transaction is private, no exceptions. Zcash\'s bimodal design (optional shielded vs transparent) enables regulatory compatibility through viewing keys while preserving the option for full privacy.',
    tradeoff: 'Mandatory privacy vs selective disclosure',
  },
  {
    name: 'Tornado Cash',
    approach: 'Mixer model on Ethereum',
    icon: Shield,
    color: 'text-zec-red',
    borderColor: 'rgba(239, 68, 68, 0.25)',
    comparison:
      'Tornado Cash was sanctioned by OFAC in August 2022, demonstrating that mixer-based systems face existential regulatory risk. Zcash\'s viewing keys provide a compliance path — users can prove legitimacy without sacrificing default privacy.',
    tradeoff: 'Sanctioned mixer vs protocol-level privacy',
  },
]

const RISKS = [
  'Regulatory pressure remains persistent — privacy assets face ongoing scrutiny from governments worldwide',
  'Usability barriers persist despite Zashi wallet improvements; shielded UX still lags transparent alternatives',
  'ECC and Zcash Foundation coordination challenges create governance uncertainty',
  'Competition from zk-rollups and privacy layers on Ethereum could reduce Zcash\'s differentiation over time',
  'Shielded adoption is growing but still optional — default privacy would strengthen the anonymity set',
]

export function Landscape() {
  const ref = useRef<HTMLDivElement>(null)
  const risksRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, 0.15)
  const risksInView = useInView(risksRef, 0.15)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView || reduced) return

    import('animejs').then(({ animate, stagger }) => {
      const cards = ref.current?.querySelectorAll('.competitor-card')
      if (!cards) return

      animate(cards, {
        opacity: [0, 1],
        translateY: [16, 0],
        delay: stagger(60),
        duration: 600,
        ease: 'outExpo',
      })
    })
  }, [inView, reduced])

  useEffect(() => {
    if (!risksInView || reduced) return

    import('animejs').then(({ animate, stagger }) => {
      const items = risksRef.current?.querySelectorAll('.risk-item')
      if (!items) return

      animate(items, {
        opacity: [0, 1],
        translateX: [-12, 0],
        delay: stagger(60),
        duration: 600,
        ease: 'outExpo',
      })
    })
  }, [risksInView, reduced])

  return (
    <section id="landscape" className="section">
      <SectionHeader number="06" title="The Landscape" />

      <p className="zec-body max-w-[540px] mb-12" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'var(--ink-mid)' }}>
        Every privacy project makes tradeoffs. Monero chose mandatory opacity.
        Tornado Cash chose a mixer model on Ethereum and got sanctioned. Zcash
        chose something different: protocol-level privacy with a compliance
        escape valve. Here&apos;s what that means in practice.
      </p>

      {/* Competitor comparison grid */}
      <div ref={ref} className="grid md:grid-cols-2 gap-6 mb-16">
        {COMPETITORS.map((comp) => {
          const Icon = comp.icon
          return (
            <div
              key={comp.name}
              className="competitor-card terminal-card p-6"
              style={{ opacity: reduced ? 1 : 0, borderColor: comp.borderColor }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon className={`w-5 h-5 ${comp.color}`} />
                <h3 className="font-mono font-normal text-lg text-zec-text-bright">
                  {comp.name}
                </h3>
              </div>
              <div className="font-mono text-xs text-zec-text-muted mb-4">
                {comp.approach}
              </div>
              <p className="text-sm text-zec-text-body leading-relaxed mb-4">
                {comp.comparison}
              </p>
              <div className="font-mono text-xs text-[var(--accent)] opacity-80 border-t border-[rgba(201,168,76,0.1)] pt-3">
                {comp.tradeoff}
              </div>
            </div>
          )
        })}
      </div>

      {/* Risk factors */}
      <div className="max-w-2xl">
        <h3 className="zec-label mb-6">
          Risk Factors
        </h3>
        <div ref={risksRef} className="space-y-3">
          {RISKS.map((risk, i) => (
            <div
              key={i}
              className="risk-item flex items-start gap-3 pl-4 py-2"
              style={{
                opacity: reduced ? 1 : 0,
                borderLeft: '2px solid var(--accent-dim)',
              }}
            >
              <span className="font-mono text-xs text-zec-text-muted/40 flex-shrink-0 mt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-sm text-zec-text-body leading-relaxed">
                {risk}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
