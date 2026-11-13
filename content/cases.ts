/**
 * CASES. Alleen approved: true wordt gepubliceerd (pagina, lijsten, sitemap,
 * llms.txt). Verzin geen resultaten of quotes: laat ze TODO tot je ze aanlevert.
 *
 * Screenshots: zet bestanden in /public/cases/<slug>/desktop.jpg en mobile.jpg
 * en vul de paden hieronder in.
 */
export type Metric = { value: number; prefix?: string; suffix: string; label: string };
export type Case = {
  slug: string;
  /** Kerncijfers (alleen echte, aangeleverde resultaten). */
  metrics?: Metric[];
  /** Korte resultaatregel voor kaarten. */
  highlight?: string;
  approved: boolean;
  featured: number | null; // 1-3 = positie op de homepage
  client: string;
  title: string;
  description: string;
  branch: string;
  region: string;
  context: 'agency' | 'in-dienst' | 'concept';
  contextNote?: string;
  role: string[];
  tags: string[];
  relatedService: { line: string; sub?: string };
  challenge: string;
  approach: string;
  deliverables: string[];
  style?: string;
  result: string;
  quote: { text: string; name: string; role?: string };
  url: string;
  urlLive: boolean;
  screenshots: { desktop?: string; mobile?: string; alt?: string };
};

const TODO_QUOTE = { text: 'TODO: klantquote', name: 'TODO: naam', role: 'TODO: functie' };

