import Script from "next/script";
import { siteConfig } from "@/site.config";

export function Analytics() {
  const { umamiWebsiteId, umamiScriptUrl, plausibleDomain } = siteConfig.analytics;

  return (
    <>
      {umamiWebsiteId ? (
        <Script
          defer
          src={umamiScriptUrl || "https://cloud.umami.is/script.js"}
          data-website-id={umamiWebsiteId}
          strategy="afterInteractive"
        />
      ) : null}
      {plausibleDomain ? (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}