/**
 * Invisible Cloudflare Turnstile check: one fresh token per question. The script loads when the
 * panel opens, and the next token is fetched ahead of time so visitors don't wait for it.
 */
import { AskError } from './api';

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
const TIMEOUT_MS = 15_000;
/** Tokens expire after 300 s; don't use a prefetched one older than this. */
const MAX_AGE_MS = 240_000;

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

/** Token requests reject with `failMessage` (an AskError) if the check errors or takes too long. */
export function createBotCheck(siteKey: string, container: HTMLElement, failMessage: string) {
  let widgetId: string | undefined;
  let pending: { resolve: (token: string) => void; reject: () => void } | undefined;
  let prefetched: { token: Promise<string>; at: number } | undefined;

  async function fetchToken(): Promise<string> {
    const turnstile = await loadApi().catch(() => Promise.reject(new AskError(failMessage)));
    const result = new Promise<string>((resolve, reject) => {
      const timer = setTimeout(() => reject(new AskError(failMessage)), TIMEOUT_MS);
      pending = {
        resolve: (token) => (clearTimeout(timer), resolve(token)),
        reject: () => (clearTimeout(timer), reject(new AskError(failMessage))),
      };
    });

    if (widgetId === undefined) {
      widgetId = turnstile.render(container, {
        sitekey: siteKey,
        execution: 'execute',
        appearance: 'interaction-only',
        callback: (token: string) => pending?.resolve(token),
        'error-callback': () => pending?.reject(),
      });
    } else {
      turnstile.reset(widgetId);
    }
    turnstile.execute(widgetId);
    return result;
  }

  /** Start fetching the next token in the background. */
  function warm() {
    const token = fetchToken();
    token.catch(() => {});
    prefetched = { token, at: Date.now() };
  }

  return {
    warm,
    /** A token for the next question: the prefetched one if still fresh, otherwise a new one. */
    async token(): Promise<string> {
      const ready = prefetched && Date.now() - prefetched.at < MAX_AGE_MS ? prefetched.token : undefined;
      prefetched = undefined;
      const token = ready ? await ready.catch(fetchToken) : await fetchToken();
      warm();
      return token;
    },
  };
}
