/** QK-monogram (definitief logo, variant B 'Verfijnd'). Paden zijn stroke-based zodat DrawSVG ze kan tekenen. */
export function Monogram({ size = 34, className = '', id }: { size?: number; className?: string; id?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className={className} id={id}>
      <rect x="1" y="1" width="38" height="38" rx="9.5" fill="none" stroke="var(--color-line-2)" />
      <path data-draw d="M15.2 12a8 8 0 1 0 0 16 8 8 0 1 0 0-16M18.6 23.4l3 3" fill="none" stroke="var(--color-accent)" strokeWidth="2.7" strokeLinecap="round" />
      <path data-draw d="M26.6 11.8v16.4M32.8 11.8l-6 8.2 6 8.2" fill="none" stroke="var(--color-ink)" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Monogram id="header-mark" />
      <span className="hidden text-[1.02rem] leading-none font-semibold tracking-[-0.02em] sm:inline">
        QK Commerce <span className="font-normal text-muted">Solutions</span>
      </span>
    </span>
  );
}
