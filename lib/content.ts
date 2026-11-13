import 'server-only';
import { readMdDir, readMd } from './markdown';
import { showTodos } from './todo';

export type QA = { q: string; a: string };

export type RegioData = {
  place: string;
  title: string;
  seoTitle: string;
  description: string;
  order: number;
  intro: string;
  highlights: { title: string; text: string }[];
  nearby: string[];
  services: string[];
  branches: string[];
  faq: QA[];
};
export type ArticleData = {
  title: string;
  seoTitle?: string;
  description: string;
  pubDate: string | Date;
  updatedDate?: string | Date;
  draft: boolean;
  readingTime?: number;
  author?: string;
  relatedServices: string[];
  faq: QA[];
};
export type LegalData = { title: string; description: string; updated: string };

export const getRegions = () => readMdDir<RegioData>('regio').sort((a, b) => a.data.order - b.data.order);
export const getRegion = (slug: string) => readMd<RegioData>('regio', slug);

export const getArticles = () =>
  readMdDir<ArticleData>('kennisbank')
    .filter((a) => showTodos || !a.data.draft)
    .sort((a, b) => +new Date(b.data.pubDate) - +new Date(a.data.pubDate));
export const getArticle = (slug: string) => readMd<ArticleData>('kennisbank', slug);

export const legalSlugs = ['privacy', 'cookies', 'algemene-voorwaarden'] as const;
export const getLegal = (slug: string) => readMd<LegalData>('legal', slug, true);

/** "vindbaarheid/seo" → href + label (voor gerelateerde links) */
import { line, subpage, lineHref, subHref } from '@/content/services';
export function serviceRef(ref: string): { href: string; label: string } | null {
  const [l, s] = ref.split('/');
  const ln = line(l);
  if (!ln) return null;
  if (!s) return { href: lineHref(l), label: ln.name };
  const sp = subpage(l, s);
  return sp ? { href: subHref(l, s), label: sp.name } : null;
}
