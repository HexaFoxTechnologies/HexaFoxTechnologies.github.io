import { config } from '../config.ts';
import type { ChatMessage } from '../providers/types.ts';

export interface ChatRequest {
  question: string;
  history: ChatMessage[];
  turnstileToken?: string;
}

export type Validation = { ok: true; request: ChatRequest } | { ok: false; reason: 'bad_request' | 'too_long' };

/** Check the body's shape and sizes. Earlier turns are trimmed rather than rejected. */
export async function parseChatRequest(request: Request): Promise<Validation> {
  const length = Number(request.headers.get('Content-Length') ?? 0);
  if (length > config.maxBodyBytes) return { ok: false, reason: 'bad_request' };

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > config.maxBodyBytes) return { ok: false, reason: 'bad_request' };
    body = JSON.parse(raw);
  } catch {
    return { ok: false, reason: 'bad_request' };
  }
  if (!body || typeof body !== 'object') return { ok: false, reason: 'bad_request' };

  const { question, history, turnstileToken } = body as Record<string, unknown>;
  if (typeof question !== 'string' || !question.trim()) return { ok: false, reason: 'bad_request' };
  if (question.length > config.maxQuestionChars) return { ok: false, reason: 'too_long' };

  return {
    ok: true,
    request: {
      question: question.trim(),
      history: cleanHistory(history),
      turnstileToken: typeof turnstileToken === 'string' ? turnstileToken : undefined,
    },
  };
}

/** Keep the last few well-formed turns, starting with a visitor turn as the model APIs expect. */
function cleanHistory(history: unknown): ChatMessage[] {
  if (!Array.isArray(history)) return [];
  const turns = history
    .filter(
      (message): message is ChatMessage =>
        !!message &&
        (message.role === 'user' || message.role === 'assistant') &&
        typeof message.content === 'string' &&
        message.content.trim().length > 0,
    )
    .slice(-config.maxHistoryMessages)
    .map(({ role, content }) => ({ role, content: content.slice(0, config.maxHistoryChars) }));
  const firstUser = turns.findIndex((message) => message.role === 'user');
  return firstUser === -1 ? [] : turns.slice(firstUser);
}
