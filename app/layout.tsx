import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { siteConfig } from '@/site.config';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { ProgressBar, GlowFollow } from '@/components/motion/primitives';
import { Cursor } from '@/components/motion/Cursor';
import { BootLoader } from '@/components/motion/BootLoader';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileCTA } from '@/components/layout/MobileCTA';
import { JsonLd } from '@/components/seo/JsonLd';
import { Analytics } from '@/components/seo/Analytics';
import { organizationLd, websiteLd, noIndexDeploy } from '@/lib/seo';

/* Self-hosted Geist. Alleen de display/body-font wordt vooraf geladen; mono laadt later (labels). */
const geistSans = localFont({ src: './fonts/Geist-Variable.woff2', variable: '--font-geist-sans', weight: '100 900', display: 'swap', preload: true });
const geistMono = localFont({ src: './fonts/GeistMono-Variable.woff2', variable: '--font-geist-mono', weight: '100 900', display: 'swap', preload: false, fallback: ['ui-monospace', 'Menlo', 'monospace'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.shortName, template: '%s | QK Commerce Solutions' },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  authors: [{ name: siteConfig.founder.name }],
  alternates: { types: { 'text/plain': '/llms.txt' } },
  formatDetection: { telephone: false },
  ...(noIndexDeploy ? { robots: { index: false, follow: false } } : {}),
};

export const viewport: Viewport = {
  themeColor: '#0a0b0d',
  colorScheme: 'dark',
  viewportFit: 'cover',
};

/* Draait vóór de eerste paint:
   - html.js → verborgen reveal-states mogen gezet worden (zonder JS: alles zichtbaar)
   - html.boot → loader alleen bij eerste bezoek, desktop, zonder reduced motion
   - failsafe: als het motion-systeem niet binnen 4 s start, gaat html.js eraf */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');
try{var rm=matchMedia('(prefers-reduced-motion: reduce)').matches,f=matchMedia('(pointer: fine)').matches;
if(!rm&&f&&!sessionStorage.getItem('qk-booted')){d.classList.add('boot');sessionStorage.setItem('qk-booted','1');}}catch(e){}
setTimeout(function(){if(!d.classList.contains('motion-ready')){d.classList.remove('js');d.classList.remove('boot');}},4000);})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only z-[100] rounded-full bg-accent px-5 py-3 font-semibold text-accent-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Naar de inhoud
        </a>
        <JsonLd nodes={[organizationLd(), websiteLd()]} />
        <BootLoader />
        <MotionProvider>
          <ProgressBar />
          <div aria-hidden="true" className="grid-lines pointer-events-none fixed inset-0 -z-0" />
          <Header />
          <main id="main" tabIndex={-1} className="relative outline-none">
            {children}
          </main>
          <Footer />
          <MobileCTA />
          <Cursor />
          <GlowFollow />
        </MotionProvider>
        <div className="grain" aria-hidden="true" />
        <Analytics />
      </body>
    </html>
  );
}
