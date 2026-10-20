export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/** Tokens a provider reports for one answer (reasoning/thinking tokens count as output). */
export interface Usage {
  input: number;
  output: number;
}

export interface GenerateOptions {
  model: string;
  messages: ChatMessage[];
  signal: AbortSignal;
  onUsage: (usage: Usage) => void;
}

/** A model provider streams the answer as text pieces. */
export type StreamText = (apiKey: string, options: GenerateOptions) => AsyncGenerator<string>;

/** Thrown when a provider can't answer (rate-limited, quota gone, down, misconfigured). */
export class ProviderError extends Error {
  constructor(
    readonly provider: string,
    readonly status: number,
    detail: string,
  ) {
    super(`${provider} failed (${status}): ${detail}`);
  }
}
