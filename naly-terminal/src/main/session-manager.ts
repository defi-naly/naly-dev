import { app } from 'electron'
import fs from 'fs'
import path from 'path'

interface StoredSession {
  id: string
  name: string
  createdAt: number
  lastMessageAt: number
  messageCount: number
  model: string
  totalCost: number
}

const SESSIONS_FILE = 'sessions.json'

function getSessionsPath(): string {
  const userDataPath = app.getPath('userData')
  return path.join(userDataPath, SESSIONS_FILE)
}

function readSessions(): StoredSession[] {
  const filePath = getSessionsPath()
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(data)
    }
  } catch {
    // Corrupted file, start fresh
  }
  return []
}

function writeSessions(sessions: StoredSession[]): void {
  const filePath = getSessionsPath()
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, JSON.stringify(sessions, null, 2))
}

export function saveSession(session: StoredSession): void {
  const sessions = readSessions()
  const existingIndex = sessions.findIndex((s) => s.id === session.id)
  if (existingIndex >= 0) {
    sessions[existingIndex] = session
  } else {
    sessions.unshift(session)
  }
  writeSessions(sessions)
}

export function listSessions(): StoredSession[] {
  return readSessions().sort((a, b) => b.lastMessageAt - a.lastMessageAt)
}

export function deleteSession(sessionId: string): void {
  const sessions = readSessions().filter((s) => s.id !== sessionId)
  writeSessions(sessions)
}

export function getSession(sessionId: string): StoredSession | null {
  return readSessions().find((s) => s.id === sessionId) || null
}
