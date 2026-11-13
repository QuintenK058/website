import Link from 'next/link';
import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { PageHero, Section, CtaBand } from '@/components/sections/Basics';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/seo/JsonLd';
import { getRegions } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

const title = 'Werkgebied: Leeuwarden, Friesland en Noord-Nederland';
const description = 'QK Commerce Solutions werkt vanuit Leeuwarden op locatie in Friesland en Noord-Nederland, en online in heel Nederland.';
export const metadata: Metadata = pageMeta({ title, description, path: '/regio' });

export default function RegioIndex() {
  const regions = getRegions();
  return (
    <Page>
      <JsonLd nodes={[]} page={{ path: '/regio', title, description, type: 'CollectionPage' }} />
      <PageHero eyebrow="// WERKGEBIED" title={['Vanuit Leeuwarden.', 'Voor heel het noorden.']} intro="Op locatie in Friesland en Noord-Nederland. Daarbuiten werken we online, net zo makkelijk." crumbs={[{ name: 'Home', href: '/' }, { name: 'Regio', href: '/regio' }]} />
      <Section border={false}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((r) => (
            <Link key={r.slug} href={`/regio/${r.slug}`} className="panel panel-glow group" data-reveal>
              <div className="panel-in grid h-full content-start gap-3 p-6">
                <Icon name="pin" className="text-accent" />
                <h2 className="text-2xl font-bold">{r.data.place}</h2>
                <p className="text-sm text-muted">{r.data.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand />
    </Page>
  );
}
