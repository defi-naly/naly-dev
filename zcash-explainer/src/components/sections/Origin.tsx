import { useRef, useEffect } from 'react'
import { SectionHeader } from '../SectionHeader'
import { Card } from '../shared/Card'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const CEREMONY_FACTS = [
  { label: 'Type', value: 'Multi-party computation (MPC)' },
  { label: 'Participants', value: '6 independent parties' },
  { label: 'Requirement', value: 'Only 1 of 6 must be honest' },
  { label: 'Notable participant', value: 'Edward Snowden (pseudonym)' },
  { label: 'Security model', value: '"Toxic waste" parameters destroyed' },
]

export function Origin() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, 0.15)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView || reduced) return

    import('animejs').then(({ animate, stagger }) => {
      const els = ref.current?.querySelectorAll('.origin-item')
      if (!els) return

      animate(els, {
        opacity: [0, 1],
        translateY: [16, 0],
        delay: stagger(60),
        duration: 600,
        ease: 'outExpo',
      })
    })
  }, [inView, reduced])

  return (
    <section id="origin" className="section">
      <SectionHeader number="02" title="The Origin Story" />

      <div ref={ref}>
        <p
          className="origin-item zec-body max-w-[540px] mb-6"
          style={{ opacity: reduced ? 1 : 0, fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'var(--ink-mid)' }}
        >
          Bitcoin proved digital scarcity was possible. But Satoshi left one
          problem unsolved — the whitepaper itself admits that announcing all
          transactions publicly breaks the traditional privacy model. Zcash was
          built to finish the job.
        </p>

        <p
          className="origin-item zec-body max-w-[540px] mb-12"
          style={{ opacity: reduced ? 1 : 0, fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'var(--ink-mid)' }}
        >
          In October 2016, a team of cryptographers did something unprecedented:
          they built a currency where transactions are fully verified by the network
          but completely invisible to it. Not mixed. Not obfuscated. Mathematically
          invisible.
        </p>

        <div className="origin-item max-w-2xl" style={{ opacity: reduced ? 1 : 0 }}>
          <Card terminal title="the_ceremony.log" className="ceremony-pulse">
            <div className="mb-4">
              <h3 className="font-mono font-medium text-sm text-zec-text-bright mb-2">
                The Ceremony
              </h3>
              <p className="text-sm text-zec-text-body leading-relaxed mb-4">
                Zcash launched with a globally distributed multi-party computation
                to generate the cryptographic parameters underpinning its shielded
                transactions. If even one participant destroyed their secret share,
                the system would be secure.
              </p>
            </div>
            <div className="space-y-2">
              {CEREMONY_FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="flex justify-between font-mono text-sm"
                >
                  <span className="text-zec-text-muted">{fact.label}</span>
                  <span className="text-zec-text-bright text-right">{fact.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div
          className="origin-item max-w-2xl mt-6"
          style={{ opacity: reduced ? 1 : 0 }}
        >
          <p className="zec-label mb-2">
            Listen &mdash; Radiolab: &ldquo;The Ceremony&rdquo;
          </p>
          <div className="rounded overflow-hidden border border-[var(--rule)]" style={{ background: 'var(--zec-surface)' }}>
            <iframe
              frameBorder="0"
              scrolling="no"
              height="130"
              width="100%"
              src="https://www.wnyc.org/widgets/ondemand_player/wnycstudios/#file=/audio/json/780552/&share=1"
              title="Radiolab: The Ceremony"
              loading="lazy"
            />
          </div>
        </div>

        <p
          className="origin-item text-sm max-w-[540px] mt-8 leading-relaxed"
          style={{ opacity: reduced ? 1 : 0, color: 'var(--ink-mid)' }}
        >
          Edward Snowden participated under a pseudonym — lending symbolic weight
          to the project&apos;s mission. Where Bitcoin has its Genesis Block mythology,
          Zcash has the Ceremony: a collaborative act of cryptographic trust
          destruction that made private money possible.
        </p>
      </div>
    </section>
  )
}
