import Link from 'next/link';
import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { PageHero, Section, CtaBand } from '@/components/sections/Basics';
import { ResultsStrip } from '@/components/sections/Results';
import { Icon } from '@/components/ui/Icon';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { JsonLd } from '@/components/seo/JsonLd';
import { readMdRoot } from '@/lib/markdown';
import { siteConfig } from '@/site.config';
import { showTodos } from '@/lib/todo';
import { pageMeta, personLd } from '@/lib/seo';

const title = 'Over ons: Quinten, e-commercespecialist uit Leeuwarden';
const description = 'QK Commerce Solutions is opgericht door Quinten, e-commercespecialist met de nadruk op B2B. Eén aanspreekpunt voor e-commerce, marketing, websites en AI.';
export const metadata: Metadata = pageMeta({ title, description, path: '/over-ons' });

const facts = [
  ['Gevestigd in', 'Leeuwarden'],
  ['Werkgebied', 'Op locatie in Friesland en Noord-Nederland, online daarbuiten'],
  ['Specialisme', 'E-commerce (B2B en B2C), SEO/GEO, ads en AI'],
  ['Platforms', 'Shopify, Magento, WordPress'],
];

export default function OverOnsPage() {
  const md = readMdRoot('over-ons.md');
  return (
    <Page>
      <JsonLd nodes={[personLd()]} page={{ path: '/over-ons', title, description, type: 'AboutPage' }} />
      <PageHero eyebrow="// OVER QK" title={['Eén aanspreekpunt.', 'Ik kom gewoon langs.']} intro={`Ik ben ${siteConfig.founder.name}, e-commercespecialist met de nadruk op B2B, en oprichter van QK Commerce Solutions.`} crumbs={[{ name: 'Home', href: '/' }, { name: 'Over ons', href: '/over-ons' }]} />
      <ResultsStrip />
      <Section border={false}>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.5fr]">
          <div className="grid content-start gap-6 lg:sticky lg:top-24">
            <div className="panel"><div className="panel-in"><ImageSlot id="quinten-portret" sizes="(min-width:1024px) 35vw, 90vw" priority /></div></div>
            <dl className="grid gap-3 text-sm">
              {facts.map(([k, v]) => <div key={k} className="flex justify-between gap-4 border-b border-line pb-3"><dt className="mono-label text-[10px] text-muted">{k}</dt><dd className="text-right">{v}</dd></div>)}
            </dl>
          </div>
          <article className="prose-qk" dangerouslySetInnerHTML={{ __html: md.html }} />
        </div>
        <div className="panel mt-12" data-reveal><div className="panel-in"><ImageSlot id="quinten-werk" sizes="100vw" /></div></div>
        <div className="mt-12"><Link href="/cases" className="btn btn-ghost">Bekijk de cases <Icon name="arrow" size={16} /></Link></div>
      </Section>
      <CtaBand title={['Zullen we kennismaken?', 'Op locatie of via video.']} />
    </Page>
  );
}
