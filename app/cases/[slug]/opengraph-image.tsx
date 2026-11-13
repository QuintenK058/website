import { renderOg, ogSize, ogContentType } from '@/lib/og';
import { visibleCases } from '@/content/cases';
export function generateStaticParams() { return visibleCases().map((c) => ({ slug: c.slug })); }
export const alt = 'Case van QK Commerce Solutions';
export const size = ogSize;
export const contentType = ogContentType;
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const c = visibleCases().find((x) => x.slug === slug)!;
  return renderOg({ eyebrow: `// CASE · ${c.client.toUpperCase()}`, title: c.title, sub: c.highlight });
}
