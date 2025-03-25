"use client";
import { useFetch } from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { endpoints } from "../../../../../../libs/endpoints";
import { toast } from "react-toastify";
import TrackingOrder from "@/component/TrackOrder";
import { BiChevronLeft } from "react-icons/bi";

const page = () => {
  const { id } = useParams();
  const { get } = useFetch();
  const {
    data: order,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["ORDER", String(id)],
    queryFn: async () => {
      const res = await get(`${endpoints.user.order.trackOrder}/${id}`);
      if (res.success) {
        return res.data.order;
      }
      toast.error(res.data ?? "Order not found");
    },
    enabled: !!id,
  });
  return <div>{order && <TrackingOrder order={order} isAdmin />}</div>;
};

export default page;
