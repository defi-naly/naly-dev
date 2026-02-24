import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal } from 'lucide-react'
import { useChatStore } from '../stores/chat-store'
import { MessageBubble } from './MessageBubble'

export function ChatArea() {
  const { messages, error } = useChatStore()
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (messages.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <AnimatePresence mode="popLayout">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MessageBubble message={message} />
          </motion.div>
        ))}
      </AnimatePresence>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-4 my-3 p-3 rounded-lg border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-mono"
        >
          {error}
        </motion.div>
      )}

      <div ref={bottomRef} className="h-4" />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-4 max-w-md px-8">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto">
          <Terminal size={24} className="text-amber-500" />
        </div>
        <div>
          <h2 className="text-lg font-medium text-neutral-200 mb-1">Naly Terminal</h2>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Claude Code with a Bloomberg terminal aesthetic.
            Type a message to start a new session.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {['Explain this codebase', 'Find all TODOs', 'Write tests for...'].map((hint) => (
            <span
              key={hint}
              className="text-xs px-3 py-1.5 rounded-full border border-terminal-border text-neutral-500 bg-terminal-surface/50"
            >
              {hint}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
