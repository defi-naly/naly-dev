import { useReducer, useRef, useCallback, useEffect } from 'react'
import { SectionHeader } from '../SectionHeader'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Lock } from '../../icons/Lock'
import { Circuit } from '../../icons/Circuit'
import { Shield } from '../../icons/Shield'
import { Key } from '../../icons/Key'
import { pseudoHash, generateNullifier } from '../../utils/crypto'

// ── Step config ──────────────────────────────────────────
const STEP_META = [
  { label: 'Commit', color: '#c9a84c', Icon: Lock, iconColor: 'text-zec-gold', bg: 'bg-[rgba(201,168,76,0.1)]' },
  { label: 'Prove', color: '#3b82f6', Icon: Circuit, iconColor: 'text-zec-shield', bg: 'bg-[rgba(59,130,246,0.1)]' },
  { label: 'Nullify', color: '#EF4444', Icon: Key, iconColor: 'text-zec-red', bg: 'bg-[rgba(239,68,68,0.1)]' },
  { label: 'Verify', color: '#22C55E', Icon: Shield, iconColor: 'text-zec-green', bg: 'bg-[rgba(34,197,94,0.1)]' },
]

// ── State ────────────────────────────────────────────────
interface State {
  currentStep: number
  commit: { secretValue: string; hashOutput: string }
  prove: { proofGenerated: boolean; proofHex: string }
  nullify: { spent: boolean; doubleSpendAttempted: boolean }
  verify: { verified: boolean; progress: number }
}

type Action =
  | { type: 'SET_SECRET'; value: string }
  | { type: 'SEAL_COMMITMENT' }
  | { type: 'GENERATE_PROOF'; proofHex: string }
  | { type: 'SPEND_NOTE' }
  | { type: 'DOUBLE_SPEND' }
  | { type: 'SET_VERIFY_PROGRESS'; value: number }
  | { type: 'VERIFY_COMPLETE' }
  | { type: 'RESET' }

