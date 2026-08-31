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
    const token = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    const authUserCookie = Cookies.get("authUser");
    let user = undefined;

    if (authUserCookie) {
      try {
        user = JSON.parse(authUserCookie);
      } catch (e) {
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
