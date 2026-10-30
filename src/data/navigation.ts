export interface NavLink {
  label: string;
  /** Site-relative page ('story/') or home-page anchor ('#services'); pass through withBase(). */
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'How we work', href: '#process' },
  { label: 'FoxDesk', href: 'foxdesk/' },
  { label: 'Evenso', href: 'evenso/' },
  { label: 'Team', href: '#team' },
  { label: 'Our story', href: 'story/' },
];

export const contactLink: NavLink = { label: 'Talk to us', href: '#contact' };
