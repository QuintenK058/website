import Link from 'next/link';
import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { HomeHero } from '@/components/sections/HomeHero';
import { Section, SectionHead, Faq, CtaBand, Source } from '@/components/sections/Basics';
import { Marquee, Magnetic, CountUp } from '@/components/motion/primitives';
import { ServiceRail } from '@/components/sections/ServiceRail';
import { PackageFinder } from '@/components/sections/PackageFinder';
import { FinderFallback } from '@/components/sections/FinderFallback';
import { GroeiCard } from '@/components/sections/Packages';
import { railItems } from '@/lib/services-view';
import { ResultsStrip } from '@/components/sections/Results';
import { Pipeline } from '@/components/sections/Pipeline';
import { CaseCard } from '@/components/sections/CaseCard';
import { StatusCard } from '@/components/control/StatusCard';
import { GovernancePanel } from '@/components/control/GovernancePanel';
import { MetricCard, AIVisibilityCard, AgentLog } from '@/components/control/Animated';
import { ConnectionMap } from '@/components/control/ConnectionMap';
import { Icon } from '@/components/ui/Icon';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { SplitHeading } from '@/components/motion/primitives';
import { home } from '@/content/home';
import { stats } from '@/content/stats';
import { featuredCases } from '@/content/cases';
import { branches, branchHref } from '@/content/branches';
import { pkg } from '@/content/pricing';
import { siteConfig } from '@/site.config';
import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { showTodos } from '@/lib/todo';

export const metadata: Metadata = pageMeta({ title: home.seoTitle, description: home.description, path: '/', absoluteTitle: true });

