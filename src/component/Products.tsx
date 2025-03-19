"use client";
import { Menu, Text } from "@mantine/core";
import { ArrowDown2, Filter, Star1 } from "iconsax-react";
import Image from "next/image";
import React from "react";
import ProductCard from "./ProductCard";
import { products } from "../../libs/data";

const Products = () => {
  return (
    <div className="p-6 md:px-12 lg:px-20 mt-8">
      <div className=" flex items-center justify-between">
        <div className=" flex items-center gap-2">
          <Filter size="20" color="#000" />
          <p>Filters</p>
        </div>
      </div>

      <div>
        <p className=" text-2xl md:text-4xl mt-10">Best Seller</p>
        <p className=" opacity-60 mt-3 text-sm">
          Our most-loved products, handpicked by beauty enthusiasts like you
        </p>
      </div>

      {/* Products */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Products;
