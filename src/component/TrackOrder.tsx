"use client";
import { PiInvoiceDuotone } from "react-icons/pi";
import { CiDeliveryTruck } from "react-icons/ci";
import { BiCheck } from "react-icons/bi";
import { useState } from "react";
import Button from "./Button";
import { cn } from "../../utils/utils";

const trackingOrderSteps = [
  { title: "Order Confirmed", date: "wed, 1st jan" },
  { title: "Shipped", date: "wed, 1st jan" },
  { title: "Out For Delivery", date: "wed, 1st jan" },
  { title: "Delivered", date: "wed, 1st jan" },
];
const TrackingOrder = () => {
  const [current, _] = useState("Shipped");
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between py-4">
        <p className="font-bold">Order ID: 32212332222</p>

        <Button className="border border-black !text-black bg-transparent rounded-md p-2 text-sm">
          <PiInvoiceDuotone /> Get Invoice
        </Button>
      </div>
      <div className="flex items-center gap-2 border-b pb-4 dark:border-zinc-500">
        <p>
          Order date: <strong>Feb 16, 2025</strong>
        </p>
        <div className="flex items-center gap-2 text-primary-400">
          <CiDeliveryTruck size={25} />
          <p className="font-bold">Estimated delivery: May 16, 2025</p>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <div className="flex w-[90%]">
          {trackingOrderSteps.map((shipping, index) => {
            const currentId = trackingOrderSteps.findIndex(
              (value) => value.title == current
            );
            return (
              <div
                key={index}
                className={cn(index < 3 ? "w-full" : "w-[400px]")}
              >
                <div className={cn("space-y-1", index < 3 && "w-full")}>
                  <p>{shipping.title}</p>
                  <div className="flex w-full translate-x-[4%] items-center">
                    <div
                      className={cn(
                        "flex h-5 min-w-5 items-center justify-center rounded-full text-white",
                        currentId >= index ? "bg-green-500" : "bg-zinc-300"
                      )}
                    >
                      {currentId >= index ? <BiCheck /> : null}
                    </div>

                    {index < 3 && <div className="h-1 w-full bg-zinc-200" />}
                  </div>
                  <p>{shipping.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 border-b dark:border-zinc-500">
        <div className="flex items-center gap-5 py-3">
          <div className="flex flex-1 items-start gap-x-5">
            <img
              src={"/placeholders.jpg"}
              alt=""
              height={130}
              width={130}
              className="rounded-md"
            />
            <div className="flex h-[130px] flex-col justify-center gap-4 py-2">
              <p>Sliding door</p>
              {/* {product?.installationFee > 0 && product?.installation && ( */}
              <div className="flex items-center gap-x-2">
                <p>
                  Include expert installation service for an additional{" "}
                  <strong>N12,300</strong>
                </p>
              </div>
              {/* )} */}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <strong className="text-lg">NGN 10,000</strong>
            <p>Qty: 1</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 border-b py-4 sm:grid-cols-2 dark:border-zinc-500">
        <div className="space-y-3">
          <p className="text-lg font-semibold">Payment</p>
          123*223
        </div>

        <div className="space-y-3">
          <p className="text-lg font-semibold">Delivery</p>
          <small>Address</small>
          <p>23 Marina street, Victoria Island, Lagos</p>
          <p>Ibadan, Lagos,</p>
          <p>092 03230 0232</p>
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
          <p className="">NGN 0</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Installation fee:</p>
          <p className="">NGN 0</p>
        </div>

        <div className="flex items-center justify-between">
          <p>Delivery fee: </p>
          <p className="">NGN 0</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Total:</p>
          <p className="text-lg font-semibold">NGN 0</p>
        </div>
      </div>
    </div>
  );
};

export default TrackingOrder;
