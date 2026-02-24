import { BrowserWindow, ipcMain } from 'electron'
import os from 'os'

// node-pty is a native module — require it dynamically
let pty: typeof import('node-pty') | null = null
try {
  pty = require('node-pty')
} catch {
  console.warn('node-pty not available, raw terminal mode disabled')
}

type IPty = import('node-pty').IPty
let activePty: IPty | null = null

export function registerPtyHandlers(win: BrowserWindow): void {
  if (!pty) return

  ipcMain.on('pty:spawn', (_event, { cwd }: { cwd?: string }) => {
    if (activePty) {
      activePty.kill()
      activePty = null
    }

    const shell = process.env.SHELL || (os.platform() === 'win32' ? 'powershell.exe' : '/bin/zsh')

    try {
      activePty = pty!.spawn(shell, [], {
        name: 'xterm-256color',
        cols: 120,
        rows: 30,
        cwd: cwd || os.homedir(),
        env: process.env as Record<string, string>
      })

      activePty.onData((data: string) => {
        win.webContents.send('pty:data', data)
      })

      activePty.onExit(({ exitCode }) => {
        win.webContents.send('pty:exit', exitCode)
        activePty = null
      })
    } catch (err) {
      console.error('Failed to spawn PTY:', err)
      win.webContents.send('pty:error', {
        message: err instanceof Error ? err.message : String(err)
      })
    }
  })

  ipcMain.on('pty:write', (_event, data: string) => {
    activePty?.write(data)
  })

  ipcMain.on('pty:resize', (_event, { cols, rows }: { cols: number; rows: number }) => {
    activePty?.resize(cols, rows)
  })

  ipcMain.on('pty:kill', () => {
    activePty?.kill()
    activePty = null
  })
}

export function cleanupPty(): void {
  activePty?.kill()
  activePty = null
}
