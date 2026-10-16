export interface NavLink {
  label: string;
  /** In-page anchor; pass through withBase() when rendering. */
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'Story', href: '#story' },
  { label: 'Services', href: '#services' },
  { label: 'How we work', href: '#process' },
  { label: 'Team', href: '#team' },
];

export const contactLink: NavLink = { label: 'Talk to us', href: '#contact' };
