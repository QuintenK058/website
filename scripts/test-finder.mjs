// Test: elke combinatie van antwoorden geeft een bestaand pakket.
import { allCombos, recommend, finderSummary } from '../content/package-finder.ts';
import { packages, contactOptionFor } from '../content/pricing.ts';
const ids = new Set(packages.map((p) => p.id));
let fail = 0;
const tally = {};
for (const a of allCombos()) {
  const r = recommend(a);
  for (const id of [r.primary, r.extra].filter(Boolean)) if (!ids.has(id)) { fail++; console.error('Onbekend pakket', id, a); }
  tally[r.primary] = (tally[r.primary] ?? 0) + 1;
}
for (const s of finderSummary) if (!ids.has(s.id)) { fail++; console.error('Onbekend pakket in samenvatting', s.id); }
const must = [
  [{ have: 'website', goal: 'gevonden', involve: 'niets' }, 'ontzorgd-lokaal'],
  [{ have: 'website', goal: 'aanvragen', involve: 'niets' }, 'ontzorgd-leads'],
  [{ have: 'webshop', goal: 'verkopen', involve: 'niets' }, 'ontzorgd-webshop'],
  [{ have: 'geen', goal: 'gevonden', involve: 'niets' }, 'web-start'],
  [{ have: 'website', goal: 'ai', involve: 'niets' }, 'ai-teamworkshop'],
  [{ have: 'website', goal: 'aanvragen', involve: 'zelf' }, 'plan-van-aanpak'],
  [{ have: 'webshop', goal: 'verkopen', involve: 'zelf' }, 'consultancy-wekelijks'],
];
for (const [a, want] of must) { const got = recommend(a).primary; if (got !== want) { fail++; console.error('Verwacht', want, 'kreeg', got, a); } }
for (const a of allCombos()) { const r = recommend(a); const name = packages.find((x) => x.id === r.primary)?.name ?? ''; if (!contactOptionFor(name)) { fail++; console.error('Geen contactoptie voor', r.primary); } }
console.log(`${allCombos().length} combinaties getest. Verdeling:`, tally);
if (fail) { console.error(`✗ ${fail} fout(en)`); process.exit(1); }
console.log('✓ Pakketkiezer: alle combinaties geven een bestaand pakket.');
