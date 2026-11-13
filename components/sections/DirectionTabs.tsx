'use client';

/**
 * Richtingkiezer op /pakketten. Zonder JS: alle richtingen onder elkaar.
 * Met JS: tabs (toetsenbord: pijltjes), en #richting in de URL.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';

type Tab = { id: string; label: string; mono: string; index: string };

export function DirectionTabs({ tabs, panels }: { tabs: Tab[]; panels: Record<string, ReactNode> }) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fromHash = () => {
      const h = location.hash.replace('#', '');
      const match = tabs.find((t) => t.id === h || h.startsWith(t.id));
      setActive(match ? match.id : tabs[0].id);
    };
    fromHash();
    const onHash = () => {
      fromHash();
      listRef.current?.scrollIntoView({ block: 'start' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [tabs]);

  useEffect(() => {
    if (!active || !panelRef.current || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(panelRef.current.querySelectorAll('[data-tier]'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.08 });
  }, [active]);

  const select = (id: string) => {
    setActive(id);
    history.replaceState(null, '', `#${id}`);
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    select(tabs[n].id);
    (listRef.current?.querySelectorAll('[role=tab]')[n] as HTMLElement)?.focus();
  };

  if (!active) {
    // SSR / zonder JS: alles zichtbaar
    return <div className="grid gap-24">{tabs.map((t) => <div key={t.id} id={t.id}>{panels[t.id]}</div>)}</div>;
  }
  return (
    <div>
      {tabs.map((t) => <span key={t.id} id={t.id} aria-hidden="true" className="block scroll-mt-28" />)}
      <div ref={listRef} role="tablist" aria-label="Kies een richting" className="mb-10 flex gap-2 overflow-x-auto pb-2">
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
            <span className={`mono-label text-[10px] ${active === t.id ? 'text-accent-ink/70' : 'text-muted'}`}>[{t.index}]</span>
            {t.label}
          </button>
        ))}
      </div>
      <div ref={panelRef} role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}>
        {panels[active]}
      </div>
    </div>
  );
}
