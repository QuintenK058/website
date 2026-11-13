/** BRANCHES: per branche typische problemen en de passende aanpak. */
import type { Item, QA } from './services';

export type Branch = {
  slug: string;
  name: string;
  seoTitle: string;
  description: string;
  headline: [string, string];
  intro: string;
  examples: string[];
  problems: Item[];
  approach: Item[];
  services: { line: string; sub?: string }[];
  bundle: 'lokaal' | 'groei' | 'webshop';
  faq: QA[];
};

export const branches: Branch[] = [
  {
    slug: 'zakelijke-dienstverlening',
    name: 'Zakelijke dienstverlening',
    seoTitle: 'Online marketing en AI voor accountants, adviseurs en makelaars',
    description: 'Website, vindbaarheid en veilig AI-gebruik voor accountants, adviseurs en makelaars in Friesland. Inclusief AI-teamworkshop met AI-geletterdheidsdossier.',
    headline: ['Vertrouwen online.', 'Veilig met AI.'],
    intro: 'Accountants, adviseurs en makelaars verkopen kennis en vertrouwen. Klanten kiezen je na online onderzoek, en steeds vaker na een vraag aan ChatGPT. Tegelijk is dit de branche waar de AI-vraag het grootst is: veel repeterend werk, en veel vertrouwelijke gegevens.',
    examples: ['Accountants en administratiekantoren', 'Financieel adviseurs', 'Makelaars', 'Juridisch en HR-advies'],
    problems: [
      { title: 'Een site die niet laat zien wat je weet', text: 'Algemene teksten over "maatwerk" en "persoonlijk contact" overtuigen niemand.' },
      { title: 'Medewerkers gebruiken AI op eigen houtje', text: 'Klantgegevens in gratis chatbots is een AVG-risico waar je liever niet over leest.' },
      { title: 'Niet genoemd door AI-assistenten', text: 'Een prospect vraagt ChatGPT om een accountant in Leeuwarden. Wie wordt er genoemd?' },
      { title: 'Veel tijd in repeterend werk', text: 'Mails beantwoorden, offertes maken, documenten samenvatten.' },
    ],
    approach: [
      { title: 'Kennis zichtbaar maken', text: 'Specialisaties, werkwijze en antwoorden op klantvragen, citeerbaar voor Google en AI.' },
      { title: 'AI-teamworkshop', text: 'Veilig werken met ChatGPT, Copilot en Claude, met een AI-geletterdheidsdossier.' },
      { title: 'Automatisering', text: 'Leadopvolging, mail-triage en conceptoffertes in een gekoppelde workflow.' },
      { title: 'Lokale vindbaarheid', text: 'Bedrijfsprofiel, reviews en GEO-monitoring.' },
    ],
    services: [{ line: 'ai', sub: 'workshops' }, { line: 'vindbaarheid', sub: 'geo-ai-zichtbaarheid' }, { line: 'websites', sub: 'redesign' }, { line: 'ai', sub: 'automatisering' }],
    bundle: 'groei',
    faq: [
      { q: 'Is AI wel geschikt voor vertrouwelijk werk?', a: 'Ja, mits je goede afspraken maakt over tools en data. Dat is precies waar de teamworkshop en het dossier over gaan. <em>Dit is geen juridisch advies.</em>' },
      { q: 'Mag ik als adviseur adverteren?', a: 'Ja, binnen de regels van je beroepsgroep. We schrijven feitelijke teksten zonder onrealistische beloftes.' },
    ],
  },
  {
    slug: 'bouw-en-installatie',
    name: 'Bouw & installatie',
    seoTitle: 'Website en vindbaarheid voor aannemers, installateurs en schilders',
    description: 'Meer aanvragen voor aannemers, installateurs, elektriciens en schilders in Friesland. Website met projecten, lokale SEO en Google Ads. Vaste prijzen.',
    headline: ['Jij staat op de bouw.', 'Wij regelen online.'],
    intro: 'Je hebt je handen vol aan het werk zelf. Offertes, planning, personeel, materiaal. De website schiet er dan bij in, terwijl klanten je juist online zoeken voordat ze bellen.',
    examples: ['Aannemers', 'Installateurs', 'Elektriciens', 'Schilders', 'Dakdekkers'],
    problems: [
      { title: 'Een verouderde site', text: 'Gebouwd toen het bedrijf startte. Geen recente projecten, geen duidelijke diensten.' },
      { title: 'Niet gevonden op "dienst + plaats"', text: 'Zoekt iemand "warmtepomp installateur Drachten", dan staan anderen bovenaan.' },
      { title: 'Aanvragen via de verkeerde kanalen', text: 'Klanten bellen tijdens het werk, of haken af omdat er geen simpel formulier is.' },
      { title: 'Personeel vinden', text: 'Ook vakmensen kijken eerst online. Een verouderde site helpt niet bij werven.' },
    ],
    approach: [
      { title: 'Projecten laten zien', text: 'Projectfoto\'s, diensten per pagina, keurmerken en certificeringen.' },
      { title: 'Lokaal gevonden', text: 'Bedrijfsprofiel, reviews en pagina\'s per dienst en werkgebied.' },
      { title: 'Aanvragen als jij er klaar voor bent', text: 'Kort offerteformulier, WhatsApp en een terugbelverzoek.' },
      { title: 'Ads aan en uit', text: 'Google Ads aanzetten als je capaciteit hebt, uit als de agenda vol zit.' },
    ],
    services: [{ line: 'websites', sub: 'laten-maken' }, { line: 'vindbaarheid', sub: 'lokale-seo' }, { line: 'advertenties', sub: 'google-ads' }, { line: 'onderhoud' }],
    bundle: 'groei',
    faq: [
      { q: 'Moet ik zelf projectfoto\'s maken?', a: 'Foto\'s met je telefoon van recente projecten zijn vaak al prima. We vertellen wat je het beste kunt fotograferen.' },
      { q: 'Kunnen jullie een vacaturepagina maken?', a: 'Ja, met vacatures die ook in Google gevonden worden.' },
    ],
  },
  {
    slug: 'zorg',
    name: 'Zorg',
    seoTitle: 'Website en vindbaarheid voor fysiotherapeuten en zorgpraktijken',
    description: 'Websites en lokale vindbaarheid voor fysiotherapie en andere zorgpraktijken in Friesland. Duidelijk, toegankelijk en AVG-proof. Vaste prijzen.',
    headline: ['Patiënten zoeken online.', 'Laat ze jou vinden.'],
    intro: 'Patiënten zoeken een praktijk in de buurt, vaak op het moment dat ze klachten hebben. Ze willen snel weten of je kunt helpen, of je vergoed wordt en hoe ze een afspraak maken.',
    examples: ['Fysiotherapeuten', 'Podotherapeuten', 'Psychologen', 'Tandartsen'],
    problems: [
      { title: 'Onduidelijke informatie', text: 'Behandelingen, vergoedingen en aanmelden zijn lastig te vinden.' },
      { title: 'Niet zichtbaar in de buurt', text: 'In Google Maps staan andere praktijken bovenaan, of je openingstijden kloppen niet.' },
      { title: 'Zorgen over privacy', text: 'Formulieren, tracking en AI moeten AVG-proof zijn.' },
      { title: 'Geen tijd', text: 'De agenda zit vol met patiënten.' },
    ],
    approach: [
      { title: 'Toegankelijke site', text: 'Behandelingen, vergoedingen en aanmelden in een paar klikken, goed leesbaar voor iedereen.' },
      { title: 'Lokale vindbaarheid', text: 'Compleet Bedrijfsprofiel en pagina\'s per behandeling.' },
      { title: 'Privacy-proof', text: 'Formulieren zonder onnodige medische gegevens, privacyvriendelijke analytics.' },
      { title: 'Ontzorgd', text: 'Onderhoud, updates en wijzigingen in één abonnement.' },
    ],
    services: [{ line: 'websites', sub: 'laten-maken' }, { line: 'vindbaarheid', sub: 'lokale-seo' }, { line: 'onderhoud' }, { line: 'ai', sub: 'chatbots' }],
    bundle: 'lokaal',
    faq: [
      { q: 'Kunnen jullie ons agendasysteem koppelen?', a: 'Meestal wel, via een module of duidelijke link. TODO: noem systemen waarmee je ervaring hebt.' },
      { q: 'Is analytics toegestaan?', a: 'Ja, als het privacyvriendelijk is ingericht. We gebruiken bij voorkeur cookieloze analytics.' },
    ],
  },
  {
    slug: 'horeca',
    name: 'Horeca',
    seoTitle: 'Website en online marketing voor restaurants, cafés en hotels',
    description: 'Meer reserveringen voor restaurants, cafés en hotels in Friesland. Snelle mobiele website, Google Maps, direct reserveren en Meta Ads.',
    headline: ['Gasten kiezen op hun telefoon.', 'In een paar seconden.'],
    intro: 'Gasten kiezen waar ze gaan eten vaak een uur van tevoren. Ze kijken naar foto\'s, de menukaart, openingstijden en reviews. Klopt dat niet online, dan gaan ze naar de buren.',
    examples: ['Restaurants', 'Cafés en lunchrooms', 'Hotels en B&B\'s'],
    problems: [
      { title: 'Menukaart als pdf', text: 'Onleesbaar op mobiel, en Google kan er niets mee.' },
      { title: 'Verkeerde openingstijden', text: 'Gasten staan voor een dichte deur.' },
      { title: 'Omslachtig reserveren', text: 'Alleen bellen werkt niet meer.' },
      { title: 'Afhankelijk van platforms', text: 'Commissie betalen terwijl gasten ook direct hadden kunnen boeken.' },
    ],
    approach: [
      { title: 'Mobiel en snel', text: 'Grote foto\'s, menukaart in tekst, openingstijden en route.' },
      { title: 'Google Maps', text: 'Altijd actueel profiel met menu, foto\'s en reserveerknop.' },
      { title: 'Direct reserveren', text: 'Een reserveringssysteem op elke pagina.' },
      { title: 'Meta Ads', text: 'Voor events, arrangementen en rustige avonden, gericht op de buurt.' },
    ],
    services: [{ line: 'websites', sub: 'laten-maken' }, { line: 'vindbaarheid', sub: 'google-bedrijfsprofiel' }, { line: 'advertenties', sub: 'meta-ads' }],
    bundle: 'lokaal',
    faq: [
      { q: 'Helpen jullie met reviews?', a: 'We maken het gasten makkelijk om een review te geven, bijvoorbeeld met een QR-code. Nep-reviews doen we nooit.' },
      { q: 'Kan ik de menukaart zelf aanpassen?', a: 'Ja. Of je stuurt een berichtje en wij doen het.' },
    ],
  },
  {
    slug: 'kappers-en-salons',
    name: 'Kappers & salons',
    seoTitle: 'Website en online boekingen voor kappers en schoonheidssalons',
    description: 'Website, Google Bedrijfsprofiel, reviews en online boeken voor kappers, barbers en schoonheidssalons in Friesland. Vaste prijzen, volledig ontzorgd.',
    headline: ['Een volle agenda.', 'Zonder dat jij aan de telefoon hangt.'],
    intro: 'Klanten van kappers en salons kiezen op foto\'s, reviews en hoe makkelijk ze kunnen boeken. Je werk is visueel en lokaal, en daar moet je online zichtbaarheid op aansluiten.',
    examples: ['Kappers en barbers', 'Schoonheidssalons', 'Nagelstudio\'s', 'Bruidsstyling'],
    problems: [
      { title: 'Boekingen via de telefoon', text: 'Bellen tijdens het knippen, terugbellen in de pauze.' },
      { title: 'Werk niet zichtbaar', text: 'Mooie resultaten staan alleen op Instagram, niet op je site.' },
      { title: 'Weinig reviews', text: 'Tevreden klanten vergeten een review te geven.' },
      { title: 'Niet gevonden in de buurt', text: '"Kapper Sneek" levert de concurrent op.' },
    ],
    approach: [
      { title: 'Portfolio en prijzen', text: 'Je werk, je prijzen en je team op één plek.' },
      { title: 'Online boeken', text: 'Je boekingssysteem op elke pagina.' },
      { title: 'Reviewproces', text: 'Een QR-code aan de kassa en opvolging van elke review.' },
      { title: 'Lokaal gevonden', text: 'Bedrijfsprofiel, lokale SEO en GEO.' },
    ],
    services: [{ line: 'websites', sub: 'laten-maken' }, { line: 'vindbaarheid', sub: 'lokale-seo' }, { line: 'vindbaarheid', sub: 'google-bedrijfsprofiel' }, { line: 'advertenties', sub: 'meta-ads' }],
    bundle: 'lokaal',
    faq: [
      { q: 'Kan mijn boekingssysteem gekoppeld worden?', a: 'Bijna altijd. We bouwen het in of zetten een duidelijke boekknop op elke pagina.' },
      { q: 'Hebben jullie ervaring met salons?', a: 'Ja, onder andere met bruidsstyling. Bekijk <a href="/cases">onze cases</a> zodra ze online staan.' },
    ],
  },
  {
    slug: 'webshops',
    name: 'Webshops',
    seoTitle: 'Webshop laten groeien: Shopify, beheer, ads en CRO',
    description: 'Voor kleine tot groeiende webshops: Shopify, webshopbeheer, Meta en Google Shopping, e-mailflows en CRO. Ontzorgd Webshop €1.195/mnd.',
    headline: ['Minder webshopbeheerder.', 'Meer ondernemer.'],
    intro: 'Een webshop runnen is tien banen tegelijk. Wij nemen het online deel over, met ervaring van binnenuit als e-commercespecialist bij een B2B/B2C-webshop.',
    examples: ['Startende webshops', 'Groeiende Shopify-shops', 'B2B-webshops', 'Winkels met een webshop'],
    problems: [
      { title: 'Verkeer, weinig verkopen', text: 'Bezoekers haken af en je weet niet waarom.' },
      { title: 'Ads zonder inzicht', text: 'Is de ROAS echt goed? Klopt de tracking eigenlijk?' },
      { title: 'Achterstallig onderhoud', text: 'Oude apps, haperende koppelingen, producten zonder goede tekst.' },
      { title: 'Eén kanaal', text: 'Bijna alle omzet uit één platform. Wordt dat duurder, dan sta je stil.' },
    ],
    approach: [
      { title: 'Basis op orde', text: 'Snelheid, productdata, tracking en een opgeruimde shop.' },
      { title: 'CRO', text: 'Verbeteringen op product-, categorie- en checkoutpagina\'s.' },
      { title: 'Performance marketing', text: 'Meta en Google Shopping, gestuurd op marge.' },
      { title: 'Retentie', text: 'E-mailflows zodat klanten terugkomen.' },
    ],
    services: [{ line: 'webshops', sub: 'beheer' }, { line: 'webshops', sub: 'magento' }, { line: 'webshops', sub: 'conversie-optimalisatie' }, { line: 'advertenties', sub: 'e-mailmarketing' }, { line: 'advertenties', sub: 'mediabuying' }, { line: 'onderhoud', sub: 'koppelingen' }],
    bundle: 'webshop',
    faq: [
      { q: 'Werken jullie alleen met Shopify?', a: 'Nee. Nieuwe shops bouwen en beheren we op Shopify. Magento-shops runnen we (assortiment, campagnes, conversie), terwijl je eigen Magento-bureau de techniek doet. Heb je WooCommerce, dan bespreken we beheer of een migratie.' },
      { q: 'Doen jullie ook B2B?', a: 'Ja. Zakelijke accounts met nettoprijzen, bestellijsten en prijzen excl. btw vragen een eigen aanpak.' },
    ],
  },
];

export const branch = (slug: string) => branches.find((b) => b.slug === slug);
export const branchHref = (slug: string) => `/branches/${slug}`;
