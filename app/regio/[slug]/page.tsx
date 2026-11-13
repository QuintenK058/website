import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Page } from '@/components/layout/Page';
import { PageHero, Section, Faq, CtaBand } from '@/components/sections/Basics';
import { Related } from '@/components/sections/Related';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/seo/JsonLd';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { slotFile } from '@/lib/images';
import { getRegions, getRegion, serviceRef } from '@/lib/content';
import { pageMeta, serviceLd } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return getRegions().map((r) => ({ slug: r.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = getRegion((await params).slug);
  return pageMeta({ title: r.data.seoTitle, description: r.data.description, path: `/regio/${r.slug}` });
}

export default async function RegioPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  if (!getRegions().some((r) => r.slug === slug)) notFound();
  const r = getRegion(slug);
  const d = r.data;
  const path = `/regio/${slug}`;
  const svcs = d.services.map(serviceRef).filter((x) => !!x);
  const words = d.title.split(' ');
  return (
    <Page>
      <JsonLd nodes={[serviceLd({ name: `Online marketing, e-commerce en websites in ${d.place}`, description: d.description, path, serviceType: 'Online marketing, e-commerce en webdesign', area: [d.place] })]} page={{ path, title: d.seoTitle, description: d.description }} />
      <PageHero eyebrow={`// REGIO · ${d.place.toUpperCase()}`} title={[words.slice(0, -1).join(' '), words.slice(-1)[0]]} intro={d.intro} crumbs={[{ name: 'Home', href: '/' }, { name: 'Regio', href: '/regio' }, { name: d.place, href: path }]} />
      {slotFile(`regio-${slug}`) && <div className="container-site pt-10"><div className="panel"><div className="panel-in"><ImageSlot id={`regio-${slug}`} sizes="100vw" priority /></div></div></div>}
      <Section border={false}>
        <h2 className="sr-only">Wat speelt er in {d.place}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {d.highlights.map((h) => <div key={h.title} className="panel" data-reveal><div className="panel-in grid gap-3 p-6"><Icon name="pin" className="text-accent" /><h3 className="text-xl font-bold">{h.title}</h3><p className="text-muted">{h.text}</p></div></div>)}
        </div>
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <article className="prose-qk" dangerouslySetInnerHTML={{ __html: r.html }} />
          <aside className="grid content-start gap-3 lg:sticky lg:top-24" aria-label="Diensten">
            <h2 className="mono-label mb-2 text-[11px] text-accent">Populair in {d.place}</h2>
            {svcs.map((s) => <Link key={s!.href} href={s!.href} className="panel panel-glow group block"><span className="panel-in flex items-center justify-between p-4 font-semibold">{s!.label}<Icon name="arrow" size={16} className="text-accent" /></span></Link>)}
            <Link href="/online-check" className="btn btn-primary mt-2">Gratis Online Check</Link>
          </aside>
        </div>
      </Section>
      <Faq items={d.faq} path={path} title={[`Vragen uit ${d.place}.`, 'Eerlijk beantwoord.']} />
      <CtaBand title={[`Ondernemer in ${d.place}?`, 'Ik kom gewoon langs.']} />
      <Related title="Ook in de buurt" regions={d.nearby} branches={d.branches} services={d.services} />
    </Page>
  );
}
