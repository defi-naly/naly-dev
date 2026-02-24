import { useRef, useEffect } from 'react'
import { SectionHeader } from '../SectionHeader'
import { Card } from '../shared/Card'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Lightning } from '../../icons/Lightning'
import { Layers } from '../../icons/Layers'
import { Shield } from '../../icons/Shield'

const FEATURES = [
  {
    icon: Lightning,
    title: 'Proof-of-Stake',
    description:
      'Moving from Proof-of-Work to PoS. Validators stake ZEC to secure the network instead of burning electricity. This is the same transition Ethereum made in 2022, which reduced their energy consumption by over 99%.',
    color: 'text-zec-gold',
  },
  {
    icon: Layers,
    title: 'Faster Blocks',
    description:
      'Block times drop from the current 75 seconds to target sub-second finality. That\'s the difference between waiting over a minute for confirmation and getting it before you put your phone away. It makes point-of-sale payments viable.',
    color: 'text-zec-shield',
  },
  {
    icon: Shield,
    title: 'Cross-chain Bridges',
    description:
      'Trustless bridges to Ethereum and other ecosystems bring Zcash privacy to DeFi. Private swaps, private lending, private participation in protocols — without leaving a transaction trail across chains.',
    color: 'text-zec-green',
  },
]

export function Tachyon() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, 0.15)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView || reduced) return

    import('animejs').then(({ animate, stagger }) => {
      const cards = ref.current?.querySelectorAll('.tachyon-card')
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
    <section id="tachyon" className="section">
      <SectionHeader number="07" title="Tachyon: The Next Leap" />

      <p className="zec-body max-w-[540px] mb-12" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'var(--ink-mid)' }}>
        Tachyon transforms Zcash from a privacy coin into a privacy platform.
        Three changes define the upgrade: a new consensus mechanism, dramatically
        faster throughput, and the ability to connect to other blockchains without
        sacrificing confidentiality.
      </p>

      <div ref={ref} className="grid md:grid-cols-3 gap-6">
        {FEATURES.map((feat) => {
          const Icon = feat.icon
          return (
            <Card
              key={feat.title}
              terminal
              title={feat.title.toLowerCase().replace(/\s/g, '_')}
              className="tachyon-card"
            >
              <div style={{ opacity: reduced ? 1 : undefined }}>
                <div className="flex items-center gap-3 mb-4">
                  <Icon className={`w-5 h-5 ${feat.color}`} />
                  <h3 className="font-mono font-normal text-zec-text-bright">
                    {feat.title}
                  </h3>
                </div>
                <p className="text-sm text-zec-text-body leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