const initialState: State = {
  currentStep: 0,
  commit: { secretValue: '', hashOutput: '' },
  prove: { proofGenerated: false, proofHex: '' },
  nullify: { spent: false, doubleSpendAttempted: false },
  verify: { verified: false, progress: 0 },
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_SECRET':
      return { ...state, commit: { ...state.commit, secretValue: action.value } }
    case 'SEAL_COMMITMENT':
      return {
        ...state,
        currentStep: 1,
        commit: { ...state.commit, hashOutput: pseudoHash(state.commit.secretValue) },
      }
    case 'GENERATE_PROOF':
      return {
        ...state,
        currentStep: 2,
        prove: { proofGenerated: true, proofHex: action.proofHex },
      }
    case 'SPEND_NOTE':
      return { ...state, nullify: { ...state.nullify, spent: true } }
    case 'DOUBLE_SPEND':
      return {
        ...state,
        currentStep: 3,
        nullify: { ...state.nullify, doubleSpendAttempted: true },
      }
    case 'SET_VERIFY_PROGRESS':
      return { ...state, verify: { ...state.verify, progress: action.value } }
    case 'VERIFY_COMPLETE':
      return { ...state, verify: { ...state.verify, verified: true, progress: 100 } }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

// ── Component ────────────────────────────────────────────
export function ZkProofFlow() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const sectionRef = useRef<HTMLDivElement>(null)
  const circuitRef = useRef<HTMLDivElement>(null)
  const hashDisplayRef = useRef<HTMLSpanElement>(null)
  const rejectRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const stepStatus = (index: number) => {
    if (state.currentStep > index) return 'completed'
    if (state.currentStep === index) return 'active'
    return 'locked'
  }

  // ── Hash typing animation ──────────────────────────────
  const animateHashTyping = useCallback(() => {
    if (reduced || !hashDisplayRef.current) return

    const el = hashDisplayRef.current
    if (!el) return
    const fullText = el.textContent || ''
    el.textContent = ''
    el.style.opacity = '1'

    let i = 0
    const interval = setInterval(() => {
      if (i < fullText.length) {
        el.textContent = fullText.slice(0, i + 1)
        i++
      } else {
        clearInterval(interval)
      }
    }, 20)
  }, [reduced])

  // ── Circuit grid animation ─────────────────────────────
  const animateCircuit = useCallback((onDone: () => void) => {
    if (reduced) {
      onDone()
      return
    }

    import('animejs').then(({ animate, stagger }) => {
      const cells = circuitRef.current?.querySelectorAll('.circuit-cell')
      if (!cells) { onDone(); return }

      animate(cells, {
        opacity: [0.1, 1, 0.3],
        backgroundColor: ['rgba(59,130,246,0.1)', 'rgba(59,130,246,0.6)', 'rgba(59,130,246,0.2)'],
        delay: stagger(40, { grid: [8, 4], from: 'first' }),
        duration: 600,
        ease: 'inOutQuad',
        onComplete: onDone,
      })
    })
  }, [reduced])

  // ── Step entrance animation — no blur ──────────────────
  useEffect(() => {
    if (reduced) return

    import('animejs').then(({ animate }) => {
      const activeCard = sectionRef.current?.querySelector('.step-card-active')
      if (activeCard) {
        animate(activeCard, {
          opacity: [0, 1],
          translateY: [16, 0],
          duration: 600,
          ease: 'outExpo',
        })
      }
    })
  }, [state.currentStep, reduced])

  // ── Handlers ───────────────────────────────────────────
  const handleSealCommitment = () => {
    dispatch({ type: 'SEAL_COMMITMENT' })
    requestAnimationFrame(() => animateHashTyping())
  }

  const handleGenerateProof = () => {
    const proofHex = pseudoHash(state.commit.hashOutput + '__proof').slice(0, 48)
    animateCircuit(() => {
      dispatch({ type: 'GENERATE_PROOF', proofHex })
    })
  }

  const handleSpendNote = () => {
    dispatch({ type: 'SPEND_NOTE' })
  }

  const handleDoubleSpend = () => {
    dispatch({ type: 'DOUBLE_SPEND' })

    if (!reduced && rejectRef.current) {
      rejectRef.current.classList.remove('shake-reject')
      requestAnimationFrame(() => {
        rejectRef.current?.classList.add('shake-reject')
      })
    }
  }

  const handleVerify = () => {
    if (reduced) {
      dispatch({ type: 'VERIFY_COMPLETE' })
      return
    }

    // Animate progress bar
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      dispatch({ type: 'SET_VERIFY_PROGRESS', value: Math.min(progress, 100) })
      if (progress >= 100) {
        clearInterval(interval)
        dispatch({ type: 'VERIFY_COMPLETE' })
      }
    }, 40)
  }

  const nullifier = state.commit.hashOutput
    ? generateNullifier(state.commit.hashOutput)
    : ''

  return (
    <section id="zk-proofs" className="section" ref={sectionRef}>
      <SectionHeader number="04" title="Zero-Knowledge Proofs" />

      <p className="zec-body max-w-[540px] mb-6" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'var(--ink-mid)' }}>
        A zero-knowledge proof lets you prove something is true without revealing
        why it&apos;s true. Walk through each stage below &mdash; type a secret,
        generate a proof, try to double-spend, and verify.
      </p>
      <p className="text-sm max-w-[540px] mb-12 leading-relaxed" style={{ color: 'var(--ink-mid)' }}>
        Every shielded transaction flows through four cryptographic stages. Each
        stage adds a layer of privacy while maintaining full verifiability.
      </p>

      {/* Step Indicator Bar */}
      <div className="flex items-center justify-center gap-0 mb-12 max-w-lg mx-auto">
        {STEP_META.map((step, i) => {
          const status = stepStatus(i)
          return (
            <div key={step.label} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                    status === 'completed'
                      ? ''
                      : status === 'active'
                        ? 'animate-pulse'
                        : ''
                  }`}
                  style={{
                    borderColor: status === 'locked' ? 'rgba(209,213,219,0.2)' : step.color,
                    backgroundColor: status === 'completed' ? step.color : 'transparent',
                    boxShadow: status === 'active' ? `0 0 8px ${step.color}60` : 'none',
                  }}
                />
                <span
                  className="font-mono text-[10px] hidden sm:block"
                  style={{
                    color: status === 'locked' ? 'rgba(209,213,219,0.3)' : step.color,
                  }}
                >
                  {step.label}
                </span>
              </div>
              {i < 3 && (() => {
                const nextStep = STEP_META[i + 1]!
                return (
                <div
                  className="flex-1 h-px mx-2"
                  style={{
                    background: status === 'completed' || stepStatus(i + 1) !== 'locked'
                      ? `linear-gradient(90deg, ${step.color}, ${nextStep.color})`
                      : 'rgba(209,213,219,0.1)',
                    borderStyle: stepStatus(i + 1) === 'locked' ? 'dashed' : 'solid',
                  }}
                />
                )
              })()}
            </div>
          )
        })}
      </div>

      {/* Steps */}
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Completed steps — collapsed summaries */}
        {STEP_META.map((step, i) => {
          if (stepStatus(i) !== 'completed') return null
          const { Icon } = step
          return (
            <div
              key={step.label}
              className="terminal-card px-5 py-3 flex items-center gap-3"
              style={{ borderColor: `${step.color}30` }}
            >
              <div className={`w-6 h-6 rounded-md ${step.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-3 h-3 ${step.iconColor}`} />
              </div>
              <span className="font-mono text-xs text-zec-text-muted flex-1">
                Step {String(i + 1).padStart(2, '0')} &mdash; {step.label}
              </span>
              <span className="font-mono text-xs" style={{ color: step.color }}>
                &#10003;
              </span>
            </div>
          )
        })}

        {/* Active step — full content */}
        {state.currentStep <= 3 && (() => {
          const currentMeta = STEP_META[state.currentStep]
          if (!currentMeta) return null
          const { Icon: StepIcon } = currentMeta
          return (
          <div
            className="step-card-active terminal-card p-5"
            style={{
              opacity: reduced ? 1 : 0,
              borderColor: `${currentMeta.color}30`,
            }}
          >
            {/* Step header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-lg ${currentMeta.bg} flex items-center justify-center flex-shrink-0`}>
                <StepIcon className={`w-4 h-4 ${currentMeta.iconColor}`} />
              </div>
              <div>
                <span
                  className="font-mono text-xs font-bold tracking-wider block"
                  style={{ color: currentMeta.color }}
                >
                  Step {String(state.currentStep + 1).padStart(2, '0')}
                </span>
                <h3 className="font-mono text-sm font-medium text-zec-text-bright">
                  {currentMeta.label}
                </h3>
              </div>
            </div>

            {/* ── Step 1: Commit ────────────────────────── */}
            {state.currentStep === 0 && (
              <div className="space-y-4">
                <p className="text-sm text-zec-text-body leading-relaxed">
                  Enter a secret value. Your wallet will create a cryptographic commitment &mdash;
                  a sealed fingerprint that goes on-chain without revealing what&apos;s inside.
                </p>
                <input
                  type="text"
                  className="terminal-input"
                  placeholder="Enter a secret value..."
                  value={state.commit.secretValue}
                  onChange={(e) => dispatch({ type: 'SET_SECRET', value: e.target.value })}
                />
                <button
                  onClick={handleSealCommitment}
                  disabled={!state.commit.secretValue.trim()}
                  className={`w-full py-2.5 rounded font-mono text-sm font-medium transition-all duration-200 ${
                    state.commit.secretValue.trim()
                      ? 'bg-zec-gold text-[#0a0a0c] hover:bg-zec-gold/90 cursor-pointer'
                      : 'bg-zec-gold/20 text-zec-text-muted cursor-not-allowed'
                  }`}
                >
                  Seal Commitment
                </button>
              </div>
            )}

            {/* ── Step 2: Prove ─────────────────────────── */}
            {state.currentStep === 1 && (
              <div className="space-y-4">
                {/* Show commitment result */}
                <div className="terminal-card p-3 bg-[rgba(201,168,76,0.03)]" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
                  <p className="font-mono text-xs text-zec-text-muted mb-1">Commitment sealed:</p>
                  <p className="font-mono text-xs text-zec-gold break-all">
                    <span className="text-zec-text-muted">Input: </span>
                    {state.commit.secretValue}
                    <span className="text-zec-text-muted"> → 0x</span>
                    <span ref={hashDisplayRef}>{state.commit.hashOutput.slice(0, 16)}...</span>
                  </p>
                </div>

                <p className="text-sm text-zec-text-body leading-relaxed">
                  Now generate a zero-knowledge proof. The Halo 2 proving system creates a compact,
                  unforgeable proof that the transaction is valid &mdash; without revealing any data.
                </p>

                {!state.prove.proofGenerated ? (
                  <>
                    {/* Circuit grid */}
                    <div
                      ref={circuitRef}
                      className="grid grid-cols-8 gap-1 max-w-xs mx-auto my-4"
                    >
                      {Array.from({ length: 32 }, (_, i) => (
                        <div
                          key={i}
                          className="circuit-cell w-full aspect-square rounded-sm"
                          style={{
                            backgroundColor: 'rgba(59,130,246,0.08)',
                            opacity: 0.2,
                          }}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleGenerateProof}
                      className="w-full py-2.5 rounded font-mono text-sm font-medium bg-[#3b82f6] text-white hover:bg-[#3b82f6]/90 transition-all duration-200 cursor-pointer"
                    >
                      Generate Proof
                    </button>
                  </>
                ) : (
                  <div className="terminal-card p-3 bg-[rgba(59,130,246,0.03)]" style={{ borderColor: 'rgba(59,130,246,0.1)' }}>
                    <p className="font-mono text-xs text-zec-text-muted mb-1">Proof generated:</p>
                    <p className="font-mono text-xs text-[#3b82f6] break-all">
                      0x{state.prove.proofHex}...
                    </p>
                    <p className="font-mono text-[10px] text-zec-text-muted mt-1">
                      288 bytes &mdash; covers everything
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ── Step 3: Nullify ───────────────────────── */}
            {state.currentStep === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-zec-text-body leading-relaxed">
                  A unique nullifier is published when you spend a note. Try spending it,
                  then try spending it again &mdash; the chain catches the duplicate.
                </p>

                {/* Chain log */}
                <div className="terminal-card p-3 bg-[rgba(0,0,0,0.2)] font-mono text-xs space-y-2" style={{ borderColor: 'rgba(239,68,68,0.1)' }}>
                  {state.nullify.spent && (
                    <div className="text-zec-green">
                      <span className="text-zec-text-muted">Block #1,847,293: </span>
                      nullifier 0x{nullifier.slice(0, 8)}... published{' '}
                      <span className="text-zec-green">&#10003;</span>
                    </div>
                  )}
                  {state.nullify.doubleSpendAttempted && (
                    <div
                      ref={rejectRef}
                      className="text-zec-red line-through"
                    >
                      <span className="text-zec-text-muted line-through">Block #1,847,294: </span>
                      nullifier 0x{nullifier.slice(0, 8)}... DUPLICATE [REJECTED]{' '}
                      <span className="text-zec-red">&#10007;</span>
                    </div>
                  )}
                  {!state.nullify.spent && (
                    <div className="text-zec-text-muted/40">Waiting for spend...</div>
                  )}
                </div>

                <div className="flex gap-3">
                  {!state.nullify.spent && (
                    <button
                      onClick={handleSpendNote}
                      className="flex-1 py-2.5 rounded font-mono text-sm font-medium bg-zec-red text-white hover:bg-zec-red/90 transition-all duration-200 cursor-pointer"
                    >
                      Spend Note
                    </button>
                  )}
                  {state.nullify.spent && !state.nullify.doubleSpendAttempted && (
                    <button
                      onClick={handleDoubleSpend}
                      className="flex-1 py-2.5 rounded font-mono text-sm font-medium bg-zec-red/20 text-zec-red border border-zec-red/30 hover:bg-zec-red/30 transition-all duration-200 cursor-pointer"
                    >
                      Try Double-Spend
                    </button>
                  )}
                </div>

                {state.nullify.doubleSpendAttempted && (
                  <p className="font-mono text-xs text-zec-text-muted leading-relaxed">
                    Same nullifier = same note. Caught without knowing which note.
                  </p>
                )}
              </div>
            )}

            {/* ── Step 4: Verify ────────────────────────── */}
            {state.currentStep === 3 && (
              <div className="space-y-4">
                <p className="text-sm text-zec-text-body leading-relaxed">
                  Any network node can verify this proof in milliseconds. The math confirms
                  everything is valid: correct amounts, authorized sender, no double-spend.
                </p>

                {!state.verify.verified ? (
                  <>
                    {/* Progress bar */}
                    {state.verify.progress > 0 && (
                      <div className="w-full h-2 rounded-full bg-[rgba(34,197,94,0.1)] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-zec-green transition-all duration-75"
                          style={{ width: `${state.verify.progress}%` }}
                        />
                      </div>
                    )}
                    <button
                      onClick={handleVerify}
                      disabled={state.verify.progress > 0}
                      className={`w-full py-2.5 rounded font-mono text-sm font-medium transition-all duration-200 ${
                        state.verify.progress > 0
                          ? 'bg-zec-green/20 text-zec-text-muted cursor-not-allowed'
                          : 'bg-zec-green text-[#0a0a0c] hover:bg-zec-green/90 cursor-pointer'
                      }`}
                    >
                      Run Verification
                    </button>
                  </>
                ) : (
                  <>
                    <div className="terminal-card p-4 bg-[rgba(34,197,94,0.05)] text-center" style={{ borderColor: 'rgba(34,197,94,0.2)' }}>
                      <p className="font-mono text-2xl font-bold text-zec-green mb-1">VALID</p>
                      <p className="font-mono text-xs text-zec-text-muted">
                        Information revealed to verifier: <span className="text-zec-green font-bold">0</span>
                      </p>
                    </div>
                    <p className="font-mono text-xs text-zec-green/80 leading-relaxed text-center">
                      Full network consensus with zero information leakage.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
          )
        })()}
      </div>
    </section>
  )
}
