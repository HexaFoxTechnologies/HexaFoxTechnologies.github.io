/** Invisible Cloudflare Turnstile check: one fresh token per question. Loaded only when needed. */
interface TurnstileApi {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  execute: (widgetId: string) => void;
  reset: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let api: Promise<TurnstileApi> | undefined;

function loadApi(): Promise<TurnstileApi> {
  api ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('Turnstile missing')));
    script.onerror = () => reject(new Error('Turnstile failed to load'));
    document.head.append(script);
  });
  return api;
}

export function createBotCheck(siteKey: string, container: HTMLElement) {
  let widgetId: string | undefined;
  let pending: { resolve: (token: string) => void; reject: (error: Error) => void } | undefined;

  return {
    async token(): Promise<string> {
      const turnstile = await loadApi();
      const result = new Promise<string>((resolve, reject) => (pending = { resolve, reject }));

      if (widgetId === undefined) {
        widgetId = turnstile.render(container, {
          sitekey: siteKey,
          execution: 'execute',
          appearance: 'interaction-only',
          callback: (token: string) => pending?.resolve(token),
          'error-callback': () => pending?.reject(new Error('Bot check failed')),
        });
      } else {
        turnstile.reset(widgetId);
      }
      turnstile.execute(widgetId);
      return result;
    },
  };
}
