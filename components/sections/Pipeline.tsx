'use client';

/** "Zo werkt ontzorgen": gepinde sectie, lijn tekent zich (DrawSVG), console wisselt per stap. Mobiel/reduced motion: statisch. */
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { mq } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Pipeline({ steps, consoleText, heading }: { steps: { title: string; text: string }[]; consoleText: string[]; heading: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(steps.length - 1); // SSR: alle stappen "aan"
  const [pinned, setPinned] = useState(false);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.wide, () => {
        setPinned(true);
        setActive(0);
        let last = 0;
        gsap.fromTo(
          ref.current!.querySelector('[data-line]'),
          { drawSVG: '0%' },
          {
            drawSVG: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top top',
              end: '+=150%',
              pin: true,
              scrub: true,
              onUpdate: (s) => {
                const i = Math.min(steps.length - 1, Math.floor(s.progress * steps.length));
                if (i !== last) {
                  last = i;
                  setActive(i);
                }
              },
            },
          },
        );
        return () => {
          setPinned(false);
          setActive(steps.length - 1);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  const shown = pinned ? active : steps.length - 1;
  return (
    <div ref={ref} className="flex min-h-svh items-center border-t border-line py-20">
      <div className="container-site grid items-center gap-12 min-[900px]:grid-cols-[1.1fr_1fr]">
        <div>
          {heading}
          <ol className="relative grid gap-8 pl-12">
            <svg aria-hidden="true" className="absolute top-2 left-[13px] h-[calc(100%-1rem)] w-1 overflow-visible" viewBox="0 0 4 100" preserveAspectRatio="none">
              <line x1="2" y1="0" x2="2" y2="100" stroke="var(--color-line)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <line data-line x1="2" y1="0" x2="2" y2="100" stroke="var(--color-accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ filter: 'drop-shadow(0 0 6px var(--color-accent))' }} />
            </svg>
            {steps.map((s, i) => {
              const on = !pinned || i <= active;
              return (
                <li key={s.title} className={`relative transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-35'}`}>
                  <span aria-hidden="true" className={`absolute top-1.5 -left-[42px] size-3.5 rounded-full border-2 transition-all duration-500 ${on ? 'border-accent bg-accent shadow-[0_0_16px_var(--color-accent)]' : 'border-line bg-bg'}`} />
                  <span className="mono-label text-[11px] text-muted">Stap {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-1.5 text-2xl font-bold md:text-3xl">{s.title}</h3>
                  <p className="mt-1.5 max-w-md text-muted">{s.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="panel" aria-hidden="true">
          <div className="panel-in">
            <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
              <i className="size-2.5 rounded-full bg-line-2" /><i className="size-2.5 rounded-full bg-line-2" /><i className="size-2.5 rounded-full bg-line-2" />
              <span className="mono-label ml-auto text-[10px] text-muted">qk://ontzorgd · voorbeeld</span>
            </div>
            <pre key={shown} className="min-h-[240px] p-5 font-mono text-[13px] leading-[1.8] whitespace-pre-wrap text-muted [animation:fade-up_.4s_ease]">{consoleText[shown]}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
