import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { recentBlocks, blockStats } from '../data/mockData'
import type { RecentBlock } from '../data/mockData'

function BlockRect({ block }: { block: RecentBlock }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative flex-shrink-0 w-12 h-16 rounded cursor-pointer border border-sov-border hover:border-sov-gold/40 transition-colors"
      style={{
        background: `linear-gradient(to top, #F4B728 ${block.shieldedPct}%, #1e2030 ${block.shieldedPct}%)`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-sov-surface border border-sov-border rounded-lg shadow-lg z-20 whitespace-nowrap"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
          >
            <div className="text-xs font-mono text-sov-bright">#{block.height.toLocaleString()}</div>
            <div className="text-xs text-sov-muted">{block.txCount} tx</div>
            <div className="text-xs text-sov-gold">{block.shieldedPct}% shielded</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function BlockStrip() {
  const reduced = useReducedMotion()
  const doubled = [...recentBlocks, ...recentBlocks]

  return (
    <section className="py-8 border-y border-sov-border overflow-hidden">
      <div className="px-6 mb-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-sov-faint">
          Recent Blocks — Privacy Texture
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div className={`flex gap-2 px-6 ${reduced ? '' : 'block-marquee'}`} style={{ width: 'max-content' }}>
          {doubled.map((block, i) => (
            <BlockRect key={`${block.height}-${i}`} block={block} />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-8 px-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-sov-faint font-sans">Avg shielded (24h)</span>
          <span className="text-sm font-mono text-sov-gold">{blockStats.avgShielded24h}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-sov-faint font-sans">Blocks (24h)</span>
          <span className="text-sm font-mono text-sov-text">{blockStats.blocks24h.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-sov-faint font-sans">Avg block time</span>
          <span className="text-sm font-mono text-sov-text">{blockStats.avgBlockTime}</span>
        </div>
      </div>
    </section>
  )
}
