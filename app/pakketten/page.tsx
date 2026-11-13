import Link from 'next/link';
import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { PageHero, Section, SectionHead, Faq, CtaBand } from '@/components/sections/Basics';
import { PkgCard, GroeiCard, OpMaatCard, SetupNote, InvoicingNote, HouseRules, CompareTable } from '@/components/sections/Packages';
import { Tabs } from '@/components/sections/Tabs';
import { Calculator } from '@/components/sections/Calculator';
import { StepLine } from '@/components/sections/StepLine';
import { PackageFinder } from '@/components/sections/PackageFinder';
import { FinderFallback } from '@/components/sections/FinderFallback';
import { Todo } from '@/components/ui/Todo';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { JsonLd } from '@/components/seo/JsonLd';
import { pkg, byKind, byGroup, tabs, legacyHash, startSteps, formatPriceLong, VAT_NOTE, AD_BUDGET_NOTE } from '@/content/pricing';
import { pageMeta, offerCatalogLd } from '@/lib/seo';
import { showTodos } from '@/lib/todo';

const title = 'Pakketten en prijzen: eerst je basis, dan je groei';
const description = 'Vaste prijzen, vaste scope. Zorg Basis €49/mnd, Ontzorgd Lokaal €199/mnd, Ontzorgd Leads €745/mnd, Ontzorgd Webshop €1.195/mnd. Plus losse projecten, AI-workshops en consultancy. Excl. btw.';
export const metadata: Metadata = pageMeta({ title, description, path: '/pakketten' });

const consultExpertise = ['Webshops (Shopify, WooCommerce, Magento)', 'SEO en GEO', 'Google Ads', 'Meta Ads', 'Conversie (CRO)', 'E-mailmarketing', 'Data en tracking', 'AI in je processen', 'Bureaus aansturen', 'B2B-e-commerce'];

const faq = [
  { q: 'Waar begin ik?', a: 'Doe de pakketkiezer bovenaan deze pagina, of de <a href="/online-check">gratis Online Check</a>. Twijfel je tussen twee pakketten? Kies het kleinste. Opschalen kan altijd.' },
  { q: 'Wat is het verschil tussen een basis en een groeipakket?', a: 'Een basis (Zorg Basis, Plus of Webshop) houdt je site of shop veilig en actueel. Een groeipakket (Ontzorgd Lokaal, Leads of Webshop) bevat een basis, en werkt daarnaast aan vindbaarheid, advertenties en conversie.' },
  { q: 'Zijn de inrichtingskosten inbegrepen?', a: 'Bij groeipakketten wel. Losse ads-modules hebben eenmalige inrichtingskosten: €345 voor Google Ads Lokaal en €495 voor Google Ads Shop.' },
  { q: 'Wij willen het in huis houden. Kan dat?', a: 'Ja. Met <a href="/diensten/consultancy">consultancy</a> voert je eigen team uit, en brengen wij richting en expertise: vanaf €75 per uur, of een vast maandbedrag voor bijvoorbeeld elke week een uur.' },
  { q: 'Hoe lang zit ik vast?', a: 'Minimaal 3 maanden, daarna maandelijks opzegbaar.' },
  { q: 'Zit het advertentiebudget in de prijs?', a: 'Nee. Dat betaal je rechtstreeks aan Google of Meta, via een account op jouw naam.' },
  { q: 'Wat als ik niet tevreden ben na de eerste maand?', a: 'Laat het binnen 30 dagen weten. Dan stoppen we zonder opzegtermijn en krijg je de eerste maandfee terug. Dit geldt niet voor advertentiebudget, eenmalige projecten en workshops.' },
];

