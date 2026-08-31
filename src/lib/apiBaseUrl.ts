const DEFAULT_API_BASE_URL = "/api/v1";

export function getApiBaseUrl() {
  const isBrowser = typeof window !== "undefined";

  // In the browser, ALWAYS use relative "/api/v1" to let Next.js rewrites proxy to backend (no CORS)
  if (isBrowser) {
    return DEFAULT_API_BASE_URL;
  }

  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (configuredBaseUrl && configuredBaseUrl.startsWith("http")) {
    return configuredBaseUrl.replace(/\/$/, "");
  }

  return process.env.LIVE_BACKEND_API_URL || "https://quantixapi.foreteksolution.in/api/v1";
}
