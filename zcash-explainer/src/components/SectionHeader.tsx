import { useRef, useEffect } from 'react'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface SectionHeaderProps {
  number: string
  title: string
  id?: string
}

export function SectionHeader({ number, title, id }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, 0.3)
  const reduced = useReducedMotion()
  const animated = useRef(false)

  useEffect(() => {
    if (!inView || animated.current || reduced) return
    animated.current = true

    const el = ref.current
    if (!el) return

    import('animejs').then(({ splitText, animate, stagger, createTimeline }) => {
      const heading = el.querySelector('h2')
      if (!heading) return

      const { chars } = splitText(heading, {
        chars: { wrap: 'clip' },
      })

      const tl = createTimeline({
        defaults: { ease: 'outExpo' },
      })

      // Char reveal — no blur
      tl.add(chars, {
        translateY: ['100%', '0%'],
        opacity: [0, 1],
        delay: stagger(25),
        duration: 600,
      })

      // Number flash: muted → accent → muted
      if (numberRef.current) {
        tl.add(numberRef.current, {
          color: ['rgb(74, 72, 64)', '#c9a84c', 'rgb(74, 72, 64)'],
          duration: 1500,
          ease: 'inOutQuad',
        }, '-=400')
      }

      // Divider reveal
      const divider = el.querySelector('.geometric-divider')
      if (divider) {
        animate(divider, {
          opacity: [0, 0.4],
          scaleX: [0, 1],
          duration: 600,
          delay: 400,
          ease: 'outExpo',
        })
      }
    })
  }, [inView, reduced])

  return (
    <div ref={ref} id={id} className="mb-12 md:mb-16">
      <span
        ref={numberRef}
        className="zec-label mb-3 block"
      >
        {number}
      </span>
      <h2
        className="font-mono font-normal tracking-tight leading-none pb-[0.15em]"
        style={{
          opacity: reduced ? 1 : 0,
          fontSize: 'clamp(28px, 3vw, 42px)',
          letterSpacing: '-0.02em',
          color: 'var(--ink)',
        }}
      >
        {title}
      </h2>
      <div
        className="geometric-divider mt-4"
        style={{
          opacity: reduced ? 0.4 : 0,
          transformOrigin: 'center',
          transform: reduced ? 'scaleX(1)' : 'scaleX(0)',
        }}
      />
    </div>
  )
}
