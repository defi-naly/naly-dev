import { useEffect, useRef, useState, useCallback } from 'react'
import { ShieldScene } from './ShieldScene'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function Hero() {
  const outerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(reduced)
  const [morphProgress, setMorphProgress] = useState(0)

  // Delay initial reveal
  useEffect(() => {
    if (reduced) return
    const timer = setTimeout(() => setReady(true), 300)
    return () => clearTimeout(timer)
  }, [reduced])

  // Scroll-driven morph progress
  const handleScroll = useCallback(() => {
    const outer = outerRef.current
    if (!outer || reduced) return

    const rect = outer.getBoundingClientRect()
    const vh = window.innerHeight
    const scrolled = Math.max(0, -rect.top)
    const progress = Math.min(scrolled / vh, 1)
    setMorphProgress(progress)
  }, [reduced])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Title entrance animation (char reveal, no blur)
  useEffect(() => {
    if (!ready || reduced) return
    const titleEl = titleRef.current
    if (!titleEl) return

    import('animejs').then(({ splitText, stagger, createTimeline }) => {
      const { chars } = splitText(titleEl, {
        chars: { wrap: 'clip' },
      })

      const tl = createTimeline({
        defaults: { ease: 'outExpo' },
      })

      // Subtitle fade in — no blur
      tl.add(subtitleRef.current!, {
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 600,
      }, 0)

      // Main title char reveal
      tl.add(chars, {
        translateY: ['100%', '0%'],
        opacity: [0, 1],
        delay: stagger(25),
        duration: 600,
      }, 100)

      tl.add('.hero-scroll', {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 500,
      }, '-=200')
    })
  }, [ready, reduced])

  return (
    <div ref={outerRef} style={{ height: reduced ? 'auto' : '200vh' }}>
      <section
        className="relative flex items-center justify-center"
        style={{
          position: reduced ? 'relative' : 'sticky',
          top: 0,
          height: '100vh',
        }}
      >
        <ShieldScene morphProgress={reduced ? 0 : morphProgress} />

        <div className="relative z-10 flex items-center w-full h-full px-8 md:px-16">
          <div className="w-[45%] text-left overflow-hidden">
            {/* Subtitle line */}
            <p
              ref={subtitleRef}
              className="zec-label mb-4 md:mb-6"
              style={{ opacity: reduced ? 1 : 0 }}
            >
              Since 2016
            </p>

            {/* Main title — font-mono, weight 600 */}
            <h1
              ref={titleRef}
              className="font-mono font-semibold tracking-tight leading-none"
              style={{
                opacity: reduced ? 1 : ready ? 1 : 0,
                fontSize: 'clamp(2.5rem, 1rem + 7vw, 6rem)',
                letterSpacing: '-0.04em',
                color: 'var(--accent)',
              }}
            >
              Private<br />
              Digital<br />
              Cash
            </h1>

            <div
              className="hero-scroll mt-16"
              style={{
                opacity: reduced ? 1 : ready ? Math.max(1 - morphProgress * 4, 0) : 0,
              }}
            >
              <a
                href="#privacy"
                className="inline-flex flex-col items-center gap-2 transition-colors"
                style={{ color: 'var(--ink-light)' }}
              >
                <span className="font-mono text-xs tracking-widest uppercase">
                  Scroll to explore
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="animate-bounce"
                >
                  <path d="M5 8l5 5 5-5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
