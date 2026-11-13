/**
 * ALLE PAKKETTEN EN PRIJZEN. De enige plek waar namen en bedragen staan.
 * Bedragen in hele euro's, excl. btw. Bij ads ook excl. advertentiebudget.
 *
 * Structuur: "Eerst je basis, dan je groei. Losse projecten en AI ernaast."
 *   basis   → Zorg Basis / Plus / Webshop
 *   groei   → Ontzorgd Lokaal / Leads / Webshop / Op Maat (basis zit erin)
 *   module  → losse maandmodules (calculator)
 *   project → eenmalige projecten
 *   ai      → AI & workshops
 *   advies  → consultancy (jij voert uit, wij brengen richting en expertise)
 *
 * proposal: true = voorstelprijs, nog te bevestigen.
 */

export const VAT_NOTE = 'Alle prijzen zijn exclusief btw.';
export const AD_BUDGET_NOTE = 'Advertentiebudget betaal je rechtstreeks aan Google of Meta.';

export type Kind = 'basis' | 'groei' | 'module' | 'project' | 'ai' | 'advies';
export type Unit = 'eenmalig' | 'mnd' | 'pp' | 'uur' | 'sessie';
export type Price = { amount: number; from?: boolean; unit: Unit; setup?: number; extra?: string };
export type Pkg = {
  id: string;
  name: string;
  kind: Kind;
  summary: string;
  forWho?: string;
  includes: string[];
  excludes?: string[];
  price: Price;
  /** extra prijsregel, bijv. "Hele dag €1.950" */
  priceNote?: string;
  adBudget?: string;
  /** levertijd voor projecten */
  delivery?: string;
  group?: 'websites' | 'webshops' | 'checks' | 'leren' | 'toepassen' | 'volhouden' | 'doorlopend' | 'eenmalig';
  recommended?: boolean;
  proposal?: boolean;
};

