import { useEffect, useState } from 'react'
import { TitleBar } from './components/TitleBar'
import { Sidebar } from './components/Sidebar'
import { ChatArea } from './components/ChatArea'
import { InputArea } from './components/InputArea'
import { StatusBar } from './components/StatusBar'
import { RawTerminal } from './components/RawTerminal'
import { useClaude } from './hooks/useClaude'
import { useChatStore } from './stores/chat-store'
import { MessageSquareCode, TerminalSquare } from 'lucide-react'

export default function App() {
  const { sendMessage, abort, resumeSession, newSession } = useClaude()
  const { setCwd } = useChatStore()
  const [mode, setMode] = useState<'chat' | 'terminal'>('chat')

  // Load working directory
  useEffect(() => {
    window.api.cwd.get().then(setCwd)
  }, [setCwd])

  // Listen for initial prompt from CLI launch
  useEffect(() => {
    const unsub = window.api.onInitialPrompt((data) => {
      if (data.cwd) {
        window.api.cwd.set(data.cwd).then(setCwd)
      }
      if (data.prompt) {
        // Small delay to ensure cwd is set before sending
        setTimeout(() => sendMessage(data.prompt), 100)
      }
    })
    return unsub
  }, [sendMessage, setCwd])

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        abort()
      }
      if (e.metaKey && e.key === 'n') {
        e.preventDefault()
        newSession()
      }
      if (e.metaKey && e.key === '\\') {
        e.preventDefault()
        useChatStore.getState().toggleSidebar()
      }
      // Cmd+T to toggle chat/terminal
      if (e.metaKey && e.key === 't') {
        e.preventDefault()
        setMode((m) => (m === 'chat' ? 'terminal' : 'chat'))
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [abort, newSession])

  return (
    <div className="h-screen flex flex-col bg-terminal-bg">
      <TitleBar onNewSession={newSession} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar onResumeSession={resumeSession} />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Mode tabs */}
          <div className="flex items-center gap-1 px-3 py-1.5 border-b border-terminal-border bg-terminal-surface/20">
            <button
              onClick={() => setMode('chat')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                mode === 'chat'
                  ? 'bg-amber-500/10 text-amber-500'
                  : 'text-neutral-600 hover:text-neutral-400'
              }`}
            >
              <MessageSquareCode size={13} />
              Chat
            </button>
            <button
              onClick={() => setMode('terminal')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                mode === 'terminal'
                  ? 'bg-amber-500/10 text-amber-500'
                  : 'text-neutral-600 hover:text-neutral-400'
              }`}
            >
              <TerminalSquare size={13} />
              Terminal
            </button>
            <span className="text-[10px] text-neutral-700 ml-auto">
              {'\u2318'}T to switch
            </span>
          </div>

          {mode === 'chat' ? (
            <>
              <ChatArea />
              <InputArea onSend={sendMessage} onAbort={abort} />
            </>
          ) : (
            <RawTerminal />
          )}
        </div>
      </div>

      <StatusBar />
    </div>
  )
}
