import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { walletConfig } from '../data/mockData'
import StatusDot from './shared/StatusDot'

const steps = [
  'Install Zingo!, Ywallet, or ZecWallet Lite',
  'Open wallet settings → "Custom server"',
  'Enter the endpoint shown below and connect',
]

export default function WalletConnection() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(walletConfig.endpoint)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-8 px-6">
      <h2 className="text-xs font-mono uppercase tracking-wider text-sov-faint mb-6">
        Wallet Connection
      </h2>

      <div className="grid md:grid-cols-2 gap-8 bg-sov-surface border border-sov-border rounded-lg p-6">
        {/* Left: QR + endpoint */}
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-sov-bg rounded-lg border border-sov-border">
            <QRCodeSVG
              value={walletConfig.endpoint}
              size={180}
              bgColor="transparent"
              fgColor="#D1D5DB"
              level="M"
            />
          </div>

          <div className="flex items-center gap-2 w-full">
            <code className="flex-1 px-3 py-2 bg-sov-bg border border-sov-border rounded font-mono text-sm text-sov-text truncate">
              {walletConfig.endpoint}
            </code>
            <button
              onClick={handleCopy}
              className="px-3 py-2 bg-sov-surface-alt border border-sov-border rounded font-mono text-xs text-sov-muted hover:text-sov-bright hover:border-sov-gold/40 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <StatusDot color={walletConfig.connected ? 'green' : 'red'} pulse={walletConfig.connected} size={6} />
            <span className="text-xs text-sov-muted">
              {walletConfig.connected ? 'lightwalletd active' : 'Disconnected'}
            </span>
          </div>
        </div>

        {/* Right: Steps */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-sans font-medium text-sov-bright">Connect Your Wallet</h3>
          <ol className="flex flex-col gap-3">
            {steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sov-gold/15 text-sov-gold flex items-center justify-center text-xs font-mono font-semibold">
                  {i + 1}
                </span>
                <span className="text-sm text-sov-text font-sans leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
          <p className="text-xs text-sov-faint mt-2 font-sans">
            Your wallet connects directly to your node — no third-party servers, no metadata leaks.
          </p>
        </div>
      </div>
    </section>
  )
}
