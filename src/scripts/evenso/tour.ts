/**
 * The scroll tour on /evenso/. Whichever block ([data-screen]) has reached the reading line decides
 * the screen the phone shows. "Try it yourself" hands the phone to the visitor on wide screens; on
 * small ones it opens the demo full screen, where it simply is the app.
 */
import { writeDemoSeed } from './demoSeed';
import { createPhone } from './phone';

const root = document.querySelector<HTMLElement>('[data-phone]');
const blocks = [...document.querySelectorAll<HTMLElement>('[data-screen]')];

if (root && blocks.length) {
  const phone = createPhone(root);
  const sideBySide = matchMedia('(min-width: 900px)');
  let handsOn = false;
  let active: HTMLElement | undefined;
  let queued = false;

  /**
   * Side by side, the reading line is the middle of the window. Stacked, the phone sits at the top,
   * so the line is the middle of the space under it.
   */
  const readingLine = () => {
    if (sideBySide.matches) return innerHeight / 2;
    const phoneBottom = root.getBoundingClientRect().bottom;
    return phoneBottom + (innerHeight - phoneBottom) / 2;
  };

  const update = () => {
    queued = false;
    const line = readingLine();
    const current = blocks.filter((block) => block.getBoundingClientRect().top <= line).pop() ?? blocks[0];
    if (current === active) return;
    active?.removeAttribute('data-active');
    current.setAttribute('data-active', '');
    active = current;
    if (!handsOn) phone.show(current.dataset.screen!);
  };

  const queueUpdate = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  const setHandsOn = (on: boolean) => {
    handsOn = on;
    phone.load();
    phone.setHandsOn(on);
    if (!on && active) phone.show(active.dataset.screen!);
  };

  update();
  addEventListener('scroll', queueUpdate, { passive: true });
  addEventListener('resize', queueUpdate);

  // The app is about 1.2 MB, so it loads once the page itself is ready, or at the first scroll or tap.
  // With Data Saver on, it waits for the visitor to ask.
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  if (saveData) {
    root.setAttribute('data-ask', '');
  } else {
    const start = () => phone.load();
    const whenIdle = () => ('requestIdleCallback' in window ? requestIdleCallback(start, { timeout: 2000 }) : setTimeout(start, 800));
    if (document.readyState === 'complete') whenIdle();
    else addEventListener('load', whenIdle, { once: true });
    for (const event of ['scroll', 'pointerdown', 'keydown']) addEventListener(event, start, { once: true, passive: true });
  }

  root.querySelector('[data-phone-load]')?.addEventListener('click', () => phone.load());
  root.querySelector('.js-phone-back')?.addEventListener('click', () => setHandsOn(false));
  root.querySelector('.js-phone-reset')?.addEventListener('click', () => phone.reset());

  // Every "Try it yourself" link on the page, in the hero and under the phone.
  document.addEventListener('click', (event) => {
    const link = (event.target as Element).closest<HTMLAnchorElement>('[data-phone-try] a');
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    if (!sideBySide.matches) {
      writeDemoSeed(); // the full-screen app opens on the same made-up trips
      return;
    }
    event.preventDefault();
    root.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    setHandsOn(true);
  });
}
