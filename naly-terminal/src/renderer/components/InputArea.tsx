import { useState, useRef, useCallback, KeyboardEvent } from 'react'
import { Send, Square, ArrowUp } from 'lucide-react'
import { useChatStore } from '../stores/chat-store'

interface InputAreaProps {
  onSend: (message: string) => void
  onAbort: () => void
}

export function InputArea({ onSend, onAbort }: InputAreaProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { isStreaming } = useChatStore()

  const handleSubmit = useCallback(() => {
    if (value.trim() && !isStreaming) {
      onSend(value)
      setValue('')
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }, [value, isStreaming, onSend])

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleInput = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'
    }
  }

  return (
    <div className="border-t border-terminal-border bg-terminal-surface/30 p-3">
      <div className="flex items-end gap-2 max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              handleInput()
            }}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            rows={1}
            className="w-full bg-terminal-surface border border-terminal-border rounded-lg px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/20 resize-none font-mono transition-colors"
            disabled={isStreaming}
          />
        </div>

        {isStreaming ? (
          <button
            onClick={onAbort}
            className="p-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors flex-shrink-0"
            title="Stop (Esc)"
          >
            <Square size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!value.trim()}
            className="p-3 rounded-lg bg-amber-500 text-black hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            title="Send (Enter)"
          >
            <ArrowUp size={16} strokeWidth={2.5} />
          </button>
        )}
      </div>

      <div className="text-center mt-2">
        <span className="text-[10px] text-neutral-700">
          Enter to send · Shift+Enter for newline · Esc to stop
        </span>
      </div>
    </div>
  )
}
