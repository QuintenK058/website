import { renderOg, ogSize, ogContentType } from '@/lib/og';
import { branch, branches } from '@/content/branches';
export function generateStaticParams() { return branches.map((b) => ({ slug: b.slug })); }
export const alt = 'Branche-aanpak van QK Commerce Solutions';
export const size = ogSize;
export const contentType = ogContentType;
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const b = branch((await params).slug)!;
  return renderOg({ eyebrow: `// BRANCHE · ${b.name.toUpperCase()}`, title: b.headline.join(' ') });
}
