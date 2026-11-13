import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { PageHero, Section, CtaBand } from '@/components/sections/Basics';
import { CaseCard } from '@/components/sections/CaseCard';
import { ResultsStrip } from '@/components/sections/Results';
import { JsonLd } from '@/components/seo/JsonLd';
import { visibleCases } from '@/content/cases';
import { pageMeta } from '@/lib/seo';

const title = 'Cases: +75% omzet, #1 in Google en meer';
const description = 'Cases van QK Commerce Solutions: een B2B/B2C-webshop met +75% omzet in 11 maanden, en bruidsstyling van onzichtbaar naar #1 in de niche zonder advertenties.';
export const metadata: Metadata = pageMeta({ title, description, path: '/cases' });

export default function CasesPage() {
  const list = visibleCases();
  return (
    <Page>
      <JsonLd nodes={[]} page={{ path: '/cases', title, description, type: 'CollectionPage' }} />
      <PageHero eyebrow="// CASES" title={['Echte klanten.', 'Echte resultaten.']} intro="Wat we bouwden, beheren en lieten groeien. Eerlijk over onze rol: bij werk dat ik in dienst deed, staat dat erbij." crumbs={[{ name: 'Home', href: '/' }, { name: 'Cases', href: '/cases' }]} />
      <ResultsStrip />
      <Section border={false}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => <CaseCard key={c.slug} c={c} headingLevel="h2" />)}
        </div>
      </Section>
      <CtaBand title={['Jouw bedrijf hier?', 'Begin met de gratis check.']} />
    </Page>
  );
}
