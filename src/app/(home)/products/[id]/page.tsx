"use client";
import { Add, Minus, Star1 } from "iconsax-react";
import React, { useState } from "react";
import ProductCard from "@/component/ProductCard";
import { products } from "../../../../../libs/data";

const page = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="p-6 md:px-12 lg:px-20 space-y-10">
      <div className="grid lg:grid-cols-2 gap-10 ">
        <div className="flex sm:flex-row flex-col-reverse gap-4">
          <div className="max-h-[500px] flex sm:flex-col gap-4">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="sm:h-[100px] w-[calc(80vw/4)] h-[70px] sm:w-[100px] bg-[#F6F9F6]"
                ></div>
              ))}
          </div>
          <div className=" sm:h-[500px] h-[400px] w-full bg-[#F6F9F6]"></div>
        </div>
        <div>
          <div className=" w-full space-y-3">
            <p className=" text-sm md:text-lg opacity-60 uppercase">
              Body Lotion
            </p>
            <div className="flex items-start w-full  ">
              <p className="text-xl md:text-3xl capitalize">
                Sunny Side Skin Care
              </p>
            </div>
            <div className="flex items-center gap-x-1  ">
              {Array(5)
                .fill(0)
                .map((_, idx) => (
                  <Star1
                    key={idx}
                    size="15"
                    color={4 > idx ? "#BDCE76" : "#E2E2E2"}
                    variant="Bold"
                  />
                ))}
            </div>
            <div className=" text-xl ">
              <p className="font-bold ">
                ₦5,000{" "}
                <span className=" line-through text-xs opacity-50">
                  ₦12,000
                </span>
              </p>
            </div>

            <p className=" opacity-80">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis est voluptate debitis sint assumenda magni, quia
              beatae? Eius commodi impedit omnis aut asperiores voluptate labore
              adipisci blanditiis distinctio, autem consectetur quasi ipsam
              earum! Libero laborum ducimus maxime omnis, temporibus natus.
            </p>

            <div className="flex items-center gap-4">
              <div className=" p-2 flex items-center gap-2 border rounded-full ">
                <div className="px-3">
                  <Add size="22" color="#000" />
                </div>
                <div>1</div>
                <div className=" px-3">
                  <Minus size="22" color="#000" />
                </div>
              </div>
              <div className=" block p-2 text-sm cursor-pointer bg-black text-white uppercase w-full md:w-[40%] text-center rounded-full">
                Add To Cart
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className=" text-2xl md:text-4xl mt-10">You May Also Like</p>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
          {products.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
