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
        promise: 'We take your problem and build a working proof of concept, then show it to you in a week, free of charge.',
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
        promise: 'We get the problem clear first, then design a solution that fits your budget, team and timeline.',
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
        promise: 'Screens built around how your users think, tested as a clickable prototype before any code.',
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
        promise: 'Fast, modern web apps: from a company website to a full product with sign-in, dashboards and admin.',
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
        promise: 'iOS and Android apps your customers install from the App Store and Google Play.',
        deliverables: [
          'One design, built for both platforms',
          'Connected to your existing systems and data',
          'Sign-in, notifications and payments where you need them',
          'Help publishing to the App Store and Google Play',
        ],
        tech: [],
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
        promise: 'We put your software live, keep watch on it and fix issues as they come up.',
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
        promise: 'Dashboards that turn sales, stock or finance data into answers you can check every morning.',
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
        promise: 'Turn invoices, forms and PDFs into clean, structured data, with no retyping.',
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
        promise: 'Assistants that answer from your own pages and PDFs, and show where each answer came from.',
        deliverables: [
          'For your website’s visitors, or for your own team',
          'Stays current as your content changes',
          'Says so when your content doesn’t cover a question',
          'Ask in English, Tamil, Hindi or Tanglish',
        ],
        tech: ['Embeddings / RAG', 'LLM APIs', 'Cloudflare'],
        link: { label: 'Meet FoxDesk, our own RAG assistant', href: 'foxdesk/' },
      },
      {
        id: 'multi-agent',
        title: 'Multi-agent systems',
        short: 'Multi-agent systems',
        promise: 'A team of AI agents that splits a complex job, checks each other’s work and uses your tools.',
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
