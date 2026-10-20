/**
 * The answer reaches the widget as server-sent events:
 * `sources` (numbered citations), then `delta` text pieces, then `done` or `error`.
 */
export interface Source {
  n: number;
  label: string;
  href: string;
}

export type ChatEvent =
  | { type: 'sources'; sources: Source[] }
  | { type: 'delta'; text: string }
  | { type: 'done'; provider: string; model: string }
  | { type: 'error'; code: 'busy'; message: string };

const encoder = new TextEncoder();

export function encodeEvent({ type, ...data }: ChatEvent): Uint8Array {
  return encoder.encode(`event: ${type}\ndata: ${JSON.stringify(data)}\n\n`);
}
