export interface NavLink {
  label: string;
  /** Site-relative page ('story/') or home-page anchor ('#services'); pass through withBase(). */
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'Story', href: 'story/' },
  { label: 'Services', href: '#services' },
  { label: 'How we work', href: '#process' },
  { label: 'Team', href: '#team' },
];

export const contactLink: NavLink = { label: 'Talk to us', href: '#contact' };
