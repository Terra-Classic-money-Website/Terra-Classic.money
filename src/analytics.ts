const GA_MEASUREMENT_ID = "G-1C1F7WX5CS";
const PRODUCTION_HOSTS = new Set(["terra-classic.money", "www.terra-classic.money"]);

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let analyticsInitialized = false;

export function initializeAnalytics() {
  if (analyticsInitialized || typeof window === "undefined") return;
  if (!PRODUCTION_HOSTS.has(window.location.hostname)) return;

  analyticsInitialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.append(script);
}
