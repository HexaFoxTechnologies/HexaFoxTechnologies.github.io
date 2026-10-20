import type { Chunk } from './chunks.ts';

/** Facts about the chatbot itself, so "how do you work?" has a grounded answer too. */
export const assistantChunk: Chunk = {
  id: 'assistant',
  label: 'About this assistant',
  href: '#main',
  text: [
    'Ask HexaFox is the AI assistant on the HexaFox website, built by HexaFox as a working example of its AI assistants and Reliable AI services.',
    'It answers only from the website’s own content: each question is matched to the most relevant parts of the site (retrieval), and a language model writes the answer from those parts with numbered citations.',
    'It runs on a Cloudflare Worker, uses Llama models served by Groq with Google Gemini as a backup, and says so when the website doesn’t cover a question.',
    'Conversations are not stored by HexaFox. Please don’t share personal information in the chat.',
  ].join('\n'),
};
