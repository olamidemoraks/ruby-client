"use client";
import { useFetch } from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { endpoints } from "../../../../../libs/endpoints";
import { useSidebarStore } from "../../../../../store/sidebar";
import { Product } from "../../../../../types";
import { useRouter } from "next/navigation";
import { Table } from "@mantine/core";
import InputField from "@/component/InputField";

const page = () => {
  const router = useRouter();
  const { setTitle } = useSidebarStore();
  const { get } = useFetch();
  const [productName, setProductName] = useState("");
  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["ALL-PRODUCT", productName],
    queryFn: async () => {
      const res = await get(
        `${endpoints.admin.product.getAllProduct}?name=${productName}`
      );
      return res.data.products;
    },
  });

  console.log({ data });

  useEffect(() => {
    setTitle("Product");
  }, []);

  const handleSearchOnchange = (value: string) => {
    // _.debounce(() => {
    setTimeout(() => {
      setProductName(value);
    }, 500);
    // }, 300);
  };

  const rows = data?.map((element) => (
    <Table.Tr
      key={element?._id}
      onClick={() => router.push(`/dashboard/product/${element?._id}`)}
    >
      <Table.Td>
        <div className=" h-10 w-10 rounded-full border border-zinc-200">
          <img
            src={element?.imageUrl[0]}
            alt=""
            className=" h-full w-full rounded-full"
          />
        </div>
      </Table.Td>
      <Table.Td className=" capitalize">{element?.name}</Table.Td>
      <Table.Td className=" capitalize">
        ₦{element?.price.toLocaleString()}
      </Table.Td>
      <Table.Td className=" capitalize">
        ₦{element?.discountPrice.toLocaleString()}
      </Table.Td>
      <Table.Td>
        {element?.inStock ? (
          <p className="bg-emerald-500 text-sm font-semibold p-1 rounded-md w-fit h-fit">
            Available
          </p>
        ) : (
          <p className="bg-orange-500 text-sm font-semibold p-1 rounded-md w-fit h-fit ">
            Out of stock
          </p>
        )}{" "}
      </Table.Td>
      <Table.Td></Table.Td>
    </Table.Tr>
  ));
  return (
    <div className=" bg-white rounded-lg p-4 min-h-[80vh]  md:w-full w-[100vw]">
      <InputField
        onChange={(e) => handleSearchOnchange(e.target.value)}
        defaultValue={productName}
        placeholder="search by product name"
        className=" max-w-[300px]"
        labelName="Product Name"
      />
      <br />
      <div className="">
        <Table className=" ">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Image</Table.Th>
              <Table.Th> Name</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Discout Price</Table.Th>
              <Table.Th>Stock</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default page;
