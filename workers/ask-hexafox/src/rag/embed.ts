import { config } from '../config.ts';

/** Embed texts with the same Workers AI model used for the corpus, normalised to unit length. */
export async function embed(ai: Ai, texts: string[]): Promise<number[][]> {
  const result = await ai.run(config.embeddingModel, { text: texts });
  if (!('data' in result) || !result.data) throw new Error('Embedding failed');
  return result.data.map(normalise);
}

export function normalise(vector: number[]): number[] {
  const length = Math.hypot(...vector) || 1;
  return vector.map((value) => value / length);
}
