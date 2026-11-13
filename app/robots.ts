import type { MetadataRoute } from 'next';
import { siteConfig } from '@/site.config';
import { noIndexDeploy } from '@/lib/seo';

/** AI-crawlers expliciet welkom: we willen genoemd worden in AI-antwoorden. */
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot'];

export default function robots(): MetadataRoute.Robots {
  if (noIndexDeploy) return { rules: [{ userAgent: '*', disallow: '/' }] };
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/bedankt', '/api/'] },
      ...aiBots.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
