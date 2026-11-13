/**
 * ALLE PRIJZEN. Bedragen in hele euro's, excl. btw.
 * Pas hier een prijs aan en hij verandert overal: dienstpagina's, bundels,
 * calculator, vergelijkingstabel, structured data (OfferCatalog) en llms.txt.
 *
 * price.amount = null  → "op offerte"
 * price.from = true    → "vanaf"
 * price.unit           → 'eenmalig' | 'mnd' | 'p.p.'
 * price.setup          → eenmalige setupkosten naast een maandprijs
 */

export const VAT_NOTE = 'Alle prijzen zijn exclusief btw.';
export const AD_BUDGET_NOTE = 'Excl. advertentiebudget: dat betaal je rechtstreeks aan Google, Meta of TikTok.';

export type Unit = 'eenmalig' | 'mnd' | 'p.p.';
export type Price = { amount: number | null; from?: boolean; unit: Unit; setup?: number; extra?: string };
/** Categorieën voor de pakketkiezer op /pakketten. */
export type Category = 'beheer' | 'development' | 'marketing' | 'ecommerce' | 'ai' | 'consultancy';
export const categories: { id: Category; label: string; mono: string; text: string }[] = [
  { id: 'beheer', label: 'Beheer & onderhoud', mono: 'BEHEER', text: 'Je site of webshop veilig, actueel en bewaakt. Elke maand.' },
  { id: 'development', label: 'Development & maatwerk', mono: 'DEV', text: 'Nieuwe sites en webshops, Magento, koppelingen en maatwerk.' },
  { id: 'marketing', label: 'Marketing & vindbaarheid', mono: 'MARKETING', text: 'SEO, GEO, Google Ads, Meta Ads en e-mailcampagnes.' },
  { id: 'ecommerce', label: 'E-commerce & groei', mono: 'E-COM', text: 'Alles rondom je webshop: beheer, conversie, feeds, ads en e-mail.' },
  { id: 'ai', label: 'AI', mono: 'AI', text: 'Workshops, chatbots, automatisering en AI-oplossingen op maat.' },
  { id: 'consultancy', label: 'Consultancy', mono: 'CONSULT', text: 'Elke week een vaste sparringpartner voor e-commerce en online marketing.' },
];

export type Pkg = {
  id: string;
  line: LineId;
  categories: Category[];
  /** Placeholder zolang de prijs nog niet is bepaald (amount: null). */
  priceTodo?: string;
  name: string;
  summary: string;
  includes: string[];
  price: Price;
  adBudget?: string;
};
export type LineId = 'websites' | 'webshops' | 'development' | 'onderhoud' | 'vindbaarheid' | 'advertenties' | 'ai' | 'consultancy';

