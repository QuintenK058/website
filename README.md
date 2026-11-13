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
| `npm run verify` | typecheck + build + check. **Draai dit voor elke deploy.** |

### Deployen naar Vercel
1. Push de repo naar GitHub en importeer hem op vercel.com. Next.js wordt automatisch herkend.
2. Zet de env-variabelen (zie §5) onder *Settings → Environment Variables*.
3. Koppel je domein en zet `NEXT_PUBLIC_SITE_URL` op dat domein.
4. Optioneel: zet voor een preview-omgeving `NEXT_PUBLIC_PREVIEW=true`, zodat je daar TODO's en concepten ziet.

---

## 2. Waar pas ik wat aan?

Alles staat in `site.config.ts` en `content/`. Je hoeft geen componenten te openen.

| Wat | Bestand |
| --- | --- |
| **Bedrijfsgegevens**: naam, KvK, btw, adres, telefoon, WhatsApp, e-mail, socials, agenda-link | `site.config.ts` |
| **Richtingen en pakketten** (E-commerce, Online marketing, Website & development, AI, Consultancy), elk met 3 pakketten: wat we doen, wat er níet in zit, prijs | `content/directions.ts` |
| **Alle losse prijzen** (modules, projecten, setup), calculator, vergelijkingstabel, spelregels | `content/pricing.ts` |
| **Diensten** (8 productlijnen + subpagina's): teksten, FAQ, welke pakketten erbij horen | `content/services.ts` |
| **Cases** | `content/cases.ts` |
| **Branches** | `content/branches.ts` |
| **Homepage-teksten**: hero, pijnpunten, pipeline, FAQ | `content/home.ts` |
| **Marktcijfers met bron** | `content/stats.ts` |
| **Regio's** (Markdown) | `content/regio/*.md` |
| **Kennisbank** (Markdown) | `content/kennisbank/*.md` |
| **Over ons** (Markdown) | `content/over-ons.md` |
| **Privacy, cookies, voorwaarden** | `content/legal/*.md` |

**Prijzen**: hele euro's, excl. btw. `amount: null` (of `monthly: null`) toont "Op offerte" en een `priceTodo` als herinnering. Een prijs aanpassen verandert hem overal: pagina's, calculator, OfferCatalog-schema en `llms.txt`.

**TODO's**: alles wat met `TODO` begint is een placeholder.
- In dev en preview zie je ze als gele markering.
- In productie worden ze verborgen. Een belknop verschijnt pas als het nummer is ingevuld, en FAQ's met een TODO-antwoord worden overgeslagen.
- Uitzondering: op de juridische pagina's blijven TODO's ook live zichtbaar, met een concept-melding.

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
| `NEXT_PUBLIC_SITE_URL` | Ja | Bijv. `https://www.qkcommerce.nl` |
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
  - Performance: pakketten 92–95, dienstpagina 90, home 85–88.
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

### Prijzen (`content/directions.ts` en `content/pricing.ts`)
- [ ] Maandprijzen: E-commerce Partner, Marketing Compleet, Maatwerk & Development, consultancy (losse sessie, wekelijkse sparring, Groeistrategie)
- [ ] Magento-beheer, Magento-development, maatwerk, koppelingen, development-uren, e-mailflows, e-mailcampagnes, AI-oplossing op maat
- [ ] Aantallen in pakketten: productmutaties per maand (Webshop Beheer), development-uren, e-mails per maand
- [ ] Voorwaarden van "Niet tevreden? Geld terug" (spelregels, FAQ en algemene voorwaarden)

### Cases (`content/cases.ts`)
- [ ] Screenshots desktop + mobiel per case (`public/cases/<slug>/`)
- [ ] Klantquotes
- [ ] Miedema-webshop: concreet wat je deed
- [ ] Aanvullingen bij uitdaging en aanpak (Miedema Groep, Crossing of Limits, Lado Bridal)
- [ ] Wierenga & De Graaf: inhoud en concept-URL (staat nu op `approved: false`)

### Teksten
- [ ] `content/services.ts`: doorlooptijden, gebruikte platforms/CMS, hostingpartij, ERP/PIM-ervaring, Magento-versies, data van de open workshops
- [ ] `content/home.ts`: FAQ "niet tevreden"
- [ ] `content/over-ons.md`: eigen achtergrond en eventuele partners
- [ ] Portretfoto Quinten (homepage en /over-ons)
- [ ] Kennisbank: 5 artikelen nalezen, de TODO verwerken en `draft: false` zetten
- [ ] Juridisch: privacy, cookies en algemene voorwaarden laten opstellen of controleren
- [ ] Marktcijfers in `content/stats.ts`: bronnen controleren vóór livegang

### Techniek
- [ ] Resend-account (domein verifiëren) of Formspree-endpoint
- [ ] Google Search Console en Bing Webmaster Tools koppelen, sitemap indienen
- [ ] Definitief logo (tijdelijk: `app/icon.svg` en `components/ui/Monogram.tsx`)
