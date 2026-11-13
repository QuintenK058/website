/** QK-monogram (tijdelijk logo). Paden zijn stroke-based zodat DrawSVG ze kan tekenen. */
export function Monogram({ size = 34, className = '', id }: { size?: number; className?: string; id?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className={className} id={id}>
      <rect x="1" y="1" width="38" height="38" rx="10" fill="none" stroke="var(--color-line-2)" />
      <path data-draw d="M16.5 11a8.5 8.5 0 1 0 0 17 8.5 8.5 0 1 0 0-17M19.5 24l4.5 5" fill="none" stroke="var(--color-accent)" strokeWidth="2.4" strokeLinecap="round" />
      <path data-draw d="M25 11v17M32 11l-6.5 8.5L32 28" fill="none" stroke="var(--color-ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
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
