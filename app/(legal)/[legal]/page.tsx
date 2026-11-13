import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { Breadcrumbs } from '@/components/sections/Basics';
import { getLegal, legalSlugs } from '@/lib/content';
import { isTodo } from '@/lib/todo';
import { pageMeta } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return legalSlugs.map((legal) => ({ legal }));
}
export async function generateMetadata({ params }: { params: Promise<{ legal: string }> }): Promise<Metadata> {
  const l = getLegal((await params).legal);
  return pageMeta({ title: l.data.title, description: l.data.description, path: `/${l.slug}` });
}

export default async function LegalPage({ params }: { params: Promise<{ legal: string }> }) {
  const slug = (await params).legal;
  if (!(legalSlugs as readonly string[]).includes(slug)) notFound();
  const l = getLegal(slug);
  return (
    <Page>
      <section className="border-b border-line">
        <div className="container-site grid gap-5 pt-10 pb-12">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: l.data.title, href: `/${slug}` }]} />
          <h1 className="pt-4 text-5xl font-bold">{l.data.title}</h1>
          {!isTodo(l.data.updated) && <p className="text-muted">Laatst bijgewerkt: {l.data.updated}</p>}
        </div>
      </section>
      <section className="container-site py-14">
        <p role="note" className="mb-8 max-w-[var(--container-prose)] rounded-xl border border-warn/50 bg-warn/10 p-4 text-sm">
          <strong>Let op:</strong> deze tekst is nog in concept en wordt binnenkort definitief gemaakt. Dit is geen juridisch advies.
        </p>
        <article className="prose-qk" dangerouslySetInnerHTML={{ __html: l.html }} />
      </section>
    </Page>
  );
}
