'use client';

/** Case-film: screenshot schuift in een device-frame, features verschijnen één voor één (scroll-gestuurd). */
import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Icon } from '@/components/ui/Icon';
import { mq } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CaseFilm({ client, desktop, alt, features, showTodo }: { client: string; desktop?: string; alt?: string; features: string[]; showTodo: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.wide, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=130%', pin: true, scrub: 0.6 } });
        tl.from('[data-device]', { yPercent: 30, rotateX: 18, scale: 0.9, ease: 'none' })
          .from('[data-shot]', { yPercent: 12, ease: 'none' }, 0)
          .from('[data-feature]', { opacity: 0, x: 30, stagger: 0.15, ease: 'none' }, 0.1);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className="flex min-h-svh items-center border-t border-line py-16">
      <div className="container-site grid items-center gap-12 min-[900px]:grid-cols-[1.4fr_1fr]">
        <div style={{ perspective: '1400px' }}>
          <div data-device className="panel">
            <div className="panel-in">
              <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
                <i className="size-2.5 rounded-full bg-line-2" /><i className="size-2.5 rounded-full bg-line-2" /><i className="size-2.5 rounded-full bg-line-2" />
                <span className="mono-label ml-3 truncate rounded-md bg-surface-2 px-3 py-1 text-[10px] text-muted">{client.toLowerCase().replace(/\s+/g, '')}</span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden bg-bg-2">
                {desktop ? (
                  <div data-shot className="absolute inset-0"><Image src={desktop} alt={alt ?? `Website van ${client}`} fill sizes="(min-width:900px) 60vw, 100vw" className="object-cover object-top" /></div>
                ) : (
                  <div data-shot className="flex size-full flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(135deg,#0d0f12_0_14px,#121418_14px_28px)]">
                    <span className="text-3xl font-bold tracking-tight text-ink-2">{client}</span>
                    <span className="mono-label text-[10px] text-muted">Screenshot volgt</span>
                    {showTodo && <span className="rounded-md border border-dashed border-todo bg-todo-bg px-2 py-1 text-xs text-todo">TODO: screenshot desktop + mobiel</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mono-label mb-5 text-accent">Wat we opleverden</h2>
          <ul className="grid gap-3">
            {features.map((f) => (
              <li key={f} data-feature className="flex gap-3 rounded-[var(--radius-panel)] border border-line bg-surface px-4 py-3"><Icon name="check" className="shrink-0 text-accent" />{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
