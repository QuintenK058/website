import { Panel } from './Panel';
import { Icon } from '@/components/ui/Icon';

const items = ['Accounts op jouw naam', 'Back-ups dagelijks', 'AVG-proof ingericht', 'Na 3 maanden maandelijks opzegbaar', 'Rapport van één pagina', 'Niet tevreden? Geld terug'];

export function GovernancePanel({ className }: { className?: string }) {
  return (
    <Panel title="Spelregels" demo={false} right={<span className="mono-label text-[10px] text-accent">GOVERNANCE</span>} className={className}>
      <ul className="grid gap-2.5 text-sm sm:grid-cols-2">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-2.5">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent"><Icon name="check" size={13} /></span>
            {i}
          </li>
        ))}
      </ul>
    </Panel>
  );
}
