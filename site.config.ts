/**
 * BEDRIJFSGEGEVENS: het enige bestand voor naam, KvK, btw, adres, telefoon,
 * WhatsApp, e-mail, socials en agenda-link.
 *
 * Waarden die met "TODO" beginnen zijn placeholders. In productie worden ze
 * verborgen (bijv. geen belknop zolang het nummer TODO is). In dev of met
 * NEXT_PUBLIC_PREVIEW=true zie je ze als gele markering.
 */
export const siteConfig = {
  /** Eén domein voor canonical, og:url, sitemap en llms.txt. */
  url: 'https://qkcommerce.nl',
  name: 'QK Commerce Solutions B.V.',
  shortName: 'QK Commerce Solutions',
  short: 'QK',
  tagline: 'Alles rondom internet, volledig ontzorgd.',
  description:
    'Full-service online agency uit Leeuwarden. Websites, webshops, vindbaarheid, advertenties en AI voor ondernemers in Friesland en daarbuiten. Eén partner, vaste prijzen.',

  founder: {
    name: 'Quinten',
    lastName: 'TODO: achternaam',
    role: 'Oprichter & e-commercespecialist',
    linkedin: 'TODO: https://www.linkedin.com/in/...',
  },

  kvk: 'TODO: KvK-nummer',
  btw: 'TODO: btw-nummer',

  email: 'TODO: info@qkcommerce.nl',
  phoneDisplay: 'TODO: 06 00 00 00 00',
  phoneE164: 'TODO: +316XXXXXXXX',
  whatsapp: 'TODO: 316XXXXXXXX',
  whatsappMessage: 'Hoi Quinten, ik heb een vraag over mijn website.',

  address: {
    street: 'TODO: straat + huisnummer',
    postalCode: 'TODO: postcode',
    city: 'Leeuwarden',
    region: 'Friesland',
    country: 'NL',
  },
  geo: { lat: 53.2012, lng: 5.7999 },
  openingHours: 'Ma–vr 09:00–17:30',
  openingHoursSchema: ['Mo-Fr 09:00-17:30'],

  /** Cal.com of Calendly, bijv. https://cal.com/qkcommerce/kennismaking */
  calendarUrl: 'TODO: https://cal.com/...',

  socials: {
    linkedin: 'TODO: https://www.linkedin.com/company/...',
    instagram: 'TODO: https://www.instagram.com/...',
  },

  areaServed: ['Leeuwarden', 'Friesland', 'Groningen', 'Noord-Nederland', 'Nederland'],
} as const;

export type SiteConfig = typeof siteConfig;
