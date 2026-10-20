/**
 * npm run knowledge: rebuild src/knowledge/corpus.json from the website's copy (src/data/*.ts).
 * Run it after changing site text, then redeploy the Worker.
 */
import { writeFile } from 'node:fs/promises';
import { config } from '../../src/config.ts';
import type { Corpus } from '../../src/rag/corpus.ts';
import { assistantChunk } from './assistant.ts';
import { buildChunks } from './chunks.ts';
import { embedChunks } from './embed-chunks.ts';
import { loadSiteData } from './load-site-data.ts';
import { topics } from './topics.ts';

const OUTPUT = new URL('../../src/knowledge/corpus.json', import.meta.url);

const chunks = [...buildChunks(await loadSiteData()), assistantChunk].map((chunk) =>
  topics[chunk.id] ? { ...chunk, text: `${topics[chunk.id]}\n${chunk.text}` } : chunk,
);
console.log(`Embedding ${chunks.length} chunks with ${config.embeddingModel}…`);
const vectors = await embedChunks(chunks);

const corpus: Corpus = {
  model: config.embeddingModel,
  generatedAt: new Date().toISOString(),
  chunks: chunks.map((chunk, i) => ({ ...chunk, vector: vectors[i] ?? [] })),
};

await writeFile(OUTPUT, `${JSON.stringify(corpus)}\n`);
console.log(`Wrote ${corpus.chunks.length} chunks to src/knowledge/corpus.json`);
