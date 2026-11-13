import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Todo } from '@/components/ui/Todo';
import { Magnetic } from '@/components/motion/primitives';
import { showTodos } from '@/lib/todo';
import { pkg, euro, formatPrice, formatSetup, VAT_NOTE, AD_BUDGET_NOTE, houseRules, compareRows, bundles, type Pkg } from '@/content/pricing';
import type { Direction, Tier } from '@/content/directions';

const cleanTodo = (s: string) => (showTodos ? s : s.replace(/\s*\(TODO[^)]*\)/g, ''));

export function TierCard({ t, direction }: { t: Tier; direction: Direction }) {
  return (
    <article id={t.id} className={`panel panel-glow relative ${t.featured ? 'shadow-[0_0_0_1px_var(--color-accent),0_30px_80px_-30px_rgb(77_225_255/0.45)] lg:-translate-y-3' : ''}`} data-reveal>
      <div className={`panel-in flex h-full flex-col gap-5 p-6 md:p-7 ${t.featured ? 'bg-[radial-gradient(ellipse_at_top,rgb(77_225_255/0.14),transparent_60%),rgb(17_18_20/0.95)]!' : ''}`}>
        {t.featured && <span className="mono-label absolute top-5 right-5 rounded-full bg-accent px-2.5 py-1 text-[10px] font-medium text-accent-ink">Meest gekozen</span>}
        <div>
          <span className={`mono-label text-[11px] ${t.featured ? 'text-accent' : 'text-muted'}`}>{direction.mono}</span>
          <h3 className="mt-2 text-2xl font-bold">{t.name}</h3>
          <p className="mt-2 text-sm text-muted">{t.forWho}</p>
        </div>
        <div>
          {t.monthly != null ? (
            <p className="flex items-baseline gap-1.5"><span className="text-5xl font-bold tracking-[-0.04em]">{euro(t.monthly)}</span><span className="text-sm text-muted">/mnd</span></p>
          ) : t.oneOff ? (
            <p className="text-3xl font-bold tracking-tight">{t.oneOff}</p>
          ) : (
            <p className="grid gap-1"><span className="text-3xl font-bold tracking-tight">Op offerte</span><Todo text={t.priceTodo} /></p>
          )}
          {t.monthly != null && t.oneOff && <p className="mt-1 text-sm text-ink-2">{t.oneOff}</p>}
          <p className="mono-label mt-2 text-[10px] text-muted">excl. btw{t.setupIncluded ? ' · setup inbegrepen' : ''}</p>
        </div>
        <div>
          <p className="mono-label mb-3 text-[10px] text-ink-2">Wat we doen</p>
          <ul className="grid gap-2.5 text-[15px]">
            {t.weDo.map((w) => (
              <li key={w} className="flex gap-2.5"><Icon name="check" size={18} className="mt-0.5 shrink-0 text-accent" /><span>{cleanTodo(w)}</span></li>
            ))}
          </ul>
        </div>
        <div className="border-t border-line pt-4">
          <p className="mono-label mb-2 text-[10px] text-muted">Niet inbegrepen</p>
          <ul className="grid gap-1.5 text-sm text-muted">
            {t.excludes.map((x) => <li key={x} className="flex gap-2.5"><Icon name="x" size={16} className="mt-0.5 shrink-0" />{x}</li>)}
          </ul>
        </div>
        <Magnetic>
          <Link href={`/contact?pakket=${encodeURIComponent(t.name)}`} className={`btn mt-auto w-full ${t.featured ? 'btn-primary' : 'btn-ghost'}`}>Kies {t.name}</Link>
        </Magnetic>
      </div>
    </article>
  );
}

