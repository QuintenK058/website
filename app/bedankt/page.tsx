import Link from 'next/link';
import type { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({ title: 'Bedankt', description: 'Je bericht is verzonden.', path: '/bedankt', noindex: true });

export default function Bedankt() {
  return (
    <Page>
      <section className="container-site grid max-w-3xl gap-6 py-28 md:py-40">
        <span className="mono-label text-ok">// VERZONDEN ✓</span>
        <h1 className="text-5xl font-bold md:text-7xl">Bedankt. <span className="dim">Je bericht is binnen.</span></h1>
        <p className="text-lg text-muted">Heb je de Online Check aangevraagd? Dan ontvang je binnen 2 werkdagen 3 verbeterpunten. Bij andere vragen hoor je binnen één werkdag van me.</p>
        <div className="flex flex-wrap gap-3"><Link href="/" className="btn btn-primary">Naar de homepage</Link><Link href="/cases" className="btn btn-ghost">Bekijk cases</Link></div>
      </section>
    </Page>
  );
}
