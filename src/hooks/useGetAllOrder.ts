import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Order } from "../../types";
import { endpoints } from "../../libs/endpoints";
import { toast } from "react-toastify";
import { useFetch } from "./useFetch";

const useGetAllOrder = (orderRef?: string) => {
  const { get } = useFetch();
  const { data: Orders, isLoading } = useQuery<Order[]>({
    queryKey: ["ORDERS", orderRef],
    queryFn: async () => {
      const res = await get(`${endpoints.admin.order.orders}?ref=${orderRef}`);
      if (res.success) {
        return res.data;
      }
      toast.error(res.data ?? "something went wrong");
      return [];
    },
  });
  return {
    Orders,
    isLoading,
  };
};

export default useGetAllOrder;
