import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Todo } from '@/components/ui/Todo';
import { Magnetic } from '@/components/motion/primitives';
import { showTodos, isTodo } from '@/lib/todo';
import {
  pkg,
  euro,
  formatPrice,
  formatExtra,
  VAT_NOTE,
  AD_BUDGET_NOTE,
  houseRules,
  moneyBack,
  compareIds,
  compareRows,
  setupLine,
  setupDetails,
  invoicing,
  type Pkg,
} from '@/content/pricing';

const clean = (s: string) => (showTodos ? s : s.replace(/\s*\(TODO[^)]*\)/g, ''));
const contactHref = (p: Pkg) => `/contact?pakket=${encodeURIComponent(p.name)}`;

const unitText: Record<Pkg['price']['unit'], string> = { mnd: 'per maand', eenmalig: 'eenmalig', pp: 'per persoon', uur: 'per uur', sessie: 'per sessie' };

export function PriceTag({ p, size = 'md' }: { p: Pkg; size?: 'md' | 'lg' }) {
  const big = size === 'lg' ? 'text-5xl' : 'text-3xl';
  const extra = formatExtra(p.price);
  return (
    <div>
      <p className="flex flex-wrap items-baseline gap-x-1.5">
        {p.price.from && <span className="text-sm text-muted">vanaf </span>}
        <span className={`${big} font-bold tracking-[-0.04em]`}>{euro(p.price.amount)}</span>
        <span className="text-sm text-muted"> {unitText[p.price.unit]}</span>
      </p>
      {extra && <p className="mt-1 text-sm text-ink-2">{extra}</p>}
      {p.priceNote && <p className="mt-1 text-sm text-ink-2">{p.priceNote}</p>}
      <p className="mono-label mt-2 text-[10px] text-muted">excl. btw{p.kind === 'groei' ? ' · inrichting inbegrepen' : ''}{p.proposal && showTodos ? ' · VOORSTELPRIJS' : ''}</p>
    </div>
  );
}

