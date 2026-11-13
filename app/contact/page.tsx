import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { PageHero, Section } from '@/components/sections/Basics';
import { LeadForm } from '@/components/forms/LeadForm';
import { CalendarEmbed } from '@/components/forms/CalendarEmbed';
import { Icon } from '@/components/ui/Icon';
import { Todo } from '@/components/ui/Todo';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/site.config';
import { contact } from '@/lib/contact';
import { filled } from '@/lib/todo';
import { pageMeta } from '@/lib/seo';

const title = 'Contact: plan een kennismaking';
const description = 'Plan een kennismaking met QK Commerce Solutions in Leeuwarden: op locatie in Friesland, telefonisch of via video. Bel, app, mail of vul het formulier in.';
export const metadata: Metadata = pageMeta({ title, description, path: '/contact' });

export default function ContactPage() {
  return (
    <Page>
      <JsonLd nodes={[]} page={{ path: '/contact', title, description, type: 'ContactPage' }} />
      <PageHero eyebrow="// CONTACT" title={['Plan een kennismaking.', 'Ik kom gewoon langs.']} intro="Vertel kort waar je mee bezig bent. Je hoort binnen één werkdag van me. Kennismaken kan op locatie in Friesland en Noord-Nederland, of via video." crumbs={[{ name: 'Home', href: '/' }, { name: 'Contact', href: '/contact' }]} ctas={false}>
        <ul className="flex flex-wrap gap-3">
          {contact.telHref ? <li><a href={contact.telHref} className="btn btn-ghost"><Icon name="phone" size={18} />{contact.phone}</a></li> : <li><Todo text={siteConfig.phoneDisplay} /></li>}
          {contact.whatsappHref && <li><a href={contact.whatsappHref} target="_blank" rel="noopener" className="btn btn-ghost"><Icon name="whatsapp" size={18} />WhatsApp<span className="sr-only"> (opent nieuw tabblad)</span></a></li>}
          {contact.mailHref ? <li><a href={contact.mailHref} className="btn btn-ghost"><Icon name="mail" size={18} />{contact.email}</a></li> : <li><Todo text={siteConfig.email} /></li>}
        </ul>
      </PageHero>
      <Section border={false} labelledby="cf-title">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="panel"><div className="panel-in p-6 md:p-8">
            <h2 id="cf-title" className="mb-6 text-2xl font-bold">Stuur een bericht</h2>
            <LeadForm
              form="contact"
              prefill
              submitLabel="Verstuur bericht"
              successTitle="Bedankt voor je bericht!"
              successText="Je hoort binnen één werkdag van me om een kennismaking te plannen."
              fallback={contact.email ?? contact.phone}
              fields={[
                { name: 'naam', label: 'Naam', required: true, autoComplete: 'name', half: true },
                { name: 'bedrijf', label: 'Bedrijf', autoComplete: 'organization', half: true },
                { name: 'email', label: 'E-mailadres', type: 'email', required: true, autoComplete: 'email', half: true },
                { name: 'telefoon', label: 'Telefoon', type: 'tel', autoComplete: 'tel', half: true },
                { name: 'onderwerp', label: 'Richting', type: 'select', options: ['E-commerce', 'Online marketing', 'Website & development', 'AI', 'Consultancy', 'Pakket', 'Iets anders'] },
                { name: 'website', label: 'Huidige website', type: 'url', autoComplete: 'url', placeholder: 'https://' },
                { name: 'bericht', label: 'Je bericht', type: 'textarea', required: true, placeholder: 'Vertel kort over je bedrijf en waar je hulp bij zoekt.' },
              ]}
            />
          </div></div>
          <div className="grid content-start gap-6">
            <CalendarEmbed />
            <div className="panel"><div className="panel-in p-6">
              <h2 className="mono-label mb-4 text-[11px] text-accent">Gegevens</h2>
              <dl className="grid gap-3 text-sm">
                <div><dt className="font-semibold">Bedrijf</dt><dd className="text-muted">{siteConfig.name}</dd></div>
                <div><dt className="font-semibold">Vestiging</dt><dd className="text-muted">{filled(siteConfig.address.street) ? `${siteConfig.address.street}, ${siteConfig.address.postalCode} ` : ''}{siteConfig.address.city}</dd></div>
                <div><dt className="font-semibold">Werkgebied</dt><dd className="text-muted">Op locatie in Friesland en Noord-Nederland, online daarbuiten</dd></div>
                <div><dt className="font-semibold">Bereikbaar</dt><dd className="text-muted">{siteConfig.openingHours}</dd></div>
                {filled(siteConfig.kvk) ? <div><dt className="font-semibold">KvK</dt><dd className="text-muted">{siteConfig.kvk}</dd></div> : <Todo text={siteConfig.kvk} />}
              </dl>
            </div></div>
          </div>
        </div>
      </Section>
    </Page>
  );
}
