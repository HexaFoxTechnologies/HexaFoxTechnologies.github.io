/**
 * schema.org objects for the site's JSON-LD (rendered by StructuredData.astro).
 * Every builder takes the site's home URL, e.g. 'https://hexafoxtechnologies.github.io/'.
 */
import { site } from '@data/site';
import { team } from '@data/team';
import { teamMode } from '@data/teamSkills';
import { priceInr } from '@data/foxdesk';

type Schema = Record<string, unknown>;

const orgId = (home: string) => `${home}#organization`;

/** The company: name, logo, contact and place (founders' names only in the 'founders' team mode). */
export function organization(home: string): Schema {
  return {
    '@type': 'Organization',
    '@id': orgId(home),
    name: site.legalName,
    alternateName: site.name,
    url: home,
    logo: new URL('apple-touch-icon.png', home).href,
    image: new URL('og-cover.png', home).href,
    description: site.description,
    slogan: site.tagline,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Coimbatore',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    ...(teamMode === 'founders' && {
      founder: team.map((member) => ({ '@type': 'Person', name: member.name, jobTitle: member.role })),
    }),
    sameAs: [site.github],
  };
}

/** The website itself, published by the company. */
export function website(home: string): Schema {
  return {
    '@type': 'WebSite',
    '@id': `${home}#website`,
    name: site.legalName,
    url: home,
    inLanguage: 'en-IN',
    publisher: { '@id': orgId(home) },
  };
}

/** FoxDesk, our product. */
export function foxdeskApp(home: string, description: string): Schema {
  return {
    '@type': 'SoftwareApplication',
    name: 'FoxDesk',
    url: new URL('foxdesk/', home).href,
    description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    publisher: { '@id': orgId(home) },
    offers: {
      '@type': 'Offer',
      name: 'FoxDesk Managed',
      price: priceInr.monthly,
      priceCurrency: 'INR',
      priceSpecification: [
        { '@type': 'UnitPriceSpecification', price: priceInr.monthly, priceCurrency: 'INR', unitCode: 'MON', valueAddedTaxIncluded: false },
        { '@type': 'UnitPriceSpecification', price: priceInr.yearly, priceCurrency: 'INR', unitCode: 'ANN', valueAddedTaxIncluded: false },
        { '@type': 'PriceSpecification', name: 'One-time setup', price: priceInr.setup, priceCurrency: 'INR', valueAddedTaxIncluded: false },
      ],
    },
  };
}
