import { spawn, ChildProcess } from 'child_process'
import { BrowserWindow } from 'electron'
import path from 'path'
import os from 'os'
import fs from 'fs'

interface ClaudeProcessOptions {
  prompt: string
  sessionId?: string
  workingDirectory?: string
  permissionMode?: string
}

let activeProcess: ChildProcess | null = null

function findClaudeCli(): string {
  const candidates = [
    path.join(os.homedir(), '.npm-global/bin/claude'),
    '/usr/local/bin/claude',
    '/opt/homebrew/bin/claude',
    path.join(os.homedir(), '.local/bin/claude')
  ]

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate
    }
  }

  return 'claude' // fallback to PATH
}

export function spawnClaude(
  win: BrowserWindow,
  options: ClaudeProcessOptions
): void {
  if (activeProcess) {
    activeProcess.kill('SIGTERM')
    activeProcess = null
  }

  const args = [
    '-p',
    '--output-format', 'stream-json',
    '--verbose'
  ]

  if (options.sessionId) {
    args.push('--resume', options.sessionId)
  }

  if (options.permissionMode) {
    args.push('--permission-mode', options.permissionMode)
  }

  args.push(options.prompt)

  const claudePath = findClaudeCli()
  console.log('[claude-process] spawning:', claudePath, args.join(' '))
  console.log('[claude-process] cwd:', options.workingDirectory || process.cwd())

  activeProcess = spawn(claudePath, args, {
    cwd: options.workingDirectory || process.cwd(),
    env: {
      ...process.env,
      FORCE_COLOR: '0' // Disable ANSI colors in JSON output
    },
    shell: true
  })

  let buffer = ''

  activeProcess.stdout?.on('data', (data: Buffer) => {
    buffer += data.toString()

    // Process complete NDJSON lines
    const lines = buffer.split('\n')
    buffer = lines.pop() || '' // Keep incomplete line in buffer

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue

      try {
        const parsed = JSON.parse(trimmed)
        console.log('[claude-process] stream:', parsed.type, parsed.subtype || '')
        win.webContents.send('claude:stream', parsed)
      } catch {
        console.log('[claude-process] non-json:', trimmed.slice(0, 100))
      }
    }
  })

  activeProcess.stderr?.on('data', (data: Buffer) => {
    const text = data.toString()
    console.log('[claude-process] stderr:', text.slice(0, 200))
    win.webContents.send('claude:stderr', text)
  })

  activeProcess.on('close', (code, signal) => {
    console.log('[claude-process] closed with code:', code, 'signal:', signal)
    // Flush remaining buffer
    if (buffer.trim()) {
      try {
        const parsed = JSON.parse(buffer.trim())
        win.webContents.send('claude:stream', parsed)
      } catch {
        // ignore
      }
    }

    win.webContents.send('claude:done', { code })
    activeProcess = null
  })

  activeProcess.on('error', (err) => {
    console.log('[claude-process] error:', err.message)
    win.webContents.send('claude:error', {
      message: err.message,
      hint: 'Make sure claude CLI is installed and in your PATH. Run: npm install -g @anthropic-ai/claude-code'
    })
    activeProcess = null
  })
}

export function abortClaude(): void {
  if (activeProcess) {
    activeProcess.kill('SIGTERM')
    activeProcess = null
  }
}

export function isClaudeRunning(): boolean {
  return activeProcess !== null
}
