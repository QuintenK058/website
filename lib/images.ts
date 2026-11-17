import 'server-only';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { slot, type Slot } from '@/content/images';
import { showTodos } from '@/lib/todo';

/** Bestaat het bestand van dit slot echt? (status 'ready' + bestand aanwezig) */
export function slotFile(id: string): (Slot & { url: string }) | null {
  const s = slot(id);
  const exists = existsSync(join(process.cwd(), 'public/images', s.src));
  return exists ? { ...s, url: `/images/${s.src}` } : null;
}

/** Toon dit slot? Live alleen als het bestand er is; in dev/preview ook als placeholder. */
export function showSlot(id: string): boolean {
  return !!slotFile(id) || showTodos;
}
