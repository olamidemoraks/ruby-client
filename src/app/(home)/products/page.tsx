"use client";
import { Text } from "@mantine/core";
import { Add, Minus, SearchNormal1, Star1 } from "iconsax-react";
import React, { useState } from "react";
import { products } from "../../../../libs/data";
import ProductCard from "@/component/ProductCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const cateories = [
  "Make up",
  "Lip gloss",
  "Butt enlargement",
  "Penis enlargement",
];
const page = () => {
  const [quantity, setQuantity] = useState(1);
  const searchParams = useSearchParams();
  const query = new URLSearchParams(searchParams || {});
  const pathname = usePathname();
  const router = useRouter();
  const currentCategory = searchParams.get("category");

  const handleSearchParams = (params: string, value: any) => {
    query.set(params, value);
    router.replace(`${pathname}?${query}`);
  };

  return (
    <div className="p-6 md:px-12  mt-10 space-y-10 w-full">
      <div className=" flex lg:flex-row flex-col w-full">
        <div className="flex-[.2]">
          <p className="  font-semibold">Filter By Category</p>
          <div className="flex lg:flex-col lg:gap-4 my-4">
            {cateories.map((category) => (
              <div
                onClick={() => handleSearchParams("category", category)}
                className={`opacity-45 cursor-pointer hover:opacity-100  px-2 lg:px-0 max-md:border-r border-zinc-400 ${
                  category === currentCategory && "opacity-100"
                } `}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
        <div className=" w-full flex-1">
          <div className=" w-full flex justify-between items-center">
            <p className=" text-2xl md:text-4xl ">Products</p>
            <div className=" flex items-center gap-3 px-4 border rounded-full border-zinc-600">
              <SearchNormal1 size="24" color="#52525c" />
              <input
                type="text"
                placeholder="search for product"
                className="py-3 outline-none border-none bg-transparent min-w-[300px]"
              />
            </div>
          </div>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-10 mt-10">
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
