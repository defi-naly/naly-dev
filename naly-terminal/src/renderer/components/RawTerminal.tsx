import { useEffect, useRef } from 'react'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'
import { useChatStore } from '../stores/chat-store'

export function RawTerminal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<Terminal | null>(null)
  const fitRef = useRef<FitAddon | null>(null)
  const { cwd } = useChatStore()

  useEffect(() => {
    if (!containerRef.current) return

    const term = new Terminal({
      theme: {
        background: '#0a0a0a',
        foreground: '#d4d4d4',
        cursor: '#f59e0b',
        cursorAccent: '#0a0a0a',
        selectionBackground: 'rgba(245, 158, 11, 0.3)',
        black: '#0a0a0a',
        red: '#ef4444',
        green: '#22c55e',
        yellow: '#f59e0b',
        blue: '#3b82f6',
        magenta: '#a855f7',
        cyan: '#06b6d4',
        white: '#d4d4d4',
        brightBlack: '#525252',
        brightRed: '#f87171',
        brightGreen: '#4ade80',
        brightYellow: '#fbbf24',
        brightBlue: '#60a5fa',
        brightMagenta: '#c084fc',
        brightCyan: '#22d3ee',
        brightWhite: '#fafafa'
      },
      fontFamily: 'JetBrains Mono, Menlo, Monaco, monospace',
      fontSize: 13,
      lineHeight: 1.4,
      cursorBlink: true,
      cursorStyle: 'bar',
      scrollback: 10000
    })

    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    term.open(containerRef.current)
    fitAddon.fit()

    termRef.current = term
    fitRef.current = fitAddon

    // Spawn PTY
    window.api.pty.spawn(cwd || undefined)

    // Connect PTY data → terminal
    const unsubData = window.api.pty.onData((data) => {
      term.write(data)
    })

    // Connect terminal input → PTY
    term.onData((data) => {
      window.api.pty.write(data)
    })

    // Handle resize
    term.onResize(({ cols, rows }) => {
      window.api.pty.resize(cols, rows)
    })

    const unsubExit = window.api.pty.onExit(() => {
      term.writeln('\r\n\x1b[90m[Process exited]\x1b[0m')
    })

    const unsubError = window.api.pty.onError((err) => {
      term.writeln(`\r\n\x1b[31m[PTY Error] ${err.message}\x1b[0m`)
    })

    // Fit on window resize
    const resizeObserver = new ResizeObserver(() => {
      fitAddon.fit()
    })
    resizeObserver.observe(containerRef.current)

    return () => {
      unsubData()
      unsubExit()
      unsubError()
      resizeObserver.disconnect()
      window.api.pty.kill()
      term.dispose()
    }
  }, [cwd])

  return (
    <div
      ref={containerRef}
      className="flex-1 w-full h-full p-2"
      style={{ background: '#0a0a0a' }}
    />
  )
}
