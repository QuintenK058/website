'use client';

/** Agenda-embed (Cal.com/Calendly): laadt pas na klik. Zonder JS of zonder URL: link/terugval. */
import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { contact } from '@/lib/contact';
import { siteConfig } from '@/site.config';
import { Todo } from '@/components/ui/Todo';

export function CalendarEmbed() {
  const [open, setOpen] = useState(false);
  const url = contact.calendarUrl;
  return (
    <div className="panel"><div className="panel-in grid gap-4 p-6">
      <span className="mono-label inline-flex items-center gap-2 text-[11px] text-accent"><Icon name="calendar" size={16} />Direct inplannen</span>
      <h2 className="text-2xl font-bold">Plan zelf een moment</h2>
      <p className="text-muted">30 minuten, telefonisch of via video. Vrijblijvend.</p>
      {url ? (
        open ? (
          <iframe src={url} title="Agenda: plan een kennismaking" className="h-[640px] w-full rounded-xl border border-line bg-white" loading="lazy" />
        ) : (
          <>
            <a href={url} target="_blank" rel="noopener" onClick={(e) => { e.preventDefault(); setOpen(true); }} className="btn btn-primary w-fit">Agenda openen <Icon name="arrow" size={16} /></a>
            <p className="text-xs text-muted">De agenda wordt geladen via een externe dienst, die eigen cookies kan plaatsen.</p>
          </>
        )
      ) : (
        <>
          <Todo block text={siteConfig.calendarUrl} />
          <a href="#cf-title" className="btn btn-ghost w-fit">Gebruik het formulier</a>
        </>
      )}
    </div></div>
  );
}