export const packages: Pkg[] = [
  // 2.1 Websites
  { id: 'web-start', line: 'websites', categories: ['development'], name: 'Web Start', summary: 'Een professionele site van 1–5 pagina\'s, snel online.', includes: ['1–5 pagina\'s', 'Mobiel-first ontwerp', 'Basis-SEO', 'Google Bedrijfsprofiel gekoppeld', 'Structured data (JSON-LD)'], price: { amount: 1195, unit: 'eenmalig' } },
  { id: 'web-groei', line: 'websites', categories: ['development'], name: 'Web Groei', summary: 'Een site op maat die aanvragen moet opleveren.', includes: ['6–15 pagina\'s', 'Maatwerkdesign', 'Copywriting', 'Lokale landingspagina\'s', 'Conversietracking'], price: { amount: 2450, from: true, unit: 'eenmalig' } },
  { id: 'web-maatwerk', line: 'websites', categories: ['development'], name: 'Web Maatwerk', summary: 'Een animatierijke site met koppelingen, ook meertalig.', includes: ['Animatierijk ontwerp', 'Integraties en koppelingen', 'Meertalig'], price: { amount: 4000, from: true, unit: 'eenmalig' } },
  { id: 'website-audit', line: 'websites', categories: ['beheer', 'development'], name: 'Website-audit', summary: 'Weten waar je staat, met een prioriteitenlijst.', includes: ['Techniek en snelheid', 'SEO en GEO', 'Beveiliging', 'Rapport met prioriteitenlijst'], price: { amount: 395, unit: 'eenmalig' } },

  // 2.2 Webshops
  { id: 'shop-start', line: 'webshops', categories: ['development', 'ecommerce'], name: 'Shop Start', summary: 'Een Shopify-webshop die meteen kan verkopen.', includes: ['Shopify', 'Tot 50 producten', 'iDEAL en betaalmethoden', 'Basistracking (GA4, Meta Pixel)'], price: { amount: 2750, from: true, unit: 'eenmalig' } },
  { id: 'shop-groei', line: 'webshops', categories: ['development', 'ecommerce'], name: 'Shop Groei', summary: 'Een webshop die klaar is om te schalen.', includes: ['Tot 500 producten', 'Productfeeds (Google Merchant, Meta-catalogus)', 'E-mailflows', 'CRO-basis'], price: { amount: 4950, from: true, unit: 'eenmalig' } },
  { id: 'migratie', line: 'webshops', categories: ['development', 'ecommerce'], name: 'Migratie naar Shopify', summary: 'Van WooCommerce of Magento naar Shopify, zonder je posities te verliezen.', includes: ['Producten, klanten en bestellingen', '301-redirects', 'Controle na livegang'], price: { amount: 1500, from: true, unit: 'eenmalig' } },
  { id: 'cro', line: 'webshops', categories: ['ecommerce', 'marketing'], name: 'E-commerce strategie & CRO', summary: 'Meer omzet uit hetzelfde verkeer.', includes: ['Conversie-analyse', 'A/B-testplan', 'Maandelijkse CRO-review'], price: { amount: null, unit: 'mnd' } },

  // 2.3 Onderhoud
  { id: 'zorg-basis', line: 'onderhoud', categories: ['beheer'], name: 'Zorg Basis', summary: 'Je site veilig en up-to-date, zonder omkijken.', includes: ['Hosting', 'SSL-certificaat', 'Updates', 'Dagelijkse back-ups', 'Uptime-monitoring'], price: { amount: 49, unit: 'mnd' } },
  { id: 'zorg-plus', line: 'onderhoud', categories: ['beheer'], name: 'Zorg Plus', summary: 'Basis, plus wijzigingen en een maandrapport.', includes: ['Alles van Zorg Basis', '1 uur wijzigingen per maand', 'Maandrapport van één pagina', 'Beveiligingsscan'], price: { amount: 99, unit: 'mnd' } },
  { id: 'zorg-webshop', line: 'onderhoud', categories: ['beheer', 'ecommerce'], name: 'Zorg Webshop', summary: 'Je Shopify-winkel beheerd en bewaakt.', includes: ['Shopify-beheer', 'App-updates', 'Productmutaties', 'Checkout-bewaking'], price: { amount: 149, unit: 'mnd' } },

  // 2.4 Vindbaarheid
  { id: 'bedrijfsprofiel-setup', line: 'vindbaarheid', categories: ['marketing'], name: 'Bedrijfsprofiel-setup', summary: 'Gevonden in Google Maps, Bing en Apple Kaarten.', includes: ['Google Bedrijfsprofiel', 'Bing Places', 'Apple Business Connect', 'Categorieën en foto\'s', 'Reviewlink'], price: { amount: 245, unit: 'eenmalig' } },
  { id: 'geo-scan', line: 'vindbaarheid', categories: ['marketing', 'ai'], name: 'GEO-scan', summary: 'Hoe ChatGPT, Gemini, Perplexity en Claude jouw bedrijf noemen.', includes: ['Meting in 4 AI-assistenten', 'Concurrentievergelijking', 'Verbeterlijst'], price: { amount: 245, unit: 'eenmalig', extra: 'Gratis mini-versie in de Online Check' } },
  { id: 'lokaal-zichtbaar', line: 'vindbaarheid', categories: ['marketing'], name: 'Lokaal Zichtbaar', summary: 'Elke maand beter gevonden in je eigen regio.', includes: ['Beheer Bedrijfsprofiel', 'Reviewopvolging', '1–2 lokale pagina\'s per maand', 'GEO-monitoring'], price: { amount: 395, unit: 'mnd' } },
  { id: 'seo-geo-groei', line: 'vindbaarheid', categories: ['marketing', 'ecommerce'], name: 'SEO + GEO Groei', summary: 'Structureel groeien in Google én in AI-antwoorden.', includes: ['Contentplan', 'Technische SEO', 'Structured data', 'AI-citatiemeting'], price: { amount: 795, unit: 'mnd' } },

  // 2.5 Advertenties
  { id: 'google-ads-lokaal', line: 'advertenties', categories: ['marketing'], name: 'Google Ads Lokaal', summary: 'Bovenaan in Google op het moment dat iemand zoekt.', includes: ['Search-campagnes', 'Conversietracking', 'Maandrapport'], price: { amount: 275, unit: 'mnd', setup: 345 }, adBudget: 'Advertentiebudget tot €1.500/mnd' },
  { id: 'google-ads-shop', line: 'advertenties', categories: ['marketing', 'ecommerce'], name: 'Google Ads Shop', summary: 'Shopping en Performance Max voor webshops.', includes: ['Shopping / Performance Max', 'Feedbeheer', 'Sturen op ROAS'], price: { amount: 495, unit: 'mnd', setup: 495 }, adBudget: 'Advertentiebudget €1.500–€5.000/mnd' },
  { id: 'meta-ads', line: 'advertenties', categories: ['marketing', 'ecommerce'], name: 'Meta Ads', summary: 'Facebook en Instagram, gestructureerd getest.', includes: ['Campagnestructuur', 'Doelgroepen', 'Testen', 'Rapportage', 'Creatives lever je zelf aan'], price: { amount: 545, unit: 'mnd' } },
  { id: 'meta-ads-creatives', line: 'advertenties', categories: ['marketing', 'ecommerce'], name: 'Meta Ads + Creatives', summary: 'Meta Ads inclusief advertenties die we voor je maken.', includes: ['Alles van Meta Ads', '6–10 statische of video-advertenties per maand'], price: { amount: 1195, unit: 'mnd' } },
  { id: 'tiktok-ads', line: 'advertenties', categories: ['marketing', 'ecommerce'], name: 'TikTok Ads', summary: 'Voor merken met een jonge doelgroep.', includes: ['Op aanvraag'], price: { amount: null, unit: 'mnd' } },

  // 2.6 AI
  { id: 'ai-kennismaking', line: 'ai', categories: ['ai'], name: 'AI-Kennismaking', summary: 'Open groep: middagworkshop van 3 uur in Leeuwarden.', includes: ['Veilig werken met ChatGPT, Copilot en Claude', 'Oefenen met praktijkvoorbeelden', 'Open inschrijving'], price: { amount: 195, unit: 'p.p.' } },
  { id: 'ai-teamworkshop', line: 'ai', categories: ['ai'], name: 'AI-Teamworkshop', summary: 'In-company, halve dag, max. 12 personen.', includes: ['Oefenen met eigen werk', 'AI-geletterdheidsdossier', 'AI-beleid en toolregister', 'Data-do\'s en -don\'ts', 'Presentielijst'], price: { amount: 1295, unit: 'eenmalig', extra: 'Hele dag €1.950' } },
  { id: 'ai-quickscan', line: 'ai', categories: ['ai'], name: 'AI-Quickscan', summary: 'Waar levert AI jou tijd op?', includes: ['Intake', 'Procesinventarisatie', '3 quick wins', 'Tijdsbaseline'], price: { amount: 795, unit: 'eenmalig' } },
  { id: 'ai-chatbot', line: 'ai', categories: ['ai', 'ecommerce'], name: 'AI-Chatbot', summary: 'Een FAQ- of klantenservicebot op je site of shop.', includes: ['Kennisbank gevuld', 'Getest op jouw vragen', 'Op je site of webshop'], price: { amount: 1250, unit: 'eenmalig', extra: '+ €129/mnd' } },
  { id: 'ai-automatisering', line: 'ai', categories: ['ai', 'development'], name: 'AI-Automatisering', summary: 'Eén workflow die je werk uit handen neemt.', includes: ['n8n of Make', 'Bijv. leadopvolging, offertes, mail-triage of productteksten'], price: { amount: 1750, from: true, unit: 'eenmalig', extra: 'per workflow' } },
  { id: 'ai-partner', line: 'ai', categories: ['ai', 'beheer'], name: 'AI-Partner', summary: 'Een vaste AI-sparringpartner.', includes: ['Maandelijks spreekuur', 'Onderhoud bots en workflows', 'Eén nieuwe use case per kwartaal'], price: { amount: 295, from: true, unit: 'mnd' } },

  // Magento
  { id: 'magento-beheer', line: 'webshops', categories: ['beheer', 'ecommerce'], name: 'Magento-beheer', summary: 'Je Magento-webshop veilig, snel en up-to-date.', includes: ['Security-patches en updates', 'Extensies bijwerken', 'Monitoring en back-ups', 'Kleine wijzigingen'], price: { amount: null, unit: 'mnd' }, priceTodo: 'TODO: maandprijs Magento-beheer' },
  { id: 'magento-development', line: 'webshops', categories: ['development', 'ecommerce'], name: 'Magento-development', summary: 'Nieuwe functies, extensies en upgrades voor Magento (Adobe Commerce).', includes: ['Maatwerkfunctionaliteit', 'Extensies en koppelingen', 'Versie-upgrades', 'Performance'], price: { amount: null, unit: 'eenmalig' }, priceTodo: 'TODO: uurtarief of vanaf-prijs Magento-development' },

  // Development & maatwerk
  { id: 'maatwerk-development', line: 'development', categories: ['development', 'ecommerce'], name: 'Maatwerk-development', summary: 'Functionaliteit die niet standaard bestaat: configurators, B2B-functies, eigen tools.', includes: ['Analyse en technisch ontwerp', 'Bouw en testen', 'Documentatie', 'Onderhoud mogelijk via beheer'], price: { amount: null, unit: 'eenmalig' }, priceTodo: 'TODO: uurtarief of vanaf-prijs maatwerk' },
  { id: 'koppelingen', line: 'development', categories: ['development', 'ecommerce'], name: 'Koppelingen & integraties', summary: 'Webshop, ERP, PIM, voorraad, boekhouding en verzending met elkaar laten praten.', includes: ['ERP- en PIM-koppelingen', 'Voorraad en orders synchroon', 'Boekhouding en verzending', 'Monitoring van de koppeling'], price: { amount: null, unit: 'eenmalig' }, priceTodo: 'TODO: vanaf-prijs per koppeling' },
  { id: 'development-strippenkaart', line: 'development', categories: ['development', 'beheer'], name: 'Development-uren', summary: 'Een vaste bundel uren voor doorlopende verbeteringen.', includes: ['Voor sites én webshops', 'Shopify, Magento en WordPress', 'Prioriteiten samen bepalen', 'Maandelijks overzicht'], price: { amount: null, unit: 'mnd' }, priceTodo: 'TODO: prijs per uurbundel (bijv. 10 uur)' },

  // E-mail
  { id: 'email-flows', line: 'advertenties', categories: ['marketing', 'ecommerce'], name: 'E-mailflows', summary: 'Automatische e-mails die verkopen terwijl jij slaapt.', includes: ['Welkomstreeks', 'Verlaten winkelmandje', 'Na aankoop en herhaalaankoop', 'Klaviyo of Mailchimp ingericht'], price: { amount: null, unit: 'eenmalig' }, priceTodo: 'TODO: prijs set-up e-mailflows' },
  { id: 'email-campagnes', line: 'advertenties', categories: ['marketing', 'ecommerce'], name: 'E-mailcampagnes op maat', summary: 'Nieuwsbrieven en campagnes in jouw stijl, met segmentatie.', includes: ['Campagnekalender', 'Ontwerp en teksten', 'Segmentatie', 'Rapportage op omzet'], price: { amount: null, unit: 'mnd' }, priceTodo: 'TODO: maandprijs e-mailcampagnes (bijv. per aantal mails)' },

  // AI op maat
  { id: 'ai-maatwerk', line: 'ai', categories: ['ai', 'development'], name: 'AI-oplossing op maat', summary: 'Een AI-toepassing die precies past: agents, kennisbanken, interne tools.', includes: ['Analyse en ontwerp', 'Bouw en koppeling met je systemen', 'Testen met echte data', 'Privacy en beveiliging vastgelegd'], price: { amount: null, unit: 'eenmalig' }, priceTodo: 'TODO: vanaf-prijs AI-oplossing op maat' },

  // Consultancy
  { id: 'consult-uur', line: 'consultancy', categories: ['consultancy'], name: 'Losse sessie', summary: 'Eén strategiesessie van een uur over je webshop, marketing of SEO.', includes: ['Online of op locatie', 'Voorbereiding op basis van je data', 'Kort verslag met actiepunten'], price: { amount: null, unit: 'eenmalig' }, priceTodo: 'TODO: uurtarief consultancy' },
  { id: 'consult-wekelijks', line: 'consultancy', categories: ['consultancy', 'ecommerce', 'marketing'], name: 'Wekelijkse sparring', summary: 'Elke week 1 uur met een e-commercespecialist: campagnes, SEO, strategie en keuzes.', includes: ['Elke week 1 uur (online of op locatie)', 'Je eigen team voert uit, wij sturen bij', 'Review van campagnes, SEO en cijfers', 'Bereikbaar via WhatsApp tussendoor', 'Maandelijkse prioriteitenlijst'], price: { amount: null, unit: 'mnd' }, priceTodo: 'TODO: maandprijs 4 uur consultancy (1 uur per week)' },
  { id: 'consult-strategie', line: 'consultancy', categories: ['consultancy', 'ecommerce'], name: 'Groeistrategie', summary: 'Een groeiplan voor je webshop of marketing, plus wekelijkse begeleiding bij de uitvoering.', includes: ['Analyse van data, kanalen en marges', 'Groeiplan voor 3 maanden met KPI\'s', 'Elke week 1 uur sparring', 'Kwartaalevaluatie en nieuw plan'], price: { amount: null, unit: 'mnd' }, priceTodo: 'TODO: maandprijs Groeistrategie' },
];

