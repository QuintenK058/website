import { Wordmark } from './Monogram';
import { slotFile } from '@/lib/images';

/** Definitief logo uit /public/images/brand/logo-qk.svg als dat er is; anders het tijdelijke QK-wordmark. */
export function BrandLogo() {
  const f = slotFile('logo');
  // eslint-disable-next-line @next/next/no-img-element
  return f ? <img src={f.url} alt={f.alt} width={f.width} height={f.height} className="h-9 w-auto" /> : <Wordmark />;
}
