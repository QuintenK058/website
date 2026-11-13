'use client';

/** Pauzeert alle doorlopende animaties (shader, gloed, scroll-cue). WCAG 2.2.2. */
import { useEffect, useState } from 'react';

export function PauseMotion({ className = '' }: { className?: string }) {
  const [paused, setPaused] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(!matchMedia('(prefers-reduced-motion: reduce)').matches);
    try {
      if (localStorage.getItem('qk-motion') === 'paused') setPaused(true);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle('motion-paused', paused);
    try {
      localStorage.setItem('qk-motion', paused ? 'paused' : 'on');
    } catch {}
  }, [paused]);
  if (!show) return null;
  return (
    <button type="button" onClick={() => setPaused((p) => !p)} aria-pressed={paused} className={`mono-label inline-flex min-h-8 cursor-pointer items-center rounded-full border border-line bg-bg/70 px-3 py-1.5 text-[10px] text-muted hover:text-ink ${className}`}>
      {paused ? '▶ Animatie aan' : '❚❚ Animatie pauzeren'}
    </button>
  );
}
