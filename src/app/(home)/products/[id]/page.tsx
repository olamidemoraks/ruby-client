"use client";
import { Add, Minus, Star1 } from "iconsax-react";
import React, { useState } from "react";
import ProductCard from "@/component/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../../../../../libs/endpoints";
import { useFetch } from "@/hooks/useFetch";
import { useParams } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { Product } from "../../../../../types";
import { useCart } from "../../../../../store/cart";
import Button from "@/component/Button";
import { cn } from "../../../../../utils/utils";

const page = () => {
  const [quantity, setQuantity] = useState(1);
  const { get } = useFetch();
  const { id } = useParams();
  const [selectImage, setSelectImage] = useState<string>();
  const { addToCart, removeFromCart, products } = useCart();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["Product"],
    queryFn: async () => {
      const res = await get(`${endpoints.user.product.getProduct}/${id}`);
      return res.data.product;
    },
    enabled: !!id,
  });

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    product: Product | undefined
  ) => {
    e.stopPropagation();
    if (product) {
      const cartProduct = {
        _id: product._id,
        name: product.name,
        price: product?.discountPrice ? product?.discountPrice : product.price,
        quantity,
        images: product?.imageUrl,
      };
      if (!!products?.find(({ _id }) => _id == product?._id)) {
        removeFromCart(product?._id);
      } else {
        if (quantity > 0) addToCart(cartProduct);
      }
    }
  };
  return (
    <div className="p-6 md:px-12 lg:px-20 space-y-10">
      <div className="grid lg:grid-cols-2 gap-10 ">
        <div className="flex sm:flex-row flex-col-reverse gap-4">
          <div className="max-h-[500px] flex sm:flex-col gap-4">
            {product?.imageUrl?.map((image, index) => (
              <div
                key={index}
                className={
                  "sm:h-[100px] w-[calc(80vw/4)] h-[70px] sm:w-[100px] bg-[#F6F9F6] focus:border-2"
                }
                onClick={() => setSelectImage(image)}
              >
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  className=" h-full w-full"
                />
              </div>
            ))}
          </div>
          <div className=" sm:h-[500px] h-[400px] w-full bg-[#F6F9F6]">
            <img
              src={selectImage ?? product?.imageUrl[0]}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        </div>
        <div>
          <div className=" w-full space-y-3">
            <p className=" text-sm md:text-lg opacity-60 uppercase">{}</p>
            <div className="flex items-start w-full  ">
              <p className="text-xl md:text-3xl capitalize">{product?.name} </p>
            </div>
            {/* <div className="flex items-center gap-x-1  ">
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
            </div> */}
            <div className=" text-xl ">
              <>
                {product?.discountPrice ? (
                  <p className="font-bold ">
                    ₦{product?.discountPrice?.toLocaleString()}{" "}
                    <span className=" line-through text-sm opacity-50">
                      ₦{product?.price.toLocaleString()}
                    </span>
                  </p>
                ) : (
                  <p className="font-bold ">
                    ₦{product?.price.toLocaleString()}
                  </p>
                )}
              </>
            </div>

            <MDEditor.Markdown
              source={product?.description}
              style={{
                whiteSpace: "pre-wrap",
                backgroundColor: "white",
                color: "black",
              }}
            />

            <div className="flex items-center gap-4">
              <div className=" p-2 flex items-center gap-2 border rounded-full ">
                <div
                  className="px-3"
                  onClick={() =>
                    setQuantity((prev) => {
                      if (prev != 1) {
                        return prev - 1;
                      }
                      return prev;
                    })
                  }
                >
                  <Minus size="22" color="#000" />
                </div>
                <div>{quantity}</div>
                <div
                  onClick={() =>
                    setQuantity((prev) => {
                      return prev + 1;
                    })
                  }
                  className=" px-3"
                >
                  <Add size="22" color="#000" />
                </div>
              </div>
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className={cn(
                  " block p-2 text-sm cursor-pointer bg-black text-white uppercase w-full md:w-[40%] text-center rounded-full",
                  {
                    "border-none !bg-red-500": !!products?.find(
                      ({ _id }) => _id == product?._id
                    ),
                  }
                )}
              >
                {!!products?.find(({ _id }) => _id == product?._id)
                  ? "Remove from cart"
                  : "Add to cart"}{" "}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <p className=" text-2xl md:text-4xl mt-10">You May Also Like</p>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
          
        </div>
      </div> */}
    </div>
  );
};

export default page;
