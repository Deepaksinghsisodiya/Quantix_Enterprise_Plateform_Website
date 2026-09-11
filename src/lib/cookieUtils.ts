import Cookies from 'js-cookie';

/**
 * Returns security-hardened options for browser cookies.
 * In production / HTTPS environments, 'secure: true' is strictly enforced.
 * In local dev on HTTP (localhost), 'secure: false' is used so cookies work smoothly.
 * 'sameSite: lax' prevents CSRF while supporting cross-subdomain top-level navigations.
 */
export function getSecureCookieOptions(days?: number): Cookies.CookieAttributes {
  const isHttps =
    typeof window !== 'undefined'
      ? window.location.protocol === 'https:'
      : process.env.NODE_ENV === 'production';

  return {
    expires: days,
    secure: isHttps,
    sameSite: 'lax',
    path: '/',
  };
}

/**
 * Set a cookie with secure flags and optimal expiration.
 */
export function setSecureCookie(name: string, value: string, days?: number): void {
  Cookies.set(name, value, getSecureCookieOptions(days));
}

/**
 * Remove a cookie cleanly.
 */
export function removeCookie(name: string): void {
  Cookies.remove(name, { path: '/' });
}
