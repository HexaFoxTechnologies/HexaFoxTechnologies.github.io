/**
 * Evenso, HexaFox's trip-expense app: the /evenso/ page and its card in the home page's product band.
 * Claim only what the app does today (private repo HexaFoxTechnologies/evenso). It's coming to the Play
 * Store and App Store, so no store badges, ratings or download numbers until it's there. Sign-in is
 * changing (Google sign-in is planned), so the page doesn't describe how people sign in.
 */
import type { Link, TitledText } from './foxdesk';

export interface TourStep {
  title: string;
  text: string;
  /** The app route the phone shows for this step, inside the demo build at /evenso/demo/. */
  screen: string;
}

export const hero = {
  eyebrow: 'Evenso · by HexaFox',
  title: 'Split trip costs with friends.',
  emphasis: 'Settle up in one tap.',
  lead: 'Everyone adds what they paid as the trip goes. At the end, Evenso shows one short list of who pays whom.',
  /** Shown with the phone on Your trips. */
  screen: '/',
  tryButton: 'Try it yourself',
  tourButton: 'See how it works',
  status: 'Free, with no ads. Try it now in your browser, right here. Coming soon to the Play Store and the App Store.',
};

/** The scroll story: each step moves the phone to the screen it describes. */
export const tour = {
  label: 'How Evenso works',
  steps: [
    {
      title: 'Start a trip',
      text: 'Name the trip, pick the dates, set a budget if you like and add your friends by name. They don’t need the app yet.',
      screen: '/new-trip',
    },
    {
      title: 'Invite everyone with one code',
      text: 'Every trip gets a short code like GOA-4K7P2X. Share it on WhatsApp; friends join with it and tap their own name.',
      screen: '/trip/goa/invite',
    },
    {
      title: 'See who paid what',
      text: 'The trip overview shows the total spent, how much of the budget is left and how much each person has paid.',
      screen: '/trip/goa',
    },
    {
      title: 'Add an expense in seconds',
      text: 'Type the amount, pick who paid, and split it between everyone, some people or exact amounts. Saying what it was for is optional. No signal? It saves and syncs later.',
      screen: '/trip/goa/add-expense',
    },
    {
      title: 'Every change is tracked',
      text: 'Open any expense to see who added it and every change since, like “Bala changed the amount from ₹800 to ₹900”. Deleted expenses stay visible too.',
      screen: '/trip/goa/expense/drinks',
    },
    {
      title: 'Know where the money went',
      text: 'Insights splits the spending by category and by day, and shows the biggest expense and who paid the most.',
      screen: '/trip/goa/insights',
    },
    {
      title: 'Choose who shares the cost',
      text: 'When the trip ends, switch off anyone who shouldn’t pay a share, like a friend who came for one day. They still get back what they paid.',
      screen: '/trip/goa/end-trip',
    },
    {
      title: 'Settle up in the fewest payments',
      text: 'Evenso works out the fewest payments that make everyone even. Pay with UPI opens your own UPI app with the amount filled in; then mark it settled. This made-up weekend has ended, and nobody in it has a UPI ID, so no real money can move.',
      screen: '/trip/pondy/settle',
    },
    {
      title: 'Share the trip report',
      text: 'One picture with the total, what everyone paid and who paid whom. Share it on WhatsApp or save it.',
      screen: '/trip/pondy/report',
    },
  ] satisfies TourStep[],
};

/** Words around the live phone. */
export const phone = {
  frameLabel: 'Evenso demo app',
  loading: 'Opening Evenso…',
  noScript: 'Turn on JavaScript to see the live app.',
  failed: 'The demo didn’t load.',
  loadButton: 'Load the live app (about 1.2 MB)',
  openFull: 'Open it full screen',
  tryButton: 'Try it yourself',
  backButton: 'Back to the tour',
  resetButton: 'Start over',
  tryNote: 'You’re using the real app with made-up trips. Changes stay in this browser.',
  tourNote: 'This is the real Evenso app with made-up trips, moving as you scroll.',
};

export const features = {
  eyebrow: 'Built for real trips',
  title: 'The small things that keep a group even',
  items: [
    { title: 'Works without signal', text: 'Add expenses and mark payments in the hills or on a flight. They sync when you’re back online.' },
    { title: 'Keep to a budget', text: 'Set a budget when you start the trip and see how much is left as the group spends.' },
    { title: 'Fair splits', text: 'Split between everyone, some people or exact amounts. Leftover paise move around, so nobody always pays the extra.' },
    { title: 'Part payments', text: 'Paid back half now and half later? Mark what was paid and Evenso keeps track of the rest.' },
    { title: 'Large text', text: 'Screens stay readable at the biggest text sizes, and work with screen readers.' },
    { title: 'Change your mind', text: 'Reopen an ended trip to add a late expense or change who shares the cost.' },
  ] satisfies TitledText[],
};

export const faq = {
  eyebrow: 'Questions',
  title: 'Good to know',
  items: [
    {
      title: 'What does it cost?',
      text: 'Nothing. Evenso is free, with no ads and no limit on expenses.',
    },
    {
      title: 'Does Evenso handle my money?',
      text: 'No. Evenso only keeps track of who paid what. When you pay someone back, Pay with UPI opens your own UPI app with their UPI ID and the amount filled in.',
    },
    {
      title: 'Who can see my trip?',
      text: 'Only people who join it with its code. The code has six random characters after the trip’s name, so it’s hard to guess.',
    },
    {
      title: 'Where can I get it?',
      text: 'Right now you can try the full app here on this page, with made-up trips; nothing you do here leaves your browser. Evenso is coming soon to the Play Store and the App Store.',
    },
  ] satisfies TitledText[],
};

export const closing = {
  title: 'Want Evenso on your next trip?',
  text: 'Evenso is coming soon to the Play Store and the App Store. Tell us you’re interested and we’ll let you know when it’s out.',
  primary: { label: 'Tell us', href: '#contact' } satisfies Link,
};

/** The Evenso card in the home page's product band. */
export const productCard = {
  eyebrow: 'For trips with friends',
  title: 'Evenso',
  text: 'Split trip costs with friends and settle up in one tap. Try the real app, right in the page.',
  link: { label: 'See Evenso', href: 'evenso/' } satisfies Link,
  imageAlt: 'Evenso’s trip overview for a Goa trip: ₹30,600 spent of a ₹40,000 budget, and how much each of six friends has paid.',
};
