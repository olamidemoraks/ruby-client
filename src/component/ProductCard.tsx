import { Text } from "@mantine/core";
import { ShoppingCart, Star1, Trash } from "iconsax-react";
import React from "react";
import { useCart } from "../../store/cart";
import { Product } from "../../types";

type Props = {
  product: Product;
};
const ProductCard = ({ product }: Props) => {
  const { products, addToCart, removeFromCart } = useCart();
  const handleAddToCart = (e: React.MouseEvent<any, MouseEvent>) => {
    e.stopPropagation();
    const cartProduct = {
      _id: product?._id,
      name: product.name,
      price: product?.discountPrice ? product?.discountPrice : product.price,
      quantity: 1,
      images: [...product?.imageUrl],
    };
    if (!!products?.find(({ _id }) => _id == product?._id)) {
      removeFromCart(product?._id);
    } else {
      addToCart(cartProduct);
    }
  };
  return (
    <div className=" w-full group ">
      <div className="h-[300px] mb-1 md:h-[350px] w-full bg-[#F6F9F6] flex flex-col justify-center items-center relative">
        <img
          src={product?.imageUrl[0]}
          height={300}
          width={300}
          alt=""
          loading="lazy"
          className=" h-full w-full object-cover"
        />

        <div
          onClick={(e) => handleAddToCart(e)}
          className=" md:group-hover:block hidden text-sm cursor-pointer bg-black text-white uppercase  p-2 text-center rounded-full absolute bottom-4 right-4"
        >
          {!!products?.find(({ _id }) => _id == product?._id) ? (
            <Trash size={26} color="#fff" />
          ) : (
            <ShoppingCart size="26" color="#fff" variant="Broken" />
          )}
        </div>
      </div>
      <div className=" w-full flex-col gap-2">
        <p className=" text-xs opacity-60 uppercase">{product?.category}</p>
        <div className="flex items-start w-full  ">
          <Text lineClamp={2} className=" sm:text-lg capitalize  flex-1">
            {product?.name}
          </Text>
          {product?.discountPrice ? (
            <div className=" flex-[.3] ">
              <p className="font-bold text-end">
                ₦{product?.discountPrice.toLocaleString()}
              </p>
              <p className=" line-through text-xs opacity-50 text-end">
                ₦{product?.price.toLocaleString()}
              </p>
            </div>
          ) : (
            <div className=" flex-[.3]">
              <p className="font-bold text-end">
                ₦{product?.price.toLocaleString()}
              </p>
            </div>
          )}
        </div>
        {/* <div className="flex items-center gap-x-1 sm:mt-1 ">
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <Star1
                key={idx}
                size="14"
                color={product.rating > idx ? "#BDCE76" : "#E2E2E2"}
                variant="Bold"
              />
            ))}
        </div> */}

        <div
          onClick={(e) => handleAddToCart(e)}
          className=" block md:hidden p-2 text-sm cursor-pointer bg-black text-white uppercase w-full md:w-[40%] text-center rounded-full mt-3"
        >
          {!!!products?.find(({ _id }) => _id == product?._id)
            ? "Add To Cart"
            : "Remove from cart"}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
