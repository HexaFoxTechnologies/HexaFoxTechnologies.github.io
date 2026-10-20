import { config } from '../config.ts';
import type { Env } from '../env.ts';
import { clientKey } from '../guard/client-ip.ts';
import { checkLimits } from '../guard/rate-limit.ts';
import { passesBotCheck } from '../guard/turnstile.ts';
import { jsonError } from '../http/json.ts';
import { messages } from '../messages.ts';
import { startAnswer } from '../providers/chain.ts';
import { corpus } from '../rag/corpus.ts';
import { embed } from '../rag/embed.ts';
import { buildMessages } from '../rag/prompt.ts';
import { retrieve } from '../rag/retrieve.ts';
import { encodeEvent, type Source } from './events.ts';
import { normaliseCitations } from './normalise.ts';
import { parseChatRequest } from './validate.ts';

/** POST /chat: validate → guard → retrieve → answer (streamed with citations). */
export async function handleChat(request: Request, env: Env, ctx: ExecutionContext, cors: Record<string, string>): Promise<Response> {
  const started = Date.now();

  const parsed = await parseChatRequest(request);
  if (!parsed.ok) {
    return parsed.reason === 'too_long'
      ? jsonError(400, 'too_long', messages.tooLong, cors)
      : jsonError(400, 'bad_request', messages.badRequest, cors);
  }
  const { question, history, turnstileToken } = parsed.request;

  const ip = request.headers.get('CF-Connecting-IP');
  if (!(await passesBotCheck(env.TURNSTILE_SECRET_KEY, turnstileToken, ip))) {
    return jsonError(403, 'bot_check', messages.botCheck, cors);
  }

  // Embed the question (alone, and with the previous question for follow-ups) while the quota is checked.
  const previous = history.findLast((message) => message.role === 'user')?.content;
  const queries = (previous ? [question, `${previous}\n${question}`] : [question]).map((query) => config.queryPrefix + query);
  const [limit, vectors] = await Promise.all([clientKey(request).then((key) => checkLimits(env, key)), embed(env.AI, queries)]);
  if (limit === 'slow_down') return jsonError(429, 'slow_down', messages.slowDown, cors);
  if (limit === 'daily_limit') return jsonError(429, 'daily_limit', messages.dailyLimit, cors);

  const matches = retrieve(corpus.chunks, vectors);
  const answer = await startAnswer(env, buildMessages(matches, history, question));
  if (!answer) {
    console.warn(JSON.stringify({ event: 'all_providers_failed' }));
    return jsonError(503, 'busy', messages.busy, cors);
  }

  const sources: Source[] = matches.map(({ chunk }, i) => ({ n: i + 1, label: chunk.label, href: chunk.href }));
  const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
  const writer = writable.getWriter();

  const pump = async () => {
    try {
      await writer.write(encodeEvent({ type: 'sources', sources }));
      for await (const text of answer.text) await writer.write(encodeEvent({ type: 'delta', text: normaliseCitations(text) }));
      await writer.write(encodeEvent({ type: 'done', provider: answer.provider, model: answer.model }));
    } catch {
      await writer.write(encodeEvent({ type: 'error', code: 'busy', message: messages.busy })).catch(() => {});
    } finally {
      await writer.close().catch(() => {});
      console.log(
        JSON.stringify({
          event: 'answered',
          provider: answer.provider,
          model: answer.model,
          sources: matches.map(({ chunk, score }) => `${chunk.id}:${score.toFixed(2)}`),
          ms: Date.now() - started,
        }),
      );
    }
  };
  ctx.waitUntil(pump());

  return new Response(readable, {
    headers: { ...cors, 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
