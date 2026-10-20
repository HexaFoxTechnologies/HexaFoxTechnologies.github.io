/**
 * Ask HexaFox: answers questions about HexaFox Technologies from the website's own copy.
 *   POST /chat    { question, history?, turnstileToken? } → text/event-stream
 *   GET  /health  → { ok, chunks, generatedAt }
 */
import { handleChat } from './chat/handle-chat.ts';
import type { Env } from './env.ts';
import { corsHeaders, isAllowedOrigin, preflight } from './http/cors.ts';
import { jsonError } from './http/json.ts';
import { messages } from './messages.ts';
import { corpus } from './rag/corpus.ts';

export { DailyQuota } from './guard/daily-quota.ts';

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/health' && request.method === 'GET') {
      return Response.json({ ok: true, chunks: corpus.chunks.length, generatedAt: corpus.generatedAt });
    }

    if (pathname !== '/chat') return new Response('Not found', { status: 404 });

    const origin = request.headers.get('Origin');
    if (!isAllowedOrigin(origin, env.ALLOWED_ORIGINS)) return jsonError(403, 'forbidden', messages.forbidden);
    if (request.method === 'OPTIONS') return preflight(origin);
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: corsHeaders(origin) });

    try {
      return await handleChat(request, env, ctx, corsHeaders(origin));
    } catch (error) {
      // e.g. Workers AI quota used up: fail closed with the friendly "busy" message.
      console.error(JSON.stringify({ event: 'chat_failed', error: String(error).slice(0, 300) }));
      return jsonError(503, 'busy', messages.busy, corsHeaders(origin));
    }
  },
} satisfies ExportedHandler<Env>;
