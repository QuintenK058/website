/** /llms.txt: samenvatting voor AI-systemen, bij elke build opnieuw uit de content. */
import { siteConfig } from '@/site.config';
import { directions } from '@/content/directions';
import { lines, lineHref, subHref } from '@/content/services';
import { packages, formatPrice, euro, VAT_NOTE, AD_BUDGET_NOTE } from '@/content/pricing';
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
    `${siteConfig.shortName} (QK) is een full-service online agency in ${siteConfig.address.city}, Friesland, opgericht door ${siteConfig.founder.name}, e-commercespecialist met de nadruk op B2B. QK werkt voor mkb zonder eigen marketingafdeling: zakelijke dienstverleners, bouw en installatie, zorg, horeca, kappers en salons, en webshops (Shopify en Magento). Kenmerken: gepubliceerde prijzen en scope, minimaal 3 maanden en daarna maandelijks opzegbaar, alle accounts op naam van de klant, elke maand een rapport van één pagina, en "niet tevreden = geld terug".`,
    '',
  );
  L.push('## Kerngegevens', '');
  L.push(`- Vestiging: ${siteConfig.address.city}`, '- Werkgebied: op locatie in Leeuwarden, Friesland en Noord-Nederland; online in heel Nederland', '- Talen: Nederlands, Engels');
  if (filled(siteConfig.email)) L.push(`- E-mail: ${siteConfig.email}`);
  if (filled(siteConfig.phoneDisplay)) L.push(`- Telefoon: ${siteConfig.phoneDisplay}`);
  L.push(`- Gratis Online Check (website, beveiliging/PHP, Bedrijfsprofiel, AI-zichtbaarheid; 3 verbeterpunten binnen 2 werkdagen): ${u('/online-check')}`, `- Contact: ${u('/contact')}`, '');

  L.push('## Richtingen en pakketten', '');
  for (const d of directions) {
    L.push(`### ${d.name}`, '', d.pitch, '');
    for (const t of d.tiers) {
      const price = t.monthly != null ? `${euro(t.monthly)}/mnd` : t.oneOff ?? 'op offerte';
      L.push(`- ${t.name} (${price}): ${t.weDo.map(stripTodo).filter(Boolean).join('; ')}. Niet inbegrepen: ${t.excludes.join('; ')}.`);
    }
    L.push(`- Details: ${u(`/pakketten#${d.id}`)}`, '');
  }
  L.push(`${VAT_NOTE} ${AD_BUDGET_NOTE}`, '');

  L.push('## Diensten en losse prijzen', '');
  for (const l of lines) {
    L.push(`- [${l.name}](${u(lineHref(l.id))}): ${l.short}`);
    for (const s of l.subpages) L.push(`  - [${s.name}](${u(subHref(l.id, s.slug))})`);
  }
  L.push('');
  for (const p of packages) L.push(`- ${p.name}: ${formatPrice(p.price)}${p.price.setup ? ` + ${euro(p.price.setup)} setup` : ''}${p.price.extra ? ` (${p.price.extra})` : ''}. ${p.summary}`);
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
