'use client';

/** Horizontale, gepinde rail met alle diensten. Alleen desktop; mobiel = gestapeld. */
import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Icon } from '@/components/ui/Icon';
import { mq } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type RailItem = { id: string; index: string; name: string; mono: string; icon: string; headline: [string, string]; bullets: string[]; price: string; inBundles: string; href: string };

export function ServiceRail({ items }: { items: RailItem[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.desktop, () => {
        const t = track.current!;
        const dist = () => Math.max(0, t.scrollWidth - window.innerWidth + 40);
        gsap.to(t, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: { trigger: wrap.current, start: 'top 14%', end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true },
        });
      });
      return () => mm.revert();
    },
    { scope: wrap },
  );
  return (
    <div ref={wrap} className="overflow-hidden">
      <ul ref={track} className="flex flex-col gap-4 px-[max(1.25rem,env(safe-area-inset-left))] min-[900px]:w-max min-[900px]:flex-row min-[900px]:pr-[20vw] min-[900px]:pl-[max(1.25rem,calc((100vw-77.5rem)/2+1.25rem))]">
        {items.map((d) => (
          <li key={d.id} className="min-[900px]:w-[400px]">
            <Link href={d.href} data-cursor="BEKIJK" className={`panel panel-glow group block h-full ${d.id === 'ai' ? '[&>.panel-in]:bg-[radial-gradient(ellipse_at_top_right,rgb(122_92_255/0.22),transparent_60%),rgb(17_18_20/0.92)]' : ''}`}>
              <div className="panel-in grid min-h-[440px] grid-rows-[auto_auto_auto_1fr_auto] gap-5 p-7">
                <div className="flex justify-between"><span className="mono-label text-[11px] text-muted">[{d.index}] {d.mono}</span><Icon name="arrow" size={18} className="text-accent transition-transform group-hover:translate-x-1" /></div>
                <Icon name={d.icon} size={44} className="text-accent" />
                <h3 className="text-3xl font-bold">{d.name} <span className="mt-2 block text-base font-normal tracking-normal text-muted">{d.headline[0]} {d.headline[1]}</span></h3>
                <ul className="grid content-start gap-2 text-[15px] text-ink-2">
                  {d.bullets.map((b) => <li key={b} className="flex gap-2"><span className="text-accent" aria-hidden="true">→</span>{b}</li>)}
                </ul>
                <div className="grid gap-1.5 border-t border-line pt-4">
                  <span className="text-xl font-semibold tracking-tight">{d.price}</span>{' '}
                  <span className="mono-label text-[10px] text-muted">{d.inBundles}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
