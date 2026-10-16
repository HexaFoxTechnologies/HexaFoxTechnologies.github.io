import type { ImageMetadata } from 'astro';

/**
 * Optional AI-generated artwork in src/assets/images/.
 * A missing file returns undefined, and components show the hexagon fallback instead.
 */
export type GeneratedImageName =
  | 'hero-fox'
  | 'story-hostel-room'
  | 'story-coimbatore-house'
  | 'service-tech'
  | 'service-ai'
  | 'not-found-fox';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);

const byName = new Map(
  Object.entries(files).map(([path, mod]) => [
    path.split('/').pop()!.replace(/\.[^.]+$/, ''),
    mod.default,
  ]),
);

export function getGeneratedImage(name: GeneratedImageName): ImageMetadata | undefined {
  return byName.get(name);
}
