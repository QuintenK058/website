'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { contact } from '@/lib/contact';

/**
 * Sticky bel/app-knop op mobiel. Verschijnt pas als je voorbij het eerste
 * scherm scrolt (de hero heeft zelf al een CTA). Zonder JS altijd zichtbaar.
 */
export function MobileCTA() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const on = () => setShown(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <div
      className={`mobile-cta fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 px-3 pt-2 backdrop-blur-xl transition-transform duration-300 lg:hidden ${shown ? 'is-shown' : ''}`}
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="mx-auto grid max-w-md auto-cols-fr grid-flow-col gap-2">
        {contact.telHref && <a href={contact.telHref} className="btn btn-ghost btn-sm"><Icon name="phone" size={16} /> Bel</a>}
        {contact.whatsappHref && <a href={contact.whatsappHref} target="_blank" rel="noopener" className="btn btn-ghost btn-sm"><Icon name="whatsapp" size={16} /> App<span className="sr-only"> via WhatsApp (opent nieuw tabblad)</span></a>}
        <Link href="/online-check" className="btn btn-primary btn-sm" tabIndex={shown ? undefined : -1}>Gratis Online Check</Link>
      </div>
    </div>
  );
}
