'use client';

/**
 * Eén motion-systeem voor de hele site:
 * - Lenis (smooth scroll) met autoRaf: false, aangedreven door gsap.ticker
 * - ScrollTrigger.update via dezelfde ticker, lagSmoothing(0)
 * - globale [data-reveal]-batch, opnieuw na elke route-wissel
 * - reduced motion: geen Lenis, geen reveals (alles direct zichtbaar)
 */
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';
import { reveal, mq } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, DrawSVGPlugin);

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();
  const first = useRef(true);

  // Lenis + ticker (eenmalig)
  useEffect(() => {
    document.documentElement.classList.add('motion-ready');
    const reduce = matchMedia(mq.reduce).matches;
    gsap.ticker.lagSmoothing(0);
    if (reduce) return;
    const l = new Lenis({ autoRaf: false, lerp: 0.1, anchors: { offset: -80 } });
    const tick = (time: number) => l.raf(time * 1000);
    l.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    setLenis(l);
    return () => {
      gsap.ticker.remove(tick);
      l.destroy();
    };
  }, []);

  // Per route: scroll naar boven, reveals opnieuw, ScrollTrigger.refresh()
  useEffect(() => {
    if (!first.current) lenis?.scrollTo(0, { immediate: true });
    first.current = false;

    const els = gsap.utils.toArray<HTMLElement>('[data-reveal]:not([data-revealed])');
    const reduce = matchMedia(mq.reduce).matches;
    if (reduce) {
      els.forEach((el) => el.setAttribute('data-revealed', ''));
      return;
    }
    const triggers = ScrollTrigger.batch(els, {
      start: reveal.start,
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { opacity: 0, yPercent: reveal.yPercent },
          {
            opacity: 1,
            yPercent: 0,
            duration: reveal.duration,
            ease: reveal.ease,
            stagger: reveal.stagger,
            clearProps: 'transform,opacity',
            onStart() {
              batch.forEach((el) => (el as HTMLElement).setAttribute('data-revealed', ''));
            },
          },
        );
      },
    });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(id);
      triggers.forEach((t) => t.kill());
    };
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
