import StatusDot from './shared/StatusDot'
import { currentHeight } from '../data/mockData'

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-5 border-b border-sov-border">
      <div>
        <h1 className="font-mono text-xl font-semibold text-sov-bright tracking-tight">
          sovereign-zec
        </h1>
        <p className="text-sm text-sov-muted mt-0.5">
          Your node. Your privacy.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <StatusDot color="green" pulse />
        <span className="font-mono text-sm text-sov-muted">
          #{currentHeight.toLocaleString()}
        </span>
      </div>
    </header>
  )
}
