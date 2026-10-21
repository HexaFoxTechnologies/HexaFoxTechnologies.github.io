/**
 * FoxDesk, HexaFox's own product: the /foxdesk/ page and the "Our product" band on the home page.
 * Claim only what FoxDesk does today (private repo HexaFoxTechnologies/foxdesk). No prices, no
 * client names, no usage numbers.
 */
export interface Link {
  label: string;
  /** Site-relative page or anchor ('#contact', 'foxdesk/'); pass through withBase(). */
  href: string;
}

export interface TitledText {
  title: string;
  text: string;
}

/** One of the example looks in "Make it yours": options a client really sets in FoxDesk's config. */
export interface ThemeLook {
  title: string;
  greeting: string;
  starter: string;
  preset: 'light' | 'dark';
  accent: string;
  radius: number;
  launcher: 'circle' | 'hexagon';
  position: 'left' | 'right';
}

export interface Group {
  title: string;
  items: string[];
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  points: string[];
  featured?: boolean;
}

/** The chat-window illustration: one real question and answer about this site. */
export const chatMock = {
  title: 'Ask HexaFox',
  subtitle: 'AI answers from our website',
  question: 'Do you build AI chatbots?',
  answer: 'Yes. We build assistants that answer from your own documents and data, not from guesswork.',
  source: 'Services · AI solutions',
  placeholder: 'Ask about HexaFox…',
  alt: 'A FoxDesk chat window. A visitor asks “Do you build AI chatbots?” and the answer cites its source, the Services section of the website.',
};

export const hero = {
  eyebrow: 'FoxDesk · by HexaFox',
  title: 'FoxDesk: an AI assistant that answers from',
  emphasis: 'your website.',
  lead: 'Visitors ask in plain words and get a short answer from your own pages, with a link to where it came from. Add it to your site with one line of code.',
  primary: { label: 'Get FoxDesk', href: '#contact' } satisfies Link,
  /** Opens the chat on this page (shown once the widget has loaded). */
  tryButton: 'Try it now',
  tryHint: 'The chat in the corner of this page is FoxDesk, set up for HexaFox. It answers from this website and nothing else.',
};

/** The three steps, each drawn as a small picture (see HowItWorks.astro). */
export const steps = {
  eyebrow: 'How it works',
  title: 'Live on your site in three steps',
  items: [
    {
      title: 'We read your site',
      text: 'Your public pages and PDFs, plus any facts you give us, become knowledge the assistant can search.',
    },
    {
      title: 'You add one line of code',
      text: 'Paste one script tag into any site where you can add HTML. The chat loads only when someone opens it.',
    },
    {
      title: 'Visitors get answers with sources',
      text: 'A few sentences from your content, with a link to the section each answer came from.',
    },
  ] satisfies TitledText[],
  snippetLabel: 'The one line you add',
  snippet: '<script src="https://foxdesk-yoursite.workers.dev/widget.js" data-bot="yoursite" defer></script>',
};

export const features = {
  eyebrow: 'What makes it different',
  title: 'Built to be trusted, not just to talk',
  items: [
    {
      title: 'Answers only from your content',
      text: 'Every answer is written from your own pages. When they don’t cover a question, it says so and points to your contact page instead of guessing.',
    },
    {
      title: 'Speaks your visitors’ language',
      text: 'Visitors can ask in Tamil, Hindi, English and other languages, and get the answer in the language they asked in, even when your site is in English.',
    },
    {
      title: 'Safe and private',
      text: 'An invisible bot check and daily limits stop misuse and runaway costs. Conversations aren’t stored.',
    },
    {
      title: 'Stays up to date',
      text: 'It re-reads your site every day, and can refresh right after you publish a change.',
    },
  ] satisfies TitledText[],
};

/** What a client can change. Each item maps to a real setting in a FoxDesk client config. */
export const customise = {
  eyebrow: 'Make it yours',
  title: 'Your look, your words, your rules',
  intro: 'Every FoxDesk is set up for one site. Three looks from the same assistant:',
  looks: [
    {
      title: 'Ask HexaFox',
      greeting: 'Hi! Ask me about what we do, who we are or how we work.',
      starter: 'Who are the founders?',
      preset: 'dark',
      accent: '#7347e6',
      radius: 22,
      launcher: 'hexagon',
      position: 'right',
    },
    {
      title: 'Spice Route Café',
      greeting: 'Hello! Ask about our menu, timings or how to book a table.',
      starter: 'Are you open on Sunday?',
      preset: 'light',
      accent: '#0f766e',
      radius: 8,
      launcher: 'circle',
      position: 'left',
    },
    {
      title: 'Sunrise College',
      greeting: 'வணக்கம்! சேர்க்கை, படிப்புகள் பற்றி கேளுங்கள்.',
      starter: 'B.Sc சேர்க்கை எப்போது?',
      preset: 'light',
      accent: '#c2410c',
      radius: 18,
      launcher: 'circle',
      position: 'right',
    },
  ] satisfies ThemeLook[],
  looksLabel: 'Three example chat windows: a dark violet one with a hexagon button, a light teal one with square corners and its button on the left, and a light orange one greeting visitors in Tamil.',
  groups: [
    { title: 'Look', items: ['Your colours, light or dark', 'Your logo and font', 'Round or square corners', 'A round or hexagon button, left or right'] },
    { title: 'Words', items: ['Its name and greeting', 'Up to six starter questions', 'The note visitors see under the chat'] },
    { title: 'What it reads', items: ['Which pages and sections, and which to skip', 'Your PDFs', 'Extra facts you send us'] },
    { title: 'Rules', items: ['Things it must never guess, like prices or dates', 'Extra rules, like “no medical advice”', 'Where to send people who want to talk', 'Daily question limits'] },
  ] satisfies Group[],
};

