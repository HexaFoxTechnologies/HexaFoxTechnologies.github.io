/**
 * "How we work" on the home page: how a project runs over time. Services (services.ts) says what we build;
 * this explains the rhythm, so the two never repeat each other's lists.
 */
export interface ProcessStep {
  title: string;
  /** When it happens, e.g. 'Week 1'. */
  when: string;
  text: string;
  /** What the client has in hand at the end of the step. */
  youGet: string;
  /** The decision the client makes before the next step, if any. */
  youDecide?: string;
}

export const processIntro = 'Small steps, a demo at the end of each, and a clear choice before the next. Here’s how it feels from your side.';

export const processSteps: ProcessStep[] = [
  {
    title: 'Start with a conversation',
    when: 'Day 1',
    text: 'Tell us what’s getting in the way, in your own words. We ask questions and listen; no slides, no jargon.',
    youGet: 'The problem written back to you, so we both mean the same thing',
    youDecide: 'Whether a week is worth spending on it',
  },
  {
    title: 'See it working in a week',
    when: 'Week 1',
    text: 'Bring us the problem on Monday. On Friday you try something small that really runs, and tell us what you think.',
    youGet: 'Something you can try yourself, and our plain view on where it leads',
    youDecide: 'Carry on, change tack, or stop here',
  },
  {
    title: 'Agree what to build first',
    when: 'Next',
    text: 'We settle what’s in the first release and what can wait, then sketch the screens so you can walk through them early.',
    youGet: 'A short plan: what’s in, what’s out, roughly when, and what it costs',
    youDecide: 'What makes the cut for the first release',
  },
  {
    title: 'Build in short rounds',
    when: 'Every week',
    text: 'Each week closes with a demo of what’s new. You try it, say what’s off, and we fix it before moving on, not at the end.',
    youGet: 'Something new to try every week, and a say in what comes next',
  },
  {
    title: 'Go live, then keep going',
    when: 'After launch',
    text: 'We put it in front of your users and watch how it behaves. Small fixes and the next ideas keep coming after that.',
    youGet: 'Your product in use, and one place to send the next request',
  },
];
