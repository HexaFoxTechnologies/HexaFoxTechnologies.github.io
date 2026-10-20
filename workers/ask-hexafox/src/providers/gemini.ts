import { config } from '../config.ts';
import { readSse } from './sse.ts';
import { ProviderError, type ChatMessage, type StreamText } from './types.ts';

interface GeminiChunk {
  candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] } }[];
  error?: { message?: string };
}

const toContents = (messages: ChatMessage[]) =>
  messages
    .filter((message) => message.role !== 'system')
    .map((message) => ({ role: message.role === 'assistant' ? 'model' : 'user', parts: [{ text: message.content }] }));

/** Gemini API (Google AI Studio key), streamed. Thinking is kept minimal: answers are short lookups. */
export const streamGemini: StreamText = async function* (apiKey, { model, messages, signal }) {
  const system = messages.find((message) => message.role === 'system')?.content ?? '';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'x-goog-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: toContents(messages),
      generationConfig: {
        temperature: config.temperature,
        maxOutputTokens: config.maxAnswerTokens,
        thinkingConfig: { thinkingLevel: 'minimal' },
      },
    }),
    signal,
  });
  if (!response.ok || !response.body) throw new ProviderError('gemini', response.status, await response.text());

  for await (const data of readSse(response.body)) {
    const chunk = JSON.parse(data) as GeminiChunk;
    if (chunk.error) throw new ProviderError('gemini', 500, chunk.error.message ?? 'stream error');
    for (const part of chunk.candidates?.[0]?.content?.parts ?? []) {
      if (part.text && !part.thought) yield part.text;
    }
  }
};
