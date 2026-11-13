import type { MetadataRoute } from 'next';
import { siteConfig } from '@/site.config';
import { lines, lineHref, subHref } from '@/content/services';
import { branches, branchHref } from '@/content/branches';
import { cases, caseHref } from '@/content/cases';
import { getRegions, getArticles, legalSlugs } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => (p === '/' ? `${siteConfig.url}/` : `${siteConfig.url}${p}`);
  const now = new Date();
  const paths: { p: string; prio: number }[] = [
    { p: '/', prio: 1 },
    { p: '/pakketten', prio: 0.9 },
    { p: '/online-check', prio: 0.9 },
    { p: '/diensten', prio: 0.8 },
    ...lines.map((l) => ({ p: lineHref(l.id), prio: 0.8 })),
    ...lines.flatMap((l) => l.subpages.map((s) => ({ p: subHref(l.id, s.slug), prio: 0.7 }))),
    { p: '/contact', prio: 0.7 },
    { p: '/werkwijze', prio: 0.6 },
    { p: '/over-ons', prio: 0.6 },
    { p: '/cases', prio: 0.7 },
    ...cases.filter((c) => c.approved).map((c) => ({ p: caseHref(c.slug), prio: 0.6 })),
    { p: '/branches', prio: 0.6 },
    ...branches.map((b) => ({ p: branchHref(b.slug), prio: 0.6 })),
    { p: '/regio', prio: 0.5 },
    ...getRegions().map((r) => ({ p: `/regio/${r.slug}`, prio: 0.6 })),
    { p: '/kennisbank', prio: 0.5 },
    ...getArticles().filter((a) => !a.data.draft).map((a) => ({ p: `/kennisbank/${a.slug}`, prio: 0.5 })),
    ...legalSlugs.map((l) => ({ p: `/${l}`, prio: 0.2 })),
  ];
  return paths.map(({ p, prio }) => ({ url: u(p), lastModified: now, priority: prio }));
}
