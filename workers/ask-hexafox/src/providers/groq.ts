import { config } from '../config.ts';
import { readSse } from './sse.ts';
import { ProviderError, type StreamText } from './types.ts';

interface GroqChunk {
  choices?: { delta?: { content?: string | null } }[];
  error?: { message?: string };
}

/** Keep reasoning models quick, and their reasoning out of the answer. */
function reasoningOptions(model: string): Record<string, unknown> {
  if (model.startsWith('openai/gpt-oss')) return { reasoning_effort: 'low', include_reasoning: false };
  if (model.startsWith('qwen/')) return { reasoning_effort: 'none' };
  return {};
}

/** Groq's OpenAI-compatible chat completions, streamed. */
export const streamGroq: StreamText = async function* (apiKey, { model, messages, signal }) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
      temperature: config.temperature,
      max_completion_tokens: config.maxAnswerTokens,
      ...reasoningOptions(model),
    }),
    signal,
  });
  if (!response.ok || !response.body) throw new ProviderError('groq', response.status, await response.text());

  for await (const data of readSse(response.body)) {
    if (data === '[DONE]') return;
    const chunk = JSON.parse(data) as GroqChunk;
    if (chunk.error) throw new ProviderError('groq', 500, chunk.error.message ?? 'stream error');
    const text = chunk.choices?.[0]?.delta?.content;
    if (text) yield text;
  }
};
