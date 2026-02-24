import { motion } from 'framer-motion'
import StatusDot from './shared/StatusDot'
import { privacyChecks } from '../data/mockData'

const statusColor = {
  pass: 'green' as const,
  warn: 'amber' as const,
  fail: 'red' as const,
}

const statusLabel = {
  pass: 'PASS',
  warn: 'WARN',
  fail: 'FAIL',
}

const statusTextColor = {
  pass: 'text-sov-green',
  warn: 'text-sov-gold',
  fail: 'text-sov-red',
}

export default function PrivacyStatus() {
  const passing = privacyChecks.filter((c) => c.status === 'pass').length
  const total = privacyChecks.length

  return (
    <section className="bg-sov-surface border border-sov-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-sov-faint">
          Privacy Audit
        </h2>
        <span className="text-sm font-mono text-sov-muted">
          <span className="text-sov-green">{passing}</span>/{total} passing
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {privacyChecks.map((check, i) => (
          <motion.div
            key={check.label}
            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-sov-surface-alt/30 transition-colors"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <StatusDot color={statusColor[check.status]} size={8} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-sans text-sov-text">{check.label}</div>
              <div className="text-xs text-sov-faint font-sans">{check.description}</div>
            </div>
            <span className={`text-[10px] font-mono font-medium tracking-wider ${statusTextColor[check.status]}`}>
              {statusLabel[check.status]}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
