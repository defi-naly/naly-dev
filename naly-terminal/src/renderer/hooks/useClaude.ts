import { useEffect, useCallback, useRef } from 'react'
import { useChatStore } from '../stores/chat-store'
import { parseStreamLine, createUserMessage } from '../lib/message-parser'
import type { ClaudeStreamLine, SessionMeta } from '../types/claude'

export function useClaude() {
  const {
    messages,
    isStreaming,
    sessionMeta,
    activeSessionId,
    setMessages,
    setIsStreaming,
    setError,
    setSessionMeta,
    setActiveSessionId,
    setSessions,
    addMessage,
    clearChat
  } = useChatStore()

  // Use refs to avoid stale closures in event handlers
  const messagesRef = useRef(messages)
  const metaRef = useRef(sessionMeta)
  messagesRef.current = messages
  metaRef.current = sessionMeta

  useEffect(() => {
    const unsubStream = window.api.claude.onStream((data) => {
      const line = data as ClaudeStreamLine
      const { messages: updated, meta } = parseStreamLine(
        line,
        messagesRef.current,
        metaRef.current
      )
      setMessages(updated)
      setSessionMeta(meta)

      // Capture session ID from init
      if (line.type === 'system' && line.subtype === 'init' && line.session_id) {
        setActiveSessionId(line.session_id)
      }
    })

    const unsubDone = window.api.claude.onDone(() => {
      setIsStreaming(false)
      // Save session
      const meta = metaRef.current
      if (meta.sessionId) {
        window.api.sessions.save({
          id: meta.sessionId,
          name: getSessionName(messagesRef.current),
          createdAt: messagesRef.current[0]?.timestamp || Date.now(),
          lastMessageAt: Date.now(),
          messageCount: messagesRef.current.length,
          model: meta.model,
          totalCost: meta.totalCost
        })
        // Refresh session list
        window.api.sessions.list().then((sessions: unknown) => {
          setSessions(sessions as never[])
        })
      }
    })

    const unsubError = window.api.claude.onError((err) => {
      setError(err.message + (err.hint ? `\n${err.hint}` : ''))
      setIsStreaming(false)
    })

    const unsubStderr = window.api.claude.onStderr(() => {
      // Stderr is mainly progress info — could display in status bar
    })

    return () => {
      unsubStream()
      unsubDone()
      unsubError()
      unsubStderr()
    }
  }, [])

  const sendMessage = useCallback(
    (text: string) => {
      if (isStreaming || !text.trim()) return

      const userMsg = createUserMessage(text.trim())
      addMessage(userMsg)
      setIsStreaming(true)
      setError(null)

      window.api.claude.send(
        text.trim(),
        activeSessionId || undefined
      )
    },
    [isStreaming, activeSessionId, addMessage, setIsStreaming, setError]
  )

  const abort = useCallback(() => {
    window.api.claude.abort()
    setIsStreaming(false)
  }, [setIsStreaming])

  const resumeSession = useCallback(
    (sessionId: string) => {
      clearChat()
      setActiveSessionId(sessionId)
    },
    [clearChat, setActiveSessionId]
  )

  const newSession = useCallback(() => {
    clearChat()
  }, [clearChat])

  // Load sessions on mount
  useEffect(() => {
    window.api.sessions.list().then((sessions: unknown) => {
      setSessions(sessions as never[])
    })
  }, [setSessions])

  return {
    messages,
    isStreaming,
    sessionMeta,
    sendMessage,
    abort,
    resumeSession,
    newSession
  }
}

function getSessionName(messages: { role: string; content: { type: string; text?: string }[] }[]): string {
  const firstUserMsg = messages.find((m) => m.role === 'user')
  if (firstUserMsg) {
    const textBlock = firstUserMsg.content.find((b) => b.type === 'text')
    if (textBlock?.text) {
      return textBlock.text.slice(0, 60) + (textBlock.text.length > 60 ? '...' : '')
    }
  }
  return 'New Session'
}
