import { useState } from 'react'
import { ChevronDown, ChevronRight, Loader2, CheckCircle2, XCircle, Terminal, FileSearch, Edit3, Globe, Search } from 'lucide-react'
import type { ToolUseBlock } from '../types/claude'

const TOOL_ICONS: Record<string, typeof Terminal> = {
  Bash: Terminal,
  Read: FileSearch,
  Edit: Edit3,
  Write: Edit3,
  Glob: Search,
  Grep: Search,
  WebFetch: Globe,
  WebSearch: Globe
}

const TOOL_COLORS: Record<string, string> = {
  Bash: 'text-amber-500 bg-amber-500/10',
  Read: 'text-blue-400 bg-blue-400/10',
  Edit: 'text-purple-400 bg-purple-400/10',
  Write: 'text-purple-400 bg-purple-400/10',
  Glob: 'text-cyan-400 bg-cyan-400/10',
  Grep: 'text-cyan-400 bg-cyan-400/10',
  WebFetch: 'text-green-400 bg-green-400/10',
  WebSearch: 'text-green-400 bg-green-400/10'
}

interface ToolUseCardProps {
  block: ToolUseBlock
}

export function ToolUseCard({ block }: ToolUseCardProps) {
  const [expanded, setExpanded] = useState(false)

  const Icon = TOOL_ICONS[block.name] || Terminal
  const colorClass = TOOL_COLORS[block.name] || 'text-neutral-400 bg-neutral-400/10'

  const statusIcon = {
    running: <Loader2 size={13} className="animate-spin text-amber-500" />,
    done: <CheckCircle2 size={13} className="text-terminal-accent" />,
    error: <XCircle size={13} className="text-red-400" />
  }[block.status]

  // Build summary from input
  const summary = getToolSummary(block)

  return (
    <div className="border border-terminal-border rounded-lg overflow-hidden bg-terminal-surface/50">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/[0.02] transition-colors"
      >
        {expanded ? (
          <ChevronDown size={13} className="text-neutral-600" />
        ) : (
          <ChevronRight size={13} className="text-neutral-600" />
        )}

        <div className={`p-1 rounded ${colorClass}`}>
          <Icon size={12} />
        </div>

        <span className="text-xs font-medium text-neutral-300">{block.name}</span>

        {summary && (
          <span className="text-xs text-neutral-600 truncate flex-1 text-left">{summary}</span>
        )}

        <div className="flex-shrink-0">{statusIcon}</div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-terminal-border">
          {/* Input */}
          {block.input && Object.keys(block.input).length > 0 && (
            <div className="px-3 py-2 border-b border-terminal-border/50">
              <div className="text-[10px] uppercase tracking-wider text-neutral-600 mb-1">Input</div>
              <pre className="text-xs text-neutral-400 whitespace-pre-wrap break-all overflow-x-auto max-h-48 overflow-y-auto font-mono">
                {formatInput(block.input)}
              </pre>
            </div>
          )}

          {/* Output */}
          {block.output && (
            <div className="px-3 py-2">
              <div className="text-[10px] uppercase tracking-wider text-neutral-600 mb-1">
                {block.status === 'error' ? 'Error' : 'Output'}
              </div>
              <pre
                className={`text-xs whitespace-pre-wrap break-all overflow-x-auto max-h-64 overflow-y-auto font-mono ${
                  block.status === 'error' ? 'text-red-400' : 'text-neutral-500'
                }`}
              >
                {block.output.length > 2000 ? block.output.slice(0, 2000) + '\n...(truncated)' : block.output}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function getToolSummary(block: ToolUseBlock): string {
  const input = block.input
  if (!input) return ''

  switch (block.name) {
    case 'Bash':
      return String(input.command || '').slice(0, 80)
    case 'Read':
      return String(input.file_path || '').split('/').pop() || ''
    case 'Edit':
    case 'Write':
      return String(input.file_path || '').split('/').pop() || ''
    case 'Glob':
      return String(input.pattern || '')
    case 'Grep':
      return String(input.pattern || '')
    case 'WebFetch':
    case 'WebSearch':
      return String(input.url || input.query || '').slice(0, 60)
    default:
      return ''
  }
}

function formatInput(input: Record<string, unknown>): string {
  try {
    return JSON.stringify(input, null, 2)
  } catch {
    return String(input)
  }
}
