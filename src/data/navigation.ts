export interface NavLink {
  label: string;
  /** Site-relative page ('story/') or home-page anchor ('#services'); pass through withBase(). */
  href: string;
}

/** Header and mobile menu: the home page's sections (in page order), plus the story. */
export const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'How we work', href: '#process' },
  { label: 'Products', href: '#product' },
  { label: 'Team', href: '#team' },
  { label: 'Our story', href: 'story/' },
];

/** Our product pages: linked from the home page's product cards (the header's "Products") and the footer. */
export const productLinks: NavLink[] = [
  { label: 'FoxDesk', href: 'foxdesk/' },
  { label: 'Evenso', href: 'evenso/' },
];

export const contactLink: NavLink = { label: 'Talk to us', href: '#contact' };
