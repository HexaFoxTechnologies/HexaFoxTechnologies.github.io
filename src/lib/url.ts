/**
 * Prefix a site-relative path with the deploy base (e.g. "/hexafox-website" on GitHub Pages).
 * withBase('#team') -> '/#team' locally, '/hexafox-website/#team' on a project page.
 */
export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

/** The site's full home URL, e.g. 'https://hexafoxtechnologies.github.io/'. Pass Astro.site. */
export function homeUrl(site: URL | undefined): string {
  return new URL(withBase(), site).href;
}
