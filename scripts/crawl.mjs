// Start `next start`, crawlt alle interne links vanaf / en de sitemap,
// en meldt 404's, ontbrekende ankers en ongeldige JSON-LD.
// Gebruik: npm run build && npm run check
import { spawn } from 'node:child_process';

const PORT = 3456;
const BASE = `http://localhost:${PORT}`;
const server = spawn('npx', ['next', 'start', '-p', String(PORT)], { stdio: 'ignore', detached: true });
const stop = (code) => { try { process.kill(-server.pid); } catch {} process.exit(code); };

const required = {
  Organization: ['name', 'url'], ProfessionalService: ['name', 'address'], WebSite: ['name', 'url'],
  WebPage: ['url', 'name'], AboutPage: ['url', 'name'], ContactPage: ['url', 'name'], CollectionPage: ['url', 'name'],
  Service: ['name', 'provider'], OfferCatalog: ['name', 'itemListElement'], FAQPage: ['mainEntity'],
  BreadcrumbList: ['itemListElement'], Article: ['headline', 'datePublished', 'author', 'publisher'],
  HowTo: ['name', 'step'], Person: ['name'], CreativeWork: ['name'],
};

async function waitUp() {
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(BASE + '/'); if (r.ok) return; } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  console.error('Server start niet'); stop(1);
}

await waitUp();
const seen = new Set();
const queue = ['/'];
const from = new Map();
const problems = [];
const types = {};
const sm = await (await fetch(BASE + '/sitemap.xml')).text();
for (const m of sm.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)) { queue.push(m[1] || '/'); from.set(m[1] || '/', 'sitemap.xml'); }

while (queue.length) {
  const path = queue.shift();
  const clean = path.split('#')[0].split('?')[0] || '/';
  if (seen.has(clean)) continue;
  seen.add(clean);
  const res = await fetch(BASE + clean, { redirect: 'manual' });
  if (res.status >= 400) { problems.push(`${res.status} ${clean} (gelinkt vanaf ${from.get(clean) ?? '?'})`); continue; }
  const ct = res.headers.get('content-type') ?? '';
  if (!ct.includes('text/html')) continue;
  const html = await res.text();
  // JSON-LD
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!blocks.length && !['/bedankt'].includes(clean)) problems.push(`geen JSON-LD: ${clean}`);
  for (const b of blocks) {
    let data; try { data = JSON.parse(b[1]); } catch (e) { problems.push(`ongeldige JSON-LD ${clean}: ${e.message}`); continue; }
    if (/TODO/.test(b[1])) problems.push(`TODO in JSON-LD: ${clean}`);
    for (const n of data['@graph'] ?? [data]) for (const t of [].concat(n['@type'])) {
      types[t] = (types[t] ?? 0) + 1;
      if (!required[t]) problems.push(`onbekend type ${t} op ${clean}`);
      for (const k of required[t] ?? []) if (n[k] == null) problems.push(`${t} mist ${k} op ${clean}`);
    }
  }
  // Platte tekst: woorden die alleen ontstaan als tags zonder spatie worden weggehaald (aan elkaar geplakt)
  const body = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<template[\s\S]*?<\/template>/g, '').replace(/<svg[\s\S]*?<\/svg>/g, ' ');
  const dec = (t) => t.replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&[a-z]+;|&#\d+;/g, ' ');
  // zoals html-to-text: blok-elementen = scheiding, inline-elementen (span, a, button, strong…) niet
  const blockRe = /<\/?(div|p|h[1-6]|li|ul|ol|section|header|footer|nav|main|article|aside|dl|dt|dd|table|thead|tbody|tr|td|th|caption|br|hr|figure|figcaption|blockquote|pre|summary|details|form|fieldset|legend|address|option|select|label)\b[^>]*>/gi;
  const glued = new Set(dec(body.replace(blockRe, ' ').replace(/<[^>]+>/g, '')).split(/\s+/).filter(Boolean));
  const spaced = new Set(dec(body.replace(/<[^>]+>/g, ' ')).split(/\s+/).filter(Boolean));
  const alnum = /[\p{L}\d]/u;
  // echt aan elkaar = te splitsen in twee woorden die allebei letters/cijfers bevatten (dus niet "link" + ".")
  const stuck = [...glued].filter((w) => !spaced.has(w) && [...Array(w.length).keys()].slice(1).some((i) => spaced.has(w.slice(0, i)) && spaced.has(w.slice(i)) && alnum.test(w.slice(0, i)) && alnum.test(w.slice(i))));
  for (const w of stuck.slice(0, 40)) problems.push(`aan elkaar: "${w}" op ${clean}`);
  // H1
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) problems.push(`${h1}× <h1> op ${clean}`);
  // links
  for (const m of html.matchAll(/\shref="([^"]+)"/g)) {
    const href = m[1].replace(/&amp;/g, '&');
    if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/_next')) { queue.push(href); const k = href.split('#')[0].split('?')[0]; if (!from.has(k)) from.set(k, clean); }
    if (href.startsWith('#') && href.length > 1 && !html.includes(`id="${href.slice(1)}"`)) problems.push(`anker ${href} ontbreekt op ${clean}`);
  }
}
console.log(`Gecrawld: ${seen.size} URL's. JSON-LD-types: ${Object.entries(types).map(([k, v]) => `${k}×${v}`).join(', ')}`);
if (problems.length) { console.error(`✗ ${problems.length} probleem/problemen:\n  ` + [...new Set(problems)].join('\n  ')); stop(1); }
console.log('✓ Geen 404\'s, alle ankers aanwezig, één H1 per pagina, JSON-LD geldig.');
stop(0);
