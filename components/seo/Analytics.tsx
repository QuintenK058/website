import Script from 'next/script';
import { ConsentBanner } from './ConsentBanner';

/** Plausible (cookieloos) of GA4 met Consent Mode v2. Standaard UIT. */
export function Analytics() {
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const ga4 = process.env.NEXT_PUBLIC_GA4_ID;
  return (
    <>
      {plausible && <Script defer data-domain={plausible} src="https://plausible.io/js/script.js" strategy="afterInteractive" />}
      {ga4 && (
        <>
          <Script id="ga4-consent" strategy="afterInteractive">{`
            window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
            gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
            try{if(localStorage.getItem('qk-consent')==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}
            gtag('js',new Date());gtag('config','${ga4}');
          `}</Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="afterInteractive" />
          <ConsentBanner />
        </>
      )}
    </>
  );
}
