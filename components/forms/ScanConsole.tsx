'use client';

/** Geanimeerde "scan"-bevestiging na de Online Check (decoratief; aria-hidden). */
import { useEffect, useState } from 'react';

export function ScanConsole({ website }: { website: string }) {
  const host = website.replace(/^https?:\/\//, '').replace(/\/.*$/, '') || 'jouwbedrijf.nl';
  const lines = [
    `> qk scan ${host}`,
    '  aanvraag ontvangen .............. OK',
    '  snelheid & core web vitals ...... in wachtrij',
    '  beveiliging & PHP/plugins ....... in wachtrij',
    '  google bedrijfsprofiel .......... in wachtrij',
    '  ai-zichtbaarheid (4 assistenten)  in wachtrij',
    '  rapport: 3 verbeterpunten ........ binnen 2 werkdagen',
    '> status: SCAN GEPLAND ✓',
  ];
  const [n, setN] = useState(lines.length);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setN(0);
    const id = setInterval(() => setN((x) => (x >= lines.length ? (clearInterval(id), x) : x + 1)), 380);
    return () => clearInterval(id);
  }, [lines.length]);
  return (
    <div className="panel" aria-hidden="true">
      <div className="panel-in">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
          <i className="size-2.5 rounded-full bg-line-2" /><i className="size-2.5 rounded-full bg-line-2" /><i className="size-2.5 rounded-full bg-line-2" />
          <span className="mono-label ml-auto text-[10px] text-muted">qk://online-check</span>
        </div>
        <pre className="min-h-[230px] p-5 font-mono text-[13px] leading-[1.8] whitespace-pre-wrap text-muted">
          {lines.slice(0, n).map((l, i) => <div key={i} className={i === 0 || i === lines.length - 1 ? 'text-accent' : ''}>{l}</div>)}
          <span className="inline-block h-[13px] w-[7px] animate-blink bg-accent align-[-2px]" />
        </pre>
      </div>
    </div>
  );
}
