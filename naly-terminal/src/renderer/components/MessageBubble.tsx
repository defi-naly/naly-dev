import { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Copy, Check, User, Bot } from 'lucide-react'
import { useState, useCallback } from 'react'
import type { ChatMessage, TextBlock } from '../types/claude'
import { ToolUseCard } from './ToolUseCard'

interface MessageBubbleProps {
  message: ChatMessage
}

export const MessageBubble = memo(function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 py-4 px-4 ${isUser ? '' : 'bg-white/[0.02]'}`}>
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${
          isUser
            ? 'bg-amber-500/10 text-amber-500'
            : 'bg-terminal-accent/10 text-terminal-accent'
        }`}
      >
        {isUser ? <User size={14} /> : <Bot size={14} />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-3">
        {/* Role label */}
        <div className="text-[10px] font-medium uppercase tracking-wider text-neutral-600">
          {isUser ? 'You' : 'Claude'}
          {message.isStreaming && (
            <span className="ml-2 inline-flex items-center gap-1 text-amber-500/70 normal-case tracking-normal">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
              streaming
            </span>
          )}
        </div>

        {/* Content blocks */}
        {message.content.map((block, i) => {
          if (block.type === 'text') {
            return <TextContent key={i} block={block} />
          }
          if (block.type === 'tool_use') {
            return <ToolUseCard key={block.id || i} block={block} />
          }
          return null
        })}
      </div>
    </div>
  )
})

function TextContent({ block }: { block: TextBlock }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none prose-p:text-neutral-300 prose-headings:text-neutral-200 prose-a:text-amber-500 prose-strong:text-neutral-200 prose-code:text-amber-400 prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-terminal-surface prose-pre:border prose-pre:border-terminal-border">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre: ({ children, ...props }) => (
            <div className="relative group">
              <pre {...props} className="!bg-terminal-surface !border !border-terminal-border rounded-lg overflow-x-auto">
                {children}
              </pre>
              <CopyButton getText={() => {
                const el = document.createElement('div')
                el.innerHTML = String(children)
                return el.textContent || ''
              }} />
            </div>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code className="text-amber-400 bg-white/5 px-1 py-0.5 rounded text-[13px]" {...props}>
                  {children}
                </code>
              )
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {block.text}
      </ReactMarkdown>
    </div>
  )
}

function CopyButton({ getText }: { getText: () => string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(getText())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [getText])

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 rounded-md bg-terminal-surface/80 border border-terminal-border text-neutral-500 hover:text-neutral-300 opacity-0 group-hover:opacity-100 transition-all"
    >
      {copied ? <Check size={13} className="text-terminal-accent" /> : <Copy size={13} />}
    </button>
  )
}
