const DEFAULT_API_BASE_URL = "/api/v1";

export function getApiBaseUrl() {
  const isBrowser = typeof window !== "undefined";

  // In the browser, ALWAYS use relative "/api/v1" to let Next.js rewrites proxy to backend (no CORS)
  if (isBrowser) {
    return DEFAULT_API_BASE_URL;
  }

  const backendUrl = process.env.BACKEND_API_URL || process.env.LIVE_BACKEND_API_URL || "http://localhost:5104";
  return `${backendUrl.replace(/\/$/, "")}/api/v1`;
}
