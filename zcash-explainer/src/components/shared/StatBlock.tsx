import { useRef, useEffect, useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface StatBlockProps {
  value: number
  suffix?: string
  label: string
}

export function StatBlock({ value, suffix = '', label }: StatBlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, 0.5)
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(reduced ? value : 0)
  const counted = useRef(false)

  useEffect(() => {
    if (!inView || counted.current || reduced) return
    counted.current = true

    if (value === 0) {
      setDisplay(0)
      return
    }

    const duration = 2000
    const start = Date.now()

    function tick() {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)

      // Spring overshoot easing
      let eased: number
      if (progress < 0.8) {
        const t = progress / 0.8
        eased = 1 - Math.pow(1 - t, 4)
        eased *= 1.1
      } else {
        const settle = (progress - 0.8) / 0.2
        eased = 1.1 - 0.1 * settle
      }

      setDisplay(Math.min(Math.floor(value * eased), value))

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setDisplay(value)
      }
    }

    requestAnimationFrame(tick)
  }, [inView, value, reduced])

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-mono font-semibold px-6 py-2 mb-2"
        style={{
          fontSize: 'clamp(28px, 3vw, 42px)',
          letterSpacing: '-0.02em',
          color: 'var(--accent)',
        }}
      >
        {display}
        {suffix}
      </div>
      <div className="zec-label" style={{ fontSize: 'clamp(11px, 1vw, 13px)' }}>
        {label}
      </div>
    </div>
  )
}
