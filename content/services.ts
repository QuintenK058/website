/**
 * DIENSTEN: 7 productlijnen met subpagina's. Teksten hier aanpassen.
 * Prijzen komen uit content/pricing.ts via packageIds.
 * In tekstvelden mag je eenvoudige HTML-links gebruiken: <a href="/...">.
 */
export type LineId = 'websites' | 'webshops' | 'onderhoud' | 'vindbaarheid' | 'advertenties' | 'ai' | 'consultancy';

export type QA = { q: string; a: string };
export type Item = { title: string; text: string };

export type SubPage = {
  slug: string;
  name: string;
  title: string; // H1
  seoTitle: string;
  description: string;
  intro: string;
  points: Item[];
  forWho: string[];
  packageIds: string[];
  faq: QA[];
};

export type Line = {
  id: LineId;
  index: string; // [01]
  name: string;
  short: string;
  icon: 'web' | 'shop' | 'shield' | 'search' | 'ads' | 'ai' | 'consult';
  headline: [string, string]; // gepaarde kop
  seoTitle: string;
  description: string;
  intro: string;
  problems: string[];
  approach: Item[];
  outcomes: string[];
  packageIds: string[];
  /** Vanaf-prijs op kaarten (pakket-id) */
  fromId: string;
  /** "Zit in": groeipakketten waarin deze dienst zit */
  inBundles: string[];
  inLabel?: string;
  /** Tekst als de dienst in geen enkel groeipakket zit */
  inText?: string;
  faq: QA[];
  subpages: SubPage[];
  relatedBranches: string[];
  relatedArticles: string[];
  serviceType: string;
};

