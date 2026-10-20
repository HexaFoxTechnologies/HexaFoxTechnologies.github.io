/**
 * Turn the website's copy into retrieval chunks: one per section or sub-section, each with a
 * human-readable source label (shown as a citation chip) and the page anchor it came from.
 */
import type { SiteData } from './load-site-data.ts';

export interface Chunk {
  id: string;
  /** Citation label, e.g. "Services · AI solutions". */
  label: string;
  /** In-page anchor on the website, e.g. "#services". */
  href: string;
  text: string;
}

interface Titled {
  title: string;
  text: string;
}

interface Site {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  email: string;
  location: string;
  responseTime: string;
  groupName: string;
  college: string;
}

interface ServiceGroup {
  id: string;
  title: string;
  intro: string;
  items: Titled[];
}

interface Chapter {
  id: string;
  title: string;
  paragraphs: string[];
}

interface Member {
  name: string;
  role: string;
  bio: string;
}

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const bullets = (items: Titled[]) => items.map((item) => `- ${item.title}: ${item.text}`).join('\n');

export function buildChunks(data: SiteData): Chunk[] {
  const site = data.site.site as Site;
  const groups = data.services.serviceGroups as ServiceGroup[];
  const chapters = data.story.chapters as Chapter[];
  const steps = data.process.processSteps as Titled[];
  const members = data.team.team as Member[];
  const reasons = data.reasons.reasons as Titled[];
  const serviceOptions = data.contact.serviceOptions as string[];

  const about: Chunk = {
    id: 'about',
    label: 'About HexaFox',
    href: '#main',
    text: [
      `${site.legalName} (${site.name}). Tagline: "${site.tagline}"`,
      site.description,
      `Based in ${site.location}. Founded by six friends who studied Computer Science together at ${site.college}, Coimbatore.`,
      `Email: ${site.email}.`,
    ].join('\n'),
  };

  const contact: Chunk = {
    id: 'contact',
    label: 'Contact',
    href: '#contact',
    text: [
      `How to contact ${site.legalName} or start a project: use the contact form on the website or email ${site.email}.`,
      `We reply within ${site.responseTime}. Location: ${site.location}.`,
      `The form asks what you need: ${serviceOptions.join(', ')}.`,
    ].join('\n'),
  };

  const servicesOverview: Chunk = {
    id: 'services',
    label: 'Services',
    href: '#services',
    text: [
      `${site.name} services. ${data.services.servicesIntro as string}`,
      ...groups.map((group) => `${group.title}: ${group.intro} (${group.items.map((item) => item.title).join(', ')})`),
    ].join('\n'),
  };

  const serviceChunks = groups.map<Chunk>((group) => ({
    id: `services-${group.id}`,
    label: `Services · ${group.title}`,
    href: '#services',
    text: `${site.name} ${group.title}. ${group.intro}\n${bullets(group.items)}`,
  }));

  const storyChunks = chapters.map<Chunk>((chapter, i) => ({
    id: `story-${chapter.id}`,
    label: `Story · ${chapter.title}`,
    href: '#story',
    text: [
      `The ${site.name} story, chapter ${i + 1}: ${chapter.title}.`,
      ...(i === 0 ? [data.story.storyIntro as string] : []),
      ...chapter.paragraphs,
    ].join('\n'),
  }));

  const process: Chunk = {
    id: 'process',
    label: 'How we work',
    href: '#process',
    text: `How ${site.name} works with clients. ${data.process.processIntro as string}\n${bullets(steps)}`,
  };

  const teamOverview: Chunk = {
    id: 'team',
    label: 'Team',
    href: '#team',
    text: [
      `The ${site.name} founders and team. ${data.team.teamIntro as string}`,
      ...members.map((member) => `- ${member.name}, co-founder: ${member.role}`),
    ].join('\n'),
  };

  const memberChunks = members.map<Chunk>((member) => ({
    id: `team-${slug(member.name)}`,
    label: `Team · ${member.name}`,
    href: '#team',
    text: `${member.name} is a co-founder of ${site.legalName} and its ${member.role}. ${member.bio}`,
  }));

  const whyUs: Chunk = {
    id: 'why-us',
    label: 'Why HexaFox',
    href: '#why-us',
    text: `Why choose ${site.name}:\n${bullets(reasons)}`,
  };

  return [
    about,
    contact,
    servicesOverview,
    ...serviceChunks,
    ...storyChunks,
    process,
    teamOverview,
    ...memberChunks,
    whyUs,
  ];
}
