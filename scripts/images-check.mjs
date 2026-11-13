// Laat zien welke afbeeldingsslots nog een placeholder hebben.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { slots } from '../content/images.ts';
const root = new URL('../public/images/', import.meta.url).pathname;
let missing = 0, mismatch = 0;
console.log('Slot'.padEnd(36), 'Bestand'.padEnd(52), 'Status');
for (const s of slots) {
  const ok = existsSync(join(root, s.src));
  if (!ok) missing++;
  if (ok !== (s.status === 'ready')) mismatch++;
  console.log(s.id.padEnd(36), ('public/images/' + s.src).padEnd(52), ok ? '✓ aanwezig' : '· placeholder', ok !== (s.status === 'ready') ? `(status in manifest: ${s.status})` : '');
}
console.log(`\n${slots.length - missing}/${slots.length} aanwezig, ${missing} placeholder(s).${mismatch ? ` Let op: ${mismatch} slot(s) hebben een status die niet klopt met het bestand.` : ''}`);
