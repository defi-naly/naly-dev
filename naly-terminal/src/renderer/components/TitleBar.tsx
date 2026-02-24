import { PanelLeftClose, PanelLeftOpen, Plus, FolderOpen } from 'lucide-react'
import { useChatStore } from '../stores/chat-store'

interface TitleBarProps {
  onNewSession: () => void
}

export function TitleBar({ onNewSession }: TitleBarProps) {
  const { sidebarOpen, toggleSidebar, cwd, sessionMeta } = useChatStore()

  const handleSelectCwd = async () => {
    const newCwd = await window.api.cwd.select()
    if (newCwd) {
      useChatStore.getState().setCwd(newCwd)
    }
  }

  const dirName = cwd ? cwd.split('/').pop() : ''

  return (
    <div className="drag-region h-12 flex items-center px-4 border-b border-terminal-border bg-terminal-surface/50 backdrop-blur-sm">
      {/* macOS traffic light spacer */}
      <div className="w-[72px] flex-shrink-0" />

      {/* Sidebar toggle */}
      <button
        onClick={toggleSidebar}
        className="no-drag p-1.5 rounded-md hover:bg-white/5 text-neutral-500 hover:text-neutral-300 transition-colors"
      >
        {sidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
      </button>

      {/* Title */}
      <div className="flex-1 flex items-center justify-center gap-2">
        <span className="text-xs font-medium text-neutral-400 tracking-wider uppercase">
          Naly Terminal
        </span>
        {sessionMeta.model && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 font-medium">
            {sessionMeta.model.split('-').slice(-1)[0]}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={handleSelectCwd}
          className="no-drag flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/5 text-neutral-500 hover:text-neutral-300 transition-colors text-xs"
          title="Change working directory"
        >
          <FolderOpen size={14} />
          {dirName && <span className="max-w-[120px] truncate">{dirName}</span>}
        </button>
        <button
          onClick={onNewSession}
          className="no-drag p-1.5 rounded-md hover:bg-white/5 text-neutral-500 hover:text-neutral-300 transition-colors"
          title="New session"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  )
}