export const cases: Case[] = [
  {
    slug: 'miedema-groep',
    approved: true,
    featured: null,
    client: 'Miedema Groep',
    title: 'Een corporate website voor vijf divisies',
    description: 'Nieuwe corporate website voor het Leeuwarder familiebedrijf in bouwmaterialen en houtbewerking.',
    branch: 'Bouwmaterialen & houtbewerking',
    region: 'Leeuwarden',
    context: 'in-dienst',
    contextNote: 'Uitgevoerd als e-commercespecialist bij Miedema.',
    role: ['Ontwerp van de nieuwe corporate website', 'Bouw en livegang'],
    tags: ['Website', 'Corporate'],
    relatedService: { line: 'websites', sub: 'laten-maken' },
    challenge: 'Vijf divisies onder één dak: bouwmaterialen, houtbewerking, scheepshout, prefab dakkapellen en kozijnen, en biobased isolatie. De site moest al die activiteiten helder presenteren en bezoekers de weg wijzen naar de webshop en naar een offerte. TODO: aanvullen met de situatie vóór de nieuwe site.',
    approach: 'Een fotogedreven site met een duidelijke opbouw per divisie, stoere Nederlandse koppen en korte uppercase taglines. Op elke pagina een route naar offerte of contact. TODO: aanvullen.',
    deliverables: ['Site voor vijf divisies', 'Productpagina\'s voor gevelbekleding', 'Dronevideo van het terrein', 'Offerte-CTA\'s op elke pagina', 'Koppeling met de webshop', 'Transactionele e-mail via eigen subdomein'],
    result: 'TODO: resultaat aanleveren (alleen onderbouwde cijfers).',
    quote: TODO_QUOTE,
    url: 'https://miedemagroep.nl',
    urlLive: true,
    screenshots: {},
  },
  {
    slug: 'crossing-of-limits',
    approved: true,
    featured: 3,
    client: 'Crossing of Limits',
    title: 'Een cinematische site voor motorreizen',
    description: 'Tweetalige site voor begeleide motorreizen door Spanje en Marokko, met een aanvraagflow in plaats van directe boeking.',
    branch: 'Reisorganisatie (motorreizen)',
    region: 'Nederland',
    context: 'agency',
    role: ['Ontwerp', 'Bouw', 'Beheer'],
    tags: ['Website', 'Beheer'],
    relatedService: { line: 'websites', sub: 'laten-maken' },
    challenge: 'Elke reis is anders: groepsreizen, individuele reizen en maatwerk. Direct online boeken past daar niet bij. De site moest het avontuur laten voelen én reizigers naar een persoonlijke aanvraag leiden. TODO: aanvullen.',
    approach: 'Een donkere, cinematische site met een hero-video. In plaats van een boekingsmodule kwam er een "Plan je avontuur"-flow, met de reisvoorwaarden en garantieregeling geïntegreerd. TODO: aanvullen.',
    deliverables: ['Tweetalige site (NL/EN)', 'Groeps-, individuele en maatwerkreizen', 'Bestemmingspagina\'s', 'FAQ', '"Plan je avontuur"-aanvraagflow', 'Reisvoorwaarden en garantieregeling geïntegreerd'],
    style: 'Donker en cinematisch, met een hero-video.',
    result: 'TODO: resultaat aanleveren.',
    quote: TODO_QUOTE,
    url: 'https://crossingoflimits.nl',
    urlLive: true,
    screenshots: {},
  },
  {
    slug: 'lado-bridal',
    approved: true,
    featured: 2,
    highlight: 'Van onzichtbaar naar #1 in de niche, zonder ads',
    metrics: [
      { value: 1, prefix: '#', suffix: '', label: 'SEO-positie binnen de niche' },
      { value: 3, suffix: '', label: 'boekingen in 1 week via SEO' },
      { value: 0, prefix: '€', suffix: '', label: 'advertentiebudget' },
    ],
    client: 'Lado Bridal',
    title: 'Van onzichtbaar naar #1 in de niche, zonder één advertentie',
    description: 'Tweetalige site voor bruidsstyling (haar en make-up) uit Leeuwarden, met regionale landingspagina\'s voor heel Noord-Nederland.',
    branch: 'Bruidsstyling (haar & make-up)',
    region: 'Leeuwarden, actief in heel Noord-Nederland',
    context: 'agency',
    role: ['Ontwerp en bouw', 'SEO en GEO', 'Beheer'],
    tags: ['Website', 'SEO', 'GEO'],
    relatedService: { line: 'vindbaarheid', sub: 'lokale-seo' },
    challenge: 'Bruiden zoeken hun stylist maanden van tevoren, vaak in de regio van hun trouwlocatie. De site moest de sfeer laten zien, vertrouwen wekken en gevonden worden in heel Noord-Nederland. TODO: aanvullen.',
    approach: 'Een warme, elegante site in crèmetinten met serif-typografie. Portfolio en prijzen zijn makkelijk te vinden, regionale landingspagina\'s zorgen voor lokale vindbaarheid, en een intake kan via formulier of WhatsApp. TODO: aanvullen.',
    deliverables: ['Tweetalige site (NL/EN)', 'Portfolio met reviews', 'Prijzenpagina', 'Regionale landingspagina\'s', 'FAQ', 'Intake via formulier en WhatsApp'],
    style: 'Warm en elegant, crème, serif.',
    result: 'Van online onzichtbaar naar de hoogste SEO-positie binnen de niche. In één week kwamen er 3 boekingen binnen via SEO, en de zichtbaarheid in Google en AI-assistenten levert doorlopend leads op. Zonder enige betaalde advertentie.',
    quote: TODO_QUOTE,
    url: 'https://ladobridal.com',
    urlLive: true,
    screenshots: {},
  },
  {
    slug: 'miedema-webshop',
    approved: true,
    featured: 1,
    highlight: '+75% omzet binnen 11 maanden',
    metrics: [
      { value: 75, prefix: '+', suffix: '%', label: 'omzet binnen 11 maanden' },
      { value: 80, prefix: '+', suffix: '%', label: 'meer orders' },
      { value: 575, suffix: '+', label: 'nieuwe klanten' },
    ],
    client: 'Miedema Bouwmaterialen',
    title: '+75% omzet in 11 maanden voor een B2B/B2C-webshop',
    description: 'Webshopbeheer, e-commercestrategie en groei voor een brede bouwmaterialen-webshop in Noord-Nederland: 75% meer omzet, 80% meer orders en 575+ nieuwe klanten binnen 11 maanden.',
    branch: 'Webshop bouwmaterialen (B2B en B2C)',
    region: 'Noord-Nederland',
    context: 'in-dienst',
    contextNote: 'Uitgevoerd als e-commercespecialist bij Miedema. De webshop is niet door ons gebouwd: het gaat om beheer en doorontwikkeling.',
    role: ['Webshopbeheer', 'E-commercestrategie', 'Groei'],
    tags: ['Webshopbeheer', 'E-commerce'],
    relatedService: { line: 'webshops', sub: 'beheer' },
    challenge: 'Een brede catalogus voor zakelijke en particuliere klanten. Zakelijke accounts met nettoprijzen, snel bestellen via een lijst of XML-upload, levering op de bouwplaats en afhalen in Leeuwarden en Heerenveen.',
    approach: 'Als e-commercespecialist was ik verantwoordelijk voor beheer, strategie en groei van de webshop, met de focus op zakelijke klanten. TODO: beschrijf concreet wat je deed (bijv. assortiment, data-dashboard, conversie, campagnes, budget en plan van aanpak).',
    deliverables: ['Webshopbeheer en doorontwikkeling', 'E-commercestrategie, met focus op B2B', 'TODO: concrete verbeteringen (bijv. assortiment, dashboard, conversie, campagnes)'],
    result: 'Binnen 11 maanden groeide de omzet met 75%, steeg het aantal orders met 80% en kwamen er meer dan 575 nieuwe klanten bij.',
    quote: TODO_QUOTE,
    url: 'https://miedemabouwmaterialen.nl',
    urlLive: true,
    screenshots: {},
  },
  {
    slug: 'wierenga-de-graaf',
    approved: false,
    featured: null,
    client: 'Wierenga & De Graaf',
    title: 'Concept: een nieuwe site voor recruitment en executive search',
    description: 'Concept en redesignvoorstel voor een recruitment- en executive-searchbureau in Friesland, inclusief SEO/GEO-opzet.',
    branch: 'Recruitment & executive search',
    region: 'Friesland',
    context: 'concept',
    contextNote: 'Concept / redesignvoorstel. De huidige website van Wierenga & De Graaf is niet door ons gemaakt.',
    role: ['Concept en redesignvoorstel', 'SEO/GEO-opzet'],
    tags: ['Concept', 'Webdesign', 'SEO'],
    relatedService: { line: 'websites', sub: 'redesign' },
    challenge: 'TODO: aanleiding voor het redesignvoorstel.',
    approach: 'TODO: keuzes in structuur, ontwerp en SEO/GEO-opzet.',
    deliverables: ['Concept / redesignvoorstel', 'SEO/GEO-opzet'],
    result: 'TODO: alleen invullen als het concept wordt uitgevoerd.',
    quote: TODO_QUOTE,
    url: 'TODO: URL van het concept',
    urlLive: false,
    screenshots: {},
  },
];

import { showTodos } from '@/lib/todo';
export const visibleCases = () => cases.filter((c) => c.approved || showTodos);
export const featuredCases = () => visibleCases().filter((c) => c.featured).sort((a, b) => (a.featured ?? 9) - (b.featured ?? 9)).slice(0, 3);
export const caseHref = (slug: string) => `/cases/${slug}`;
