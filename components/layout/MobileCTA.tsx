import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { contact } from '@/lib/contact';

/** Sticky bel/app-knop op mobiel. */
export function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 px-3 pt-2 backdrop-blur-xl lg:hidden" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom, 0px))' }}>
      <div className="mx-auto grid max-w-md auto-cols-fr grid-flow-col gap-2">
        {contact.telHref && <a href={contact.telHref} className="btn btn-ghost btn-sm"><Icon name="phone" size={16} /> Bel</a>}
        {contact.whatsappHref && <a href={contact.whatsappHref} target="_blank" rel="noopener" className="btn btn-ghost btn-sm"><Icon name="whatsapp" size={16} /> App<span className="sr-only"> via WhatsApp (opent nieuw tabblad)</span></a>}
        <Link href="/online-check" className="btn btn-primary btn-sm">Gratis Online Check</Link>
      </div>
    </div>
  );
}
