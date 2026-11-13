import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { PageHero, Section, SectionHead, Faq, CtaBand } from '@/components/sections/Basics';
import { PackageGrid } from '@/components/sections/Packages';
import { Related } from '@/components/sections/Related';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/seo/JsonLd';
import { lines, line, subpage, lineHref, subHref } from '@/content/services';
import { directionForLine } from '@/content/directions';
import { pageMeta, serviceLd } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return lines.flatMap((l) => l.subpages.map((s) => ({ line: l.id, sub: s.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ line: string; sub: string }> }): Promise<Metadata> {
  const { line: l, sub } = await params;
  const s = subpage(l, sub);
  if (!s) return {};
  return pageMeta({ title: s.seoTitle, description: s.description, path: subHref(l, sub) });
}

export default async function SubPage({ params }: { params: Promise<{ line: string; sub: string }> }) {
  const { line: lid, sub } = await params;
  const l = line(lid);
  const s = subpage(lid, sub);
  if (!l || !s) notFound();
  const path = subHref(l.id, s.slug);
  const dir = directionForLine(l.id);
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Diensten', href: '/diensten' }, { name: l.name, href: lineHref(l.id) }, { name: s.name, href: path }];
  const words = s.title.split(':');
  const title: [string, string] = words.length > 1 ? [`${words[0]}:`, words.slice(1).join(':').trim()] : [s.title, ''];
  return (
    <Page>
      <JsonLd nodes={[serviceLd({ name: s.name, description: s.description, path, serviceType: l.serviceType, packageIds: s.packageIds })]} page={{ path, title: s.seoTitle, description: s.description }} />
      <PageHero eyebrow={`// ${l.name.toUpperCase()} · ${s.name.toUpperCase()}`} title={title[1] ? title : [s.title]} intro={s.intro} crumbs={crumbs} />

      <Section labelledby="wd-title">
        <SectionHead label="Wat we concreet doen" title={['Dit regelen we.', 'Jij hoeft er niet naar te kijken.']} id="wd-title" />
        <div className="grid gap-4 md:grid-cols-2">
          {s.points.map((p, i) => (
            <article key={p.title} className="panel panel-glow" data-reveal>
              <div className="panel-in grid gap-3 p-6">
                <span className="mono-label text-[11px] text-accent">[{String(i + 1).padStart(2, '0')}]</span>
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="text-muted">{p.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="mono-label text-[11px] text-muted">Voor wie:</span>
          {s.forWho.map((f) => <span key={f} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-2">{f}</span>)}
        </div>
      </Section>

      <Section labelledby="sp-title">
        <SectionHead label="Prijzen" title={['Vaste prijs.', 'Vooraf duidelijk.']} id="sp-title" />
        <PackageGrid ids={s.packageIds} />
        {dir && (
          <p className="mt-8 text-muted">
            Liever alles in één pakket? Bekijk de <Link href={`/pakketten#${dir.id}`} className="font-semibold text-accent underline underline-offset-4">{dir.name}-pakketten</Link>.
          </p>
        )}
      </Section>

      <Faq items={s.faq} path={path} title={[`Vragen over ${s.name.toLowerCase()}.`, 'Eerlijk beantwoord.']} />
      <CtaBand />
      <Related title="Ook interessant" services={[l.id, ...l.subpages.filter((x) => x.slug !== s.slug).map((x) => `${l.id}/${x.slug}`)]} branches={l.relatedBranches} articles={l.relatedArticles} />
      <div className="sr-only"><Link href={lineHref(l.id)}>Terug naar {l.name} <Icon name="arrow" /></Link></div>
    </Page>
  );
}