export const pkg = (id: string): Pkg => {
  const p = packages.find((x) => x.id === id);
  if (!p) throw new Error(`Onbekend pakket: ${id}`);
  return p;
};
export const packagesFor = (line: LineId) => packages.filter((p) => p.line === line);
export const packagesIn = (c: Category) => packages.filter((p) => p.categories.includes(c));

/* ---------------- Ontzorgbundels (/pakketten) ---------------- */
export type Bundle = {
  id: string;
  name: string;
  tagline: string;
  forWho: string;
  monthly: number;
  featured?: boolean;
  modules: string[]; // ids uit packages
  includes: string[];
  excludes: string[];
  extra?: string;
};

export const bundles: Bundle[] = [
  {
    id: 'lokaal',
    name: 'Ontzorgd Lokaal',
    tagline: 'Je website veilig en je bedrijf zichtbaar in de buurt.',
    forWho: 'Voor lokale dienstverleners: vakmensen, salons, praktijken.',
    monthly: 199,
    modules: ['zorg-plus'],
    includes: ['Zorg Plus: hosting, updates, back-ups, 1 uur wijzigingen', 'Beheer Bedrijfsprofiel en reviews', 'GEO-monitoring in AI-assistenten', 'Kwartaalgesprek', 'Setup inbegrepen'],
    excludes: ['Advertentiebeheer', 'Nieuwe pagina\'s of content (los te bestellen)', 'Advertentiebudget'],
    extra: 'Bij 12 maanden looptijd: een Web Start-site voor €595 (normaal €1.195).',
  },
  {
    id: 'groei',
    name: 'Ontzorgd Groei',
    tagline: 'Gevonden in Google, Maps én AI. Plus advertenties die je kunt volgen.',
    forWho: 'Voor bedrijven die structureel meer aanvragen willen.',
    monthly: 745,
    featured: true,
    modules: ['zorg-plus', 'lokaal-zichtbaar', 'google-ads-lokaal', 'ai-teamworkshop'],
    includes: ['Zorg Plus', 'Lokaal Zichtbaar: Bedrijfsprofiel, reviews, lokale pagina\'s, GEO', 'Google Ads Lokaal (budget tot €1.500/mnd)', 'Eén AI-teamworkshop per jaar, met AI-dossier', 'Setup inbegrepen'],
    excludes: ['Meta Ads', 'Advertentiebudget', 'Nieuwe website (los of via Web Start/Groei)'],
  },
  {
    id: 'webshop',
    name: 'Ontzorgd Webshop',
    tagline: 'Je Shopify-winkel beheerd, gevuld en aan het groeien.',
    forWho: 'Voor webshops op Shopify die willen doorgroeien.',
    monthly: 1195,
    modules: ['zorg-webshop', 'meta-ads', 'google-ads-shop'],
    includes: ['Zorg Webshop: Shopify-beheer, app-updates, productmutaties', 'Meta Ads', 'Google Shopping / Performance Max', 'E-mailflows', 'Maandelijkse CRO-review', 'Setup inbegrepen'],
    excludes: ['Creatives (los: Meta Ads + Creatives)', 'Advertentiebudget', 'Webshopbouw'],
  },
];

