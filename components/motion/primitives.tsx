'use client';

/** Motion-primitives: Scramble, SplitHeading, Magnetic, Marquee, ProgressBar, CountUp. */
import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ease, duration, stagger, mq, scrambleChars } from '@/lib/motion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ---------- Scramble: tekst "ontcijfert" zich (bij mount of hover) ---------- */
export function Scramble({ text, as: Tag = 'span', className, onHover = false, delay = 0 }: { text: string; as?: ElementType; className?: string; onHover?: boolean; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(mq.motion, () => {
        const run = () => gsap.to(el, { duration: onHover ? 0.5 : 1.4, delay: onHover ? 0 : delay, scrambleText: { text, chars: scrambleChars, speed: 0.6, revealDelay: onHover ? 0 : 0.2 } });
        if (onHover) {
          const parent = el.closest('a,button') ?? el;
          parent.addEventListener('mouseenter', run);
          return () => parent.removeEventListener('mouseenter', run);
        }
        run();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
}

/* ---------- SplitHeading: regels schuiven in onder een masker ---------- */
/* Tekst staat direct in de HTML (SEO/LCP). De animatie start met een kleine offset, zonder opacity 0. */
export function SplitHeading({ lines, as: Tag = 'h2', className, dimFrom, onScroll = true, id }: { lines: string[]; as?: ElementType; className?: string; dimFrom?: number; onScroll?: boolean; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motion, () => {
        const inner = ref.current?.querySelectorAll('[data-line] > span');
        if (!inner?.length) return;
        gsap.from(inner, {
          yPercent: onScroll ? 105 : 40,
          duration: duration.md,
          ease: ease.out,
          stagger: stagger.base,
          scrollTrigger: onScroll ? { trigger: ref.current, start: 'top 88%', once: true } : undefined,
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className} aria-label={lines.join(' ')} id={id}>
      {lines.map((l, i) => (
        <span key={i} data-line aria-hidden="true" className="block overflow-hidden pb-[0.08em]">
          <span className={`block ${dimFrom !== undefined && i >= dimFrom ? 'dim' : ''}`}>
            {l}
            {i < lines.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* ---------- Magnetic: knop trekt naar de muis (alleen pointer: fine) ---------- */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(mq.fine, () => {
        const x = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
        const y = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          x((e.clientX - r.left - r.width / 2) * strength);
          y((e.clientY - r.top - r.height / 2) * strength * 1.3);
        };
        const leave = () => {
          x(0);
          y(0);
        };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        return () => {
          el.removeEventListener('pointermove', move);
          el.removeEventListener('pointerleave', leave);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <span ref={ref} className="inline-flex" data-magnetic>
      {children}
    </span>
  );
}

/* ---------- Marquee: CSS-animatie met pauzeknop (WCAG 2.2.2) ---------- */
export function Marquee({ items, label, status }: { items: string[]; label: string; status?: ReactNode }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`flex items-center gap-4 overflow-hidden ${paused ? 'is-paused' : ''}`}>
      {status}
      <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]" aria-hidden="true">
        <div className="motion-loop flex w-max animate-marquee">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="mono-label px-4 py-3 whitespace-nowrap text-muted">
              <span className="mr-4 text-accent">●</span>
              {t}
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">{label}: {items.join(', ')}</p>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="mono-label mr-[max(1.25rem,env(safe-area-inset-right))] shrink-0 cursor-pointer rounded-full border border-line px-3 py-1.5 text-[11px] text-muted hover:text-ink"
      >
        {paused ? '▶ Speel' : '❚❚ Pauze'}
      </button>
    </div>
  );
}

/* ---------- ProgressBar: scrollvoortgang bovenaan ---------- */
export function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(mq.motion, () => {
      gsap.to(ref.current, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
    });
    return () => mm.revert();
  });
  return <div ref={ref} aria-hidden="true" className="fixed inset-x-0 top-0 z-[80] h-0.5 origin-left scale-x-0 bg-accent shadow-[0_0_12px_var(--color-accent)]" />;
}

/* ---------- CountUp: SSR toont de eindwaarde, animatie bij in beeld ---------- */
export function CountUp({ value, decimals = 0, prefix = '', suffix = '', className }: { value: number; decimals?: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => prefix + n.toLocaleString('nl-NL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(mq.motion, () => {
      const o = { v: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => gsap.to(o, { v: value, duration: duration.lg, ease: ease.out, onUpdate: () => (el.textContent = fmt(o.v)) }),
      });
    });
    return () => mm.revert();
  });
  return (
    <span ref={ref} className={`tabular-nums ${className ?? ''}`}>
      {fmt(value)}
    </span>
  );
}

/* ---------- Glow-follow: radial gradient volgt de muis op .panel-glow ---------- */
export function GlowFollow() {
  useEffect(() => {
    if (!matchMedia(mq.fine).matches) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement)?.closest?.('.panel-glow') as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return null;
}
