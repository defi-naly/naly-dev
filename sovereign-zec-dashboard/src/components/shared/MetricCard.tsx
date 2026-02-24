import { motion } from 'framer-motion'
import StatusDot from './StatusDot'

interface MetricCardProps {
  label: string
  value: string
  status?: 'green' | 'amber' | 'red'
  index?: number
}

export default function MetricCard({ label, value, status, index = 0 }: MetricCardProps) {
  return (
    <motion.div
      className="bg-sov-surface border border-sov-border rounded-lg p-4"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-mono uppercase tracking-wider text-sov-faint">{label}</span>
        {status && <StatusDot color={status} pulse={status === 'green'} />}
      </div>
      <span className="text-xl font-mono font-semibold text-sov-bright">{value}</span>
    </motion.div>
  )
}
