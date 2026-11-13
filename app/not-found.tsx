import Link from 'next/link';
import type { Metadata } from 'next';
import { SignalLost } from '@/components/sections/SignalLost';

export const metadata: Metadata = { title: 'Signaal verloren (404)', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-site grid max-w-4xl gap-6 py-24 md:py-36">
        <span className="mono-label text-danger">// ERR 404 · SIGNAAL VERLOREN</span>
        <SignalLost />
        <h1 className="text-5xl font-bold md:text-7xl">Deze pagina is <span className="text-accent">offline.</span></h1>
        <p className="max-w-xl text-lg text-muted">De pagina die je zoekt bestaat niet of is verhuisd. De rest van het systeem draait gewoon.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">Terug naar home</Link>
          <Link href="/online-check" className="btn btn-ghost">Gratis Online Check</Link>
        </div>
        <nav aria-label="Populaire pagina's" className="pt-4">
          <ul className="flex flex-wrap gap-2">
            {[['Diensten', '/diensten'], ['Pakketten', '/pakketten'], ['Cases', '/cases'], ['Contact', '/contact']].map(([l, h]) => (
              <li key={h}><Link href={h} className="mono-label inline-block rounded-full border border-line px-4 py-2 text-[11px] hover:border-accent hover:text-accent">{l}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
