import { citedSources, formatAnswer } from './format';
import type { Source } from './types';

/** DOM for chat messages in the log. Styles live in AskLog.astro. */
export function appendUserMessage(log: HTMLElement, text: string): void {
  const message = document.createElement('div');
  message.className = 'ask-msg ask-msg--user';
  message.textContent = text;
  log.append(message);
}

export function appendAssistantMessage(log: HTMLElement) {
  const message = document.createElement('div');
  message.className = 'ask-msg ask-msg--assistant';
  message.setAttribute('aria-busy', 'true');
  message.innerHTML =
    '<span class="ask-typing"><span></span><span></span><span></span><span class="sr-only">Thinking…</span></span>';
  log.append(message);

  return {
    /** Re-render the answer so far (called as pieces stream in). */
    update(text: string, sources: Source[]) {
      message.innerHTML = `<div class="ask-msg__body">${formatAnswer(text, sources)}</div>`;
    },
    /** Final render, with chips linking to the cited parts of the site. */
    finish(text: string, sources: Source[], base: string) {
      this.update(text, sources);
      const cited = citedSources(text, sources);
      if (cited.length) message.append(sourceChips(cited, base));
      message.removeAttribute('aria-busy');
    },
    fail(errorText: string) {
      message.classList.add('ask-msg--error');
      message.textContent = errorText;
      message.removeAttribute('aria-busy');
    },
  };
}

function sourceChips(sources: Source[], base: string): HTMLElement {
  const list = document.createElement('ul');
  list.className = 'ask-sources';
  list.setAttribute('aria-label', 'Sources');
  for (const source of sources) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.className = 'ask-source';
    link.href = `${base}${source.href}`;
    link.dataset.askSource = '';
    link.innerHTML = `<span class="ask-cite" aria-hidden="true">${source.n}</span>`;
    link.append(source.label);
    item.append(link);
    list.append(item);
  }
  return list;
}
