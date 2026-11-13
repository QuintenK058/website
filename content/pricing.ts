/**
 * ALLE PAKKETTEN EN PRIJZEN. De enige plek waar namen en bedragen staan.
 * Bedragen in hele euro's, excl. btw. Bij ads ook excl. advertentiebudget.
 *
 * Structuur: "Eerst je basis, dan je groei. Losse projecten en AI ernaast."
 *   basis   → Zorg Basis / Plus / Webshop
 *   groei   → Lokaal Gevonden / Leads / Webshop / Op Maat (basis zit erin)
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
  /** Diensten die erin zitten (chips op de kaart) */
  services?: string[];
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
    summary: 'Je Shopify-shop beheerd en bewaakt.',
    forWho: 'Je hebt een Shopify-shop.',
    includes: ['Shop-, app- en thema-updates', 'Productmutaties (TODO: aantal per maand)', 'Wekelijkse checkout- en betaalcheck', 'Maandrapport van één pagina'],
    excludes: ['Ads', 'E-mail', 'Nieuwe functies'],
    price: { amount: 149, unit: 'mnd' },
  },

  /* ---------------- Groei (basis zit erin) ---------------- */
  {
    id: 'ontzorgd-lokaal', name: 'Lokaal Gevonden', kind: 'groei',
    summary: 'Beter gevonden worden in je regio, zonder advertenties.',
    forWho: 'Je bent een lokale ondernemer en wilt dat klanten in de buurt je vinden.',
    services: ['Websitebeheer', 'Google Bedrijfsprofiel', 'Reviews', 'AI-vindbaarheid'],
    includes: ['Websitebeheer: hosting, updates, back-ups en 1 uur wijzigingen per maand', 'Je Google Bedrijfsprofiel actueel, met foto\'s en berichten', 'Reviews opvragen en beantwoorden', 'Elke maand meten of ChatGPT, Gemini, Perplexity en Claude je noemen', 'Maandrapport van één pagina', 'Elk kwartaal een gesprek'],
    excludes: ['Advertenties', 'Nieuwe pagina\'s per dienst of plaats'],
    price: { amount: 199, unit: 'mnd' },
    priceNote: 'Kies je Lokaal Gevonden voor 12 maanden, dan kost Web Start €595 in plaats van €995.',
  },
  {
    id: 'ontzorgd-leads', name: 'Meer Aanvragen', kind: 'groei', recommended: true,
    summary: 'Meer offerteaanvragen en telefoontjes, via Google én je eigen site.',
    forWho: 'Je wilt meer aanvragen en telefoontjes.',
    services: ['Websitebeheer', 'Lokale SEO', 'Google Ads', 'AI-workshop'],
    includes: ['Alles uit Lokaal Gevonden', '1–2 nieuwe pagina\'s per maand per dienst of plaats', 'Google Ads beheren: zoekcampagnes, tracking, bijsturen', 'Eén AI-teamworkshop per jaar'],
    excludes: ['Meta Ads (Facebook en Instagram)', 'Advertentiebudget (betaal je zelf aan Google)'],
    adBudget: 'Aanbevolen advertentiebudget: €500–€1.500 per maand',
    price: { amount: 745, unit: 'mnd', extra: '2% van je advertentiebudget' },
  },
  {
    id: 'ontzorgd-webshop', name: 'Meer Verkopen', kind: 'groei',
    summary: 'Meer omzet uit je webshop: advertenties, e-mail en conversie.',
    forWho: 'Je hebt een webshop en wilt meer verkopen.',
    services: ['Shopify-beheer', 'Google Shopping', 'Meta Ads', 'E-mail', 'Conversie'],
    includes: ['Shopify-beheer: updates, apps, productmutaties en checkout-bewaking', 'Google Shopping en Performance Max, met productfeed', 'Meta Ads (Facebook en Instagram)', 'E-mailflows: welkom, verlaten winkelmand, herhaalaankoop', 'Elke maand een conversie-review met verbeteringen', 'Elke maand overleg'],
    excludes: ['Advertentiebudget', 'Advertentiebeelden en -video\'s (lever je aan)'],
    adBudget: 'Aanbevolen advertentiebudget: vanaf €1.500 per maand',
    price: { amount: 1195, unit: 'mnd', extra: '2% van je advertentiebudget' },
  },
  {
    id: 'ontzorgd-op-maat', name: 'Groei Op Maat', kind: 'groei', proposal: true,
    summary: 'Voor meerdere kanalen, B2B of meerdere vestigingen.',
    forWho: 'Meerdere kanalen, B2B-webshop of meerdere vestigingen.',
    services: ['SEO en GEO', 'Google Ads', 'Meta Ads', 'E-mail', 'Strategie'],
    includes: ['SEO + GEO Groei', 'Google Ads én Meta Ads', 'E-mailflows en -campagnes', 'Elke week 1 strategie-uur', 'Kwartaalplan met KPI\'s'],
    excludes: ['Advertentiebudget', 'Grote nieuwbouwprojecten'],
    price: { amount: 1950, from: true, unit: 'mnd', extra: '2% van je advertentiebudget' },
  },

  /* ---------------- Modules (calculator) ---------------- */
  { id: 'lokaal-zichtbaar', name: 'Lokale SEO', kind: 'module', summary: 'Bedrijfsprofiel, reviews, 1–2 lokale pagina\'s per maand en GEO-monitoring.', includes: ['Beheer Bedrijfsprofiel', 'Reviewopvolging', '1–2 lokale pagina\'s per maand', 'GEO-monitoring'], price: { amount: 395, unit: 'mnd' } },
  { id: 'seo-geo-groei', name: 'SEO + GEO Groei', kind: 'module', summary: 'Contentplan, technische SEO, structured data en AI-citatiemeting.', includes: ['Contentplan', 'Technische SEO', 'Structured data', 'AI-citatiemeting'], price: { amount: 795, unit: 'mnd' } },
  { id: 'google-ads', name: 'Google Ads', kind: 'module', summary: 'Zoek-, Shopping- en Performance Max-campagnes, met conversietracking. Geen inrichtingskosten.', includes: ['Search, Shopping en Performance Max', 'Conversietracking en productfeed', 'Wekelijks bijsturen', 'Maandrapport'], price: { amount: 499, unit: 'mnd', extra: '2% van je advertentiebudget' } },
  { id: 'meta-ads', name: 'Meta Ads', kind: 'module', summary: 'Facebook en Instagram: campagnes, doelgroepen en tests. Geen inrichtingskosten.', includes: ['Campagnestructuur', 'Doelgroepen en tests', 'Pixel en conversies', 'Maandrapport'], price: { amount: 499, unit: 'mnd', extra: '2% van je advertentiebudget' } },
  { id: 'development-uren', name: 'Development-uren', kind: 'module', proposal: true, summary: '4 uur development per maand voor verbeteringen, functies en koppelingen. Uren schuiven niet door.', includes: ['4 uur per maand (€90 per uur)', 'Shopify en WordPress', 'Maandelijkse prioriteitenlijst'], price: { amount: 360, unit: 'mnd' } },
  { id: 'ai-partner', name: 'AI-Partner', kind: 'module', group: 'volhouden', summary: 'Maandelijks spreekuur, onderhoud van bots en workflows, één nieuwe use case per kwartaal.', includes: ['Maandelijks spreekuur', 'Onderhoud bots en workflows', 'Eén nieuwe use case per kwartaal', 'Updates van het AI-dossier'], price: { amount: 295, unit: 'mnd' } },

  /* ---------------- Eenmalige projecten ---------------- */
  { id: 'web-start', name: 'Web Start', kind: 'project', group: 'websites', summary: 'Een professionele site van 1–5 pagina\'s.', includes: ['1–5 pagina\'s, mobiel-first', 'Basis-SEO en structured data', 'Google Bedrijfsprofiel gekoppeld'], price: { amount: 995, unit: 'eenmalig' }, priceNote: 'Met Lokaal Gevonden (12 maanden): €595.', delivery: 'TODO: levertijd Web Start' },
  { id: 'web-groei', name: 'Web Groei', kind: 'project', group: 'websites', summary: 'Een site op maat van 6–15 pagina\'s die aanvragen oplevert.', includes: ['6–15 pagina\'s, maatwerkdesign', 'Copywriting', 'Lokale landingspagina\'s', 'Conversietracking'], price: { amount: 2450, from: true, unit: 'eenmalig' }, delivery: 'TODO: levertijd Web Groei' },
  { id: 'web-maatwerk', name: 'Web Maatwerk', kind: 'project', group: 'websites', summary: 'Een geanimeerde site met integraties, ook meertalig.', includes: ['Animatierijk ontwerp', 'Integraties', 'Meertalig'], price: { amount: 4000, from: true, unit: 'eenmalig' }, delivery: 'TODO: levertijd Web Maatwerk' },
  { id: 'shop-start', name: 'Shop Start', kind: 'project', group: 'webshops', summary: 'Een Shopify-webshop tot 50 producten.', includes: ['Shopify, tot 50 producten', 'iDEAL en betaalmethoden', 'Basistracking (GA4, Meta Pixel)'], price: { amount: 2750, from: true, unit: 'eenmalig' }, delivery: 'TODO: levertijd Shop Start' },
  { id: 'shop-groei', name: 'Shop Groei', kind: 'project', group: 'webshops', summary: 'Een webshop tot 500 producten, klaar om te schalen.', includes: ['Tot 500 producten', 'Productfeeds (Google, Meta)', 'E-mailflows', 'CRO-basis'], price: { amount: 4950, from: true, unit: 'eenmalig' }, delivery: 'TODO: levertijd Shop Groei' },
  { id: 'migratie', name: 'Migratie naar Shopify', kind: 'project', group: 'webshops', summary: 'Van WooCommerce of Magento naar Shopify, zonder posities te verliezen.', includes: ['Producten, klanten, bestellingen', '301-redirects', 'Controle na livegang'], price: { amount: 1500, from: true, unit: 'eenmalig' }, delivery: 'TODO: levertijd migratie' },
  { id: 'dev-uur', name: 'Shopify-development', kind: 'project', group: 'webshops', proposal: true, summary: 'Nieuwe functies, thema-aanpassingen, apps en B2B-maatwerk op Shopify. Per uur, of een vaste prijs per project.', includes: ['Shopify en WordPress', 'B2B-functies, thema- en app-maatwerk', 'Vaste projectprijs na technisch ontwerp'], price: { amount: 95, unit: 'uur' }, delivery: 'TODO: levertijd in overleg per project' },
  { id: 'website-audit', name: 'Website-audit', kind: 'project', group: 'checks', summary: 'Techniek, snelheid, SEO, GEO en beveiliging, met prioriteitenlijst.', includes: ['Rapport in gewone taal', 'Prioriteitenlijst'], price: { amount: 395, unit: 'eenmalig' }, delivery: 'TODO: levertijd audit' },
  { id: 'geo-scan', name: 'GEO-scan', kind: 'project', group: 'checks', summary: 'Hoe ChatGPT, Gemini, Perplexity en Claude jouw bedrijf noemen, met verbeterlijst.', includes: ['Meting in 4 AI-assistenten', 'Verbeterlijst'], price: { amount: 245, unit: 'eenmalig' }, priceNote: 'Een mini-versie zit gratis in de Online Check.', delivery: 'TODO: levertijd GEO-scan' },
  { id: 'bedrijfsprofiel-setup', name: 'Bedrijfsprofiel-setup', kind: 'project', group: 'checks', summary: 'Google Bedrijfsprofiel, Bing Places en Apple Business Connect ingericht.', includes: ['Categorieën en diensten', 'Foto\'s', 'Reviewlink'], price: { amount: 245, unit: 'eenmalig' }, delivery: 'TODO: levertijd setup' },
  { id: 'koppeling', name: 'Koppeling', kind: 'project', group: 'checks', proposal: true, summary: 'Webshop of site koppelen aan ERP, PIM, voorraad, boekhouding of verzending.', includes: ['Per koppeling', 'Testen met echte data', 'Monitoring'], price: { amount: 495, from: true, unit: 'eenmalig' }, delivery: 'TODO: levertijd koppeling' },

  /* ---------------- AI ----------------
   * Prijzen per soort: workshops (leren), AI-systemen (chatbot, kennisbank,
   * automatisering), agents, en beheer. Onderbouwing: marktonderzoek nov. 2026.
   */
  { id: 'ai-kennismaking', name: 'AI-Kennismaking', kind: 'ai', group: 'leren', summary: 'Open groep, 3 uur in Leeuwarden: veilig werken met ChatGPT, Copilot en Claude.', includes: ['Open inschrijving', 'Praktijkvoorbeelden', 'Handout met prompts en afspraken'], price: { amount: 245, unit: 'pp' } },
  { id: 'ai-teamworkshop', name: 'AI-Teamworkshop', kind: 'ai', group: 'leren', summary: 'In-company, max. 12 personen, inclusief AI-geletterdheidsdossier.', includes: ['Oefenen met eigen werk', 'AI-geletterdheidsdossier (beleid, toolregister, data-afspraken, presentielijst)', 'Online terugkomsessie na 4 weken'], price: { amount: 1495, unit: 'eenmalig' }, priceNote: 'Halve dag €1.495 · hele dag €2.450' },
  { id: 'ai-quickscan', name: 'AI-Quickscan', kind: 'ai', group: 'toepassen', summary: 'Waar levert AI jou tijd op? 3 quick wins en een tijdsbaseline.', includes: ['Intake en procesinventarisatie', '3 quick wins', 'Tijdsbaseline'], price: { amount: 795, unit: 'eenmalig' } },
  { id: 'ai-chatbot', name: 'AI-Chatbot', kind: 'ai', group: 'toepassen', summary: 'Een klantenservicebot op je site of shop, getraind op jouw informatie.', includes: ['Kennisbank gevuld en getest', 'Doorverbinden naar een mens', 'Hosting, modelkosten en onderhoud: €149 per maand'], price: { amount: 1495, unit: 'eenmalig', extra: '€149 per maand' } },
  { id: 'ai-kennisbank', name: 'AI-Kennisbank', kind: 'ai', group: 'toepassen', summary: 'Een interne assistent die antwoord geeft op basis van jullie eigen documenten.', includes: ['Koppeling met je documenten (bijv. SharePoint of Google Drive)', 'Toegangsrechten per team', 'Bronvermelding bij elk antwoord', 'Hosting, modelkosten en onderhoud: vanaf €199 per maand'], price: { amount: 3950, from: true, unit: 'eenmalig', extra: 'vanaf €199 per maand' } },
  { id: 'ai-automatisering', name: 'AI-Automatisering', kind: 'ai', group: 'toepassen', summary: 'Eén workflow (n8n of Make) die een vaste taak uit handen neemt.', includes: ['Bijv. leadopvolging, offertes, mail-triage of productteksten', 'Getest met echte data', 'Hosting en monitoring: €49 per maand'], price: { amount: 1950, from: true, unit: 'eenmalig', extra: '€49 per maand per workflow' } },
  { id: 'ai-agent', name: 'AI-Agent', kind: 'ai', group: 'toepassen', summary: 'Een agent die zelfstandig taken uitvoert in je systemen: CRM, mail, agenda, webshop.', includes: ['Ontwerp van taken en grenzen', 'Koppelingen met je systemen', 'Menselijke controle op belangrijke stappen', 'Logging, hosting, modelkosten en onderhoud: vanaf €249 per maand'], price: { amount: 4950, from: true, unit: 'eenmalig', extra: 'vanaf €249 per maand' } },
  { id: 'ai-implementatie', name: 'AI Implementatie', kind: 'ai', group: 'toepassen', summary: 'Quickscan plus één workflow, gebouwd, getest en na 30 dagen gemeten.', includes: ['AI-Quickscan', 'Eén workflow (AI-Automatisering)', 'Meting na 30 dagen'], price: { amount: 2495, from: true, unit: 'eenmalig' }, priceNote: '€250 voordeliger dan los.' },

  /* ---------------- Consultancy ---------------- */
  {
    id: 'consultancy-wekelijks', name: 'Consultancy Wekelijks', kind: 'advies', group: 'doorlopend', proposal: true,
    summary: 'Elke week een uur met een specialist. Jouw team voert uit.',
    forWho: 'Je hebt een eigen marketeer of webshopteam en mist een ervaren sparringpartner.',
    includes: ['Elke week 1 uur, online of op locatie', 'Review van campagnes, SEO, webshop en cijfers', 'Actielijst na elke sessie', 'WhatsApp-lijn tussendoor'],
    excludes: ['Uitvoering'],
    priceNote: '4 uur per maand, €75 per uur.',
    price: { amount: 300, unit: 'mnd' },
  },
  {
    id: 'consultancy-maanduren', name: 'Consultancy Maanduren', kind: 'advies', group: 'doorlopend', proposal: true, recommended: true,
    summary: '8 uur per maand, vrij in te zetten waar het nodig is.',
    forWho: 'Je wilt meer dan een wekelijks gesprek: meekijken, meedenken en je team op weg helpen.',
    includes: ['8 uur per maand, vrij te verdelen', 'Sessies, reviews en meelopen met je team', 'Briefings voor je bureau of freelancers', 'Urenoverzicht per maand', 'WhatsApp-lijn tussendoor'],
    excludes: ['Uitvoering'],
    priceNote: '€75 per uur. Meer of minder uren? We spreken een vast maandbedrag af.',
    price: { amount: 600, unit: 'mnd' },
  },
  {
    id: 'groeistrategie', name: 'Groeistrategie', kind: 'advies', group: 'doorlopend', proposal: true,
    summary: 'Je externe e-commerce- en marketingmanager: plan, ritme en bijsturing.',
    forWho: 'Je wilt richting en regie, maar geen fulltime manager aannemen.',
    includes: ['Plan van aanpak in de eerste maand inbegrepen', 'Wekelijks 1 uur en maandelijks een dagdeel met je team', 'Maandelijkse KPI-review', 'Kwartaalplan en kwartaalreview', 'Aanschuiven bij overleg met bureaus en leveranciers'],
    excludes: ['Uitvoering'],
    price: { amount: 995, from: true, unit: 'mnd' },
  },
  {
    id: 'consultancy-uur', name: 'Consultancy per uur', kind: 'advies', group: 'eenmalig', proposal: true,
    summary: 'Een specialist wanneer het jou uitkomt. Geen abonnement.',
    forWho: 'Je hebt af en toe een vraag of een klus waar je een specialist bij wilt.',
    includes: ['Per uur, online of op locatie', 'Achteraf per maand gefactureerd', 'Urenoverzicht'],
    excludes: ['Uitvoering'],
    priceNote: 'Losse uren €85. Met een vaste maandafspraak €75 per uur.',
    price: { amount: 75, from: true, unit: 'uur' },
  },
  {
    id: 'strategiesessie', name: 'Strategiesessie', kind: 'advies', group: 'eenmalig', proposal: true,
    summary: 'Eén uur, voorbereid met jouw data. Achteraf een actielijst.',
    includes: ['Vooraf: analyse van je site en cijfers', '1 uur, online of op locatie', 'Actielijst achteraf'],
    price: { amount: 150, unit: 'sessie' },
  },
  {
    id: 'plan-van-aanpak', name: 'Plan van aanpak', kind: 'advies', group: 'eenmalig', proposal: true,
    summary: 'Een compleet plan dat je eigen team kan uitvoeren.',
    forWho: 'Je wilt weten wat je moet doen, in welke volgorde, en wie wat doet.',
    includes: ['Intake en analyse: data, kanalen, site, marges en team', 'Doelen, prioriteiten en een roadmap voor 12 maanden', 'KPI\'s en meetplan', 'Taakverdeling, tools en budget', 'Overdrachtssessie met je team', '30 dagen vragen stellen via WhatsApp'],
    excludes: ['Uitvoering'],
    delivery: 'TODO: levertijd',
    priceNote: 'Circa 16 uur werk, tegen €75 per uur.',
    price: { amount: 1195, from: true, unit: 'eenmalig' },
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

export const setupLine = 'Inrichting is overal inbegrepen. Geen opstartkosten, ook niet voor advertenties.';
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
  { label: 'Advertentiebeheer', values: [false, '+ 2% van je budget', '+ 2% van je budget', '+ 2% van je budget'] },
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
  'AI: workshop, systeem of agent',
  ...byKind('advies').map((p) => p.name),
  'Weet ik nog niet',
];

/** Zet een pakketnaam of -id (uit ?pakket=) om naar een optie in het contactformulier. */
export function contactOptionFor(value: string): string {
  const p = packages.find((x) => x.id === value || x.name.toLowerCase() === value.toLowerCase());
  if (!p) return contactOptions.includes(value) ? value : '';
  if (contactOptions.includes(p.name)) return p.name;
  if (p.kind === 'ai' || p.id === 'ai-partner') return 'AI: workshop, systeem of agent';
  if (p.group === 'webshops' || p.id.startsWith('shop') || p.id === 'migratie') return 'Webshop laten maken';
  if (p.group === 'websites' || p.id.startsWith('web-')) return 'Website laten maken';
  return 'Weet ik nog niet';
}
