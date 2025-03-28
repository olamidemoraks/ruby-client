"use client";

import Button from "@/component/Button";
import InputField from "@/component/InputField";
import { useFetch } from "@/hooks/useFetch";
import React, { Suspense, useState } from "react";
import { endpoints } from "../../../../libs/endpoints";
import { toast } from "react-toastify";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useGetAllCategory from "@/hooks/product/useGetAllCategory";
import { useQuery } from "@tanstack/react-query";

type StateType = {
  _id: string;
  state: string;
  shippingFee: number;
};

const ShippingFeeComponent: React.FC = () => {
  const [state, setState] = useState<string>();
  const [stateFee, setStateFee] = useState(0);
  const { post, put, remove } = useFetch();
  const searchParams = useSearchParams(); // ✅ Now inside Suspense!
  const query = new URLSearchParams(searchParams?.toString() || "");
  const pathname = usePathname();
  const router = useRouter();
  const id = searchParams?.get("id") ?? "";
  const isEdit = Boolean(id);

  const { get } = useFetch();
  const { data, isLoading, refetch } = useQuery<StateType[]>({
    queryKey: ["STATES"],
    queryFn: async () => {
      const res = await get(endpoints.admin.shipping.getAllState);
      if (res.success) {
        return res.data;
      }
      return [];
    },
  });
  const SubmitStateFee = async () => {
    if (!state && stateFee == 0)
      return toast.error("Please enter a category name");
    try {
      const response = await put(`${endpoints.admin.shipping.updateState}`, {
        state,
        shippingFee: stateFee,
      });

      if (response.success) {
        toast.success(response.data.message ?? "Category saved successfully");
        setState("");
        setStateFee(0);
        handleSearchParams("id", "");
        refetch();
      } else {
        toast.error(response.data ?? "Something went wrong");
      }
    } catch {
      toast.error("An error occurred while saving the category");
    }
  };

  const handleSearchParams = (param: string, value: string) => {
    query.set(param, value);
    router.replace(`${pathname}?${query.toString()}`);
  };

  return (
    <div className="flex md:flex-row flex-col-reverse md:min-h-[70vh] gap-6">
      {/* Category List */}
      <div className="md:flex-[.5] md:h-[70vh] h-[60dvh] overflow-auto w-full p-4 bg-white rounded-lg">
        <p className="text-lg font-semibold">All States</p>
        <div className="space-y-4 mt-3">
          {data?.map((value: StateType) => (
            <div
              key={value._id}
              onClick={() => {
                handleSearchParams("id", value._id);
                setState(value.state);
                setStateFee(value.shippingFee);
              }}
              className="p-3 hover:bg-purple-50 border-b border-zinc-200 cursor-pointer flex justify-between items-center"
            >
              <p>{value?.state}</p>
              <p>₦{value?.shippingFee?.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Create/Edit Category Form */}
      <div className="md:flex-1 flex-[.4] w-full h-fit p-4 bg-white rounded-lg space-y-4">
        <p className="text-lg font-semibold">{state ?? "Select"} State</p>
        <InputField
          value={stateFee}
          onChange={(e) => setStateFee(Number(e.target.value))}
          labelName="Shipping Fee"
          placeholder="Enter shipping fee"
        />

        <div className="flex items-center gap-3">
          <Button disabled={!state} onClick={SubmitStateFee}>
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

// ✅ Wrap in Suspense to fix "useSearchParams() should be wrapped in a Suspense boundary"
const ShippingFee: React.FC = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ShippingFeeComponent />
    </Suspense>
  );
};

export default ShippingFee;
