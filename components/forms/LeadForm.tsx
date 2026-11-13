'use client';

/**
 * Lead-formulier. Zonder JS: gewone POST naar /api/lead (redirect naar /bedankt).
 * Met JS: validatie per veld, fetch, en bij de Online Check een geanimeerde
 * scan in console-stijl (met tekstuele succesmelding voor schermlezers).
 */
import { useEffect, useRef, useState } from 'react';
import { ScanConsole } from './ScanConsole';
import { contactOptionFor } from '@/content/pricing';

export type Field = { name: string; label: string; type?: 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'select'; required?: boolean; autoComplete?: string; placeholder?: string; options?: string[]; half?: boolean; hint?: string };

const msgs: Record<string, string> = {
  velden: 'Niet alle verplichte velden zijn ingevuld.',
  email: 'Controleer je e-mailadres.',
  privacy: 'Geef akkoord voor het gebruik van je gegevens.',
  rate: 'Je hebt al een paar keer iets verstuurd. Probeer het over 10 minuten opnieuw.',
  'niet-geconfigureerd': 'Het formulier is nog niet gekoppeld.',
  verzenden: 'Het versturen is niet gelukt.',
  onbekend: 'Er ging iets mis.',
};

export function LeadForm({ form, fields, submitLabel, successTitle, successText, scan = false, fallback, prefill }: { form: 'online-check' | 'contact'; fields: Field[]; submitLabel: string; successTitle: string; successText: string; scan?: boolean; fallback?: string; prefill?: boolean }) {
  const ref = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [error, setError] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState<Record<string, string>>({});
  const tsRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (tsRef.current) tsRef.current.value = String(Date.now());
    const p = new URLSearchParams(location.search);
    const fout = p.get('fout');
    if (fout) {
      setState('error');
      setError(msgs[fout] ?? msgs.onbekend);
    }
    if (prefill) {
      const pakket = p.get('pakket');
      const dienst = p.get('dienst');
      if (pakket || dienst) setValues({ pakket: pakket ? contactOptionFor(pakket) : '', bericht: pakket ? `Ik heb interesse in ${pakket}.` : `Ik heb interesse in ${dienst}.` });
    }
  }, [prefill]);

  const validate = (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
    let m = '';
    if (el.validity.valueMissing) m = el.type === 'checkbox' ? 'Geef akkoord om te versturen.' : 'Dit veld is verplicht.';
    else if (el.validity.typeMismatch) m = el.type === 'email' ? 'Vul een geldig e-mailadres in, bijv. naam@bedrijf.nl.' : 'Vul een volledig webadres in, bijv. https://jouwbedrijf.nl.';
    setErrors((e) => ({ ...e, [el.name]: m }));
    return !m;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = ref.current!;
    f.querySelectorAll<HTMLInputElement>('input[type=url]').forEach((u) => {
      if (u.value && !/^https?:\/\//i.test(u.value)) u.value = 'https://' + u.value.trim();
    });
    const els = Array.from(f.querySelectorAll<HTMLInputElement>('input:not([type=hidden]):not([tabindex="-1"]), textarea, select'));
    const bad = els.filter((el) => !validate(el));
    if (bad.length) {
      bad[0].focus();
      return;
    }
    setState('sending');
    const data = Object.fromEntries(new FormData(f).entries());
    try {
      const r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const j = (await r.json().catch(() => ({}))) as { ok?: boolean; code?: string };
      if (!r.ok || !j.ok) throw new Error(j.code ?? 'onbekend');
      setState('ok');
    } catch (err) {
      setState('error');
      setError(msgs[(err as Error).message] ?? msgs.onbekend);
    }
  };

  if (state === 'ok') {
    return (
      <div className="grid gap-6">
        <div role="status" className="rounded-[var(--radius-card)] border border-ok/40 bg-ok/10 p-6" tabIndex={-1} ref={(el) => el?.focus()}>
          <p className="text-xl font-bold">{successTitle}</p>
          <p className="mt-2 text-ink-2">{successText}</p>
        </div>
        {scan && <ScanConsole website={values.website ?? ''} />}
      </div>
    );
  }

  const base = 'w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-ink placeholder:text-muted/70 transition-colors focus:border-accent aria-[invalid=true]:border-danger';
  return (
    <form ref={ref} method="POST" action="/api/lead" onSubmit={onSubmit} noValidate className="grid gap-5">
      <input type="hidden" name="formulier" value={form} />
      <input type="hidden" name="ts" ref={tsRef} defaultValue="" />
      <div className="hidden" aria-hidden="true"><label>Laat leeg <input type="text" name="bedrijfswebsite" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => {
          const id = `${form}-${f.name}`;
          const err = errors[f.name];
          const describedBy = [f.hint ? `${id}-hint` : '', `${id}-err`].filter(Boolean).join(' ');
          const common = { id, name: f.name, required: f.required, 'aria-invalid': err ? true : undefined, 'aria-describedby': describedBy, onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => e.target.value && validate(e.target), className: base };
          return (
            <div key={f.name} className={`grid content-start gap-1.5 ${f.half ? '' : 'sm:col-span-2'}`}>
              <label htmlFor={id} className="text-sm font-semibold">
                {f.label} {f.required ? <span className="text-danger" aria-hidden="true">*</span> : <span className="font-normal text-muted">(optioneel)</span>}
              </label>
              {f.type === 'textarea' ? (
                <textarea {...common} rows={5} placeholder={f.placeholder} defaultValue={values[f.name]} key={values[f.name]} />
              ) : f.type === 'select' ? (
                <select {...common} defaultValue={values[f.name] ?? ''} key={values[f.name]}>
                  <option value="">Maak een keuze</option>
                  {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input {...common} type={f.type ?? 'text'} autoComplete={f.autoComplete} placeholder={f.placeholder} onChange={(e) => f.name === 'website' && setValues((v) => ({ ...v, website: e.target.value }))} />
              )}
              {f.hint && <p id={`${id}-hint`} className="text-xs text-muted">{f.hint}</p>}
              <p id={`${id}-err`} className="text-sm text-danger" aria-live="polite">{err}</p>
            </div>
          );
        })}
      </div>
      <div className="grid gap-1.5">
        <label className="flex items-start gap-3 text-sm text-muted">
          <input type="checkbox" name="privacy" value="akkoord" required id={`${form}-privacy`} aria-describedby={`${form}-privacy-err`} className="mt-1 size-5 accent-[var(--color-accent)]" onChange={(e) => validate(e.target)} />
          <span>Ik ga akkoord dat QK Commerce Solutions mijn gegevens gebruikt om contact met mij op te nemen. Zie de <a href="/privacy" className="text-accent underline">privacyverklaring</a>. <span className="text-danger" aria-hidden="true">*</span></span>
        </label>
        <p id={`${form}-privacy-err`} className="text-sm text-danger" aria-live="polite">{errors.privacy}</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === 'sending'} className="btn btn-primary cursor-pointer disabled:cursor-wait disabled:opacity-70">{state === 'sending' ? 'Versturen…' : submitLabel}</button>
        <p className="text-sm text-muted">Velden met <span className="text-danger">*</span> zijn verplicht.</p>
      </div>
      <div role="alert" aria-live="assertive">
        {state === 'error' && (
          <div className="rounded-[var(--radius-card)] border border-danger/40 bg-danger/10 p-5">
            <p className="font-semibold">{error}</p>
            <p className="mt-1 text-sm text-muted">Je gegevens staan er nog. Probeer het opnieuw{fallback ? `, of neem direct contact op via ${fallback}` : ''}.</p>
          </div>
        )}
      </div>
    </form>
  );
}