export const packages: Pkg[] = [
  /* ---------------- Basis ---------------- */
  {
    id: 'zorg-basis', name: 'Zorg Basis', kind: 'basis',
    summary: 'Je site veilig en online, zonder omkijken.',
    forWho: 'Je hebt een site en wilt dat hij veilig en online blijft.',
    includes: ['Hosting en SSL', 'Updates', 'Dagelijkse back-ups', 'Uptime-monitoring'],
    excludes: ['Wijzigingen', 'SEO', 'Ads'],
    price: { amount: 49, unit: 'mnd' },
  },
  {
    id: 'zorg-plus', name: 'Zorg Plus', kind: 'basis',
    summary: 'Zorg Basis, plus wijzigingen en een maandrapport.',
    forWho: 'Je wilt ook af en toe iets laten aanpassen.',
    includes: ['Alles uit Zorg Basis', '1 uur wijzigingen per maand', 'Beveiligingsscan', 'Maandrapport van één pagina'],
    excludes: ['SEO', 'Ads', 'Nieuwe pagina\'s buiten het wijzigingsuur'],
    price: { amount: 99, unit: 'mnd' },
  },
  {
    id: 'zorg-webshop', name: 'Zorg Webshop', kind: 'basis',
    summary: 'Je Shopify- of Magento-shop beheerd en bewaakt.',
    forWho: 'Je hebt een Shopify- of Magento-shop.',
    includes: ['Shop-, app- en thema-updates', 'Productmutaties (TODO: aantal per maand)', 'Wekelijkse checkout- en betaalcheck', 'Maandrapport van één pagina'],
    excludes: ['Ads', 'E-mail', 'Nieuwe functies'],
    price: { amount: 149, unit: 'mnd' },
  },

  /* ---------------- Groei (basis zit erin) ---------------- */
  {
    id: 'ontzorgd-lokaal', name: 'Ontzorgd Lokaal', kind: 'groei',
    summary: 'Beter gevonden worden in je regio, zonder ads.',
    forWho: 'Lokale dienstverlener die beter gevonden wil worden zonder ads.',
    includes: ['Zorg Plus (hosting, updates, 1 uur wijzigingen)', 'Beheer Google Bedrijfsprofiel', 'Reviewopvolging', 'GEO-monitoring in 4 AI-assistenten', 'Maandrapport', 'Kwartaalgesprek'],
    excludes: ['Ads', 'Lokale landingspagina\'s', 'Nieuwe content buiten het wijzigingsuur'],
    price: { amount: 199, unit: 'mnd' },
    priceNote: 'Kies je Ontzorgd Lokaal voor 12 maanden, dan kost Web Start €595 in plaats van €1.195.',
  },
  {
    id: 'ontzorgd-leads', name: 'Ontzorgd Leads', kind: 'groei', recommended: true,
    summary: 'Meer aanvragen en telefoontjes, organisch én met Google Ads.',
    forWho: 'Je wilt meer aanvragen en telefoontjes.',
    includes: ['Alles uit Ontzorgd Lokaal', '1–2 lokale pagina\'s per maand', 'Google Ads Lokaal (search)', 'Eén AI-teamworkshop per jaar'],
    excludes: ['Meta Ads', 'Advertentiebudget (betaal je zelf aan Google)'],
    adBudget: 'Aanbevolen advertentiebudget: €500–€1.500 per maand',
    price: { amount: 745, unit: 'mnd' },
  },
  {
    id: 'ontzorgd-webshop', name: 'Ontzorgd Webshop', kind: 'groei',
    summary: 'Meer verkopen met je webshop: ads, e-mail en conversie.',
    forWho: 'Je hebt een webshop en wilt meer verkopen.',
    includes: ['Zorg Webshop', 'Meta Ads', 'Google Shopping / Performance Max met feedbeheer', 'E-mailflows', 'Maandelijkse CRO-review', 'Maandelijks overleg'],
    excludes: ['Advertentiebudget', 'Creatives (los bij te boeken: Meta Ads + Creatives)'],
    adBudget: 'Aanbevolen advertentiebudget: vanaf €1.500 per maand',
    price: { amount: 1195, unit: 'mnd' },
  },
  {
    id: 'ontzorgd-op-maat', name: 'Ontzorgd Op Maat', kind: 'groei', proposal: true,
    summary: 'Voor meerdere kanalen, B2B of meerdere vestigingen.',
    forWho: 'Meerdere kanalen, B2B-webshop of meerdere vestigingen.',
    includes: ['SEO + GEO Groei', 'Google Ads én Meta Ads', 'E-mailflows en -campagnes', 'Elke week 1 strategie-uur', 'Kwartaalplan met KPI\'s'],
    excludes: ['Advertentiebudget', 'Grote nieuwbouwprojecten'],
    price: { amount: 1950, from: true, unit: 'mnd' },
  },

  /* ---------------- Modules (calculator) ---------------- */
  { id: 'lokaal-zichtbaar', name: 'Lokaal Zichtbaar', kind: 'module', summary: 'Bedrijfsprofiel, reviews, 1–2 lokale pagina\'s per maand en GEO-monitoring.', includes: ['Beheer Bedrijfsprofiel', 'Reviewopvolging', '1–2 lokale pagina\'s per maand', 'GEO-monitoring'], price: { amount: 395, unit: 'mnd' } },
  { id: 'seo-geo-groei', name: 'SEO + GEO Groei', kind: 'module', summary: 'Contentplan, technische SEO, structured data en AI-citatiemeting.', includes: ['Contentplan', 'Technische SEO', 'Structured data', 'AI-citatiemeting'], price: { amount: 795, unit: 'mnd' } },
  { id: 'google-ads-lokaal', name: 'Google Ads Lokaal', kind: 'module', summary: 'Search-campagnes in je regio, met conversietracking.', includes: ['Search-campagnes', 'Conversietracking', 'Maandrapport'], price: { amount: 275, unit: 'mnd', setup: 345 }, adBudget: 'Advertentiebudget tot €1.500/mnd' },
  { id: 'google-ads-shop', name: 'Google Ads Shop', kind: 'module', summary: 'Shopping en Performance Max voor webshops.', includes: ['Shopping / Performance Max', 'Feedbeheer', 'Sturen op ROAS'], price: { amount: 495, unit: 'mnd', setup: 495 }, adBudget: 'Advertentiebudget €1.500–€5.000/mnd' },
  { id: 'meta-ads', name: 'Meta Ads', kind: 'module', summary: 'Facebook en Instagram: structuur, doelgroepen en tests. Creatives lever je zelf aan.', includes: ['Campagnestructuur', 'Doelgroepen en tests', 'Rapportage'], price: { amount: 545, unit: 'mnd' } },
  { id: 'meta-ads-creatives', name: 'Meta Ads + Creatives', kind: 'module', summary: 'Meta Ads inclusief 6–10 advertenties per maand die wij maken.', includes: ['Alles uit Meta Ads', '6–10 statische of video-advertenties per maand'], price: { amount: 1195, unit: 'mnd' } },
  { id: 'development-uren', name: 'Development-uren', kind: 'module', proposal: true, summary: '4 uur development per maand voor verbeteringen, functies en koppelingen. Uren schuiven niet door.', includes: ['4 uur per maand (€90 per uur)', 'Shopify, Magento en WordPress', 'Maandelijkse prioriteitenlijst'], price: { amount: 360, unit: 'mnd' } },
  { id: 'ai-partner', name: 'AI-Partner', kind: 'module', group: 'volhouden', summary: 'Maandelijks spreekuur, onderhoud van bots en workflows, één nieuwe use case per kwartaal.', includes: ['Maandelijks spreekuur', 'Onderhoud bots en workflows', 'Eén nieuwe use case per kwartaal', 'Updates van het AI-dossier'], price: { amount: 295, unit: 'mnd' } },

  /* ---------------- Eenmalige projecten ---------------- */
  { id: 'web-start', name: 'Web Start', kind: 'project', group: 'websites', summary: 'Een professionele site van 1–5 pagina\'s.', includes: ['1–5 pagina\'s, mobiel-first', 'Basis-SEO en structured data', 'Google Bedrijfsprofiel gekoppeld'], price: { amount: 1195, unit: 'eenmalig' }, priceNote: 'Met Ontzorgd Lokaal (12 maanden): €595.', delivery: 'TODO: levertijd Web Start' },
  { id: 'web-groei', name: 'Web Groei', kind: 'project', group: 'websites', summary: 'Een site op maat van 6–15 pagina\'s die aanvragen oplevert.', includes: ['6–15 pagina\'s, maatwerkdesign', 'Copywriting', 'Lokale landingspagina\'s', 'Conversietracking'], price: { amount: 2450, from: true, unit: 'eenmalig' }, delivery: 'TODO: levertijd Web Groei' },
  { id: 'web-maatwerk', name: 'Web Maatwerk', kind: 'project', group: 'websites', summary: 'Een geanimeerde site met integraties, ook meertalig.', includes: ['Animatierijk ontwerp', 'Integraties', 'Meertalig'], price: { amount: 4000, from: true, unit: 'eenmalig' }, delivery: 'TODO: levertijd Web Maatwerk' },
  { id: 'shop-start', name: 'Shop Start', kind: 'project', group: 'webshops', summary: 'Een Shopify-webshop tot 50 producten.', includes: ['Shopify, tot 50 producten', 'iDEAL en betaalmethoden', 'Basistracking (GA4, Meta Pixel)'], price: { amount: 2750, from: true, unit: 'eenmalig' }, delivery: 'TODO: levertijd Shop Start' },
  { id: 'shop-groei', name: 'Shop Groei', kind: 'project', group: 'webshops', summary: 'Een webshop tot 500 producten, klaar om te schalen.', includes: ['Tot 500 producten', 'Productfeeds (Google, Meta)', 'E-mailflows', 'CRO-basis'], price: { amount: 4950, from: true, unit: 'eenmalig' }, delivery: 'TODO: levertijd Shop Groei' },
  { id: 'migratie', name: 'Migratie naar Shopify', kind: 'project', group: 'webshops', summary: 'Van WooCommerce of Magento naar Shopify, zonder posities te verliezen.', includes: ['Producten, klanten, bestellingen', '301-redirects', 'Controle na livegang'], price: { amount: 1500, from: true, unit: 'eenmalig' }, delivery: 'TODO: levertijd migratie' },
  { id: 'dev-uur', name: 'Magento- en maatwerkdevelopment', kind: 'project', group: 'webshops', proposal: true, summary: 'Nieuwe functies, extensies, upgrades en B2B-maatwerk. Per uur, of een vaste prijs per project.', includes: ['Magento (Adobe Commerce), Shopify, WordPress', 'B2B-functies, configurators, portalen', 'Vaste projectprijs na technisch ontwerp'], price: { amount: 95, unit: 'uur' }, delivery: 'TODO: levertijd in overleg per project' },
  { id: 'website-audit', name: 'Website-audit', kind: 'project', group: 'checks', summary: 'Techniek, snelheid, SEO, GEO en beveiliging, met prioriteitenlijst.', includes: ['Rapport in gewone taal', 'Prioriteitenlijst'], price: { amount: 395, unit: 'eenmalig' }, delivery: 'TODO: levertijd audit' },
  { id: 'geo-scan', name: 'GEO-scan', kind: 'project', group: 'checks', summary: 'Hoe ChatGPT, Gemini, Perplexity en Claude jouw bedrijf noemen, met verbeterlijst.', includes: ['Meting in 4 AI-assistenten', 'Verbeterlijst'], price: { amount: 245, unit: 'eenmalig' }, priceNote: 'Een mini-versie zit gratis in de Online Check.', delivery: 'TODO: levertijd GEO-scan' },
  { id: 'bedrijfsprofiel-setup', name: 'Bedrijfsprofiel-setup', kind: 'project', group: 'checks', summary: 'Google Bedrijfsprofiel, Bing Places en Apple Business Connect ingericht.', includes: ['Categorieën en diensten', 'Foto\'s', 'Reviewlink'], price: { amount: 245, unit: 'eenmalig' }, delivery: 'TODO: levertijd setup' },
  { id: 'koppeling', name: 'Koppeling', kind: 'project', group: 'checks', proposal: true, summary: 'Webshop of site koppelen aan ERP, PIM, voorraad, boekhouding of verzending.', includes: ['Per koppeling', 'Testen met echte data', 'Monitoring'], price: { amount: 495, from: true, unit: 'eenmalig' }, delivery: 'TODO: levertijd koppeling' },

  /* ---------------- AI & workshops ---------------- */
  { id: 'ai-kennismaking', name: 'AI-Kennismaking', kind: 'ai', group: 'leren', summary: 'Open groep, 3 uur in Leeuwarden: veilig werken met ChatGPT, Copilot en Claude.', includes: ['Open inschrijving', 'Praktijkvoorbeelden'], price: { amount: 195, unit: 'pp' } },
  { id: 'ai-teamworkshop', name: 'AI-Teamworkshop', kind: 'ai', group: 'leren', summary: 'In-company, max. 12 personen, inclusief AI-geletterdheidsdossier.', includes: ['Oefenen met eigen werk', 'AI-geletterdheidsdossier (beleid, toolregister, data-afspraken, presentielijst)'], price: { amount: 1295, unit: 'eenmalig' }, priceNote: 'Halve dag €1.295 · hele dag €1.950' },
  { id: 'ai-quickscan', name: 'AI-Quickscan', kind: 'ai', group: 'toepassen', summary: '3 quick wins en een tijdsbaseline.', includes: ['Intake en procesinventarisatie', '3 quick wins', 'Tijdsbaseline'], price: { amount: 795, unit: 'eenmalig' } },
  { id: 'ai-chatbot', name: 'AI-Chatbot', kind: 'ai', group: 'toepassen', summary: 'Een FAQ- of klantenservicebot op je site of shop.', includes: ['Kennisbank gevuld en getest', 'Hosting en onderhoud van de bot: €129 per maand'], price: { amount: 1250, unit: 'eenmalig', extra: '€129 per maand' } },
  { id: 'ai-automatisering', name: 'AI-Automatisering', kind: 'ai', group: 'toepassen', summary: 'Eén workflow (n8n of Make) die werk uit handen neemt.', includes: ['Bijv. leadopvolging, offertes, mail-triage of productteksten'], price: { amount: 1750, from: true, unit: 'eenmalig', extra: 'per workflow' } },
  { id: 'ai-implementatie', name: 'AI Implementatie', kind: 'ai', group: 'toepassen', summary: 'Quickscan plus één chatbot of workflow, gebouwd, getest en na 30 dagen gemeten.', includes: ['AI-Quickscan', 'Eén chatbot of workflow', 'Meting na 30 dagen'], price: { amount: 1995, from: true, unit: 'eenmalig' }, priceNote: 'Je bespaart tot €550 t.o.v. los.' },

  /* ---------------- Consultancy ---------------- */
  {
    id: 'consultancy-wekelijks', name: 'Consultancy Wekelijks', kind: 'advies', group: 'doorlopend', proposal: true,
    summary: 'Elke week een uur met een specialist. Jouw team voert uit.',
    forWho: 'Je hebt een eigen marketeer of webshopteam en mist een ervaren sparringpartner.',
    includes: ['Elke week 1 uur, online of op locatie', 'Review van campagnes, SEO, webshop en cijfers', 'Actielijst na elke sessie', 'WhatsApp-lijn tussendoor'],
    excludes: ['Uitvoering'],
    price: { amount: 595, unit: 'mnd' },
  },
  {
    id: 'consultancy-maanduren', name: 'Consultancy Maanduren', kind: 'advies', group: 'doorlopend', proposal: true, recommended: true,
    summary: '8 uur per maand, vrij in te zetten waar het nodig is.',
    forWho: 'Je wilt meer dan een wekelijks gesprek: meekijken, meedenken en je team op weg helpen.',
    includes: ['8 uur per maand, vrij te verdelen', 'Sessies, reviews en meelopen met je team', 'Briefings voor je bureau of freelancers', 'Urenoverzicht per maand', 'WhatsApp-lijn tussendoor'],
    excludes: ['Uitvoering'],
    priceNote: 'Meer uren nodig? €125 per uur.',
    price: { amount: 995, unit: 'mnd' },
  },
  {
    id: 'groeistrategie', name: 'Groeistrategie', kind: 'advies', group: 'doorlopend', proposal: true,
    summary: 'Je externe e-commerce- en marketingmanager: plan, ritme en bijsturing.',
    forWho: 'Je wilt richting en regie, maar geen fulltime manager aannemen.',
    includes: ['Plan van aanpak in de eerste maand inbegrepen', 'Wekelijks 1 uur en maandelijks een dagdeel met je team', 'Maandelijkse KPI-review', 'Kwartaalplan en kwartaalreview', 'Aanschuiven bij overleg met bureaus en leveranciers'],
    excludes: ['Uitvoering'],
    price: { amount: 1250, from: true, unit: 'mnd' },
  },
  {
    id: 'strategiesessie', name: 'Strategiesessie', kind: 'advies', group: 'eenmalig', proposal: true,
    summary: 'Eén uur, voorbereid met jouw data. Achteraf een actielijst.',
    includes: ['Vooraf: analyse van je site en cijfers', '1 uur, online of op locatie', 'Actielijst achteraf'],
    price: { amount: 195, unit: 'sessie' },
  },
  {
    id: 'plan-van-aanpak', name: 'Plan van aanpak', kind: 'advies', group: 'eenmalig', proposal: true,
    summary: 'Een compleet plan dat je eigen team kan uitvoeren.',
    forWho: 'Je wilt weten wat je moet doen, in welke volgorde, en wie wat doet.',
    includes: ['Intake en analyse: data, kanalen, site, marges en team', 'Doelen, prioriteiten en een roadmap voor 12 maanden', 'KPI\'s en meetplan', 'Taakverdeling, tools en budget', 'Overdrachtssessie met je team', '30 dagen vragen stellen via WhatsApp'],
    excludes: ['Uitvoering'],
    delivery: 'TODO: levertijd',
    price: { amount: 1495, from: true, unit: 'eenmalig' },
  },
];

