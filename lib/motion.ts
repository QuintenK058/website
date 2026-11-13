/**
 * MOTION-TOKENS: één bron voor alle animaties. Pas hier eases, duur en
 * stagger aan; alle componenten lezen deze waarden.
 */
export const ease = {
  out: 'expo.out',
  inOut: 'power3.inOut',
  snap: 'power4.out',
  linear: 'none',
} as const;

export const duration = {
  xs: 0.4,
  sm: 0.8,
  md: 1.1,
  lg: 1.6,
} as const;

export const stagger = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
} as const;

/** Reveal-patroon voor [data-reveal]: alleen transform + opacity. */
export const reveal = {
  yPercent: 16,
  duration: duration.md,
  ease: ease.out,
  start: 'top 85%',
  stagger: stagger.base,
} as const;

/** Media queries voor gsap.matchMedia(). */
export const mq = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  wide: '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
  fine: '(pointer: fine) and (prefers-reduced-motion: no-preference)',
} as const;

export const scrambleChars = 'QK01/_<>[]#';
