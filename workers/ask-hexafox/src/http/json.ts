/** Error codes the widget understands. */
export type ErrorCode = 'bad_request' | 'too_long' | 'forbidden' | 'bot_check' | 'slow_down' | 'daily_limit' | 'busy';

export function jsonError(status: number, code: ErrorCode, message: string, headers: HeadersInit = {}): Response {
  return Response.json({ error: { code, message } }, { status, headers });
}
