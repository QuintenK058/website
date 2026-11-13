'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export function ConsentBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      setShow(!localStorage.getItem('qk-consent'));
    } catch {}
  }, []);
  const choose = (v: 'granted' | 'denied') => {
    try {
      localStorage.setItem('qk-consent', v);
    } catch {}
    const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    if (v === 'granted' && g) g('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
    setShow(false);
  };
  if (!show) return null;
  return (
    <div role="dialog" aria-labelledby="consent-t" className="fixed inset-x-3 bottom-24 z-[85] mx-auto max-w-lg rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-2xl lg:bottom-6">
      <p id="consent-t" className="font-semibold">Cookies</p>
      <p className="mt-1 text-sm text-muted">We gebruiken analytische cookies alleen als je dat goed vindt. <Link href="/cookies" className="text-accent underline">Meer info</Link>.</p>
      <div className="mt-4 flex gap-2">
        <button type="button" className="btn btn-primary btn-sm cursor-pointer" onClick={() => choose('granted')}>Accepteren</button>
        <button type="button" className="btn btn-ghost btn-sm cursor-pointer" onClick={() => choose('denied')}>Weigeren</button>
      </div>
    </div>
  );
}
