import { config } from './config.ts';

/** Everything the bot says that doesn't come from a model. */
export const messages = {
  busy: `I’m a bit busy right now. Please try again in a little while, or email us at ${config.email}.`,
  slowDown: 'You’re asking faster than I can answer. Please wait a minute and try again.',
  dailyLimit: `That’s all the questions I can answer for you today. For anything else, email us at ${config.email}.`,
  tooLong: `Please keep your question under ${config.maxQuestionChars} characters.`,
  badRequest: 'Sorry, I couldn’t read that question. Please try again.',
  forbidden: 'This assistant only answers on the HexaFox website.',
  botCheck: 'Please refresh the page and try again (the bot check didn’t pass).',
} as const;
