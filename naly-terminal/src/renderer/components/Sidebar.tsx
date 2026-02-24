import { useState, useEffect } from 'react'
import { MessageSquare, FolderTree, Trash2, ChevronRight, ChevronDown, FileText, Folder } from 'lucide-react'
import { useChatStore } from '../stores/chat-store'
import type { SessionInfo, FileTreeNode } from '../types/claude'

interface SidebarProps {
  onResumeSession: (sessionId: string) => void
}

export function Sidebar({ onResumeSession }: SidebarProps) {
  const { sidebarOpen, sidebarTab, setSidebarTab, sessions, fileTree, activeSessionId } = useChatStore()

  useEffect(() => {
    if (sidebarOpen) {
      window.api.filetree.get().then((tree: unknown) => {
        useChatStore.getState().setFileTree(tree as FileTreeNode[])
      })
      window.api.filetree.watch()
    }
    return () => {
      window.api.filetree.stop()
    }
  }, [sidebarOpen])

  useEffect(() => {
    const unsub = window.api.filetree.onUpdate((data) => {
      useChatStore.getState().setFileTree(data as FileTreeNode[])
    })
    return unsub
  }, [])

  if (!sidebarOpen) return null

  return (
    <div className="w-64 flex-shrink-0 border-r border-terminal-border bg-terminal-surface/30 flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-terminal-border">
        <button
          onClick={() => setSidebarTab('sessions')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
            sidebarTab === 'sessions'
              ? 'text-amber-500 border-b-2 border-amber-500'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <MessageSquare size={13} />
          Sessions
        </button>
        <button
          onClick={() => setSidebarTab('files')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
            sidebarTab === 'files'
              ? 'text-amber-500 border-b-2 border-amber-500'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <FolderTree size={13} />
          Files
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {sidebarTab === 'sessions' ? (
          <SessionList
            sessions={sessions}
            activeSessionId={activeSessionId}
            onResume={onResumeSession}
          />
        ) : (
          <FileTreeView nodes={fileTree} />
        )}
      </div>
    </div>
  )
}

function SessionList({
  sessions,
  activeSessionId,
  onResume
}: {
  sessions: SessionInfo[]
  activeSessionId: string | null
  onResume: (id: string) => void
}) {
  const handleDelete = async (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation()
    await window.api.sessions.delete(sessionId)
    const updated = await window.api.sessions.list()
    useChatStore.getState().setSessions(updated as SessionInfo[])
  }

  if (sessions.length === 0) {
    return (
      <div className="p-4 text-center text-neutral-600 text-xs">
        No sessions yet. Start a conversation!
      </div>
    )
  }

  return (
    <div className="py-1">
      {sessions.map((session) => (
        <button
          key={session.id}
          onClick={() => onResume(session.id)}
          className={`w-full text-left px-3 py-2.5 group flex items-start gap-2 hover:bg-white/[0.03] transition-colors ${
            activeSessionId === session.id ? 'bg-white/[0.05]' : ''
          }`}
        >
          <MessageSquare size={13} className="text-neutral-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-xs text-neutral-300 truncate">{session.name}</div>
            <div className="text-[10px] text-neutral-600 mt-0.5">
              {new Date(session.lastMessageAt).toLocaleDateString()} · ${session.totalCost.toFixed(4)}
            </div>
          </div>
          <button
            onClick={(e) => handleDelete(e, session.id)}
            className="opacity-0 group-hover:opacity-100 p-0.5 text-neutral-600 hover:text-red-400 transition-all"
          >
            <Trash2 size={12} />
          </button>
        </button>
      ))}
    </div>
  )
}

function FileTreeView({ nodes }: { nodes: FileTreeNode[] }) {
  if (nodes.length === 0) {
    return (
      <div className="p-4 text-center text-neutral-600 text-xs">
        No files to display
      </div>
    )
  }

  return (
    <div className="py-1">
      {nodes.map((node) => (
        <TreeNode key={node.path} node={node} depth={0} />
      ))}
    </div>
  )
}

function TreeNode({ node, depth }: { node: FileTreeNode; depth: number }) {
  const [expanded, setExpanded] = useState(depth < 1)

  return (
    <div>
      <button
        onClick={() => node.isDirectory && setExpanded(!expanded)}
        className="w-full text-left flex items-center gap-1 py-1 px-2 hover:bg-white/[0.03] transition-colors group"
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {node.isDirectory ? (
          <>
            {expanded ? (
              <ChevronDown size={12} className="text-neutral-600" />
            ) : (
              <ChevronRight size={12} className="text-neutral-600" />
            )}
            <Folder size={13} className="text-amber-500/70" />
          </>
        ) : (
          <>
            <span className="w-3" />
            <FileText size={13} className="text-neutral-600" />
          </>
        )}
        <span className="text-xs text-neutral-400 truncate">{node.name}</span>
      </button>
      {node.isDirectory && expanded && node.children?.map((child) => (
        <TreeNode key={child.path} node={child} depth={depth + 1} />
      ))}
    </div>
  )
}
