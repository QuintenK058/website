/** Kleine hint onder een swipe-rij, alleen op mobiel. */
export function SwipeHint({ text = 'Swipe voor meer' }: { text?: string }) {
  return <p className="mono-label mt-1 text-[11px] text-muted md:hidden" aria-hidden="true">← {text} →</p>;
}
