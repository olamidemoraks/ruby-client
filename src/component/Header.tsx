"use client";
import { HambergerMenu, SearchNormal1, ShoppingCart } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useCart } from "../../store/cart";

const Header = () => {
  const router = useRouter();
  const { products } = useCart();
  return (
    <div className="w-full p-6 md:px-12 lg:px-20 border-b border-zinc-300">
      <div className="flex justify-between items-center">
        <Link href={"/"} className=" flex">
          <p className=" text-3xl">Ruby Glow</p>
        </Link>

        <div className="sm:flex items-center gap-12  uppercase hidden">
          <Link href={"/products"} className=" cursor-pointer tracking-widest">
            Shop
          </Link>
          {/* <Link href={"/"} className=" cursor-pointer tracking-widest">
            Service
          </Link> */}
          <Link
            href={"/track-order"}
            className=" cursor-pointer tracking-widest"
          >
            Track Order
          </Link>
        </div>
        <div className=" flex items-center sm:gap-8 gap-5">
          <div
            onClick={() => router.push("/products")}
            className=" sm:block hidden"
          >
            <SearchNormal1 size="26" color="#000" />
          </div>
          <div onClick={() => router.push("/cart")} className="relative">
            <ShoppingCart size="26" color="#000" variant="Broken" />
            {products && products?.length > 0 && (
              <div className="h-4 min-w-4 text-[10px] flex items-center justify-center font-bold rounded-full bg-black text-white absolute -top-[3px] -right-[3px]">
                {products?.length}
              </div>
            )}
          </div>
          <div className=" sm:hidden block">
            <HambergerMenu size="29" color="#000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
