/**
 * AFBEELDINGEN: centrale manifest. Zet een bestand in /public/images/<src>
 * en zet status op 'ready'. Ontbreekt het bestand, dan toont de site een
 * console-placeholder in de site-stijl (nooit een kapotte afbeelding).
 * Controle: npm run images:check
 */
export type Slot = {
  id: string;
  src: string; // pad binnen /public/images
  alt: string;
  width: number;
  height: number;
  status: 'placeholder' | 'ready';
  label: string; // tekst in de placeholder
  where: string; // waar de afbeelding gebruikt wordt (README)
  note?: string;
};

const caseSlots = (slug: string, name: string, extra = ''): Slot[] => [
  { id: `case-${slug}-desktop`, src: `cases/${slug}/desktop.png`, alt: `Homepage van de website van ${name} op desktop`, width: 2880, height: 1800, status: 'placeholder', label: `Screenshot ${name}, desktop 16:10`, where: 'Case-kaart, case-detail (device-frame)', note: `Screenshot van de live site${extra}` },
  { id: `case-${slug}-mobile`, src: `cases/${slug}/mobile.png`, alt: `De website van ${name} op een smartphone`, width: 1170, height: 2532, status: 'placeholder', label: `Screenshot ${name}, mobiel`, where: 'Case-detail (device-frame)', note: `Screenshot van de live site${extra}` },
  { id: `case-${slug}-hero`, src: `cases/${slug}/hero.jpg`, alt: `Sfeerbeeld van ${name}`, width: 2400, height: 1500, status: 'placeholder', label: `Foto ${name}, 16:10`, where: 'Case-detail header, image-displacement hover', note: `Eigen foto van de klant, met toestemming${extra}` },
];

export const slots: Slot[] = [
  { id: 'quinten-portret', src: 'team/quinten-portret.jpg', alt: 'Portret van Quinten, oprichter van QK Commerce Solutions', width: 1600, height: 2000, status: 'placeholder', label: 'Foto Quinten, portret 4:5', where: 'Home "Ik kom gewoon langs", Over ons, Person-schema', note: 'Rustige achtergrond; mag een donkere duotone krijgen' },
  { id: 'quinten-werk', src: 'team/quinten-aan-het-werk.jpg', alt: 'Quinten aan het werk met een laptop bij een klant', width: 2400, height: 1600, status: 'placeholder', label: 'Foto Quinten aan het werk, 3:2', where: 'Over ons, Werkwijze', note: 'Laptop, op locatie of op kantoor' },
  { id: 'quinten-workshop', src: 'team/quinten-workshop.jpg', alt: 'Quinten geeft een AI-workshop aan een team', width: 2400, height: 1600, status: 'placeholder', label: 'Foto AI-workshop, 3:2', where: '/diensten/ai/workshops, AI-tab op /pakketten', note: 'Pas plaatsen na een echte workshop' },
  ...caseSlots('lado-bridal', 'Lado Bridal'),
  ...caseSlots('crossing-of-limits', 'Crossing of Limits'),
  ...caseSlots('miedema-groep', 'Miedema Groep', '; alleen met akkoord van Miedema'),
  ...caseSlots('miedema-webshop', 'Miedema Bouwmaterialen', '; alleen met akkoord van Miedema').filter((s) => !s.id.endsWith('hero')),
  { id: 'case-wierenga-de-graaf-desktop', src: 'cases/wierenga-de-graaf/concept-desktop.png', alt: 'Concept voor de nieuwe website van Wierenga & De Graaf op desktop', width: 2880, height: 1800, status: 'placeholder', label: 'Concept Wierenga & De Graaf, desktop', where: 'Case-kaart en detail, label "Concept"', note: 'Screenshot van het concept, niet van de live site' },
  { id: 'case-wierenga-de-graaf-mobile', src: 'cases/wierenga-de-graaf/concept-mobile.png', alt: 'Concept voor de nieuwe website van Wierenga & De Graaf op mobiel', width: 1170, height: 2532, status: 'placeholder', label: 'Concept Wierenga & De Graaf, mobiel', where: 'Case-detail', note: 'Screenshot van het concept' },
  ...['lado-bridal', 'crossing-of-limits', 'miedema-groep', 'miedema-webshop'].map((slug) => ({ id: `case-${slug}-logo`, src: `cases/${slug}/logo.svg`, alt: `Logo van ${slug.replace(/-/g, ' ')}`, width: 240, height: 80, status: 'placeholder' as const, label: 'Logo klant', where: 'Case-kaart', note: 'Alleen met akkoord van de klant' })),
  { id: 'logo', src: 'brand/logo-qk.svg', alt: 'QK Commerce Solutions', width: 220, height: 40, status: 'placeholder', label: 'Logo QK', where: 'Header, footer', note: 'Definitief logo; tot dan het tijdelijke QK-monogram' },
  { id: 'logo-mono', src: 'brand/logo-qk-mono.svg', alt: 'QK', width: 40, height: 40, status: 'placeholder', label: 'Monogram QK', where: 'Loader, mobiel', note: 'Compacte variant' },
  { id: 'favicon', src: 'brand/favicon.svg', alt: '', width: 64, height: 64, status: 'placeholder', label: 'Favicon', where: '<head>', note: 'Vervangt app/icon.svg (kopieer ernaar)' },
  { id: 'apple-touch-icon', src: 'brand/apple-touch-icon.png', alt: '', width: 180, height: 180, status: 'placeholder', label: 'Apple touch icon', where: '<head>', note: 'Vervangt app/apple-icon.png (kopieer ernaar)' },
  ...['leeuwarden', 'friesland', 'sneek', 'drachten', 'heerenveen', 'groningen'].map((r) => ({ id: `regio-${r}`, src: `regio/${r}.jpg`, alt: `Foto van ${r[0].toUpperCase() + r.slice(1)}`, width: 2400, height: 1200, status: 'placeholder' as const, label: `Foto ${r[0].toUpperCase() + r.slice(1)}, 2:1`, where: `Header /regio/${r} (optioneel)`, note: 'Eigen foto; de pagina werkt ook zonder' })),
  ...['php-8-2-stopt-eind-2026', 'wat-kost-een-website-in-2026', 'gevonden-worden-in-chatgpt-lokaal-bedrijf', 'veilig-ai-gebruiken-in-je-bedrijf', 'webshop-laten-beheren-wat-levert-het-op'].map((a) => ({ id: `cover-${a}`, src: `kennisbank/${a}-cover.jpg`, alt: `Illustratie bij het artikel`, width: 1600, height: 900, status: 'placeholder' as const, label: 'Artikelcover 16:9', where: `/kennisbank/${a}`, note: 'Mag een graphic in de site-stijl zijn' })),
  { id: 'og-default', src: 'og/default.png', alt: 'QK Commerce Solutions', width: 1200, height: 630, status: 'placeholder', label: 'OG-afbeelding', where: 'Social sharing (fallback)', note: 'De automatische OG-generator blijft; dit is alleen de fallback' },
];

export const slot = (id: string) => {
  const s = slots.find((x) => x.id === id);
  if (!s) throw new Error(`Onbekend afbeeldingsslot: ${id}`);
  return s;
};
