/** Fixed limits and tuning. Deploy-time settings (origins, models, daily caps) are vars in wrangler.jsonc. */
export const config = {
  email: 'hexafoxtech@gmail.com',
  embeddingModel: '@cf/baai/bge-base-en-v1.5',
  /** BGE's instruction for short search queries (passages are embedded without it). */
  queryPrefix: 'Represent this sentence for searching relevant passages: ',

  /** Request shape limits. */
  maxBodyBytes: 16_000,
  maxQuestionChars: 500,
  maxHistoryMessages: 6,
  maxHistoryChars: 1_200,

  /** Retrieval: how many chunks go into the prompt, and how close to the best match they must be. */
  topK: 5,
  minScore: 0.45,
  maxScoreGap: 0.15,

  /** Generation. */
  temperature: 0.2,
  maxAnswerTokens: 400,
  /** Give up on a provider that hasn't started answering by then and try the next one. */
  firstTokenTimeoutMs: 9_000,
} as const;
