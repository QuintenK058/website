import Link from 'next/link';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Icon } from '@/components/ui/Icon';
import { Todo } from '@/components/ui/Todo';
import { siteConfig } from '@/site.config';
import { contact } from '@/lib/contact';
import { filled, isTodo } from '@/lib/todo';
import { lines, lineHref } from '@/content/services';
import { branches, branchHref } from '@/content/branches';

const regions = ['leeuwarden', 'friesland', 'sneek', 'drachten', 'heerenveen', 'groningen'];

export function Footer() {
  const year = new Date().getFullYear();
  const a = siteConfig.address;
  const socials = [
    { name: 'LinkedIn', icon: 'linkedin', href: filled(siteConfig.socials.linkedin) },
    { name: 'Instagram', icon: 'instagram', href: filled(siteConfig.socials.instagram) },
  ].filter((s) => s.href);
  const cols = [
    { title: 'Diensten', links: lines.map((l) => ({ label: l.name, href: lineHref(l.id) })) },
    { title: 'QK', links: [{ label: 'Pakketten', href: '/pakketten' }, { label: 'Online Check', href: '/online-check' }, { label: 'Werkwijze', href: '/werkwijze' }, { label: 'Cases', href: '/cases' }, { label: 'Over ons', href: '/over-ons' }, { label: 'Kennisbank', href: '/kennisbank' }, { label: 'Contact', href: '/contact' }] },
    { title: 'Branches', links: branches.map((b) => ({ label: b.name, href: branchHref(b.slug) })) },
    { title: 'Regio', links: regions.map((r) => ({ label: r[0].toUpperCase() + r.slice(1), href: `/regio/${r}` })) },
  ];
  return (
    <footer className="relative border-t border-line bg-bg-2 pb-24 lg:pb-0">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
        <div className="grid content-start gap-6">
          <BrandLogo />
          <p className="max-w-sm text-muted">{siteConfig.tagline} Eén partner voor web, webshops, vindbaarheid, ads en AI. Vaste prijzen, gepubliceerd.</p>
          <address className="grid gap-2 text-sm not-italic text-ink-2">
            {contact.mailHref ? <a href={contact.mailHref} className="inline-flex items-center gap-2 hover:text-accent"><Icon name="mail" size={16} />{contact.email}</a> : <Todo text={siteConfig.email} />}
            {contact.telHref ? <a href={contact.telHref} className="inline-flex items-center gap-2 hover:text-accent"><Icon name="phone" size={16} />{contact.phone}</a> : <Todo text={siteConfig.phoneDisplay} />}
            {contact.whatsappHref && <a href={contact.whatsappHref} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-accent"><Icon name="whatsapp" size={16} />WhatsApp<span className="sr-only"> (opent nieuw tabblad)</span></a>}
            <span className="inline-flex items-start gap-2"><Icon name="pin" size={16} className="mt-1 shrink-0" />{filled(a.street) ? `${a.street}, ${a.postalCode} ${a.city}` : `Gevestigd in ${a.city}`}</span>
          </address>
          <div className="flex flex-wrap gap-2">
            <Link href="/online-check" className="btn btn-primary btn-sm">Gratis Online Check</Link>{' '}
            <Link href="/contact" className="btn btn-ghost btn-sm">Plan een kennismaking</Link>
          </div>
          {socials.length > 0 && (
            <ul className="flex gap-2">
              {socials.map((s) => (
                <li key={s.name}><a href={s.href} target="_blank" rel="noopener" aria-label={`${s.name} (opent nieuw tabblad)`} className="flex size-10 items-center justify-center rounded-full border border-line text-muted hover:text-accent"><Icon name={s.icon} size={18} /></a></li>
              ))}
            </ul>
          )}
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className="mono-label mb-4 text-[11px] text-ink">{c.title}</h2>
              <ul className="grid gap-2.5 text-sm">
                {c.links.map((l) => <li key={l.href}><Link href={l.href} className="text-muted hover:text-accent">{l.label}</Link></li>)}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p className="mono-label flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
            <span>© {year} {siteConfig.name} · {a.city}</span>
            {isTodo(siteConfig.kvk) ? <Todo text={siteConfig.kvk} /> : <span>KvK {siteConfig.kvk}</span>}
            {isTodo(siteConfig.btw) ? <Todo text={siteConfig.btw} /> : <span>Btw {siteConfig.btw}</span>}
          </p>
          <ul className="flex flex-wrap gap-4">
            <li><Link href="/privacy" className="hover:text-accent">Privacy</Link></li>
            <li><Link href="/cookies" className="hover:text-accent">Cookies</Link></li>
            <li><Link href="/algemene-voorwaarden" className="hover:text-accent">Algemene voorwaarden</Link></li>
            <li><a href="/llms.txt" className="hover:text-accent">llms.txt</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