export function PackageRow({ p }: { p: Pkg }) {
  const setup = formatSetup(p.price);
  return (
    <li className="grid gap-2 rounded-[var(--radius-panel)] border border-line bg-surface p-4 sm:grid-cols-[1fr_auto] sm:items-center">
      <div>
        <p className="font-semibold">{p.name}</p>
        <p className="text-sm text-muted">{p.summary}</p>
      </div>
      <p className="font-mono text-sm sm:text-right">
        <span className="text-ink">{formatPrice(p.price)}</span>
        {setup && <span className="block text-xs text-muted">{setup}</span>}
        {p.price.extra && <span className="block text-xs text-muted">{p.price.extra}</span>}
        {p.price.amount == null && p.priceTodo && <Todo text={p.priceTodo} />}
      </p>
    </li>
  );
}

/** Pakketkaarten voor een dienstpagina. */
export function PackageGrid({ ids }: { ids: string[] }) {
  const list = ids.map(pkg);
  const hasAds = list.some((p) => p.line === 'advertenties');
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (
          <article key={p.id} id={p.id} className="panel panel-glow" data-reveal>
            <div className="panel-in flex h-full flex-col gap-4 p-6">
              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="text-sm text-muted">{p.summary}</p>
              <p className="text-3xl font-bold tracking-tight">{formatPrice(p.price).replace(/^vanaf/, 'vanaf')}</p>
              {formatSetup(p.price) && <p className="-mt-3 text-sm text-ink-2">{formatSetup(p.price)}</p>}
              {p.price.extra && <p className="-mt-3 text-sm text-ink-2">{p.price.extra}</p>}
              {p.price.amount == null && <Todo text={p.priceTodo} />}
              {p.adBudget && <p className="mono-label text-[10px] text-muted">{p.adBudget}</p>}
              <ul className="grid gap-2 text-sm">
                {p.includes.map((i) => <li key={i} className="flex gap-2"><Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent" />{i}</li>)}
              </ul>
              <Link href={`/contact?pakket=${encodeURIComponent(p.name)}`} className="btn btn-ghost btn-sm mt-auto">Aanvragen</Link>
            </div>
          </article>
        ))}
      </div>
      <p className="mono-label mt-6 text-[11px] text-muted">{VAT_NOTE}{hasAds ? ` ${AD_BUDGET_NOTE}` : ''}</p>
    </div>
  );
}

export function HouseRules() {
  const rules = houseRules.filter((r) => showTodos || !/TODO/.test(r.text) || true);
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {rules.map((r, i) => (
        <li key={r.title} className="panel" data-reveal>
          <div className="panel-in grid content-start gap-3 p-5">
            <span className="mono-label text-[10px] text-accent">[{String(i + 1).padStart(2, '0')}]</span>
            <h3 className="text-lg font-bold leading-tight">{r.title}</h3>
            {/TODO/.test(r.text) ? (showTodos ? <Todo text={r.text} /> : null) : <p className="text-sm text-muted">{r.text}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function CompareTable() {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line" data-reveal>
      <table className="w-full min-w-[640px] text-left text-sm">
        <caption className="sr-only">Vergelijking van de ontzorgbundels</caption>
        <thead>
          <tr className="border-b border-line bg-surface">
            <th scope="col" className="p-4 font-medium text-muted">Onderdeel</th>
            {bundles.map((b) => (
              <th key={b.id} scope="col" className={`p-4 text-center ${b.featured ? 'text-accent' : ''}`}>
                <span className="block font-semibold">{b.name}</span>
                <span className="font-mono text-xs text-muted">{euro(b.monthly)}/mnd</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {compareRows.map((r) => (
            <tr key={r.label} className="border-b border-line last:border-0 hover:bg-surface/60">
              <th scope="row" className="p-4 font-normal text-ink-2">{r.label}</th>
              {r.values.map((v, i) => (
                <td key={i} className="p-4 text-center">
                  {v === true ? <Icon name="check" label="Inbegrepen" className="mx-auto text-accent" /> : v === false ? <span className="text-line-2" aria-label="Niet inbegrepen">—</span> : <span className="font-mono text-xs">{v}</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
