import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { PageHero, Section, SectionHead, Faq, CtaBand, Source } from '@/components/sections/Basics';
import { PackageGrid, GroeiCard } from '@/components/sections/Packages';
import { CaseCard } from '@/components/sections/CaseCard';
import { Related } from '@/components/sections/Related';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/seo/JsonLd';
import { lines, line, lineHref, subHref } from '@/content/services';
import { lineInBundles } from '@/lib/services-view';
import { visibleCases } from '@/content/cases';
import { pkg } from '@/content/pricing';
import { stats } from '@/content/stats';
import { pageMeta, serviceLd } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return lines.map((l) => ({ line: l.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ line: string }> }): Promise<Metadata> {
  const l = line((await params).line);
  if (!l) return {};
  return pageMeta({ title: l.seoTitle, description: l.description, path: lineHref(l.id) });
}

export default async function LinePage({ params }: { params: Promise<{ line: string }> }) {
  const l = line((await params).line);
  if (!l) notFound();
  const cases = visibleCases().filter((c) => c.relatedService.line === l.id).slice(0, 2);
  const path = lineHref(l.id);
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Diensten', href: '/diensten' }, { name: l.name, href: path }];
  return (
    <Page>
      <JsonLd nodes={[serviceLd({ name: l.name, description: l.description, path, serviceType: l.serviceType, packageIds: l.packageIds })]} page={{ path, title: l.seoTitle, description: l.description }} />
      <PageHero eyebrow={`// [${l.index}] ${l.name.toUpperCase()}`} title={l.headline} intro={l.intro} crumbs={crumbs} />

      {/* Probleem */}
      <Section labelledby="pr-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHead label="Herken je dit?" title={['Waar het vaak', 'misgaat.']} id="pr-title" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {l.problems.map((p) => (
              <li key={p} className="panel" data-reveal><div className="panel-in flex gap-3 p-5"><span className="mono-label pt-0.5 text-[10px] text-danger">ERR</span>{' '}<span>{p}</span></div></li>
            ))}
          </ul>
        </div>
        {l.id === 'onderhoud' && (
          <div className="panel mt-10" data-reveal>
            <div className="panel-in grid gap-6 bg-[linear-gradient(120deg,rgb(255_194_77/0.12),transparent_60%),rgb(17_18_20/0.95)]! p-6 md:grid-cols-[auto_1fr_auto] md:items-center md:p-8">
              <span className="mono-label rounded-full border border-warn/60 px-3 py-1 text-[11px] text-warn">⚠ PHP 8.2 · EOL 31-12-2026</span>
              <div>
                <p className="text-xl font-bold">PHP 8.2 krijgt na 31 december 2026 geen beveiligingsupdates meer.</p>
                <p className="mt-1 text-muted">Ongeveer 30% van de mkb-websites draait op verouderde software. <Source source={stats.outdated.source} url={stats.outdated.url} /> · <Source source={stats.php.source} url={stats.php.url} /></p>
              </div>
              <Link href="/online-check" className="btn btn-primary">Check of jouw site veilig is</Link>
            </div>
          </div>
        )}
      </Section>

      {/* Wat we doen */}
      <Section labelledby="ap-title">
        <SectionHead label="Wat wij doen" title={['Zo pakken we het aan.', 'Stap voor stap.']} id="ap-title" />
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {l.approach.map((s, i) => (
            <li key={s.title} className="panel" data-reveal>
              <div className="panel-in grid content-start gap-3 p-6">
                <span className="mono-label text-[11px] text-accent">STAP {String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="text-sm text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {l.outcomes.map((o) => <li key={o} className="flex gap-2.5 text-ink-2" data-reveal><Icon name="check" className="shrink-0 text-accent" />{o}</li>)}
        </ul>
      </Section>

      {/* Subpagina's */}
      {l.subpages.length > 0 && (
        <Section labelledby="sub-title">
          <SectionHead label="Onderdelen" title={[`${l.name}:`, 'kies wat je nodig hebt.']} id="sub-title" />
          <div className="grid gap-4 md:grid-cols-2">
            {l.subpages.map((s) => (
              <Link key={s.slug} href={subHref(l.id, s.slug)} data-cursor="BEKIJK" className="panel panel-glow group" data-reveal>
                <div className="panel-in grid gap-3 p-6">
                  <h3 className="text-2xl font-bold">{s.name}</h3>
                  <p className="text-muted">{s.intro}</p>
                  <span className="mono-label inline-flex items-center gap-2 text-[11px] text-accent">Bekijk {s.name.toLowerCase()} <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* In welke pakketten zit deze dienst? */}
      {l.inBundles.length > 0 ? (
        <Section labelledby="bundle-title">
          <SectionHead label={lineInBundles(l)} title={['Liever alles in één pakket?', 'Dan zit dit er al in.']} id="bundle-title" />
          <div className="grid items-stretch gap-4 lg:grid-cols-3">{l.inBundles.filter((id) => id !== 'ontzorgd-op-maat').map((id) => <GroeiCard key={id} p={pkg(id)} />)}</div>
          <p className="mt-6 text-muted">Meer kanalen of B2B? Bekijk <Link href="/pakketten#ontzorgd-op-maat" className="text-accent underline underline-offset-4">Ontzorgd Op Maat</Link>.</p>
        </Section>
      ) : null}

      {/* Losse prijzen */}
      <Section labelledby="pp-title">
        <SectionHead label="Prijzen" title={['Los te bestellen.', 'Vaste prijs.']} id="pp-title" />
        <PackageGrid ids={l.packageIds} />
      </Section>

      {l.id === 'consultancy' && (
        <Section labelledby="uitbesteden-title">
          <SectionHead label="Toch liever uitbesteden?" title={['Wil je dat wij het uitvoeren?', 'Kies een groeipakket.']} id="uitbesteden-title" />
          <div className="grid items-stretch gap-4 lg:grid-cols-3">{['ontzorgd-lokaal', 'ontzorgd-leads', 'ontzorgd-webshop'].map((id) => <GroeiCard key={id} p={pkg(id)} />)}</div>
        </Section>
      )}

      {cases.length > 0 && (
        <Section labelledby="c-title">
          <SectionHead label="Cases" title={['Eerder werk.', 'Echte resultaten.']} id="c-title" />
          <div className="grid gap-4 md:grid-cols-2">{cases.map((c) => <CaseCard key={c.slug} c={c} />)}</div>
        </Section>
      )}

      <Faq items={l.faq} path={path} title={[`Vragen over ${l.name.toLowerCase()}.`, 'Eerlijk beantwoord.']} />
      <CtaBand />
      <Related services={lines.filter((x) => x.id !== l.id).map((x) => x.id)} branches={l.relatedBranches} regions={['leeuwarden', 'friesland', 'groningen']} articles={l.relatedArticles} />
    </Page>
  );
}
