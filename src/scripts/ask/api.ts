import { readEvents } from './sse';
import type { AnswerHandlers, Source, Turn } from './types';

/** An error whose message is safe and friendly to show in the chat. */
export class AskError extends Error {}

interface AskRequest {
  question: string;
  history: Turn[];
  turnstileToken?: string;
}

/** POST a question to the Worker and stream the answer through the handlers. */
export async function askQuestion(apiUrl: string, request: AskRequest, handlers: AnswerHandlers, fallback: string): Promise<void> {
  let response: Response;
  try {
    response = await fetch(`${apiUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
  } catch {
    throw new AskError(fallback);
  }

  if (!response.ok || !response.body) {
    const body = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
    throw new AskError(body?.error?.message ?? fallback);
  }

  for await (const { event, data } of readEvents(response.body)) {
    if (event === 'sources') handlers.onSources((data as { sources: Source[] }).sources);
    else if (event === 'delta') handlers.onText((data as { text: string }).text);
    else if (event === 'error') throw new AskError((data as { message?: string }).message ?? fallback);
    else if (event === 'done') return;
  }
}
