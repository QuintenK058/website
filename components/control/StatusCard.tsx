import { Panel } from './Panel';

const rows = [
  { k: 'Uptime', v: '99,9%', accent: true },
  { k: 'SSL', v: 'geldig · 74 dgn' },
  { k: 'PHP', v: '8.3 · OK' },
  { k: 'Back-up', v: 'vannacht 03:00' },
];

export function StatusCard({ className }: { className?: string }) {
  return (
    <Panel title="Status" className={className}>
      <ul className="grid gap-2">
        {rows.map((r) => (
          <li key={r.k} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[var(--radius-panel)] border border-line bg-surface-2 px-3 py-2.5 text-sm">
            <span className="dot" aria-hidden="true" />
            <span>{r.k}</span>{' '}
            <span className={`font-mono text-xs tabular-nums ${r.accent ? 'text-accent' : 'text-muted'}`}>{r.v}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