export const pkg = (id: string): Pkg => {
  const p = packages.find((x) => x.id === id);
  if (!p) throw new Error(`Onbekend pakket: ${id}`);
  return p;
};
export const byKind = (k: Kind) => packages.filter((p) => p.kind === k);
export const byGroup = (g: NonNullable<Pkg['group']>) => packages.filter((p) => p.group === g);

/* ---------------- Formattering ---------------- */
const nf = new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 0 });
export const euro = (n: number) => `€${nf.format(n)}`;
const shortUnit: Record<Unit, string> = { eenmalig: '', mnd: '/mnd', pp: ' per persoon', uur: ' per uur', sessie: ' per sessie' };
const longUnit: Record<Unit, string> = { eenmalig: ' eenmalig', mnd: ' per maand', pp: ' per persoon', uur: ' per uur', sessie: ' per sessie' };

/** Kort: "€745/mnd", "vanaf €2.450", "€195 per persoon" */
export function formatPrice(p: Price): string {
  return `${p.from ? 'vanaf ' : ''}${euro(p.amount)}${shortUnit[p.unit]}`;
}
/** Lang, met eenheid: "vanaf €1.195 eenmalig", "€49 per maand" */
export function formatPriceLong(p: Price): string {
  return `${p.from ? 'vanaf ' : ''}${euro(p.amount)}${longUnit[p.unit]}`;
}
export function formatExtra(p: Price): string | null {
  const parts = [p.extra ? `+ ${p.extra}` : null, p.setup ? `+ ${euro(p.setup)} eenmalige inrichting` : null].filter(Boolean);
  return parts.length ? parts.join(' · ') : null;
}

