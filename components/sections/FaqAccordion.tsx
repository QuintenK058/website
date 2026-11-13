'use client';

/** FAQ met <details>: werkt zonder JS. Met JS: vloeiende hoogte-animatie (GSAP). */
import { useRef } from 'react';
import gsap from 'gsap';
import type { QA } from '@/content/services';

export function FaqAccordion({ items }: { items: QA[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const det = (e.currentTarget as HTMLElement).parentElement as HTMLDetailsElement;
    const body = det.querySelector<HTMLElement>('[data-body]')!;
    e.preventDefault();
    if (det.open) {
      gsap.to(body, { height: 0, opacity: 0, duration: 0.35, ease: 'power3.inOut', onComplete: () => { det.open = false; gsap.set(body, { clearProps: 'all' }); } });
    } else {
      det.open = true;
      gsap.fromTo(body, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.5, ease: 'expo.out', clearProps: 'height,opacity' });
    }
  };
  return (
    <div ref={ref} className="divide-y divide-line border-y border-line">
      {items.map((it) => (
        <details key={it.q} className="group" data-reveal>
          <summary onClick={onClick} className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-lg font-semibold tracking-tight hover:text-accent [&::-webkit-details-marker]:hidden">
            <span>{it.q}</span>
            <span aria-hidden="true" className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-300 group-open:rotate-45">
              <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </span>
          </summary>
          <div data-body className="overflow-hidden">
            <div className="pr-12 pb-6 text-muted [&_a]:font-semibold [&_a]:text-accent [&_a]:underline" dangerouslySetInnerHTML={{ __html: it.a.replace(/TODO:?/g, '<span class="text-todo">TODO:</span>') }} />
          </div>
        </details>
      ))}
    </div>
  );
}
