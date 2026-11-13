import Image from 'next/image';
import { slot } from '@/content/images';
import { slotFile } from '@/lib/images';

/**
 * Afbeelding uit de manifest. Ontbreekt het bestand: console-placeholder in de
 * site-stijl met een mono-label, nooit een kapotte afbeelding. Vaste ratio (geen CLS).
 */
export function ImageSlot({ id, sizes = '100vw', priority = false, className = '', fit = 'cover' }: { id: string; sizes?: string; priority?: boolean; className?: string; fit?: 'cover' | 'contain' }) {
  const s = slot(id);
  const file = slotFile(id);
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: `${s.width} / ${s.height}` }}>
      {file ? (
        <Image src={file.url} alt={s.alt} fill sizes={sizes} priority={priority} className={fit === 'cover' ? 'object-cover object-top' : 'object-contain'} />
      ) : (
        <div role="img" aria-label={`Afbeelding volgt: ${s.alt}`} className="absolute inset-0 flex flex-col bg-[repeating-linear-gradient(135deg,#0d0f12_0_14px,#121418_14px_28px)]">
          <div className="flex items-center gap-1.5 border-b border-line bg-surface/80 px-3 py-2" aria-hidden="true">
            <i className="size-2 rounded-full bg-line-2" /><i className="size-2 rounded-full bg-line-2" /><i className="size-2 rounded-full bg-line-2" />
          </div>
          <div className="flex flex-1 items-center justify-center p-4 text-center">
            <span className="mono-label text-[10px] text-muted" aria-hidden="true">[IMG] {s.label}</span>
          </div>
        </div>
      )}
    </div>
  );
}
