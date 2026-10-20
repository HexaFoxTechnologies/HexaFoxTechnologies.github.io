import corpusJson from '../knowledge/corpus.json';

/** One chunk of the website's copy, with its unit-length embedding. Built by `npm run knowledge`. */
export interface CorpusChunk {
  id: string;
  label: string;
  href: string;
  text: string;
  vector: number[];
}

export interface Corpus {
  model: string;
  generatedAt: string;
  chunks: CorpusChunk[];
}

export const corpus = corpusJson as Corpus;
