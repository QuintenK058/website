import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
import { showTodos } from '@/lib/todo';
import { caseHref, type Case } from '@/content/cases';
import { DisplacementHover } from '@/components/gl/DisplacementHover';

const contextLabel = (c: Case) => (c.context === 'concept' ? 'Concept / redesign' : c.context === 'in-dienst' ? 'In dienst' : null);

export function CaseCard({ c, headingLevel = 'h3' }: { c: Case; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  return (
    <article className="panel panel-glow group" data-reveal>
      <Link href={caseHref(c.slug)} data-cursor="OPEN CASE" className="panel-in flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-bg-2">
          {c.screenshots.desktop ? (
            <DisplacementHover src={c.screenshots.desktop} alt={c.screenshots.alt ?? `Website van ${c.client}`}>
              <Image src={c.screenshots.desktop} alt={c.screenshots.alt ?? `Website van ${c.client}`} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover object-top" />
            </DisplacementHover>
          ) : (
            <div className="flex size-full items-center justify-center bg-[repeating-linear-gradient(135deg,#0d0f12_0_14px,#121418_14px_28px)] p-6">
              <span className="text-2xl font-bold tracking-tight text-ink-2">{c.client}</span>
              {showTodos && <span className="absolute bottom-3 left-3 rounded-md border border-dashed border-todo bg-todo-bg px-2 py-1 text-xs text-todo">TODO: screenshot desktop + mobiel</span>}
            </div>
          )}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {contextLabel(c) && <span className="mono-label rounded-full border border-warn/50 bg-bg/90 px-2.5 py-1 text-[10px] text-warn">{contextLabel(c)}</span>}
            {!c.approved && showTodos && <span className="mono-label rounded-full bg-danger px-2.5 py-1 text-[10px] text-bg">Niet goedgekeurd</span>}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6">
          <ul className="flex flex-wrap gap-1.5" aria-label="Diensten">
            {c.tags.map((t) => <li key={t} className="mono-label rounded-full border border-accent/35 px-2 py-0.5 text-[10px] text-accent">{t}</li>)}
          </ul>
          <H className="text-2xl font-bold">{c.client}</H>
          {c.highlight ? <p className="text-lg font-semibold text-ink">{c.highlight}</p> : null}
          <p className="text-sm text-muted">{c.description}</p>
          <span className="mono-label mt-auto inline-flex items-center gap-2 pt-2 text-[11px] text-accent">Open case <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-1" /></span>
        </div>
      </Link>
    </article>
  );
}
