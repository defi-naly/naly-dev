import { BrowserWindow } from 'electron'
import chokidar from 'chokidar'
import fs from 'fs'
import path from 'path'

let watcher: chokidar.FSWatcher | null = null

interface FileNode {
  name: string
  path: string
  isDirectory: boolean
  children?: FileNode[]
}

const IGNORED_DIRS = new Set([
  'node_modules', '.git', '.next', 'dist', 'out', 'build',
  '.cache', '.turbo', '__pycache__', '.DS_Store', 'release'
])

function buildTree(dirPath: string, depth = 0, maxDepth = 3): FileNode[] {
  if (depth >= maxDepth) return []

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    const nodes: FileNode[] = []

    // Directories first, then files, both alphabetical
    const sorted = entries
      .filter((e) => !IGNORED_DIRS.has(e.name) && !e.name.startsWith('.'))
      .sort((a, b) => {
        if (a.isDirectory() !== b.isDirectory()) {
          return a.isDirectory() ? -1 : 1
        }
        return a.name.localeCompare(b.name)
      })

    for (const entry of sorted) {
      const fullPath = path.join(dirPath, entry.name)
      const node: FileNode = {
        name: entry.name,
        path: fullPath,
        isDirectory: entry.isDirectory()
      }

      if (entry.isDirectory()) {
        node.children = buildTree(fullPath, depth + 1, maxDepth)
      }

      nodes.push(node)
    }

    return nodes
  } catch {
    return []
  }
}

export function getFileTree(dirPath: string): FileNode[] {
  return buildTree(dirPath)
}

export function watchDirectory(win: BrowserWindow, dirPath: string): void {
  stopWatching()

  watcher = chokidar.watch(dirPath, {
    ignored: /(^|[/\\])(\.git|node_modules|\.next|dist|out|build)/,
    persistent: true,
    depth: 3,
    ignoreInitial: true
  })

  const sendUpdate = (): void => {
    const tree = buildTree(dirPath)
    win.webContents.send('filetree:update', tree)
  }

  // Debounce updates
  let timeout: NodeJS.Timeout | null = null
  const debouncedUpdate = (): void => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(sendUpdate, 500)
  }

  watcher.on('add', debouncedUpdate)
  watcher.on('unlink', debouncedUpdate)
  watcher.on('addDir', debouncedUpdate)
  watcher.on('unlinkDir', debouncedUpdate)
}

export function stopWatching(): void {
  if (watcher) {
    watcher.close()
    watcher = null
  }
}
