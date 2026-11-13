import { renderOg, ogSize, ogContentType } from '@/lib/og';
export const alt = 'Pakketten van QK Commerce Solutions';
export const size = ogSize;
export const contentType = ogContentType;
export default function Image() {
  return renderOg({ eyebrow: '// PAKKETTEN', title: 'Kies je richting. Dan je pakket.', sub: 'Vaste prijs, vaste scope. Ontzorgd vanaf €99/mnd excl. btw.' });
}
