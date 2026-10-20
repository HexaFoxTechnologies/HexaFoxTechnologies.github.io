import type { ImageMetadata } from 'astro';
import groupPhoto from '@assets/photos/group-photo.jpg';
import type { GeneratedImageName } from '@lib/images';

/** What sits beside each chapter's text. */
export type ChapterMedia =
  | { kind: 'generated'; name: GeneratedImageName; alt: string }
  | { kind: 'photo'; src: ImageMetadata; alt: string }
  | { kind: 'name-card' };

export interface StoryChapter {
  id: string;
  title: string;
  paragraphs: string[];
  media: ChapterMedia;
}

/** Closing call to action on the story page. */
export const storyCta = {
  title: 'Now we build for you',
  text: 'Six friends, one team, the whole job: design, code, data, cloud and AI.',
  primary: { label: 'Start a project', href: '#contact' },
  secondary: { label: 'See what we do', href: '#services' },
};

export const storyIntro =
  'Six friends from Coimbatore, one shared room, and a group chat that never went quiet.';

export const chapters: StoryChapter[] = [
  {
    id: 'hostel-room',
    title: 'It started in someone else’s room',
    paragraphs: [
      'Six of us studied Computer Science at Sri Ramakrishna Institute of Technology, Coimbatore. We weren’t roommates. We lived in different rooms, but each of us, for our own reasons, kept ending up in the same hostel room.',
      'Somewhere between the late nights and the endless conversations, that room became ours, and the six of us became a team.',
    ],
    media: {
      kind: 'generated',
      name: 'story-hostel-room',
      alt: 'A small hostel room at night with laptops glowing and six phones charging from one extension board.',
    },
  },
  {
    id: 'coimbatore-house',
    title: 'Then we got a house',
    paragraphs: [
      'When we moved out of the hostel, we didn’t split up. We rented a house together in Coimbatore and spent the last two years of college under one roof.',
      'Those two years gave us our best memories, and taught us how the six of us work as one.',
    ],
    media: {
      kind: 'generated',
      name: 'story-coimbatore-house',
      alt: 'A small house in Coimbatore at dusk with six pairs of slippers lined up on the front step.',
    },
  },
  {
    id: 'the-name',
    title: 'A pack of foxes',
    paragraphs: [
      'Our WhatsApp group has always been called Nanga Nari Kootam: “we’re a pack of foxes” in Tamil. When it came to naming the company, the answer was already there.',
      'Hexa for the six of us, like the six sides of a hexagon that fit together with no gaps. Fox for the pack: clever, curious and quick to adapt.',
    ],
    media: { kind: 'name-card' },
  },
  {
    id: 'today',
    title: 'Together again',
    paragraphs: [
      'College ended, but the group didn’t. We’ve each spent the years since building real skills in different corners of tech: AI, frontend, data, cloud, design and consulting.',
      'HexaFox is where we bring those six paths back together.',
    ],
    media: {
      kind: 'photo',
      src: groupPhoto,
      alt: 'The six HexaFox founders taking a selfie together at night.',
    },
  },
];
