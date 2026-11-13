/**
 * PAKKETKIEZER: drie vragen → één aanbevolen pakket + één optionele aanvulling.
 * De regels worden van boven naar beneden gecheckt; de eerste die past wint.
 * Pakket-id's verwijzen naar content/pricing.ts. Test: npm run test:finder
 */
export type Have = 'geen' | 'website' | 'webshop';
export type Goal = 'gevonden' | 'aanvragen' | 'verkopen' | 'techniek' | 'ai';
export type Involve = 'niets' | 'meedenken' | 'zelf';
export type Answers = { have: Have; goal: Goal; involve: Involve };
export type Advice = { primary: string; extra?: string; why: string; note?: string };

export const questions = [
  { key: 'have', q: 'Wat heb je nu?', options: [{ v: 'geen', l: 'Geen website' }, { v: 'website', l: 'Een website' }, { v: 'webshop', l: 'Een webshop' }] },
  { key: 'goal', q: 'Wat wil je vooral?', options: [{ v: 'gevonden', l: 'Gevonden worden' }, { v: 'aanvragen', l: 'Meer aanvragen' }, { v: 'verkopen', l: 'Meer verkopen' }, { v: 'techniek', l: 'Minder gedoe met techniek' }, { v: 'ai', l: 'Iets met AI' }] },
  { key: 'involve', q: 'Hoeveel wil je zelf doen?', options: [{ v: 'niets', l: 'Niets, regel het maar' }, { v: 'meedenken', l: 'Ik wil meedenken' }, { v: 'zelf', l: 'Ik doe het zelf, help me op weg' }] },
] as const;

type Rule = { when: (a: Answers) => boolean; advice: (a: Answers) => Advice };

export const rules: Rule[] = [
  // AI wint altijd
  { when: (a) => a.goal === 'ai', advice: () => ({ primary: 'ai-teamworkshop', extra: 'ai-implementatie', why: 'Begin met veilig leren werken met AI, met een dossier. Daarna bouwen we één toepassing die tijd oplevert.' }) },
  // Zelf doen → advies
  { when: (a) => a.involve === 'zelf' && a.have === 'webshop', advice: () => ({ primary: 'sparring', extra: 'strategiesessie', why: 'Jij voert uit, wij kijken elke week mee naar je shop, campagnes en cijfers.' }) },
  { when: (a) => a.involve === 'zelf', advice: () => ({ primary: 'strategiesessie', extra: 'sparring', why: 'Eén goed voorbereide sessie met een actielijst. Wil je doorlopend sparren, dan kies je Sparring.' }) },
  // Geen website
  { when: (a) => a.have === 'geen' && a.goal === 'verkopen', advice: () => ({ primary: 'shop-start', extra: 'ontzorgd-webshop', why: 'Eerst een webshop die kan verkopen. Daarna zorgen we dat er bezoekers komen.' }) },
  { when: (a) => a.have === 'geen', advice: () => ({ primary: 'web-start', extra: 'ontzorgd-lokaal', why: 'Een professionele site, en daarna onderhoud en vindbaarheid in je regio.', note: 'Kies je Ontzorgd Lokaal voor 12 maanden, dan kost Web Start €595 in plaats van €1.195.' }) },
  // Webshop
  { when: (a) => a.have === 'webshop' && a.goal === 'techniek', advice: () => ({ primary: 'zorg-webshop', extra: 'development-uren', why: 'Je shop veilig en actueel, met wekelijkse checkout-check. Verbeteringen via development-uren.' }) },
  { when: (a) => a.have === 'webshop' && a.involve === 'meedenken', advice: () => ({ primary: 'ontzorgd-webshop', extra: 'sparring', why: 'Wij doen ads, e-mail en conversie. Met Sparring denk je elke week mee.' }) },
  { when: (a) => a.have === 'webshop', advice: () => ({ primary: 'ontzorgd-webshop', extra: 'meta-ads-creatives', why: 'Meta Ads, Google Shopping, e-mailflows en een maandelijkse CRO-review, met je shop in beheer.' }) },
  // Website
  { when: (a) => a.have === 'website' && a.goal === 'techniek', advice: () => ({ primary: 'zorg-plus', extra: 'website-audit', why: 'Hosting, updates, back-ups en elke maand een uur wijzigingen. Een audit laat zien wat er beter kan.' }) },
  { when: (a) => a.have === 'website' && (a.goal === 'aanvragen' || a.goal === 'verkopen'), advice: () => ({ primary: 'ontzorgd-leads', extra: 'meta-ads', why: 'Gevonden worden én Google Ads, zodat de telefoon gaat. Inclusief onderhoud van je site.' }) },
  { when: (a) => a.have === 'website' && a.goal === 'gevonden' && a.involve === 'meedenken', advice: () => ({ primary: 'ontzorgd-lokaal', extra: 'strategiesessie', why: 'Beter gevonden in je regio, zonder ads. Met een sessie om samen de koers te bepalen.' }) },
  { when: (a) => a.have === 'website' && a.goal === 'gevonden', advice: () => ({ primary: 'ontzorgd-lokaal', extra: 'geo-scan', why: 'Bedrijfsprofiel, reviews en GEO-monitoring, met je site in goede handen.' }) },
];

export function recommend(a: Answers): Advice {
  for (const r of rules) if (r.when(a)) return r.advice(a);
  return { primary: 'ontzorgd-lokaal', why: 'Een goede start voor de meeste ondernemers.' };
}

export function allCombos(): Answers[] {
  const out: Answers[] = [];
  for (const have of questions[0].options) for (const goal of questions[1].options) for (const involve of questions[2].options) out.push({ have: have.v, goal: goal.v, involve: involve.v } as Answers);
  return out;
}

/** Tekstversie voor zonder JS en voor crawlers. */
export const finderSummary: { when: string; id: string }[] = [
  { when: 'Je hebt een website en wilt beter gevonden worden', id: 'ontzorgd-lokaal' },
  { when: 'Je hebt een website en wilt meer aanvragen', id: 'ontzorgd-leads' },
  { when: 'Je hebt een webshop en wilt meer verkopen', id: 'ontzorgd-webshop' },
  { when: 'Je hebt nog geen website', id: 'web-start' },
  { when: 'Je wilt minder gedoe met de techniek', id: 'zorg-plus' },
  { when: 'Je wilt iets met AI', id: 'ai-teamworkshop' },
  { when: 'Je doet het zelf en wilt iemand die meedenkt', id: 'sparring' },
];
