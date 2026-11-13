import { renderOg, ogSize, ogContentType } from '@/lib/og';
export const alt = 'Gratis Online Check';
export const size = ogSize;
export const contentType = ogContentType;
export default function Image() {
  return renderOg({ eyebrow: '// GRATIS ONLINE CHECK', title: 'Hoe staat jouw site ervoor?', sub: 'Website, beveiliging, Bedrijfsprofiel en AI-zichtbaarheid. 3 verbeterpunten in 2 werkdagen.' });
}