/* ---------------- Tabs op /pakketten ---------------- */
export const tabs = [
  { id: 'maandelijks', label: 'Maandelijks ontzorgd', line: 'Wij regelen je online zaken elke maand. Jij hoeft er niet naar om te kijken.' },
  { id: 'projecten', label: 'Eenmalige projecten', line: 'Een nieuwe website, webshop of audit, voor een vaste prijs.' },
  { id: 'ai', label: 'AI & workshops', line: 'Van losse proefjes naar veilig, gemeten AI-gebruik.' },
  { id: 'consultancy', label: 'Consultancy', line: 'Je houdt het in huis. Wij brengen richting en expertise.' },
] as const;
/** Oude deep links → nieuwe tabs */
export const legacyHash: Record<string, string> = { ecommerce: 'maandelijks', marketing: 'maandelijks', website: 'maandelijks', advies: 'consultancy', sparring: 'consultancy', webshop: 'maandelijks', lokaal: 'maandelijks', groei: 'maandelijks' };

export const setupLine = 'Bij groeipakketten is de inrichting inbegrepen. Losse ads-modules hebben eenmalige inrichtingskosten.';
export const setupDetails = ['Accounts koppelen (op jouw naam)', 'Tracking: GA4, Meta Pixel en conversies', 'Campagnestructuur opzetten', 'Google Bedrijfsprofiel optimaliseren', 'De eerste rapportage'];

