"use client";
import Button from "@/component/Button";
import InputField from "@/component/InputField";
import TrackOrder from "@/component/TrackOrder";
import { useFetch } from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { endpoints } from "../../../../libs/endpoints";
import { toast } from "react-toastify";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PiSpinner } from "react-icons/pi";

const page = () => {
  const [orderRef, setOrderRef] = useState("");
  const searchParams = useSearchParams();
  const query = new URLSearchParams(searchParams || {});
  const ref = searchParams.get("ref");
  const router = useRouter();
  const pathname = usePathname();

  const { get } = useFetch();
  const {
    data: order,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["TRACK-ORDER"],
    queryFn: async () => {
      const res = await get(`${endpoints.user.order.trackOrder}/${ref}`);
      if (res.success) {
        return res.data.order;
      }
      if (ref) toast.error(res.data ?? "Order not found");
    },
    enabled: !!ref,
  });

  const handleSearchParams = (params: string, value: any) => {
    query.set(params, value);
    router.replace(`${pathname}?${query}`);
  };

  useEffect(() => {
    refetch();
  }, [searchParams]);
  return (
    <div className="p-4">
      <div className=" flex justify-center">
        <div className=" space-y-3">
          <InputField
            onChange={(e) => setOrderRef(e.target.value)}
            value={orderRef}
            placeholder="order ref"
            labelName="Order Reference"
            className=" w-[400px]"
          />
          <Button onClick={() => handleSearchParams("ref", orderRef)}>
            Search Order
          </Button>
        </div>
      </div>
      {isLoading && (
        <div className=" w-full flex justify-center">
          <PiSpinner size={40} className=" animate-spin" />
        </div>
      )}
      {order && <TrackOrder order={order} />}
    </div>
  );
};

export default page;
