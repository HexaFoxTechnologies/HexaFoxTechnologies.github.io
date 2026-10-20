/**
 * Ask HexaFox chat: sends questions to the Worker and streams answers into the log.
 * Loaded on demand by ./launcher the first time the panel opens.
 */
import { AskError, askQuestion } from './api';
import { plainAnswer } from './format';
import { appendAssistantMessage, appendUserMessage } from './messages';
import { createBotCheck } from './turnstile';
import type { Source, Turn } from './types';

const HISTORY_TURNS = 6;
const phone = window.matchMedia('(max-width: 560px)');

export function initChat(root: HTMLElement) {
  const { askApi = '', askBase = '/', askTurnstile = '', askFallback = '', askBotcheck = askFallback } = root.dataset;
  const log = root.querySelector<HTMLElement>('[data-ask-log]')!;
  const form = root.querySelector<HTMLFormElement>('[data-ask-form]')!;
  const input = form.querySelector<HTMLTextAreaElement>('textarea')!;
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const counter = form.querySelector<HTMLElement>('[data-ask-counter]')!;
  const starters = root.querySelector<HTMLElement>('[data-ask-starters]');
  const botCheck = askTurnstile ? createBotCheck(askTurnstile, root.querySelector<HTMLElement>('[data-ask-turnstile]')!, askBotcheck) : null;

  botCheck?.warm();

  const history: Turn[] = [];
  let busy = false;

  const scrollToEnd = () => log.scrollTo({ top: log.scrollHeight });

  const setBusy = (value: boolean) => {
    busy = value;
    submit.disabled = value;
    form.dataset.busy = String(value);
  };

  const resizeInput = () => {
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 140)}px`;
    const left = input.maxLength - input.value.length;
    counter.textContent = left < 80 ? `${left} characters left` : '';
  };

  async function send(question: string) {
    question = question.trim();
    if (!question || busy) return;

    setBusy(true);
    starters?.remove();
    appendUserMessage(log, question);
    const reply = appendAssistantMessage(log);
    scrollToEnd();

    let sources: Source[] = [];
    let text = '';
    let frame = 0;
    try {
      const turnstileToken = botCheck ? await botCheck.token() : undefined;
      await askQuestion(
        askApi,
        { question, history: history.slice(-HISTORY_TURNS), turnstileToken },
        {
          onSources: (received) => (sources = received),
          onText: (piece) => {
            text += piece;
            frame ||= requestAnimationFrame(() => {
              frame = 0;
              reply.update(text, sources);
              scrollToEnd();
            });
          },
        },
        askFallback,
      );
      cancelAnimationFrame(frame);
      if (!text.trim()) throw new AskError(askFallback);
      reply.finish(text, sources, askBase);
      history.push({ role: 'user', content: question }, { role: 'assistant', content: plainAnswer(text) });
    } catch (error) {
      cancelAnimationFrame(frame);
      reply.fail(error instanceof AskError ? error.message : askFallback);
    } finally {
      scrollToEnd();
      setBusy(false);
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const question = input.value;
    input.value = '';
    resizeInput();
    send(question);
  });

  // Enter sends; Shift+Enter adds a new line.
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      form.requestSubmit();
    }
  });
  input.addEventListener('input', resizeInput);

  starters?.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-ask-starter]');
    if (button) send(button.textContent ?? '');
  });

  // On a phone the panel covers the page, so close it when a source link is followed.
  log.addEventListener('click', (event) => {
    if (phone.matches && (event.target as HTMLElement).closest('[data-ask-source]')) {
      root.dispatchEvent(new Event('ask:close'));
    }
  });

  // Move focus into the panel; on a phone, avoid popping the keyboard over the starter questions.
  const focus = () => (phone.matches ? root.querySelector<HTMLElement>('[data-ask-close]') : input)?.focus();
  return { focus };
}
