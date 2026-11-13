import { renderOg, ogSize, ogContentType } from '@/lib/og';
import { line, lines } from '@/content/services';
export function generateStaticParams() { return lines.map((l) => ({ line: l.id })); }
export const alt = 'Dienst van QK Commerce Solutions';
export const size = ogSize;
export const contentType = ogContentType;
export default async function Image({ params }: { params: Promise<{ line: string }> }) {
  const l = line((await params).line)!;
  return renderOg({ eyebrow: `// [${l.index}] ${l.name.toUpperCase()}`, title: l.headline.join(' '), sub: l.short });
}
