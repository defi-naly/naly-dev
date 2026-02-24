import { useState, useRef, useCallback } from 'react'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { SectionHeader } from '../SectionHeader'
import { Eye } from '../../icons/Eye'
import { EyeOff } from '../../icons/EyeOff'
import { Shield } from '../../icons/Shield'
import { pseudoHash, encryptedGibberish } from '../../utils/crypto'

type Phase = 'compose' | 'sending' | 'explorer'

const FROM_ADDR = 'zs1qr4n...7xvkpg'

export function TxDemo() {
  const [shielded, setShielded] = useState(false)
  const [phase, setPhase] = useState<Phase>('compose')
  const [transitioning, setTransitioning] = useState(false)
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('')

  const ref = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const shieldIconRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, 0.2)
  const reduced = useReducedMotion()

  const canSend = recipient.trim() && amount.trim() && memo.trim()

  const handleAmountChange = (value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const handleSend = useCallback(() => {
    if (!canSend) return

    if (reduced) {
      setPhase('explorer')
      return
    }

    setPhase('sending')

    // Animate compose card out
    import('animejs').then(({ animate }) => {
      if (cardRef.current) {
        animate(cardRef.current, {
          opacity: [1, 0],
          translateY: [0, -10],
          duration: 300,
          ease: 'inQuad',
        })
      }
    })

    setTimeout(() => {
      setPhase('explorer')

      if (!reduced) {
        requestAnimationFrame(() => {
          import('animejs').then(({ animate }) => {
            if (cardRef.current) {
              animate(cardRef.current, {
                opacity: [0, 1],
                translateY: [16, 0],
                duration: 500,
                ease: 'outExpo',
              })
            }
          })
        })
      }
    }, 800)
  }, [canSend, reduced])

  const handleReset = () => {
    setPhase('compose')
    setRecipient('')
    setAmount('')
    setMemo('')
  }

  const handleToggle = useCallback(() => {
    if (transitioning || phase === 'sending') return
    const nextShielded = !shielded

    if (reduced) {
      setShielded(nextShielded)
      return
    }

    // In compose phase, just toggle mode — no animation needed
    if (phase === 'compose') {
      setShielded(nextShielded)
      return
    }

    // In explorer phase, animate the values
    setTransitioning(true)

    import('animejs').then(({ animate, stagger, createTimeline }) => {
      const valueEls = cardRef.current?.querySelectorAll('.tx-value')
      if (!valueEls) {
        setShielded(nextShielded)
        setTransitioning(false)
        return
      }

      const tl = createTimeline({
        defaults: { ease: 'outExpo' },
      })

      // Phase 1: slide out current values
      tl.add(valueEls, {
        translateX: [0, nextShielded ? -8 : 8],
        opacity: [1, 0],
        delay: stagger(60),
        duration: 200,
        ease: 'inQuad',
      })

      // Shield icon spin
      if (shieldIconRef.current) {
        tl.add(shieldIconRef.current, {
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          duration: 600,
          ease: 'outBack',
        }, 0)
      }

      // Card border glow flash
      if (cardRef.current) {
        const glowColor = nextShielded
          ? 'rgba(34, 197, 94, 0.3)'
          : 'rgba(239, 68, 68, 0.3)'
        tl.add(cardRef.current, {
          boxShadow: [
            '0 0 0px rgba(0,0,0,0)',
            `0 0 20px ${glowColor}, 0 0 40px ${glowColor.replace('0.3', '0.15')}`,
            '0 0 0px rgba(0,0,0,0)',
          ],
          duration: 800,
          ease: 'outExpo',
        }, 200)
      }

      // Update state mid-transition
      setTimeout(() => {
        setShielded(nextShielded)

        requestAnimationFrame(() => {
          const newValueEls = cardRef.current?.querySelectorAll('.tx-value')
          if (!newValueEls) {
            setTransitioning(false)
            return
          }

          animate(newValueEls, {
            translateX: [nextShielded ? 8 : -8, 0],
            opacity: [0, 1],
            delay: stagger(60),
            duration: 400,
            ease: 'outExpo',
            onComplete: () => setTransitioning(false),
          })
        })
      }, 250)
    })
  }, [shielded, transitioning, reduced, phase])

  // Build explorer fields from user input
  const txHash = pseudoHash(`${recipient}${amount}${memo}`)
  const explorerFields = [
    {
      label: 'Tx Hash',
      transparent: `0x${txHash.slice(0, 8)}...${txHash.slice(-8)}`,
      shielded: `0x${txHash.slice(0, 8)}...${txHash.slice(-8)}`,
    },
    {
      label: 'From',
      transparent: FROM_ADDR,
      shielded: encryptedGibberish(FROM_ADDR),
    },
    {
      label: 'To',
      transparent: recipient,
      shielded: encryptedGibberish(recipient),
    },
    {
      label: 'Amount',
      transparent: `${amount} ZEC`,
      shielded: encryptedGibberish(amount),
    },
    {
      label: 'Fee',
      transparent: '0.0001 ZEC',
      shielded: '0.0001 ZEC',
    },
    {
      label: 'Memo',
      transparent: memo,
      shielded: encryptedGibberish(memo),
    },
    {
      label: 'Proof',
      transparent: 'N/A',
      shielded: 'zk-SNARK valid \u2713',
    },
  ]

  return (
    <section id="tx-demo" className="section">
      <SectionHeader number="03" title="See the Difference" />

      <p className="zec-body max-w-[540px] mb-10" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'var(--ink-mid)' }}>
        Compose a transaction, then toggle between transparent and shielded to
        see exactly what the network reveals. In a shielded transaction, a
        zero-knowledge proof replaces every piece of identifying data.
      </p>

      <div ref={ref} className="max-w-2xl mx-auto">
        {/* Narrative context */}
        <p className={`text-center font-mono text-sm mb-6 transition-all duration-500 ${
          shielded ? 'text-zec-green' : 'text-zec-red/80'
        }`}>
          {shielded
            ? 'Mathematically verified. Completely invisible.'
            : 'Your employer, your ex, and every government on Earth can see this.'}
        </p>

        {/* Toggle — always visible */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span
            className={`font-mono text-sm transition-colors ${
              !shielded ? 'text-zec-red' : 'text-zec-text-muted'
            }`}
          >
            <Eye className="w-4 h-4 inline mr-1.5" />
            Transparent
          </span>

          <button
            onClick={handleToggle}
            disabled={phase === 'sending'}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
              shielded ? 'bg-zec-green' : 'bg-zec-red/80'
            } ${phase === 'sending' ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label={`Switch to ${shielded ? 'transparent' : 'shielded'} view`}
          >
            <div
              className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                shielded ? 'translate-x-7' : 'translate-x-0.5'
              }`}
            />
          </button>

          <span
            className={`font-mono text-sm transition-colors ${
              shielded ? 'text-zec-green' : 'text-zec-text-muted'
            }`}
          >
            <EyeOff className="w-4 h-4 inline mr-1.5" />
            Shielded
          </span>
        </div>

        {/* Compose Phase */}
        {phase === 'compose' && (
          <div
            ref={cardRef}
            className={`terminal-card overflow-hidden transition-all duration-500 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              borderColor: shielded ? 'rgba(34, 197, 94, 0.25)' : 'rgba(201, 168, 76, 0.15)',
            }}
          >
            {/* Header */}
            <div className={`flex items-center gap-3 px-5 py-3 border-b transition-colors duration-500 ${
              shielded ? 'border-zec-green/20 bg-zec-green/5' : 'border-zec-gold/10 bg-zec-gold/5'
            }`}>
              <div ref={shieldIconRef} className="inline-flex">
                <Shield
                  className={`w-4 h-4 transition-colors duration-500 ${
                    shielded ? 'text-zec-green' : 'text-zec-gold'
                  }`}
                />
              </div>
              <span className="font-mono text-xs tracking-wider uppercase text-zec-text-muted">
                Compose Transaction
              </span>
            </div>

            {/* Inputs */}
            <div className="p-5 space-y-4">
              <div>
                <label className="block font-mono text-xs text-zec-text-muted mb-1.5">To</label>
                <input
                  type="text"
                  className="terminal-input"
                  placeholder="zs1w8a3...m2prtn"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-zec-text-muted mb-1.5">Amount</label>
                <input
                  type="text"
                  inputMode="decimal"
                  className="terminal-input"
                  placeholder="14.2"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-zec-text-muted mb-1.5">Memo</label>
                <input
                  type="text"
                  className="terminal-input"
                  placeholder="Invoice #4829 — Q4 consulting"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                />
              </div>

              <button
                onClick={handleSend}
                disabled={!canSend}
                className={`w-full py-2.5 rounded font-mono text-sm font-medium transition-all duration-200 ${
                  canSend
                    ? 'bg-zec-gold text-[#0a0a0c] hover:bg-zec-gold/90 cursor-pointer'
                    : 'bg-zec-gold/20 text-zec-text-muted cursor-not-allowed'
                }`}
              >
                Send Transaction
              </button>
            </div>
          </div>
        )}

        {/* Sending Phase */}
        {phase === 'sending' && (
          <div className="flex items-center justify-center py-16">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-zec-gold"
                  style={{
                    animation: `pulse 0.8s ease-in-out ${i * 0.15}s infinite`,
                  }}
                />
              ))}
            </div>
            <style>{`
              @keyframes pulse {
                0%, 100% { opacity: 0.3; transform: scale(0.8); }
                50% { opacity: 1; transform: scale(1.2); }
              }
            `}</style>
          </div>
        )}

        {/* Explorer Phase */}
        {phase === 'explorer' && (
          <div
            ref={cardRef}
            className={`terminal-card overflow-hidden transition-all duration-500 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              borderColor: shielded ? 'rgba(34, 197, 94, 0.25)' : 'rgba(239, 68, 68, 0.25)',
            }}
          >
            {/* Header */}
            <div
              className={`flex items-center gap-3 px-5 py-3 border-b transition-colors duration-500 ${
                shielded ? 'border-zec-green/20 bg-zec-green/5' : 'border-zec-red/20 bg-zec-red/5'
              }`}
            >
              <div ref={shieldIconRef} className="inline-flex">
                <Shield
                  className={`w-4 h-4 transition-colors duration-500 ${
                    shielded ? 'text-zec-green' : 'text-zec-red'
                  }`}
                />
              </div>
              <span className="font-mono text-xs tracking-wider uppercase text-zec-text-muted">
                Block Explorer // Block #1,847,293
              </span>
            </div>

            {/* Fields */}
            <div className="p-5 space-y-0">
              {explorerFields.map((field, i) => {
                const value = shielded ? field.shielded : field.transparent
                const isObscured = shielded && field.label !== 'Tx Hash' && field.label !== 'Fee' && field.label !== 'Proof'
                return (
                  <div
                    key={field.label}
                    className="flex justify-between items-center py-3 border-b border-[rgba(201,168,76,0.06)] last:border-0"
                  >
                    <span className="font-mono text-sm text-zec-text-muted">
                      {field.label}
                    </span>
                    <span
                      className={`tx-value font-mono text-sm transition-all duration-400 text-right max-w-[60%] truncate ${
                        isObscured
                          ? 'text-zec-text-muted/40'
                          : field.label === 'Proof' && shielded
                            ? 'text-zec-green'
                            : field.label === 'Proof' && !shielded
                              ? 'text-zec-text-muted/40'
                              : 'text-zec-text-bright'
                      }`}
                      style={{
                        filter: isObscured ? 'blur(4px)' : 'none',
                        transition: `filter 0.4s ease ${i * 60}ms`,
                      }}
                    >
                      {value}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Footer */}
            <div
              className={`px-5 py-3 border-t transition-colors duration-500 ${
                shielded ? 'border-zec-green/20 bg-zec-green/5' : 'border-zec-red/20 bg-zec-red/5'
              }`}
            >
              <p className="font-mono text-xs text-zec-text-muted">
                {shielded
                  ? 'Only the proof of validity is public. All details encrypted.'
                  : 'All transaction details visible to anyone scanning the blockchain.'}
              </p>
            </div>

            {/* Reset button */}
            <div className="px-5 pb-4 pt-2">
              <button
                onClick={handleReset}
                className="w-full py-2 rounded font-mono text-xs text-zec-text-muted border border-[rgba(201,168,76,0.12)] hover:border-zec-gold/30 hover:text-zec-text-bright transition-all duration-200"
              >
                New Transaction
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
