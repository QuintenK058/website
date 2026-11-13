'use client';

/** Custom cursor: klein punt dat groeit met een label op [data-cursor]. Alleen pointer: fine. De systeemcursor blijft zichtbaar. */
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { mq } from '@/lib/motion';

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();
    mm.add(mq.fine, () => {
      el.style.display = 'flex';
      const x = gsap.quickTo(el, 'x', { duration: 0.25, ease: 'power3' });
      const y = gsap.quickTo(el, 'y', { duration: 0.25, ease: 'power3' });
      const move = (e: PointerEvent) => {
        x(e.clientX);
        y(e.clientY);
        const t = (e.target as HTMLElement)?.closest?.('[data-cursor]') as HTMLElement | null;
        const text = t?.dataset.cursor ?? '';
        if (label.current && label.current.textContent !== text) {
          label.current.textContent = text;
          el.dataset.active = text ? 'true' : 'false';
        }
      };
      window.addEventListener('pointermove', move, { passive: true });
      return () => {
        window.removeEventListener('pointermove', move);
        el.style.display = 'none';
      };
    });
    return () => mm.revert();
  });
  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-active="false"
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden size-2.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-ink mix-blend-difference transition-[width,height] duration-300 data-[active=true]:size-[76px] data-[active=true]:mix-blend-normal"
    >
      <span ref={label} className="mono-label text-[10px] font-medium" />
    </div>
  );
}
