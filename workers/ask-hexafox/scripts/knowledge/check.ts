/**
 * npm run knowledge:check: fail if src/knowledge/corpus.json no longer matches the site's copy.
 * Rebuilds the chunks (no embedding, so no Cloudflare access needed) and compares fingerprints.
 */
import { readFile } from 'node:fs/promises';
import { config } from '../../src/config.ts';
import type { Corpus } from '../../src/rag/corpus.ts';
import { collectChunks } from './collect.ts';
import { contentHash } from './content-hash.ts';
import { CORPUS_FILE } from './paths.ts';

const corpus = JSON.parse(await readFile(CORPUS_FILE, 'utf8')) as Corpus;
const expected = contentHash(await collectChunks(), config.embeddingModel);

if (corpus.contentHash !== expected) {
  console.error(
    [
      'Ask HexaFox knowledge is out of date: src/data (or the chunking scripts) changed since',
      'workers/ask-hexafox/src/knowledge/corpus.json was built.',
      'Fix: cd workers/ask-hexafox && npm run knowledge, then commit src/knowledge/corpus.json.',
    ].join('\n'),
  );
  process.exit(1);
}
console.log(`Ask HexaFox knowledge is up to date (${corpus.chunks.length} chunks).`);
