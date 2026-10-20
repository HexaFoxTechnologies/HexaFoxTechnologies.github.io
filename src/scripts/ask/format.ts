import type { Source } from './types';

/**
 * Render a model answer as safe HTML: paragraphs, bullet lists, **bold**, and citation markers
 * like [2] as small badges. Everything else is escaped. Markers for unknown sources are dropped.
 */
const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);

const LIST_ITEM = /^\s*(?:[-*•]|\d+[.)])\s+/;

function inline(text: string, sources: Map<number, Source>): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\s*\[(\d+)\]/g, (_, n: string) => {
      const source = sources.get(Number(n));
      return source ? `<span class="ask-cite" title="${escapeHtml(source.label)}">${n}</span>` : '';
    });
}

export function formatAnswer(text: string, sources: Source[]): string {
  const known = new Map(sources.map((source) => [source.n, source]));
  // While streaming, hide a citation marker that has only half arrived ("[" or "[1").
  const lines = text.replace(/\[\d*$/, '').trim().split('\n');

  let html = '';
  let list: string[] = [];
  let paragraph: string[] = [];
  const flush = () => {
    if (paragraph.length) html += `<p>${paragraph.join('<br>')}</p>`;
    if (list.length) html += `<ul>${list.map((item) => `<li>${item}</li>`).join('')}</ul>`;
    paragraph = [];
    list = [];
  };

  for (const line of lines) {
    if (!line.trim()) {
      flush();
    } else if (LIST_ITEM.test(line)) {
      if (paragraph.length) flush();
      list.push(inline(line.replace(LIST_ITEM, ''), known));
    } else {
      if (list.length) flush();
      paragraph.push(inline(line, known));
    }
  }
  flush();
  return html;
}

/** The sources an answer actually cites, in number order. */
export function citedSources(text: string, sources: Source[]): Source[] {
  const cited = new Set([...text.matchAll(/\[(\d+)\]/g)].map((match) => Number(match[1])));
  return sources.filter((source) => cited.has(source.n));
}

/** Answer text as it should be remembered for follow-up questions (no stale citation numbers). */
export const plainAnswer = (text: string) => text.replace(/\s*\[\d+\]/g, '').trim();