/** Wat de modules los zouden kosten per maand (workshop omgerekend per maand). */
export function bundleLooseMonthly(b: Bundle): number {
  return b.modules.reduce((sum, id) => {
    const p = pkg(id);
    if (p.price.amount == null) return sum;
    if (p.price.unit === 'mnd') return sum + p.price.amount;
    if (id === 'ai-teamworkshop') return sum + Math.round(p.price.amount / 12);
    return sum;
  }, 0);
}
export function bundleLooseSetup(b: Bundle): number {
  return b.modules.reduce((s, id) => s + (pkg(id).price.setup ?? 0), 0);
}

/* ---------------- Calculator-modules ---------------- */
export const calculatorModules = [
  'zorg-basis',
  'zorg-plus',
  'zorg-webshop',
  'lokaal-zichtbaar',
  'seo-geo-groei',
  'google-ads-lokaal',
  'google-ads-shop',
  'meta-ads',
  'meta-ads-creatives',
  'magento-beheer',
  'email-campagnes',
  'ai-partner',
] as const;

/* ---------------- Vergelijkingstabel ---------------- */
export const compareRows: { label: string; values: [boolean | string, boolean | string, boolean | string] }[] = [
  { label: 'Hosting, SSL, updates, back-ups', values: [true, true, 'Shopify-beheer'] },
  { label: '1 uur wijzigingen per maand', values: [true, true, false] },
  { label: 'Maandrapport van één pagina', values: [true, true, true] },
  { label: 'Beheer Bedrijfsprofiel en reviews', values: [true, true, false] },
  { label: 'GEO-monitoring (AI-zichtbaarheid)', values: [true, true, false] },
  { label: 'Lokale pagina\'s (1–2 per maand)', values: [false, true, false] },
  { label: 'Google Ads', values: [false, 'Search, lokaal', 'Shopping / PMax'] },
  { label: 'Meta Ads', values: [false, false, true] },
  { label: 'E-mailflows', values: [false, false, true] },
  { label: 'CRO-review', values: [false, false, 'Maandelijks'] },
  { label: 'AI-teamworkshop', values: [false, '1× per jaar', false] },
  { label: 'Overleg', values: ['Per kwartaal', 'Per kwartaal', 'Maandelijks'] },
  { label: 'Setupkosten', values: ['Inbegrepen', 'Inbegrepen', 'Inbegrepen'] },
];

