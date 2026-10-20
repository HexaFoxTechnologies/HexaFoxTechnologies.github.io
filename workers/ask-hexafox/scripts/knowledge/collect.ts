/** Every chunk the Worker knows about, in order: the site's copy plus the assistant's own facts. */
import { assistantChunk } from './assistant.ts';
import { buildChunks, type Chunk } from './chunks.ts';
import { loadSiteData } from './load-site-data.ts';
import { topics } from './topics.ts';

export async function collectChunks(): Promise<Chunk[]> {
  return [...buildChunks(await loadSiteData()), assistantChunk].map((chunk) =>
    topics[chunk.id] ? { ...chunk, text: `${topics[chunk.id]}\n${chunk.text}` } : chunk,
  );
}
