import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { peers, peerStats } from '../data/mockData'

function LatencyBadge({ latency }: { latency: number }) {
  const color =
    latency < 50 ? 'text-sov-green' : latency < 150 ? 'text-sov-gold' : 'text-sov-red'
  return <span className={`font-mono text-xs ${color}`}>{latency}ms</span>
}

function TypeBadge({ type }: { type: 'TOR' | 'CLR' }) {
  const isTor = type === 'TOR'
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wider ${
        isTor
          ? 'bg-sov-violet-dim text-sov-violet'
          : 'bg-sov-surface-alt text-sov-muted'
      }`}
    >
      {type}
    </span>
  )
}

export default function PeersSummary() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="bg-sov-surface border border-sov-border rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-4 hover:bg-sov-surface-alt/50 transition-colors text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <h2 className="text-xs font-mono uppercase tracking-wider text-sov-faint mb-2">
            Peers
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-lg font-mono font-semibold text-sov-bright">
              {peerStats.total}
            </span>
            <span className="text-xs text-sov-muted">
              {peerStats.tor} Tor / {peerStats.clearnet} Clearnet
            </span>
            <span className="text-xs text-sov-muted">
              {peerStats.inbound} in / {peerStats.outbound} out
            </span>
          </div>
        </div>
        <motion.span
          className="text-sov-faint text-lg"
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-sov-border">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-sov-border">
                    <th className="px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-sov-faint font-medium">Address</th>
                    <th className="px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-sov-faint font-medium">Type</th>
                    <th className="px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-sov-faint font-medium">Dir</th>
                    <th className="px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-sov-faint font-medium">Latency</th>
                    <th className="px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-sov-faint font-medium hidden md:table-cell">Version</th>
                    <th className="px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-sov-faint font-medium hidden md:table-cell">Height</th>
                  </tr>
                </thead>
                <tbody>
                  {peers.map((peer, i) => (
                    <tr
                      key={i}
                      className="border-b border-sov-border/50 hover:bg-sov-surface-alt/30 transition-colors"
                    >
                      <td className="px-4 py-2 font-mono text-xs text-sov-text">{peer.address}</td>
                      <td className="px-4 py-2"><TypeBadge type={peer.type} /></td>
                      <td className="px-4 py-2 text-xs text-sov-muted">{peer.direction}</td>
                      <td className="px-4 py-2"><LatencyBadge latency={peer.latency} /></td>
                      <td className="px-4 py-2 font-mono text-xs text-sov-faint hidden md:table-cell">{peer.version}</td>
                      <td className="px-4 py-2 font-mono text-xs text-sov-muted hidden md:table-cell">{peer.height.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
