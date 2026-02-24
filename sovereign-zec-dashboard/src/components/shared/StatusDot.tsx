import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface StatusDotProps {
  color?: 'green' | 'amber' | 'red' | string
  pulse?: boolean
  size?: number
}

const COLOR_MAP: Record<string, string> = {
  green: '#22C55E',
  amber: '#F59E0B',
  red: '#EF4444',
}

export default function StatusDot({ color = 'green', pulse = false, size = 8 }: StatusDotProps) {
  const reduced = useReducedMotion()
  const resolvedColor = COLOR_MAP[color] ?? color

  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {pulse && !reduced && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: resolvedColor }}
          animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <span
        className="relative block rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: resolvedColor,
        }}
      />
    </span>
  )
}
