"use client";
import React, { ReactNode, useCallback, useEffect } from "react";
import { useUserStore } from "../../store/user";
import useUser from "@/hooks/useUser";
import { getCookie } from "cookies-next";
import { COOKIE_KEYS } from "../../libs/data";
import { usePathname, useRouter } from "next/navigation";

const AppWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isAuthenticated } = useUserStore();
  const { refetchUserInfo } = useUser();
  const pathname = usePathname();
  const { push } = useRouter();

  const firstPathSegment = pathname.split("/")[1];

  const validateAuth = useCallback(() => {
    const isRegistered = getCookie(COOKIE_KEYS.IS_REGISTERED) === "true";

    if (isRegistered) {
      if (
        !firstPathSegment ||
        ["register", "login", "forgot-password"].includes(firstPathSegment)
      ) {
        push("/dashboard");
      }
    } else if (firstPathSegment === "dashboard") {
      push(process.env.NEXT_CLIENT_URL || "/auth/login");
    }

    return isRegistered;
  }, [push, firstPathSegment]);

  useEffect(() => {
    refetchUserInfo();
  }, [isAuthenticated]);
  return <>{children}</>;
};

export default AppWrapper;
