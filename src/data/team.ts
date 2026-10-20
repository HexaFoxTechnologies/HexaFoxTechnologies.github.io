import type { ImageMetadata } from 'astro';
import madhesh from '@assets/team/madhesh-vivekanandan.jpg';
import pranav from '@assets/team/pranav-krishnaa.jpg';
import nithish from '@assets/team/nithish-kumar.jpg';
import prasanna from '@assets/team/prasanna-ayyappan.jpg';
import raghul from '@assets/team/raghul-b.jpg';
import mahamanimaran from '@assets/team/mahamanimaran-v.jpg';

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: ImageMetadata;
}

/** Short pointer from the Team section to the full story page. */
export const teamStory = {
  text: 'Six friends since our college days in Coimbatore.',
  label: 'Read our story',
  href: 'story/',
};

export const teamIntro = 'All six of us are co-founders. Each of us brings one side of the hexagon.';

export const team: TeamMember[] = [
  {
    name: 'Madhesh Vivekanandan',
    role: 'AI Engineer',
    bio: 'Puts language models into real products, along with the APIs, data, retrieval and checks that make them reliable.',
    photo: madhesh,
  },
  {
    name: 'Pranav Krishnaa',
    role: 'Frontend Engineer',
    bio: 'Builds fast, polished interfaces with React and Next.js.',
    photo: pranav,
  },
  {
    name: 'Nithish Kumar',
    role: 'Cloud & Support Engineer',
    bio: 'Keeps systems running: cloud infrastructure, deployment, monitoring and support.',
    photo: nithish,
  },
  {
    name: 'Prasanna Ayyappan',
    role: 'Data Engineer',
    bio: 'Designs databases and data pipelines, and turns raw data into answers.',
    photo: prasanna,
  },
  {
    name: 'Raghul B',
    role: 'UX/UI Designer',
    bio: 'Designs simple, user-friendly experiences, from research to prototype.',
    photo: raghul,
  },
  {
    name: 'Mahamanimaran V',
    role: 'Solutions Consultant',
    bio: 'Turns client problems into clear plans and keeps delivery on track.',
    photo: mahamanimaran,
  },
];
