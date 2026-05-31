"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/redux/store";
import { ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { setCredentials } from "@/redux/slices/authSlice";

function AuthInitializer({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      dispatch(setCredentials({ token }));
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
