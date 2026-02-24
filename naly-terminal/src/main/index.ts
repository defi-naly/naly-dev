import { app, BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { registerIpcHandlers } from './ipc-handlers'
import { registerPtyHandlers, cleanupPty } from './pty-manager'

interface LaunchArgs {
  prompt: string
  cwd: string
}

function parseLaunchArgs(argv: string[]): LaunchArgs {
  let prompt = process.env.NALY_PROMPT || ''
  let cwd = process.env.NALY_CWD || ''

  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--prompt' && argv[i + 1]) {
      prompt = argv[i + 1]
      i++
    } else if (argv[i] === '--cwd' && argv[i + 1]) {
      cwd = argv[i + 1]
      i++
    }
  }

  return { prompt, cwd }
}

let mainWindow: BrowserWindow | null = null
let pendingArgs: LaunchArgs | null = null

function sendInitialPrompt(win: BrowserWindow, args: LaunchArgs): void {
  if (args.prompt || args.cwd) {
    win.webContents.send('claude:initial', {
      prompt: args.prompt,
      cwd: args.cwd
    })
  }
}

function createWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 16, y: 16 },
    backgroundColor: '#0a0a0a',
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  win.on('ready-to-show', () => {
    win.show()
    if (pendingArgs) {
      sendInitialPrompt(win, pendingArgs)
      pendingArgs = null
    }
  })

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Load renderer
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }

  registerIpcHandlers(win)
  registerPtyHandlers(win)

  return win
}

// Single instance lock
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (_event, argv) => {
    const args = parseLaunchArgs(argv)
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
      sendInitialPrompt(mainWindow, args)
    }
  })

  app.whenReady().then(() => {
    electronApp.setAppUserModelId('dev.naly.terminal')

    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    pendingArgs = parseLaunchArgs(process.argv)
    mainWindow = createWindow()

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow = createWindow()
      }
    })
  })

  app.on('window-all-closed', () => {
    cleanupPty()
    mainWindow = null
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
}