export default function PakkettenPage() {
  const bases = byKind('basis');
  const groei = ['ontzorgd-lokaal', 'ontzorgd-leads', 'ontzorgd-webshop'].map(pkg);
  const modules = byKind('module');
  const calcBases = bases.map((p) => ({ id: p.id, name: p.name, monthly: p.price.amount }));
  const calcModules = modules.map((p) => ({ id: p.id, name: p.name, monthly: p.price.amount, setup: p.price.setup }));

  const panels = {
    maandelijks: (
      <div className="grid gap-16 [&>*]:min-w-0">
        <div>
          <p className="mono-label mb-2 text-[11px] text-accent">Stap 1</p>
          <h3 className="text-2xl font-bold md:text-3xl">Kies je basis.</h3>
          <p className="mt-2 mb-6 text-muted">Elke site of webshop die wij beheren, heeft er één nodig.</p>
          <div className="grid gap-4 md:grid-cols-3">{bases.map((p) => <PkgCard key={p.id} p={p} />)}</div>
        </div>
        <div>
          <p className="mono-label mb-2 text-[11px] text-accent">Stap 2</p>
          <h3 className="text-2xl font-bold md:text-3xl">Kies je groeipakket.</h3>
          <p className="mt-2 mb-8 text-muted">Hierin zit je basis al.</p>
          <div className="grid items-stretch gap-4 lg:grid-cols-3">{groei.map((p) => <GroeiCard key={p.id} p={p} />)}</div>
          <div className="mt-4"><OpMaatCard /></div>
          <div className="mt-6"><SetupNote /></div>
        </div>
        <div>
          <p className="mono-label mb-2 text-[11px] text-accent">Stap 3 · optioneel</p>
          <h3 className="text-2xl font-bold md:text-3xl">Losse modules erbij.</h3>
          <p className="mt-2 mb-6 text-muted">Stel zelf samen: kies een basis en vink modules aan.</p>
          <Calculator bases={calcBases} modules={calcModules} />
          <ul className="sr-only">
            {modules.map((m) => <li key={m.id}>{m.name}: {formatPriceLong(m.price)}{m.price.setup ? `, plus €${m.price.setup} eenmalige inrichting` : ''}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-6 text-2xl font-bold md:text-3xl">Vergelijk de groeipakketten.</h3>
          <CompareTable />
        </div>
      </div>
    ),
    projecten: (
      <div className="grid gap-14">
        {([['websites', 'Websites'], ['webshops', 'Webshops'], ['checks', 'Checks & setup']] as const).map(([g, label]) => (
          <div key={g}>
            <h3 className="mb-6 text-2xl font-bold">{label}</h3>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{byGroup(g).map((p) => <PkgCard key={p.id} p={p} cta="Aanvragen" afterDelivery={g !== 'checks'} />)}</div>
          </div>
        ))}
        <p className="rounded-[var(--radius-card)] border border-accent/40 bg-accent/[0.06] p-5 text-ink-2">Kies je Ontzorgd Lokaal voor 12 maanden, dan kost Web Start €595 in plaats van €1.195.</p>
      </div>
    ),
    ai: (
      <div className="grid gap-10">
        <div className="panel max-w-3xl"><div className="panel-in"><ImageSlot id="quinten-workshop" sizes="(min-width:1024px) 60vw, 100vw" /></div></div>
        <StepLine
          steps={[
            { label: '01 · Leren', title: 'Leren', body: <AiList ids={['ai-kennismaking', 'ai-teamworkshop']} /> },
            { label: '02 · Toepassen', title: 'Toepassen', body: <AiList ids={['ai-quickscan', 'ai-chatbot', 'ai-automatisering', 'ai-implementatie']} /> },
            { label: '03 · Volhouden', title: 'Volhouden', body: <AiList ids={['ai-partner']} /> },
          ]}
        />
        <p className="text-sm text-muted">De AI-teamworkshop zit één keer per jaar in Ontzorgd Leads. Artikel 4 van de AI Act vraagt organisaties maatregelen te nemen voor AI-geletterdheid; het dossier uit de workshop helpt je dat aantoonbaar te maken. Dit is geen juridisch advies.</p>
      </div>
    ),
    consultancy: (
      <div className="grid gap-14 [&>*]:min-w-0">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <h3 className="text-2xl font-bold md:text-3xl">Je houdt het in huis.</h3>
            <p className="mt-3 text-ink-2">Je wilt niet uitbesteden, maar mist soms een specialist. Iemand die richting geeft, de valkuilen kent en een plan maakt dat je eigen team kan uitvoeren. Wekelijks een uur, of maandelijks een aantal uren. De kennis blijft bij jou.</p>
            <p className="mt-4 text-xl font-semibold text-ink">Vanaf €75 per uur. Of een vast maandbedrag.</p>
          </div>
          <div>
            <p className="mono-label mb-3 text-[11px] text-accent">Expertise</p>
            <ul className="flex flex-wrap gap-2">
              {consultExpertise.map((e) => <li key={e} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-2">{e}</li>)}
            </ul>
          </div>
        </div>
        <div>
          <p className="mono-label mb-2 text-[11px] text-accent">Doorlopend</p>
          <h3 className="mb-6 text-2xl font-bold">Een specialist erbij, in je eigen ritme.</h3>
          <div className="grid gap-4 md:grid-cols-3">{byGroup('doorlopend').map((p) => <PkgCard key={p.id} p={p} />)}</div>
        </div>
        <div>
          <p className="mono-label mb-2 text-[11px] text-accent">Los of eenmalig</p>
          <h3 className="mb-6 text-2xl font-bold">Per uur, of eerst richting.</h3>
          <div className="grid gap-4 md:grid-cols-3">{byGroup('eenmalig').map((p) => <PkgCard key={p.id} p={p} />)}</div>
        </div>
        <div>
          <h3 className="mb-6 text-2xl font-bold">Zo werkt consultancy.</h3>
          <StepLine
            steps={[
              { label: '01 · Intake', title: 'Intake', body: 'Waar sta je, wat wil je bereiken, en wie doet wat in je team?' },
              { label: '02 · Analyse', title: 'Analyse', body: 'Data, kanalen, site of webshop en marges: waar zit de groei, waar lekt het?' },
              { label: '03 · Plan', title: 'Plan van aanpak', body: 'Doelen, prioriteiten, roadmap, KPI\'s en taakverdeling. Concreet genoeg om morgen te beginnen.' },
              { label: '04 · Begeleiding', title: 'Begeleiding', body: 'Wekelijks of maandelijks meekijken en bijsturen. Jouw team voert uit.' },
            ]}
          />
        </div>
        <p className="rounded-[var(--radius-card)] border border-line p-5 text-ink-2">Uitvoering zit niet in consultancy. Wil je dat wij het doen? <Link href="#maandelijks" className="font-semibold text-accent underline underline-offset-4">Kies een groeipakket</Link>. Meer weten? <Link href="/diensten/consultancy" className="font-semibold text-accent underline underline-offset-4">Bekijk consultancy</Link>.</p>
      </div>
    ),
  };

  return (
    <Page>
      <JsonLd nodes={[offerCatalogLd()]} page={{ path: '/pakketten', title, description }} />
      <PageHero
        eyebrow="// PAKKETTEN · VASTE PRIJS, VASTE SCOPE"
        title={['Eerst je basis.', 'Dan je groei.']}
        intro="Losse projecten en AI ernaast. Overal vaste prijzen, en bij elk pakket staat wat erin zit én wat er níet in zit."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Pakketten', href: '/pakketten' }]}
        ctas={false}
      />

      <Section border={false} labelledby="kiezer-title">
        <SectionHead label="Pakketkiezer" title={['Welk pakket past bij mij?', 'Drie vragen, één advies.']} id="kiezer-title" />
        <div className="min-h-[360px]">
          <FinderFallback />
          <PackageFinder />
        </div>
      </Section>

      <Section labelledby="tabs-title">
        <h2 id="tabs-title" className="sr-only">Alle pakketten</h2>
        <Tabs tabs={tabs.map((t, i) => ({ id: t.id, label: t.label, index: String(i + 1).padStart(2, '0'), line: t.line }))} panels={panels} aliases={legacyHash} />
        <p className="mono-label mt-10 text-[11px] text-muted">{VAT_NOTE} {AD_BUDGET_NOTE}</p>
      </Section>

      <Section labelledby="start-title">
        <SectionHead label="Zo start je" title={['Van keuze tot ritme.', 'In vier stappen.']} id="start-title" />
        <StepLine
          steps={startSteps.map((s, i) => ({
            label: `Stap ${String(i + 1).padStart(2, '0')}`,
            title: s.title,
            body: <>{s.text}{s.todo && showTodos ? <> <Todo text={s.todo} /></> : null}</>,
          }))}
        />
        <div className="mt-10"><InvoicingNote /></div>
      </Section>

      <Section labelledby="rules-title">
        <SectionHead label="Spelregels" title={['Geen kleine lettertjes.', 'Wel duidelijke afspraken.']} id="rules-title" />
        <HouseRules />
      </Section>

      <Faq items={faq} path="/pakketten" />
      <CtaBand title={['Twijfel je nog?', 'Begin met de gratis check.']} />
    </Page>
  );
}

function AiList({ ids }: { ids: string[] }) {
  return (
    <ul className="grid gap-3">
      {ids.map((id) => {
        const p = pkg(id);
        return (
          <li key={id} id={id} className="rounded-[var(--radius-panel)] border border-line bg-surface p-4">
            <p className="font-semibold text-ink">{p.name}</p>
            <p className="font-mono text-sm text-accent">{formatPriceLong(p.price)}{p.price.extra ? ` + ${p.price.extra}` : ''}</p>
            {p.priceNote && <p className="text-sm text-ink-2">{p.priceNote}</p>}
            <p className="mt-1 text-sm">{p.summary}</p>
          </li>
        );
      })}
    </ul>
  );
}
