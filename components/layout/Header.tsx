import Link from 'next/link';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Scramble, Magnetic } from '@/components/motion/primitives';
import { SoundToggle } from '@/components/motion/SoundToggle';
import { MobileMenu } from './MobileMenu';
import { lines, lineHref } from '@/content/services';

export const nav = [
  { label: 'Diensten', href: '/diensten' },
  { label: 'Pakketten', href: '/pakketten' },
  { label: 'Werkwijze', href: '/werkwijze' },
  { label: 'Cases', href: '/cases' },
  { label: 'Over ons', href: '/over-ons' },
  { label: 'Kennisbank', href: '/kennisbank' },
];

export function Header() {
  const services = lines.map((l) => ({ label: l.name, href: lineHref(l.id), index: l.index, short: l.short }));
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95" style={{ top: 'env(safe-area-inset-top, 0px)' }}>
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="QK Commerce Solutions, naar de homepage" className="shrink-0 rounded-lg">
          <BrandLogo />
        </Link>

        <nav aria-label="Hoofdmenu" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            <li className="group relative">
              <Link href="/diensten" className="mono-label inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[12px] text-muted transition-colors hover:text-ink">
                <Scramble text="Diensten" onHover />
                <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
              </Link>
              <div className="invisible absolute top-full left-0 w-[34rem] pt-3 opacity-0 transition-[opacity,visibility] duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <ul className="grid grid-cols-2 gap-1 rounded-[var(--radius-card)] border border-line bg-surface/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl">
                  {services.map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} className="block rounded-xl px-3 py-3 transition-colors hover:bg-surface-2">
                        <span className="mono-label block text-[10px] text-accent">[{s.index}]</span>{' '}
                        <span className="block text-sm font-semibold text-ink">{s.label}</span>{' '}
                        <span className="mt-0.5 block text-xs leading-snug text-muted">{s.short}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {nav.slice(1).map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="mono-label inline-block rounded-lg px-3 py-2 text-[12px] text-muted transition-colors hover:text-ink">
                  <Scramble text={n.label} onHover />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <SoundToggle />
          <Link href="/contact" className="btn btn-ghost btn-sm hidden xl:inline-flex">Kennismaking</Link>{' '}
          <Magnetic>
            <Link href="/online-check" className="btn btn-primary btn-sm hidden sm:inline-flex">Gratis Online Check</Link>
          </Magnetic>
          <MobileMenu services={services} nav={nav} />
        </div>
      </div>
    </header>
  );
}
