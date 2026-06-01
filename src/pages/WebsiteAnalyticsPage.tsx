import { useEffect, useState } from "react";
import { BOTTOM_GLOW_VARIANT, Footer } from "./shared";

type AnalyticsMetricValue = number | null;

type AnalyticsMetrics = {
  activeUsers: AnalyticsMetricValue;
  sessions: AnalyticsMetricValue;
  views: AnalyticsMetricValue;
  events: AnalyticsMetricValue;
};

type AnalyticsTopPage = {
  path: string;
  title: string;
  views: AnalyticsMetricValue;
  activeUsers: AnalyticsMetricValue;
};

type AnalyticsPeriod = {
  id: "30d" | "7d" | "1d";
  label: string;
  startDate: string;
  endDate: string;
  metrics: AnalyticsMetrics;
  topPages: AnalyticsTopPage[];
};

type WebsiteAnalyticsFeed = {
  version: number;
  status: "ok" | "setup_required" | "error";
  generatedAt: string | null;
  source: string;
  refresh: {
    cadence: string;
    workflow: string;
  };
  realtime: {
    activeUsers: AnalyticsMetricValue;
    windowMinutes: number;
  };
  periods: AnalyticsPeriod[];
  notices: string[];
  error?: {
    message: string;
  };
};

type FeedState =
  | { status: "loading"; feed: null; error: null }
  | { status: "ready"; feed: WebsiteAnalyticsFeed; error: null }
  | { status: "error"; feed: null; error: string };

const analyticsFeedUrl = `${import.meta.env.BASE_URL}data/website-analytics.json`;
const periodOrder = ["30d", "7d", "1d"] as const;

function isAnalyticsFeed(value: unknown): value is WebsiteAnalyticsFeed {
  if (typeof value !== "object" || value === null) return false;
  const feed = value as Partial<WebsiteAnalyticsFeed>;
  return feed.version === 1 && Array.isArray(feed.periods);
}

function formatNumber(value: AnalyticsMetricValue) {
  if (value === null) return "Pending";
  return new Intl.NumberFormat("en-US").format(value);
}

function formatGeneratedAt(value: string | null) {
  if (!value) return "Setup pending";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toUTCString();
}

function statusLabel(feedStatus: WebsiteAnalyticsFeed["status"] | FeedState["status"]) {
  if (feedStatus === "ok" || feedStatus === "ready") return "Live feed";
  if (feedStatus === "setup_required") return "Setup pending";
  if (feedStatus === "loading") return "Loading";
  return "Feed error";
}

function AnalyticsStatus({ state }: { state: FeedState }) {
  const feedStatus = state.status === "ready" ? state.feed.status : state.status;
  const generatedAt = state.status === "ready" ? state.feed.generatedAt : null;
  const generatedLabel = formatGeneratedAt(generatedAt);
  const label = statusLabel(feedStatus);

  return (
    <div className={`analytics-status analytics-status--${feedStatus}`}>
      <span className="analytics-status__dot" aria-hidden="true" />
      <span>{label}</span>
      {generatedLabel !== label && <small>{generatedLabel}</small>}
    </div>
  );
}

function MetricTile({ label, value }: { label: string; value: AnalyticsMetricValue }) {
  return (
    <div className={`analytics-metric-tile ${value === null ? "analytics-metric-tile--pending" : ""}`}>
      <dt className="tc-type-h3">{formatNumber(value)}</dt>
      <dd className="tc-type-link-normal">{label}</dd>
    </div>
  );
}

function PeriodCard({ period }: { period: AnalyticsPeriod }) {
  return (
    <article className="analytics-period-card">
      <header>
        <h2 className="tc-type-h4">{period.label}</h2>
        <p className="tc-type-body-small">{period.startDate === "today" ? "Current property day" : `${period.startDate} to ${period.endDate}`}</p>
      </header>
      <dl className="analytics-period-card__metrics">
        <MetricTile label="Active users" value={period.metrics.activeUsers} />
        <MetricTile label="Views" value={period.metrics.views} />
        <MetricTile label="Sessions" value={period.metrics.sessions} />
        <MetricTile label="Events" value={period.metrics.events} />
      </dl>
    </article>
  );
}

