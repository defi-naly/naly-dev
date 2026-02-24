import { useRef, useEffect } from 'react'
import { SectionHeader } from '../SectionHeader'
import { StatBlock } from '../shared/StatBlock'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { TOKENOMICS_STATS } from '../../data/stats'

// Emission schedule data — ZEC supply at each year
// BTC halvings: 2012, 2016, 2020, 2024 | ZEC halvings: 2020, 2024
const EMISSION_DATA = [
  { year: 2016, btc: 15.75, zec: 0 },
  { year: 2017, btc: 16.41, zec: 1.31 },
  { year: 2018, btc: 17.06, zec: 2.63 },
  { year: 2019, btc: 17.72, zec: 3.94 },
  { year: 2020, btc: 18.38, zec: 5.25 },
  { year: 2021, btc: 18.70, zec: 5.91 },
  { year: 2022, btc: 19.03, zec: 6.56 },
  { year: 2023, btc: 19.36, zec: 7.22 },
  { year: 2024, btc: 19.69, zec: 7.88 },
  { year: 2025, btc: 19.85, zec: 8.20 },
  { year: 2028, btc: 20.34, zec: 9.19 },
  { year: 2032, btc: 20.67, zec: 9.84 },
  { year: 2036, btc: 20.84, zec: 10.16 },
  { year: 2040, btc: 20.92, zec: 10.33 },
]

const HALVING_EVENTS = [
  { year: 2020, label: 'ZEC Halving 1', type: 'zec' as const },
  { year: 2024, label: 'ZEC Halving 2', type: 'zec' as const },
  { year: 2028, label: 'ZEC Halving 3', type: 'zec' as const },
]

const SUPPLY_DISTRIBUTION = [
  { label: 'Mining Rewards', pct: 80, color: '#c9a84c' },
  { label: 'Dev Fund (ended 2024)', pct: 15, color: '#3b82f6' },
  { label: 'Founders Reward (ended 2020)', pct: 5, color: '#6B7280' },
]

const COMPARISON = [
  { label: 'Hard cap', btc: '21 million', zec: '21 million' },
  { label: 'Halving cycle', btc: '~4 years', zec: '~4 years' },
  { label: 'Halvings completed', btc: '4 (2012-2024)', zec: '2 (2020, 2024)' },
  { label: 'Current inflation', btc: '~1.7%', zec: '~4.2%' },
  { label: 'ICO / Premine', btc: 'None', zec: 'None' },
  { label: 'Privacy', btc: 'None (pseudonymous)', zec: 'Shielded (zk-SNARKs)' },
]

function EmissionChart() {
  const maxY = 21
  const minYear = 2016
  const maxYear = 2040
  const width = 600
  const height = 280
  const padL = 45
  const padR = 20
  const padT = 20
  const padB = 40

  const chartW = width - padL - padR
  const chartH = height - padT - padB

  const x = (year: number) => padL + ((year - minYear) / (maxYear - minYear)) * chartW
  const y = (val: number) => padT + chartH - (val / maxY) * chartH

  const btcPath = EMISSION_DATA.map((d, i) =>
    `${i === 0 ? 'M' : 'L'}${x(d.year).toFixed(1)},${y(d.btc).toFixed(1)}`
  ).join(' ')

  const zecPath = EMISSION_DATA.map((d, i) =>
    `${i === 0 ? 'M' : 'L'}${x(d.year).toFixed(1)},${y(d.zec).toFixed(1)}`
  ).join(' ')

  // 21M cap line
  const capY = y(21)

  // Y-axis labels
  const yLabels = [0, 5, 10, 15, 21]

  // X-axis labels
  const xLabels = [2016, 2020, 2024, 2028, 2032, 2036, 2040]

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ maxWidth: 600 }}>
      {/* Grid lines */}
      {yLabels.map(v => (
        <line key={v} x1={padL} y1={y(v)} x2={width - padR} y2={y(v)}
          stroke="rgba(201,168,76,0.06)" strokeWidth="1" />
      ))}

      {/* 21M cap dashed line */}
      <line x1={padL} y1={capY} x2={width - padR} y2={capY}
        stroke="rgba(201,168,76,0.2)" strokeWidth="1" strokeDasharray="4 4" />
      <text x={width - padR + 4} y={capY + 3}
        className="font-mono" fontSize="9" fill="rgba(201,168,76,0.4)">21M</text>

      {/* Halving markers */}
      {HALVING_EVENTS.map(h => (
        <g key={h.label}>
          <line x1={x(h.year)} y1={padT} x2={x(h.year)} y2={height - padB}
            stroke="rgba(34,197,94,0.15)" strokeWidth="1" strokeDasharray="2 4" />
          <text x={x(h.year)} y={height - padB + 28}
            textAnchor="middle" className="font-mono" fontSize="8" fill="rgba(34,197,94,0.5)">
            {h.label}
          </text>
        </g>
      ))}

      {/* BTC line */}
      <path d={btcPath} fill="none" stroke="#F7931A" strokeWidth="2" opacity="0.6" />
      {/* ZEC line */}
      <path d={zecPath} fill="none" stroke="#c9a84c" strokeWidth="2.5" />

      {/* ZEC fill area */}
      <path
        d={`${zecPath} L${x(EMISSION_DATA[EMISSION_DATA.length - 1]!.year).toFixed(1)},${y(0).toFixed(1)} L${x(2016).toFixed(1)},${y(0).toFixed(1)} Z`}
        fill="rgba(201,168,76,0.06)"
      />

      {/* Y-axis labels */}
      {yLabels.map(v => (
        <text key={v} x={padL - 8} y={y(v) + 3}
          textAnchor="end" className="font-mono" fontSize="9" fill="rgba(255,255,255,0.3)">
          {v}M
        </text>
      ))}

      {/* X-axis labels */}
      {xLabels.map(yr => (
        <text key={yr} x={x(yr)} y={height - padB + 14}
          textAnchor="middle" className="font-mono" fontSize="9" fill="rgba(255,255,255,0.3)">
          {yr}
        </text>
      ))}

      {/* Legend */}
      <line x1={padL} y1={height - 6} x2={padL + 16} y2={height - 6} stroke="#F7931A" strokeWidth="2" opacity="0.6" />
      <text x={padL + 20} y={height - 3} className="font-mono" fontSize="9" fill="rgba(255,255,255,0.4)">BTC</text>
      <line x1={padL + 50} y1={height - 6} x2={padL + 66} y2={height - 6} stroke="#c9a84c" strokeWidth="2.5" />
      <text x={padL + 70} y={height - 3} className="font-mono" fontSize="9" fill="rgba(255,255,255,0.4)">ZEC</text>
    </svg>
  )
}

