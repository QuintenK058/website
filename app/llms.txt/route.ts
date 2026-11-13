/** /llms.txt: samenvatting voor AI-systemen, bij elke build opnieuw uit de content. */
import { siteConfig } from '@/site.config';
import { lines, lineHref, subHref } from '@/content/services';
import { byKind, formatPriceLong, formatExtra, VAT_NOTE, AD_BUDGET_NOTE, moneyBack } from '@/content/pricing';
import { branches, branchHref } from '@/content/branches';
import { cases, caseHref } from '@/content/cases';
import { getRegions, getArticles } from '@/lib/content';
import { filled, stripTodo } from '@/lib/todo';

export const dynamic = 'force-static';

export function GET() {
  const u = (p: string) => `${siteConfig.url}${p}`;
  const L: string[] = [];
  L.push(`# ${siteConfig.name}`, '', `> ${siteConfig.tagline} ${siteConfig.description}`, '');
  L.push(
    `${siteConfig.shortName} (QK) is een full-service online agency in ${siteConfig.address.city}, Friesland, opgericht door ${siteConfig.founder.name}, e-commercespecialist met de nadruk op B2B. QK werkt voor mkb zonder eigen marketingafdeling: zakelijke dienstverleners, bouw en installatie, zorg, horeca, kappers en salons, en webshops (Shopify en Magento). Kenmerken: gepubliceerde prijzen en scope, minimaal 3 maanden en daarna maandelijks opzegbaar, alle accounts op naam van de klant, elke maand een rapport van één pagina, en een niet-tevreden-geld-terugregeling na de eerste maand.`,
    '',
  );
  L.push('## Kerngegevens', '');
  L.push(`- Vestiging: ${siteConfig.address.city}`, '- Werkgebied: op locatie in Leeuwarden, Friesland en Noord-Nederland; online in heel Nederland', '- Talen: Nederlands, Engels');
  if (filled(siteConfig.email)) L.push(`- E-mail: ${siteConfig.email}`);
  if (filled(siteConfig.phoneDisplay)) L.push(`- Telefoon: ${siteConfig.phoneDisplay}`);
  L.push(`- Gratis Online Check (website, beveiliging/PHP, Bedrijfsprofiel, AI-zichtbaarheid; 3 verbeterpunten binnen 2 werkdagen): ${u('/online-check')}`, `- Contact: ${u('/contact')}`, '');

  L.push('## Pakketten', '', 'Principe: eerst je basis, dan je groei. Losse projecten en AI ernaast. Overal vaste prijzen.', '');
  const groups: [string, Parameters<typeof byKind>[0]][] = [['Basis (maandelijks)', 'basis'], ['Groeipakketten (basis inbegrepen, inrichting inbegrepen)', 'groei'], ['Losse modules (maandelijks)', 'module'], ['Eenmalige projecten', 'project'], ['AI & workshops', 'ai'], ['Consultancy (jij voert uit, wij brengen richting)', 'advies']];
  const clean = (t: string) => t.replace(/\s*\(TODO[^)]*\)/g, '');
  for (const [title, kind] of groups) {
    L.push(`### ${title}`, '');
    for (const p of byKind(kind)) {
      const extra = formatExtra(p.price);
      L.push(`- ${p.name}: ${formatPriceLong(p.price)}${extra ? ` ${extra}` : ''}. ${p.summary} Inbegrepen: ${p.includes.map(clean).join('; ')}.${p.excludes ? ` Niet inbegrepen: ${p.excludes.join('; ')}.` : ''}${p.priceNote ? ` ${p.priceNote}` : ''}`);
    }
    L.push('');
  }
  L.push(`${VAT_NOTE} ${AD_BUDGET_NOTE} Minimale looptijd maandpakketten: 3 maanden, daarna maandelijks opzegbaar. ${moneyBack.title} ${moneyBack.text}`, `Details: ${u('/pakketten')}`, '');

  L.push('## Diensten', '');
  for (const l of lines) {
    L.push(`- [${l.name}](${u(lineHref(l.id))}): ${l.short}`);
    for (const s of l.subpages) L.push(`  - [${s.name}](${u(subHref(l.id, s.slug))})`);
  }
  L.push('');

  const approved = cases.filter((c) => c.approved);
  if (approved.length) {
    L.push('## Cases en resultaten', '');
    for (const c of approved) L.push(`- [${c.client}](${u(caseHref(c.slug))}): ${stripTodo(c.description)}${c.contextNote ? ` (${c.contextNote})` : ''}`);
    L.push('');
  }
  L.push('## Branches', '');
  for (const b of branches) L.push(`- [${b.name}](${u(branchHref(b.slug))}): ${b.description}`);
  L.push('', '## Regio', '');
  for (const r of getRegions()) L.push(`- [${r.data.place}](${u(`/regio/${r.slug}`)}): ${r.data.description}`);
  const arts = getArticles().filter((a) => !a.data.draft);
  if (arts.length) {
    L.push('', '## Kennisbank', '');
    for (const a of arts) L.push(`- [${a.data.title}](${u(`/kennisbank/${a.slug}`)}): ${a.data.description}`);
  }
  L.push('', '## Optional', '', `- [Over ons](${u('/over-ons')})`, `- [Werkwijze](${u('/werkwijze')})`, `- [Sitemap](${u('/sitemap.xml')})`, '');
  return new Response(L.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
