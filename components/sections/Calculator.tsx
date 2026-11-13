'use client';

/** Stap 3: kies je basis en vink modules aan. Maandprijs rolt mee; eenmalige inrichting apart. Alle prijzen staan ook als tekst in de lijst. */
import { useRef, useState } from 'react';
import gsap from 'gsap';

type Mod = { id: string; name: string; monthly: number; setup?: number; note?: string };
const fmt = (n: number) => `€${Math.round(n).toLocaleString('nl-NL')}`;

export function Calculator({ bases, modules }: { bases: Mod[]; modules: Mod[] }) {
  const [base, setBase] = useState(bases[1]?.id ?? bases[0].id);
  const [sel, setSel] = useState<string[]>([]);
  const monthRef = useRef<HTMLSpanElement>(null);
  const shown = useRef({ v: 0 });
  const calc = (b: string, s: string[]) => (bases.find((x) => x.id === b)?.monthly ?? 0) + modules.filter((m) => s.includes(m.id)).reduce((t, m) => t + m.monthly, 0);
  const total = calc(base, sel);
  const setup = modules.filter((m) => sel.includes(m.id)).reduce((t, m) => t + (m.setup ?? 0), 0);
  if (shown.current.v === 0) shown.current.v = total;

  const animate = (t: number) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !monthRef.current) {
      shown.current.v = t;
      return;
    }
    gsap.to(shown.current, { v: t, duration: 0.8, ease: 'expo.out', onUpdate: () => { if (monthRef.current) monthRef.current.textContent = fmt(shown.current.v); } });
  };
  const pickBase = (id: string) => { setBase(id); animate(calc(id, sel)); };
  const toggle = (id: string) => {
    const next = sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id];
    setSel(next);
    animate(calc(base, next));
  };

  const row = 'flex cursor-pointer items-center gap-3 rounded-[var(--radius-panel)] border border-line bg-surface-2 px-4 py-3 text-[15px] has-[:checked]:border-accent/60 has-[:checked]:bg-accent/[0.07]';
  return (
    <div className="panel" data-reveal>
      <div className="panel-in grid gap-8 p-6 md:p-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="grid gap-6">
          <fieldset>
            <legend className="mono-label mb-3 text-[11px] text-accent">1 · Je basis</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {bases.map((b) => (
                <label key={b.id} className={row}>
                  <input type="radio" name="calc-base" checked={base === b.id} onChange={() => pickBase(b.id)} className="size-4 accent-[var(--color-accent)]" />
                  <span className="flex-1">{b.name}</span>{' '}
                  <span className="font-mono text-xs text-muted">{fmt(b.monthly)}/mnd</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mono-label mb-3 text-[11px] text-accent">2 · Modules erbij</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {modules.map((m) => (
                <label key={m.id} className={row}>
                  <input type="checkbox" checked={sel.includes(m.id)} onChange={() => toggle(m.id)} className="size-4 accent-[var(--color-accent)]" />
                  <span className="flex-1">{m.name}{m.note && <span className="block text-xs text-muted">{m.note}</span>}</span>{' '}
                  <span className="text-right font-mono text-xs text-muted">{fmt(m.monthly)}/mnd{m.setup ? <span className="block"> + {fmt(m.setup)} inrichting</span> : null}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <div className="grid content-center gap-2 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          <span className="mono-label text-[11px] text-muted">Jouw maandprijs</span>
          <span ref={monthRef} aria-live="polite" className="text-6xl font-bold tracking-[-0.05em] tabular-nums md:text-7xl">{fmt(total)}</span>
          <span className="text-sm text-ink-2">{setup > 0 ? `+ ${fmt(setup)} eenmalige inrichting` : 'Geen eenmalige inrichting'}</span>
          {' '}<span className="mono-label text-[10px] text-muted">excl. btw · excl. advertentiebudget</span>
          <p className="mt-2 text-sm text-muted">Tip: in een groeipakket is de inrichting inbegrepen en betaal je vaak minder.</p>
        </div>
      </div>
    </div>
  );
}
