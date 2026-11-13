'use client';

/**
 * Boot-loader: max ~800 ms, alleen bij eerste bezoek (sessionStorage), alleen
 * desktop (pointer: fine) en niet bij reduced motion. Het inline-script in
 * <head> zet html.boot; dit is een overlay die de HTML nooit blokkeert, met
 * een CSS-failsafe die hem na 1,5 s altijd verbergt.
 */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Monogram } from '@/components/ui/Monogram';

export function BootLoader() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('boot') || !ref.current) return;
    const el = ref.current;
    const tl = gsap.timeline({ onComplete: () => root.classList.remove('boot') });
    tl.from(el.querySelectorAll('[data-draw]'), { drawSVG: 0, duration: 0.55, ease: 'power3.inOut', stagger: 0.08 })
      .to(el.querySelector('[data-boot-text]'), { duration: 0.35, scrambleText: { text: 'INITIALISING… OK', chars: '01#/_' } }, 0.1)
      .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.35, ease: 'power3.inOut' }, 0.5);
    return () => {
      tl.kill();
      root.classList.remove('boot');
    };
  }, []);
  return (
    <div ref={ref} className="boot-loader" aria-hidden="true" style={{ clipPath: 'inset(0 0 0 0)' }}>
      <div className="grid justify-items-center gap-4">
        <Monogram size={72} />
        {/* Tekst alleen client-side (via GSAP), niet in de HTML voor crawlers */}
        <span data-boot-text aria-hidden="true" className="mono-label min-h-4 text-accent" />
      </div>
    </div>
  );
}
