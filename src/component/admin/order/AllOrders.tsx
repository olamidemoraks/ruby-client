"use client";
import React, { useEffect, useState } from "react";
import { useSidebarStore } from "../../../../store/sidebar";
import InputField from "@/component/InputField";
import { Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useFetch } from "@/hooks/useFetch";
import { endpoints } from "../../../../libs/endpoints";
import { toast } from "react-toastify";
import { Order } from "../../../../types";
import { useRouter } from "next/navigation";
import { cn } from "../../../../utils/utils";
import _ from "lodash";
import useGetAllOrder from "@/hooks/useGetAllOrder";

const AllOrders = ({ recent }: { recent?: boolean }) => {
  const { setTitle } = useSidebarStore();
  const { get } = useFetch();
  const [orderRef, setOrderRef] = useState("");
  const router = useRouter();
  const { Orders, isLoading } = useGetAllOrder(orderRef);

  useEffect(() => {
    setTitle("All Orders");
  }, []);

  const handleSearchOnchange = (value: string) => {
    // _.debounce(() => {
    setTimeout(() => {
      setOrderRef(value);
    }, 500);
    // }, 300);
  };

  const rows = (recent ? Orders?.slice(0, 5) : Orders)?.map((element) => (
    <Table.Tr
      key={element?.orderRef}
      onClick={() => router.push(`/dashboard/orders/${element?.orderRef}`)}
    >
      <Table.Td>
        <strong>#{element?.orderRef}</strong>
      </Table.Td>
      <Table.Td className=" capitalize">
        {element?.shippingAddress?.name}
      </Table.Td>
      <Table.Td>
        <DeliveryStatusText status={element?.status} />
      </Table.Td>
      <Table.Td className=" md:block hidden">
        <div className="flex -space-x-3">
          {element.items.map((item, index) => (
            <div key={index}>
              <img
                src={item?.productId.imageUrl[0]}
                className="h-[40px] w-[40px] rounded-full border border-zinc-300"
                alt=""
              />
            </div>
          ))}
        </div>
      </Table.Td>
      <Table.Td>₦{element.totalAmount.toLocaleString()}</Table.Td>
      <Table.Td className=" md:block hidden">
        {new Date(element.orderDate).toLocaleDateString()}
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <div
      className={cn(
        "space-y-4 md:w-full  overscroll-auto",
        !recent && "bg-white rounded-lg p-4  md:w-full w-[100vw]"
      )}
    >
      {!recent && (
        <div>
          <InputField
            onChange={(e) => handleSearchOnchange(e.target.value)}
            defaultValue={orderRef}
            placeholder="search by order ref"
            className=" max-w-[300px]"
            labelName="Order Reference"
          />
        </div>
      )}
      <div className="h-[1px] bg-zinc-300 w-full" />
      <div className="">
        <Table className=" ">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Order</Table.Th>
              <Table.Th> Customer</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th className=" md:block hidden">Product</Table.Th>
              <Table.Th>Total</Table.Th>
              <Table.Th className=" md:block hidden">Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

const statusColor: any = {
  Pending: "text-orange-500",
  Processing: "text-indigo-500",
  Shipped: "text-blue-500",
  Delivered: "text-emerald-500",
  Cancelled: "text-red-500",
};

export default AllOrders;

const DeliveryStatusText = ({ status }: { status: string }) => {
  return (
    <div className={cn("px-2 py-1 rounded-lg", statusColor[status])}>
      {status}
    </div>
  );
};
