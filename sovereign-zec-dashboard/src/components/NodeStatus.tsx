import MetricCard from './shared/MetricCard'
import { nodeMetrics } from '../data/mockData'

export default function NodeStatus() {
  return (
    <section className="py-8 px-6">
      <h2 className="text-xs font-mono uppercase tracking-wider text-sov-faint mb-4">
        Node Status
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {nodeMetrics.map((metric, i) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            status={metric.status}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}
