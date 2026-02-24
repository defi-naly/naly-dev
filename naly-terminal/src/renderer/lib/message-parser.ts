import type {
  ClaudeStreamLine,
  ChatMessage,
  ChatContentBlock,
  TextBlock,
  ToolUseBlock,
  SessionMeta
} from '../types/claude'

let currentMessageId = 0
function nextId(): string {
  return `msg-${++currentMessageId}`
}

export function parseStreamLine(
  line: ClaudeStreamLine,
  messages: ChatMessage[],
  meta: SessionMeta
): { messages: ChatMessage[]; meta: SessionMeta } {
  const updated = [...messages]

  switch (line.type) {
    case 'system': {
      if (line.subtype === 'init') {
        meta = {
          ...meta,
          sessionId: line.session_id,
          model: line.model
        }
      }
      break
    }

    case 'stream_event': {
      const event = line.event
      if (!event) break

      // Content block start — create new block
      if (event.type === 'content_block_start' && event.content_block) {
        let lastMsg = getOrCreateAssistantMessage(updated)
        const block = event.content_block

        if (block.type === 'text') {
          lastMsg.content.push({ type: 'text', text: '' })
        } else if (block.type === 'tool_use') {
          lastMsg.content.push({
            type: 'tool_use',
            id: block.id || '',
            name: block.name || 'unknown',
            input: {},
            status: 'running'
          })
        }
        lastMsg.isStreaming = true
      }

      // Content block delta — append text
      if (event.type === 'content_block_delta' && event.delta) {
        let lastMsg = getOrCreateAssistantMessage(updated)
        const lastBlock = lastMsg.content[lastMsg.content.length - 1]

        if (event.delta.type === 'text_delta' && event.delta.text && lastBlock?.type === 'text') {
          (lastBlock as TextBlock).text += event.delta.text
        } else if (event.delta.type === 'input_json_delta' && event.delta.text && lastBlock?.type === 'tool_use') {
          // Tool input comes as JSON string fragments — accumulate
          const toolBlock = lastBlock as ToolUseBlock
          const existingJson = (toolBlock as unknown as { _rawInput?: string })._rawInput || ''
          const newJson = existingJson + event.delta.text
          ;(toolBlock as unknown as { _rawInput: string })._rawInput = newJson
          try {
            toolBlock.input = JSON.parse(newJson)
          } catch {
            // Incomplete JSON, will be parsed when complete
          }
        }
      }

      // Content block stop
      if (event.type === 'content_block_stop') {
        // Nothing specific needed
      }

      // Message stop
      if (event.type === 'message_stop') {
        let lastMsg = updated[updated.length - 1]
        if (lastMsg?.role === 'assistant') {
          lastMsg.isStreaming = false
        }
      }

      break
    }

    case 'assistant': {
      // Complete assistant message from CLI stream-json format
      const content = line.message?.content
      if (content && Array.isArray(content)) {
        const blocks: ChatContentBlock[] = content.map((block) => {
          if (block.type === 'text') {
            return { type: 'text' as const, text: block.text || '' }
          } else if (block.type === 'tool_use') {
            return {
              type: 'tool_use' as const,
              id: block.id || '',
              name: block.name || 'unknown',
              input: block.input || {},
              status: 'running' as const
            }
          }
          return { type: 'text' as const, text: '' }
        })

        const newMsg: ChatMessage = {
          id: nextId(),
          role: 'assistant',
          content: blocks,
          timestamp: Date.now(),
          isStreaming: false
        }
        updated.push(newMsg)
      } else {
        // Fallback: finalize existing assistant message
        const lastMsg = updated[updated.length - 1]
        if (lastMsg?.role === 'assistant') {
          lastMsg.isStreaming = false
          for (const block of lastMsg.content) {
            if (block.type === 'tool_use' && block.status === 'running') {
              block.status = 'done'
            }
          }
        }
      }
      break
    }

    case 'user': {
      // Tool results — update corresponding tool_use blocks
      if (line.message?.content) {
        for (const result of line.message.content) {
          if (result.type === 'tool_result') {
            // Find the matching tool_use block
            for (const msg of updated) {
              for (const block of msg.content) {
                if (block.type === 'tool_use' && block.id === result.tool_use_id) {
                  block.output = result.content
                  block.status = result.is_error ? 'error' : 'done'
                  if (result.is_error) {
                    block.error = result.content
                  }
                }
              }
            }
          }
        }
      }
      break
    }

    case 'result': {
      meta = {
        ...meta,
        sessionId: line.session_id || meta.sessionId,
        totalCost: line.total_cost_usd,
        durationMs: line.duration_ms,
        usage: {
          inputTokens: line.usage?.input_tokens || 0,
          outputTokens: line.usage?.output_tokens || 0
        }
      }
      break
    }
  }

  return { messages: updated, meta }
}

function getOrCreateAssistantMessage(messages: ChatMessage[]): ChatMessage {
  const last = messages[messages.length - 1]
  if (last?.role === 'assistant' && last.isStreaming !== false) {
    return last
  }

  const newMsg: ChatMessage = {
    id: nextId(),
    role: 'assistant',
    content: [],
    timestamp: Date.now(),
    isStreaming: true
  }
  messages.push(newMsg)
  return newMsg
}

export function createUserMessage(text: string): ChatMessage {
  return {
    id: nextId(),
    role: 'user',
    content: [{ type: 'text', text }],
    timestamp: Date.now()
  }
}
