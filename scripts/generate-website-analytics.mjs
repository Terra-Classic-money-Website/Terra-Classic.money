import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const outputPath = path.resolve(process.cwd(), process.env.WEBSITE_ANALYTICS_OUTPUT || "public/data/website-analytics.json");
const propertyId = process.env.GA4_PROPERTY_ID;
const serviceAccountJson = process.env.GOOGLE_ANALYTICS_SERVICE_ACCOUNT_JSON;
const strict = process.env.WEBSITE_ANALYTICS_STRICT === "1";

const periods = [
  { id: "30d", label: "Last 30 days", startDate: "29daysAgo", endDate: "today" },
  { id: "7d", label: "Last 7 days", startDate: "6daysAgo", endDate: "today" },
  { id: "1d", label: "Last 1 day", startDate: "today", endDate: "today" },
];

function emptyMetrics() {
  return {
    activeUsers: null,
    sessions: null,
    views: null,
    events: null,
  };
}

function setupRequiredFeed(notice) {
  return {
    version: 1,
    status: "setup_required",
    generatedAt: null,
    source: "Google Analytics 4 Data API",
    refresh: {
      cadence: "Hourly through GitHub Actions",
      workflow: ".github/workflows/website-analytics.yml",
    },
    realtime: {
      activeUsers: null,
      windowMinutes: 30,
    },
    periods: periods.map((period) => ({
      ...period,
      metrics: emptyMetrics(),
      topPages: [],
    })),
    notices: [notice],
  };
}

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/u, "");
}

function parseServiceAccount(rawJson) {
  try {
    const parsed = JSON.parse(rawJson);
    if (typeof parsed.client_email !== "string" || typeof parsed.private_key !== "string") {
      throw new Error("Service account JSON must include client_email and private_key.");
    }
    return parsed;
  } catch (error) {
    throw new Error(`Invalid GOOGLE_ANALYTICS_SERVICE_ACCOUNT_JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function createJwt(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: "RS256",
    typ: "JWT",
  };
  const payload = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    aud: serviceAccount.token_uri || "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const unsignedToken = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`;
  const signature = crypto.createSign("RSA-SHA256").update(unsignedToken).sign(serviceAccount.private_key);
  return `${unsignedToken}.${base64url(signature)}`;
}

async function fetchAccessToken(serviceAccount) {
  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: createJwt(serviceAccount),
  });
  const response = await fetch(serviceAccount.token_uri || "https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || typeof data.access_token !== "string") {
    const message = typeof data.error_description === "string" ? data.error_description : `Token request failed with HTTP ${response.status}.`;
    throw new Error(message);
  }
  return data.access_token;
}

async function analyticsRequest(accessToken, method, body) {
  const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:${method}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = typeof data.error?.message === "string" ? data.error.message : `${method} failed with HTTP ${response.status}.`;
    throw new Error(message);
  }
  return data;
}

function numberValue(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function readMetric(row, index) {
  return numberValue(row?.metricValues?.[index]?.value);
}

function metricsFromReport(report) {
  const row = report.rows?.[0];
  return {
    activeUsers: readMetric(row, 0),
    sessions: readMetric(row, 1),
    views: readMetric(row, 2),
    events: readMetric(row, 3),
  };
}

function topPagesFromReport(report) {
  return (report.rows || []).slice(0, 8).map((row) => ({
    path: row.dimensionValues?.[0]?.value || "/",
    title: row.dimensionValues?.[1]?.value || "Untitled page",
    views: readMetric(row, 0),
    activeUsers: readMetric(row, 1),
  }));
}

async function periodReport(accessToken, period) {
  const [summary, topPages] = await Promise.all([
    analyticsRequest(accessToken, "runReport", {
      dateRanges: [{ startDate: period.startDate, endDate: period.endDate }],
      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
        { name: "eventCount" },
      ],
      keepEmptyRows: true,
    }),
    analyticsRequest(accessToken, "runReport", {
      dateRanges: [{ startDate: period.startDate, endDate: period.endDate }],
      dimensions: [
        { name: "pagePath" },
        { name: "pageTitle" },
      ],
      metrics: [
        { name: "screenPageViews" },
        { name: "activeUsers" },
      ],
      orderBys: [
        {
          metric: { metricName: "screenPageViews" },
          desc: true,
        },
      ],
      limit: 8,
      keepEmptyRows: false,
    }),
  ]);

  return {
    ...period,
    metrics: metricsFromReport(summary),
    topPages: topPagesFromReport(topPages),
  };
}

async function realtimeReport(accessToken) {
  const report = await analyticsRequest(accessToken, "runRealtimeReport", {
    metrics: [{ name: "activeUsers" }],
    keepEmptyRows: true,
  });
  return {
    activeUsers: readMetric(report.rows?.[0], 0) ?? 0,
    windowMinutes: 30,
  };
}

async function writeJson(data) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`);
}

async function main() {
  if (!propertyId || !serviceAccountJson) {
    await writeJson(setupRequiredFeed("Analytics feed setup is pending. Add GA4_PROPERTY_ID and GOOGLE_ANALYTICS_SERVICE_ACCOUNT_JSON to GitHub Actions secrets, then run the Website analytics feed workflow."));
    console.log(`Website analytics setup placeholder written to ${path.relative(process.cwd(), outputPath)}.`);
    return;
  }

  const serviceAccount = parseServiceAccount(serviceAccountJson);
  const accessToken = await fetchAccessToken(serviceAccount);
  const [periodResults, realtime] = await Promise.all([
    Promise.all(periods.map((period) => periodReport(accessToken, period))),
    realtimeReport(accessToken),
  ]);

  await writeJson({
    version: 1,
    status: "ok",
    generatedAt: new Date().toISOString(),
    source: "Google Analytics 4 Data API",
    refresh: {
      cadence: "Hourly through GitHub Actions",
      workflow: ".github/workflows/website-analytics.yml",
    },
    realtime,
    periods: periodResults,
    notices: [
      "Numbers are aggregate GA4 reporting values. Realtime active users represent GA4 activity during the last 30 minutes.",
      "The public feed intentionally excludes city-level, device-level, and personally identifying analytics dimensions.",
    ],
  });
  console.log(`Website analytics feed written to ${path.relative(process.cwd(), outputPath)}.`);
}

main().catch(async (error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Website analytics feed generation failed: ${message}`);
  if (!strict) {
    await writeJson({
      ...setupRequiredFeed("Analytics feed generation failed. The public website will show an operator-readable error state until the workflow succeeds."),
      status: "error",
      generatedAt: new Date().toISOString(),
      error: {
        message,
      },
    });
  }
  process.exitCode = 1;
});
