import { useState, useRef, useEffect, useCallback } from 'react'
import { SectionHeader } from '../SectionHeader'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Key } from '../../icons/Key'
import { Eye } from '../../icons/Eye'
import { Lock } from '../../icons/Lock'

const TX = {
  from: 'zs1qr4n...7xvkpg',
  to: 'zs1w8a3...m2prtn',
  incoming: '14.1999 ZEC',
  outgoing: '14.2 ZEC',
  fee: '0.0001 ZEC',
  memo: 'Invoice #4829 \u2014 Q4 consulting',
  time: '2024-12-15 09:14:32 UTC',
}

interface FieldDef {
  label: string
  value: string
  minLevel: number // 1 = incoming, 2 = full, 3 = spending
}

const FIELDS: FieldDef[] = [
  { label: 'Incoming Amount', value: TX.incoming, minLevel: 1 },
  { label: 'Sender', value: TX.from, minLevel: 2 },
  { label: 'Outgoing Amount', value: TX.outgoing, minLevel: 2 },
  { label: 'Recipient', value: TX.to, minLevel: 2 },
  { label: 'Fee', value: TX.fee, minLevel: 2 },
  { label: 'Memo', value: TX.memo, minLevel: 2 },
]

const KEY_BUTTONS = [
  {
    level: 1 as const,
    label: 'Incoming Viewing Key',
    icon: Lock,
    color: '#22C55E',
    colorClass: 'text-zec-green',
    borderClass: 'border-zec-green/30',
    glowColor: 'rgba(34, 197, 94, 0.25)',
  },
  {
    level: 2 as const,
    label: 'Full Viewing Key',
    icon: Eye,
    color: '#c9a84c',
    colorClass: 'text-zec-gold',
    borderClass: 'border-zec-gold/30',
    glowColor: 'rgba(201, 168, 76, 0.25)',
  },
  {
    level: 3 as const,
    label: 'Spending Key',
    icon: Key,
    color: '#EF4444',
    colorClass: 'text-zec-red',
    borderClass: 'border-zec-red/30',
    glowColor: 'rgba(239, 68, 68, 0.25)',
  },
]

const LEVEL_LABELS = ['No access', 'Incoming Viewing', 'Full Viewing', 'Spending Authority']

const BORDER_COLORS = [
  'rgba(201, 168, 76, 0.08)',  // muted (level 0)
  'rgba(34, 197, 94, 0.25)',   // green (level 1)
  'rgba(201, 168, 76, 0.25)',  // gold (level 2)
  'rgba(239, 68, 68, 0.25)',   // red (level 3)
]

