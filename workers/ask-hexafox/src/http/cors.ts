/**
 * CORS: only the HexaFox site (and localhost while developing) may call the API from a browser.
 * The Origin header is also required, which turns away the laziest scripts.
 */
const LOCAL_ORIGIN = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

export function isAllowedOrigin(origin: string | null, allowedList: string): origin is string {
  if (!origin) return false;
  if (LOCAL_ORIGIN.test(origin)) return true;
  return allowedList.split(',').some((allowed) => allowed.trim() === origin);
}

export function corsHeaders(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

export function preflight(origin: string): Response {
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}
