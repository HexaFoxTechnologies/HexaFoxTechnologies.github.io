import type { ImageMetadata } from 'astro';
import type { SkillIconName } from '@lib/skillIcons';

/**
 * How the Team section shows the co-founders.
 * 'skills': the split hexagon of six skills, no names or photos (current).
 * 'founders': the original cards with names and photos from team.ts (kept as a backup; also the git tag
 * backup/founders-team-v1). Switching back is this one value.
 */
export const teamMode: 'skills' | 'founders' = 'skills';

export interface SkillCard {
  role: string;
  /** A few words for tight layouts, e.g. inside a hexagon tile. */
  short: string;
  bio: string;
  icon: SkillIconName;
  /** The piece's picture, found automatically (see below); a placeholder shows until it exists. */
  image?: ImageMetadata;
}

// Drop src/assets/images/team-piece-<icon>.png (or .jpg/.webp) in and that piece uses it. Prompts: docs/image-prompts.md §6.
const pieceImages = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/team-piece-*.{png,jpg,jpeg,webp}', {
  eager: true,
});
const imageFor = (icon: SkillIconName) =>
  Object.entries(pieceImages).find(([path]) => path.split('/').pop()?.replace(/\.\w+$/, '') === `team-piece-${icon}`)?.[1]
    .default;

const cards: Omit<SkillCard, 'image'>[] = [
  {
    role: 'AI Engineer',
    short: 'LLMs and intelligent products',
    bio: 'Puts language models into real products, along with the APIs, data, retrieval and checks that make them reliable.',
    icon: 'ai',
  },
  {
    role: 'Frontend Engineer',
    short: 'Modern web experiences',
    bio: 'Builds fast, polished interfaces with React and Next.js.',
    icon: 'frontend',
  },
  {
    role: 'Cloud & Support Engineer',
    short: 'Deployment, monitoring, support',
    bio: 'Keeps systems running: cloud infrastructure, deployment, monitoring and support.',
    icon: 'cloud',
  },
  {
    role: 'Data Engineer',
    short: 'Data pipelines and insights',
    bio: 'Designs databases and data pipelines, and turns raw data into answers.',
    icon: 'data',
  },
  {
    role: 'UX/UI Designer',
    short: 'Simple, friendly experiences',
    bio: 'Designs simple, user-friendly experiences, from research to prototype.',
    icon: 'design',
  },
  {
    role: 'Solutions Consultant',
    short: 'From problems to clear plans',
    bio: 'Turns client problems into clear plans and keeps delivery on track.',
    icon: 'consulting',
  },
];

export const skillCards: SkillCard[] = cards.map((card) => ({ ...card, image: imageFor(card.icon) }));
