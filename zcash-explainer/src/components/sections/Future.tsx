import { useRef, useEffect } from 'react'
import { SectionHeader } from '../SectionHeader'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Cpu } from '../../icons/Cpu'
import { Shield } from '../../icons/Shield'
import { Lightning } from '../../icons/Lightning'

const THESIS_POINTS = [
  {
    icon: Cpu,
    title: 'AI Agents Need Private Money',
    description:
      'When AI agents transact autonomously, every payment becomes a data point for tracking the agent\'s strategy, relationships, and priorities. Transparent blockchains turn agent activity into competitive intelligence. Shielded transactions are the only payment rail where autonomous systems can operate without leaking their playbook.',
    color: 'text-zec-gold',
  },
  {
    icon: Lightning,
    title: 'Encrypted Memo Channel',
    description:
      'Every shielded transaction includes a 512-byte encrypted memo field. This creates a private, on-chain messaging channel attached to payments. Invoices, receipts, coordination messages between systems — all encrypted, all verifiable, all invisible to third parties.',
    color: 'text-zec-shield',
  },
  {
    icon: Shield,
    title: 'Privacy as Default, Not Feature',
    description:
      'The world is moving toward on-chain everything: identity, payments, governance. Without default privacy, this becomes the most comprehensive surveillance system ever built. Every government is building a digital currency. Every one will be fully surveilled. The window for private alternatives is closing.',
    color: 'text-zec-green',
  },
]

export function Future() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, 0.1)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView || reduced) return

    import('animejs').then(({ animate, stagger }) => {
      const cards = ref.current?.querySelectorAll('.thesis-card')
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

  return (
    <section id="future" className="section">
      <SectionHeader number="09" title="The Future Thesis" />

      <p className="zec-body max-w-[540px] mb-6" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'var(--ink-mid)' }}>
        Privacy isn&apos;t just about human transactions anymore. As AI systems,
        autonomous agents, and API-driven protocols become major economic actors,
        the need for private, programmable money becomes infrastructure — not
        ideology.
      </p>

      <p className="zec-body max-w-[540px] mb-12" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'var(--ink-mid)' }}>
        The question isn&apos;t whether private money will be valuable. It&apos;s whether
        anyone will be able to use it by the time they realize they need it.
      </p>

      <div ref={ref} className="grid md:grid-cols-3 gap-6">
        {THESIS_POINTS.map((point) => {
          const Icon = point.icon
          return (
            <div
              key={point.title}
              className="thesis-card terminal-card p-6"
              style={{ opacity: reduced ? 1 : 0 }}
            >
              <Icon className={`w-6 h-6 ${point.color} mb-4`} />
              <h3 className="font-mono font-medium text-sm text-zec-text-bright mb-3">
                {point.title}
              </h3>
              <p className="text-sm text-zec-text-body leading-relaxed">
                {point.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
