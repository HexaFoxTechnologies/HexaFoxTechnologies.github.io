/** Company-wide facts used across the site. */
export const site = {
  name: 'HexaFox',
  legalName: 'HexaFox Technologies',
  tagline: 'Six minds. One vision.',
  /** What the home page's title says we do; search results show it next to the name. */
  homeTitle: 'Web and AI studio in Coimbatore',
  /** Kept under ~155 characters so search results don't cut it off. */
  description:
    'HexaFox Technologies is a Coimbatore tech studio founded by six friends. We design, build and run websites, web apps, data systems and practical AI.',
  email: 'hexafoxtech@gmail.com',
  location: 'Coimbatore, Tamil Nadu, India',
  responseTime: '2 working days',
  groupName: 'Nanga Nari Kootam',
  college: 'Sri Ramakrishna Institute of Technology',
  github: 'https://github.com/HexaFoxTechnologies',
  web3formsKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '',
  /** Google Search Console ownership code (public; shown in every page's source). */
  googleSiteVerification: 'Ca3pzl-6kkn_EHT8UGefgTqh8v022gsw_XHQZFvhbFY',
} as const;
