import { ipcMain, BrowserWindow, dialog } from 'electron'
import { spawnClaude, abortClaude, isClaudeRunning } from './claude-process'
import { saveSession, listSessions, deleteSession } from './session-manager'
import { getFileTree, watchDirectory, stopWatching } from './file-watcher'

let currentWorkingDir = process.env.NALY_CWD || process.cwd()

export function registerIpcHandlers(win: BrowserWindow): void {
  // Claude process
  ipcMain.on('claude:send', (_event, { prompt, sessionId, permissionMode }) => {
    spawnClaude(win, {
      prompt,
      sessionId,
      workingDirectory: currentWorkingDir,
      permissionMode: permissionMode || 'acceptEdits'
    })
  })

  ipcMain.on('claude:abort', () => {
    abortClaude()
  })

  ipcMain.handle('claude:isRunning', () => {
    return isClaudeRunning()
  })

  // Sessions
  ipcMain.handle('sessions:list', () => {
    return listSessions()
  })

  ipcMain.handle('sessions:save', (_event, session) => {
    saveSession(session)
  })

  ipcMain.handle('sessions:delete', (_event, sessionId: string) => {
    deleteSession(sessionId)
  })

  // File tree
  ipcMain.handle('filetree:get', () => {
    return getFileTree(currentWorkingDir)
  })

  ipcMain.on('filetree:watch', () => {
    watchDirectory(win, currentWorkingDir)
  })

  ipcMain.on('filetree:stop', () => {
    stopWatching()
  })

  // Working directory
  ipcMain.handle('cwd:get', () => {
    return currentWorkingDir
  })

  ipcMain.handle('cwd:set', (_event, newCwd: string) => {
    currentWorkingDir = newCwd
    stopWatching()
    watchDirectory(win, currentWorkingDir)
    return currentWorkingDir
  })

  ipcMain.handle('cwd:select', async () => {
    const result = await dialog.showOpenDialog(win, {
      properties: ['openDirectory'],
      title: 'Select Working Directory'
    })
    if (!result.canceled && result.filePaths[0]) {
      currentWorkingDir = result.filePaths[0]
      stopWatching()
      watchDirectory(win, currentWorkingDir)
      return currentWorkingDir
    }
    return null
  })
}
