/** Afgeleide weergaven van diensten (vanaf-prijs met eenheid, "Zit in"). */
import { lines, lineHref, type Line } from '@/content/services';
import { pkg, formatPriceLong } from '@/content/pricing';

export const lineFromPrice = (l: Line) => formatPriceLong(pkg(l.fromId).price).replace(/^€/, 'vanaf €').replace(/^vanaf vanaf/, 'vanaf');
export const lineInBundles = (l: Line) => {
  const names = l.inBundles.map((id) => pkg(id).name.replace(/^Ontzorgd /, ''));
  return `${l.inLabel ?? 'Zit in'}: Ontzorgd ${names.join(' / ')}`;
};
export const railItems = () =>
  lines.map((l) => ({
    id: l.id,
    index: l.index,
    name: l.name,
    mono: l.name.toUpperCase(),
    icon: l.icon,
    headline: l.headline,
    bullets: l.subpages.length >= 3 ? l.subpages.slice(0, 4).map((s) => s.name) : l.packageIds.slice(0, 4).map((id) => pkg(id).name),
    price: lineFromPrice(l),
    inBundles: lineInBundles(l),
    href: lineHref(l.id),
  }));
