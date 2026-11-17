import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

const font = (f: string) => readFile(join(process.cwd(), 'assets/fonts', f));

/** OG-afbeelding in de stijl van de site. */
export async function renderOg({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  const [bold, mono] = await Promise.all([font('Geist-Bold.ttf'), font('GeistMono-Regular.ttf')]);
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: '#0a0b0d', backgroundImage: 'radial-gradient(ellipse 70% 60% at 85% 0%, rgba(77,225,255,0.28), transparent 65%), radial-gradient(ellipse 50% 50% at 0% 100%, rgba(122,92,255,0.18), transparent 65%)', color: '#edeff2', fontFamily: 'Geist' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30 }}>
            <svg width="56" height="56" viewBox="0 0 40 40"><rect x="1" y="1" width="38" height="38" rx="9.5" fill="none" stroke="#31353b" strokeWidth="1.2" /><path d="M15.2 12a8 8 0 1 0 0 16 8 8 0 1 0 0-16M18.6 23.4l3 3" fill="none" stroke="#4de1ff" strokeWidth="2.8" strokeLinecap="round" /><path d="M26.6 11.8v16.4M32.8 11.8l-6 8.2 6 8.2" fill="none" stroke="#edeff2" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span>QK Commerce</span>
            <span style={{ color: '#9aa0a8' }}>Solutions</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'GeistMono', fontSize: 20, color: '#3ddc97' }}>
            <div style={{ width: 10, height: 10, borderRadius: 10, background: '#3ddc97' }} />SYS: ONLINE
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontFamily: 'GeistMono', fontSize: 24, color: '#4de1ff', letterSpacing: 2 }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 48 ? 64 : 80, lineHeight: 1, letterSpacing: -3, maxWidth: 1000 }}>{title}</div>
          {sub && <div style={{ fontSize: 30, color: '#9aa0a8', maxWidth: 950 }}>{sub}</div>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'GeistMono', fontSize: 20, color: '#9aa0a8' }}>
          <span>LEEUWARDEN · FRIESLAND · ONLINE</span>
          <span>qkcommerce.nl</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: 'Geist', data: bold, weight: 700, style: 'normal' }, { name: 'GeistMono', data: mono, weight: 400, style: 'normal' }] },
  );
}
