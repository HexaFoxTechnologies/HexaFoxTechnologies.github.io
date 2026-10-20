import { site } from './site';

/** "Ask HexaFox" chat widget: copy and settings. The answers come from workers/ask-hexafox. */
export const ask = {
  /** Worker endpoint, e.g. https://ask-hexafox.<subdomain>.workers.dev. Without it the widget isn't rendered. */
  apiUrl: (import.meta.env.PUBLIC_ASK_API_URL ?? '').replace(/\/$/, ''),
  /** Optional Cloudflare Turnstile site key (invisible bot check). */
  turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? '',
  title: 'Ask HexaFox',
  subtitle: 'AI answers from our website',
  greeting: 'Hi! I’m the HexaFox assistant. Ask me about what we do, who we are or how we work.',
  starters: ['What AI services do you offer?', 'Who are the founders?', 'Why the name HexaFox?', 'Where are you based?'],
  placeholder: 'Ask about HexaFox…',
  privacy: 'Don’t share personal information. AI answers might not always be accurate.',
  botCheckFailed: 'I couldn’t confirm you’re not a bot. Please refresh the page and try again.',
  /** Shown when the Worker can't be reached or gives no usable answer. */
  fallback: `Sorry, I couldn’t answer just now. Please try again, or email us at ${site.email}.`,
  /** Must match maxQuestionChars in the Worker's config. */
  maxQuestionChars: 500,
} as const;
