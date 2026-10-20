/** Shapes shared with the Worker (workers/ask-hexafox/src/chat/events.ts). */
export interface Source {
  n: number;
  label: string;
  href: string;
}

export interface Turn {
  role: 'user' | 'assistant';
  content: string;
}

export interface AnswerHandlers {
  onSources: (sources: Source[]) => void;
  onText: (text: string) => void;
}
