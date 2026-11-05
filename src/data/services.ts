/**
 * The home page's Services section: five groups that follow a project from the first call to launch.
 * Tech chips list only tools the team really uses. No client counts, years or stats.
 */
export interface Service {
  id: string;
  title: string;
  /** A few words for tight spots, e.g. inside a hexagon. */
  short: string;
  /** One line: what the client gets. */
  promise: string;
  deliverables: string[];
  tech: string[];
  /** Optional page with more on this service, e.g. 'foxdesk/'; passed through withBase(). */
  link?: { label: string; href: string };
}

export interface ServiceGroup {
  id: 'consult' | 'design' | 'build' | 'data' | 'ai';
  /** Short area name shown as each tile's tag, e.g. 'Build'. */
  title: string;
  services: Service[];
}

export const servicesTitle = 'From first idea to a working product';

export const servicesIntro =
  'One team for consulting, design, web and mobile apps, data and practical AI. Pick the piece you need, or the whole thing.';

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'consult',
    title: 'Consult',
    services: [
      {
        id: 'ai-poc',
        title: 'Proof of concept in a week',
        short: 'PoC in a week',
        promise: 'Tell us the problem. In a week, we show you a working proof of concept, free of charge.',
        deliverables: [
          'A working demo on your real data or use case',
          'An honest read on what works and what doesn’t',
          'Measured running costs, not guesses',
          'A clear go or no-go, with next steps',
        ],
        tech: ['React', 'Python', 'LLM APIs'],
      },
      {
        id: 'consulting',
        title: 'Problem to solution consulting',
        short: 'Consulting',
        promise: 'We get the problem clear, then plan a solution that fits your budget, team and timeline.',
        deliverables: [
          'Sessions to map the problem, your users and your tools',
          'A written scope: what to build, and what not to',
          'Architecture, tech choices and running costs',
          'A step-by-step plan, with us or without us',
        ],
        tech: [],
      },
    ],
  },
  {
    id: 'design',
    title: 'Design',
    services: [
      {
        id: 'ux-ui',
        title: 'UX/UI design',
        short: 'UX/UI design',
        promise: 'Screens built around your users, tested as a clickable prototype before any code.',
        deliverables: [
          'User flows and wireframes',
          'A clickable prototype to test with real users',
          'Polished screens for web and mobile',
          'A small design system: colours, type and components',
        ],
        tech: ['Figma'],
      },
    ],
  },
  {
    id: 'build',
    title: 'Build',
    services: [
      {
        id: 'web-apps',
        title: 'Web applications',
        short: 'Web apps',
        promise: 'From a company website to a full product with sign-in, dashboards and admin.',
        deliverables: [
          'Company websites and landing pages',
          'Web apps with sign-in, user roles and admin panels',
          'Works on phones, tablets and desktops',
          'Built for speed and search engines',
        ],
        tech: ['React', 'Next.js', 'Astro', 'TypeScript'],
      },
      {
        id: 'mobile-apps',
        title: 'Mobile apps',
        short: 'Mobile apps',
        promise: 'iOS and Android apps, live on the App Store and Google Play.',
        deliverables: [
          'One design, built for both platforms',
          'Connected to your existing systems and data',
          'Sign-in, notifications and payments',
          'Help publishing to both stores',
        ],
        tech: [],
        link: { label: 'Meet Evenso, our own app', href: 'evenso/' },
      },
      {
        id: 'integrations',
        title: 'APIs and integrations',
        short: 'APIs & integrations',
        promise: 'Connect your systems so data moves on its own, not by copy and paste.',
        deliverables: [
          'Online payments in your website or app',
          'WhatsApp messages and alerts',
          'Sync with your CRM, Tally or spreadsheets',
          'Clean, documented APIs for your own apps',
        ],
        tech: ['TypeScript', 'Python'],
      },
      {
        id: 'cloud-support',
        title: 'Cloud, deployment and support',
        short: 'Cloud & support',
        promise: 'We put your software live, keep watch on it and fix what comes up.',
        deliverables: [
          'Hosting, domains and deployment set up',
          'Automatic builds and releases on every change',
          'Monitoring, so problems are spotted early',
          'Ongoing support and small improvements',
        ],
        tech: ['Cloudflare', 'GitHub Actions'],
      },
    ],
  },
  {
    id: 'data',
    title: 'Data',
    services: [
      {
        id: 'databases',
        title: 'Database architecture',
        short: 'Databases',
        promise: 'Databases that stay fast, correct and easy to change as your business grows.',
        deliverables: [
          'Data model and schema design',
          'Moving data out of spreadsheets or old systems',
          'Faster queries: indexes and query fixes',
          'ETL pipelines that keep data clean and in sync',
        ],
        tech: ['SQL', 'PostgreSQL', 'Python ETL'],
      },
      {
        id: 'power-bi',
        title: 'Power BI dashboards',
        short: 'Power BI',
        promise: 'Your sales, stock or finance numbers in one dashboard, ready every morning.',
        deliverables: [
          'The numbers that matter, agreed before we build',
          'Data from Excel, databases or your apps',
          'Interactive reports with filters and drill-downs',
          'Scheduled refresh, so the numbers stay current',
        ],
        tech: ['Power BI', 'SQL', 'Python ETL'],
      },
      {
        id: 'document-ai',
        title: 'Document AI',
        short: 'Document AI',
        promise: 'Invoices, forms and PDFs turned into clean data, with no retyping.',
        deliverables: [
          'Fields read from invoices, forms and scanned PDFs',
          'Unclear fields flagged for a person to check',
          'Results saved to your database or spreadsheet',
        ],
        tech: ['LLM APIs', 'Python', 'PostgreSQL'],
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI',
    services: [
      {
        id: 'rag',
        title: 'RAG assistants',
        short: 'RAG assistants',
        promise: 'Answers from your own pages and PDFs, with the source of each answer.',
        deliverables: [
          'For your website’s visitors, or for your own team',
          'Stays current as your content changes',
          'Says so when it doesn’t know',
          'Ask in English, Tamil, Hindi or Tanglish',
        ],
        tech: ['Embeddings / RAG', 'LLM APIs', 'Cloudflare'],
        link: { label: 'Meet FoxDesk, our own RAG assistant', href: 'foxdesk/' },
      },
      {
        id: 'multi-agent',
        title: 'Multi-agent systems',
        short: 'Multi-agent systems',
        promise: 'AI agents that split a complex job, check each other’s work and use your tools.',
        deliverables: [
          'Agents that research, draft, review and hand over',
          'Connected to your email, sheets, CRM or database',
          'A person approves the steps that matter',
          'A log of every step, so you can see what happened',
        ],
        tech: ['LLM APIs', 'Python'],
      },
      {
        id: 'automation',
        title: 'Workflow automation',
        short: 'Workflow automation',
        promise: 'Hand repetitive, multi-step work to automations that run on their own.',
        deliverables: [
          'Your team’s repeated manual steps, mapped out',
          'Automations for reports, follow-ups and data entry',
          'AI only where a simple rule can’t do the job',
          'An alert when something needs a person',
        ],
        tech: ['Python', 'LLM APIs', 'GitHub Actions'],
      },
    ],
  },
];
