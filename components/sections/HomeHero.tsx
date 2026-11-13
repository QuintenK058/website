import Link from 'next/link';
import { HeroShader } from '@/components/gl/HeroShader';
import { SplitHeading, Scramble, Magnetic } from '@/components/motion/primitives';
import { Icon } from '@/components/ui/Icon';
import { Corners } from './Basics';
import { PauseMotion } from '@/components/motion/PauseMotion';
import { home } from '@/content/home';

/** Hero: H1, subkop en CTA's zijn server-gerenderd en direct zichtbaar (LCP). */
export function HomeHero() {
  const h = home.hero;
  return (
    <section className="relative isolate flex min-h-[min(92svh,880px)] items-center overflow-hidden border-b border-line" aria-labelledby="hero-title">
      <HeroShader />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,var(--color-bg)_100%),linear-gradient(90deg,var(--color-bg)_0%,transparent_70%)]" />
      <Corners />
      <div className="container-site relative grid gap-7 py-24 md:py-32">
        <Scramble text={h.eyebrow} className="mono-label text-accent" />
        <SplitHeading as="h1" id="hero-title" lines={h.lines} dimFrom={h.dimFrom} onScroll={false} className="max-w-[12ch] text-[3rem] leading-[0.9] font-bold tracking-[-0.055em] sm:text-7xl lg:text-[7rem]" />
        <p className="max-w-xl text-lg text-muted md:text-xl">{h.sub}</p>
        <div className="flex flex-wrap gap-3">
          <Magnetic><Link href="/online-check" className="btn btn-primary">Gratis Online Check <Icon name="arrow" size={18} /></Link></Magnetic>
          <Magnetic><Link href="/pakketten" className="btn btn-ghost">Bekijk pakketten</Link></Magnetic>
        </div>
      </div>
      <PauseMotion className="absolute right-[max(1.25rem,env(safe-area-inset-right))] bottom-6" />
      <div aria-hidden="true" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 justify-items-center gap-2.5 text-muted md:grid">
        <span className="mono-label text-[10px]">Scroll</span>
        <i className="motion-loop block h-11 w-px bg-gradient-to-b from-accent to-transparent [animation:cue_1.8s_cubic-bezier(.7,0,.3,1)_infinite]" />
      </div>
    </section>
  );
}
