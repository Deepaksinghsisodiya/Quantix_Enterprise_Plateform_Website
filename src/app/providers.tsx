"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
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

    if (ssoToken) {
      Cookies.set("accessToken", ssoToken, { expires: 30 });
      if (ssoRefresh) {
        Cookies.set("refreshToken", ssoRefresh, { expires: 30 });
      }
      let user = undefined;
      if (ssoUser) {
        try {
          user = JSON.parse(ssoUser);
          Cookies.set("authUser", JSON.stringify(user), { expires: 30 });
        } catch {
          user = undefined;
        }
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

    // 2. Local Cookie Hydration
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
      dispatch(setCredentials({ token, refreshToken, user }));
    }
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