/** Works on the client's current site, or on a new one HexaFox builds. */
export const sites = {
  title: 'On the site you have, or a new one we build',
  items: [
    {
      title: 'Your existing site',
      text: 'Add one line of code to any site where you can add HTML. Nothing else on your site changes.',
    },
    {
      title: 'A new site from us',
      text: 'Need a new website too? We design and build it, with FoxDesk set up from day one.',
    },
  ] satisfies TitledText[],
  link: { label: 'See our web services', href: '#services' } satisfies Link,
  note: 'FoxDesk reads the text on your public pages and PDFs. Pages behind a login, and text that only appears inside images, need to reach us another way, such as a note or a document.',
};

/** Who it's for: examples, not a limit. Kinds of business whose sites answer the same questions daily. */
export const audiences = {
  eyebrow: 'Who it’s for',
  title: 'For anyone who answers the same questions every day',
  items: [
    'Shops and online stores',
    'Restaurants and cafés',
    'Clinics and hospitals',
    'Colleges, schools and coaching centres',
    'Hotels and travel',
    'Real estate',
    'Salons and gyms',
    'Service businesses',
  ],
  text: 'If your website already answers the questions visitors keep asking, such as timings, prices, services or how to book, FoxDesk can answer them for you, day and night.',
};

export const plans = {
  eyebrow: 'Plans',
  title: 'Two ways to run it',
  intro: 'Pricing depends on your site and your traffic, so we quote after a short call.',
  cta: { label: 'Talk to us', href: '#contact' } satisfies Link,
  featuredLabel: 'Recommended',
  items: [
    {
      id: 'managed',
      name: 'Managed',
      tagline: 'We set up and run everything.',
      featured: true,
      points: [
        'We read your site, review what it found and tune the answers',
        'Your colours, logo, name, greeting and starter questions',
        'Hosting, AI models, bot checks and limits set up for you',
        'Knowledge refreshed when your site changes',
        'Changes and support when you need them',
      ],
    },
    {
      id: 'self-hosted',
      name: 'Self-hosted',
      tagline: 'For teams that need their data in their own cloud.',
      points: [
        'Runs in your own Cloudflare account',
        'Uses your own AI provider keys',
        'We set it up with you',
        'Annual licence: ask us',
      ],
    },
  ] satisfies Plan[],
};

export const faq = {
  eyebrow: 'Questions',
  title: 'Good to know',
  items: [
    {
      title: 'Where is my data?',
      text: 'The knowledge built from your site lives with your assistant on Cloudflare, in our account or yours. Conversations aren’t stored. To write an answer, the question and the matching parts of your site are sent to the AI provider, so we agree the providers with you up front.',
    },
    {
      title: 'Which AI does it use?',
      text: 'Fast hosted models from Groq, with Google Gemini or OpenAI as a backup when one is busy. Cloudflare Workers AI matches each question to the right parts of your content.',
    },
    {
      title: 'Can it be wrong?',
      text: 'It can, like any AI. It’s told to answer only from your content and to say when it doesn’t know, every answer shows its sources so visitors can check, and the chat reminds visitors that AI answers might not always be accurate. Before launch we test it against the questions your visitors really ask.',
    },
    {
      title: 'Which languages does it speak?',
      text: 'Visitors can ask in their own language and get the answer in it, even when your site is in English. We’ve tested Tamil, Hindi and English. Tamil typed in English letters (Tanglish) is less reliable today.',
    },
    {
      title: 'What does it cost?',
      text: 'It depends on the size of your site and how many questions it gets. Talk to us and we’ll give you a clear quote.',
    },
  ] satisfies TitledText[],
};

export const closing = {
  title: 'Get FoxDesk for your website',
  text: 'Tell us about your site and the questions you get asked most. We’ll show you what FoxDesk can do with them.',
  primary: { label: 'Get FoxDesk', href: '#contact' } satisfies Link,
  secondary: { label: 'See all our services', href: '#services' } satisfies Link,
};

/** The "Our product" band on the home page. */
export const productBand = {
  eyebrow: 'Our product',
  title: 'FoxDesk',
  text: 'An AI assistant that answers visitors’ questions from your own website, with sources. One line of code to add, and it’s the chat on this site.',
  link: { label: 'See FoxDesk', href: 'foxdesk/' } satisfies Link,
};
