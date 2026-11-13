'use client';

/** Case-film: screenshot schuift in een device-frame, features verschijnen één voor één (scroll-gestuurd). */
import Image from 'next/image';
import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Icon } from '@/components/ui/Icon';
import { mq } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CaseFilm({ client, desktop, mobile, features, placeholderDesktop, placeholderMobile }: { client: string; desktop?: { url: string; alt: string }; mobile?: { url: string; alt: string }; features: string[]; placeholderDesktop: ReactNode; placeholderMobile: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.wide, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=130%', pin: true, scrub: 0.6 } });
        tl.from('[data-device]', { yPercent: 30, rotateX: 18, scale: 0.9, ease: 'none' })
          .from('[data-shot]', { yPercent: 12, ease: 'none' }, 0)
          .from('[data-mobile]', { yPercent: 40, opacity: 0, ease: 'none' }, 0.05)
          .from('[data-feature]', { opacity: 0, x: 30, stagger: 0.15, ease: 'none' }, 0.1);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className="flex min-h-svh items-center border-t border-line py-16">
      <div className="container-site grid items-center gap-12 min-[900px]:grid-cols-[1.4fr_1fr]">
        <div style={{ perspective: '1400px' }} className="relative">
          <div data-mobile className="panel absolute -right-2 -bottom-8 z-10 hidden w-[24%] min-w-[110px] rounded-[1.4rem]! sm:block">
            <div className="panel-in relative aspect-[1170/2532] overflow-hidden rounded-[1.35rem]!">
              {mobile ? <Image src={mobile.url} alt={mobile.alt} fill sizes="200px" className="object-cover object-top" /> : placeholderMobile}
            </div>
          </div>
          <div data-device className="panel">
            <div className="panel-in">
              <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
                <i className="size-2.5 rounded-full bg-line-2" /><i className="size-2.5 rounded-full bg-line-2" /><i className="size-2.5 rounded-full bg-line-2" />
                <span className="mono-label ml-3 truncate rounded-md bg-surface-2 px-3 py-1 text-[10px] text-muted">{client.toLowerCase().replace(/\s+/g, '')}</span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden bg-bg-2">
                {desktop ? (
                  <div data-shot className="absolute inset-0"><Image src={desktop.url} alt={desktop.alt} fill sizes="(min-width:900px) 60vw, 100vw" className="object-cover object-top" /></div>
                ) : (
                  <div data-shot className="absolute inset-0">{placeholderDesktop}</div>
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
