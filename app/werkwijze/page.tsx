import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { PageHero, Section, SectionHead, Faq, CtaBand } from '@/components/sections/Basics';
import { Pipeline } from '@/components/sections/Pipeline';
import { HouseRules } from '@/components/sections/Packages';
import { GovernancePanel } from '@/components/control/GovernancePanel';
import { AgentLog } from '@/components/control/Animated';
import { JsonLd } from '@/components/seo/JsonLd';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { home } from '@/content/home';
import { pageMeta } from '@/lib/seo';

const title = 'Werkwijze: van kennismaking tot groei';
const description = 'Zo werkt QK Commerce Solutions: kennismaking, plan met vaste prijs, bouwen en inrichten, beheren en groeien. 3 maanden minimaal, daarna maandelijks opzegbaar.';
export const metadata: Metadata = pageMeta({ title, description, path: '/werkwijze' });

const faq = [
  { q: 'Hoe snel kunnen we starten?', a: 'TODO: gebruikelijke starttermijn na akkoord.' },
  { q: 'Wat moet ik zelf aanleveren?', a: 'Informatie over je bedrijf en klanten, eventueel foto\'s en je logo, en toegang tot bestaande accounts. Teksten schrijven we op basis van een gesprek.' },
  { q: 'Hoe vaak hebben we contact?', a: 'Dat hangt af van je pakket: maandelijks een rapport, per kwartaal een gesprek, of elke maand een sessie bij Sparring en Groeistrategie. Tussendoor ben ik bereikbaar.' },
  { q: 'Wat als het niet bevalt?', a: 'Na 3 maanden zeg je maandelijks op, en je neemt alles mee. Niet tevreden? Dan krijg je je geld terug. TODO: voorwaarden kort samenvatten.' },
];

export default function WerkwijzePage() {
  const howTo = { '@type': 'HowTo', name: 'Samenwerken met QK Commerce Solutions', step: home.pipeline.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.text })) };
  return (
    <Page>
      <JsonLd nodes={[howTo]} page={{ path: '/werkwijze', title, description }} />
      <PageHero eyebrow="// WERKWIJZE" title={['Duidelijk vanaf', 'het eerste gesprek.']} intro="Vier stappen, zonder verrassingen. Je weet vooraf wat het kost, wat je krijgt en wanneer het klaar is." crumbs={[{ name: 'Home', href: '/' }, { name: 'Werkwijze', href: '/werkwijze' }]} />
      <Pipeline steps={home.pipeline} consoleText={home.pipelineConsole} heading={<SectionHead label="In vier stappen" title={['Zo werken we samen.', 'Stap voor stap.']} className="mb-10!" />} />
      <Section labelledby="r-title">
        <SectionHead label="Spelregels" title={['Afspraken waar je', 'op kunt rekenen.']} id="r-title" />
        <HouseRules />
      </Section>
      <Section>
        <div className="panel mb-8" data-reveal><div className="panel-in"><ImageSlot id="quinten-werk" sizes="100vw" /></div></div>
        <div className="grid gap-4 lg:grid-cols-2">
          <GovernancePanel />
          <AgentLog title="Een week ontzorgd · log" />
        </div>
      </Section>
      <Faq items={faq} path="/werkwijze" />
      <CtaBand />
    </Page>
  );
}
