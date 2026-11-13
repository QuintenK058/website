/**
 * RICHTINGEN: de klant kiest eerst een richting, en krijgt daarbinnen drie
 * pakketten met concreet wat we doen. Gebruikt op /pakketten, /diensten,
 * de homepage en in het menu.
 *
 * Prijzen: monthly = maandbedrag excl. btw, null = nog in te vullen (toont
 * "Op offerte" live, TODO in dev). Tier-prijzen die gelijk zijn aan een
 * ontzorgbundel staan ook in content/pricing.ts (bundles).
 */
import type { LineId } from './pricing';

export type DirectionId = 'ecommerce' | 'marketing' | 'website' | 'ai' | 'consultancy';

export type Tier = {
  id: string;
  name: string;
  monthly: number | null;
  oneOff?: string; // bijv. "+ €1.195 eenmalig"
  priceTodo?: string;
  featured?: boolean;
  forWho: string;
  /** Concreet: wat we elke maand doen. */
  weDo: string[];
  /** Wat er níet in zit. */
  excludes: string[];
  setupIncluded?: boolean;
};

export type Direction = {
  id: DirectionId;
  index: string;
  name: string;
  mono: string;
  icon: string;
  headline: [string, string];
  pitch: string;
  forWho: string[];
  lines: LineId[]; // productlijnen (dienstpagina's) binnen deze richting
  tiers: [Tier, Tier, Tier];
  addons: string[]; // package ids (los bij te boeken)
  oneOffs: string[]; // package ids (eenmalige projecten)
  proof?: string; // case slug
};

