import { useChatStore } from '../stores/chat-store'
import { Circle, Zap, Clock, DollarSign } from 'lucide-react'

export function StatusBar() {
  const { sessionMeta, isStreaming, messages, cwd } = useChatStore()

  const formatCost = (cost: number) => {
    if (cost === 0) return '-'
    return `$${cost.toFixed(4)}`
  }

  const formatDuration = (ms: number) => {
    if (ms === 0) return '-'
    if (ms < 1000) return `${ms}ms`
    return `${(ms / 1000).toFixed(1)}s`
  }

  const formatTokens = (input: number, output: number) => {
    if (input === 0 && output === 0) return '-'
    const fmt = (n: number) => n > 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
    return `${fmt(input)} in / ${fmt(output)} out`
  }

  return (
    <div className="h-7 flex items-center px-3 border-t border-terminal-border bg-terminal-surface/50 text-[10px] text-neutral-600 gap-4">
      {/* Status */}
      <div className="flex items-center gap-1.5">
        <Circle
          size={6}
          className={isStreaming ? 'fill-amber-500 text-amber-500 animate-pulse' : 'fill-terminal-accent text-terminal-accent'}
        />
        <span>{isStreaming ? 'Streaming...' : 'Ready'}</span>
      </div>

      {/* Model */}
      {sessionMeta.model && (
        <div className="flex items-center gap-1">
          <Zap size={10} />
          <span>{sessionMeta.model}</span>
        </div>
      )}

      {/* Tokens */}
      <div className="flex items-center gap-1">
        <span>{formatTokens(sessionMeta.usage.inputTokens, sessionMeta.usage.outputTokens)}</span>
      </div>

      <div className="flex-1" />

      {/* Duration */}
      {sessionMeta.durationMs > 0 && (
        <div className="flex items-center gap-1">
          <Clock size={10} />
          <span>{formatDuration(sessionMeta.durationMs)}</span>
        </div>
      )}

      {/* Cost */}
      <div className="flex items-center gap-1">
        <DollarSign size={10} />
        <span>{formatCost(sessionMeta.totalCost)}</span>
      </div>

      {/* Messages count */}
      <div>{messages.length} msgs</div>

      {/* CWD */}
      <div className="max-w-[200px] truncate text-neutral-700" title={cwd}>
        {cwd}
      </div>
    </div>
  )
}
