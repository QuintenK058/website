import Link from 'next/link';
import { CountUp } from '@/components/motion/primitives';
import { cases, caseHref } from '@/content/cases';
import { Icon } from '@/components/ui/Icon';

/** Social proof: echte resultaten uit goedgekeurde cases. */
export function ResultsStrip() {
  const items = cases.filter((c) => c.approved && c.metrics?.length);
  if (!items.length) return null;
  return (
    <section aria-labelledby="results-title" className="border-b border-line bg-bg-2">
      <h2 id="results-title" className="sr-only">Resultaten van klanten</h2>
      <div className="container-site grid gap-px overflow-hidden py-0 md:grid-cols-2">
        {items.map((c) => (
          <Link key={c.slug} href={caseHref(c.slug)} data-cursor="OPEN CASE" className="group grid gap-6 py-10 md:px-8 md:first:pl-0 md:last:border-l md:last:border-line">
            <div className="flex items-center justify-between gap-3">
              <span className="mono-label text-[11px] text-accent">Case · {c.client}</span>{' '}
              <span className="mono-label inline-flex items-center gap-1 text-[11px] text-muted group-hover:text-ink">Bekijk <Icon name="arrow" size={14} /></span>
            </div>
            <dl className="grid grid-cols-3 gap-4">
              {c.metrics!.map((m) => (
                <div key={m.label} data-reveal>
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} className="block text-4xl font-bold tracking-[-0.04em] text-ink md:text-5xl" />{' '}
                    <span className="mt-1 block text-sm leading-snug text-muted">{m.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            {c.contextNote && <p className="mono-label text-[10px] text-muted">{c.contextNote}</p>}
          </Link>
        ))}
      </div>
    </section>
  );
}
