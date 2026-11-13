/**
 * POST /api/lead: verwerkt Online Check- en contactformulieren.
 * - Resend (RESEND_API_KEY + LEAD_TO_EMAIL) of Formspree (FORMSPREE_ENDPOINT)
 * - Honeypot (veld "bedrijfswebsite") en tijdcheck (te snel = bot)
 * - Rate-limit: 5 per 10 min per IP (geheugen per instance; Upstash optioneel)
 * - JSON (fetch) → JSON-antwoord; gewone POST (zonder JS) → redirect
 */
import { NextResponse } from 'next/server';

const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

async function rateLimited(ip: string): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    try {
      const key = `qk:lead:${ip}`;
      const r = await fetch(`${url}/pipeline`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify([['INCR', key], ['EXPIRE', key, String(WINDOW / 1000), 'NX']]),
      });
      const data = (await r.json()) as { result: number }[];
      return (data[0]?.result ?? 0) > LIMIT;
    } catch {
      /* val terug op geheugen */
    }
  }
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  list.push(now);
  hits.set(ip, list);
  return list.length > LIMIT;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

export async function POST(req: Request) {
  const isJson = (req.headers.get('content-type') ?? '').includes('application/json');
  const raw: Record<string, string> = isJson
    ? await req.json()
    : Object.fromEntries([...(await req.formData()).entries()].map(([k, v]) => [k, String(v)]));
  const form = raw.formulier === 'online-check' ? 'online-check' : 'contact';
  const back = (status: 'ok' | 'error', code?: string) =>
    isJson
      ? NextResponse.json({ ok: status === 'ok', code }, { status: status === 'ok' ? 200 : code === 'rate' ? 429 : 400 })
      : NextResponse.redirect(new URL(status === 'ok' ? `/bedankt?formulier=${form}` : `/${form}?fout=${code ?? 'onbekend'}`, req.url), 303);

  // Honeypot + tijdcheck: stil "ok" teruggeven aan bots
  if (raw.bedrijfswebsite) return back('ok');
  const started = Number(raw.ts);
  if (started && Date.now() - started < 2500) return back('ok');

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'onbekend';
  if (await rateLimited(ip)) return back('error', 'rate');

  const required = form === 'online-check' ? ['naam', 'bedrijf', 'website', 'email', 'vraag'] : ['naam', 'email', 'bericht'];
  for (const k of required) if (!raw[k]?.trim()) return back('error', 'velden');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.email)) return back('error', 'email');
  if (!raw.privacy) return back('error', 'privacy');

  const fields = Object.entries(raw).filter(([k]) => !['bedrijfswebsite', 'ts', 'privacy', 'formulier'].includes(k));
  const subject = `${form === 'online-check' ? 'Online Check' : 'Contact'}: ${raw.naam}${raw.bedrijf ? ` (${raw.bedrijf})` : ''}`;
  const html = `<h2>${esc(subject)}</h2><table>${fields.map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`).join('')}</table>`;

  try {
    if (process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL) {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: process.env.LEAD_FROM_EMAIL || 'QK Website <onboarding@resend.dev>', to: [process.env.LEAD_TO_EMAIL], reply_to: raw.email, subject, html }),
      });
      if (!r.ok) throw new Error(`Resend ${r.status}`);
      return back('ok');
    }
    if (process.env.FORMSPREE_ENDPOINT) {
      const r = await fetch(process.env.FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ _subject: subject, ...Object.fromEntries(fields) }),
      });
      if (!r.ok) throw new Error(`Formspree ${r.status}`);
      return back('ok');
    }
    return back('error', 'niet-geconfigureerd');
  } catch (e) {
    console.error('[lead]', e);
    return back('error', 'verzenden');
  }
}
