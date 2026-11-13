'use client';

/**
 * Tabs met deep links (#id). Zonder JS: alle panelen onder elkaar.
 * Met JS: tablist (pijltjestoetsen), en oude hashes worden omgezet (aliases).
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';

type Tab = { id: string; label: string; index: string; line?: string };

export function Tabs({ tabs, panels, aliases = {} }: { tabs: Tab[]; panels: Record<string, ReactNode>; aliases?: Record<string, string> }) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resolve = () => {
      const h = decodeURIComponent(location.hash.replace('#', ''));
      const id = tabs.some((t) => t.id === h) ? h : aliases[h];
      // ook een anker binnen een paneel (bijv. #ontzorgd-leads) opent het juiste paneel
      const inPanel = !id && h ? tabs.find((t) => document.getElementById(`ssr-${t.id}`)?.querySelector(`[id="${h}"]`))?.id : undefined;
      return id ?? inPanel ?? null;
    };
    const first = resolve();
    setActive(first ?? tabs[0].id);
    const onHash = () => {
      const id = resolve();
      if (id) {
        setActive(id);
        listRef.current?.scrollIntoView({ block: 'start' });
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [tabs, aliases]);

  useEffect(() => {
    if (!active || !panelRef.current || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(panelRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' });
  }, [active]);

  const select = (id: string) => {
    setActive(id);
    history.replaceState(null, '', `#${id}`);
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const n = (i + keys[e.key] + tabs.length) % tabs.length;
    select(tabs[n].id);
    (listRef.current?.querySelectorAll('[role=tab]')[n] as HTMLElement)?.focus();
  };

  if (!active) {
    return (
      <div className="grid gap-24">
        {tabs.map((t) => (
          <section key={t.id} className="min-w-0" id={`ssr-${t.id}`} aria-labelledby={`h-${t.id}`}>
            <span id={t.id} className="block scroll-mt-28" />
            <p className="mono-label text-[11px] text-accent">[{t.index}]</p>
            <h2 id={`h-${t.id}`} className="mt-2 mb-2 text-3xl font-bold md:text-4xl">{t.label}</h2>
            {t.line && <p className="mb-10 text-lg text-muted">{t.line}</p>}
            {panels[t.id]}
          </section>
        ))}
      </div>
    );
  }
  const current = tabs.find((t) => t.id === active)!;
  return (
    <div>
      {tabs.map((t) => <span key={t.id} id={t.id} aria-hidden="true" className="block scroll-mt-28" />)}
      <div ref={listRef} role="tablist" aria-label="Kies wat je zoekt" className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={active === t.id ? 0 : -1}
            onClick={() => select(t.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors ${active === t.id ? 'border-accent bg-accent text-accent-ink' : 'border-line text-ink-2 hover:border-line-2'}`}
          >
            <span className={`mono-label text-[10px] ${active === t.id ? 'text-accent-ink/70' : 'text-muted'}`}>[{t.index}]</span> {t.label}
          </button>
        ))}
      </div>
      {current.line && <p className="mb-10 max-w-2xl text-lg text-muted">{current.line}</p>}
      <div ref={panelRef} role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`} tabIndex={0} className="min-w-0 outline-none">
        <h2 className="sr-only">{current.label}</h2>
        {panels[active]}
      </div>
    </div>
  );
}
