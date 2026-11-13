'use client';

/** ConnectionMap: nodes + SVG-lijnen met bewegende datapulsen (SMIL). Pauzeerbaar; stil bij reduced motion. */
import { useEffect, useRef, useState } from 'react';
import { mq } from '@/lib/motion';

const nodes = [
  { id: 'google', label: 'GOOGLE', x: 150, y: 80 },
  { id: 'meta', label: 'META', x: 150, y: 300 },
  { id: 'shop', label: 'SHOPIFY / MAGENTO', x: 750, y: 80 },
  { id: 'ai', label: 'AI-ASSISTENT', x: 750, y: 300 },
  { id: 'crm', label: 'CRM / ERP', x: 450, y: 38 },
  { id: 'mail', label: 'E-MAIL', x: 450, y: 342 },
];
const edges = [
  'M450 190 C 320 190, 260 80, 150 80',
  'M450 190 C 320 190, 260 300, 150 300',
  'M450 190 C 580 190, 640 80, 750 80',
  'M450 190 C 580 190, 640 300, 750 300',
  'M450 190 L 450 60',
  'M450 190 L 450 320',
];

export function ConnectionMap() {
  const ref = useRef<SVGSVGElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const r = matchMedia(mq.reduce).matches;
    setReduce(r);
    if (r) ref.current?.pauseAnimations();
  }, []);
  useEffect(() => {
    if (!ref.current) return;
    if (paused || reduce) ref.current.pauseAnimations();
    else ref.current.unpauseAnimations();
  }, [paused, reduce]);
  return (
    <div className="panel" data-reveal>
      <div className="panel-in p-4 md:p-8">
        <div className="mb-2 flex justify-end">
          {!reduce && (
            <button type="button" onClick={() => setPaused((p) => !p)} aria-pressed={paused} className="mono-label cursor-pointer rounded-full border border-line px-3 py-1 text-[10px] text-muted hover:text-ink">
              {paused ? '▶ Speel' : '❚❚ Pauze'}
            </button>
          )}
        </div>
        <svg ref={ref} viewBox="0 0 900 380" className="block h-auto w-full" role="img" aria-label="Je website in het midden, gekoppeld aan Google, Meta, Shopify of Magento, AI-assistenten, e-mail en CRM of ERP">
          {edges.map((d, i) => <path key={i} id={`edge-${i}`} d={d} fill="none" stroke="var(--color-line-2)" strokeWidth="1.4" />)}
          {edges.map((_, i) => (
            <circle key={`p${i}`} r="4" fill="var(--color-accent)" style={{ filter: 'drop-shadow(0 0 6px var(--color-accent))' }}>
              <animateMotion dur={`${2.2 + (i % 3) * 0.4}s`} repeatCount="indefinite" {...(i % 2 ? { keyPoints: '1;0', keyTimes: '0;1', calcMode: 'linear' } : {})}>
                <mpath href={`#edge-${i}`} />
              </animateMotion>
            </circle>
          ))}
          <g>
            <rect x="370" y="158" width="160" height="64" rx="12" fill="var(--color-surface)" stroke="var(--color-accent)" />
            <text x="450" y="186" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="13" letterSpacing="1">WEBSITE</text>
            <text x="450" y="204" textAnchor="middle" fill="var(--color-muted)" fontFamily="var(--font-mono)" fontSize="10">jouwbedrijf.nl</text>
          </g>
          {nodes.map((n) => {
            const w = n.label.length > 12 ? 200 : 170;
            return (
              <g key={n.id}>
                <rect x={n.x - w / 2} y={n.y - 24} width={w} height="48" rx="12" fill="var(--color-surface)" stroke="var(--color-line-2)" />
                <text x={n.x} y={n.y + 5} textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="12.5" letterSpacing="1">{n.label}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
