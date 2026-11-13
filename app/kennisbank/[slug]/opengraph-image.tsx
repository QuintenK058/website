import { renderOg, ogSize, ogContentType } from '@/lib/og';
import { getArticle, getArticles } from '@/lib/content';
export function generateStaticParams() { return getArticles().map((a) => ({ slug: a.slug })); }
export const alt = 'Artikel uit de kennisbank van QK Commerce Solutions';
export const size = ogSize;
export const contentType = ogContentType;
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug);
  return renderOg({ eyebrow: '// KENNISBANK', title: a.data.title });
}
