import Cookies from 'js-cookie';

/**
 * Returns security-hardened options for browser cookies.
 * In production / HTTPS environments, 'secure: true' is strictly enforced.
 * In local dev on HTTP (localhost), 'secure: false' is used so cookies work smoothly.
 * Automatically resolves the root domain (.foreteksolution.in or localhost) to enable
 * seamless Single Sign-On (SSO) across Enterprise, Restaurant, and Retail platforms.
 */
export function getSecureCookieOptions(days?: number): Cookies.CookieAttributes {
  const isHttps =
    typeof window !== 'undefined'
      ? window.location.protocol === 'https:'
      : process.env.NODE_ENV === 'production';

  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

  let domain: string | undefined = undefined;
  if (hostname.endsWith('foreteksolution.in')) {
    domain = '.foreteksolution.in';
  } else if (process.env.NEXT_PUBLIC_COOKIE_DOMAIN) {
    domain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN;
  }

  return {
    expires: days,
    secure: isHttps,
    sameSite: 'lax',
    path: '/',
    ...(domain ? { domain } : {}),
  };
}

/**
 * Set a cookie with secure flags and optimal expiration.
 */
export function setSecureCookie(name: string, value: string, days?: number): void {
  Cookies.set(name, value, getSecureCookieOptions(days));
}

/**
 * Remove a cookie cleanly from both domain and host paths.
 */
export function removeCookie(name: string): void {
  const options = getSecureCookieOptions();
  if (options.domain) {
    Cookies.remove(name, { path: '/', domain: options.domain });
  }
  Cookies.remove(name, { path: '/' });
}