function RealtimePanel({ feed }: { feed: WebsiteAnalyticsFeed | null }) {
  return (
    <section className="analytics-realtime" aria-labelledby="analytics-realtime-title">
      <div>
        <span className="native-phase__badge analytics-badge">REALTIME</span>
        <h2 className="tc-type-h2" id="analytics-realtime-title">Active now</h2>
        <p className="tc-type-body">GA4 realtime reports count active users during the last {feed?.realtime.windowMinutes ?? 30} minutes. The public JSON refreshes through GitHub Actions, so this is a transparent snapshot rather than a private admin dashboard.</p>
      </div>
      <div className={`analytics-live-count ${feed?.realtime.activeUsers === null ? "analytics-live-count--pending" : ""}`}>
        <strong className="tc-type-h1">{formatNumber(feed?.realtime.activeUsers ?? null)}</strong>
        <span className="tc-type-link-big">active users</span>
      </div>
    </section>
  );
}

function TopPages({ period, selectedPeriod, onSelectPeriod }: { period: AnalyticsPeriod | null; selectedPeriod: AnalyticsPeriod["id"]; onSelectPeriod: (period: AnalyticsPeriod["id"]) => void }) {
  return (
    <section className="analytics-top-pages" aria-labelledby="analytics-top-pages-title">
      <header className="analytics-section-head">
        <div>
          <h2 className="tc-type-h2" id="analytics-top-pages-title">Top pages</h2>
          <p className="tc-type-body">A privacy-preserving view of where attention is going on terra-classic.money.</p>
        </div>
        <div className="analytics-period-tabs" aria-label="Select top pages period">
          {periodOrder.map((periodId) => (
            <button className="tc-type-link-small" type="button" aria-pressed={selectedPeriod === periodId} onClick={() => onSelectPeriod(periodId)} key={periodId}>
              {periodId.toUpperCase()}
            </button>
          ))}
        </div>
      </header>
      <div className="analytics-page-list">
        {period && period.topPages.length > 0 ? period.topPages.map((item, index) => (
          <article className="analytics-page-row" key={`${item.path}-${index}`}>
            <span className="analytics-page-row__rank tc-type-link-small">{String(index + 1).padStart(2, "0")}</span>
            <span className="analytics-page-row__copy">
              <strong className="tc-type-h5">{item.title}</strong>
              <small className="tc-type-body-small">{item.path}</small>
            </span>
            <span className="analytics-page-row__metric">
              <strong className="tc-type-link-big">{formatNumber(item.views)}</strong>
              <small className="tc-type-body-very-small">views</small>
            </span>
            <span className="analytics-page-row__metric">
              <strong className="tc-type-link-big">{formatNumber(item.activeUsers)}</strong>
              <small className="tc-type-body-very-small">users</small>
            </span>
          </article>
        )) : (
          <div className="analytics-empty-state">
            <h3 className="tc-type-h4">No public page data yet</h3>
            <p className="tc-type-body">The analytics feed is not connected yet, or GA4 has not returned enough page data for this period.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Methodology({ feed }: { feed: WebsiteAnalyticsFeed | null }) {
  const notices = feed?.notices?.length ? feed.notices : [
    "The page reads a static JSON file generated by GitHub Actions.",
    "No Google Analytics service-account key is exposed to visitors.",
    "Only aggregate reporting values are published.",
  ];

  return (
    <section className="analytics-methodology" aria-labelledby="analytics-methodology-title">
      <div>
        <h2 className="tc-type-h2" id="analytics-methodology-title">How this feed works</h2>
        <p className="tc-type-h4">Google Analytics stays private. The public website only receives a small static JSON snapshot generated by GitHub Actions.</p>
      </div>
      <div className="analytics-methodology__list">
        {notices.map((notice, index) => (
          <article className="analytics-methodology__item" key={notice}>
            <span className="tc-type-link-small">{String(index + 1).padStart(2, "0")}</span>
            <p className="tc-type-body">{notice}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeedNotice({ state }: { state: FeedState }) {
  if (state.status === "loading") return null;
  if (state.status === "error") {
    return (
      <section className="analytics-notice analytics-notice--error" aria-label="Analytics feed error">
        <h2 className="tc-type-h4">Feed could not be loaded</h2>
        <p className="tc-type-body">{state.error}</p>
      </section>
    );
  }
  if (state.feed.status === "ok") return null;

  return (
    <section className={`analytics-notice analytics-notice--${state.feed.status}`} aria-label="Analytics feed status">
      <h2 className="tc-type-h4">{state.feed.status === "setup_required" ? "Analytics feed setup is pending" : "Analytics feed has an error"}</h2>
      <p className="tc-type-body">{state.feed.error?.message || state.feed.notices[0] || "The public analytics feed is not ready yet."}</p>
    </section>
  );
}

export function WebsiteAnalyticsPage() {
  const [state, setState] = useState<FeedState>({ status: "loading", feed: null, error: null });
  const [selectedPeriod, setSelectedPeriod] = useState<AnalyticsPeriod["id"]>("30d");

  useEffect(() => {
    let cancelled = false;

    async function loadFeed() {
      try {
        const response = await fetch(`${analyticsFeedUrl}?t=${Date.now()}`, { cache: "no-store" });
        if (!response.ok) throw new Error(`Analytics feed request failed with HTTP ${response.status}.`);
        const data: unknown = await response.json();
        if (!isAnalyticsFeed(data)) throw new Error("Analytics feed schema is not valid.");
        if (!cancelled) setState({ status: "ready", feed: data, error: null });
      } catch (error) {
        if (!cancelled) setState({ status: "error", feed: null, error: error instanceof Error ? error.message : String(error) });
      }
    }

    void loadFeed();
    const interval = window.setInterval(() => void loadFeed(), 60_000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  const feed = state.status === "ready" ? state.feed : null;
  const byId = new Map(feed?.periods.map((period) => [period.id, period]));
  const periods = periodOrder.map((periodId) => byId.get(periodId)).filter((period): period is AnalyticsPeriod => Boolean(period));
  const selectedTopPagesPeriod = periods.find((period) => period.id === selectedPeriod) || periods[0] || null;

  return (
    <>
      <article className="analytics-page" id="top" aria-labelledby="analytics-page-title">
        <header className="stats-panel analytics-hero">
          <div className={`stats-glow stats-glow--${BOTTOM_GLOW_VARIANT}`} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="protocol-lines analytics-hero__lines" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="stats-copy analytics-hero__copy">
            <AnalyticsStatus state={state} />
            <h1 className="tc-type-h1" id="analytics-page-title">Website analytics</h1>
            <p className="tc-type-h4">Public aggregate traffic data for terra-classic.money, generated from GA4 through GitHub Actions and published as a static JSON snapshot.</p>
          </div>
          <div className="stats-bottom analytics-hero__bottom">
            <RealtimePanel feed={feed} />
          </div>
        </header>

        <FeedNotice state={state} />

        <section className="analytics-overview" aria-labelledby="analytics-overview-title">
          <header className="analytics-section-head">
            <div>
              <h2 className="tc-type-h2" id="analytics-overview-title">Traffic windows</h2>
              <p className="tc-type-body">The public feed shows broad usage signals without exposing visitor-level analytics.</p>
            </div>
          </header>
          <div className="analytics-period-grid">
            {periods.length > 0 ? periods.map((period) => <PeriodCard period={period} key={period.id} />) : periodOrder.map((periodId) => (
              <PeriodCard
                period={{
                  id: periodId,
                  label: periodId === "30d" ? "Last 30 days" : periodId === "7d" ? "Last 7 days" : "Last 1 day",
                  startDate: "pending",
                  endDate: "pending",
                  metrics: { activeUsers: null, sessions: null, views: null, events: null },
                  topPages: [],
                }}
                key={periodId}
              />
            ))}
          </div>
        </section>

        <TopPages period={selectedTopPagesPeriod} selectedPeriod={selectedPeriod} onSelectPeriod={setSelectedPeriod} />
        <Methodology feed={feed} />
      </article>
      <Footer />
    </>
  );
}
