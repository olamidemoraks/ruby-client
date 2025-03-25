"use client";
import React, { useEffect, useMemo } from "react";
import { useSidebarStore } from "../../../../store/sidebar";
import { useUserStore } from "../../../../store/user";
import { IoStorefront } from "react-icons/io5";
import { FaCartShopping, FaTruck, FaTruckRampBox } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import { CardReceive } from "iconsax-react";
import useGetAllProducts from "@/hooks/product/useGetAllProducts";
import useGetAllOrder from "@/hooks/useGetAllOrder";
import Link from "next/link";
import AllOrders from "../order/AllOrders";
import AllProduct from "../product/AllProduct";

const Dashboard = () => {
  const { setTitle } = useSidebarStore();
  const { user } = useUserStore();
  const { data, isLoading } = useGetAllProducts("");
  const { Orders, isLoading: isPending } = useGetAllOrder("");

  const [complete, pending, shipped, cancel, total] = useMemo(() => {
    const complete = Orders?.filter(
      (order) => order.status === "Delivered"
    ).length;
    const pending = Orders?.filter(
      (order) => order.status === "Pending"
    ).length;
    const shipped = Orders?.filter(
      (order) => order.status === "Shipped"
    ).length;
    const cancel = Orders?.filter(
      (order) => order.status === "Cancelled"
    ).length;
    const total = Orders?.reduce((prev, order) => {
      if (order.status !== "Cancelled") {
        return order.totalAmount + prev;
      }
      return prev;
    }, 0);
    return [complete, pending, shipped, cancel, total];
  }, [Orders]);
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good morning 🌞";
    } else if (hour >= 12 && hour < 17) {
      return "Good afternoon ☀️";
    } else if (hour >= 17 && hour < 21) {
      return "Good evening 🌇";
    } else {
      return "Good night 🌙";
    }
  };
  useEffect(() => {
    setTitle("Dashboard");
  }, []);
  return (
    <div className=" space-y-6">
      <p className=" text-xl sm:text-3xl font-bold ">
        {getGreeting()}, {user?.name.split(" ")?.[0]}
      </p>
      <div className=" grid xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 w-full gap-3 sm:gap-6">
        <div className="bg-white rounded-xl p-5 h-[200px] w-full flex flex-col justify-evenly shadow-lg">
          <CardReceive size="40" color="#000" />
          <p className=" text-lg sm:text-2xl font-bold">
            ₦ {total?.toLocaleString()}{" "}
          </p>
          <p className=" sm:text-lg">Estimated Total</p>
        </div>
        <div className="bg-white rounded-xl p-5 h-[200px] w-full flex flex-col justify-evenly shadow-lg">
          <IoStorefront size={40} />
          <p className=" text-lg sm:text-2xl font-bold">{data?.length ?? 0}</p>
          <p className=" sm:text-lg">All Products</p>
        </div>
        <div className="bg-white rounded-xl p-5 h-[200px] w-full flex flex-col justify-evenly shadow-lg">
          <FaTruckRampBox size={40} />
          <p className=" text-lg sm:text-2xl font-bold">{complete ?? 0}</p>
          <p className=" sm:text-lg">Successful Order</p>
        </div>
        <div className="bg-white rounded-xl p-5 h-[200px] w-full flex flex-col justify-evenly shadow-lg">
          <FaCartShopping size={40} />
          <p className=" text-lg sm:text-2xl font-bold">{pending ?? 0}</p>
          <p className=" sm:text-lg">Pending Order</p>
        </div>
        <div className="bg-white rounded-xl p-5 h-[200px] w-full flex flex-col justify-evenly shadow-lg">
          <FaTruck size={40} />
          <p className=" text-lg sm:text-2xl font-bold">{shipped ?? 0}</p>
          <p className=" sm:text-lg">Shipped Order</p>
        </div>

        <div className="bg-white rounded-xl p-5 h-[200px] w-full flex flex-col justify-evenly shadow-lg">
          <FcCancel size={40} />
          <p className=" text-lg sm:text-2xl font-bold">{cancel ?? 0}</p>
          <p className=" sm:text-lg">Cancel Order</p>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        <div className=" bg-white rounded-xl p-3 shadow-lg">
          <div className="flex justify-between p-3">
            <p>Recent Order</p>
            <Link href={"/dashboard/orders"}>see all</Link>
          </div>
          <div>
            <AllOrders recent />
          </div>
        </div>
        <div className=" bg-white rounded-xl p-3 shadow-lg">
          <div className="flex justify-between p-3">
            <p>Product</p>
            <Link href={"/dashboard/product"}>see all</Link>
          </div>
          <div className="h-[1px] bg-zinc-300 w-full mb-4" />

          <div>
            <AllProduct recent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
