import { renderOg, ogSize, ogContentType } from '@/lib/og';
export const alt = 'QK Commerce Solutions: alles rondom internet, volledig ontzorgd';
export const size = ogSize;
export const contentType = ogContentType;
export default function Image() {
  return renderOg({ eyebrow: '// FULL-SERVICE ONLINE AGENCY', title: 'Alles rondom internet. Volledig ontzorgd.', sub: 'Websites, webshops, vindbaarheid, advertenties en AI. Vaste prijzen.' });
}
