import type { ReactNode } from 'react';

export function DemoLabel() {
  return <span className="mono-label rounded-full border border-line px-2 py-0.5 text-[10px] text-muted">Voorbeeldweergave</span>;
}

/** Glas-paneel met gradientrand; title in mono. */
export function Panel({ title, children, demo = true, className = '', right }: { title: string; children: ReactNode; demo?: boolean; className?: string; right?: ReactNode }) {
  return (
    <div className={`panel panel-glow ${className}`} data-reveal>
      <div className="panel-in grid content-start gap-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="mono-label text-[11px] text-muted">{title}</span>{' '}
          {right ?? (demo ? <DemoLabel /> : null)}
        </div>
        {children}
      </div>
    </div>
  );
}
