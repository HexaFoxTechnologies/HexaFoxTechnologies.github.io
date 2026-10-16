/** Fade elements marked [data-reveal] in as they scroll into view (styles in motion.css). */
const items = document.querySelectorAll<HTMLElement>('[data-reveal]');

if (!('IntersectionObserver' in window)) {
  items.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -40px 0px', threshold: 0.05 },
  );
  items.forEach((el) => observer.observe(el));
}