export default function HomePage() {
  const rail = railItems();
  const featured = featuredCases();
  return (
    <Page>
      <JsonLd nodes={[]} page={{ path: '/', title: home.seoTitle, description: home.description }} />

      {/* 1. Hero */}
      <HomeHero />

      {/* 2. Statusbalk */}
      <div className="border-b border-line bg-surface">
        <Marquee
          items={home.ticker}
          label="Wat we doen"
          status={<span className="mono-label flex shrink-0 items-center gap-2 py-3 pl-[max(1.25rem,env(safe-area-inset-left))] text-[11px] text-ok"><span className="dot" />SYS: ONLINE</span>}
        />
      </div>

      {/* Social proof */}
      <ResultsStrip />

      {/* 3. Pakketkiezer */}
      <section className="py-20 md:py-32" aria-labelledby="kiezer-title">
        <div className="container-site">
          <SectionHead index="01" label="Waar wil je hulp bij?" title={['Drie vragen.', 'Eén passend pakket.']} intro="Eerst je basis, dan je groei. Losse projecten en AI ernaast. Beantwoord drie vragen en je ziet meteen wat bij je past, met prijs." id="kiezer-title" />
          <div className="min-h-[360px]">
            <FinderFallback />
            <PackageFinder compact />
          </div>
        </div>
      </section>

      {/* Diensten-rail */}
      <section className="border-t border-line py-20 md:py-32" aria-labelledby="diensten-title">
        <div className="container-site">
          <SectionHead index="02" label="Diensten" title={['Zes diensten.', 'Eén aanspreekpunt.']} intro="Diensten zijn wat we doen. Pakketten zijn hoe je het afneemt." id="diensten-title" />
        </div>
        <ServiceRail items={rail} />
      </section>

      {/* 4. Herken je dit? */}
      <Section labelledby="pains-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHead index="03" label="Herken je dit?" title={home.pains.title} id="pains-title" />
            <div className="grid gap-4">
              {home.pains.statIds.map((id) => {
                const s = stats[id];
                return (
                  <div key={id} className="border-l-2 border-accent pl-4" data-reveal>
                    <p className="text-4xl font-bold tracking-tight"><CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} /></p>
                    <p className="mt-1 text-sm text-muted">{s.label}</p>
                    <Source source={s.source} url={s.url} />
                  </div>
                );
              })}
            </div>
          </div>
          <ol className="grid gap-3">
            {home.pains.items.map((p) => (
              <li key={p.title} className="panel panel-glow" data-reveal>
                <div className="panel-in grid grid-cols-[auto_1fr] gap-5 p-6">
                  <span className="mono-label pt-1 text-[10px] text-accent">[{p.tag}]</span>
                  <div><h3 className="text-xl font-bold">{p.title}</h3><p className="mt-1.5 text-muted">{p.text}</p></div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* 5. Mission Control */}
      <Section id="ontzorgd" labelledby="mc-title">
        <SectionHead index="04" label="Mission control" title={['Jij onderneemt.', 'Wij houden het in de gaten.']} intro="Zo ziet ontzorgd eruit: alles bewaakt, alles gemeten, elke maand een rapport van één pagina." id="mc-title" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <StatusCard className="lg:col-span-4" />
          <MetricCard className="lg:col-span-8" title="Weergaven Bedrijfsprofiel · 30 dagen" value={1284} delta="+22%" points={[12, 18, 15, 24, 22, 31, 28, 40, 37, 49, 56]} />
          <AIVisibilityCard className="lg:col-span-5" />
          <AgentLog className="lg:col-span-7" />
          <MetricCard className="lg:col-span-4" title="Ads · kosten per aanvraag" value={23.4} decimals={2} prefix="€" delta="−18%" points={[40, 38, 35, 36, 31, 29, 30, 26, 25, 23]} />
          <GovernancePanel className="lg:col-span-8" />
        </div>
        <p className="mono-label mt-6 text-[10px] text-muted">Alle cijfers in deze panelen zijn illustratief en horen niet bij een echte klant.</p>
      </Section>

      {/* 6. Zo werkt ontzorgen */}
      <section aria-labelledby="pipe-title">
        <Pipeline
          steps={home.pipeline}
          consoleText={home.pipelineConsole}
          heading={<SectionHead index="05" label="Zo werkt ontzorgen" title={['Vier stappen.', 'Geen verrassingen.']} id="pipe-title" className="mb-10!" />}
        />
      </section>

      {/* 7. Connection map */}
      <Section labelledby="map-title">
        <SectionHead index="06" label="Alles gekoppeld" title={['Eén systeem.', 'Geen losse eilandjes.']} intro="Website, webshop, Google, Meta, e-mail, CRM en AI-assistent: wij koppelen het en houden het draaiende." id="map-title" />
        <ConnectionMap />
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tools waarmee we werken">
          {home.tools.map((t) => <li key={t} className="mono-label rounded-full border border-line px-3 py-1.5 text-[11px] text-muted">{t}</li>)}
        </ul>
      </Section>

      {/* 8. Pakketten */}
      <Section id="pakketten" labelledby="pk-title">
        <SectionHead index="07" label="Volledig ontzorgd" title={['Vaste prijs.', 'Vaste scope.']} intro="Drie groeipakketten waarin je basis al zit, met wat we doen én wat er níet in zit. Prijzen excl. btw, inrichting inbegrepen." id="pk-title" />
        <div className="grid items-stretch gap-4 lg:grid-cols-3">
          {['ontzorgd-lokaal', 'ontzorgd-leads', 'ontzorgd-webshop'].map((id) => <GroeiCard key={id} p={pkg(id)} />)}
        </div>
        <div className="mt-8"><Magnetic><Link href="/pakketten" className="btn btn-ghost">Alle pakketten, projecten, AI en advies <Icon name="arrow" size={16} /></Link></Magnetic></div>
      </Section>

      {/* 9. AI-blok */}
      <Section labelledby="ai-title" className="overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_80%_30%,rgb(122_92_255/0.16),transparent_70%)]" />
        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHead index="08" label="AI · mission control" title={['Van losse proefjes.', 'Naar veilig, gemeten AI.']} intro="Workshops in Leeuwarden en in-company, met een AI-geletterdheidsdossier. Daarna chatbots en workflows die echt werk uit handen nemen." id="ai-title" />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="panel" data-reveal><div className="panel-in p-5"><p className="mono-label text-[10px] text-accent">Open groep</p><p className="mt-2 text-xl font-bold">AI-Kennismaking</p><p className="text-muted">€195 p.p. · 3 uur in Leeuwarden</p></div></div>
              <div className="panel" data-reveal><div className="panel-in p-5"><p className="mono-label text-[10px] text-accent">In-company</p><p className="mt-2 text-xl font-bold">AI-Teamworkshop</p><p className="text-muted">€1.295 · incl. AI-dossier</p></div></div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3"><Magnetic><Link href="/diensten/ai" className="btn btn-primary">Bekijk AI <Icon name="arrow" size={16} /></Link></Magnetic></div>
            <p className="mt-6 text-sm text-muted">{stats.aiExperience.display} van de microbedrijven noemt gebrek aan ervaring als drempel voor AI. <Source source={stats.aiExperience.source} url={stats.aiExperience.url} /></p>
          </div>
          <AgentLog title="AI-agent · log" lines={[['09:00', 'Mail gesorteerd: 14 → 3 vragen voor jou'], ['09:02', 'Offerteconcept klaar voor controle'], ['09:10', 'Chatbot: 6 klantvragen beantwoord'], ['09:15', 'Productteksten: 20 concepten klaar'], ['09:30', 'Tijdwinst deze week: 4,5 uur'], ['09:31', 'AI-dossier bijgewerkt']]} />
        </div>
      </Section>

      {/* 10. Cases */}
      <Section labelledby="cases-title">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead index="09" label="Cases" title={['Echte klanten.', 'Echte resultaten.']} id="cases-title" />
          <Link href="/cases" className="btn btn-ghost mb-14">Alle cases <Icon name="arrow" size={16} /></Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => <CaseCard key={c.slug} c={c} />)}
        </div>
      </Section>

      {/* 11. Branches */}
      <Section labelledby="br-title">
        <SectionHead index="10" label="Branches" title={['Voor mkb zonder', 'eigen marketingafdeling.']} id="br-title" />
        <ul className="flex flex-wrap gap-3">
          {branches.map((b) => (
            <li key={b.slug}><Link href={branchHref(b.slug)} data-reveal className="inline-flex items-center gap-3 rounded-full border border-line px-5 py-3 text-lg font-semibold transition-colors hover:border-accent hover:text-accent">{b.name}<Icon name="arrow" size={16} /></Link></li>
          ))}
        </ul>
      </Section>

      {/* 12. Over Quinten */}
      <Section labelledby="about-title">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="panel mx-auto w-full max-w-sm" data-reveal>
            <div className="panel-in"><ImageSlot id="quinten-portret" sizes="(min-width:1024px) 30vw, 90vw" /></div>
          </div>
          <div>
            <SectionHead index="11" label="Over Quinten" title={['Ik kom gewoon langs.', 'Eén aanspreekpunt.']} id="about-title" className="mb-6!" />
            <div className="grid gap-4 text-lg text-muted" data-reveal>
              <p>Ik ben {siteConfig.founder.name}, e-commercespecialist met de nadruk op B2B. Als specialist bij een familiebedrijf in Leeuwarden groeide de webshop onder mijn beheer in 11 maanden met 75% in omzet. Die ervaring zet ik nu in voor ondernemers in Friesland en daarbuiten.</p>
              <p>Je spreekt mij, geen accountmanager. In Leeuwarden, Friesland en Noord-Nederland kom ik langs, ook voor workshops met je team.</p>
            </div>
            <div className="mt-6"><Link href="/over-ons" className="btn btn-ghost">Meer over QK <Icon name="arrow" size={16} /></Link></div>
          </div>
        </div>
      </Section>

      {/* 13. FAQ */}
      <Faq items={home.faq} path="/" index="12" />

      {/* 14. CTA */}
      <CtaBand />
    </Page>
  );
}
