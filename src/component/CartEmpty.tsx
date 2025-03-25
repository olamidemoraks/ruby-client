import React from "react";
import CartImg from "../../assets/cart-empty.svg";

const CartEmpty = ({ image }: { image?: string }) => {
  return (
    <div className=" h-full w-full flex justify-center items-center">
      <img
        src={image ?? "/cart-empty.svg"}
        alt="cart"
        height={200}
        width={200}
      />
    </div>
  );
};

export default CartEmpty;
