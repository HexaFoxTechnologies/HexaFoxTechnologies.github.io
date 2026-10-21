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
      title: 'Looks like your brand',
      text: 'Your colours, logo and name, with your own greeting and starter questions.',
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

export const audiences = {
  eyebrow: 'Who it’s for',
  title: 'For anyone who answers the same questions every day',
  items: [
    {
      title: 'Colleges',
      text: 'Courses, admissions, eligibility and campus facilities, answered from your website and prospectus PDFs.',
    },
    {
      title: 'Clinics',
      text: 'Timings, departments, doctors and how to book. We set it to stick to your site and stay away from medical advice.',
    },
    {
      title: 'Service businesses',
      text: 'What you offer, where you work and how to get a quote, with a nudge to your contact page when someone is ready to talk.',
    },
  ] satisfies TitledText[],
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
      title: 'Do I need to change my website?',
      text: 'No. You add one line of code, and it works on any site where you can add HTML.',
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
