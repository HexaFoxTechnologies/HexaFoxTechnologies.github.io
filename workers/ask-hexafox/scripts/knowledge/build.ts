/**
 * npm run knowledge: rebuild src/knowledge/corpus.json from the website's copy (src/data/*.ts).
 * Run it after changing site text and commit the file; merging to main deploys it.
 */
import { writeFile } from 'node:fs/promises';
import { config } from '../../src/config.ts';
import type { Corpus } from '../../src/rag/corpus.ts';
import { collectChunks } from './collect.ts';
import { contentHash } from './content-hash.ts';
import { embedChunks } from './embed-chunks.ts';
import { CORPUS_FILE } from './paths.ts';

const chunks = await collectChunks();
console.log(`Embedding ${chunks.length} chunks with ${config.embeddingModel}…`);
const vectors = await embedChunks(chunks);

const corpus: Corpus = {
  model: config.embeddingModel,
  contentHash: contentHash(chunks, config.embeddingModel),
  generatedAt: new Date().toISOString(),
  chunks: chunks.map((chunk, i) => ({ ...chunk, vector: vectors[i] ?? [] })),
};

await writeFile(CORPUS_FILE, `${JSON.stringify(corpus)}\n`);
console.log(`Wrote ${corpus.chunks.length} chunks to src/knowledge/corpus.json`);
