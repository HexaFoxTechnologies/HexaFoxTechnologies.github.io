/**
 * Ask HexaFox launcher: opens and closes the chat panel. The chat code itself (./chat) is only
 * downloaded the first time the panel opens, so the page stays light for everyone else.
 */
const root = document.querySelector<HTMLElement>('[data-ask]');

if (root) {
  const launcher = root.querySelector<HTMLButtonElement>('[data-ask-launcher]')!;
  const panel = root.querySelector<HTMLElement>('[data-ask-panel]')!;
  let chat: Promise<{ focus: () => void }> | undefined;

  const open = () => {
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    root.dataset.open = '';
    chat ??= import('./chat').then(({ initChat }) => initChat(root));
    chat.then((instance) => instance.focus());
  };

  const close = () => {
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    delete root.dataset.open;
    launcher.focus();
  };

  launcher.addEventListener('click', () => (panel.hidden ? open() : close()));
  root.querySelector('[data-ask-close]')?.addEventListener('click', close);
  panel.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
  root.addEventListener('ask:close', close);
}
