# QK Commerce Solutions: website

*Alles rondom internet, volledig ontzorgd.*

Next.js 16 (App Router, TypeScript) · Tailwind CSS v4 · GSAP 3.15 (ScrollTrigger, ScrambleText, DrawSVG) · Lenis · WebGL (eigen shaders, geen library).

Alle pagina's worden **statisch gegenereerd**. Alleen `/api/lead` (de formulieren) draait server-side. Alle tekst staat in de HTML, dus de site is volledig leesbaar zonder JavaScript en voor AI-crawlers. Beweging is een laag daarbovenop.

---

## 1. Lokaal draaien en deployen

Vereist: Node.js 20.9 of hoger.

```bash
npm install
npm run dev
```

| Commando | Wat het doet |
| --- | --- |
| `npm run dev` | Ontwikkelserver op http://localhost:3000, met TODO-markeringen, concepten en niet-goedgekeurde cases |
| `npm run build` | Productiebuild (zonder TODO's, concepten en niet-goedgekeurde cases) |
| `npm run build:preview` | Build mét TODO's en concepten, om online na te lopen |
| `npm start` | Draait de laatste build |
| `npm run typecheck` | TypeScript-controle |
| `npm run check` | Crawlt de gebouwde site: 404's, ankers, één H1 per pagina, geldige JSON-LD |
| `npm run test:finder` | Test alle 45 antwoordcombinaties van de pakketkiezer |
| `npm run images:check` | Welke fotoslots zijn gevuld? |
| `npm run verify` | typecheck + finder-test + build + check. **Draai dit voor elke deploy.** |

### Deployen naar Vercel
1. Push de repo naar GitHub en importeer hem op vercel.com. Next.js wordt automatisch herkend.
2. Zet de env-variabelen (zie §5) onder *Settings → Environment Variables*.
3. Koppel je domein. Laat `www.qkcommerce.nl` in Vercel doorsturen (308) naar `qkcommerce.nl`. De site-URL staat vast in `site.config.ts` (`https://qkcommerce.nl`); een oude `NEXT_PUBLIC_SITE_URL` in Vercel mag je verwijderen.
4. Preview-deploys (`VERCEL_ENV=preview`) krijgen automatisch `noindex` en een `robots.txt` die alles blokkeert. Alleen productie wordt geïndexeerd.
5. Optioneel: zet voor een preview-omgeving `NEXT_PUBLIC_PREVIEW=true`, zodat je daar TODO's en concepten ziet.

---

## 2. Waar pas ik wat aan?

Alles staat in `site.config.ts` en `content/`. Je hoeft geen componenten te openen.

| Wat | Bestand |
| --- | --- |
| **Bedrijfsgegevens**: naam, KvK, btw, adres, telefoon, WhatsApp, e-mail, socials, agenda-link | `site.config.ts` |
| **Alle pakketten en prijzen** (basis, groei, modules, projecten, AI, advies), tabs, vergelijkingstabel, "Zo start je", facturatie, geld-terug, contactopties | `content/pricing.ts` |
| **Pakketkiezer**: vragen en regels (uitkomst per antwoord) | `content/package-finder.ts` (test: `npm run test:finder`) |
| **Diensten** (7 diensten [01]–[07] + subpagina's): teksten, FAQ, welke pakketten erbij horen | `content/services.ts` |
| **Afbeeldingen**: alle fotoplekken, alt-teksten, formaten | `content/images.ts` (zie §2b) |
| **Cases** | `content/cases.ts` |
| **Branches** | `content/branches.ts` |
| **Homepage-teksten**: hero, pijnpunten, pipeline, FAQ | `content/home.ts` |
| **Marktcijfers met bron** | `content/stats.ts` |
| **Regio's** (Markdown) | `content/regio/*.md` |
| **Kennisbank** (Markdown) | `content/kennisbank/*.md` |
| **Over ons** (Markdown) | `content/over-ons.md` |
| **Privacy, cookies, voorwaarden** | `content/legal/*.md` |

**Prijzen**: hele euro's, excl. btw, altijd een vaste prijs of een vanaf-prijs (nooit "op offerte"). Een prijs aanpassen in `content/pricing.ts` verandert hem overal: pakketten, diensten, kiezer, calculator, contactformulier, OfferCatalog-schema en `llms.txt`. Prijzen met `proposal: true` zijn nog een voorstel (zie §9).

**Principe**: eerst je basis, dan je groei. Losse projecten en AI ernaast.

| Soort | Pakket | Prijs |
| --- | --- | --- |
| Basis | Zorg Basis / Zorg Plus / Zorg Webshop | €49 / €99 / €149 per maand |
| Groei | Ontzorgd Lokaal / **Ontzorgd Leads** (aanrader) / Ontzorgd Webshop | €199 / €745 / €1.195 per maand |
| Groei | Ontzorgd Op Maat | vanaf €1.950 per maand |
| Modules | Lokaal Zichtbaar €395 · SEO+GEO Groei €795 · Google Ads Lokaal €275 (+ €345 inrichting) · Google Ads Shop €495 (+ €495) · Meta Ads €545 · Meta Ads + Creatives €1.195 · Development-uren €360 (4 uur) · AI-Partner €295 | per maand |
| Websites | Web Start €1.195 · Web Groei vanaf €2.450 · Web Maatwerk vanaf €4.000 | eenmalig |
| Webshops | Shop Start vanaf €2.750 · Shop Groei vanaf €4.950 · Migratie vanaf €1.500 · Shopify-development €95 per uur | eenmalig |
| Checks & setup | Audit €395 · GEO-scan €245 · Bedrijfsprofiel-setup €245 · Koppeling vanaf €495 | eenmalig |
| AI | AI-Chatbot €1.250 eenmalig + €129 per maand · AI Implementatie vanaf €1.995 · workshops per persoon | |
| Consultancy (doorlopend, €75 per uur) | Consultancy Wekelijks €300 (4 uur) · Consultancy Maanduren €600 (8 uur, extra uur €75) · Groeistrategie vanaf €995 | per maand |
| Consultancy (los/eenmalig) | Per uur: €85 los, €75 bij maandafspraak · Strategiesessie €150 · Plan van aanpak vanaf €1.195 | |

`/pakketten` heeft 4 tabs met deeplinks: `#maandelijks`, `#projecten`, `#ai`, `#consultancy`. Oude ankers (`#ecommerce`, `#webshop`, `#consultancy`, …) springen naar de juiste tab. Zonder JS staan alle vier onder elkaar.

**Diensten en redirects** (`next.config.ts`): `/diensten/development` → `/diensten/onderhoud`, `/diensten/development/maatwerk|koppelingen` → `/diensten/onderhoud/…`, `/diensten/consultancy/e-commerce|online-marketing` en `/diensten/ai/strategie-en-sparring` → `/diensten/consultancy`, `/website-check` → `/online-check` (alle 301/308).

**TODO's**: alles wat met `TODO` begint is een placeholder.
- In dev en preview zie je ze als gele markering.
- In productie worden ze verborgen. Een belknop verschijnt pas als het nummer is ingevuld, en FAQ's met een TODO-antwoord worden overgeslagen.
- Uitzondering: op de juridische pagina's blijven TODO's ook live zichtbaar, met een concept-melding.

### 2b. Afbeeldingen

Elke fotoplek is een *slot* in `content/images.ts` (bestand, Nederlandse alt-tekst, formaat, status). Zet een bestand op de juiste plek in `public/images/` en het verschijnt automatisch via `next/image` met vaste verhouding. Ontbreekt het, dan toont de site een gestileerde console-placeholder (`[IMG] Foto Quinten, portret 4:5`), nooit een kapotte afbeelding. Geen stockfoto's van mensen.

`npm run images:check` laat zien welke slots al gevuld zijn.

| Slot-id | Bestand in `public/images/` | Formaat (px) | Waar |
| --- | --- | --- | --- |
| `quinten-portret` | `team/quinten-portret.jpg` | 1600×2000 | Home "Ik kom gewoon langs", Over ons, Person-schema |
| `quinten-werk` | `team/quinten-aan-het-werk.jpg` | 2400×1600 | Over ons, Werkwijze |
| `quinten-workshop` | `team/quinten-workshop.jpg` | 2400×1600 | /diensten/ai/workshops, AI-tab op /pakketten |
| `case-lado-bridal-desktop` | `cases/lado-bridal/desktop.png` | 2880×1800 | Case-kaart, case-detail (device-frame) |
| `case-lado-bridal-mobile` | `cases/lado-bridal/mobile.png` | 1170×2532 | Case-detail (device-frame) |
| `case-lado-bridal-hero` | `cases/lado-bridal/hero.jpg` | 2400×1500 | Case-detail header, image-displacement hover |
| `case-crossing-of-limits-desktop` | `cases/crossing-of-limits/desktop.png` | 2880×1800 | Case-kaart, case-detail (device-frame) |
| `case-crossing-of-limits-mobile` | `cases/crossing-of-limits/mobile.png` | 1170×2532 | Case-detail (device-frame) |
| `case-crossing-of-limits-hero` | `cases/crossing-of-limits/hero.jpg` | 2400×1500 | Case-detail header, image-displacement hover |
| `case-miedema-groep-desktop` | `cases/miedema-groep/desktop.png` | 2880×1800 | Case-kaart, case-detail (device-frame) |
| `case-miedema-groep-mobile` | `cases/miedema-groep/mobile.png` | 1170×2532 | Case-detail (device-frame) |
| `case-miedema-groep-hero` | `cases/miedema-groep/hero.jpg` | 2400×1500 | Case-detail header, image-displacement hover |
| `case-miedema-webshop-desktop` | `cases/miedema-webshop/desktop.png` | 2880×1800 | Case-kaart, case-detail (device-frame) |
| `case-miedema-webshop-mobile` | `cases/miedema-webshop/mobile.png` | 1170×2532 | Case-detail (device-frame) |
| `case-wierenga-de-graaf-desktop` | `cases/wierenga-de-graaf/concept-desktop.png` | 2880×1800 | Case-kaart en detail, label "Concept" |
| `case-wierenga-de-graaf-mobile` | `cases/wierenga-de-graaf/concept-mobile.png` | 1170×2532 | Case-detail |
| `case-lado-bridal-logo` | `cases/lado-bridal/logo.svg` | 240×80 | Case-kaart |
| `case-crossing-of-limits-logo` | `cases/crossing-of-limits/logo.svg` | 240×80 | Case-kaart |
| `case-miedema-groep-logo` | `cases/miedema-groep/logo.svg` | 240×80 | Case-kaart |
| `case-miedema-webshop-logo` | `cases/miedema-webshop/logo.svg` | 240×80 | Case-kaart |
| `logo` | `brand/logo-qk.svg` | 220×40 | Header, footer |
| `logo-mono` | `brand/logo-qk-mono.svg` | 40×40 | Loader, mobiel |
| `favicon` | `brand/favicon.svg` | 64×64 | <head> |
| `apple-touch-icon` | `brand/apple-touch-icon.png` | 180×180 | <head> |
| `regio-leeuwarden` | `regio/leeuwarden.jpg` | 2400×1200 | Header /regio/leeuwarden (optioneel) |
| `regio-friesland` | `regio/friesland.jpg` | 2400×1200 | Header /regio/friesland (optioneel) |
| `regio-sneek` | `regio/sneek.jpg` | 2400×1200 | Header /regio/sneek (optioneel) |
| `regio-drachten` | `regio/drachten.jpg` | 2400×1200 | Header /regio/drachten (optioneel) |
| `regio-heerenveen` | `regio/heerenveen.jpg` | 2400×1200 | Header /regio/heerenveen (optioneel) |
| `regio-groningen` | `regio/groningen.jpg` | 2400×1200 | Header /regio/groningen (optioneel) |
| `cover-php-8-2-stopt-eind-2026` | `kennisbank/php-8-2-stopt-eind-2026-cover.jpg` | 1600×900 | /kennisbank/php-8-2-stopt-eind-2026 |
| `cover-wat-kost-een-website-in-2026` | `kennisbank/wat-kost-een-website-in-2026-cover.jpg` | 1600×900 | /kennisbank/wat-kost-een-website-in-2026 |
| `cover-gevonden-worden-in-chatgpt-lokaal-bedrijf` | `kennisbank/gevonden-worden-in-chatgpt-lokaal-bedrijf-cover.jpg` | 1600×900 | /kennisbank/gevonden-worden-in-chatgpt-lokaal-bedrijf |
| `cover-veilig-ai-gebruiken-in-je-bedrijf` | `kennisbank/veilig-ai-gebruiken-in-je-bedrijf-cover.jpg` | 1600×900 | /kennisbank/veilig-ai-gebruiken-in-je-bedrijf |
| `cover-webshop-laten-beheren-wat-levert-het-op` | `kennisbank/webshop-laten-beheren-wat-levert-het-op-cover.jpg` | 1600×900 | /kennisbank/webshop-laten-beheren-wat-levert-het-op |
| `og-default` | `og/default.png` | 1200×630 | Social sharing (fallback) |

---

## 3. Een case toevoegen of goedkeuren

In `content/cases.ts`:

```ts
{
  slug: 'klantnaam',            // URL: /cases/klantnaam
  approved: false,             // ← op true zetten als de klant akkoord is
  featured: null,              // 1, 2 of 3 = positie op de homepage
  client: 'Klantnaam',
  title: 'Korte kop met resultaat',
  description: '…',
  highlight: '+40% aanvragen', // korte resultaatregel (optioneel)
  metrics: [{ value: 40, prefix: '+', suffix: '%', label: 'aanvragen' }], // optioneel, alleen echte cijfers
  context: 'agency',           // agency | in-dienst | concept → bepaalt het label
  contextNote: '…',            // bijv. "Uitgevoerd als e-commercespecialist bij …"
  role: ['…'], tags: ['…'],
  relatedService: { line: 'webshops', sub: 'beheer' },
  challenge: '…', approach: '…', deliverables: ['…'],
  result: '…', quote: { text: 'TODO', name: 'TODO' },
  url: 'https://…', urlLive: true,
  screenshots: { desktop: '/cases/klantnaam/desktop.jpg', mobile: '/cases/klantnaam/mobile.jpg', alt: '…' },
}
```

- **Screenshots** zet je in `public/cases/<slug>/`. De case-film en de displacement-hover gebruiken ze automatisch.
- **`approved: true`** zorgt dat de case verschijnt op /cases, op de homepage (als `featured` is ingevuld), in de sitemap en in `llms.txt`.

## 4. Een artikel toevoegen

Maak `content/kennisbank/<slug>.md` aan:

```md
---
title: "Titel"
description: Meta description.
pubDate: 2026-12-01
draft: true          # false = publiceren
readingTime: 5
relatedServices: [onderhoud, websites/audit]
faq:
  - q: Vraag?
    a: Antwoord.
---
Tekst in Markdown. Alinea's die beginnen met TODO worden live verborgen.
```

Let op: link vanuit andere teksten pas naar een artikel als het gepubliceerd is. `npm run check` vangt kapotte links af.

---

## 5. Env-variabelen

| Variabele | Nodig? | Uitleg |
| --- | --- | --- |
| `RESEND_API_KEY` + `LEAD_TO_EMAIL` | Ja (optie 1) | Formulieren via Resend. Verifieer je domein in Resend. `LEAD_FROM_EMAIL` is optioneel. |
| `FORMSPREE_ENDPOINT` | Optie 2 | Terugval als je geen Resend gebruikt |
| `UPSTASH_REDIS_REST_URL` + `_TOKEN` | Nee | Rate-limit over alle serverinstanties. Zonder deze twee werkt de rate-limit per instance. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Nee | Cookieloze analytics, geen banner nodig |
| `NEXT_PUBLIC_GA4_ID` | Nee | GA4 met Consent Mode v2. De cookiebanner verschijnt dan automatisch. |
| `NEXT_PUBLIC_PREVIEW` | Nee | `true` = TODO's en concepten zichtbaar |

**Formulieren**:
- Werken met én zonder JS. Zonder JS is het een gewone POST met een redirect naar `/bedankt`.
- Bescherming: een honeypot, een tijdcheck en een rate-limit van 5 per 10 minuten per IP.
- Na een Online Check volgt een scan-animatie in console-stijl, met een tekstuele succesmelding voor schermlezers.

---

## 6. Accentkleur en motion aanpassen

- **Kleuren**: `app/globals.css`, blok `@theme`. Pas `--color-accent` en `--color-accent-2` aan. Een hex-waarde in een WebGL-shader hoef je niet te wijzigen, want de shader leest de CSS-variabele. Alleen in `components/gl/DisplacementHover.tsx` staat het accent als RGB.
- **Motion-tokens**: `lib/motion.ts`. Daar staan de eases, de duurschaal (0.4 / 0.8 / 1.1 / 1.6 s), de stagger, het reveal-patroon en de media queries.
- **Eén RAF-loop**: Lenis draait met `autoRaf: false` via `gsap.ticker`, met `lagSmoothing(0)`. Zie `components/motion/MotionProvider.tsx`.
- **Reduced motion**: dan geen Lenis, geen pins, geen scramble, geen shader (alleen de poster), stilstaande marquees en een crossfade als paginatransitie.
- **Mobiel**: geen cursor, geen magnetische knoppen, geen horizontale pin en geen shader (alleen de poster).
- **Pauzeerknoppen** (WCAG 2.2.2): de ticker, de activiteitenlog, de connection map en "Animatie pauzeren" in de hero en de CTA-band.

---

## 7. SEO en GEO

- Per pagina: unieke title en description, canonical, Open Graph en Twitter, en `max-snippet:-1, max-image-preview:large`.
- Een eigen OG-afbeelding per dienst, subdienst, case, branche, regio en artikel (`opengraph-image.tsx`).
- **JSON-LD**: Organization + ProfessionalService, WebSite, WebPage, Service (met prijzen), OfferCatalog, FAQPage, BreadcrumbList, Article, HowTo, Person en CreativeWork. Er staan nooit TODO's in.
- `sitemap.xml`, `robots.txt` (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended en meer toegestaan) en `/llms.txt` (wordt uit de content gegenereerd).

## 8. Kwaliteit bij oplevering

- `next build`: 0 fouten, 0 waarschuwingen. Alle pagina's statisch, behalve `/api/lead`.
- Crawler: 65 URL's (productie) en 71 (preview), 0 kapotte links, één H1 per pagina, JSON-LD geldig.
- Lighthouse mobiel:
  - Accessibility, Best Practices en SEO: **100** op alle geteste pagina's.
  - Performance (na pakketten-update, mobiel, lokaal): home 82–86, pakketten 89, dienstpagina 88–91.
  - CLS overal 0. LCP gemeten met echte throttling: 2,0 s.
  - De gesimuleerde LCP (3,4 s) is een schatting van Lighthouse, die lokaal alle JavaScript meetelt die vóór de eerste paint binnen was. Kijk na livegang naar de echte cijfers in Search Console.
- Getest:
  - JS uit: alle tekst zichtbaar.
  - Reduced motion: alles statisch en zichtbaar.
  - Toetsenbord: skip-link, focusring overal, tabs met pijltjestoetsen.
  - Mobiel: geen horizontale scroll.

---

## 9. Nog in te vullen (TODO)

### `site.config.ts`
- [ ] KvK, btw, e-mail, telefoon (weergave + E.164), WhatsApp, adres
- [ ] Cal.com/Calendly-link, LinkedIn/Instagram, achternaam en LinkedIn van Quinten

### Pakketten (`content/pricing.ts`)
- [ ] Levertijden per project (Web Start, Web Groei, Shop Start, …): staan nu als TODO op de kaarten
- [ ] Betaaltermijn facturen ("Zo start je" / facturatie)
- [ ] Doorlooptijd inrichting (dagen) bij groeipakketten en ads-modules
- [ ] Geld-terug-regeling bevestigen: tekst staat als voorstel in spelregels, FAQ en `content/legal/algemene-voorwaarden.md` (gemarkeerd `TODO: bevestigen`)
- [ ] Voorstelprijzen bevestigen (`proposal: true`): Ontzorgd Op Maat, Development-uren, dev-uur €95, Koppeling, alle consultancyprijzen (€75/€85 per uur, Wekelijks €300, Maanduren €600, Groeistrategie €995, Strategiesessie €150, Plan van aanpak €1.195) en de levertijd van het plan van aanpak
- [ ] Zorg Webshop: aantal productmutaties per maand

### Cases (`content/cases.ts`)
- [ ] Screenshots desktop + mobiel per case (slots in `content/images.ts`, map `public/images/cases/`)
- [ ] Goedkeuring per case van de klant (naam, cijfers, beelden)
- [ ] Klantquotes
- [ ] Miedema-webshop: concreet wat je deed
- [ ] Aanvullingen bij uitdaging en aanpak (Miedema Groep, Crossing of Limits, Lado Bridal)
- [ ] Wierenga & De Graaf: inhoud en concept-URL (staat nu op `approved: false`)

### Teksten
- [ ] `content/services.ts`: doorlooptijden, gebruikte platforms/CMS, hostingpartij, ERP/PIM-ervaring, data van de open workshops
- [ ] `content/home.ts`: FAQ "niet tevreden"
- [ ] `content/over-ons.md`: eigen achtergrond en eventuele partners
- [ ] Foto's: zie §2b (`npm run images:check`), o.a. portret Quinten
- [ ] Kennisbank: 5 artikelen nalezen, de TODO verwerken en `draft: false` zetten
- [ ] Juridisch: privacy, cookies en algemene voorwaarden laten opstellen of controleren
- [ ] Marktcijfers in `content/stats.ts`: bronnen controleren vóór livegang

### Techniek
- [ ] Resend-account (domein verifiëren) of Formspree-endpoint
- [ ] Google Search Console en Bing Webmaster Tools koppelen, sitemap indienen
- [ ] Definitief logo (tijdelijk: `app/icon.svg` en `components/ui/Monogram.tsx`)
