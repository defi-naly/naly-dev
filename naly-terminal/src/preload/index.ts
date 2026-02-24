import { contextBridge, ipcRenderer } from 'electron'

export type ClaudeStreamCallback = (data: unknown) => void
export type ClaudeErrorCallback = (data: { message: string; hint?: string }) => void
export type ClaudeDoneCallback = (data: { code: number | null }) => void
export type FileTreeCallback = (data: unknown[]) => void
export type InitialPromptData = { prompt: string; cwd: string }

const api = {
  // Initial prompt from CLI launch
  onInitialPrompt: (callback: (data: InitialPromptData) => void) => {
    const handler = (_: Electron.IpcRendererEvent, data: InitialPromptData) => callback(data)
    ipcRenderer.on('claude:initial', handler)
    return () => ipcRenderer.removeListener('claude:initial', handler)
  },

  // Claude process
  claude: {
    send: (prompt: string, sessionId?: string, permissionMode?: string) => {
      ipcRenderer.send('claude:send', { prompt, sessionId, permissionMode })
    },
    abort: () => {
      ipcRenderer.send('claude:abort')
    },
    isRunning: () => ipcRenderer.invoke('claude:isRunning') as Promise<boolean>,
    onStream: (callback: ClaudeStreamCallback) => {
      const handler = (_: Electron.IpcRendererEvent, data: unknown) => callback(data)
      ipcRenderer.on('claude:stream', handler)
      return () => ipcRenderer.removeListener('claude:stream', handler)
    },
    onStderr: (callback: (text: string) => void) => {
      const handler = (_: Electron.IpcRendererEvent, text: string) => callback(text)
      ipcRenderer.on('claude:stderr', handler)
      return () => ipcRenderer.removeListener('claude:stderr', handler)
    },
    onDone: (callback: ClaudeDoneCallback) => {
      const handler = (_: Electron.IpcRendererEvent, data: { code: number | null }) => callback(data)
      ipcRenderer.on('claude:done', handler)
      return () => ipcRenderer.removeListener('claude:done', handler)
    },
    onError: (callback: ClaudeErrorCallback) => {
      const handler = (_: Electron.IpcRendererEvent, data: { message: string; hint?: string }) => callback(data)
      ipcRenderer.on('claude:error', handler)
      return () => ipcRenderer.removeListener('claude:error', handler)
    }
  },

  // Sessions
  sessions: {
    list: () => ipcRenderer.invoke('sessions:list'),
    save: (session: unknown) => ipcRenderer.invoke('sessions:save', session),
    delete: (sessionId: string) => ipcRenderer.invoke('sessions:delete', sessionId)
  },

  // File tree
  filetree: {
    get: () => ipcRenderer.invoke('filetree:get'),
    watch: () => ipcRenderer.send('filetree:watch'),
    stop: () => ipcRenderer.send('filetree:stop'),
    onUpdate: (callback: FileTreeCallback) => {
      const handler = (_: Electron.IpcRendererEvent, data: unknown[]) => callback(data)
      ipcRenderer.on('filetree:update', handler)
      return () => ipcRenderer.removeListener('filetree:update', handler)
    }
  },

  // Working directory
  cwd: {
    get: () => ipcRenderer.invoke('cwd:get') as Promise<string>,
    set: (cwd: string) => ipcRenderer.invoke('cwd:set', cwd) as Promise<string>,
    select: () => ipcRenderer.invoke('cwd:select') as Promise<string | null>
  },

  // PTY (raw terminal)
  pty: {
    spawn: (cwd?: string) => {
      ipcRenderer.send('pty:spawn', { cwd })
    },
    write: (data: string) => {
      ipcRenderer.send('pty:write', data)
    },
    resize: (cols: number, rows: number) => {
      ipcRenderer.send('pty:resize', { cols, rows })
    },
    kill: () => {
      ipcRenderer.send('pty:kill')
    },
    onData: (callback: (data: string) => void) => {
      const handler = (_: Electron.IpcRendererEvent, data: string) => callback(data)
      ipcRenderer.on('pty:data', handler)
      return () => ipcRenderer.removeListener('pty:data', handler)
    },
    onExit: (callback: (code: number) => void) => {
      const handler = (_: Electron.IpcRendererEvent, code: number) => callback(code)
      ipcRenderer.on('pty:exit', handler)
      return () => ipcRenderer.removeListener('pty:exit', handler)
    },
    onError: (callback: (data: { message: string }) => void) => {
      const handler = (_: Electron.IpcRendererEvent, data: { message: string }) => callback(data)
      ipcRenderer.on('pty:error', handler)
      return () => ipcRenderer.removeListener('pty:error', handler)
    }
  }
}

contextBridge.exposeInMainWorld('api', api)

export type NalyApi = typeof api
