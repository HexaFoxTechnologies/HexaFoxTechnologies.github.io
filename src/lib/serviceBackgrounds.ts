import type { ImageMetadata } from 'astro';

// Optional background pictures for Services tiles: src/assets/images/service-bg-<service id>.png (or .jpg/.webp),
// faded behind each tile's text. They switch on only once every tile has one, so the grid never looks patchy.
// Prompts: docs/image-prompts.md §7.
const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/service-bg-*.{png,jpg,jpeg,webp}', {
  eager: true,
});

export function serviceBackground(id: string): ImageMetadata | undefined {
  return Object.entries(files).find(([path]) => path.split('/').pop()?.replace(/\.\w+$/, '') === `service-bg-${id}`)?.[1].default;
}

/** True when every given service has its picture, i.e. when the grid may show them. */
export function allHaveBackgrounds(ids: string[]): boolean {
  return ids.every((id) => serviceBackground(id));
}
