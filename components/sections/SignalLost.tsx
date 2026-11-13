/** "Signaal verloren": sinus die wegvalt in ruis (pure SVG/CSS; stil bij reduced motion). */
export function SignalLost() {
  const pts = Array.from({ length: 121 }, (_, i) => {
    const x = i * 5;
    const fade = Math.max(0, 1 - i / 70);
    const noise = i > 55 ? (Math.sin(i * 12.9898) * 43758.5453) % 1 : 0;
    const y = 50 + Math.sin(i / 4) * 30 * fade + noise * 18 * (i / 120);
    return `${i ? 'L' : 'M'}${x} ${y.toFixed(1)}`;
  }).join(' ');
  return (
    <svg viewBox="0 0 600 100" className="h-24 w-full max-w-2xl" aria-hidden="true">
      <path d={pts} fill="none" stroke="var(--color-accent)" strokeWidth="2" className="motion-loop [stroke-dasharray:900] [animation:signal_3s_ease-in-out_1_forwards]" />
      <line x1="0" y1="50" x2="600" y2="50" stroke="var(--color-line)" strokeDasharray="4 6" />
    </svg>
  );
}
