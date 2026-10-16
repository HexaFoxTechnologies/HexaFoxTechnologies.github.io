export interface ProcessStep {
  title: string;
  text: string;
}

export const processIntro = 'A simple rhythm that keeps you in the loop from the first call to long after launch.';

export const processSteps: ProcessStep[] = [
  {
    title: 'Understand',
    text: 'We start with your problem, not our stack. Goals and constraints are written down and agreed.',
  },
  {
    title: 'Design',
    text: 'Wireframes and prototypes you can click through before anything is built.',
  },
  {
    title: 'Build',
    text: 'Frontend, data and AI built in short cycles, so you see progress every week.',
  },
  {
    title: 'Launch',
    text: 'Tested, deployed and monitored.',
  },
  {
    title: 'Support',
    text: 'We stay on to fix, tune and add what’s next.',
  },
];
