import type { GeneratedImageName } from '@lib/images';

export interface ServiceItem {
  title: string;
  text: string;
  /** Optional page with more on this service, e.g. 'foxdesk/'; passed through withBase(). */
  link?: { label: string; href: string };
}

export interface ServiceGroup {
  id: string;
  title: string;
  intro: string;
  image: GeneratedImageName;
  imageAlt: string;
  items: ServiceItem[];
}

export const servicesIntro =
  'Everyday technology done properly, and AI that holds up in the real world.';

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'tech',
    title: 'Tech solutions',
    intro: 'Websites, apps, data and cloud: built well and kept running.',
    image: 'service-tech',
    imageAlt: 'Glass hexagon tiles fitted together like a honeycomb, etched with interface sketches.',
    items: [
      {
        title: 'Web and product development',
        text: 'Fast, modern websites and web apps, from a company site to a full product, built with React and Next.js.',
      },
      {
        title: 'UX/UI design',
        text: 'Research, wireframes, prototypes and polished interfaces in Figma, designed around how your users think.',
      },
      {
        title: 'Data and databases',
        text: 'Database design, SQL, ETL pipelines and analytics that make your data clean, fast and useful.',
      },
      {
        title: 'Cloud and support',
        text: 'Deployment, monitoring and ongoing support, so your systems stay up and issues get fixed quickly.',
      },
      {
        title: 'Consulting and delivery',
        text: 'We map the problem, scope the solution, plan the work and deliver it with clear communication.',
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI solutions',
    intro: 'Practical AI, built with the checks that keep it reliable.',
    image: 'service-ai',
    imageAlt: 'A glowing violet core inside a hexagon, connected by threads of light to documents and tools.',
    items: [
      {
        title: 'AI assistants and chatbots',
        text: 'Assistants that answer from your documents and data, not from guesswork.',
        link: { label: 'Meet FoxDesk, our own assistant', href: 'foxdesk/' },
      },
      {
        title: 'AI features in your product',
        text: 'Add summarisation, search, extraction, classification or smart dashboards to an existing app.',
      },
      {
        title: 'Workflow automation and agents',
        text: 'Hand repetitive, multi-step work to AI agents that use your tools, with a human in the loop where it matters.',
      },
      {
        title: 'Reliable AI',
        text: 'The model is the easy part. We build what’s around it: the APIs, the data, the retrieval, and the checks that catch it when it’s wrong.',
      },
    ],
  },
];
