/** Line-icon paths (24×24, stroked) for the six skill areas; rendered by SkillIcon.astro. */
export type SkillIconName = 'ai' | 'frontend' | 'cloud' | 'data' | 'design' | 'consulting';

export const skillIconPaths: Record<SkillIconName, string[]> = {
  ai: ['M11 3.5l1.9 4.6 4.6 1.9-4.6 1.9L11 16.5l-1.9-4.6L4.5 10l4.6-1.9z', 'M18 14.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z'],
  frontend: ['M8 7.5L3.5 12 8 16.5', 'M16 7.5l4.5 4.5-4.5 4.5', 'M13.5 5l-3 14'],
  cloud: ['M7.5 18.5h9.5a4 4 0 0 0 .7-7.94A5.75 5.75 0 0 0 6.6 9.6 4.5 4.5 0 0 0 7.5 18.5z'],
  data: [
    'M5 6.5c0 1.66 3.13 3 7 3s7-1.34 7-3-3.13-3-7-3-7 1.34-7 3z',
    'M5 6.5v11c0 1.66 3.13 3 7 3s7-1.34 7-3v-11',
    'M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3',
  ],
  design: ['M4 20l1-4.5L15.5 5a2.1 2.1 0 0 1 3 3L8 18.5z', 'M13.5 7l3 3', 'M4 20h16'],
  consulting: [
    'M3 6.5A2.5 2.5 0 0 1 5.5 4h8A2.5 2.5 0 0 1 16 6.5v4a2.5 2.5 0 0 1-2.5 2.5H9l-3.5 3v-3A2.5 2.5 0 0 1 3 10.5z',
    'M19 9a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2v2.5L16 17h-3',
  ],
};