export const directions: Direction[] = [
  {
    id: 'ecommerce',
    index: '01',
    name: 'E-commerce',
    mono: 'E-COMMERCE',
    icon: 'shop',
    headline: ['Jouw webshop.', 'Beheerd, gekoppeld en aan het groeien.'],
    pitch: 'Shopify of Magento, B2C of B2B. Van productmutaties tot Google Shopping en van koppelingen tot een groeiplan. Echt alles rondom je webshop, door een e-commercespecialist met B2B-ervaring.',
    forWho: ['Webshops op Shopify of Magento', 'B2B-webshops en groothandels', 'Winkels die online willen groeien'],
    lines: ['webshops', 'development'],
    proof: 'miedema-webshop',
    tiers: [
      {
        id: 'ecom-beheer',
        name: 'Webshop Beheer',
        monthly: 149,
        forWho: 'Je verkoopt al, maar wilt geen omkijken naar de techniek.',
        weDo: ['Productmutaties en collecties bijwerken (TODO: aantal per maand)', 'Apps en extensies bijwerken en opruimen', 'Wekelijkse checkout- en betaalcontrole', 'Maandrapport van één pagina'],
        excludes: ['Advertenties en e-mail', 'Nieuwe functionaliteit (los: development-uren)'],
      },
      {
        id: 'ecom-groei',
        name: 'Webshop Groei',
        monthly: 1195,
        featured: true,
        setupIncluded: true,
        forWho: 'Je wilt meer omzet uit ads, e-mail en conversie.',
        weDo: ['Alles uit Webshop Beheer', 'Meta Ads: campagnes, doelgroepen en tests', 'Google Shopping / Performance Max met feedbeheer', 'E-mailflows: welkom, verlaten winkelmandje, herhaalaankoop', 'Maandelijkse CRO-review met verbeteringen'],
        excludes: ['Advertentiebudget (betaal je rechtstreeks)', 'Creatives (los: Meta Ads + Creatives)'],
      },
      {
        id: 'ecom-partner',
        name: 'E-commerce Partner',
        monthly: null,
        priceTodo: 'TODO: maandprijs E-commerce Partner',
        setupIncluded: true,
        forWho: 'Voor B2B- en grotere webshops die een vaste e-commercespecialist willen.',
        weDo: ['Alles uit Webshop Groei', 'Elke week 1 uur strategie en sparring', 'Groeiplan per kwartaal met KPI\'s', 'Development-uren voor verbeteringen en koppelingen (TODO: aantal uur)', 'B2B-optimalisatie: accounts, staffels, herhaalorders'],
        excludes: ['Advertentiebudget', 'Grote maatwerkprojecten (op offerte)'],
      },
    ],
    addons: ['email-campagnes', 'meta-ads-creatives', 'magento-beheer', 'development-strippenkaart', 'ai-chatbot'],
    oneOffs: ['shop-start', 'shop-groei', 'migratie', 'magento-development', 'koppelingen', 'maatwerk-development'],
  },
  {
    id: 'marketing',
    index: '02',
    name: 'Online marketing',
    mono: 'MARKETING',
    icon: 'search',
    headline: ['Gevonden in Google.', 'Genoemd door AI.'],
    pitch: 'SEO, lokale SEO, GEO, Google Ads, Meta Ads en e-mail. We kiezen de kanalen die bij jouw klanten passen, en laten elke maand zien wat ze opleveren.',
    forWho: ['Lokale dienstverleners', 'Zakelijke dienstverleners', 'Bedrijven die meer aanvragen willen'],
    lines: ['vindbaarheid', 'advertenties'],
    proof: 'lado-bridal',
    tiers: [
      {
        id: 'mkt-zichtbaar',
        name: 'Lokaal Zichtbaar',
        monthly: 395,
        setupIncluded: true,
        forWho: 'Gevonden worden in je eigen regio, organisch.',
        weDo: ['Beheer Google Bedrijfsprofiel: posts, foto\'s, diensten', 'Reviewopvolging: elke review een reactie', '1–2 lokale pagina\'s per maand', 'GEO-monitoring in ChatGPT, Gemini, Perplexity en Claude', 'Maandrapport van één pagina'],
        excludes: ['Advertenties', 'Hosting en onderhoud van je site'],
      },
      {
        id: 'mkt-groei',
        name: 'Ontzorgd Groei',
        monthly: 745,
        featured: true,
        setupIncluded: true,
        forWho: 'Organisch én betaald: structureel meer aanvragen.',
        weDo: ['Alles uit Lokaal Zichtbaar', 'Google Ads Lokaal: campagnes, zoektermen, conversies', 'Zorg Plus: hosting, updates, back-ups, 1 uur wijzigingen', 'Eén AI-teamworkshop per jaar, met AI-dossier', 'Kwartaalgesprek'],
        excludes: ['Meta Ads', 'Advertentiebudget (tot €1.500/mnd, betaal je rechtstreeks)'],
      },
      {
        id: 'mkt-compleet',
        name: 'Marketing Compleet',
        monthly: null,
        priceTodo: 'TODO: maandprijs Marketing Compleet',
        setupIncluded: true,
        forWho: 'Al je online marketing uit handen, met wekelijkse sturing.',
        weDo: ['SEO + GEO Groei: contentplan, technische SEO, AI-citatiemeting', 'Google Ads en Meta Ads', 'E-mailcampagnes op maat (TODO: aantal per maand)', 'Elke week 1 uur strategie en sparring', 'Maandrapport en kwartaalplan'],
        excludes: ['Advertentiebudget', 'Creatives (los bij te boeken)'],
      },
    ],
    addons: ['geo-scan', 'bedrijfsprofiel-setup', 'meta-ads', 'email-flows', 'email-campagnes'],
    oneOffs: ['bedrijfsprofiel-setup', 'geo-scan', 'website-audit'],
  },
  {
    id: 'website',
    index: '03',
    name: 'Website & development',
    mono: 'WEBSITE',
    icon: 'web',
    headline: ['Een website die werkt.', 'Ook als jij er niet naar kijkt.'],
    pitch: 'Een snelle, vindbare site met een vaste prijs, en daarna onderhoud, hosting en beveiliging in één abonnement. Plus maatwerk en koppelingen als standaard niet genoeg is.',
    forWho: ['Starters en zzp\'ers', 'Bedrijven met een verouderde site', 'Organisaties die maatwerk nodig hebben'],
    lines: ['websites', 'onderhoud', 'development'],
    tiers: [
      {
        id: 'web-zorg',
        name: 'Zorg Plus',
        monthly: 99,
        forWho: 'Je hebt een site en wilt dat hij veilig en actueel blijft.',
        weDo: ['Hosting en SSL', 'Updates van software, thema en plugins', 'Dagelijkse back-ups en uptime-monitoring', 'Beveiligingsscan', '1 uur wijzigingen per maand en een maandrapport'],
        excludes: ['SEO en advertenties', 'Nieuwe pagina\'s buiten het uur wijzigingen'],
      },
      {
        id: 'web-lokaal',
        name: 'Ontzorgd Lokaal',
        monthly: 199,
        oneOff: 'Web Start-site voor €595 bij 12 maanden',
        featured: true,
        setupIncluded: true,
        forWho: 'Een nieuwe site, onderhoud én gevonden in de buurt.',
        weDo: ['Alles uit Zorg Plus', 'Beheer Bedrijfsprofiel en reviews', 'GEO-monitoring in AI-assistenten', 'Kwartaalgesprek', 'Optie: Web Start-site voor €595 (normaal €1.195) bij 12 maanden'],
        excludes: ['Advertenties', 'Nieuwe content buiten het uur wijzigingen'],
      },
      {
        id: 'web-maatwerk',
        name: 'Maatwerk & Development',
        monthly: null,
        priceTodo: 'TODO: maandprijs Maatwerk & Development (Zorg Plus + development-uren)',
        forWho: 'Je site moet meer kunnen: koppelingen, tools, doorontwikkeling.',
        weDo: ['Alles uit Zorg Plus', 'Development-uren voor nieuwe functies (TODO: aantal uur)', 'Koppelingen bewaken en onderhouden', 'Maandelijkse prioriteitenlijst'],
        excludes: ['Grote nieuwbouw (Web Groei / Maatwerk, op offerte)'],
      },
    ],
    addons: ['zorg-basis', 'lokaal-zichtbaar', 'development-strippenkaart', 'ai-chatbot'],
    oneOffs: ['web-start', 'web-groei', 'web-maatwerk', 'website-audit', 'koppelingen'],
  },
  {
    id: 'ai',
    index: '04',
    name: 'AI',
    mono: 'AI',
    icon: 'ai',
    headline: ['Van losse proefjes.', 'Naar veilig, gemeten AI.'],
    pitch: 'Workshops met een AI-geletterdheidsdossier, quickscans met meetbare tijdwinst, en chatbots en workflows die echt werk uit handen nemen.',
    forWho: ['Zakelijke dienstverleners', 'Teams met veel kantoorwerk', 'Webshops met veel klantvragen'],
    lines: ['ai'],
    tiers: [
      {
        id: 'ai-start',
        name: 'AI Start',
        monthly: null,
        oneOff: '€1.295 eenmalig',
        forWho: 'Je team veilig en slim laten werken met AI.',
        weDo: ['AI-Teamworkshop (halve dag, max. 12 personen)', 'Oefenen met jullie eigen werk', 'AI-geletterdheidsdossier: beleid, toolregister, data-afspraken, presentielijst'],
        excludes: ['Implementatie van tools of koppelingen'],
      },
      {
        id: 'ai-implementatie',
        name: 'AI Implementatie',
        monthly: null,
        oneOff: 'vanaf €2.045 eenmalig',
        featured: true,
        forWho: 'Eén concrete toepassing die tijd oplevert, gemeten.',
        weDo: ['AI-Quickscan: 3 quick wins en een tijdsbaseline', 'Eén chatbot of workflow gebouwd en getest', 'Meting van de tijdwinst na 30 dagen'],
        excludes: ['Doorlopend onderhoud (zie AI Partner)'],
      },
      {
        id: 'ai-partner-tier',
        name: 'AI Partner',
        monthly: 295,
        forWho: 'AI als vast onderdeel van je bedrijf.',
        weDo: ['Maandelijks spreekuur', 'Onderhoud van je bots en workflows', 'Elk kwartaal een nieuwe use case', 'Bijwerken van het AI-dossier'],
        excludes: ['Nieuwe grote oplossingen (op offerte)'],
      },
    ],
    addons: ['ai-chatbot', 'ai-automatisering', 'ai-maatwerk'],
    oneOffs: ['ai-kennismaking', 'ai-teamworkshop', 'ai-quickscan', 'ai-chatbot', 'ai-automatisering', 'ai-maatwerk'],
  },
  {
    id: 'consultancy',
    index: '05',
    name: 'Consultancy',
    mono: 'CONSULTANCY',
    icon: 'consult',
    headline: ['Jouw team voert uit.', 'Wij sturen bij.'],
    pitch: 'Elke week een uur met een e-commercespecialist, gespecialiseerd in B2B. Over campagnes, SEO, conversie, data en strategie. Zonder dat je de uitvoering uit handen hoeft te geven.',
    forWho: ['Bedrijven met een eigen marketeer of webshopteam', 'B2B-webshops en groothandels', 'Ondernemers die een sparringpartner missen'],
    lines: ['consultancy'],
    proof: 'miedema-webshop',
    tiers: [
      {
        id: 'consult-los',
        name: 'Losse sessie',
        monthly: null,
        priceTodo: 'TODO: uurtarief',
        forWho: 'Eén vraag of beslissing, goed voorbereid.',
        weDo: ['1 uur, online of op locatie', 'Voorbereiding op basis van je data', 'Actiepunten op papier'],
        excludes: ['Uitvoering'],
      },
      {
        id: 'consult-week',
        name: 'Wekelijkse sparring',
        monthly: null,
        priceTodo: 'TODO: maandprijs 1 uur per week',
        featured: true,
        forWho: 'Elke week bijsturen op campagnes, SEO en strategie.',
        weDo: ['Elke week 1 uur sparring', 'Review van campagnes, SEO en cijfers', 'Maandelijkse prioriteitenlijst', 'Tussendoor bereikbaar via WhatsApp'],
        excludes: ['Uitvoering (los of via E-commerce / Marketing)'],
      },
      {
        id: 'consult-groei',
        name: 'Groeistrategie',
        monthly: null,
        priceTodo: 'TODO: maandprijs Groeistrategie',
        forWho: 'Een plan én wekelijkse begeleiding bij de uitvoering.',
        weDo: ['Analyse van data, kanalen en marges', 'Groeiplan per kwartaal met KPI\'s', 'Elke week 1 uur sparring', 'Kwartaalevaluatie'],
        excludes: ['Uitvoering', 'Advertentiebudget'],
      },
    ],
    addons: ['ai-teamworkshop', 'website-audit'],
    oneOffs: ['consult-uur', 'website-audit', 'geo-scan'],
  },
];

export const direction = (id: string) => directions.find((d) => d.id === id);

/** Richting bij een productlijn (voor breadcrumbs en "andere pakketten"). */
export function directionForLine(line: LineId): Direction | undefined {
  return directions.find((d) => d.lines.includes(line));
}
