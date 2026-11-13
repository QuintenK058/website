import Link from 'next/link';
import { finderSummary } from '@/content/package-finder';
import { pkg, formatPriceLong } from '@/content/pricing';

/** Tekstversie van de pakketkiezer: zichtbaar zonder JS, en voor crawlers. Met JS verborgen (html.js). */
export function FinderFallback() {
  return (
    <div className="finder-fallback panel">
      <div className="panel-in p-6 md:p-8">
        <h3 className="mb-4 text-2xl font-bold">Welk pakket past bij mij?</h3>
        <ul className="grid gap-3">
          {finderSummary.map((r) => {
            const p = pkg(r.id);
            return (
              <li key={r.id} className="grid gap-1 border-b border-line pb-3 sm:grid-cols-[1.2fr_1fr] sm:items-baseline">
                <span className="text-ink-2">{r.when}:</span>{' '}
                <Link href={`/contact?pakket=${encodeURIComponent(p.name)}`} className="font-semibold text-accent underline underline-offset-4">{p.name} ({formatPriceLong(p.price)})</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
