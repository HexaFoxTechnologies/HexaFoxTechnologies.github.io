/**
 * Load the website's copy from src/data/*.ts exactly as Astro sees it, using the site's own Vite
 * (handles TypeScript, the @data/@assets path aliases, image imports and import.meta.env).
 */
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

export const siteRoot = fileURLToPath(new URL('../../../../', import.meta.url));

const DATA_MODULES = ['site', 'services', 'story', 'process', 'team', 'reasons', 'contact'] as const;

export type SiteData = Record<(typeof DATA_MODULES)[number], Record<string, unknown>>;

/** The slice of Vite's API used here (Vite is the site's dependency, not this package's). */
interface Vite {
  createServer(config: Record<string, unknown>): Promise<{
    ssrLoadModule(url: string): Promise<Record<string, unknown>>;
    close(): Promise<void>;
  }>;
}

export async function loadSiteData(): Promise<SiteData> {
  const require = createRequire(`${siteRoot}package.json`);
  const vite = (await import(require.resolve('vite'))) as Vite;

  const server = await vite.createServer({
    root: siteRoot,
    configFile: false,
    logLevel: 'error',
    server: { middlewareMode: true, hmr: false },
    appType: 'custom',
    resolve: {
      alias: {
        '@data': `${siteRoot}src/data`,
        '@assets': `${siteRoot}src/assets`,
        '@lib': `${siteRoot}src/lib`,
      },
    },
  });

  try {
    const entries = await Promise.all(
      DATA_MODULES.map(async (name) => [name, await server.ssrLoadModule(`/src/data/${name}.ts`)] as const),
    );
    return Object.fromEntries(entries) as SiteData;
  } finally {
    await server.close();
  }
}
