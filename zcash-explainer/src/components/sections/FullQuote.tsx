import { useRef, useEffect } from 'react'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface FullQuoteProps {
  quote: string
  author: string
  role?: string
}

export function FullQuote({ quote, author, role }: FullQuoteProps) {
  const ref = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, 0.3)
  const reduced = useReducedMotion()
  const animated = useRef(false)

  useEffect(() => {
    if (!inView || animated.current || reduced) return
    animated.current = true

    const el = textRef.current
    if (!el) return

    import('animejs').then(({ splitText, animate, stagger }) => {
      const { chars } = splitText(el, {
        chars: { wrap: 'clip' },
      })

      animate(chars, {
        translateY: ['100%', '0%'],
        opacity: [0, 1],
        delay: stagger(18),
        duration: 600,
        ease: 'outExpo',
      })

      // Fade in attribution — no blur
      const footer = ref.current?.querySelector('.full-quote-footer')
      if (footer) {
        animate(footer, {
          opacity: [0, 1],
          translateY: [12, 0],
          duration: 600,
          delay: chars.length * 18 + 200,
          ease: 'outExpo',
        })
      }
    })
  }, [inView, reduced])

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center px-6 py-12 md:py-16 overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p
          ref={textRef}
          className="font-mono italic leading-snug mb-6"
          style={{
            opacity: reduced ? 1 : 0,
            fontSize: 'clamp(1.5rem, 1rem + 2.5vw, 3rem)',
            color: 'var(--accent)',
            fontWeight: 300,
          }}
        >
          &ldquo;{quote}&rdquo;
        </p>
        <footer
          className="full-quote-footer font-mono text-sm flex items-center justify-center gap-2"
          style={{ opacity: reduced ? 1 : 0, color: 'var(--ink-light)' }}
        >
          <span className="w-4 h-px" style={{ background: 'var(--accent)', opacity: 0.4 }} />
          <span>
            &mdash; {author}
            {role && <span style={{ color: 'var(--ink-faint)' }}>, {role}</span>}
          </span>
        </footer>
      </div>
    </div>
  )
}