function DistributionChart() {
  const barHeight = 24

  return (
    <div className="space-y-3">
      {SUPPLY_DISTRIBUTION.map((item) => (
        <div key={item.label}>
          <div className="flex justify-between font-mono text-xs mb-1">
            <span className="text-zec-text-body">{item.label}</span>
            <span style={{ color: item.color }}>{item.pct}%</span>
          </div>
          <div
            className="rounded-sm overflow-hidden"
            style={{ height: barHeight, background: 'rgba(255,255,255,0.03)' }}
          >
            <div
              className="h-full rounded-sm transition-all duration-1000"
              style={{
                width: `${item.pct}%`,
                background: `linear-gradient(90deg, ${item.color}40, ${item.color}80)`,
                boxShadow: `0 0 8px ${item.color}20`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export function Tokenomics() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, 0.15)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView || reduced) return

    import('animejs').then(({ animate, stagger }) => {
      const rows = ref.current?.querySelectorAll('.compare-row')
      if (!rows) return

      animate(rows, {
        opacity: [0, 1],
        translateX: [-12, 0],
        delay: stagger(60),
        duration: 600,
        ease: 'outExpo',
      })
    })
  }, [inView, reduced])

  return (
    <section id="tokenomics" className="section">
      <SectionHeader number="08" title="Sound Money" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {TOKENOMICS_STATS.map((stat) => (
          <StatBlock
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
          />
        ))}
      </div>

      <p className="zec-body max-w-[540px] mb-6" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'var(--ink-mid)' }}>
        ZEC has the exact same monetary policy as Bitcoin. Same 21 million hard cap.
        Same ~4-year halving schedule. No ICO. No premine. The only difference
        is that ZEC actually works as cash — because it&apos;s private.
      </p>

      <p className="zec-body max-w-[540px] mb-12" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'var(--ink-mid)' }}>
        ZEC is two halvings behind Bitcoin&apos;s maturity curve. The second halving in
        November 2024 reduced the block reward from 3.125 ZEC to 1.5625 ZEC, bringing
        annual inflation to roughly 4.2% — heading toward Bitcoin&apos;s current ~1.7%.
      </p>

      {/* Emission Schedule Chart */}
      <div className="max-w-3xl mx-auto mb-16">
        <h3 className="zec-label mb-6 text-center">
          Supply Emission: BTC vs ZEC
        </h3>
        <div className="terminal-card p-6">
          <EmissionChart />
        </div>
      </div>

      {/* Two-column: Distribution + Comparison */}
      <div ref={ref} className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Supply Distribution */}
        <div>
          <h3 className="zec-label mb-4">
            Supply Distribution (of 21M total)
          </h3>
          <div className="terminal-card p-5">
            <DistributionChart />
            <p className="text-xs text-zec-text-muted mt-4 leading-relaxed">
              The dev fund and founders reward have both expired. Since November
              2024, 100% of new ZEC goes to miners (transitioning to stakers
              with Tachyon).
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div>
          <h3 className="zec-label mb-4">
            BTC vs ZEC Monetary Policy
          </h3>
          <div className="terminal-card overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 px-5 py-3 border-b border-[rgba(201,168,76,0.12)]">
              <span className="font-mono text-xs text-zec-text-muted" />
              <span className="font-mono text-xs font-bold text-zec-gold text-center">BTC</span>
              <span className="font-mono text-xs font-bold text-zec-green text-center">ZEC</span>
            </div>
            {/* Rows */}
            {COMPARISON.map((row) => (
              <div
                key={row.label}
                className="compare-row grid grid-cols-3 gap-4 px-5 py-3 border-b border-[rgba(201,168,76,0.06)] last:border-b-0"
                style={{ opacity: reduced ? 1 : 0 }}
              >
                <span className="font-mono text-xs text-zec-text-muted">{row.label}</span>
                <span className="font-mono text-xs text-zec-text-body text-center">{row.btc}</span>
                <span className="font-mono text-xs text-zec-text-body text-center">{row.zec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
