"use client";
import { Checkbox } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { CartProduct, useCart } from "../../store/cart";
import { ArrowLeft2, Trash } from "iconsax-react";
import Button from "./Button";
import { products as rawProduct } from "../../libs/data";
import ProductCard from "./ProductCard";
import { toast } from "react-toastify";
import Empty from "./CartEmpty";

const CartPage = () => {
  const router = useRouter();
  const { products, editCartProduct, removeFromCart, addToCart, clearCart } =
    useCart();

  const handleEditCart = (id: string, product: CartProduct) => {
    editCartProduct(id, product);
  };

  const increaseProduct = (amount: number) => {
    return amount + 1;
  };
  const decreaseProduct = (amount: number) => {
    if (amount <= 0) {
      return amount;
    }
    return amount - 1;
  };

  const orderAmount = useMemo(() => {
    return products?.reduce((acc, product) => {
      if (!product?.isOrder) return acc;
      acc = acc + product?.price * product?.quantity;
      return acc;
    }, 0);
  }, [products]);

  const handleProceedToCheckout = () => {
    if (products?.every((products) => products.isOrder === false)) {
      return toast("Cart is empty", { type: "error" });
    }
    if (products && products?.length > 0) {
      return router.push("/checkout");
    }
    // showToast("Cart is empty", "warning");
    toast("Cart is empty", { type: "error" });
  };

  return (
    <div className="space-y-10 p-6 md:px-12 lg:px-20">
      <div
        onClick={() => router.back()}
        className="flex cursor-pointer items-center gap-x-2"
      >
        <ArrowLeft2 size={24} color="#000" />
        <p>Products</p>
      </div>

      <div className=" grid lg:grid-cols-2 gap-12">
        {products != undefined && products?.length > 0 ? (
          <div className="mt-3">
            <div className="flex w-full justify-end">
              <p
                onClick={clearCart}
                className=" font-semibold cursor-pointer hover:text-red-500"
              >
                Clear cart
              </p>
            </div>
            {products?.map((product, index) => (
              <div
                key={product._id}
                className={`flex items-center gap-5  py-3 dark:border-zinc-400 ${
                  index < products?.length - 1 ? " border-b" : "border-none"
                }`}
              >
                <Checkbox
                  color="#02b156"
                  checked={product?.isOrder}
                  onChange={(e) =>
                    handleEditCart(product?._id, {
                      ...product,
                      isOrder: e.target.checked,
                    })
                  }
                />
                <div className="flex flex-1 items-start gap-x-5">
                  <img
                    src={product?.images[0] ?? "/placeholders.jpg"}
                    alt=""
                    height={130}
                    width={130}
                  />
                  <div className="flex h-[130px] flex-col justify-center gap-4 py-2">
                    <p>{product?.name}</p>
                    <strong className="text-lg">
                      ₦{product?.price.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <div className="flex h-[130px] flex-col items-end justify-between py-4">
                  <div onClick={() => removeFromCart(product?._id)}>
                    <Trash size={25} color="#fb2c36" />
                  </div>
                  <div className="p-2 flex items-center gap-2 border rounded-full ">
                    <div
                      onClick={() => {
                        handleEditCart(product?._id, {
                          ...product,
                          quantity: decreaseProduct(product?.quantity),
                        });
                      }}
                      className="px-3 cursor-pointer"
                    >
                      -
                    </div>
                    <p>{product?.quantity}</p>
                    <div
                      onClick={() => {
                        handleEditCart(product?._id, {
                          ...product,
                          quantity: increaseProduct(product?.quantity),
                        });
                      }}
                      className="px-3 cursor-pointer"
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty />
        )}

        <div className="w-full space-y-8 ">
          <div className="space-y-2">
            <p className="text-2xl font-semibold">Cart Summary </p>
            <p>
              Breakdown of your order(s), including selected services and
              pricing.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p>Order amount:</p>
            <p className="">NGN {orderAmount?.toLocaleString()}</p>
          </div>

          <div className="flex items-center justify-between">
            <p>Delivery fee: </p>
            <p className="">Not included</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Total:</p>
            <p className="text-lg font-semibold">
              NGN {Number(orderAmount).toLocaleString()}
            </p>
          </div>

          <Button className="h-[48px] w-full" onClick={handleProceedToCheckout}>
            Proceed to checkout
          </Button>
        </div>
      </div>

      <div>
        <p className=" text-2xl md:text-4xl mt-10">You May Also Like</p>
        {/* <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
          {rawProduct.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default CartPage;
