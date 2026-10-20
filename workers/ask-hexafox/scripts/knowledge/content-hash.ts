/**
 * Fingerprint of what the corpus was built from: the chunks' ids, labels, links and text, and the
 * embedding model. Embeddings aren't part of it, so it can be checked without Cloudflare access.
 */
import { createHash } from 'node:crypto';
import type { Chunk } from './chunks.ts';

export function contentHash(chunks: Chunk[], model: string): string {
  const content = chunks.map(({ id, label, href, text }) => ({ id, label, href, text }));
  return createHash('sha256').update(JSON.stringify({ model, content })).digest('hex');
}
