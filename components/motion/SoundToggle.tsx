'use client';

/** Optioneel geluid: subtiele UI-ticks via Web Audio. Standaard UIT. */
import { useEffect, useRef, useState } from 'react';

export function SoundToggle() {
  const [on, setOn] = useState(false);
  const ctx = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      setOn(localStorage.getItem('qk-sound') === 'on');
    } catch {}
  }, []);

  useEffect(() => {
    if (!on) return;
    const tick = (e: Event) => {
      const t = (e.target as HTMLElement)?.closest?.('a,button');
      if (!t || !ctx.current) return;
      const c = ctx.current;
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = 'sine';
      o.frequency.value = e.type === 'click' ? 520 : 880;
      g.gain.setValueAtTime(0.0001, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.04, c.currentTime + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.06);
      o.connect(g).connect(c.destination);
      o.start();
      o.stop(c.currentTime + 0.07);
    };
    document.addEventListener('pointerover', tick);
    document.addEventListener('click', tick);
    return () => {
      document.removeEventListener('pointerover', tick);
      document.removeEventListener('click', tick);
    };
  }, [on]);

  const toggle = () => {
    const next = !on;
    if (next && !ctx.current) ctx.current = new AudioContext();
    setOn(next);
    try {
      localStorage.setItem('qk-sound', next ? 'on' : 'off');
    } catch {}
  };

  return (
    <button type="button" onClick={toggle} aria-pressed={on} aria-label={on ? 'Geluid uitzetten' : 'Geluid aanzetten'} className="hidden size-10 cursor-pointer items-center justify-center rounded-full border border-line text-muted hover:text-ink lg:inline-flex">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d="M4 10v4h4l5 4V6L8 10H4z" />
        {on ? <path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12" /> : <path d="m17 9 5 6M22 9l-5 6" />}
      </svg>
    </button>
  );
}
