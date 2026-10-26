/**
 * "Book a call" links ([data-book-call] wrappers around a link to the Cal.com booking page).
 * Nothing from Cal.com loads until the first click; that click loads its embed script and opens
 * the calendar in a popup. New-tab clicks, and visitors without JavaScript, get the plain page.
 */
import { booking } from '@data/booking';

type CalApi = ((...args: unknown[]) => void) & { q: unknown[][]; ns: Record<string, unknown> };

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

/** Cal.com colour variables, filled from our tokens (tokens.css) so the popup matches the site. */
const calColours: Record<string, string> = {
  'cal-brand': '--color-violet-strong',
  'cal-bg': '--color-surface',
  'cal-bg-muted': '--color-bg',
  'cal-bg-subtle': '--color-surface-raised',
  'cal-bg-emphasis': '--color-line-strong',
  'cal-border': '--color-line-strong',
  'cal-border-subtle': '--color-line',
  'cal-border-booker': '--color-line',
  'cal-text': '--color-text',
  'cal-text-emphasis': '--color-text',
  'cal-text-subtle': '--color-text-muted',
  'cal-text-muted': '--color-text-faint',
};

let lastTrigger: HTMLElement | null = null;

/**
 * Once the calendar is ready, move focus to the popup's Close button: Escape then closes it
 * (Cal.com only hears Escape on our page, not inside its calendar frame) and Tab moves on into the
 * calendar. Cal.com builds a new popup on every open, so a closed one is removed, and focus goes
 * back to the link that opened it.
 */
function focusPopup() {
  const box = document.querySelector<HTMLElement>('cal-modal-box');
  if (!box || box.dataset.focused) return;
  box.dataset.focused = '';
  box.addEventListener('close', () => {
    box.remove();
    lastTrigger?.focus();
  });
  box.shadowRoot?.querySelector<HTMLButtonElement>('.close')?.focus();
}

function loadCal(): CalApi {
  if (window.Cal) return window.Cal;

  // Cal.com's loader, shortened: queue calls until embed.js arrives, which then replays them.
  const cal: CalApi = Object.assign(
    (...args: unknown[]) => {
      cal.q.push(args);
    },
    { q: [], ns: {} },
  );
  window.Cal = cal;

  const script = document.createElement('script');
  script.src = `${booking.embedOrigin}/embed/embed.js`;
  script.async = true;
  document.head.append(script);

  const tokens = getComputedStyle(document.documentElement);
  const dark = Object.fromEntries(
    Object.entries(calColours).map(([name, token]) => [name, tokens.getPropertyValue(token).trim()]),
  );

  cal('init', { origin: booking.embedOrigin });
  cal('ui', { theme: 'dark', cssVarsPerTheme: { dark }, layout: 'month_view' });
  cal('on', { action: 'linkReady', callback: focusPopup });
  return cal;
}

document.querySelectorAll<HTMLAnchorElement>('[data-book-call] a').forEach((link) => {
  link.addEventListener('click', (event) => {
    // Ctrl/Cmd/Shift-click and middle-click open the full booking page as usual.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    lastTrigger = link;
    loadCal()('modal', { calLink: booking.calLink, config: { theme: 'dark', layout: 'month_view' } });
  });
});
