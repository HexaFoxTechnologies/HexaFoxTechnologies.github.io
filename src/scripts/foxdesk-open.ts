/**
 * "Open the chat" buttons ([data-foxdesk-open] wrappers). The FoxDesk widget exposes
 * window.FoxDesk once it has started; until then (or if it never loads) the buttons stay hidden.
 */
declare global {
  interface Window {
    FoxDesk?: { open: () => void; close: () => void };
  }
}

function enable() {
  const foxdesk = window.FoxDesk;
  if (!foxdesk) return;
  document.querySelectorAll<HTMLElement>('[data-foxdesk-open]').forEach((wrapper) => {
    wrapper.querySelector('button')?.addEventListener('click', () => foxdesk.open());
    wrapper.hidden = false;
  });
}

if (document.readyState === 'complete') enable();
else window.addEventListener('load', enable, { once: true });

export {};
