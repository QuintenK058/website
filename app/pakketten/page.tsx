import Link from 'next/link';
import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { PageHero, Section, SectionHead, Faq, CtaBand } from '@/components/sections/Basics';
import { TierCard, PackageRow, HouseRules, CompareTable } from '@/components/sections/Packages';
import { DirectionTabs } from '@/components/sections/DirectionTabs';
import { Calculator } from '@/components/sections/Calculator';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/seo/JsonLd';
import { directions } from '@/content/directions';
import { pkg, calculatorModules, VAT_NOTE, AD_BUDGET_NOTE } from '@/content/pricing';
import { lineHref, line } from '@/content/services';
import { pageMeta, offerCatalogLd } from '@/lib/seo';

const title = 'Pakketten en prijzen: kies je richting';
const description = 'Kies een richting (e-commerce, online marketing, website, AI of consultancy) en daarbinnen een pakket met vaste prijs en scope. Ontzorgd vanaf €99/mnd. Alle prijzen excl. btw.';
export const metadata: Metadata = pageMeta({ title, description, path: '/pakketten' });

const faq = [
  { q: 'Hoe kies ik de juiste richting?', a: 'Heb je een webshop, kies dan E-commerce. Wil je meer aanvragen voor je dienst, kies Online marketing. Heb je vooral een (nieuwe) site nodig, kies Website & development. Twijfel je? De <a href="/online-check">gratis Online Check</a> geeft richting.' },
  { q: 'Kan ik pakketten combineren?', a: 'Ja. Veel klanten combineren bijvoorbeeld Webshop Groei met Wekelijkse sparring, of Ontzorgd Lokaal met een AI-workshop. Combineren is altijd mogelijk.' },
  { q: 'Zijn de setupkosten inbegrepen?', a: 'In de ontzorgpakketten wel. Neem je een module los, dan staan eventuele setupkosten erbij vermeld.' },
  { q: 'Wat als ik niet tevreden ben?', a: 'Dan krijg je je geld terug. TODO: vat de voorwaarden in één zin samen.' },
  { q: 'Hoe lang zit ik vast?', a: 'Minimaal 3 maanden, daarna maandelijks opzegbaar.' },
  { q: 'Zit het advertentiebudget in de prijs?', a: 'Nee. Dat betaal je rechtstreeks aan Google, Meta of TikTok, via een account op jouw naam.' },
];

export default function PakkettenPage() {
  const tabs = directions.map((d) => ({ id: d.id, label: d.name, mono: d.mono, index: d.index }));
  const panels = Object.fromEntries(
    directions.map((d) => [
      d.id,
      <div key={d.id} className="grid gap-12">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="mono-label text-[11px] text-accent">[{d.index}] {d.mono}</p>
            <h2 className="mt-3 text-4xl leading-[0.98] font-bold md:text-5xl">{d.headline[0]} <span className="dim">{d.headline[1]}</span></h2>
            <p className="mt-4 max-w-2xl text-lg text-muted">{d.pitch}</p>
          </div>
          <ul className="flex flex-wrap gap-2 lg:justify-end">
            {d.forWho.map((f) => <li key={f} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-2">{f}</li>)}
          </ul>
        </div>
        <div className="grid items-stretch gap-4 lg:grid-cols-3">
          {d.tiers.map((t) => <div key={t.id} data-tier><TierCard t={t} direction={d} /></div>)}
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mono-label mb-4 text-ink-2">Los bij te boeken</h3>
            <ul className="grid gap-2">{d.addons.map((id) => <PackageRow key={id} p={pkg(id)} />)}</ul>
          </div>
          <div>
            <h3 className="mono-label mb-4 text-ink-2">Eenmalige projecten</h3>
            <ul className="grid gap-2">{d.oneOffs.map((id) => <PackageRow key={id} p={pkg(id)} />)}</ul>
          </div>
        </div>
        <p className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
          Meer weten?
          {d.lines.map((l) => <Link key={l} href={lineHref(l)} className="inline-flex items-center gap-1 font-semibold text-accent hover:underline">{line(l)?.name} <Icon name="arrow" size={14} /></Link>)}
        </p>
      </div>,
    ]),
  );
  const modules = calculatorModules
    .map((id) => pkg(id))
    .filter((p) => p.price.amount != null && p.price.unit === 'mnd')
    .map((p) => ({ id: p.id, name: p.name, monthly: p.price.amount!, setup: p.price.setup }));

  return (
    <Page>
      <JsonLd nodes={[offerCatalogLd()]} page={{ path: '/pakketten', title, description }} />
      <PageHero
        eyebrow="// PAKKETTEN — VASTE PRIJS, VASTE SCOPE"
        title={['Kies je richting.', 'Dan je pakket.']}
        intro="Andere bureaus zeggen ontzorgen en laten je dan een offerte aanvragen. Wij laten zien wat het kost en wat erin zit. Ook wat er níet in zit."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Pakketten', href: '/pakketten' }]}
        ctas={false}
      >
        <ul className="grid gap-2 pt-2 sm:grid-cols-5">
          {directions.map((d) => (
            <li key={d.id}>
              <a href={`#${d.id}`} className="flex h-full items-center gap-3 rounded-[var(--radius-panel)] border border-line bg-surface/70 px-4 py-3 transition-colors hover:border-accent">
                <Icon name={d.icon} size={20} className="shrink-0 text-accent" />
                <span className="text-sm font-semibold">{d.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section border={false} labelledby="kies-title">
        <h2 id="kies-title" className="sr-only">Pakketten per richting</h2>
        <DirectionTabs tabs={tabs} panels={panels} />
        <p className="mono-label mt-10 text-[11px] text-muted">{VAT_NOTE} {AD_BUDGET_NOTE}</p>
      </Section>

      <Section labelledby="cmp-title">
        <SectionHead index="02" label="Vergelijken" title={['De drie ontzorgbundels.', 'Naast elkaar.']} intro="Ontzorgd Lokaal, Groei en Webshop zijn de meest gekozen pakketten uit de richtingen Website, Marketing en E-commerce." id="cmp-title" />
        <CompareTable />
      </Section>

      <Section labelledby="calc-title">
        <SectionHead index="03" label="Calculator" title={['Liever zelf samenstellen?', 'Vink aan wat je nodig hebt.']} id="calc-title" />
        <Calculator modules={modules} />
      </Section>

      <Section labelledby="rules-title">
        <SectionHead index="04" label="Spelregels" title={['Geen kleine lettertjes.', 'Wel duidelijke afspraken.']} id="rules-title" />
        <HouseRules />
      </Section>

      <Faq items={faq} path="/pakketten" index="05" />
      <CtaBand title={['Twijfel je nog?', 'Begin met de gratis check.']} />
    </Page>
  );
}
