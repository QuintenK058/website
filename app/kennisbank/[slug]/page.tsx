import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { Breadcrumbs, Faq, CtaBand } from '@/components/sections/Basics';
import { Related } from '@/components/sections/Related';
import { JsonLd } from '@/components/seo/JsonLd';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { slots } from '@/content/images';
import { getArticles, getArticle } from '@/lib/content';
import { pageMeta, articleLd } from '@/lib/seo';
import { siteConfig } from '@/site.config';

export const dynamicParams = false;
export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = getArticle((await params).slug);
  return pageMeta({ title: a.data.seoTitle ?? a.data.title, description: a.data.description, path: `/kennisbank/${a.slug}`, type: 'article', noindex: a.data.draft });
}
const fmt = new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  if (!getArticles().some((a) => a.slug === slug)) notFound();
  const a = getArticle(slug);
  const d = a.data;
  const path = `/kennisbank/${slug}`;
  const pub = new Date(d.pubDate);
  return (
    <Page>
      <JsonLd nodes={[articleLd({ title: d.title, description: d.description, path, pubDate: pub, updatedDate: d.updatedDate ? new Date(d.updatedDate) : undefined, author: d.author })]} />
      <section className="relative border-b border-line">
        <div className="container-site grid gap-6 pt-10 pb-16">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Kennisbank', href: '/kennisbank' }, { name: d.title, href: path }]} />
          {d.draft && <p className="mono-label w-fit rounded-full bg-todo-bg px-3 py-1 text-[10px] text-todo">Concept (draft: true): niet zichtbaar in productie</p>}
          <h1 className="max-w-4xl pt-4 text-4xl leading-[0.98] font-bold md:text-6xl">{d.title}</h1>
          <p className="max-w-2xl text-lg text-muted">{d.description}</p>
          <p className="mono-label flex flex-wrap gap-x-3 text-[11px] text-muted">
            <span>Door {d.author ?? siteConfig.founder.name}</span><span>·</span><time dateTime={pub.toISOString()}>{fmt.format(pub)}</time>{d.readingTime && <><span>·</span><span>{d.readingTime} min lezen</span></>}
          </p>
        </div>
      </section>
      {slots.some((x) => x.id === `cover-${slug}`) && <div className="container-site pt-12"><div className="panel mx-auto max-w-4xl"><div className="panel-in"><ImageSlot id={`cover-${slug}`} sizes="(min-width:1024px) 900px, 100vw" /></div></div></div>}
      <section className="py-16">
        <article className="container-site prose-qk mx-auto" dangerouslySetInnerHTML={{ __html: a.html }} />
      </section>
      <Faq items={d.faq} path={path} title={['Kort antwoord.', 'De belangrijkste vragen.']} />
      <CtaBand />
      <Related title="Verder lezen" services={d.relatedServices} articles={getArticles().filter((x) => x.slug !== slug).map((x) => x.slug)} />
    </Page>
  );
}
