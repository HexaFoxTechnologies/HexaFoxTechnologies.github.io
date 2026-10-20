import { config } from '../config.ts';
import type { Env } from '../env.ts';
import { streamGemini } from './gemini.ts';
import { streamGroq } from './groq.ts';
import type { ChatMessage, StreamText } from './types.ts';

const PROVIDERS: Record<string, { stream: StreamText; key: (env: Env) => string | undefined }> = {
  groq: { stream: streamGroq, key: (env) => env.GROQ_API_KEY },
  gemini: { stream: streamGemini, key: (env) => env.GEMINI_API_KEY },
};

export interface Answer {
  provider: string;
  model: string;
  /** The answer's text pieces, starting with the first one already received. */
  text: AsyncGenerator<string>;
}

/**
 * Try each "<provider>:<model>" in MODEL_CHAIN until one starts answering. A provider counts as
 * failed if it errors or sends nothing within the first-token timeout, so rate limits and outages
 * fall through to the next model. Returns null when every model is unavailable.
 */
export async function startAnswer(env: Env, messages: ChatMessage[]): Promise<Answer | null> {
  for (const entry of env.MODEL_CHAIN.split(',')) {
    const [name = '', model = ''] = entry.trim().split(':');
    const provider = PROVIDERS[name];
    const apiKey = provider?.key(env);
    if (!provider || !apiKey || !model) continue;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort('first token timeout'), config.firstTokenTimeoutMs);
    const text = provider.stream(apiKey, { model, messages, signal: controller.signal });

    try {
      const first = await text.next();
      if (first.done) throw new Error('empty answer');
      return { provider: name, model, text: prepend(first.value, text) };
    } catch (error) {
      console.warn(JSON.stringify({ event: 'provider_failed', provider: name, model, error: String(error).slice(0, 300) }));
    } finally {
      clearTimeout(timer);
    }
  }
  return null;
}

async function* prepend(first: string, rest: AsyncGenerator<string>): AsyncGenerator<string> {
  yield first;
  yield* rest;
}