export function SelectiveDisclosure() {
  const [grantLevel, setGrantLevel] = useState<0 | 1 | 2 | 3>(0)
  const ref = useRef<HTMLDivElement>(null)
  const auditorRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, 0.15)
  const reduced = useReducedMotion()

  const handleKeyClick = useCallback((level: 1 | 2 | 3) => {
    // If already granted at this level or higher, revoke down to level - 1
    if (grantLevel >= level) {
      setGrantLevel((level - 1) as 0 | 1 | 2 | 3)
    } else {
      // Grant up to this level
      setGrantLevel(level)
    }
  }, [grantLevel])

  // Animate field reveals
  useEffect(() => {
    if (reduced || !auditorRef.current) return

    import('animejs').then(({ animate, stagger }) => {
      const fields = auditorRef.current?.querySelectorAll('.audit-field')
      if (!fields) return

      animate(fields, {
        opacity: [0.7, 1],
        duration: 300,
        delay: stagger(80),
        ease: 'outQuad',
      })
    })
  }, [grantLevel, reduced])

  // Entrance animation
  useEffect(() => {
    if (!inView || reduced) return

    import('animejs').then(({ animate, stagger }) => {
      const panels = ref.current?.querySelectorAll('.disclosure-panel')
      if (!panels) return

      animate(panels, {
        opacity: [0, 1],
        translateY: [16, 0],
        delay: stagger(60),
        duration: 600,
        ease: 'outExpo',
      })
    })
  }, [inView, reduced])

  return (
    <section id="disclosure" className="section">
      <SectionHeader number="05" title="Selective Disclosure" />

      <p className="zec-body max-w-[540px] mb-6" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'var(--ink-mid)' }}>
        Privacy doesn&apos;t mean hiding from everyone. Zcash&apos;s key hierarchy
        gives you granular control over who sees what &mdash; you choose what to reveal,
        and to whom.
      </p>
      <p className="text-sm text-zec-text-muted max-w-[540px] mb-12 leading-relaxed">
        Click the keys below to grant or revoke access. Watch what your auditor
        can see change in real time.
      </p>

      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Two-panel grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Left: Your Transaction */}
          <div
            className="disclosure-panel terminal-card overflow-hidden"
            style={{
              opacity: reduced ? 1 : 0,
              borderColor: 'rgba(201, 168, 76, 0.2)',
            }}
          >
            <div className="flex items-center gap-3 px-5 py-3 border-b border-zec-gold/10 bg-zec-gold/5">
              <Lock className="w-4 h-4 text-zec-gold" />
              <span className="font-mono text-xs tracking-wider uppercase text-zec-text-muted">
                Your Transaction
              </span>
            </div>
            <div className="p-5 space-y-0">
              {FIELDS.map((field) => (
                <div
                  key={field.label}
                  className="flex justify-between items-center py-2.5 border-b border-[rgba(201,168,76,0.06)] last:border-0"
                >
                  <span className="font-mono text-xs text-zec-text-muted">{field.label}</span>
                  <span className="font-mono text-sm text-zec-gold">{field.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center py-2.5 border-b border-[rgba(201,168,76,0.06)] last:border-0">
                <span className="font-mono text-xs text-zec-text-muted">Timestamp</span>
                <span className="font-mono text-sm text-zec-gold">{TX.time}</span>
              </div>
            </div>
          </div>

          {/* Right: Auditor's View */}
          <div
            ref={auditorRef}
            className="disclosure-panel terminal-card overflow-hidden transition-all duration-500"
            style={{
              opacity: reduced ? 1 : 0,
              borderColor: BORDER_COLORS[grantLevel],
            }}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(201,168,76,0.06)] bg-[rgba(255,255,255,0.02)]">
              <div className="flex items-center gap-3">
                <Eye className="w-4 h-4 text-zec-text-muted" />
                <span className="font-mono text-xs tracking-wider uppercase text-zec-text-muted">
                  Auditor&apos;s View
                </span>
              </div>
              <span
                className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                style={{
                  color: BORDER_COLORS[grantLevel],
                  border: `1px solid ${BORDER_COLORS[grantLevel]}`,
                }}
              >
                {LEVEL_LABELS[grantLevel]}
              </span>
            </div>
            <div className="p-5 space-y-0">
              {FIELDS.map((field) => {
                const visible = grantLevel >= field.minLevel
                return (
                  <div
                    key={field.label}
                    className="audit-field flex justify-between items-center py-2.5 border-b border-[rgba(201,168,76,0.06)] last:border-0"
                  >
                    <span className="font-mono text-xs text-zec-text-muted">{field.label}</span>
                    <span
                      className={`font-mono text-sm transition-all duration-400 ${
                        visible ? 'text-zec-text-bright' : 'text-zec-text-muted/30'
                      }`}
                      style={{
                        filter: visible ? 'blur(0px)' : 'blur(4px)',
                        transition: 'filter 0.4s ease, color 0.4s ease, opacity 0.4s ease',
                        opacity: visible ? 1 : 0.4,
                      }}
                    >
                      {visible ? field.value : '[encrypted]'}
                    </span>
                  </div>
                )
              })}
              {/* Timestamp always visible */}
              <div className="audit-field flex justify-between items-center py-2.5 border-b border-[rgba(201,168,76,0.06)] last:border-0">
                <span className="font-mono text-xs text-zec-text-muted">Timestamp</span>
                <span className="font-mono text-sm text-zec-text-bright">{TX.time}</span>
              </div>
              {/* Fund control row — spending key only */}
              {grantLevel === 3 && (
                <div className="audit-field flex justify-between items-center py-2.5 mt-2 rounded-md bg-zec-red/5 px-3 border border-zec-red/20">
                  <span className="font-mono text-xs text-zec-red">Fund Control</span>
                  <span className="font-mono text-sm font-bold text-zec-red">
                    AUTHORIZED
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Key buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {KEY_BUTTONS.map((key) => {
            const Icon = key.icon
            const active = grantLevel >= key.level
            return (
              <button
                key={key.level}
                onClick={() => handleKeyClick(key.level)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded font-mono text-xs transition-all duration-300 border min-w-[180px] justify-center ${
                  active
                    ? `${key.borderClass} ${key.colorClass}`
                    : 'border-[rgba(201,168,76,0.08)] text-zec-text-muted hover:border-[rgba(201,168,76,0.2)]'
                }`}
                style={{
                  boxShadow: active ? `0 0 16px ${key.glowColor}` : 'none',
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{key.label}</span>
                <span className="text-[10px] opacity-60 ml-1">
                  {active ? '(revoke)' : '(grant)'}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
