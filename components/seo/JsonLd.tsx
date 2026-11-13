import { graph, webPageLd } from '@/lib/seo';

/** Rendert één <script type="application/ld+json"> met een @graph. */
export function JsonLd({ nodes, page }: { nodes: unknown[]; page?: { path: string; title: string; description: string; type?: string } }) {
  const data = graph(...(page ? [webPageLd(page)] : []), ...nodes);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
