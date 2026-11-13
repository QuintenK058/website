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
            <div style={{ width: 56, height: 56, borderRadius: 14, border: '2px solid #31353b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, color: '#4de1ff' }}>QK</div>
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
