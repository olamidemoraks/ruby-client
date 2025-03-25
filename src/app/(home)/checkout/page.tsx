"use client";
import { ArrowLeft2 } from "iconsax-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useCart } from "../../../../store/cart";
import Button from "@/component/Button";
import { NIGERIAN_STATES } from "../../../../libs/data";
import ProductCard from "@/component/ProductCard";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod, { any } from "zod";
import InputField from "@/component/InputField";
import SelectField from "@/component/SelectField";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { toast } from "react-toastify";
import CartEmpty from "@/component/CartEmpty";
import { useMutation } from "@tanstack/react-query";
import { useFetch } from "@/hooks/useFetch";
import { endpoints } from "../../../../libs/endpoints";

const formScheme = zod.object({
  city: zod.string().min(1, "city is required"),
  address: zod.string().min(1, "customer address is required"),
  state: zod.string().min(1, "state is required"),
  phoneNumber: zod.string().min(1, "contact number is required"),
  email: zod.string().email().min(1, "contact email is required"),
  name: zod.string().min(1, "fullname is required"),
});
type formSchemeType = zod.infer<typeof formScheme>;

const page = () => {
  const router = useRouter();
  const { products, clearCart } = useCart();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<formSchemeType>({
    resolver: zodResolver(formScheme),
  });
  const [shippingFee, setShippingFee] = useState();
  const { post } = useFetch();

  const { mutateAsync } = useMutation({
    mutationKey: ["GET-SHIPPING-FEE"],
    mutationFn: async ({ state }: { state: string }) => {
      const res = await post(endpoints.user.shipping.getShippingFee, {
        state,
      });
      if (res.success) {
        setShippingFee(res.data.shippingFee);
      }
    },
  });

  const orderAmount = useMemo(() => {
    return products?.reduce((acc, product) => {
      if (!product?.isOrder) return acc;
      acc = acc + product?.price * product?.quantity;
      return acc;
    }, 0);
  }, [products]);

  const { openCreateOrder, viewCreateOrder } = useCreateOrder();

  const handleProceedToCheckout = (value: formSchemeType) => {
    if (products && products?.length > 0) {
      return openCreateOrder(Number(orderAmount) + Number(shippingFee), value);
    }
    toast("Cart is empty", { type: "error" });
  };

  useEffect(() => {
    mutateAsync({ state: watch("state") });
  }, [watch("state")]);

  return (
    <div className="space-y-10 p-6 md:px-12 lg:px-20">
      {viewCreateOrder}
      <div
        onClick={() => router.back()}
        className="flex cursor-pointer items-center gap-x-2"
      >
        <ArrowLeft2 size={24} color="#000" />
        <p>Cart</p>
      </div>

      <div className=" grid lg:grid-cols-2 gap-12">
        {products != undefined && products?.length > 0 ? (
          <div className="mt-3">
            {products
              .filter((product) => product.isOrder === true)
              ?.map((product, index) => (
                <div
                  key={product._id}
                  className={`flex items-center gap-5  py-3 dark:border-zinc-400 ${
                    index < products?.length - 1 ? " border-b" : "border-none"
                  }`}
                >
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
                        ₦{(product?.price * product?.quantity).toLocaleString()}
                      </strong>
                    </div>
                  </div>

                  <div className="flex h-[130px] flex-col items-end justify-between py-4">
                    <p>Qty: {product?.quantity}</p>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <CartEmpty />
        )}

        <form
          onSubmit={handleSubmit(handleProceedToCheckout)}
          className="space-y-10"
        >
          <div className="w-full space-y-8">
            <div className="space-y-2">
              <p className="text-2xl font-semibold">Shipping details </p>
              <p>Enter the address where you want the door to be delivered.</p>
            </div>

            <div className="space-y-4">
              <Controller
                name="address"
                control={control}
                render={({ field }: any) => (
                  <InputField
                    {...field}
                    placeholder="Enter address"
                    labelName="Customer Address"
                    errorMessage={errors.address?.message}
                  />
                )}
              />

              <div className="grid grid-cols-2 gap-x-3">
                <Controller
                  name="city"
                  control={control}
                  render={({ field }: any) => (
                    <InputField
                      {...field}
                      placeholder="Enter city"
                      labelName="City"
                      errorMessage={errors.city?.message}
                    />
                  )}
                />
                <Controller
                  name="state"
                  control={control}
                  render={({ field }: any) => (
                    <SelectField
                      {...field}
                      data={NIGERIAN_STATES}
                      label={"State"}
                      withAsterisk
                      errorMessage={errors.state?.message}
                      placeholder="Select state"
                    />
                  )}
                />
              </div>
              <p className="text-2xl font-semibold">Contact Information </p>

              <Controller
                name="name"
                control={control}
                render={({ field }: any) => (
                  <InputField
                    {...field}
                    placeholder="Enter fullname"
                    labelName="Full Name"
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <div className="grid grid-cols-2 gap-x-3">
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }: any) => (
                    <InputField
                      {...field}
                      placeholder="Enter phone number"
                      labelName="Contact Number"
                      errorMessage={errors.phoneNumber?.message}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }: any) => (
                    <InputField
                      {...field}
                      placeholder="Enter email"
                      labelName="Contact Email"
                      errorMessage={errors.email?.message}
                    />
                  )}
                />
              </div>
            </div>

            <div className="">
              <Button
                type="button"
                className="h-[48px] w-full border-primary-400 text-primary-400"
                onClick={() => router.push("/cart")}
              >
                Update cart
              </Button>
            </div>
          </div>
          <div className="w-full space-y-8">
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
              <p className="">
                {shippingFee
                  ? `NGN ${Number(shippingFee).toLocaleString()}`
                  : "Not Included"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Total:</p>
              <p className="text-lg font-semibold">
                NGN{" "}
                {(
                  Number(orderAmount) + Number(shippingFee ?? 0)
                ).toLocaleString()}
              </p>
            </div>

            <Button type="submit" className="h-[48px] w-full">
              Proceed to checkout
            </Button>
          </div>
        </form>
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

export default page;
