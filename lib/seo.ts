import type { Metadata } from 'next';
import { siteConfig } from '@/site.config';
import { filled, stripTodo } from './todo';
import { packages, formatPrice } from '@/content/pricing';
import { directions } from '@/content/directions';
import type { QA } from '@/content/services';

export const abs = (path = '/') => (path === '/' ? siteConfig.url + '/' : siteConfig.url + path);
export const ORG_ID = `${siteConfig.url}/#organization`;
export const SITE_ID = `${siteConfig.url}/#website`;

/** Metadata per pagina: title, description, canonical, OG, Twitter, robots. */
export function pageMeta(opts: { title: string; description: string; path: string; noindex?: boolean; type?: 'website' | 'article'; absoluteTitle?: boolean }): Metadata {
  const url = abs(opts.path);
  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      type: opts.type ?? 'website',
      url,
      title: opts.title,
      description: opts.description,
      siteName: siteConfig.shortName,
      locale: 'nl_NL',
    },
    twitter: { card: 'summary_large_image', title: opts.title, description: opts.description },
    robots: opts.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  };
}

/* ------------------------- JSON-LD ------------------------- */
const clean = <T,>(o: T): T => JSON.parse(JSON.stringify(o, (_k, v) => (v === undefined || v === '' ? undefined : v)));

export function organizationLd() {
  const sameAs = Object.values(siteConfig.socials).map((s) => filled(s)).filter(Boolean);
  return clean({
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: abs('/logo.png'),
    image: abs('/opengraph-image'),
    email: filled(siteConfig.email),
    telephone: filled(siteConfig.phoneE164),
    vatID: filled(siteConfig.btw),
    taxID: filled(siteConfig.kvk),
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: filled(siteConfig.address.street),
      postalCode: filled(siteConfig.address.postalCode),
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: siteConfig.geo.lat, longitude: siteConfig.geo.lng },
    openingHours: siteConfig.openingHoursSchema,
    areaServed: siteConfig.areaServed.map((name) => ({ '@type': 'Place', name })),
    knowsLanguage: ['nl', 'en'],
    founder: { '@id': `${siteConfig.url}/over-ons#quinten` },
    sameAs: sameAs.length ? sameAs : undefined,
    hasOfferCatalog: { '@id': `${siteConfig.url}/pakketten#catalog` },
  });
}

export function websiteLd() {
  return { '@type': 'WebSite', '@id': SITE_ID, url: siteConfig.url, name: siteConfig.shortName, inLanguage: 'nl-NL', publisher: { '@id': ORG_ID } };
}

export function personLd() {
  const li = filled(siteConfig.founder.linkedin);
  return clean({
    '@type': 'Person',
    '@id': `${siteConfig.url}/over-ons#quinten`,
    name: siteConfig.founder.name,
    jobTitle: siteConfig.founder.role,
    worksFor: { '@id': ORG_ID },
    workLocation: { '@type': 'Place', name: 'Leeuwarden' },
    knowsAbout: ['E-commerce', 'Shopify', 'Webshopbeheer', 'SEO', 'Generative Engine Optimization', 'Meta Ads', 'Google Ads', 'AI-implementatie'],
    sameAs: li ? [li] : undefined,
  });
}

export function serviceLd(opts: { name: string; description: string; path: string; serviceType: string; packageIds?: string[]; area?: string[] }) {
  const url = abs(opts.path);
  const offers = (opts.packageIds ?? [])
    .map((id) => packages.find((p) => p.id === id))
    .filter((p) => p && p.price.amount != null)
    .map((p) => ({
      '@type': 'Offer',
      name: p!.name,
      description: p!.summary,
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': p!.price.unit === 'mnd' ? 'UnitPriceSpecification' : 'PriceSpecification',
        [p!.price.from ? 'minPrice' : 'price']: p!.price.amount,
        priceCurrency: 'EUR',
        valueAddedTaxIncluded: false,
        ...(p!.price.unit === 'mnd' ? { unitText: 'maand' } : {}),
      },
    }));
  return clean({
    '@type': 'Service',
    '@id': `${url}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url,
    provider: { '@id': ORG_ID },
    areaServed: (opts.area ?? ['Friesland', 'Noord-Nederland', 'Nederland']).map((name) => ({ '@type': 'Place', name })),
    offers: offers.length ? offers : undefined,
  });
}

export function offerCatalogLd() {
  return {
    '@type': 'OfferCatalog',
    '@id': `${siteConfig.url}/pakketten#catalog`,
    name: 'Ontzorgbundels en diensten van QK Commerce Solutions',
    url: abs('/pakketten'),
    itemListElement: [
      ...directions.flatMap((d) =>
        d.tiers
          .filter((t) => t.monthly != null)
          .map((t) => ({
            '@type': 'Offer',
            name: `${d.name}: ${t.name}`,
            description: `${t.forWho} Wat we doen: ${t.weDo.map(stripTodo).filter(Boolean).join('; ')}.`,
            priceCurrency: 'EUR',
            price: t.monthly,
            priceSpecification: { '@type': 'UnitPriceSpecification', price: t.monthly, priceCurrency: 'EUR', unitText: 'maand', valueAddedTaxIncluded: false },
            seller: { '@id': ORG_ID },
          })),
      ),
      ...packages
        .filter((p) => p.price.amount != null)
        .map((p) => ({
          '@type': 'Offer',
          name: p.name,
          description: `${p.summary} (${formatPrice(p.price)}${p.price.setup ? ` + €${p.price.setup} setup` : ''}, excl. btw)`,
          priceCurrency: 'EUR',
          priceSpecification: { '@type': 'PriceSpecification', [p.price.from ? 'minPrice' : 'price']: p.price.amount, priceCurrency: 'EUR', valueAddedTaxIncluded: false },
          seller: { '@id': ORG_ID },
        })),
    ],
  };
}

export function faqLd(items: QA[], path: string) {
  const list = items.filter((i) => !/TODO/.test(i.q + i.a));
  if (!list.length) return null;
  const strip = (h: string) => stripTodo(h.replace(/<[^>]+>/g, ''));
  return {
    '@type': 'FAQPage',
    '@id': `${abs(path)}#faq`,
    mainEntity: list.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: strip(i.a) } })),
  };
}

export function breadcrumbLd(items: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.href) })),
  };
}

export function articleLd(opts: { title: string; description: string; path: string; pubDate: Date; updatedDate?: Date; author?: string }) {
  const url = abs(opts.path);
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: opts.title,
    description: opts.description,
    url,
    mainEntityOfPage: url,
    datePublished: opts.pubDate.toISOString(),
    dateModified: (opts.updatedDate ?? opts.pubDate).toISOString(),
    inLanguage: 'nl-NL',
    image: `${url}/opengraph-image`,
    author: { '@id': `${siteConfig.url}/over-ons#quinten`, '@type': 'Person', name: opts.author ?? siteConfig.founder.name },
    publisher: { '@id': ORG_ID },
  };
}

export function webPageLd(opts: { path: string; title: string; description: string; type?: string }) {
  const url = abs(opts.path);
  return { '@type': opts.type ?? 'WebPage', '@id': `${url}#webpage`, url, name: opts.title, description: opts.description, inLanguage: 'nl-NL', isPartOf: { '@id': SITE_ID }, about: { '@id': ORG_ID } };
}

export function graph(...nodes: unknown[]) {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) };
}
