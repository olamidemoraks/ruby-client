"use client";
import { PiInvoiceDuotone } from "react-icons/pi";
import { CiDeliveryTruck } from "react-icons/ci";
import {
  BiCheck,
  BiChevronDown,
  BiChevronLeft,
  BiLoader,
  BiPackage,
} from "react-icons/bi";
import { useMemo, useState } from "react";
import Button from "./Button";
import { cn } from "../../utils/utils";
import { Order } from "../../types";
import { Menu } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useFetch } from "@/hooks/useFetch";
import { endpoints } from "../../libs/endpoints";
import { toast } from "react-toastify";
import { FaHandHoldingUsd } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaTruckFast } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";

const trackingOrderSteps = [
  { title: "Pending", icon: BiPackage },
  { title: "Processing", icon: FaHandHoldingUsd },
  { title: "Shipped", icon: FaTruckFast },
  { title: "Delivered", icon: MdLocationPin },
];
const TrackingOrder = ({
  order,
  isAdmin,
}: {
  order: Order;
  isAdmin?: boolean;
}) => {
  const router = useRouter();
  const { put } = useFetch();
  const [current, setCurrent] = useState<string>(order.status ?? "Pending");

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["UPDATE-STATUS"],
    mutationFn: async ({ status }: { status: string }) => {
      let previousStatus = current;
      setCurrent(status);
      const res = await put(
        `${endpoints.admin.order.editStatus}/${order?._id}`,
        { status }
      );
      if (res.success) {
        return toast.success("Delivery status updated");
      }
      setCurrent(previousStatus);
      toast.error(res.data ?? "something went wrong");
    },
  });
  const orderAmount = useMemo(() => {
    return order.items?.reduce((acc, product) => {
      acc = acc + product?.price * product?.quantity;
      return acc;
    }, 0);
  }, [order]);
  return (
    <div className="space-y-5  w-full mx-auto ">
      <div className=" pt-4 flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.back()}
        >
          <BiChevronLeft size={25} />
          <p className="font-bold">Order ID: {order?.orderRef}</p>
        </div>

        <div className=" flex flex-col items-center gap-3">
          {isAdmin && (
            <Menu
              styles={{
                dropdown: {
                  width: "250px !important",
                  marginTop: 8,
                  padding: 12,
                  gap: 10,
                  display: "flex",
                  flexDirection: "column",
                },
              }}
            >
              <Menu.Target>
                <div className="border w-fit border-black !text-black bg-transparent rounded-md px-4 p-2 text-sm space-x-2 flex items-center">
                  {current}{" "}
                  {isPending ? (
                    <BiLoader className=" animate-spin" size={23} />
                  ) : (
                    <BiChevronDown size={26} />
                  )}
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                {["Processing", "Shipped", "Delivered", "Cancelled"].map(
                  (status) => (
                    <Menu.Item
                      styles={{}}
                      onClick={() => mutateAsync({ status })}
                    >
                      {status}
                    </Menu.Item>
                  )
                )}
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex ">
          {trackingOrderSteps.map((shipping, index) => {
            const currentId = trackingOrderSteps.findIndex(
              (value) => value.title == current
            );
            return (
              <div
                key={index}
                className={cn(index < 3 ? "w-full" : "w-[200px]")}
              >
                <div className={cn("space-y-1", index < 3 && "w-full")}>
                  <div className="flex w-full translate-x-[4%] items-center">
                    <div
                      className={cn(
                        "flex h-8 min-w-8 items-center justify-center rounded-full text-white",
                        currentId >= index
                          ? "bg-black text-white"
                          : "bg-zinc-300 text-black",
                        current === "Delivered" || current == "Cancelled"
                          ? "text-white "
                          : "text-black",
                        current === "Delivered" && "bg-emerald-500",
                        current === "Cancelled" && "bg-red-500"
                      )}
                    >
                      <shipping.icon
                        size={22}
                        color={
                          currentId >= index ||
                          current === "Delivered" ||
                          current == "Cancelled"
                            ? "#fff"
                            : "#000"
                        }
                      />
                    </div>

                    {index < 3 && (
                      <div
                        className={cn(
                          "h-1 w-full bg-zinc-200",
                          currentId >= index && "bg-black",
                          current === "Delivered" && "bg-emerald-500",
                          current === "Cancelled" && "bg-red-500"
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-2 border-b pb-2 dark:border-zinc-500">
        <p>
          Order date:{" "}
          <strong>{new Date(order.orderDate).toLocaleDateString()}</strong>
        </p>
        <div className="flex items-center gap-2 text-primary-400">
          <CiDeliveryTruck size={25} />
          <p className="font-bold">
            Estimated delivery:{" "}
            {/* {new Date(
              order.orderDate.setDate(order.orderDate.getDate() + 4)
            ).toLocaleDateString()} */}
          </p>
        </div>
      </div>

      <div className="space-y-2 border-b dark:border-zinc-500">
        {order?.items?.map((product) => (
          <div className="flex items-center gap-5 pb-3">
            <div className="flex flex-1 items-center gap-x-5">
              <img
                src={product?.productId?.imageUrl[0]}
                alt=""
                height={60}
                width={60}
                className="rounded-md border"
              />
              <div className="flex h-[130px] flex-col justify-center gap-2 py-2">
                <p>{product?.productId?.name}</p>
                {/* {product?.installationFee > 0 && product?.installation && ( */}
                <div className="flex items-center gap-x-2">
                  NGN {product?.price.toLocaleString()}
                </div>
                {/* )} */}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <strong className="text-lg">
                NGN {(product?.price * product?.quantity).toLocaleString()}{" "}
              </strong>
              <p>Qty: {product?.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 border-b pb-4  dark:border-zinc-500">
        <div className="space-y-3">
          <p className="text-lg font-semibold">Contact Information</p>
          <p>{order?.shippingAddress?.name}</p>
          <p>{order?.shippingAddress?.email}</p>
          <p>{order?.shippingAddress?.phoneNumber}</p>
        </div>

        <div className="space-y-3">
          <p className="text-lg font-semibold">Delivery Address</p>
          <p>{order?.shippingAddress?.street}</p>
          <p>
            {order?.shippingAddress?.state}, {order?.shippingAddress?.city}
          </p>
        </div>
      </div>

      <div className="w-full space-y-8 py-4">
        <div className="space-y-2">
          <p className="text-2xl font-semibold">Order Summary </p>
          <p>
            Breakdown of your order(s), including selected services and pricing.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p>Order amount:</p>
          <p className="">NGN {orderAmount.toLocaleString()}</p>
        </div>

        <div className="flex items-center justify-between">
          <p>Delivery fee: </p>
          <p className="">
            NGN {order?.shippingId?.shippingFee.toLocaleString()}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Total:</p>
          <p className="text-lg font-semibold">
            NGN{" "}
            {(orderAmount + order?.shippingId?.shippingFee).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackingOrder;
