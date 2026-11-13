/**
 * MARKTCIJFERS: alleen met bron. Controleer de bronnen vóór livegang
 * (ze komen uit het marktonderzoek en zijn niet door de bouwer geverifieerd).
 */
export type Stat = { id: string; value: number; decimals?: number; prefix?: string; suffix: string; display: string; label: string; source: string; url: string };

export const stats: Record<string, Stat> = {
  aiUsers: { id: 'aiUsers', value: 9, suffix: ' mln', display: '8,5–9 mln', label: 'gebruikers van AI-tools in Nederland', source: 'NielsenIQ, 2026', url: 'https://nielseniq.com/global/nl/news-center/2026/sterke-groei-ai-bereik-in-nederland-bijna-9-miljoen-gebruikers-bereikt-in-2026/' },
  aiStart: { id: 'aiStart', value: 1, suffix: ' op 5', display: '1 op 5', label: 'consumenten begint een aankooporiëntatie in een AI-tool', source: 'Searchlab (Q&A-data), 2026', url: 'https://searchlab.nl/statistieken/ai-zoekgedrag-nederland-statistieken-2026' },
  outdated: { id: 'outdated', value: 30, prefix: '±', suffix: '%', display: '±30%', label: 'van de mkb-websites draait op verouderde software', source: 'IO+ / Bureau Imago, 2026', url: 'https://ioplus.nl/nl/posts/mkb-websites-lopen-risico-door-verouderde-software' },
  noTime: { id: 'noTime', value: 41, suffix: '%', display: '41%', label: 'stelt websitewerk uit door tijdgebrek (38% kosten, 30% kennis)', source: 'STRATO/YouGov via MKB Servicedesk, 2026', url: 'https://www.mkbservicedesk.nl/nieuws/ondernemersnieuws/3-op-de-10-mkb-bedrijven-hebben-geen-website' },
  aiExperience: { id: 'aiExperience', value: 71.6, decimals: 1, suffix: '%', display: '71,6%', label: 'van de microbedrijven noemt gebrek aan ervaring als drempel voor AI (privacy: 48,8%)', source: 'CBS, 2026', url: 'https://www.cbs.nl/nl-nl/longread/rapportages/2026/gebruik-van-ai-technologie-door-nederlandse-microbedrijven/6-redenen-geen-ai-technologie' },
  php: { id: 'php', value: 2026, suffix: '', display: '31-12-2026', label: 'laatste dag van beveiligingsupdates voor PHP 8.2', source: 'php.net, ondersteunde versies', url: 'https://www.php.net/supported-versions.php' },
};
