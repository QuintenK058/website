'use client';

/**
 * Pakketkiezer: drie vragen, één per scherm, geanimeerde overgangen.
 * Toetsenbord: knoppen zijn gewone <button>s; focus springt naar de nieuwe vraag.
 * Logica: content/package-finder.ts. Zonder JS: tekstlijst (FinderFallback).
 */
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { questions, recommend, type Answers } from '@/content/package-finder';
import { pkg, formatPriceLong } from '@/content/pricing';
import { Icon } from '@/components/ui/Icon';

export function PackageFinder({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [ready, setReady] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const touched = useRef(false);

  useEffect(() => setReady(true), []);
  useEffect(() => {
    if (!ready || !touched.current) return; // geen focus/animatie bij het laden van de pagina
    heading.current?.focus({ preventScroll: true });
    if (!box.current || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(box.current, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.5, ease: 'expo.out' });
  }, [step, ready]);

  if (!ready) return null; // SSR: FinderFallback staat ernaast in de HTML

  const done = step >= questions.length;
  const advice = done ? recommend(answers as Answers) : null;
  const choose = (key: string, v: string) => {
    touched.current = true;
    setAnswers((a) => ({ ...a, [key]: v }));
    setStep((s) => s + 1);
  };
  const reset = () => { touched.current = true; setAnswers({}); setStep(0); };

  return (
    <div className="panel">
      <div className={`panel-in grid gap-6 ${compact ? 'p-6' : 'p-6 md:p-10'}`}>
        <div className="flex items-center justify-between gap-4">
          <span className="mono-label text-[11px] text-accent">Pakketkiezer · {done ? 'advies' : `vraag ${step + 1} van ${questions.length}`}</span>
          <div className="flex gap-1.5" aria-hidden="true">
            {questions.map((_, i) => <span key={i} className={`h-1 w-8 rounded-full ${i < step ? 'bg-accent' : i === step ? 'bg-accent/50' : 'bg-line'}`} />)}
          </div>
        </div>
        <div ref={box} aria-live="polite">
          {!done ? (
            <>
              <h3 ref={heading} tabIndex={-1} className="mb-6 text-3xl font-bold outline-none md:text-4xl">{questions[step].q}</h3>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {questions[step].options.map((o) => (
                  <button key={o.v} type="button" onClick={() => choose(questions[step].key, o.v)} className="flex min-h-14 cursor-pointer items-center justify-between gap-3 rounded-[var(--radius-panel)] border border-line bg-surface-2 px-5 py-4 text-left text-[15px] font-semibold transition-colors hover:border-accent hover:bg-accent/[0.07]">
                    {o.l} <Icon name="arrow" size={16} className="shrink-0 text-accent" />
                  </button>
                ))}
              </div>
              {step > 0 && <button type="button" onClick={() => { touched.current = true; setStep((s) => s - 1); }} className="mono-label mt-5 cursor-pointer text-[11px] text-muted hover:text-ink">← Vorige vraag</button>}
            </>
          ) : advice && (
            <div className="grid gap-6">
              <h3 ref={heading} tabIndex={-1} className="text-sm font-normal text-muted outline-none">Ons advies voor jou</h3>
              <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
                <div className="rounded-[var(--radius-card)] border border-accent bg-accent/[0.06] p-6">
                  <p className="mono-label text-[10px] text-accent">Aanbevolen</p>
                  <p className="mt-2 text-3xl font-bold">{pkg(advice.primary).name}</p>
                  <p className="mt-1 font-mono text-sm">{formatPriceLong(pkg(advice.primary).price)}, excl. btw</p>
                  <p className="mt-3 text-ink-2">{advice.why}</p>
                  {advice.note && <p className="mt-2 text-sm text-accent">{advice.note}</p>}
                </div>
                {advice.extra && (
                  <div className="rounded-[var(--radius-card)] border border-line p-6">
                    <p className="mono-label text-[10px] text-muted">Optionele aanvulling</p>
                    <p className="mt-2 text-xl font-bold">{pkg(advice.extra).name}</p>
                    <p className="mt-1 font-mono text-sm text-muted">{formatPriceLong(pkg(advice.extra).price)}</p>
                    <p className="mt-2 text-sm text-muted">{pkg(advice.extra).summary}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/contact?pakket=${encodeURIComponent(pkg(advice.primary).name)}`} className="btn btn-primary">Kies dit pakket <Icon name="arrow" size={16} /></Link>{' '}
                <Link href="/online-check" className="btn btn-ghost">Gratis Online Check</Link>{' '}
                <button type="button" onClick={reset} className="mono-label cursor-pointer px-2 text-[11px] text-muted hover:text-ink">↺ Opnieuw</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
