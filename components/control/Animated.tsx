'use client';

/** Geanimeerde mission-control-componenten (client). */
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Panel } from './Panel';
import { CountUp } from '@/components/motion/primitives';
import { ease, duration, mq } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* MetricCard: sparkline tekent zich + count-up */
export function MetricCard({ title, value, decimals = 0, prefix = '', suffix = '', delta, points, className }: { title: string; value: number; decimals?: number; prefix?: string; suffix?: string; delta?: string; points: number[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const max = Math.max(...points);
  const min = Math.min(...points);
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${(i / (points.length - 1)) * 400} ${66 - ((p - min) / (max - min || 1)) * 56}`).join(' ');
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motion, () => {
        gsap.from(ref.current!.querySelector('[data-line]'), { drawSVG: 0, duration: duration.lg, ease: ease.out, scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      <Panel title={title}>
        <div className="flex items-end justify-between gap-4">
          <CountUp value={value} decimals={decimals} prefix={prefix} suffix={suffix} className="text-5xl font-bold tracking-[-0.04em]" />{' '}
          {delta && <span className="mono-label text-[11px] text-ok">{delta}</span>}
        </div>
        <svg viewBox="0 0 400 70" preserveAspectRatio="none" className="block h-[70px] w-full" aria-hidden="true">
          <path d={`${d} L400 70 L0 70Z`} fill="rgb(77 225 255 / 0.12)" />
          <path data-line d={d} fill="none" stroke="var(--color-accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </Panel>
    </div>
  );
}

/* AIVisibilityCard: meting per assistent */
const assistants = [
  { name: 'ChatGPT', w: 72, s: 'genoemd' },
  { name: 'Gemini', w: 58, s: 'genoemd' },
  { name: 'Perplexity', w: 41, s: 'deels' },
  { name: 'Claude', w: 24, s: 'nog niet' },
];
export function AIVisibilityCard({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motion, () => {
        gsap.from(ref.current!.querySelectorAll('[data-meter]'), { scaleX: 0, duration: duration.lg, ease: ease.out, stagger: 0.1, scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      <Panel title="AI-zichtbaarheid">
        <ul className="grid gap-3">
          {assistants.map((a) => (
            <li key={a.name} className="grid grid-cols-[88px_1fr_auto] items-center gap-3 text-sm">
              <span>{a.name}</span>{' '}
              <span className="h-1.5 overflow-hidden rounded-full border border-line bg-surface-2">
                <span data-meter className="block h-full origin-left rounded-full bg-gradient-to-r from-accent-2 to-accent" style={{ width: `${a.w}%` }} />
              </span>{' '}
              <span className={`mono-label text-[11px] ${a.s === 'genoemd' ? 'text-accent' : 'text-muted'}`}>{a.s}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* AgentLog: regels worden één voor één "getypt"; pauzeerbaar */
const defaultLines: [string, string][] = [
  ['08:02', 'Nieuwe aanvraag → doorgezet naar CRM'],
  ['08:03', 'Review beantwoord (concept klaar)'],
  ['08:15', 'Back-up voltooid'],
  ['08:31', 'Plugin-update getest → live'],
  ['09:04', 'GEO-meting: genoemd in 2/4 assistenten'],
  ['09:20', 'Google Ads: zoekterm uitgesloten'],
  ['10:12', 'Maandrapport klaargezet'],
];
export function AgentLog({ lines = defaultLines, title = 'Activiteitenlog', className }: { lines?: [string, string][]; title?: string; className?: string }) {
  const [n, setN] = useState(lines.length); // SSR/no-JS: alle regels zichtbaar
  const [paused, setPaused] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);
  useEffect(() => {
    if (matchMedia(mq.reduce).matches) return;
    setCanAnimate(true);
    setN(0);
    let started = false;
    const st = ScrollTrigger.create({ trigger: ref.current, start: 'top 85%', once: true, onEnter: () => (started = true) });
    const id = window.setInterval(() => {
      if (!started || pausedRef.current) return;
      setN((x) => (x >= lines.length ? 1 : x + 1));
    }, 1300);
    return () => {
      st.kill();
      clearInterval(id);
    };
  }, [lines.length]);
  const shown = lines.slice(Math.max(0, n - 6), n);
  return (
    <div ref={ref} className={className}>
      <Panel
        title={title}
        right={
          <span className="flex items-center gap-2">
            <span className="mono-label rounded-full border border-line px-2 py-0.5 text-[10px] text-muted">Voorbeeldweergave</span>
            {canAnimate && (
              <button type="button" onClick={() => setPaused((p) => !p)} aria-pressed={paused} className="mono-label inline-flex min-h-8 cursor-pointer items-center rounded-full border border-line px-2 py-0.5 text-[10px] text-muted hover:text-ink">
                {paused ? '▶ Speel' : '❚❚ Pauze'}
              </button>
            )}
          </span>
        }
      >
        <div className={`min-h-[188px] rounded-[var(--radius-panel)] border border-line bg-[#07080a] px-3.5 py-3 font-mono text-[12.5px] leading-[1.8] text-muted ${paused ? 'is-paused' : ''}`} aria-hidden="true">
          {shown.map(([t, l], i) => (
            <div key={`${t}-${i}`}><span className="text-accent">{t}</span>  {l}</div>
          ))}
          <span className="inline-block h-[13px] w-[7px] animate-blink bg-accent align-[-2px]" />
        </div>
        <ul className="sr-only">{lines.map(([t, l]) => <li key={t}>{t} {l}</li>)}</ul>
      </Panel>
    </div>
  );
}
