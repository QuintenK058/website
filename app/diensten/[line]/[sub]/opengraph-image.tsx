import { renderOg, ogSize, ogContentType } from '@/lib/og';
import { line, subpage, lines } from '@/content/services';
export function generateStaticParams() { return lines.flatMap((l) => l.subpages.map((s) => ({ line: l.id, sub: s.slug }))); }
export const alt = 'Dienst van QK Commerce Solutions';
export const size = ogSize;
export const contentType = ogContentType;
export default async function Image({ params }: { params: Promise<{ line: string; sub: string }> }) {
  const { line: l, sub } = await params;
  const s = subpage(l, sub)!;
  return renderOg({ eyebrow: `// ${line(l)!.name.toUpperCase()}`, title: s.title });
}
