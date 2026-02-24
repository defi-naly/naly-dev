import { X_CHAR_LIMIT, X_URL_LENGTH } from './constants';

const URL_REGEX = /https?:\/\/[^\s<]+/g;
// Construct at runtime to avoid TS flag check on unicode regex
const EMOJI_REGEX = new RegExp('\\p{Emoji_Presentation}|\\p{Emoji}\\uFE0F', 'gu');

/** Count characters as X counts them: URLs=23, emoji=2, everything else=1 */
export function countXChars(text: string): number {
  if (!text) return 0;

  let processed = text;
  const urls = text.match(URL_REGEX) || [];
  for (const url of urls) {
    processed = processed.replace(url, 'x'.repeat(X_URL_LENGTH));
  }

  const emojis = processed.match(EMOJI_REGEX) || [];
  for (const emoji of emojis) {
    processed = processed.replace(emoji, '');
  }

  return processed.length + emojis.length * 2;
}

export function charStatus(count: number): 'safe' | 'warn' | 'danger' | 'over' {
  if (count > X_CHAR_LIMIT) return 'over';
  if (count > X_CHAR_LIMIT - 20) return 'danger';
  if (count > X_CHAR_LIMIT - 40) return 'warn';
  return 'safe';
}

/** Extract plain text from TipTap JSON */
export function tiptapToText(node: unknown): string {
  if (!node || typeof node !== 'object') return '';
  const n = node as { type?: string; text?: string; content?: unknown[] };
  if (n.type === 'text') return n.text || '';
  if (Array.isArray(n.content)) {
    return n.content.map(c => tiptapToText(c)).join(n.type === 'paragraph' ? '\n' : '');
  }
  return '';
}

/** Split long text into thread-sized segments at word boundaries */
export function splitThread(text: string): string[] {
  if (countXChars(text) <= X_CHAR_LIMIT) return [text];

  const segments: string[] = [];
  const paragraphs = text.split('\n\n');
  let current = '';

  for (const para of paragraphs) {
    const combined = current ? `${current}\n\n${para}` : para;

    if (countXChars(combined) <= X_CHAR_LIMIT) {
      current = combined;
    } else if (countXChars(para) > X_CHAR_LIMIT) {
      if (current) { segments.push(current.trim()); current = ''; }
      const words = para.split(/\s+/);
      for (const word of words) {
        const next = current ? `${current} ${word}` : word;
        if (countXChars(next) <= X_CHAR_LIMIT) {
          current = next;
        } else {
          if (current) segments.push(current.trim());
          current = word;
        }
      }
    } else {
      if (current) segments.push(current.trim());
      current = para;
    }
  }

  if (current.trim()) segments.push(current.trim());
  return segments;
}
