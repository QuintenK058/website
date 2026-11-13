'use client';

/** Mobiel menu op basis van <details>: werkt zonder JS; JS sluit bij Esc en navigatie. */
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';

type L = { label: string; href: string; index?: string };

export function MobileMenu({ services, nav }: { services: L[]; nav: L[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);
  useEffect(() => {
    const d = ref.current!;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && d.open) {
        d.open = false;
        d.querySelector('summary')?.focus();
      }
    };
    const onToggle = () => document.documentElement.classList.toggle('overflow-hidden', d.open);
    document.addEventListener('keydown', onKey);
    d.addEventListener('toggle', onToggle);
    return () => {
      document.removeEventListener('keydown', onKey);
      d.removeEventListener('toggle', onToggle);
    };
  }, []);
  return (
    <details ref={ref} className="group lg:hidden">
      <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-line [&::-webkit-details-marker]:hidden" aria-label="Menu">
        <span className="group-open:hidden"><Icon name="menu" /></span>
        <span className="hidden group-open:block"><Icon name="x" /></span>
      </summary>
      <div className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-line bg-bg px-5 pt-6 pb-32">
        <nav aria-label="Mobiel menu">
          <p className="mono-label mb-2 text-[11px] text-muted">Diensten</p>
          <ul className="mb-6 grid gap-0.5">
            {services.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="flex items-baseline gap-3 rounded-lg px-2 py-2.5 text-lg font-semibold">
                  <span className="mono-label text-[10px] text-accent">[{s.index}]</span>{' '}
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="grid gap-0.5 border-t border-line pt-4">
            {[...nav.slice(1), { label: 'Contact', href: '/contact' }].map((n) => (
              <li key={n.href}><Link href={n.href} className="block rounded-lg px-2 py-2.5 text-2xl font-semibold tracking-tight">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 grid gap-3">
          <Link href="/online-check" className="btn btn-primary">Gratis Online Check</Link>{' '}
          <Link href="/pakketten" className="btn btn-ghost">Bekijk pakketten</Link>
        </div>
      </div>
    </details>
  );
}
