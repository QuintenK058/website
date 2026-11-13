import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { PageHero, Section, Faq } from '@/components/sections/Basics';
import { LeadForm } from '@/components/forms/LeadForm';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/seo/JsonLd';
import { contact } from '@/lib/contact';
import { pageMeta } from '@/lib/seo';

const title = 'Gratis Online Check: 3 verbeterpunten binnen 2 werkdagen';
const description = 'Gratis check van je website (snelheid, beveiliging, PHP/plugins), Google Bedrijfsprofiel en AI-zichtbaarheid. Binnen 2 werkdagen 3 concrete verbeterpunten.';
export const metadata: Metadata = pageMeta({ title, description, path: '/online-check' });

const checks = [
  { icon: 'web', t: 'Website', d: 'Snelheid, Core Web Vitals en mobiel.' },
  { icon: 'shield', t: 'Beveiliging', d: 'SSL, PHP-versie en plugin-status.' },
  { icon: 'search', t: 'Bedrijfsprofiel', d: 'Compleet, actueel en goed gevonden?' },
  { icon: 'ai', t: 'AI-zichtbaarheid', d: 'Mini-GEO-scan in ChatGPT, Gemini, Perplexity en Claude.' },
];
const faq = [
  { q: 'Is de Online Check echt gratis?', a: 'Ja. Je krijgt 3 concrete verbeterpunten, zonder kosten en zonder verplichtingen.' },
  { q: 'Hoe snel krijg ik antwoord?', a: 'Binnen 2 werkdagen, per e-mail.' },
  { q: 'Wat heb je van mij nodig?', a: 'Alleen je website-adres en een paar woorden over waar je tegenaan loopt. Geen inloggegevens.' },
  { q: 'Werkt het ook voor webshops?', a: 'Ja. Bij een webshop kijken we ook naar productpagina\'s, checkout en tracking.' },
];

export default function OnlineCheckPage() {
  return (
    <Page>
      <JsonLd nodes={[]} page={{ path: '/online-check', title, description }} />
      <PageHero eyebrow="// GRATIS ONLINE CHECK" title={['Hoe staat jouw site ervoor?', 'Binnen 2 werkdagen weet je het.']} intro="Vul je website in. Wij checken je site, je Bedrijfsprofiel en je AI-zichtbaarheid, en sturen je 3 concrete verbeterpunten. Gratis." crumbs={[{ name: 'Home', href: '/' }, { name: 'Online Check', href: '/online-check' }]} ctas={false}>
        <ul className="grid gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-4">
          {checks.map((c) => (
            <li key={c.t} className="flex gap-3 rounded-[var(--radius-panel)] border border-line bg-surface/70 p-4">
              <Icon name={c.icon} className="shrink-0 text-accent" />
              <span><span className="block font-semibold">{c.t}</span> <span className="block text-sm text-muted">{c.d}</span></span>
            </li>
          ))}
        </ul>
      </PageHero>
      <Section border={false} labelledby="form-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div className="grid content-start gap-6">
            <h2 id="form-title" className="text-3xl font-bold">Vraag de check aan</h2>
            <ol className="grid gap-4">
              {['Je vult het formulier in (1 minuut)', 'Wij scannen site, profiel en AI-zichtbaarheid', 'Binnen 2 werkdagen 3 verbeterpunten in je mail'].map((s, i) => (
                <li key={s} className="flex items-center gap-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-bold text-accent-ink">{i + 1}</span> {s}</li>
              ))}
            </ol>
            <p className="text-sm text-muted">PHP 8.2 krijgt na 31 december 2026 geen beveiligingsupdates meer. In de check zie je meteen of dat voor jou speelt.</p>
          </div>
          <div className="panel"><div className="panel-in p-6 md:p-8">
            <LeadForm
              form="online-check"
              scan
              submitLabel="Start de gratis check"
              successTitle="Bedankt, je check is aangevraagd!"
              successText="Binnen 2 werkdagen ontvang je 3 concrete verbeterpunten in je mailbox."
              fallback={contact.email ?? contact.phone}
              fields={[
                { name: 'naam', label: 'Naam', required: true, autoComplete: 'name', half: true },
                { name: 'bedrijf', label: 'Bedrijf', required: true, autoComplete: 'organization', half: true },
                { name: 'website', label: 'Website-adres', type: 'url', required: true, autoComplete: 'url', placeholder: 'https://jouwbedrijf.nl' },
                { name: 'email', label: 'E-mailadres', type: 'email', required: true, autoComplete: 'email', half: true },
                { name: 'telefoon', label: 'Telefoon', type: 'tel', autoComplete: 'tel', half: true },
                { name: 'vraag', label: 'Waar loop je tegenaan?', type: 'textarea', required: true, placeholder: 'Bijvoorbeeld: weinig aanvragen via de site, of we staan niet in Google Maps.' },
              ]}
            />
          </div></div>
        </div>
      </Section>
      <Faq items={faq} path="/online-check" title={['Vragen over de check.', 'Kort beantwoord.']} />
    </Page>
  );
}
