"use client";
import Button from "@/component/Button";
import InputField from "@/component/InputField";
import TrackOrder from "@/component/TrackOrder";
import { useFetch } from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense, useEffect, useState } from "react";
import { endpoints } from "../../../../libs/endpoints";
import { toast } from "react-toastify";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PiSpinner } from "react-icons/pi";

const TrackOrderPage: React.FC = () => {
  const [orderRef, setOrderRef] = useState<string>("");
  const searchParams = useSearchParams(); // ✅ Now inside Suspense!
  const query = new URLSearchParams(searchParams?.toString() || "");
  const ref = searchParams?.get("ref") ?? "";
  const router = useRouter();
  const pathname = usePathname();
  const { get } = useFetch();

  const {
    data: order,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["TRACK-ORDER", ref],
    queryFn: async () => {
      if (!ref) return null;
      const res = await get(`${endpoints.user.order.trackOrder}/${ref}`);
      if (res.success) return res.data.order;
      toast.error(res.data ?? "Order not found");
      return null;
    },
    enabled: !!ref,
  });

  const handleSearchParams = (param: string, value: string) => {
    query.set(param, value);
    router.replace(`${pathname}?${query.toString()}`);
  };

  useEffect(() => {
    if (ref) refetch();
  }, [refetch, ref]);

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <div className="space-y-3">
          <InputField
            onChange={(e) => setOrderRef(e.target.value)}
            value={orderRef}
            placeholder="Order Ref"
            labelName="Order Reference"
            className="w-[400px]"
          />
          <Button onClick={() => handleSearchParams("ref", orderRef)}>
            Search Order
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="w-full flex justify-center">
          <PiSpinner size={40} className="animate-spin" />
        </div>
      )}

      {order && <TrackOrder order={order} />}
    </div>
  );
};

// ✅ Wrap in Suspense to fix "useSearchParams() should be wrapped in a Suspense boundary"
const Page: React.FC = () => {
  return (
    <Suspense fallback={<p>Loading order tracking...</p>}>
      <TrackOrderPage />
    </Suspense>
  );
};

export default Page;
