import { useQuery } from "@tanstack/react-query";
import React from "react";
import { endpoints } from "../../../libs/endpoints";
import { useFetch } from "../useFetch";
import { Account } from "../../../types";

const useGetAccount = () => {
  const { get } = useFetch();
  const { data: Account, isLoading } = useQuery<Account>({
    queryKey: ["ACCOUNT"],
    queryFn: async () => {
      const res = await get(endpoints.user.order.account);
      if (res.success) {
        return res.data.account;
      }
      return {};
    },
  });

  return {
    Account,
    isLoading,
  };
};

export default useGetAccount;
