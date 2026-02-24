// Types for Claude CLI stream-json output

export interface ClaudeInitMessage {
  type: 'system'
  subtype: 'init'
  session_id: string
  model: string
  tools: string[]
}

export interface ClaudeStreamEvent {
  type: 'stream_event'
  event: {
    type: string
    index?: number
    delta?: {
      type: string
      text?: string
    }
    content_block?: {
      type: string
      id?: string
      name?: string
      input?: string
    }
  }
}

export interface ClaudeAssistantMessage {
  type: 'assistant'
  message: {
    id: string
    role: 'assistant'
    content: ClaudeContentBlock[]
    model: string
    usage: {
      input_tokens: number
      output_tokens: number
    }
  }
}

export interface ClaudeUserToolResult {
  type: 'user'
  message: {
    role: 'user'
    content: ClaudeToolResult[]
  }
}

export interface ClaudeResultMessage {
  type: 'result'
  result: string
  total_cost_usd: number
  duration_ms: number
  duration_api_ms: number
  usage: {
    input_tokens: number
    output_tokens: number
    cache_read_input_tokens: number
    cache_creation_input_tokens: number
  }
  is_error: boolean
  session_id: string
  num_turns: number
}

export type ClaudeStreamLine =
  | ClaudeInitMessage
  | ClaudeStreamEvent
  | ClaudeAssistantMessage
  | ClaudeUserToolResult
  | ClaudeResultMessage

export interface ClaudeContentBlock {
  type: 'text' | 'tool_use'
  text?: string
  id?: string
  name?: string
  input?: Record<string, unknown>
}

export interface ClaudeToolResult {
  type: 'tool_result'
  tool_use_id: string
  content: string
  is_error?: boolean
}

// App-level message types for the UI

export type ChatMessageRole = 'user' | 'assistant' | 'system'

export interface ChatMessage {
  id: string
  role: ChatMessageRole
  content: ChatContentBlock[]
  timestamp: number
  isStreaming?: boolean
}

export interface TextBlock {
  type: 'text'
  text: string
}

export interface ToolUseBlock {
  type: 'tool_use'
  id: string
  name: string
  input: Record<string, unknown>
  status: 'running' | 'done' | 'error'
  output?: string
  error?: string
}

export type ChatContentBlock = TextBlock | ToolUseBlock

export interface SessionInfo {
  id: string
  name: string
  createdAt: number
  lastMessageAt: number
  messageCount: number
  model: string
  totalCost: number
}

export interface SessionMeta {
  sessionId: string
  model: string
  totalCost: number
  durationMs: number
  usage: {
    inputTokens: number
    outputTokens: number
  }
}

export interface FileTreeNode {
  name: string
  path: string
  isDirectory: boolean
  children?: FileTreeNode[]
}