/* ---------------- Vergelijking groeipakketten ---------------- */
export const compareIds = ['ontzorgd-lokaal', 'ontzorgd-leads', 'ontzorgd-webshop', 'ontzorgd-op-maat'] as const;
export const compareRows: { label: string; values: [string | boolean, string | boolean, string | boolean, string | boolean] }[] = [
  { label: 'Basis', values: ['Zorg Plus', 'Zorg Plus', 'Zorg Webshop', 'Zorg Plus of Webshop'] },
  { label: 'Wijzigingsuur per maand', values: [true, true, false, true] },
  { label: 'Maandrapport', values: [true, true, true, true] },
  { label: 'Bedrijfsprofiel & reviews', values: [true, true, false, true] },
  { label: 'GEO-monitoring', values: [true, true, false, true] },
  { label: 'Lokale pagina\'s', values: [false, '1–2 per maand', false, 'In contentplan'] },
  { label: 'Google Ads', values: [false, 'Search, lokaal', 'Shopping / PMax', 'Search + Shopping'] },
  { label: 'Meta Ads', values: [false, false, true, true] },
  { label: 'E-mailflows', values: [false, false, true, true] },
  { label: 'CRO-review', values: [false, false, 'Maandelijks', 'Maandelijks'] },
  { label: 'AI-teamworkshop', values: [false, '1× per jaar', false, 'Op verzoek'] },
  { label: 'Overleg', values: ['Per kwartaal', 'Per kwartaal', 'Maandelijks', 'Wekelijks'] },
  { label: 'Inrichting', values: [true, true, true, true] },
  { label: 'Minimale looptijd', values: ['3 maanden', '3 maanden', '3 maanden', '3 maanden'] },
  { label: 'Aanbevolen advertentiebudget', values: ['n.v.t.', '€500–€1.500/mnd', 'vanaf €1.500/mnd', 'In overleg'] },
];

