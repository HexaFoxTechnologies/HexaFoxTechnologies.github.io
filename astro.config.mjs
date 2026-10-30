// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * `astro dev` doesn't serve public/evenso/demo/index.html for /evenso/demo/ the way GitHub Pages
 * does, so the phone on /evenso/ would stay empty locally. Point the folder at its page.
 * @returns {import('vite').Plugin}
 */
function evensoDemoInDev() {
  return {
    name: 'evenso-demo-in-dev',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url?.split('?')[0] === '/evenso/demo/') req.url = '/evenso/demo/index.html';
        next();
      });
    },
  };
}

// SITE_URL and BASE_PATH are set by the GitHub Pages workflow (.github/workflows/deploy.yml).
// Locally they fall back to a root-hosted site.
export default defineConfig({
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'ignore',
  // sitemap-index.xml lists every page. Search engines use it, and so does the FoxDesk chat's crawler,
  // which only learns about pages it can find. /thanks/ is a form landing page, not content.
  integrations: [sitemap({ filter: (page) => !page.includes('/thanks') })],
  vite: { plugins: [evensoDemoInDev()] },
});
