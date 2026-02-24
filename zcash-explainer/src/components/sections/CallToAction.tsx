import { useRef, useEffect } from 'react'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Shield } from '../../icons/Shield'
import { ArrowRight } from '../../icons/ArrowRight'
import { Lightning } from '../../icons/Lightning'
import { Key } from '../../icons/Key'

const LINKS = [
  {
    icon: Shield,
    title: 'Get Zashi Wallet',
    description: 'The official Zcash wallet. Free, shielded by default. Available on iOS, Android, and desktop. Download, create a wallet, and receive your first shielded ZEC in under two minutes.',
    href: 'https://electriccoin.co/zashi/',
    color: 'group-hover:text-zec-gold',
  },
  {
    icon: Lightning,
    title: 'Read the Protocol',
    description: 'Full Zcash protocol specification and improvement proposals (ZIPs). The technical foundation for everything described on this page.',
    href: 'https://zips.z.cash',
    color: 'group-hover:text-zec-shield',
  },
  {
    icon: Key,
    title: 'Explore Halo 2',
    description: 'The proving system that powers Zcash — no trusted setup required. Open source, peer-reviewed, and used in production since the Orchard upgrade in 2022.',
    href: 'https://zcash.github.io/halo2/',
    color: 'group-hover:text-zec-green',
  },
]

export function CallToAction() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, 0.15)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView || reduced) return

    import('animejs').then(({ animate, stagger }) => {
      const cards = ref.current?.querySelectorAll('.cta-card')
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
    <section className="section">
      <div className="text-center mb-12">
        <h2 className="font-mono font-normal text-zec-text-bright mb-4" style={{ fontSize: 'clamp(28px, 3vw, 42px)', letterSpacing: '-0.02em' }}>
          Try It Yourself
        </h2>
        <p className="zec-body max-w-xl mx-auto mb-4" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'var(--ink-mid)' }}>
          The cryptography works. The tools are free and open source. Private
          money exists — the only question is whether you&apos;ll use it.
        </p>
      </div>

      <div ref={ref} className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {LINKS.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-card group terminal-card p-6 no-underline block"
              style={{ opacity: reduced ? 1 : 0 }}
            >
              <div className="relative inline-flex mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-zec-surface">
                  <Icon
                    className={`w-5 h-5 text-zec-text-muted transition-colors ${link.color}`}
                  />
                </div>
              </div>

              <h3 className="font-mono font-normal text-sm text-zec-text-bright mb-2 flex items-center gap-2">
                {link.title}
                <ArrowRight className="w-3.5 h-3.5 text-zec-text-muted group-hover:text-zec-gold group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-sm text-zec-text-body leading-relaxed">
                {link.description}
              </p>
            </a>
          )
        })}
      </div>
    </section>
  )
}
