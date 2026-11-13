import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { PageHero, Section, SectionHead, Faq, CtaBand } from '@/components/sections/Basics';
import { TierCard } from '@/components/sections/Packages';
import { Related } from '@/components/sections/Related';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/seo/JsonLd';
import { branches, branch, branchHref } from '@/content/branches';
import { directions } from '@/content/directions';
import { serviceRef } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const b = branch((await params).slug);
  return b ? pageMeta({ title: b.seoTitle, description: b.description, path: branchHref(b.slug) }) : {};
}

const bundleTier = { lokaal: ['website', 'web-lokaal'], groei: ['marketing', 'mkt-groei'], webshop: ['ecommerce', 'ecom-groei'] } as const;

export default async function BranchPage({ params }: { params: Promise<{ slug: string }> }) {
  const b = branch((await params).slug);
  if (!b) notFound();
  const path = branchHref(b.slug);
  const [dirId, tierId] = bundleTier[b.bundle];
  const dir = directions.find((d) => d.id === dirId)!;
  const tier = dir.tiers.find((t) => t.id === tierId)!;
  const svcs = b.services.map((s) => serviceRef(s.sub ? `${s.line}/${s.sub}` : s.line)).filter((x) => !!x);
  return (
    <Page>
      <JsonLd nodes={[]} page={{ path, title: b.seoTitle, description: b.description }} />
      <PageHero eyebrow={`// BRANCHE · ${b.name.toUpperCase()}`} title={b.headline} intro={b.intro} crumbs={[{ name: 'Home', href: '/' }, { name: 'Branches', href: '/branches' }, { name: b.name, href: path }]}>
        <ul className="flex flex-wrap gap-2">{b.examples.map((e) => <li key={e} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-2">{e}</li>)}</ul>
      </PageHero>
      <Section border={false} labelledby="p-title">
        <SectionHead label="Typische problemen" title={['Waar het online', 'vaak misgaat.']} id="p-title" />
        <div className="grid gap-4 md:grid-cols-2">
          {b.problems.map((p) => <div key={p.title} className="panel" data-reveal><div className="panel-in p-6"><h3 className="text-xl font-bold">{p.title}</h3><p className="mt-2 text-muted">{p.text}</p></div></div>)}
        </div>
      </Section>
      <Section labelledby="a-title">
        <SectionHead label="Onze aanpak" title={['Zo lossen we', 'het op.']} id="a-title" />
        <ol className="grid gap-4 md:grid-cols-2">
          {b.approach.map((a, i) => (
            <li key={a.title} className="panel" data-reveal><div className="panel-in grid grid-cols-[auto_1fr] gap-4 p-6">
              <span className="mono-label pt-1 text-[11px] text-accent">[{String(i + 1).padStart(2, '0')}]</span>
              <div><h3 className="text-xl font-bold">{a.title}</h3><p className="mt-2 text-muted">{a.text}</p></div>
            </div></li>
          ))}
        </ol>
      </Section>
      <Section labelledby="s-title">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHead label="Passende diensten" title={['Wat je nodig hebt.', 'Niet meer, niet minder.']} id="s-title" />
            <ul className="grid gap-3">
              {svcs.map((s) => (
                <li key={s!.href}><Link href={s!.href} className="panel panel-glow group block"><span className="panel-in flex items-center justify-between gap-4 p-5"><span className="text-lg font-semibold">{s!.label}</span><Icon name="arrow" className="text-accent transition-transform group-hover:translate-x-1" /></span></Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mono-label mb-4 text-[11px] text-accent">Aanrader voor {b.name.toLowerCase()}</p>
            <TierCard t={tier} direction={dir} />
          </div>
        </div>
      </Section>
      <Faq items={b.faq} path={path} />
      <CtaBand />
      <Related branches={branches.filter((x) => x.slug !== b.slug).map((x) => x.slug)} regions={['leeuwarden', 'friesland', 'sneek', 'drachten', 'heerenveen', 'groningen']} />
    </Page>
  );
}
