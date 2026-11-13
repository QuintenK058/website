'use client';

/** "Stel je pakket samen": modules aanvinken, maandprijs rolt mee. Basisprijzen staan ook als HTML-tekst in de lijst. */
import { useRef, useState } from 'react';
import gsap from 'gsap';

type Mod = { id: string; name: string; monthly: number; setup?: number };

const fmt = (n: number) => `€${Math.round(n).toLocaleString('nl-NL')}`;

export function Calculator({ modules }: { modules: Mod[] }) {
  const [sel, setSel] = useState<string[]>(['zorg-plus']);
  const monthRef = useRef<HTMLSpanElement>(null);
  const shown = useRef({ v: modules.find((m) => m.id === 'zorg-plus')?.monthly ?? 0 });
  const total = modules.filter((m) => sel.includes(m.id)).reduce((s, m) => s + m.monthly, 0);
  const setup = modules.filter((m) => sel.includes(m.id)).reduce((s, m) => s + (m.setup ?? 0), 0);

  const toggle = (id: string) => {
    const next = sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id];
    setSel(next);
    const t = modules.filter((m) => next.includes(m.id)).reduce((s, m) => s + m.monthly, 0);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      shown.current.v = t;
      if (monthRef.current) monthRef.current.textContent = fmt(t);
      return;
    }
    gsap.to(shown.current, { v: t, duration: 0.8, ease: 'expo.out', onUpdate: () => { if (monthRef.current) monthRef.current.textContent = fmt(shown.current.v); } });
  };

  return (
    <div className="panel" data-reveal>
      <div className="panel-in grid gap-8 p-6 md:p-8 lg:grid-cols-[1.5fr_1fr]">
        <fieldset>
          <legend className="mono-label mb-4 text-accent">Stel je pakket samen</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {modules.map((m) => (
              <label key={m.id} className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-panel)] border border-line bg-surface-2 px-4 py-3 text-[15px] has-[:checked]:border-accent/60 has-[:checked]:bg-accent/[0.07]">
                <input type="checkbox" checked={sel.includes(m.id)} onChange={() => toggle(m.id)} className="size-4 accent-[var(--color-accent)]" />
                <span className="flex-1">{m.name}</span>
                <span className="font-mono text-xs text-muted">{fmt(m.monthly)}/mnd{m.setup ? ` + ${fmt(m.setup)}` : ''}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid content-center gap-2 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          <span className="mono-label text-[11px] text-muted">Jouw maandprijs</span>
          <span ref={monthRef} aria-live="polite" className="text-6xl font-bold tracking-[-0.05em] tabular-nums md:text-7xl">{fmt(total)}</span>
          <span className="text-sm text-ink-2">{setup > 0 ? `+ ${fmt(setup)} eenmalige setup` : 'Geen setupkosten'}</span>
          <span className="mono-label text-[10px] text-muted">excl. btw · excl. advertentiebudget</span>
          <p className="mt-2 text-sm text-muted">Tip: in een bundel is de setup inbegrepen en betaal je vaak minder.</p>
        </div>
      </div>
    </div>
  );
}