/* ---------------- Zo start je ---------------- */
export const startSteps: { title: string; text: string; todo?: string }[] = [
  { title: 'Kies je pakket', text: 'Of doe eerst de gratis Online Check.' },
  { title: 'Kennismaking van 30 minuten', text: 'We bevestigen de scope en beantwoorden je vragen.' },
  { title: 'Inrichting', text: 'Accounts op jouw naam, tracking en de eerste verbeteringen.', todo: 'TODO: inrichting duurt X werkdagen' },
  { title: 'Ritme', text: 'Elke maand een rapport van één pagina, en elk kwartaal een gesprek.' },
];
export const invoicing = { text: 'Maandpakketten worden maandelijks vooraf gefactureerd. Eenmalige projecten: 50% bij start, 50% bij oplevering.', todo: 'TODO: betaaltermijn (aantal dagen)' };

/* ---------------- Spelregels ---------------- */
export const moneyBack = {
  title: 'Niet tevreden na je eerste maand?',
  text: 'Laat het binnen 30 dagen weten. Dan stoppen we zonder opzegtermijn en krijg je de eerste maandfee terug. Dit geldt niet voor advertentiebudget, eenmalige projecten en workshops.',
  todo: 'TODO: bevestigen (volledige tekst staat in de algemene voorwaarden)',
};
export const houseRules = [
  { title: '3 maanden, daarna maandelijks opzegbaar', text: 'Geen jaarcontracten. Na de eerste drie maanden zeg je per maand op.' },
  { title: moneyBack.title, text: moneyBack.text },
  { title: 'Alles op jouw naam', text: 'Domein, hosting, Google- en Meta-accounts staan op jouw naam. Stop je, dan neem je alles mee.' },
  { title: 'Elke maand één pagina', text: 'Een rapport in gewone taal: wat er gebeurde, wat het opleverde en wat we volgende maand doen.' },
  { title: 'Prijzen excl. btw en advertentiebudget', text: 'Advertentiebudget betaal je rechtstreeks aan Google of Meta. Wij rekenen alleen voor het beheer.' },
];

/** Namen voor het contactformulier (dropdown). */
export const contactOptions = [
  ...byKind('groei').map((p) => p.name),
  ...byKind('basis').map((p) => p.name),
  'Website laten maken',
  'Webshop laten maken',
  'AI-workshop of AI Implementatie',
  ...byKind('advies').map((p) => p.name),
  'Weet ik nog niet',
];

/** Zet een pakketnaam of -id (uit ?pakket=) om naar een optie in het contactformulier. */
export function contactOptionFor(value: string): string {
  const p = packages.find((x) => x.id === value || x.name.toLowerCase() === value.toLowerCase());
  if (!p) return contactOptions.includes(value) ? value : '';
  if (contactOptions.includes(p.name)) return p.name;
  if (p.kind === 'ai' || p.id === 'ai-partner') return 'AI-workshop of AI Implementatie';
  if (p.group === 'webshops' || p.id.startsWith('shop') || p.id === 'migratie') return 'Webshop laten maken';
  if (p.group === 'websites' || p.id.startsWith('web-')) return 'Website laten maken';
  return 'Weet ik nog niet';
}
