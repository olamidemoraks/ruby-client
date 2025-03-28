"use client";
import React, { useCallback } from "react";
import { useFetch } from "./useFetch";
import { endpoints } from "../../libs/endpoints";
import { useUserStore } from "../../store/user";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useUser = () => {
  const { get } = useFetch();
  const { setUser } = useUserStore();
  const router = useRouter();
  const refetchUserInfo = useCallback(async () => {
    const res = await get(endpoints.admin.profile.getProfile);
    // if (res.success) {
    //   if (res.data.user.role == "admin") {
    //     return setUser(res.data.user);
    //   }
    //   toast.error(res.data ?? "User not authorize");
    //   router.push("/login");
    // }
    // if (res.status === 401) {
    //   toast.error(res.data ?? "Please login to access service");
    //   router.push("/login");
    // }
  }, [get, setUser]);
  return {
    refetchUserInfo,
  };
};

export default useUser;
