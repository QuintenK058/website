import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { PageHero, Section, CtaBand } from '@/components/sections/Basics';
import { CaseFilm } from '@/components/sections/CaseFilm';
import { CaseCard } from '@/components/sections/CaseCard';
import { CountUp } from '@/components/motion/primitives';
import { Icon } from '@/components/ui/Icon';
import { TodoText } from '@/components/ui/Todo';
import { JsonLd } from '@/components/seo/JsonLd';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { slotFile } from '@/lib/images';
import { slots } from '@/content/images';
import { visibleCases, caseHref } from '@/content/cases';
import { serviceRef } from '@/lib/content';
import { isTodo, showTodos, stripTodo } from '@/lib/todo';
import { pageMeta, abs, ORG_ID } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return visibleCases().map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const c = visibleCases().find((x) => x.slug === slug);
  if (!c) return {};
  return pageMeta({ title: `Case ${c.client}: ${c.title}`, description: c.description, path: caseHref(c.slug), noindex: !c.approved });
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const c = visibleCases().find((x) => x.slug === slug);
  if (!c) notFound();
  const path = caseHref(c.slug);
  const svc = serviceRef(c.relatedService.sub ? `${c.relatedService.line}/${c.relatedService.sub}` : c.relatedService.line);
  const showLink = c.urlLive && !isTodo(c.url);
  const quoteReal = !isTodo(c.quote.text);
  const features = c.deliverables.filter((d) => showTodos || !isTodo(d)).map((d) => (showTodos ? d : stripTodo(d)));
  const others = visibleCases().filter((x) => x.slug !== c.slug).slice(0, 2);
  const ld = {
    '@type': 'CreativeWork',
    '@id': `${abs(path)}#case`,
    name: `${c.client}: ${c.title}`,
    description: c.description,
    url: abs(path),
    creator: { '@id': ORG_ID },
    about: { '@type': 'Organization', name: c.client, ...(showLink ? { url: c.url } : {}) },
    inLanguage: 'nl-NL',
  };
  return (
    <Page>
      <JsonLd nodes={[ld]} page={{ path, title: `Case ${c.client}`, description: c.description }} />
      <PageHero eyebrow={`// CASE · ${c.client.toUpperCase()}`} title={[c.title]} intro={c.description} crumbs={[{ name: 'Home', href: '/' }, { name: 'Cases', href: '/cases' }, { name: c.client, href: path }]} ctas={false}>
        <div className="flex flex-wrap gap-2">
          {c.context !== 'agency' && <span className="mono-label rounded-full border border-warn/50 px-3 py-1 text-[10px] text-warn">{c.context === 'concept' ? 'Concept / redesign' : 'In dienst'}</span>}{' '}
          {c.tags.map((t) => <span key={t} className="mono-label rounded-full border border-accent/35 px-3 py-1 text-[10px] text-accent">{t} </span>)}
          {!c.approved && showTodos && <span className="mono-label rounded-full bg-danger px-3 py-1 text-[10px] text-bg">Niet goedgekeurd</span>}
        </div>
        {c.contextNote && <p className="flex max-w-2xl gap-3 border-l-2 border-warn pl-4 text-ink-2">{c.contextNote}</p>}
      </PageHero>

      {c.metrics && (
        <section className="border-b border-line bg-bg-2" aria-label="Resultaten">
          <dl className="container-site grid grid-cols-3 gap-6 py-12">
            {c.metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd><CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} className="block text-5xl font-bold tracking-[-0.05em] md:text-7xl" />{' '}<span className="mt-1 block text-sm text-muted">{m.label}</span></dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {slots.some((x) => x.id === `case-${c.slug}-hero`) && (
        <div className="container-site -mt-6 mb-6"><div className="panel"><div className="panel-in"><ImageSlot id={`case-${c.slug}-hero`} sizes="100vw" /></div></div></div>
      )}
      <CaseFilm
        client={c.client}
        desktop={slotFile(`case-${c.slug}-desktop`) ? { url: slotFile(`case-${c.slug}-desktop`)!.url, alt: slotFile(`case-${c.slug}-desktop`)!.alt } : undefined}
        mobile={slotFile(`case-${c.slug}-mobile`) ? { url: slotFile(`case-${c.slug}-mobile`)!.url, alt: slotFile(`case-${c.slug}-mobile`)!.alt } : undefined}
        placeholderDesktop={<ImageSlot id={`case-${c.slug}-desktop`} className="absolute inset-0 aspect-auto! size-full" />}
        placeholderMobile={<ImageSlot id={`case-${c.slug}-mobile`} className="absolute inset-0 aspect-auto! size-full" />}
        features={features}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="grid content-start gap-12">
            <div className="grid gap-3" data-reveal><h2 className="text-3xl font-bold">De uitdaging</h2><TodoText text={c.challenge} className="text-lg text-ink-2" /></div>
            <div className="grid gap-3" data-reveal><h2 className="text-3xl font-bold">De aanpak</h2><TodoText text={c.approach} className="text-lg text-ink-2" />{c.style && <p className="text-muted"><strong className="text-ink">Stijl:</strong> {c.style}</p>}</div>
            {(stripTodo(c.result) || showTodos) && <div className="grid gap-3" data-reveal><h2 className="text-3xl font-bold">Resultaat</h2><TodoText text={c.result} className="text-lg text-ink-2" /></div>}
            {(quoteReal || showTodos) && (
              <figure className="panel" data-reveal><div className="panel-in p-6 md:p-8">
                <Icon name="quote" size={30} className="text-accent" />
                <blockquote className="mt-4 text-2xl font-semibold tracking-tight"><TodoText text={c.quote.text} as="span" /></blockquote>
                <figcaption className="mt-4 text-sm text-muted"><TodoText text={c.quote.name} as="span" /></figcaption>
              </div></figure>
            )}
          </div>
          <aside className="grid content-start gap-4 lg:sticky lg:top-24" aria-label="Kerngegevens">
            <div className="panel"><div className="panel-in p-6">
              <dl className="grid gap-4 text-sm">
                <div><dt className="mono-label text-[10px] text-muted">Klant</dt><dd className="mt-1 font-semibold">{c.client}</dd></div>
                <div><dt className="mono-label text-[10px] text-muted">Branche</dt><dd className="mt-1">{c.branch}</dd></div>
                <div><dt className="mono-label text-[10px] text-muted">Regio</dt><dd className="mt-1">{c.region}</dd></div>
                <div><dt className="mono-label text-[10px] text-muted">Rol</dt><dd className="mt-1"><ul className="grid gap-1">{c.role.map((r) => <li key={r}>• {r}</li>)}</ul></dd></div>
                {showLink ? (
                  <div><dt className="mono-label text-[10px] text-muted">Website</dt><dd className="mt-1"><a href={c.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold text-accent underline underline-offset-4">{c.url.replace(/^https?:\/\//, '')}<Icon name="arrow-up-right" size={14} /><span className="sr-only"> (opent nieuw tabblad)</span></a></dd></div>
                ) : showTodos ? (
                  <div><dt className="mono-label text-[10px] text-muted">Website</dt><dd className="mt-1"><TodoText text={isTodo(c.url) ? c.url : 'TODO: link uit tot akkoord klant'} as="span" /></dd></div>
                ) : null}
              </dl>
            </div></div>
            {svc && (
              <div className="panel"><div className="panel-in grid gap-3 p-6">
                <p className="text-lg font-bold">Ook zoiets voor jouw bedrijf?</p>
                <Link href={svc.href} className="btn btn-primary btn-sm">{svc.label} <Icon name="arrow" size={16} /></Link>{' '}
                <Link href="/online-check" className="btn btn-ghost btn-sm">Gratis Online Check</Link>
              </div></div>
            )}
          </aside>
        </div>
      </Section>

      {others.length > 0 && (
        <Section labelledby="more">
          <h2 id="more" className="mb-8 text-3xl font-bold">Meer cases</h2>
          <div className="grid gap-4 md:grid-cols-2">{others.map((o) => <CaseCard key={o.slug} c={o} />)}</div>
        </Section>
      )}
      <CtaBand />
    </Page>
  );
}
