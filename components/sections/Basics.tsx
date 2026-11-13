import Link from 'next/link';
import type { ReactNode } from 'react';
import { SplitHeading, Scramble, Magnetic } from '@/components/motion/primitives';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbLd, faqLd } from '@/lib/seo';
import { showTodos } from '@/lib/todo';
import type { QA } from '@/content/services';
import { FaqAccordion } from './FaqAccordion';
import { PauseMotion } from '@/components/motion/PauseMotion';

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Kruimelpad" className="mono-label text-[11px] text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((it, i) => (
          <li key={it.href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="opacity-40">/</span>}
            {i < items.length - 1 ? <Link href={it.href} className="hover:text-accent">{it.name}</Link> : <span aria-current="page" className="text-ink-2">{it.name}</span>}
          </li>
        ))}
      </ol>
      <JsonLd nodes={[breadcrumbLd(items)]} />
    </nav>
  );
}

export function Corners() {
  return (
    <>
      <span className="crosshair top-4 left-4" aria-hidden="true" />
      <span className="crosshair top-4 right-4" aria-hidden="true" />
    </>
  );
}

/** Paginakop: mono eyebrow, gesplitste H1 (gepaarde kop), intro, CTA's. */
export function PageHero({ eyebrow, title, intro, crumbs, children, ctas = true }: { eyebrow: string; title: [string, string] | string[]; intro?: string; crumbs?: Crumb[]; children?: ReactNode; ctas?: boolean | ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_85%_0%,rgb(77_225_255/0.14),transparent_65%),radial-gradient(ellipse_40%_50%_at_0%_100%,rgb(122_92_255/0.08),transparent_65%)]" />
      <Corners />
      <div className="container-site relative grid gap-6 pt-10 pb-16 md:pt-14 md:pb-24">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className="grid max-w-4xl gap-6 pt-6">
          <Scramble text={eyebrow} className="mono-label text-accent" />
          <SplitHeading as="h1" lines={title} dimFrom={1} onScroll={false} className="text-[2.6rem] leading-[0.95] font-bold sm:text-6xl md:text-7xl" />
          {intro && <p className="max-w-2xl text-lg text-muted md:text-xl">{intro}</p>}
          {children}
          {ctas === true ? (
            <div className="flex flex-wrap gap-3 pt-2">
              <Magnetic><Link href="/online-check" className="btn btn-primary">Gratis Online Check <Icon name="arrow" size={18} /></Link></Magnetic>{' '}
              <Magnetic><Link href="/pakketten" className="btn btn-ghost">Bekijk pakketten</Link></Magnetic>
            </div>
          ) : ctas || null}
        </div>
      </div>
    </section>
  );
}

export function SectionHead({ index, label, title, intro, id, className = '' }: { index?: string; label: string; title: string[]; intro?: string; id?: string; className?: string }) {
  return (
    <div className={`mb-12 grid max-w-3xl gap-4 md:mb-16 ${className}`}>
      <span className="mono-label text-accent">{index ? `[${index}] ` : ''}{label}</span>
      <SplitHeading lines={title} dimFrom={1} id={id} className="text-4xl leading-[0.98] font-bold md:text-6xl" />
      {intro && <p data-reveal className="max-w-2xl text-lg text-muted">{intro}</p>}
    </div>
  );
}

export function Section({ children, className = '', id, labelledby, border = true }: { children: ReactNode; className?: string; id?: string; labelledby?: string; border?: boolean }) {
  return (
    <section id={id} aria-labelledby={labelledby} className={`relative py-20 md:py-32 ${border ? 'border-t border-line' : ''} ${className}`}>
      <div className="container-site">{children}</div>
    </section>
  );
}

export function Faq({ items, path, title = ['Eerlijke antwoorden.', 'Zonder kleine lettertjes.'], index }: { items: QA[]; path: string; title?: string[]; index?: string }) {
  const list = items.filter((i) => showTodos || !/TODO/.test(i.q + i.a));
  if (!list.length) return null;
  return (
    <Section id="faq" labelledby="faq-title">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <SectionHead index={index} label="FAQ" title={title} id="faq-title" className="mb-6!" />
          <p className="text-sm text-muted">Staat je vraag er niet bij? <Link href="/contact" className="font-semibold text-accent underline underline-offset-4">Stel hem gerust</Link>.</p>
        </div>
        <FaqAccordion items={list} />
      </div>
      <JsonLd nodes={[faqLd(items, path)]} />
    </Section>
  );
}

export function CtaBand({ title = ['Hoe staat jouw site ervoor?', 'Gratis gecheckt in 2 werkdagen.'], text = 'Snelheid, beveiliging, PHP-status, Bedrijfsprofiel en AI-zichtbaarheid, met 3 concrete verbeterpunten. Gratis en zonder verplichtingen.' }: { title?: string[]; text?: string }) {
  return (
    <section className="py-20 md:py-28" aria-labelledby="cta-title">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-surface px-6 py-14 md:px-16 md:py-20">
          <div aria-hidden="true" className="motion-loop absolute -inset-[40%] animate-[spin_18s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,rgb(77_225_255/0.28),transparent_30%,rgb(122_92_255/0.2),transparent_60%)] blur-3xl" />
          <div className="relative grid gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3"><span className="mono-label text-accent">// Gratis Online Check</span><PauseMotion /></div>
            <SplitHeading lines={title} dimFrom={1} id="cta-title" className="max-w-4xl text-4xl leading-[0.95] font-bold md:text-7xl" />
            <p className="max-w-2xl text-lg text-muted">{text}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Magnetic><Link href="/online-check" className="btn btn-primary">Start de Online Check <Icon name="arrow" size={18} /></Link></Magnetic>{' '}
              <Magnetic><Link href="/contact" className="btn btn-ghost">Plan een kennismaking</Link></Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Bronvermelding bij een marktcijfer. */
export function Source({ source, url }: { source: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener" className="mono-label inline-flex items-center gap-1 text-[10px] text-muted underline decoration-line-2 underline-offset-4 hover:text-accent">
      Bron: {source}<span className="sr-only"> (opent nieuw tabblad)</span>
    </a>
  );
}