export const lines: Line[] = [
  /* ------------------------------------------------------------------ */
  {
    id: 'websites',
    index: '01',
    fromId: 'web-start',
    inBundles: ['ontzorgd-lokaal', 'ontzorgd-leads', 'ontzorgd-webshop'],
    inLabel: 'Beheer na oplevering zit in',
    name: 'Websites',
    short: 'Sites die snel zijn, gevonden worden en aanvragen opleveren.',
    icon: 'web',
    headline: ['Een website die werkt.', 'Ook als jij er niet naar kijkt.'],
    seoTitle: 'Website laten maken in Leeuwarden en Friesland, vaste prijzen',
    description: 'Website laten maken, vernieuwen of laten checken. Web Start €1.195, Web Groei vanaf €2.450, Website-audit €395. Excl. btw, inclusief SEO-basis en structured data.',
    intro: 'Je website is vaak het eerste wat een klant van je ziet. We bouwen sites die snel laden, goed scoren in Google en AI, en bezoekers omzetten in aanvragen. Met een vaste prijs vooraf.',
    problems: ['Je site is verouderd en traag op mobiel.', 'Aanpassen kan alleen via iemand die niet meer reageert.', 'Bezoekers komen wel, maar bellen niet.', 'Je weet niet of de software nog veilig is.'],
    approach: [
      { title: 'Kennismaking en check', text: 'We bekijken je huidige site, je concurrenten en wat een nieuwe klant moet zien.' },
      { title: 'Ontwerp en teksten', text: 'Een ontwerp dat bij je bedrijf past, en teksten die zeggen waarom klanten voor jou kiezen.' },
      { title: 'Bouwen en testen', text: 'Snel, toegankelijk, met tracking, SEO-basis en structured data vanaf dag één.' },
      { title: 'Live en beheer', text: 'Na livegang houden we alles bij met een zorgabonnement. Jij hoeft er niet naar om te kijken.' },
    ],
    outcomes: ['Meer aanvragen uit dezelfde bezoekers', 'Een snelle site die goed scoort in Google én AI', 'Een uitstraling waar je trots op bent', 'Geen zorgen over updates of beveiliging'],
    packageIds: ['web-start', 'web-groei', 'web-maatwerk', 'website-audit'],
    faq: [
      { q: 'Wat kost een website?', a: 'Web Start kost €1.195, Web Groei vanaf €2.450 en Web Maatwerk vanaf €4.000. Alles excl. btw. Hosting en onderhoud regel je met een <a href="/diensten/onderhoud">zorgabonnement</a> vanaf €49 per maand.' },
      { q: 'Is een zorgabonnement verplicht?', a: 'Ja. Elke site die we bouwen, houden we ook veilig en up-to-date. Zo voorkom je dat je site over twee jaar op verouderde software draait.' },
      { q: 'Hoe lang duurt het?', a: 'TODO: doorlooptijden (bijv. Web Start 2–3 weken, Web Groei 4–6 weken).' },
      { q: 'Staat de site op mijn naam?', a: 'Ja. Domein, hosting en accounts staan op jouw naam. Stop je met ons, dan neem je alles mee.' },
    ],
    relatedBranches: ['bouw-en-installatie', 'zakelijke-dienstverlening', 'zorg'],
    relatedArticles: ['wat-kost-een-website-in-2026', 'php-8-2-stopt-eind-2026'],
    serviceType: 'Webdesign en websiteontwikkeling',
    subpages: [
      {
        slug: 'laten-maken',
        name: 'Website laten maken',
        title: 'Website laten maken met een vaste prijs',
        seoTitle: 'Website laten maken, vaste prijs vanaf €1.195',
        description: 'Website laten maken in Friesland of online. Web Start €1.195, Web Groei vanaf €2.450, Web Maatwerk vanaf €4.000. Inclusief SEO-basis, structured data en Bedrijfsprofiel.',
        intro: 'Van een site van een paar pagina\'s tot een uitgebreide, animatierijke site. Je weet vooraf wat het kost en wat erin zit.',
        points: [
          { title: 'Mobiel-first', text: 'De meeste bezoekers komen via hun telefoon. Daar ontwerpen we eerst voor.' },
          { title: 'Vindbaar vanaf dag één', text: 'Titels, structuur, structured data en een gekoppeld Google Bedrijfsprofiel.' },
          { title: 'Gebouwd om aanvragen op te leveren', text: 'Duidelijke CTA\'s, korte formulieren, WhatsApp en tracking van elke aanvraag.' },
          { title: 'Teksten die verkopen', text: 'Bij Web Groei schrijven we de teksten op basis van een kort gesprek.' },
        ],
        forWho: ['Starters die professioneel online willen', 'Bedrijven met een verouderde site', 'Ondernemers die meer aanvragen willen'],
        packageIds: ['web-start', 'web-groei', 'web-maatwerk'],
        faq: [
          { q: 'Wat is het verschil tussen Web Start en Web Groei?', a: 'Web Start is een compacte site van 1–5 pagina\'s. Web Groei heeft 6–15 pagina\'s, een maatwerkontwerp, copywriting, lokale landingspagina\'s en conversietracking.' },
          { q: 'Moet ik zelf teksten schrijven?', a: 'Bij Web Start lever je teksten aan (we helpen met de opbouw). Bij Web Groei en Maatwerk schrijven wij ze.' },
          { q: 'Welk platform gebruiken jullie?', a: 'TODO: platform(s) waarmee je bouwt, bijv. WordPress, Webflow of Next.js.' },
        ],
      },
      {
        slug: 'redesign',
        name: 'Redesign',
        title: 'Redesign: je site opnieuw, zonder je posities te verliezen',
        seoTitle: 'Website redesign, nieuw ontwerp zonder SEO-verlies',
        description: 'Website laten vernieuwen? Redesign met behoud van Google-posities dankzij 301-redirects en een nette migratie. Vaste prijs, excl. btw.',
        intro: 'Een verouderde site kost je aanvragen. Bij een redesign houden we vast wat werkt (je posities in Google) en vervangen we wat niet werkt.',
        points: [
          { title: 'Eerst meten', text: 'Welke pagina\'s leveren nu bezoek en aanvragen op? Die behouden we.' },
          { title: 'Nieuwe structuur', text: 'Duidelijke dienstpagina\'s, sterke CTA\'s en een snelle, moderne basis.' },
          { title: '301-redirects', text: 'Oude URL\'s verwijzen netjes door, zodat je geen bezoek of posities kwijtraakt.' },
          { title: 'Veilige software', text: 'Weg van verouderde PHP en plugins, naar een basis die we actueel houden.' },
        ],
        forWho: ['Sites ouder dan een paar jaar', 'Sites op verouderde WordPress of PHP', 'Bedrijven die veranderd zijn, maar hun site niet'],
        packageIds: ['web-groei', 'web-maatwerk', 'website-audit'],
        faq: [
          { q: 'Verlies ik mijn plek in Google?', a: 'Niet als je het goed doet. We brengen je bestaande URL\'s in kaart en zetten 301-redirects, zodat Google de nieuwe pagina\'s meteen vindt.' },
          { q: 'Kan ik mijn huidige teksten houden?', a: 'Ja, maar we lezen ze kritisch mee. Vaak levert een herschreven tekst meer aanvragen op.' },
          { q: 'Mijn site draait op PHP 8.2, moet ik iets doen?', a: 'PHP 8.2 krijgt na 31 december 2026 geen beveiligingsupdates meer. Vraag de <a href="/online-check">gratis Online Check</a> aan, dan zie je meteen of het voor jou speelt.' },
        ],
      },
      {
        slug: 'audit',
        name: 'Website-audit',
        title: 'Website-audit: weten waar je staat',
        seoTitle: 'Website-audit €395: techniek, snelheid, SEO, GEO en beveiliging',
        description: 'Website-audit voor €395 excl. btw: techniek, snelheid, SEO, AI-vindbaarheid (GEO) en beveiliging, met een rapport en prioriteitenlijst.',
        intro: 'Een grondige check van je site, met een rapport in gewone taal en een lijst van wat je als eerste moet aanpakken. Liever eerst gratis? Begin met de Online Check.',
        points: [
          { title: 'Techniek en snelheid', text: 'Core Web Vitals, laadtijd op mobiel, indexering en fouten.' },
          { title: 'SEO en GEO', text: 'Structuur, zoekwoorden, structured data en hoe AI-assistenten je zien.' },
          { title: 'Beveiliging', text: 'PHP-versie, plugins, SSL, back-ups en bekende kwetsbaarheden.' },
          { title: 'Prioriteitenlijst', text: 'Wat levert het meeste op voor de minste moeite? Daar begin je mee.' },
        ],
        forWho: ['Ondernemers die willen weten of hun site nog goed is', 'Bedrijven die twijfelen tussen opknappen en vernieuwen', 'Wie een second opinion wil'],
        packageIds: ['website-audit'],
        faq: [
          { q: 'Wat is het verschil met de gratis Online Check?', a: 'De <a href="/online-check">Online Check</a> geeft 3 verbeterpunten. De audit is een volledig rapport met een prioriteitenlijst.' },
          { q: 'Moet ik daarna bij jullie blijven?', a: 'Nee. Het rapport is van jou. Je kunt het zelf of met een andere partij uitvoeren.' },
          { q: 'Hoe snel krijg ik het rapport?', a: 'TODO: levertijd van de audit.' },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'webshops',
    index: '02',
    fromId: 'shop-start',
    inBundles: ['ontzorgd-webshop', 'ontzorgd-op-maat'],
    name: 'Webshops & e-commerce',
    short: 'Shopify en Magento: bouwen, beheren, laten groeien. Echt alles rondom je webshop.',
    icon: 'shop',
    headline: ['Een webshop bouwen is één ding.', 'Hem laten groeien is het werk.'],
    seoTitle: 'Webshop laten maken en beheren: Shopify, Magento en e-commerce',
    description: 'Alles rondom webshops: Shopify-webshop laten maken (vanaf €2.750), Magento-beheer en -development, webshopbeheer, CRO, e-mail, ads en migratie. Ervaring als e-commercespecialist.',
    intro: 'Bouwen, beheren, koppelen, adverteren, mailen, optimaliseren. We doen echt alles rondom je webshop, op Shopify én Magento. Met ervaring van binnenuit, als e-commercespecialist bij een B2B/B2C-webshop.',
    problems: ['Je bent meer tijd kwijt aan de shop dan aan inkoop en klanten.', 'Er komt verkeer binnen, maar de conversie blijft achter.', 'Advertenties lopen, maar zijn ze winstgevend?', 'Je WooCommerce-shop vraagt steeds meer onderhoud.'],
    approach: [
      { title: 'Analyse', text: 'Shop, data, assortiment, marges en kanalen. Waar zit de groei?' },
      { title: 'Bouwen of verbeteren', text: 'Een nieuwe Shopify-shop, een migratie of gerichte verbeteringen.' },
      { title: 'Meten', text: 'GA4, Meta Pixel, feeds en conversies goed ingericht.' },
      { title: 'Groeien', text: 'Beheer, CRO en advertenties in één hand.' },
    ],
    outcomes: ['Meer omzet uit hetzelfde verkeer', 'Een shop die altijd actueel is', 'Inzicht in wat winstgevend is', 'Tijd terug voor inkoop en klanten'],
    packageIds: ['shop-start', 'shop-groei', 'zorg-webshop', 'dev-uur', 'migratie', 'ontzorgd-webshop'],
    faq: [
      { q: 'Shopify of Magento?', a: 'Voor de meeste mkb-webshops is Shopify de beste keuze: stabiel, veilig en weinig onderhoud. Heb je een grote of complexe B2B-shop op Magento, dan beheren en ontwikkelen we die gewoon door. We adviseren eerlijk of blijven of overstappen slimmer is.' },
      { q: 'Kunnen jullie een bestaande webshop beheren?', a: 'Ja. We hoeven je shop niet gebouwd te hebben om hem te beheren en verder te ontwikkelen. Zie <a href="/diensten/webshops/beheer">webshopbeheer</a>.' },
      { q: 'Wat kost webshopbeheer?', a: 'Zorg Webshop kost €149 per maand. Met advertenties en CRO erbij is <a href="/pakketten#maandelijks">Ontzorgd Webshop</a> (€1.195/mnd) vaak voordeliger.' },
      { q: 'Zijn de Shopify-kosten inbegrepen?', a: 'Nee. Het Shopify-abonnement en eventuele apps betaal je rechtstreeks aan Shopify. Ze staan op jouw naam.' },
    ],
    relatedBranches: ['webshops'],
    relatedArticles: [],
    serviceType: 'E-commerce en webshopontwikkeling (Shopify)',
    subpages: [
      {
        slug: 'laten-maken',
        name: 'Webshop laten maken',
        title: 'Shopify-webshop laten maken',
        seoTitle: 'Shopify webshop laten maken vanaf €2.750',
        description: 'Shopify-webshop laten maken: Shop Start vanaf €2.750 (tot 50 producten), Shop Groei vanaf €4.950 met feeds en e-mailflows. Excl. btw.',
        intro: 'Een webshop die vertrouwen wekt, snel laadt en klaar is om te verkopen, met betalingen, verzending en tracking goed ingericht.',
        points: [
          { title: 'Ontwerp dat verkoopt', text: 'Productpagina\'s, filters en een checkout zonder drempels.' },
          { title: 'Betalen en verzenden', text: 'iDEAL en andere betaalmethoden, verzendregels en retouren.' },
          { title: 'Tracking vanaf dag één', text: 'GA4 en Meta Pixel, zodat je straks kunt adverteren op data.' },
          { title: 'Feeds en e-mail (Shop Groei)', text: 'Google Merchant, Meta-catalogus en e-mailflows zoals verlaten winkelmandje.' },
        ],
        forWho: ['Starters met een product', 'Winkels die online willen verkopen', 'Webshops die uit hun platform groeien'],
        packageIds: ['shop-start', 'shop-groei'],
        faq: [
          { q: 'Hoeveel producten kan ik kwijt?', a: 'Shop Start tot 50 producten, Shop Groei tot 500. Meer? Dan maken we een offerte.' },
          { q: 'Kan ik zelf producten toevoegen?', a: 'Ja, Shopify is makkelijk te beheren. Of laat het ons doen met Zorg Webshop.' },
          { q: 'Hoe lang duurt het bouwen?', a: 'TODO: doorlooptijden Shop Start en Shop Groei.' },
        ],
      },
      {
        slug: 'beheer',
        name: 'Webshopbeheer',
        title: 'Webshopbeheer: jouw shop in goede handen',
        seoTitle: 'Webshopbeheer Shopify vanaf €149 per maand',
        description: 'Webshopbeheer voor Shopify: productmutaties, app-updates, checkout-bewaking en doorontwikkeling. Zorg Webshop €149/mnd excl. btw.',
        intro: 'Producten, collecties, apps, koppelingen en de checkout. Wij houden het bij, zodat jij je op inkoop en klanten kunt richten.',
        points: [
          { title: 'Productmutaties', text: 'Nieuwe producten, prijzen, voorraad en collecties.' },
          { title: 'Apps en koppelingen', text: 'Updates, opruimen van ongebruikte apps en bewaken van koppelingen.' },
          { title: 'Checkout-bewaking', text: 'Werkt betalen nog? We houden het in de gaten.' },
          { title: 'Doorontwikkeling', text: 'Elke maand een paar verbeteringen op basis van data.' },
        ],
        forWho: ['Shopify-webshops zonder eigen e-commerceteam', 'Ondernemers die te veel tijd aan hun shop kwijt zijn'],
        packageIds: ['zorg-webshop', 'ontzorgd-webshop'],
        faq: [
          { q: 'Hoeveel productmutaties zitten erin?', a: 'TODO: hoeveel productmutaties of uren per maand in Zorg Webshop zitten.' },
          { q: 'Doen jullie ook Magento of WooCommerce?', a: 'Magento beheren en ontwikkelen we door, zie <a href="/diensten/webshops/magento">Magento</a>. Voor WooCommerce bespreken we beheer of een <a href="/diensten/webshops/migratie-naar-shopify">migratie</a>.' },
          { q: 'Kunnen jullie ook adverteren?', a: 'Ja. Combineer met <a href="/diensten/advertenties">advertenties</a>, of kies <a href="/pakketten#maandelijks">Ontzorgd Webshop</a>.' },
        ],
      },
      {
        slug: 'conversie-optimalisatie',
        name: 'Conversie-optimalisatie',
        title: 'Conversie-optimalisatie: meer omzet uit hetzelfde verkeer',
        seoTitle: 'Conversie-optimalisatie (CRO) voor webshops',
        description: 'Conversie-optimalisatie voor webshops: conversie-analyse, A/B-testplan en maandelijkse CRO-review. Meer omzet zonder meer advertentiebudget.',
        intro: 'Extra verkeer inkopen wordt steeds duurder. Vaak levert het meer op om meer bezoekers te laten kopen.',
        points: [
          { title: 'Conversie-analyse', text: 'Waar haken bezoekers af? Op productpagina\'s, in het winkelmandje of in de checkout?' },
          { title: 'A/B-testplan', text: 'Eén wijziging per test, met een vooraf bepaald doel.' },
          { title: 'Maandelijkse review', text: 'Wat werkte, wat niet, en wat testen we nu.' },
        ],
        forWho: ['Webshops met voldoende bezoekers om te testen', 'Shops waarvan de advertentiekosten stijgen'],
        packageIds: ['ontzorgd-webshop'],
        faq: [
          { q: 'Hoeveel bezoekers heb ik nodig voor A/B-testen?', a: 'Dat hangt af van je conversie. Bij weinig verkeer werken we met analyse en best practices in plaats van statistische tests.' },
          { q: 'Wat kost CRO?', a: 'In <a href="/pakketten#maandelijks">Ontzorgd Webshop</a> (€1.195 per maand) zit een maandelijkse CRO-review. Losse verbeteringen bouwen we met development-uren (€360 per maand voor 4 uur).' },
        ],
      },
      {
        slug: 'magento',
        name: 'Magento',
        title: 'Magento-beheer en -development',
        seoTitle: 'Magento-beheer en Magento-development (Adobe Commerce)',
        description: 'Magento-webshop laten beheren of doorontwikkelen: security-patches, extensies, upgrades, koppelingen en maatwerk. Of eerlijk advies over migreren naar Shopify.',
        intro: 'Magento (Adobe Commerce) is krachtig, maar vraagt onderhoud en specialistische kennis. We houden je shop veilig en up-to-date, en bouwen door waar nodig.',
        points: [
          { title: 'Security en updates', text: 'Security-patches, versie-upgrades en extensies bijwerken.' },
          { title: 'Development', text: 'Nieuwe functies, B2B-features, extensies en performance-verbeteringen.' },
          { title: 'Koppelingen', text: 'ERP, PIM, voorraad, verzending en boekhouding.' },
          { title: 'Eerlijk advies', text: 'Blijven of overstappen naar Shopify? We rekenen het samen door.' },
        ],
        forWho: ['Grotere of complexe webshops', 'B2B-shops met klantspecifieke prijzen', 'Shops op een verouderde Magento-versie'],
        packageIds: ['zorg-webshop', 'dev-uur', 'migratie'],
        faq: [
          { q: 'Mijn Magento-versie is verouderd. Wat nu?', a: 'Dan is een upgrade of migratie nodig om veilig te blijven. We brengen in kaart wat het kost om te upgraden en wat het kost om over te stappen.' },
          { q: 'Doen jullie ook Adobe Commerce?', a: 'Ja. TODO: beschrijf je ervaring en welke Magento-versies je ondersteunt.' },
        ],
      },
      {
        slug: 'migratie-naar-shopify',
        name: 'Migratie naar Shopify',
        title: 'Van WooCommerce of Magento naar Shopify',
        seoTitle: 'Migratie naar Shopify vanaf €1.500, met 301-redirects',
        description: 'Webshop migreren van WooCommerce of Magento naar Shopify, inclusief producten, klanten, bestellingen en 301-redirects. Vanaf €1.500 excl. btw.',
        intro: 'Minder onderhoud, minder beveiligingszorgen en een snellere shop. We verhuizen alles, zonder dat je je posities in Google verliest.',
        points: [
          { title: 'Alles mee', text: 'Producten, varianten, klanten en bestelgeschiedenis.' },
          { title: '301-redirects', text: 'Elke oude URL verwijst naar de juiste nieuwe pagina.' },
          { title: 'Tracking opnieuw ingericht', text: 'GA4, Meta Pixel en feeds werken direct na de verhuizing.' },
          { title: 'Controle na livegang', text: 'We houden 404\'s en posities in de gaten in de weken erna.' },
        ],
        forWho: ['WooCommerce-shops met veel onderhoud', 'Magento-shops die te zwaar zijn geworden'],
        packageIds: ['migratie'],
        faq: [
          { q: 'Raak ik mijn Google-posities kwijt?', a: 'Met goede 301-redirects en dezelfde content is het risico klein. We monitoren de weken na de migratie.' },
          { q: 'Hoe lang ligt mijn shop eruit?', a: 'Normaal niet. We bouwen de nieuwe shop ernaast en schakelen over op een rustig moment.' },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'onderhoud',
    index: '03',
    fromId: 'zorg-basis',
    inBundles: ['ontzorgd-lokaal', 'ontzorgd-leads', 'ontzorgd-webshop', 'ontzorgd-op-maat'],
    name: 'Onderhoud, hosting & development',
    short: 'Zorg-pakketten (hosting, updates, back-ups), development-uren, koppelingen en maatwerk.',
    icon: 'shield',
    headline: ['Je site veilig.', 'Elke dag. Zonder omkijken.'],
    seoTitle: 'Website onderhoud en hosting vanaf €49 per maand',
    description: 'Zorgabonnement voor je website: hosting, SSL, updates, back-ups en monitoring vanaf €49/mnd. PHP 8.2 stopt eind 2026: check of jouw site veilig is.',
    intro: 'Het zorgabonnement is de vaste basis onder elke site die we bouwen. Hosting, updates, back-ups en beveiliging, geregeld en gemeten.',
    problems: ['Niemand weet wanneer de laatste update was.', 'Je site draait op verouderde PHP of plugins.', 'Er is geen back-up, of niemand weet waar hij staat.', 'Je hoort pas dat je site plat lag als een klant belt.'],
    approach: [
      { title: 'Overzetten', text: 'We nemen je site over op snelle hosting, of nemen bestaande hosting in beheer.' },
      { title: 'Bijwerken', text: 'Software, plugins en PHP naar een veilige versie.' },
      { title: 'Bewaken', text: 'Uptime-monitoring, dagelijkse back-ups en beveiligingsscans.' },
      { title: 'Rapporteren', text: 'Bij Zorg Plus elke maand één pagina: wat er gebeurde.' },
    ],
    outcomes: ['Een site die veilig en snel blijft', 'Back-ups als het misgaat', 'Geen verrassingen over verouderde software', 'Kleine wijzigingen zonder gedoe'],
    packageIds: ['zorg-basis', 'zorg-plus', 'zorg-webshop', 'development-uren', 'koppeling', 'dev-uur'],
    faq: [
      { q: 'Wat gebeurt er als PHP 8.2 stopt?', a: 'Na 31 december 2026 komen er geen beveiligingsupdates meer voor PHP 8.2. Nieuwe lekken worden dan niet meer gedicht. De <a href="/online-check">gratis Online Check</a> laat zien of jouw site op PHP 8.2 draait.' },
      { q: 'Kunnen jullie mijn bestaande site in onderhoud nemen?', a: 'Ja. We doen eerst een korte check of de basis goed genoeg is. Soms is eerst een update of <a href="/diensten/websites/redesign">redesign</a> nodig.' },
      { q: 'Wat zit er in "1 uur wijzigingen"?', a: 'Kleine aanpassingen zoals teksten, foto\'s, openingstijden of een nieuwe pagina op basis van een bestaand ontwerp. Niet gebruikt? Dan vervalt het uur.' },
      { q: 'Waar wordt mijn site gehost?', a: 'TODO: hostingpartij en datacenterlocatie (bij voorkeur EU).' },
    ],
    relatedBranches: ['zakelijke-dienstverlening', 'zorg', 'bouw-en-installatie'],
    relatedArticles: ['php-8-2-stopt-eind-2026'],
    serviceType: 'Websiteonderhoud, hosting en beveiliging',
    subpages: [
      {
        slug: 'maatwerk',
        name: 'Maatwerk',
        title: 'Maatwerk-development voor sites en webshops',
        seoTitle: 'Maatwerk-development: B2B-functies, configurators en eigen tools',
        description: 'Maatwerk voor je website of webshop: B2B-prijzen, configurators, snel-bestellen, klantportalen en eigen tools. Vaste prijs per project.',
        intro: 'Functionaliteit die niet standaard bestaat. Bijvoorbeeld zakelijke accounts met nettoprijzen, bestellen via een lijst of XML-upload, een productconfigurator of een klantportaal.',
        points: [
          { title: 'B2B-functies', text: 'Klantspecifieke prijzen, staffels, snel bestellen en prijzen excl. btw.' },
          { title: 'Configurators', text: 'Producten op maat samenstellen, met live prijs.' },
          { title: 'Klantportalen', text: 'Bestelhistorie, facturen en nabestellen op één plek.' },
          { title: 'Eigen tools', text: 'Interne dashboards en hulpmiddelen die je team tijd besparen.' },
        ],
        forWho: ['B2B-webshops', 'Bedrijven met een afwijkend verkoopproces', 'Teams met veel handwerk'],
        packageIds: ['dev-uur', 'development-uren'],
        faq: [
          { q: 'Hoe weet ik vooraf wat het kost?', a: 'We maken eerst een technisch ontwerp met een vaste prijs. Pas na jouw akkoord bouwen we.' },
          { q: 'Wie onderhoudt het daarna?', a: 'Wij, via beheer of development-uren. Of je eigen team, met onze documentatie.' },
        ],
      },
      {
        slug: 'koppelingen',
        name: 'Koppelingen',
        title: 'Koppelingen: je systemen praten met elkaar',
        seoTitle: 'Koppelingen voor webshops: ERP, PIM, voorraad en boekhouding',
        description: 'Webshop koppelen met ERP, PIM, voorraad, verzending en boekhouding. Minder overtikken, minder fouten. Shopify, Magento en WooCommerce.',
        intro: 'Orders, voorraad, producten, klanten en facturen automatisch op de juiste plek. Zonder overtikken, en met monitoring als er iets misgaat.',
        points: [
          { title: 'ERP en voorraad', text: 'Voorraad en orders synchroon tussen webshop en ERP.' },
          { title: 'PIM en productdata', text: 'Eén bron voor productinformatie, naar shop, feeds en marktplaatsen.' },
          { title: 'Boekhouding en verzending', text: 'Facturen en verzendlabels zonder handwerk.' },
          { title: 'Monitoring', text: 'We merken het als een koppeling hapert, vaak vóórdat jij het merkt.' },
        ],
        forWho: ['Webshops met een ERP of PIM', 'Bedrijven die orders handmatig overtikken'],
        packageIds: ['koppeling', 'ai-automatisering'],
        faq: [
          { q: 'Mijn systeem heeft geen standaardkoppeling.', a: 'Vaak kan het via een API, een bestand (XML/CSV) of een tool als n8n of Make. We zoeken de betrouwbaarste route.' },
          { q: 'Wat als de koppeling stopt?', a: 'Met monitoring krijgen we een melding en lossen we het op. Dat regel je via beheer of development-uren.' },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'vindbaarheid',
    index: '04',
    fromId: 'ontzorgd-lokaal',
    inBundles: ['ontzorgd-lokaal', 'ontzorgd-leads', 'ontzorgd-op-maat'],
    name: 'Vindbaarheid',
    short: 'SEO, lokale SEO, Bedrijfsprofiel en GEO: gevonden in Google én AI.',
    icon: 'search',
    headline: ['Gevonden in Google.', 'Genoemd door AI.'],
    seoTitle: 'SEO, lokale SEO en GEO in Friesland, gevonden in Google en AI',
    description: 'SEO, lokale SEO, Google Bedrijfsprofiel en GEO (AI-vindbaarheid). Bedrijfsprofiel-setup €245, Lokaal Zichtbaar €395/mnd, SEO + GEO Groei €795/mnd. Excl. btw.',
    intro: 'Klanten zoeken in Google, in Google Maps en steeds vaker in ChatGPT, Gemini en Perplexity. Wij zorgen dat jij daar gevonden wordt, en we meten het.',
    problems: ['Je concurrent staat bovenaan, ook al ben jij beter.', 'Je Bedrijfsprofiel is half ingevuld en heeft weinig reviews.', 'In ChatGPT word je niet genoemd.', 'Je weet niet wat SEO je oplevert.'],
    approach: [
      { title: 'Nulmeting', text: 'Posities, Bedrijfsprofiel, techniek en hoe AI-assistenten over jouw branche praten.' },
      { title: 'Fundament', text: 'Technische SEO, structured data, een llms.txt en een compleet Bedrijfsprofiel.' },
      { title: 'Content en reviews', text: 'Lokale pagina\'s, antwoorden op klantvragen en een reviewproces.' },
      { title: 'Meten', text: 'Maandelijks posities, aanvragen en AI-citaties, in gewone taal.' },
    ],
    outcomes: ['Meer aanvragen uit je eigen regio', 'Zichtbaar in Google Maps', 'Citeerbaar voor AI-assistenten', 'Inzicht in wat het oplevert'],
    packageIds: ['bedrijfsprofiel-setup', 'geo-scan', 'lokaal-zichtbaar', 'seo-geo-groei'],
    faq: [
      { q: 'Kunnen jullie garanderen dat ChatGPT mij noemt?', a: 'Nee. Niemand kan een AI-aanbeveling garanderen, en wantrouw bureaus die dat wel doen. Wat we wel doen: je citeerbaar maken en meten of het werkt.' },
      { q: 'Wat is GEO?', a: 'Generative Engine Optimization: zorgen dat AI-assistenten je bedrijf kennen, begrijpen en noemen. Het bouwt voort op goede SEO. Zie <a href="/diensten/vindbaarheid/geo-ai-zichtbaarheid">GEO / AI-zichtbaarheid</a>.' },
      { q: 'Hoe snel zie ik resultaat?', a: 'Een beter Bedrijfsprofiel kan binnen weken effect hebben. Hogere posities op concurrerende zoekwoorden kosten meestal enkele maanden.' },
      { q: 'Is GEO belangrijker dan Google?', a: 'Voor lokale bedrijven nog niet: Google heeft in Nederland nog ruim het grootste aandeel. GEO is een laag bovenop goede lokale SEO, geen vervanging.' },
    ],
    relatedBranches: ['bouw-en-installatie', 'kappers-en-salons', 'zakelijke-dienstverlening'],
    relatedArticles: ['gevonden-worden-in-chatgpt-lokaal-bedrijf'],
    serviceType: 'Zoekmachineoptimalisatie (SEO, lokale SEO en GEO)',
    subpages: [
      {
        slug: 'seo',
        name: 'SEO',
        title: 'SEO: hoger in Google, zonder per klik te betalen',
        seoTitle: 'SEO uitbesteden in Friesland, technisch, content en structured data',
        description: 'SEO voor mkb: technische SEO, content en structured data. SEO + GEO Groei €795/mnd excl. btw, met AI-citatiemeting.',
        intro: 'Organisch gevonden worden levert blijvend bezoek op. We zorgen dat de techniek klopt, dat je content antwoord geeft en dat zoekmachines je goed begrijpen.',
        points: [
          { title: 'Technische SEO', text: 'Snelheid, indexering, canonicals, sitemaps en interne links.' },
          { title: 'Content', text: 'Dienstpagina\'s en artikelen die antwoord geven op wat klanten zoeken.' },
          { title: 'Structured data', text: 'Schema.org voor je bedrijf, diensten, FAQ\'s en artikelen.' },
          { title: 'Meten', text: 'Posities, verkeer en aanvragen. Plus AI-citaties.' },
        ],
        forWho: ['Bedrijven met concurrentie in Google', 'Webshops met veel categorieën', 'Zakelijke dienstverleners'],
        packageIds: ['seo-geo-groei', 'website-audit'],
        faq: [
          { q: 'Hoe lang moet ik SEO doen?', a: 'SEO werkt cumulatief. Reken op minimaal een paar maanden voor duidelijk resultaat. Na de eerste 3 maanden is het maandelijks opzegbaar.' },
          { q: 'Schrijven jullie de content?', a: 'Ja, op basis van een gesprek of je input. Jij leest mee, want jij kent je vak.' },
        ],
      },
      {
        slug: 'lokale-seo',
        name: 'Lokale SEO',
        title: 'Lokale SEO: gevonden in je eigen regio',
        seoTitle: 'Lokale SEO in Leeuwarden en Friesland vanaf €395/mnd',
        description: 'Lokale SEO voor Friese ondernemers: Bedrijfsprofiel, reviews, lokale pagina\'s en GEO-monitoring. Lokaal Zichtbaar €395/mnd excl. btw.',
        intro: 'Zoekopdrachten als "installateur Leeuwarden" of "kapper Sneek" leveren klanten op die nú iets nodig hebben. Lokale SEO zorgt dat jij dan in beeld bent.',
        points: [
          { title: 'Bedrijfsprofiel-beheer', text: 'Actueel, compleet en met regelmatige updates.' },
          { title: 'Reviewopvolging', text: 'Een makkelijk reviewproces en reacties op elke review.' },
          { title: 'Lokale pagina\'s', text: '1–2 pagina\'s per maand met echte lokale content, geen kopieën met een andere plaatsnaam.' },
          { title: 'GEO-monitoring', text: 'Hoe vaak noemen AI-assistenten je bij lokale vragen?' },
        ],
        forWho: ['Vakmensen met een werkgebied', 'Salons en praktijken', 'Horeca en winkels'],
        packageIds: ['lokaal-zichtbaar', 'bedrijfsprofiel-setup'],
        faq: [
          { q: 'Hoe krijg ik meer reviews?', a: 'Door het makkelijk te maken: een korte link of QR-code, op het juiste moment gevraagd. Nep-reviews of gekochte reviews doen we nooit.' },
          { q: 'Werkt dit ook buiten Leeuwarden?', a: 'Ja. We stellen je servicegebied in en maken content voor de plaatsen waar je klanten zitten.' },
        ],
      },
      {
        slug: 'geo-ai-zichtbaarheid',
        name: 'GEO / AI-zichtbaarheid',
        title: 'GEO: citeerbaar voor ChatGPT, Gemini, Perplexity en Claude',
        seoTitle: 'GEO: gevonden worden in ChatGPT en AI-zoekmachines',
        description: 'GEO-scan €245: hoe ChatGPT, Gemini, Perplexity en Claude jouw bedrijf noemen, met verbeterlijst. Eerlijk: geen garanties, wel meten.',
        intro: 'Nederland telt inmiddels 8,5 tot 9 miljoen gebruikers van AI-tools, en 1 op de 5 consumenten begint een aankooporiëntatie in een AI-tool. We kunnen geen AI-aanbeveling garanderen. We maken je wel citeerbaar, en we meten het.',
        points: [
          { title: 'GEO-scan', text: 'We stellen de vragen die jouw klanten stellen aan vier AI-assistenten, en kijken wie er genoemd wordt.' },
          { title: 'Citeerbare content', text: 'Directe, feitelijke antwoorden, FAQ\'s en duidelijke informatie over wat je doet en waar.' },
          { title: 'Machineleesbaar', text: 'Structured data, een llms.txt en een robots.txt die AI-crawlers toelaat.' },
          { title: 'Vermeldingen', text: 'Consistente gegevens op gidsen, brancheplatforms en lokale media.' },
        ],
        forWho: ['Zakelijke dienstverleners', 'Bedrijven met concurrentie online', 'Iedereen die wil weten hoe AI over hen praat'],
        packageIds: ['geo-scan', 'lokaal-zichtbaar', 'seo-geo-groei'],
        faq: [
          { q: 'Waarom geven jullie geen garantie?', a: 'Omdat AI-assistenten zelf bepalen wat ze antwoorden, per vraag en per moment. Wie "gegarandeerd" belooft, kan dat niet waarmaken. Wij meten het wel, elke maand.' },
          { q: 'Wat is llms.txt?', a: 'Een tekstbestand op je site met een heldere samenvatting voor AI-systemen. Deze site heeft er ook een: <a href="/llms.txt">/llms.txt</a>.' },
          { q: 'Is er een gratis versie?', a: 'Ja. In de <a href="/online-check">gratis Online Check</a> zit een mini-versie van de GEO-scan.' },
        ],
      },
      {
        slug: 'google-bedrijfsprofiel',
        name: 'Google Bedrijfsprofiel',
        title: 'Google Bedrijfsprofiel: compleet, actueel en gevonden',
        seoTitle: 'Google Bedrijfsprofiel optimaliseren €245 eenmalig',
        description: 'Google Bedrijfsprofiel, Bing Places en Apple Business Connect ingericht voor €245 eenmalig: categorieën, foto\'s en reviewlink. Excl. btw.',
        intro: 'Je Bedrijfsprofiel bepaalt of je in Google Maps verschijnt. Veel profielen zijn half ingevuld of verouderd. Dat is zonde, want het is gratis zichtbaarheid.',
        points: [
          { title: 'Drie platforms', text: 'Google Bedrijfsprofiel, Bing Places en Apple Business Connect.' },
          { title: 'Juiste categorieën', text: 'De primaire categorie bepaalt veel. We kiezen die met zorg.' },
          { title: 'Foto\'s en diensten', text: 'Compleet ingevuld, met diensten, openingstijden en foto\'s.' },
          { title: 'Reviewlink', text: 'Een korte link en QR-code om reviews te vragen.' },
        ],
        forWho: ['Elke lokale ondernemer', 'Bedrijven met een verouderd of ongeclaimd profiel'],
        packageIds: ['bedrijfsprofiel-setup', 'lokaal-zichtbaar'],
        faq: [
          { q: 'Mijn profiel is door iemand anders geclaimd, wat nu?', a: 'Dat lossen we op via Google. Het profiel komt daarna op jouw naam te staan.' },
          { q: 'Houden jullie het daarna bij?', a: 'Met <a href="/diensten/vindbaarheid/lokale-seo">Lokaal Zichtbaar</a> beheren we het doorlopend.' },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'advertenties',
    index: '05',
    fromId: 'google-ads-lokaal',
    inBundles: ['ontzorgd-leads', 'ontzorgd-webshop', 'ontzorgd-op-maat'],
    name: 'Advertenties & e-mail',
    short: 'Google Ads, Meta Ads, mediabuying en e-mailcampagnes op maat.',
    icon: 'ads',
    headline: ['Elke euro budget.', 'Te volgen tot de aanvraag.'],
    seoTitle: 'Google Ads, Meta Ads en e-mailmarketing uitbesteden',
    description: 'Google Ads Lokaal €275/mnd + €345 inrichting, Google Ads Shop €495/mnd + €495 inrichting, Meta Ads €545/mnd. Excl. btw en excl. advertentiebudget.',
    intro: 'Advertenties werken als je weet wat ze opleveren. We richten campagnes in met goede conversietracking, sturen op kosten per aanvraag of omzet, en rapporteren in gewone taal.',
    problems: ['Er gaat budget naar Google of Meta, maar niemand weet wat het oplevert.', 'Conversies worden niet of dubbel gemeten.', 'Campagnes staan op "automatisch".', 'Je account staat op naam van een vorig bureau.'],
    approach: [
      { title: 'Tracking eerst', text: 'Conversies en Consent Mode v2 op orde voordat er budget uitgaat.' },
      { title: 'Opzetten', text: 'Campagnes met een duidelijk doel per campagne.' },
      { title: 'Optimaliseren', text: 'Zoektermen, doelgroepen, biedingen en advertenties bijsturen.' },
      { title: 'Rapporteren', text: 'Eén pagina per maand: kosten, aanvragen en volgende stappen.' },
    ],
    outcomes: ['Inzicht in kosten per aanvraag', 'Minder verspild budget', 'Accounts op jouw naam', 'Geen lange contracten'],
    packageIds: ['google-ads-lokaal', 'google-ads-shop', 'meta-ads', 'meta-ads-creatives', 'ontzorgd-webshop', 'ontzorgd-op-maat'],
    faq: [
      { q: 'Hoeveel advertentiebudget heb ik nodig?', a: 'Voor een lokale dienstverlener is een paar honderd tot €1.500 per maand een realistische start. In de kennismaking geven we een eerlijke inschatting.' },
      { q: 'Betaal ik het budget aan jullie?', a: 'Nee. Het budget betaal je rechtstreeks aan Google of Meta, via een account op jouw naam. Wij rekenen alleen voor het beheer.' },
      { q: 'Maken jullie ook de advertenties?', a: 'Bij Meta Ads + Creatives maken we 6–10 statische of video-advertenties per maand. Bij Meta Ads lever je ze zelf aan.' },
    ],
    relatedBranches: ['webshops', 'bouw-en-installatie'],
    relatedArticles: [],
    serviceType: 'Online adverteren en mediabuying',
    subpages: [
      {
        slug: 'google-ads',
        name: 'Google Ads',
        title: 'Google Ads: bovenaan op het moment dat iemand zoekt',
        seoTitle: 'Google Ads uitbesteden vanaf €275/mnd',
        description: 'Google Ads beheer: Google Ads Lokaal €275/mnd + €345 inrichting, Google Ads Shop €495/mnd + €495 inrichting. Excl. btw en advertentiebudget.',
        intro: 'Search-campagnes voor lokale dienstverleners, Shopping en Performance Max voor webshops. Met conversietracking die klopt.',
        points: [
          { title: 'Search lokaal', text: 'Zoekwoorden met koopintentie in jouw werkgebied, met uitsluitingen.' },
          { title: 'Shopping / PMax', text: 'Productfeed via Merchant Center, sturen op ROAS.' },
          { title: 'Conversietracking', text: 'Formulieren, telefoontjes en aankopen gemeten, met Consent Mode v2.' },
          { title: 'Maandrapport', text: 'Wat kostte het, wat leverde het op?' },
        ],
        forWho: ['Lokale dienstverleners (budget tot €1.500)', 'Webshops (budget €1.500–€5.000)'],
        packageIds: ['google-ads-lokaal', 'google-ads-shop'],
        faq: [
          { q: 'Wat is Consent Mode v2?', a: 'Een manier om Google te laten weten of een bezoeker toestemming gaf voor cookies. Nodig om in de EU goed te blijven meten en remarketing te gebruiken.' },
          { q: 'Mijn account staat bij een ander bureau.', a: 'We helpen je het account op je eigen naam te krijgen. Daarna krijgen wij beheerrechten.' },
        ],
      },
      {
        slug: 'meta-ads',
        name: 'Meta Ads',
        title: 'Meta Ads: Facebook en Instagram, gestructureerd getest',
        seoTitle: 'Meta Ads (Facebook en Instagram) uitbesteden vanaf €545/mnd',
        description: 'Meta Ads beheer €545/mnd, of Meta Ads + Creatives €1.195/mnd met 6–10 advertenties per maand. Excl. btw en advertentiebudget.',
        intro: 'Meta is sterk voor webshops en voor bedrijven die vraag willen creëren. We bouwen een heldere campagnestructuur en testen gestructureerd wat werkt.',
        points: [
          { title: 'Campagnestructuur', text: 'Overzichtelijk, met duidelijke doelen en budgetten.' },
          { title: 'Doelgroepen en testen', text: 'Eén variabele per test, zodat je echt leert wat werkt.' },
          { title: 'Creatives (optioneel)', text: '6–10 statische of video-advertenties per maand.' },
          { title: 'Tracking', text: 'Meta Pixel en Conversions API goed ingericht.' },
        ],
        forWho: ['Webshops', 'Horeca, salons en events', 'Merken met een visueel product'],
        packageIds: ['meta-ads', 'meta-ads-creatives'],
        faq: [
          { q: 'Wat lever ik aan bij Meta Ads?', a: 'Foto\'s, video\'s of kant-en-klare advertenties. Liever niet zelf? Kies Meta Ads + Creatives.' },
          { q: 'Doen jullie ook TikTok?', a: 'Ja, als onderdeel van <a href="/pakketten#maandelijks">Ontzorgd Op Maat</a> (vanaf €1.950 per maand), als het past bij je product en doelgroep.' },
        ],
      },
      {
        slug: 'mediabuying',
        name: 'Mediabuying',
        title: 'Mediabuying: budget verdelen over kanalen',
        seoTitle: 'Mediabuying voor mkb en webshops',
        description: 'Mediabuying over Google, Meta en TikTok: budget verdelen op basis van data, met één rapport. Voor webshops en groeiende mkb-bedrijven.',
        intro: 'Wie op meerdere kanalen adverteert, moet kiezen waar de volgende euro naartoe gaat. Wij verdelen budget op basis van wat het oplevert, niet op gevoel.',
        points: [
          { title: 'Kanaalmix', text: 'Google, Meta en TikTok in samenhang, niet als losse eilandjes.' },
          { title: 'Budgetverdeling', text: 'Maandelijks bijsturen op basis van marge en rendement.' },
          { title: 'Eén rapport', text: 'Alle kanalen op één pagina.' },
        ],
        forWho: ['Webshops met meerdere kanalen', 'Bedrijven met een advertentiebudget vanaf ±€2.000/mnd'],
        packageIds: ['google-ads-shop', 'meta-ads'],
        faq: [
          { q: 'Vanaf welk budget is mediabuying zinvol?', a: 'Vanaf ongeveer €2.000 per maand over meerdere kanalen. Daaronder is focus op één kanaal meestal beter.' },
          { q: 'Wat kost het?', a: 'Je combineert de beheerpakketten per kanaal. Voor webshops is <a href="/pakketten#maandelijks">Ontzorgd Webshop</a> vaak de handigste vorm.' },
        ],
      },
      {
        slug: 'e-mailmarketing',
        name: 'E-mailmarketing',
        title: 'E-mailmarketing: flows en campagnes op maat',
        seoTitle: 'E-mailmarketing uitbesteden: flows en campagnes (Klaviyo, Mailchimp)',
        description: 'E-mailflows en e-mailcampagnes op maat voor webshops en dienstverleners: welkomstreeks, verlaten winkelmandje, nieuwsbrieven en segmentatie.',
        intro: 'E-mail is het kanaal dat je zelf bezit. Geen algoritme, geen klikprijs. Met slimme flows en campagnes verkoop je opnieuw aan klanten die je al hebt.',
        points: [
          { title: 'Flows', text: 'Welkomstreeks, verlaten winkelmandje, na aankoop en herhaalaankoop. Eén keer inrichten, blijft werken.' },
          { title: 'Campagnes op maat', text: 'Nieuwsbrieven en acties in jouw stijl, volgens een campagnekalender.' },
          { title: 'Segmentatie', text: 'De juiste mail naar de juiste klant: nieuw, vast, slapend, zakelijk.' },
          { title: 'Meten op omzet', text: 'Niet alleen opens en kliks, maar wat het oplevert.' },
        ],
        forWho: ['Webshops', 'Dienstverleners met een klantenbestand', 'Horeca en salons met vaste gasten'],
        packageIds: ['ontzorgd-webshop', 'ontzorgd-op-maat'],
        faq: [
          { q: 'Met welk e-mailplatform werken jullie?', a: 'Vooral Klaviyo (webshops) en Mailchimp. Heb je al een platform, dan kijken we of we daarmee verder kunnen.' },
          { q: 'Mag ik zomaar mailen naar mijn klanten?', a: 'Alleen met toestemming of binnen een bestaande klantrelatie, en altijd met een afmeldlink. We richten het AVG-proof in. <em>Dit is geen juridisch advies.</em>' },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'ai',
    index: '06',
    fromId: 'ai-kennismaking',
    inBundles: ['ontzorgd-leads'],
    inLabel: 'AI-teamworkshop zit in',
    name: 'AI',
    short: 'AI-workshops, implementatie, chatbots en automatisering.',
    icon: 'ai',
    headline: ['Van losse proefjes.', 'Naar veilig, gemeten AI.'],
    seoTitle: 'AI-workshops en AI-implementatie voor mkb in Friesland',
    description: 'AI-workshops in Leeuwarden (€195 p.p.) en in-company (€1.295) met AI-geletterdheidsdossier, AI-Quickscan €795, chatbots en automatisering. Veilig AI-gebruik voor mkb.',
    intro: 'Bijna elk bedrijf heeft ChatGPT wel eens geprobeerd. Weinig bedrijven gebruiken AI veilig en structureel. De grootste drempels zijn gebrek aan ervaring en zorgen over privacy, niet de kosten. Wij brengen je van losse proefjes naar veilig, gemeten en gekoppeld AI-gebruik.',
    problems: ['Medewerkers plakken klantgegevens in gratis chatbots.', 'Iedereen gebruikt een ander tooltje, niemand meet wat het oplevert.', 'Je wilt "iets met AI", maar weet niet waar te beginnen.', 'Je hebt geen idee wat de AI Act van je vraagt.'],
    approach: [
      { title: 'Workshop', text: 'Veilig werken met ChatGPT, Copilot en Claude, met jullie eigen werk.' },
      { title: 'Quickscan', text: 'Waar zit de tijdwinst? Drie quick wins en een tijdsbaseline.' },
      { title: 'Implementatie', text: 'Een chatbot of een gekoppelde workflow die echt werk uit handen neemt.' },
      { title: 'Partner', text: 'Maandelijks spreekuur, onderhoud en elk kwartaal een nieuwe use case.' },
    ],
    outcomes: ['Veilig AI-gebruik met duidelijke afspraken', 'Aantoonbare maatregelen voor AI-geletterdheid', 'Gemeten tijdwinst', 'AI gekoppeld aan je eigen systemen'],
    packageIds: ['ai-kennismaking', 'ai-teamworkshop', 'ai-quickscan', 'ai-chatbot', 'ai-automatisering', 'ai-implementatie', 'ai-partner'],
    faq: [
      { q: 'Wat vraagt de AI Act van mijn bedrijf?', a: 'Artikel 4 van de AI Act vraagt organisaties maatregelen te nemen voor de AI-geletterdheid van hun mensen. Het AI-geletterdheidsdossier uit de teamworkshop helpt je dat aantoonbaar te maken. <em>Dit is geen juridisch advies.</em>' },
      { q: 'Is het gebruik van gratis chatbots een AVG-risico?', a: 'Het kan. Wie vertrouwelijke of persoonsgegevens in een gratis chatbot plakt, verliest de controle over die gegevens. In de workshop maken we afspraken over wat wel en niet mag. <em>Dit is geen juridisch advies.</em>' },
      { q: 'Is er subsidie?', a: 'Een AI-quickscan met een duurzaamheidshoek kan mogelijk in aanmerking komen voor de Adviesvoucherregeling Fryslân. Vraag ons ernaar. Garanties kunnen we niet geven.' },
      { q: 'Met welke tools werken jullie?', a: 'ChatGPT, Microsoft Copilot en Claude voor dagelijks gebruik, en n8n of Make voor automatisering. We kiezen wat bij jouw situatie en privacy-eisen past.' },
    ],
    relatedBranches: ['zakelijke-dienstverlening', 'webshops'],
    relatedArticles: ['veilig-ai-gebruiken-in-je-bedrijf'],
    serviceType: 'AI-training en AI-implementatie',
    subpages: [
      {
        slug: 'workshops',
        name: 'AI-workshops',
        title: 'AI-workshops: veilig werken met ChatGPT, Copilot en Claude',
        seoTitle: 'AI-workshop Leeuwarden €195 p.p., in-company €1.295',
        description: 'AI-workshop in Leeuwarden (open groep, €195 p.p.) of in-company (halve dag €1.295, max. 12 personen) met AI-geletterdheidsdossier.',
        intro: 'Een praktische workshop waarin je team leert veilig en slim met AI te werken, met jullie eigen werk als oefenmateriaal. Je gaat naar huis met een dossier dat laat zien welke maatregelen je hebt genomen.',
        points: [
          { title: 'Open groep in Leeuwarden', text: 'Middagworkshop van 3 uur. Ideaal om zelf te beginnen.' },
          { title: 'In-company', text: 'Halve of hele dag, max. 12 personen, bij jou op locatie in Noord-Nederland.' },
          { title: 'AI-geletterdheidsdossier', text: 'AI-beleid, toolregister, data-do\'s en -don\'ts en een presentielijst.' },
          { title: 'Eigen werk', text: 'Offertes, e-mails, teksten, analyses: oefenen met wat jullie echt doen.' },
        ],
        forWho: ['Teams in zakelijke dienstverlening', 'Ondernemers die zelf willen beginnen', 'Organisaties die AI-afspraken willen vastleggen'],
        packageIds: ['ai-kennismaking', 'ai-teamworkshop'],
        faq: [
          { q: 'Wanneer is de volgende open workshop?', a: 'TODO: data van de open workshops, of een link naar de inschrijving.' },
          { q: 'Wat staat er in het AI-geletterdheidsdossier?', a: 'Een AI-beleid op maat, een register van gebruikte tools, afspraken over welke data wel en niet in AI mag, en een presentielijst van de workshop. <em>Dit is geen juridisch advies.</em>' },
          { q: 'Hebben deelnemers ervaring nodig?', a: 'Nee. We beginnen bij de basis en werken naar toepassingen in jullie eigen werk.' },
        ],
      },
      {
        slug: 'implementatie',
        name: 'AI-implementatie',
        title: 'AI-implementatie en AI-oplossingen op maat',
        seoTitle: 'AI-implementatie mkb: AI-Quickscan €795 en AI-Partner',
        description: 'AI-Quickscan €795: intake, procesinventarisatie, 3 quick wins en tijdsbaseline. AI-Partner vanaf €295/mnd voor doorlopende ondersteuning.',
        intro: 'We beginnen klein en meetbaar. Met een quickscan vinden we waar AI je tijd oplevert, en we meten vooraf hoeveel tijd het nu kost. Zo weet je achteraf of het werkt.',
        points: [
          { title: 'Intake en inventarisatie', text: 'Welke taken kosten veel tijd en zijn geschikt voor AI?' },
          { title: '3 quick wins', text: 'Concrete toepassingen die je binnen weken kunt invoeren.' },
          { title: 'Tijdsbaseline', text: 'Hoeveel tijd kost het nu? Dan kunnen we de winst meten.' },
          { title: 'Oplossingen op maat', text: 'Agents, interne kennisbanken en tools die aan je eigen systemen gekoppeld zijn.' },
          { title: 'AI-Partner', text: 'Daarna maandelijks spreekuur en elk kwartaal een nieuwe use case.' },
        ],
        forWho: ['Bedrijven die AI structureel willen inzetten', 'Organisaties met veel repeterend kantoorwerk'],
        packageIds: ['ai-quickscan', 'ai-implementatie', 'ai-partner'],
        faq: [
          { q: 'Komt de quickscan in aanmerking voor subsidie?', a: 'Een AI-quickscan met een duurzaamheidshoek kan mogelijk in aanmerking komen voor de Adviesvoucherregeling Fryslân. Vraag ons ernaar. Garanties kunnen we niet geven.' },
          { q: 'Wat als AI niet geschikt blijkt?', a: 'Dan zeggen we dat. Ook dat is een uitkomst die je geld bespaart.' },
        ],
      },
      {
        slug: 'chatbots',
        name: 'AI-chatbots',
        title: 'AI-chatbot op je site of webshop',
        seoTitle: 'AI-chatbot voor website of webshop: €1.250 eenmalig + €129 per maand',
        description: 'AI-chatbot voor FAQ of klantenservice op je website of webshop: €1.250 eenmalig + €129 per maand, excl. btw. Kennisbank gevuld en getest.',
        intro: 'Een chatbot die vragen van klanten beantwoordt op basis van jouw eigen informatie, ook \'s avonds en in het weekend. Getest voordat hij live gaat.',
        points: [
          { title: 'Jouw kennisbank', text: 'Gevuld met je eigen FAQ\'s, producten en voorwaarden.' },
          { title: 'Getest', text: 'We testen op echte klantvragen, ook op lastige.' },
          { title: 'Doorverbinden', text: 'Weet de bot het niet, dan gaat de vraag naar jou.' },
          { title: 'Onderhoud', text: 'Maandelijks bijwerken en verbeteren.' },
        ],
        forWho: ['Webshops met veel terugkerende vragen', 'Dienstverleners met veel informatieaanvragen'],
        packageIds: ['ai-chatbot'],
        faq: [
          { q: 'Gaat de chatbot dingen verzinnen?', a: 'We beperken hem tot jouw eigen informatie en testen dat grondig. Bij twijfel verwijst hij door naar een mens.' },
          { q: 'Hoe zit het met privacy?', a: 'We kiezen een platform en instellingen die passen bij de AVG, en leggen vast welke gegevens de bot verwerkt. <em>Dit is geen juridisch advies.</em>' },
        ],
      },
      {
        slug: 'automatisering',
        name: 'Automatisering',
        title: 'AI-automatisering: werk dat zichzelf doet',
        seoTitle: 'AI-automatisering met n8n of Make vanaf €1.750 per workflow',
        description: 'Eén AI-workflow met n8n of Make, bijvoorbeeld leadopvolging, offertes, mail-triage of productteksten. Vanaf €1.750 per workflow excl. btw.',
        intro: 'Leads opvolgen, offertes voorbereiden, e-mail sorteren, productteksten schrijven. We bouwen één workflow die een taak uit handen neemt, en meten hoeveel tijd het scheelt.',
        points: [
          { title: 'Leadopvolging', text: 'Nieuwe aanvraag → CRM → bevestiging → herinnering.' },
          { title: 'Offertes', text: 'Een concept-offerte op basis van de aanvraag, klaar om te checken.' },
          { title: 'Mail-triage', text: 'Inkomende mail gesorteerd en samengevat.' },
          { title: 'Productteksten', text: 'Teksten in jouw toon, voor tientallen producten tegelijk.' },
        ],
        forWho: ['Bedrijven met repeterende administratieve taken', 'Webshops met veel producten'],
        packageIds: ['ai-automatisering', 'ai-partner'],
        faq: [
          { q: 'Met welke systemen kunnen jullie koppelen?', a: 'Met de meeste systemen die een API of koppeling hebben: e-mail, CRM, boekhouding, Shopify, formulieren en agenda.' },
          { q: 'Wie onderhoudt de workflow?', a: 'Met <a href="/diensten/ai/implementatie">AI-Partner</a> onderhouden wij hem. Je kunt hem ook zelf beheren.' },
        ],
      },
    ],
  },
  {
    id: 'consultancy',
    index: '07',
    fromId: 'consultancy-wekelijks',
    inBundles: [],
    inText: 'Los af te nemen · ook naast een groeipakket',
    name: 'Consultancy',
    short: 'Je houdt het in huis. Een specialist brengt richting, expertise en een plan van aanpak.',
    icon: 'consult',
    headline: ['Jullie voeren uit.', 'Wij brengen richting.'],
    seoTitle: 'E-commerce en marketing consultancy: wekelijks of per maand een specialist',
    description: 'Consultancy voor bedrijven die het in huis houden: elke week een uur (€595/mnd), 8 uur per maand (€995/mnd), een compleet plan van aanpak (vanaf €1.495) of Groeistrategie (vanaf €1.250/mnd). Excl. btw.',
    intro: 'Je wilt niet uitbesteden. Je hebt een eigen marketeer, webshopteam of doet het zelf. Wat je mist, is iemand die het vak kent, de valkuilen al eens gezien heeft en zegt wat eerst moet. Wekelijks een uur, of maandelijks een aantal uren. Met een plan van aanpak dat je team zelf kan uitvoeren. De kennis blijft bij jou.',
    problems: [
      'Je team is druk, maar niemand weet zeker of het de goede dingen doet.',
      'Je bureau of freelancer stuurt rapporten die je niet kunt beoordelen.',
      'Er liggen tien ideeën, maar geen plan en geen volgorde.',
      'Een fulltime e-commerce- of marketingmanager is te zwaar voor je bedrijf.',
    ],
    approach: [
      { title: 'Intake', text: 'Waar sta je, wat wil je bereiken, en wie doet wat in je team?' },
      { title: 'Analyse', text: 'Data, kanalen, site of webshop, marges. We kijken waar de groei en de lekken zitten.' },
      { title: 'Plan van aanpak', text: 'Doelen, prioriteiten, een roadmap, KPI\'s en een taakverdeling. Concreet genoeg om morgen te beginnen.' },
      { title: 'Begeleiding', text: 'Wekelijks of maandelijks: meekijken, bijsturen, vragen beantwoorden. Jouw team voert uit.' },
    ],
    outcomes: ['Een plan dat je team zelf kan uitvoeren', 'Duidelijkheid: wat eerst, wat later, wat niet', 'De kennis blijft in huis', 'Eén vast aanspreekpunt met e-commerce- en B2B-ervaring'],
    packageIds: ['consultancy-wekelijks', 'consultancy-maanduren', 'groeistrategie', 'strategiesessie', 'plan-van-aanpak'],
    faq: [
      { q: 'Wat is het verschil met een groeipakket?', a: 'Bij een groeipakket voeren wij het werk uit. Bij consultancy doet je eigen team het, en brengen wij de richting, de kennis en het plan. Wil je toch dat wij het doen? Kies dan een <a href="/pakketten#maandelijks">groeipakket</a>.' },
      { q: 'Waar kunnen jullie bij helpen?', a: 'Webshops (Shopify, WooCommerce en Magento), SEO en GEO, Google Ads en Meta Ads, conversie, e-mailmarketing, data en tracking, AI in je werkprocessen, en het aansturen van bureaus en freelancers. Met de nadruk op B2B en B2B/B2C-webshops.' },
      { q: 'Wekelijks of maanduren: wat past bij mij?', a: 'Wil je een vast ritme en een sparringpartner, kies dan Consultancy Wekelijks (elke week 1 uur). Wil je ook dat we meekijken in je accounts, je team inwerken of briefings schrijven voor je bureau, kies dan Consultancy Maanduren (8 uur per maand, vrij in te zetten).' },
      { q: 'Moet ik met een plan van aanpak beginnen?', a: 'Niet verplicht, wel aan te raden als er nog geen plan ligt. Bij Groeistrategie zit het plan van aanpak in de eerste maand inbegrepen.' },
      { q: 'Hoe lang zit ik vast?', a: 'Doorlopende consultancy loopt minimaal 3 maanden, daarna maandelijks opzegbaar. Een strategiesessie of plan van aanpak is eenmalig.' },
      { q: 'Is dit online of op locatie?', a: 'Allebei. Online waar het kan, op locatie waar het helpt. In Friesland en Groningen kom ik gewoon langs.' },
    ],
    relatedBranches: ['webshops', 'zakelijke-dienstverlening'],
    relatedArticles: [],
    serviceType: 'E-commerce- en marketingconsultancy',
    subpages: [
      {
        slug: 'wekelijkse-sparring',
        name: 'Wekelijkse sparring',
        title: 'Consultancy Wekelijks: elke week een uur met een specialist',
        seoTitle: 'Wekelijkse e-commerce- en marketingsparring: €595 per maand',
        description: 'Elke week 1 uur met een e-commerce- en marketingspecialist, online of op locatie. Review van campagnes, SEO, webshop en cijfers, met een actielijst. €595 per maand excl. btw.',
        intro: 'Een vast uur per week waarin we samen kijken naar wat er gebeurt en wat er moet gebeuren. Jij of je team voert uit, wij houden de lijn vast.',
        points: [
          { title: 'Vast ritme', text: 'Elke week 1 uur, op een vaste dag. Online of op locatie.' },
          { title: 'Review', text: 'Campagnes, SEO, webshop en cijfers: wat werkt, wat niet, en waarom.' },
          { title: 'Actielijst', text: 'Na elke sessie weet je team wat het deze week doet.' },
          { title: 'Tussendoor', text: 'Een WhatsApp-lijn voor vragen die niet tot volgende week kunnen wachten.' },
        ],
        forWho: ['Bedrijven met een eigen marketeer of webshopteam', 'Ondernemers die zelf marketing doen', 'Teams die een bureau willen leren aansturen'],
        packageIds: ['consultancy-wekelijks', 'strategiesessie'],
        faq: [
          { q: 'Wat als ik een week oversla?', a: 'Dan schuiven we het uur door binnen dezelfde maand.' },
          { q: 'Hoe lang loopt het?', a: 'Minimaal 3 maanden, daarna maandelijks opzegbaar.' },
        ],
      },
      {
        slug: 'maanduren',
        name: 'Maanduren',
        title: 'Consultancy Maanduren: 8 uur per maand, vrij in te zetten',
        seoTitle: 'Consultancy per maand: 8 uur specialist voor €995',
        description: '8 uur per maand een e-commerce- en marketingspecialist: sessies, reviews in je accounts, je team inwerken, briefings voor je bureau. €995 per maand excl. btw.',
        intro: 'Meer dan een wekelijks gesprek. Een specialist die meekijkt in je accounts, je team op weg helpt en meedenkt over de grote keuzes. Jij bepaalt waar de uren heen gaan.',
        points: [
          { title: '8 uur per maand', text: 'Vrij te verdelen: één dagdeel per week, of een paar dagen als het druk is.' },
          { title: 'Meekijken', text: 'In Google Ads, Meta, Analytics en je webshop. Met concrete verbeterpunten.' },
          { title: 'Je team op weg', text: 'Uitleg, inwerken en meelopen, zodat de kennis in huis blijft.' },
          { title: 'Bureaus aansturen', text: 'Briefings schrijven en rapporten beoordelen van je bureau of freelancers.' },
        ],
        forWho: ['Webshops met een eigen team', 'B2B-bedrijven die online willen groeien', 'Bedrijven die een bureau inhuren en grip willen houden'],
        packageIds: ['consultancy-maanduren', 'consultancy-wekelijks'],
        faq: [
          { q: 'Wat als ik meer uren nodig heb?', a: 'Extra uren kosten €125 per uur. Je krijgt elke maand een urenoverzicht.' },
          { q: 'Schuiven ongebruikte uren door?', a: 'Ongebruikte uren schuiven één maand door.' },
        ],
      },
      {
        slug: 'plan-van-aanpak',
        name: 'Plan van aanpak',
        title: 'Plan van aanpak: een compleet plan voor je eigen team',
        seoTitle: 'Online plan van aanpak voor je webshop of marketing: vanaf €1.495',
        description: 'Analyse van data, kanalen, site en team, en een compleet plan van aanpak: doelen, prioriteiten, roadmap voor 12 maanden, KPI\'s en taakverdeling. Vanaf €1.495 eenmalig excl. btw.',
        intro: 'Geen dik rapport voor in de la, maar een plan dat je team morgen kan oppakken. Wat moet er gebeuren, in welke volgorde, door wie, met welk budget, en hoe meet je of het werkt?',
        points: [
          { title: 'Analyse', text: 'Data, kanalen, site of webshop, marges en de mensen die het moeten doen.' },
          { title: 'Roadmap', text: 'Doelen en prioriteiten voor 12 maanden, uitgewerkt per kwartaal.' },
          { title: 'KPI\'s en meetplan', text: 'Wat meet je, waar, en wanneer is iets een succes?' },
          { title: 'Taakverdeling', text: 'Wie doet wat, welke tools zijn nodig, en wat kost het.' },
          { title: 'Overdracht', text: 'Een sessie met je team, en daarna 30 dagen vragen stellen via WhatsApp.' },
        ],
        forWho: ['Bedrijven die willen groeien maar geen plan hebben', 'Nieuwe marketeers of webshopmanagers die een vliegende start willen', 'Directies die richting willen geven aan hun team'],
        packageIds: ['plan-van-aanpak', 'strategiesessie'],
        faq: [
          { q: 'Hoe lang duurt het?', a: 'TODO: levertijd plan van aanpak.' },
          { q: 'Kunnen jullie het plan ook uitvoeren?', a: 'Ja. Dan kies je een <a href="/pakketten#maandelijks">groeipakket</a>. Wil je zelf uitvoeren met begeleiding, kies dan Consultancy Wekelijks of Maanduren.' },
        ],
      },
      {
        slug: 'groeistrategie',
        name: 'Groeistrategie',
        title: 'Groeistrategie: je externe e-commerce- en marketingmanager',
        seoTitle: 'Externe e-commerce- en marketingmanager: Groeistrategie vanaf €1.250 per maand',
        description: 'Plan van aanpak, wekelijkse begeleiding, maandelijkse KPI-review en een kwartaalplan. Je externe e-commerce- en marketingmanager, vanaf €1.250 per maand excl. btw.',
        intro: 'Richting en regie, zonder een fulltime manager aan te nemen. We maken het plan, sturen elke maand bij en schuiven aan bij overleg met je bureaus en leveranciers. Je eigen team voert uit.',
        points: [
          { title: 'Plan van aanpak', text: 'In de eerste maand inbegrepen.' },
          { title: 'Ritme', text: 'Wekelijks 1 uur, en maandelijks een dagdeel met je team.' },
          { title: 'KPI-review', text: 'Elke maand: liggen we op koers, en wat sturen we bij?' },
          { title: 'Kwartaalplan', text: 'Elk kwartaal een nieuw plan en een review van het vorige.' },
          { title: 'B2B-ervaring', text: 'Bij een B2B/B2C-webshop groeide de omzet in 11 maanden met 75%. Die ervaring breng ik aan tafel.' },
        ],
        forWho: ['B2B-webshops en groothandels', 'Bedrijven met een team maar zonder e-commercemanager', 'Directies die grip willen op online groei'],
        packageIds: ['groeistrategie', 'plan-van-aanpak'],
        faq: [
          { q: 'Waarom "vanaf"?', a: 'De prijs hangt af van het aantal kanalen en hoe vaak we met je team aan tafel zitten. Je krijgt vooraf een vaste maandprijs.' },
          { q: 'Hoe lang loopt het?', a: 'Minimaal 3 maanden, daarna maandelijks opzegbaar.' },
        ],
      },
    ],
  },
];

export const line = (id: string) => lines.find((l) => l.id === id);
export const subpage = (lineId: string, slug: string) => line(lineId)?.subpages.find((s) => s.slug === slug);
export const lineHref = (id: string) => `/diensten/${id}`;
export const subHref = (lineId: string, slug: string) => `/diensten/${lineId}/${slug}`;
