import { config } from '../config.ts';
import type { CorpusChunk } from './corpus.ts';

export interface Match {
  chunk: CorpusChunk;
  score: number;
}

const dot = (a: number[], b: number[]) => a.reduce((sum, value, i) => sum + value * (b[i] ?? 0), 0);

/**
 * Cosine similarity (vectors are unit length, so a dot product) against every chunk. Each chunk
 * keeps its best score across the query vectors. Returns the top matches that are both above
 * an absolute floor and close to the best match, so weak hits don't pad the prompt.
 */
export function retrieve(chunks: CorpusChunk[], queries: number[][]): Match[] {
  const scored = chunks
    .map((chunk) => ({ chunk, score: Math.max(...queries.map((query) => dot(query, chunk.vector))) }))
    .sort((a, b) => b.score - a.score);

  const best = scored[0]?.score ?? 0;
  return scored
    .filter((match) => match.score >= config.minScore && best - match.score <= config.maxScoreGap)
    .slice(0, config.topK);
}
