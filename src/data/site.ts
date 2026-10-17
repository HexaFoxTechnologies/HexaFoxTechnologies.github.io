/** Company-wide facts used across the site. */
export const site = {
  name: 'HexaFox',
  legalName: 'HexaFox Technologies',
  tagline: 'Six minds. One vision.',
  description:
    'HexaFox Technologies is a tech studio from Coimbatore, founded by six friends. We design, build and run software, from web products and data systems to practical AI solutions.',
  email: 'hexafoxtech@gmail.com',
  location: 'Coimbatore, Tamil Nadu, India',
  responseTime: '2 working days',
  groupName: 'Nanga Nari Kootam',
  college: 'Sri Ramakrishna Institute of Technology',
  web3formsKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '',
} as const;
