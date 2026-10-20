// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH are set by the GitHub Pages workflow (.github/workflows/deploy.yml).
// Locally they fall back to a root-hosted site.
export default defineConfig({
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'ignore',
  // sitemap-index.xml lists every page. Search engines use it, and so does the FoxDesk chat's crawler,
  // which only learns about pages it can find. /thanks/ is a form landing page, not content.
  integrations: [sitemap({ filter: (page) => !page.includes('/thanks') })],
});
