import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { serviceRef, getArticles } from '@/lib/content';
import { branch, branchHref } from '@/content/branches';

/** Interne links naar diensten, branches, regio's en kennisbank. */
export function Related({ services = [], branches = [], regions = [], articles = [], title = 'Gerelateerd' }: { services?: string[]; branches?: string[]; regions?: string[]; articles?: string[]; title?: string }) {
  const all = getArticles();
  const groups = [
    { label: 'Diensten', items: services.map(serviceRef).filter((x) => !!x).map((x) => ({ href: x!.href, text: x!.label })) },
    { label: 'Branches', items: branches.map((s) => branch(s)).filter((b) => !!b).map((b) => ({ href: branchHref(b!.slug), text: b!.name })) },
    { label: 'Regio', items: regions.map((r) => ({ href: `/regio/${r}`, text: r[0].toUpperCase() + r.slice(1) })) },
    { label: 'Kennisbank', items: articles.map((a) => all.find((x) => x.slug === a)).filter((a) => !!a).map((a) => ({ href: `/kennisbank/${a!.slug}`, text: a!.data.title })) },
  ].filter((g) => g.items.length);
  if (!groups.length) return null;
  return (
    <section className="border-t border-line py-16" aria-labelledby="rel-title">
      <div className="container-site">
        <h2 id="rel-title" className="mono-label mb-8 text-accent">{title}</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <div key={g.label}>
              <h3 className="mono-label mb-3 text-[11px] text-muted">{g.label}</h3>
              <ul className="grid gap-0.5">
                {g.items.map((i) => (
                  <li key={i.href}><Link href={i.href} className="group inline-flex items-start gap-2 py-2 text-ink-2 hover:text-accent"><Icon name="arrow" size={15} className="mt-1 shrink-0 text-accent" />{i.text}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
