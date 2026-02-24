import { useRef, useEffect } from 'react'
import { SectionHeader } from '../SectionHeader'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { TIMELINE_DATA } from '../../data/timeline'

export function Timeline() {
  const trackRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const track = trackRef.current
    const line = lineRef.current
    if (!track || !line) return

    import('animejs').then(({ onScroll, animate }) => {
      // Gold progress line synced to scroll
      animate(line, {
        scaleX: [0, 1],
        duration: 1000,
        ease: 'linear',
        autoplay: onScroll({
          target: track,
          sync: 'playback',
        }),
      })

      // Era cards with entrance
      const nodes = track.querySelectorAll('.era-node')
      nodes.forEach((node) => {
        animate(node, {
          opacity: [0, 1],
          translateY: [16, 0],
          duration: 600,
          ease: 'outExpo',
          autoplay: onScroll({
            target: node,
            sync: 'playback',
          }),
        })
      })
    })
  }, [reduced])

  return (
    <section id="evolution" className="section">
      <SectionHeader number="07" title="Protocol Evolution" />

      <p className="zec-body max-w-[540px] mb-16" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'var(--ink-mid)' }}>
        Each upgrade has made privacy faster, lighter, and more trustless. From
        the first zk-SNARK implementation to recursive proofs without trusted
        setups — nine years of continuous cryptographic improvement.
      </p>

      <div ref={trackRef} className="relative">
        {/* Progress line */}
        <div className="hidden md:block absolute top-8 left-0 right-0 h-px">
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(201,168,76,0.08)',
            }}
          />
          <div
            ref={lineRef}
            className="absolute inset-0 origin-left"
            style={{
              background: 'var(--wireframe-gold)',
              opacity: 0.4,
              transform: reduced ? 'scaleX(1)' : 'scaleX(0)',
            }}
          />
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {TIMELINE_DATA.map((era) => {
            const isFuture = era.name === 'Tachyon'
            return (
              <div
                key={era.name}
                className="era-node relative"
                style={{ opacity: reduced ? 1 : 0 }}
              >
                {/* Year indicator */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      background: isFuture ? 'var(--accent)' : 'rgba(201,168,76,0.4)',
                      boxShadow: isFuture ? '0 0 8px rgba(201,168,76,0.5)' : 'none',
                    }}
                  />
                  <span className="font-mono text-xs text-zec-text-muted">
                    {era.year}
                  </span>
                </div>

                {/* Card */}
                <div className="terminal-card p-5">
                  <h3 className="font-mono font-medium text-lg text-zec-text-bright mb-1">
                    {era.name}
                  </h3>
                  <span className="font-mono text-xs text-[var(--accent)] block mb-3">
                    {era.subtitle}
                  </span>
                  <p className="text-sm text-zec-text-body leading-relaxed mb-3">
                    {era.description}
                  </p>
                  <div
                    className={`inline-block font-mono text-xs px-2 py-1 rounded border ${
                      isFuture
                        ? 'bg-zec-gold/15 text-zec-gold border-zec-gold/30 gold-shimmer'
                        : 'bg-zec-green/15 text-zec-green border-transparent'
                    }`}
                  >
                    {isFuture ? 'Coming' : era.highlight}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
