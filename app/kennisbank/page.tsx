import Link from 'next/link';
import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { PageHero, Section, CtaBand } from '@/components/sections/Basics';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/seo/JsonLd';
import { getArticles } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

const title = 'Kennisbank: websites, SEO, GEO, webshops en AI';
const description = 'Praktische artikelen over websites, PHP 8.2, SEO, gevonden worden in ChatGPT, webshops en veilig AI-gebruik. In gewone taal, voor ondernemers.';
export const metadata: Metadata = pageMeta({ title, description, path: '/kennisbank' });
const fmt = new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });

export default function KennisbankPage() {
  const list = getArticles();
  return (
    <Page>
      <JsonLd nodes={[]} page={{ path: '/kennisbank', title, description, type: 'CollectionPage' }} />
      <PageHero eyebrow="// KENNISBANK" title={['Online ondernemen.', 'In gewone taal.']} intro="Praktische uitleg zonder jargon, met dingen die je zelf kunt toepassen." crumbs={[{ name: 'Home', href: '/' }, { name: 'Kennisbank', href: '/kennisbank' }]} ctas={false} />
      <Section border={false}>
        {list.length ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => (
              <Link key={a.slug} href={`/kennisbank/${a.slug}`} data-cursor="LEES" className="panel panel-glow group" data-reveal>
                <article className="panel-in grid h-full content-start gap-4 p-6">
                  <p className="mono-label flex flex-wrap gap-2 text-[10px] text-muted">
                    <time dateTime={new Date(a.data.pubDate).toISOString()}>{fmt.format(new Date(a.data.pubDate))}</time>
                    {a.data.readingTime && <span>· {a.data.readingTime} min</span>}
                    {a.data.draft && <span className="text-todo">· CONCEPT</span>}
                  </p>
                  <h2 className="text-xl font-bold leading-tight">{a.data.title}</h2>
                  <p className="text-sm text-muted">{a.data.description}</p>
                  <span className="mono-label mt-auto inline-flex items-center gap-2 text-[11px] text-accent">Lees <Icon name="arrow" size={14} /></span>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="panel max-w-2xl"><div className="panel-in grid gap-4 p-8">
            <h2 className="text-2xl font-bold">De eerste artikelen komen eraan</h2>
            <p className="text-muted">Over PHP 8.2, websiteprijzen, gevonden worden in ChatGPT en veilig AI-gebruik. Tot die tijd beantwoorden we je vragen graag persoonlijk.</p>
            <div className="flex flex-wrap gap-3"><Link href="/online-check" className="btn btn-primary btn-sm">Gratis Online Check</Link>{' '}<Link href="/contact" className="btn btn-ghost btn-sm">Stel je vraag</Link></div>
          </div></div>
        )}
      </Section>
      <CtaBand />
    </Page>
  );
}
