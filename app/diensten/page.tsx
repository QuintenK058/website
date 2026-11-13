import Link from 'next/link';
import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { PageHero, Section, CtaBand } from '@/components/sections/Basics';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/seo/JsonLd';
import { lines, lineHref, subHref } from '@/content/services';
import { lineFromPrice, lineInBundles } from '@/lib/services-view';
import { pageMeta } from '@/lib/seo';

const title = 'Diensten: websites, webshops, onderhoud, vindbaarheid, ads en AI';
const description = 'Zeven diensten van QK Commerce Solutions: websites, webshops & e-commerce, onderhoud & development, vindbaarheid (SEO en GEO), advertenties & e-mail, AI en consultancy. Met vanaf-prijzen.';
export const metadata: Metadata = pageMeta({ title, description, path: '/diensten' });

export default function DienstenPage() {
  return (
    <Page>
      <JsonLd nodes={[]} page={{ path: '/diensten', title, description, type: 'CollectionPage' }} />
      <PageHero eyebrow="// DIENSTEN" title={['Zes diensten.', 'Eén aanspreekpunt.']} intro="Alles rondom internet, van website tot AI. Met vanaf-prijzen, zodat je weet waar je aan toe bent." crumbs={[{ name: 'Home', href: '/' }, { name: 'Diensten', href: '/diensten' }]} />
      <Section border={false}>
        <div className="panel mb-12" data-reveal>
          <div className="panel-in grid gap-4 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <p className="text-lg text-ink-2"><strong className="text-ink">Diensten</strong> zijn wat we doen. <strong className="text-ink">Pakketten</strong> zijn hoe je het afneemt. De meeste klanten kiezen een groeipakket; losse diensten kunnen ook.</p>
            <Link href="/pakketten" className="btn btn-primary">Bekijk de pakketten <Icon name="arrow" size={16} /></Link>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {lines.map((l, i) => (
            <article key={l.id} className={`panel panel-glow ${i === lines.length - 1 && lines.length % 2 ? 'md:col-span-2' : ''}`} data-reveal>
              <div className="panel-in grid h-full content-start gap-4 p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="mono-label text-[11px] text-accent">[{l.index}]</span>
                  <Icon name={l.icon} size={26} className="text-accent" />
                </div>
                <h2 className="text-2xl font-bold md:text-3xl"><Link href={lineHref(l.id)} className="hover:text-accent">{l.name}</Link></h2>
                <p className="text-muted">{l.short}</p>
                {l.subpages.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {l.subpages.map((s) => <li key={s.slug}><Link href={subHref(l.id, s.slug)} className="inline-block rounded-full border border-line px-3 py-1.5 text-sm text-ink-2 hover:border-accent hover:text-accent">{s.name}</Link></li>)}
                  </ul>
                )}
                <dl className="mt-auto grid gap-1 border-t border-line pt-4 text-sm">
                  <div className="flex flex-wrap gap-x-2"><dt className="sr-only">Prijs</dt><dd className="text-lg font-semibold">{lineFromPrice(l)}</dd><dd className="text-muted">excl. btw</dd></div>
                  <div><dt className="sr-only">Pakketten</dt><dd className="mono-label text-[10px] text-muted">{lineInBundles(l)}</dd></div>
                </dl>
                <Link href={lineHref(l.id)} className="mono-label inline-flex items-center gap-2 text-[11px] text-accent">Meer over {l.name.toLowerCase()} <Icon name="arrow" size={14} /></Link>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand />
    </Page>
  );
}
