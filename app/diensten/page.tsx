import Link from 'next/link';
import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { PageHero, Section, CtaBand } from '@/components/sections/Basics';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/seo/JsonLd';
import { directions } from '@/content/directions';
import { line, lineHref, subHref } from '@/content/services';
import { lineFrom } from '@/content/pricing';
import { pageMeta } from '@/lib/seo';

const title = 'Diensten: e-commerce, marketing, websites, AI en consultancy';
const description = 'Alle diensten van QK Commerce Solutions, per richting: e-commerce (Shopify en Magento), online marketing (SEO, GEO, ads, e-mail), websites en development, AI en consultancy.';
export const metadata: Metadata = pageMeta({ title, description, path: '/diensten' });

export default function DienstenPage() {
  return (
    <Page>
      <JsonLd nodes={[]} page={{ path: '/diensten', title, description, type: 'CollectionPage' }} />
      <PageHero eyebrow="// DIENSTEN" title={['Alles rondom internet.', 'Per richting geordend.']} intro="Kies de richting die bij je vraag past. Daarbinnen vind je de diensten, met prijzen en wat we precies doen." crumbs={[{ name: 'Home', href: '/' }, { name: 'Diensten', href: '/diensten' }]} />
      {directions.map((d) => (
        <Section key={d.id} id={d.id} labelledby={`d-${d.id}`}>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <span className="mono-label text-[11px] text-accent">[{d.index}] {d.mono}</span>
              <h2 id={`d-${d.id}`} className="mt-3 text-4xl leading-[0.98] font-bold md:text-5xl">{d.headline[0]} <span className="dim">{d.headline[1]}</span></h2>
              <p className="mt-4 text-muted">{d.pitch}</p>
              <Link href={`/pakketten#${d.id}`} className="btn btn-primary btn-sm mt-6">Pakketten {d.name} <Icon name="arrow" size={16} /></Link>
            </div>
            <div className="grid gap-4">
              {d.lines.map((id) => {
                const l = line(id)!;
                return (
                  <article key={id} className="panel panel-glow" data-reveal>
                    <div className="panel-in grid gap-4 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3"><Icon name={l.icon} size={26} className="text-accent" /><h3 className="text-2xl font-bold"><Link href={lineHref(id)} className="hover:text-accent">{l.name}</Link></h3></div>
                        <span className="font-mono text-xs text-muted">{lineFrom(id)}</span>
                      </div>
                      <p className="text-muted">{l.short}</p>
                      {l.subpages.length > 0 && (
                        <ul className="flex flex-wrap gap-2">
                          {l.subpages.map((s) => <li key={s.slug}><Link href={subHref(id, s.slug)} className="inline-block rounded-full border border-line px-3 py-1.5 text-sm text-ink-2 hover:border-accent hover:text-accent">{s.name}</Link></li>)}
                        </ul>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </Section>
      ))}
      <CtaBand />
    </Page>
  );
}