/* ---------------- Spelregels ---------------- */
export const houseRules = [
  { title: '3 maanden, daarna maandelijks opzegbaar', text: 'Geen jaarcontracten. Na de eerste drie maanden zeg je per maand op.' },
  { title: 'Niet tevreden? Geld terug.', text: 'TODO: leg de voorwaarden vast (periode en welk bedrag) in de algemene voorwaarden en vat ze hier in één zin samen.' },
  { title: 'Alles op jouw naam', text: 'Domein, hosting, Google- en Meta-accounts staan op jouw naam. Stop je, dan neem je alles mee.' },
  { title: 'Elke maand één pagina', text: 'Een rapport in gewone taal: wat er gebeurde, wat het opleverde en wat we volgende maand doen.' },
  { title: 'Prijzen excl. btw en advertentiebudget', text: 'Advertentiebudget betaal je rechtstreeks aan Google, Meta of TikTok. Wij rekenen alleen voor het beheer.' },
];

/* ---------------- Formattering ---------------- */
const nf = new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 0 });
export const euro = (n: number) => `€${nf.format(n)}`;
const unitLabel: Record<Unit, string> = { eenmalig: '', mnd: '/mnd', 'p.p.': ' p.p.' };

export function formatPrice(p: Price): string {
  if (p.amount == null) return 'Op offerte';
  return `${p.from ? 'vanaf ' : ''}${euro(p.amount)}${unitLabel[p.unit]}`;
}
export function formatSetup(p: Price): string | null {
  return p.setup ? `+ ${euro(p.setup)} setup` : null;
}
/** Laagste "vanaf"-prijs voor een productlijn (voor kaarten). */
export function lineFrom(line: LineId): string {
  const list = packagesFor(line).filter((p) => p.price.amount != null);
  const monthly = list.filter((p) => p.price.unit === 'mnd');
  if (!list.length) return 'op offerte';
  const pick = (line === 'onderhoud' || line === 'advertenties' ? monthly : list).sort((a, b) => (a.price.amount ?? 0) - (b.price.amount ?? 0))[0];
  return `vanaf ${euro(pick.price.amount!)}${unitLabel[pick.price.unit]}`;
}
