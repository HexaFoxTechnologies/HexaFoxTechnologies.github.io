import type { ImageMetadata } from 'astro';

// Optional background pictures for Services tiles: drop src/assets/images/service-bg-<service id>.png (or .jpg/.webp)
// in and that tile uses it, faded behind its text. Prompts: docs/image-prompts.md §7.
const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/service-bg-*.{png,jpg,jpeg,webp}', {
  eager: true,
});

export function serviceBackground(id: string): ImageMetadata | undefined {
  return Object.entries(files).find(([path]) => path.split('/').pop()?.replace(/\.\w+$/, '') === `service-bg-${id}`)?.[1].default;
}
