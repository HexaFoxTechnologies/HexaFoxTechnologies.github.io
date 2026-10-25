/**
 * "Why HexaFox" on the home page: the few things that stay the same on every project.
 * Services says what we build, How we work says when, Team says who. This section states the
 * principles behind all three, and each one points to the section that shows it in practice.
 */
export interface Reason {
  title: string;
  text: string;
  /** Where on this page the principle shows up; shown as a small link under the text. */
  proof: string;
  /** Section anchor the proof links to, e.g. '#process'; passed through withBase(). */
  href: string;
}

export const reasonsTitle = 'Four things that don’t change';

export const reasonsIntro = 'Each one points to the part of this page where you can see it in practice.';

export const reasons: Reason[] = [
  {
    title: 'You talk to the builders',
    text: 'No sales layer, no account manager. The people on your calls are the people writing your code, so questions get straight answers.',
    proof: 'See who does what',
    href: '#team',
  },
  {
    title: 'Running costs before you commit',
    text: 'During the proof of concept we measure what it will cost to run, so the number you plan with is real.',
    proof: 'What the proof of concept includes',
    href: '#services',
  },
  {
    title: 'AI only where it earns its place',
    text: 'We build AI, and we still say so when a plain form or a database query would do the job better.',
    proof: 'Our own assistant says so when it doesn’t know',
    href: '#product',
  },
  {
    title: 'You’re never stuck with us',
    text: 'You get a plan anyone could follow, so you stay with us because it works, not because you have to.',
    proof: 'What we build',
    href: '#services',
  },
];
