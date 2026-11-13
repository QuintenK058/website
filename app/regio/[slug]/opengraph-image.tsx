import { renderOg, ogSize, ogContentType } from '@/lib/og';
import { getRegion, getRegions } from '@/lib/content';
export function generateStaticParams() { return getRegions().map((r) => ({ slug: r.slug })); }
export const alt = 'QK Commerce Solutions in de regio';
export const size = ogSize;
export const contentType = ogContentType;
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const r = getRegion((await params).slug);
  return renderOg({ eyebrow: `// REGIO · ${r.data.place.toUpperCase()}`, title: r.data.title });
}
