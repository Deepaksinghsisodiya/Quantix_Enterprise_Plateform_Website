const DEFAULT_API_BASE_URL = "/api/v1";

export function getApiBaseUrl() {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (!configuredBaseUrl) {
    return DEFAULT_API_BASE_URL;
  }

  const isBrowser = typeof window !== "undefined";
  const pointsToLocalApi =
    /^https?:\/\/(localhost|127\.0\.0\.1):5104\/api\/v1\/?$/i.test(configuredBaseUrl);

  if (isBrowser && pointsToLocalApi) {
    return DEFAULT_API_BASE_URL;
  }

  return configuredBaseUrl.replace(/\/$/, "");
}
