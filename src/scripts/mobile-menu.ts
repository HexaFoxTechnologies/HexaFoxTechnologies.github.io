/** Close the <details> mobile menu after choosing a link, pressing Escape or tapping outside. */
const menu = document.querySelector<HTMLDetailsElement>('[data-mobile-menu]');

if (menu) {
  const close = () => menu.removeAttribute('open');

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });

  document.addEventListener('click', (event) => {
    if (menu.open && !menu.contains(event.target as Node)) close();
  });
}
