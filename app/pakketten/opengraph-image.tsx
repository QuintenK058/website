import { renderOg, ogSize, ogContentType } from '@/lib/og';
export const alt = 'Pakketten van QK Commerce Solutions';
export const size = ogSize;
export const contentType = ogContentType;
export default function Image() {
  return renderOg({ eyebrow: '// PAKKETTEN', title: 'Eerst je basis. Dan je groei.', sub: 'Vaste prijs, vaste scope. Vanaf €49/mnd excl. btw.' });
}
