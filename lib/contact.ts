import { siteConfig } from '@/site.config';
import { filled } from './todo';

export const contact = {
  telHref: filled(siteConfig.phoneE164) ? `tel:${siteConfig.phoneE164}` : undefined,
  phone: filled(siteConfig.phoneDisplay),
  whatsappHref: filled(siteConfig.whatsapp) ? `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}` : undefined,
  email: filled(siteConfig.email),
  mailHref: filled(siteConfig.email) ? `mailto:${siteConfig.email}` : undefined,
  calendarUrl: filled(siteConfig.calendarUrl),
};
