'use client';

/** Stappen met een lijn die zich tekent bij scroll (DrawSVG), in de bestaande motion-stijl. Horizontaal op desktop, verticaal op mobiel. */
import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { mq } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function StepLine({ steps }: { steps: { label: string; title: string; body: ReactNode }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motion, () => {
        gsap.fromTo(ref.current!.parentElement!.querySelectorAll('[data-line]'), { drawSVG: '0%' }, { drawSVG: '100%', ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'bottom 60%', scrub: true } });
        gsap.from(ref.current!.querySelectorAll('[data-node]'), { scale: 0, duration: 0.6, ease: 'expo.out', stagger: 0.15, scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  const n = steps.length;
  return (
    <div className="relative">
      {/* verticale lijn (mobiel) */}
      <svg aria-hidden="true" className="absolute top-2 left-[11px] h-[calc(100%-1rem)] w-1 overflow-visible lg:hidden" viewBox="0 0 4 100" preserveAspectRatio="none">
        <line x1="2" y1="0" x2="2" y2="100" stroke="var(--color-line)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <line data-line x1="2" y1="0" x2="2" y2="100" stroke="var(--color-accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      {/* horizontale lijn (desktop) */}
      <svg aria-hidden="true" className="absolute top-[11px] left-0 hidden h-1 w-full overflow-visible lg:block" viewBox="0 0 100 4" preserveAspectRatio="none">
        <line x1="0" y1="2" x2="100" y2="2" stroke="var(--color-line)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <line data-line x1="0" y1="2" x2="100" y2="2" stroke="var(--color-accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ filter: 'drop-shadow(0 0 6px var(--color-accent))' }} />
      </svg>
      <ol ref={ref} className="relative grid gap-8 pl-10 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))] lg:gap-6 lg:pl-0" style={{ ['--n' as string]: n }}>
        {steps.map((s) => (
          <li key={s.title} className="relative grid content-start gap-3 lg:pt-10">
            <span data-node aria-hidden="true" className="absolute top-1 -left-[37px] size-4 rounded-full border-2 border-accent bg-accent shadow-[0_0_16px_var(--color-accent)] lg:left-0" />
            <span className="mono-label text-[11px] text-accent">{s.label}</span>
            <h3 className="text-xl font-bold">{s.title}</h3>
            <div className="text-muted">{s.body}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
