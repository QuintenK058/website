import Link from 'next/link';
import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { PageHero, Section, CtaBand } from '@/components/sections/Basics';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/seo/JsonLd';
import { branches, branchHref } from '@/content/branches';
import { pageMeta } from '@/lib/seo';

const title = 'Branches: online marketing en e-commerce per sector';
const description = 'Aanpak per branche: zakelijke dienstverlening, bouw en installatie, zorg, horeca, kappers en salons, en webshops. Voor mkb zonder eigen marketingafdeling.';
export const metadata: Metadata = pageMeta({ title, description, path: '/branches' });

export default function BranchesPage() {
  return (
    <Page>
      <JsonLd nodes={[]} page={{ path: '/branches', title, description, type: 'CollectionPage' }} />
      <PageHero eyebrow="// BRANCHES" title={['Een aanpak die past', 'bij jouw vak.']} intro="Een installateur heeft andere klanten dan een accountant of een webshop. We beginnen altijd bij jouw branche." crumbs={[{ name: 'Home', href: '/' }, { name: 'Branches', href: '/branches' }]} />
      <Section border={false}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {branches.map((b) => (
            <Link key={b.slug} href={branchHref(b.slug)} data-cursor="BEKIJK" className="panel panel-glow group" data-reveal>
              <div className="panel-in grid h-full content-start gap-4 p-7">
                <h2 className="text-2xl font-bold">{b.name}</h2>
                <p className="text-muted">{b.headline[0]} {b.headline[1]}</p>
                <p className="text-sm text-ink-2">{b.examples.join(' · ')}</p>
                <span className="mono-label mt-auto inline-flex items-center gap-2 text-[11px] text-accent">Bekijk aanpak <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand />
    </Page>
  );
}
