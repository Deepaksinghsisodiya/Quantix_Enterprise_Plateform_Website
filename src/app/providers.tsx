"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { setSecureCookie } from "@/lib/cookieUtils";
import { setCredentials } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks";

function AuthInitializer({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Check for Unified SSO handover tokens in URL query params
    const urlParams = new URLSearchParams(window.location.search);
    const ssoToken = urlParams.get("sso_token");
    const ssoRefresh = urlParams.get("sso_refresh");
    const ssoUser = urlParams.get("sso_user");

    // Function to re-sync auth state from cookies
    const syncFromCookies = () => {
      const token = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");
      const authUserCookie = Cookies.get("authUser");
      let user = undefined;

      if (authUserCookie) {
        try {
          user = JSON.parse(authUserCookie);
        } catch {
          user = undefined;
        }
      }

      if (token) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("quantix_has_logged_out");
        }
        dispatch(setCredentials({ token, refreshToken, user }));
      }
    };

    if (ssoToken) {
      setSecureCookie("accessToken", ssoToken, 30);
      if (ssoRefresh) {
        setSecureCookie("refreshToken", ssoRefresh, 30);
      }
      let user = undefined;
      if (ssoUser) {
        try {
          user = JSON.parse(ssoUser);
          setSecureCookie("authUser", JSON.stringify(user), 30);
        } catch {
          user = undefined;
        }
      }

      if (typeof window !== "undefined") {
        localStorage.removeItem("quantix_has_logged_out");
      }
      dispatch(setCredentials({ token: ssoToken, refreshToken: ssoRefresh || null, user }));

      // Clean SSO query parameters smoothly from the address bar
      urlParams.delete("sso_token");
      urlParams.delete("sso_refresh");
      urlParams.delete("sso_user");
      const remainingQuery = urlParams.toString();
      const cleanUrl = window.location.pathname + (remainingQuery ? `?${remainingQuery}` : "");
      window.history.replaceState({}, document.title, cleanUrl);
      return;
    }

    // 2. Local Cookie Hydration on initial mount
    syncFromCookies();

    // 3. Keep in sync when user switches tabs or refocuses window
    const handleFocus = () => syncFromCookies();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncFromCookies();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 4. Automatic cross-platform link SSO handover
    const handleCrossSiteClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor || !anchor.href) return;

      const href = anchor.href;
      const isSisterPlatform =
        (href.includes("localhost:3000") ||
         href.includes("localhost:3001") ||
         href.includes("localhost:3002") ||
         href.includes("possaaswebsite") ||
         href.includes("quantixrestaurant") ||
         href.includes("quantixretail") ||
         href.includes("foreteksolution.in")) &&
        !href.startsWith(window.location.origin);

      if (isSisterPlatform) {
        const activeToken = Cookies.get("accessToken");
        if (activeToken) {
          try {
            const url = new URL(href);
            if (!url.searchParams.has("sso_token")) {
              url.searchParams.set("sso_token", activeToken);
              const activeRefresh = Cookies.get("refreshToken");
              if (activeRefresh) url.searchParams.set("sso_refresh", activeRefresh);
              const activeUser = Cookies.get("authUser");
              if (activeUser) url.searchParams.set("sso_user", activeUser);
              anchor.href = url.toString();
            }
          } catch {
            // graceful fallback
          }
        }
      }
    };

    document.addEventListener("click", handleCrossSiteClick, { capture: true });
    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("click", handleCrossSiteClick, { capture: true });
    };
  }, [dispatch]);

  return <>{children}</>;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