/** Kaart voor basis, modules, projecten, AI en advies. */
export function PkgCard({ p, cta = 'Kies dit pakket', afterDelivery = false }: { p: Pkg; cta?: string; afterDelivery?: boolean }) {
  return (
    <article id={p.id} className="panel panel-glow h-full" data-reveal>
      <div className="panel-in flex h-full flex-col gap-4 p-6">
        <h3 className="text-xl font-bold">{p.name}</h3>
        <p className="text-sm text-muted">{p.forWho ?? p.summary}</p>
        <PriceTag p={p} />
        <ul className="grid gap-2 text-sm">
          {p.includes.map((i) => <li key={i} className="flex gap-2"><Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent" />{clean(i)}</li>)}
        </ul>
        {p.excludes && (
          <ul className="grid gap-1.5 border-t border-line pt-3 text-sm text-muted" aria-label="Niet inbegrepen">
            {p.excludes.map((x) => <li key={x} className="flex gap-2"><Icon name="x" size={15} className="mt-0.5 shrink-0" />{x}</li>)}
          </ul>
        )}
        {p.adBudget && <p className="mono-label text-[10px] text-muted">{p.adBudget}</p>}
        {(p.delivery || afterDelivery) && (
          <dl className="grid gap-1 border-t border-line pt-3 text-sm">
            {p.delivery && (
              <div className="flex gap-2"><dt className="text-muted">Levertijd:</dt><dd>{isTodo(p.delivery) ? (showTodos ? <Todo text={p.delivery} /> : 'in overleg') : p.delivery}</dd></div>
            )}
            {afterDelivery && <div className="flex gap-2"><dt className="text-muted">Na oplevering:</dt><dd><Link href="/pakketten#maandelijks" className="text-accent underline underline-offset-4">kies je basis</Link></dd></div>}
          </dl>
        )}
        <Link href={contactHref(p)} className="btn btn-ghost btn-sm mt-auto">{cta}</Link>
      </div>
    </article>
  );
}

/** Grote groeikaart. */
export function GroeiCard({ p }: { p: Pkg }) {
  return (
    <article id={p.id} className={`panel panel-glow relative h-full ${p.recommended ? 'shadow-[0_0_0_1px_var(--color-accent),0_30px_80px_-30px_rgb(77_225_255/0.45)] lg:-translate-y-3' : ''}`} data-reveal>
      <div className={`panel-in flex h-full flex-col gap-5 p-6 md:p-7 ${p.recommended ? 'bg-[radial-gradient(ellipse_at_top,rgb(77_225_255/0.14),transparent_60%),rgb(17_18_20/0.95)]!' : ''}`}>
        {p.recommended && <span className="mono-label absolute top-5 right-5 rounded-full bg-accent px-2.5 py-1 text-[10px] font-medium text-accent-ink">Aanrader</span>}
        <div>
          <span className={`mono-label text-[11px] ${p.recommended ? 'text-accent' : 'text-muted'}`}>Groeipakket</span>
          <h3 className="mt-2 text-2xl font-bold">{p.name}</h3>
          <p className="mt-2 text-sm text-muted">{p.forWho}</p>
          {p.services && (
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Diensten in dit pakket">
              {p.services.map((d) => <li key={d} className="rounded-full border border-accent/30 bg-accent/[0.06] px-2.5 py-1 text-xs text-ink-2">{d}</li>)}
            </ul>
          )}
        </div>
        <PriceTag p={p} size="lg" />
        <div>
          <p className="mono-label mb-3 text-[10px] text-ink-2">Wat je krijgt</p>
          <ul className="grid gap-2.5 text-[15px]">
            {p.includes.map((w) => <li key={w} className="flex gap-2.5"><Icon name="check" size={18} className="mt-0.5 shrink-0 text-accent" /><span>{clean(w)}</span></li>)}
          </ul>
        </div>
        <div className="border-t border-line pt-4">
          <p className="mono-label mb-2 text-[10px] text-muted">Niet inbegrepen</p>
          <ul className="grid gap-1.5 text-sm text-muted">
            {(p.excludes ?? []).map((x) => <li key={x} className="flex gap-2.5"><Icon name="x" size={16} className="mt-0.5 shrink-0" />{x}</li>)}
          </ul>
          {p.adBudget && <p className="mono-label mt-3 text-[10px] text-ink-2">{p.adBudget}</p>}
        </div>
        <Magnetic>
          <Link href={contactHref(p)} className={`btn mt-auto w-full ${p.recommended ? 'btn-primary' : 'btn-ghost'}`}>Kies {p.name}</Link>
        </Magnetic>
      </div>
    </article>
  );
}

/** Smalle, brede vierde kaart: Groei Op Maat. */
export function OpMaatCard() {
  const p = pkg('ontzorgd-op-maat');
  return (
    <article id={p.id} className="panel panel-glow" data-reveal>
      <div className="panel-in grid gap-6 p-6 md:grid-cols-[1.2fr_1.6fr_auto] md:items-center md:p-7">
        <div>
          <span className="mono-label text-[11px] text-muted">Groeipakket · meerdere kanalen</span>
          <h3 className="mt-2 text-2xl font-bold">{p.name}</h3>
          <p className="mt-1 text-sm text-muted">{p.forWho}</p>
          <div className="mt-3"><PriceTag p={p} /></div>
        </div>
        <ul className="grid gap-2 text-sm sm:grid-cols-2">
          {p.includes.map((w) => <li key={w} className="flex gap-2"><Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent" />{w}</li>)}
        </ul>
        <Link href={contactHref(p)} className="btn btn-ghost">Bespreek Op Maat</Link>
      </div>
    </article>
  );
}

/** Pakketten op een dienstpagina. */
export function PackageGrid({ ids }: { ids: string[] }) {
  const list = ids.map(pkg);
  const hasAds = list.some((p) => p.adBudget || /ads/i.test(p.id));
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (p.kind === 'groei' ? <GroeiCard key={p.id} p={p} /> : <PkgCard key={p.id} p={p} cta="Aanvragen" afterDelivery={p.kind === 'project' && p.group !== 'checks'} />))}
      </div>
      <p className="mono-label mt-6 text-[11px] text-muted">{VAT_NOTE}{hasAds ? ` ${AD_BUDGET_NOTE}` : ''}</p>
    </div>
  );
}

/** Uitklapbare regel over inrichting. */
export function SetupNote() {
  return (
    <details className="group rounded-[var(--radius-card)] border border-line bg-surface/60 px-5 py-4" data-reveal>
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
        <span><span className="mono-label mr-2 text-[10px] text-accent">Inrichting</span> {setupLine}</span>{' '}
        <span aria-hidden="true" className="mono-label shrink-0 text-[10px] text-muted group-open:hidden">Wat houdt dat in? +</span>
        <span aria-hidden="true" className="mono-label hidden shrink-0 text-[10px] text-muted group-open:inline">Sluiten −</span>
      </summary>
      <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        {setupDetails.map((d) => <li key={d} className="flex gap-2"><Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent" />{d}</li>)}
      </ul>
    </details>
  );
}

export function InvoicingNote() {
  return (
    <p className="text-sm text-muted">
      <span className="mono-label mr-2 text-[10px] text-accent">Facturatie</span>{' '}
      {invoicing.text} {showTodos && <Todo text={invoicing.todo} />}
    </p>
  );
}

export function HouseRules() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {houseRules.map((r, i) => (
        <li key={r.title} className="panel" data-reveal>
          <div className="panel-in grid content-start gap-3 p-5">
            <span className="mono-label text-[10px] text-accent">[{String(i + 1).padStart(2, '0')}]</span>
            <h3 className="text-lg font-bold leading-tight">{r.title}</h3>
            <p className="text-sm text-muted">{r.text}</p>
            {r.title === moneyBack.title && (
              <>
                <Link href="/algemene-voorwaarden" className="text-sm text-accent underline underline-offset-4">Volledige voorwaarden</Link>
                {showTodos && <Todo text={moneyBack.todo} />}
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Vergelijking: ✓ / — / tekst, legenda, sticky eerste kolom, swipebaar op mobiel. */
export function CompareTable() {
  const cols = compareIds.map(pkg);
  return (
    <div data-reveal>
      <p className="mono-label mb-3 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-muted">
        <span><span className="text-accent">✓</span> inbegrepen</span>
        <span><span className="text-ink-2">—</span> niet inbegrepen</span>
        <span className="md:hidden">← swipe voor alle pakketten →</span>
      </p>
      <div className="max-w-full overflow-x-auto rounded-[var(--radius-card)] border border-line" tabIndex={0} role="region" aria-label="Vergelijkingstabel groeipakketten (scrollbaar)">
        <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left text-sm">
          <caption className="sr-only">Vergelijking van Lokaal Gevonden, Leads, Webshop en Op Maat</caption>
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 z-10 border-b border-line bg-surface p-4 font-medium text-muted">Onderdeel</th>
              {cols.map((p) => (
                <th key={p.id} scope="col" className={`border-b border-line bg-surface p-4 text-center ${p.recommended ? 'text-accent' : ''}`}>
                  <span className="block font-semibold">{p.name}</span>{' '}
                  <span className="font-mono text-xs text-muted">{formatPrice(p.price)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compareRows.map((r) => (
              <tr key={r.label}>
                <th scope="row" className="sticky left-0 z-10 border-b border-line bg-bg-2 p-4 font-normal text-ink-2">{r.label}</th>
                {r.values.map((v, i) => (
                  <td key={i} className="border-b border-line p-4 text-center">
                    {v === true ? <span className="text-accent"><Icon name="check" label="inbegrepen" className="mx-auto" /></span> : v === false ? <span className="text-ink-2" aria-label="niet inbegrepen">—</span> : <span className="font-mono text-xs">{v}</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
