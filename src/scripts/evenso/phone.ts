/**
 * The live Evenso app inside the phone on /evenso/ ([data-phone]). Loads the app's demo build into the
 * iframe with the made-up trips, waits until it has drawn, and moves it to a route. The demo is on this
 * site's own origin, so the page can reach into it: a route changes with replaceState plus a popstate
 * event, which the app's router follows without adding entries to the browser's Back history.
 */
import { writeDemoSeed } from './demoSeed';

const READY_TIMEOUT = 15_000;

export interface Phone {
  /** Starts loading the app; later calls do nothing until reset(). */
  load(): void;
  /** Moves the app to a route such as '/trip/goa' now, or as soon as it's ready. */
  show(route: string): void;
  /** Lets the visitor tap around (true) or hands the app back to the scroll tour (false). */
  setHandsOn(on: boolean): void;
  /** Puts the made-up trips back and reopens the app on the current route. */
  reset(): void;
}

export function createPhone(root: HTMLElement): Phone {
  const frame = root.querySelector<HTMLIFrameElement>('iframe')!;
  const screen = root.querySelector<HTMLElement>('[data-phone-screen]')!;
  const demoUrl = root.dataset.demo!;
  let route = '/';
  let state: 'idle' | 'loading' | 'ready' | 'failed' = 'idle';
  let attempt = 0;

  const setState = (next: typeof state) => {
    state = next;
    root.dataset.state = next;
  };

  /** Points the app at `route` the way the browser's own Back button would. */
  const navigate = () => {
    const app = frame.contentWindow;
    if (state !== 'ready' || !app) return;
    const target = demoUrl.replace(/\/$/, '') + route;
    if (app.location.pathname === target) return;
    app.history.replaceState(null, '', target);
    app.dispatchEvent(new PopStateEvent('popstate', { state: null }));
  };

  /**
   * Makes the app's page behave like the phone it's drawn in. Screens such as Add expense focus their
   * first field when they open: during the tour that would pull the visitor's keyboard into the phone,
   * so the field lets go at once. And text fields lose the browser's focus ring, which a phone never
   * draws; the app marks a focused field itself, with a purple border or just the cursor.
   */
  const prepareApp = (doc: Document) => {
    const style = doc.createElement('style');
    style.textContent = 'input:focus, textarea:focus { outline: none; }';
    doc.head.append(style);
    doc.addEventListener('focusin', (event) => {
      if (root.dataset.mode === 'hands-on') return;
      (event.target as HTMLElement).blur();
      frame.blur(); // and give the keyboard back to the page, so arrow keys and Space still scroll it
    });
  };

  /** The app draws nothing until its fonts load, so wait for text in its root before showing it. */
  const waitUntilDrawn = (current: number) => {
    const started = performance.now();
    const check = () => {
      if (current !== attempt) return;
      const doc = frame.contentDocument;
      const text = doc?.getElementById('root')?.innerText.trim();
      if (doc && text) {
        prepareApp(doc);
        setState('ready');
        navigate();
      } else if (performance.now() - started > READY_TIMEOUT) {
        setState('failed');
      } else {
        setTimeout(check, 120);
      }
    };
    check();
  };

  const open = () => {
    attempt += 1;
    const current = attempt;
    setState('loading');
    writeDemoSeed();
    frame.addEventListener('load', () => waitUntilDrawn(current), { once: true });
    frame.src = demoUrl;
  };

  return {
    load() {
      if (state === 'idle') open();
    },
    show(next) {
      route = next;
      navigate();
    },
    setHandsOn(on) {
      root.dataset.mode = on ? 'hands-on' : 'tour';
      screen.inert = !on;
      if (on) {
        frame.focus();
      } else {
        // Out of the app, and onto the button that hands it back (the one pressed is now hidden).
        (frame.contentDocument?.activeElement as HTMLElement | null)?.blur();
        root.querySelector<HTMLElement>('[data-phone-try] a')?.focus();
      }
    },
    reset() {
      open();
    },
  };
}
