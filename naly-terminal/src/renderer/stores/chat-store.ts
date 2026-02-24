import { create } from 'zustand'
import type { ChatMessage, SessionInfo, SessionMeta, FileTreeNode } from '../types/claude'

interface ChatState {
  // Messages
  messages: ChatMessage[]
  isStreaming: boolean
  error: string | null

  // Session
  sessionMeta: SessionMeta
  sessions: SessionInfo[]
  activeSessionId: string | null

  // File tree
  fileTree: FileTreeNode[]
  cwd: string

  // UI
  sidebarOpen: boolean
  sidebarTab: 'sessions' | 'files'

  // Actions
  setMessages: (messages: ChatMessage[]) => void
  addMessage: (message: ChatMessage) => void
  setIsStreaming: (streaming: boolean) => void
  setError: (error: string | null) => void
  setSessionMeta: (meta: SessionMeta) => void
  setSessions: (sessions: SessionInfo[]) => void
  setActiveSessionId: (id: string | null) => void
  setFileTree: (tree: FileTreeNode[]) => void
  setCwd: (cwd: string) => void
  toggleSidebar: () => void
  setSidebarTab: (tab: 'sessions' | 'files') => void
  clearChat: () => void
}

const defaultMeta: SessionMeta = {
  sessionId: '',
  model: '',
  totalCost: 0,
  durationMs: 0,
  usage: { inputTokens: 0, outputTokens: 0 }
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isStreaming: false,
  error: null,
  sessionMeta: { ...defaultMeta },
  sessions: [],
  activeSessionId: null,
  fileTree: [],
  cwd: '',
  sidebarOpen: true,
  sidebarTab: 'sessions',

  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((s) => ({ messages: [...s.messages, message] })),
  setIsStreaming: (streaming) => set({ isStreaming: streaming }),
  setError: (error) => set({ error }),
  setSessionMeta: (meta) => set({ sessionMeta: meta }),
  setSessions: (sessions) => set({ sessions }),
  setActiveSessionId: (id) => set({ activeSessionId: id }),
  setFileTree: (tree) => set({ fileTree: tree }),
  setCwd: (cwd) => set({ cwd }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarTab: (tab) => set({ sidebarTab: tab }),
  clearChat: () => set({
    messages: [],
    sessionMeta: { ...defaultMeta },
    activeSessionId: null,
    error: null,
    isStreaming: false
  })
}))
