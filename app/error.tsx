'use client';

import Link from 'next/link';
import { useEffect } from 'react';

/** Foutpagina voor onverwachte fouten (in dezelfde stijl als de 404). */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="relative overflow-hidden">
      <div className="container-site grid max-w-4xl gap-6 py-24 md:py-36">
        <span className="mono-label text-danger">// ERR 500 · STORING</span>
        <h1 className="text-5xl font-bold md:text-7xl">Even een <span className="text-accent">storing.</span></h1>
        <p className="max-w-xl text-lg text-muted">Er ging iets mis bij het laden van deze pagina. Probeer het opnieuw. Blijft het misgaan, dan horen we het graag.</p>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn btn-primary">Opnieuw proberen</button>{' '}
          <Link href="/" className="btn btn-ghost">Terug naar home</Link>
        </div>
        {error.digest && <p className="mono-label text-[11px] text-muted">Foutcode: {error.digest}</p>}
      </div>
    </section>
  );
}
