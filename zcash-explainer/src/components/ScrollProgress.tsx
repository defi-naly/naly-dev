import { useState, useEffect } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const onScroll = () => {
      const el = document.documentElement
      const scrollTop = el.scrollTop
      const scrollHeight = el.scrollHeight - el.clientHeight
      setProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reduced])

  if (reduced) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none">
      <div
        className="h-full origin-left"
        style={{
          background: 'var(--accent)',
          transform: `scaleX(${progress})`,
          boxShadow: '0 0 8px var(--accent-glow)',
          transition: 'transform 0.1s linear',
        }}
      />
    </div>
  )
}
