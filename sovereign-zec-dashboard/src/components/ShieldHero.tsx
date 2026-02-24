import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import AnimatedNumber from './shared/AnimatedNumber'
import { privacyPools, totalShielded, shieldedPctOfCirculating } from '../data/mockData'
import { TIMING } from '../lib/constants'

interface RingConfig {
  name: string
  r: number
  strokeWidth: number
  color: string
  colorDim: string
  zec: number
  pct: number
}

export default function ShieldHero() {
  const reduced = useReducedMotion()

  const rings: RingConfig[] = privacyPools.map((pool, i) => {
    const radii = [140, 100, 68]
    const widths = [32, 24, 16]
    return {
      name: pool.name,
      r: radii[i],
      strokeWidth: widths[i],
      color: pool.color,
      colorDim: pool.colorDim,
      zec: pool.zec,
      pct: pool.zec / totalShielded,
    }
  })

  const svgSize = 400
  const center = svgSize / 2

  return (
    <section className="py-12 px-6 flex flex-col items-center">
      <motion.div
        className="relative"
        animate={reduced ? undefined : { scale: [1, 1.015, 1] }}
        transition={reduced ? undefined : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="overflow-visible"
        >
          {rings.map((ring, i) => {
            const circumference = 2 * Math.PI * ring.r
            const arcLength = circumference * ring.pct
            const dashOffset = circumference - arcLength

            return (
              <g key={ring.name} transform={`rotate(-90 ${center} ${center})`}>
                {/* Background track */}
                <circle
                  cx={center}
                  cy={center}
                  r={ring.r}
                  fill="none"
                  stroke={ring.colorDim}
                  strokeWidth={ring.strokeWidth}
                />
                {/* Foreground arc */}
                <motion.circle
                  cx={center}
                  cy={center}
                  r={ring.r}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth={ring.strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: dashOffset }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : {
                          duration: TIMING.arcDrawIn,
                          delay: i * TIMING.arcStagger,
                          ease: [0.16, 1, 0.3, 1],
                        }
                  }
                />
              </g>
            )
          })}
        </svg>

        {/* Central stat */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatedNumber
            value={shieldedPctOfCirculating}
            decimals={1}
            suffix="%"
            duration={TIMING.numberCountUp}
            className="font-mono text-4xl font-semibold text-sov-bright"
          />
          <span className="text-xs text-sov-muted mt-1 font-sans">shielded</span>
        </div>
      </motion.div>

      {/* Pool labels */}
      <div className="flex items-center gap-8 mt-8">
        {privacyPools.map((pool) => (
          <div key={pool.name} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: pool.color }}
            />
            <span className="text-sm text-sov-muted font-sans">{pool.name}</span>
            <span className="text-sm font-mono text-sov-text">
              {(pool.zec / 1_000_000).toFixed(2)}M
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
