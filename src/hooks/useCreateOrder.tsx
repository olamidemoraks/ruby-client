"use client";
import Button from "@/component/Button";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../../store/cart";
import { useMutation, useQuery } from "@tanstack/react-query";
import { endpoints } from "../../libs/endpoints";
import { useFetch } from "./useFetch";
import { useRouter } from "next/navigation";
import useGetAccount from "./product/useGetAccount";

export type ShippingAddress = {
  address: string;
  email: string;
  city: string;
  state: string;
  phoneNumber: string;
  name: string;
};
function useCreateOrder() {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const { post } = useFetch();
  const { products, clearCart } = useCart();
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>();
  const { Account } = useGetAccount();

  const { mutateAsync: createOrderAsync, isPending } = useMutation({
    mutationKey: ["CREATE-ORDER"],
    mutationFn: async ({ value }: { value: any }) => {
      const res = await post(endpoints.user.order.createOrder, value);
      if (res.success) {
        toast("Order Created Successfully", { type: "success" });
        clearCart();
        router.push(`/track-order/?ref=${res.data.orderRef}`);
        close();
      } else {
        toast("Order failed", { type: "error" });
      }
    },
  });

  const createOrder = () => {
    const selectProduct = products?.filter(
      (product) => product.isOrder === true
    );
    if (selectProduct && selectProduct?.length < 1) {
      return toast("Cart is empty", { type: "error" });
    }
    const orderData = {
      items: selectProduct?.map((product) => ({
        ...product,
        productId: product?._id,
      })),
      shippingAddress: {
        street: shippingAddress?.address,
        city: shippingAddress?.city,
        state: shippingAddress?.state,
        email: shippingAddress?.email,
        phoneNumber: shippingAddress?.phoneNumber,
        name: shippingAddress?.name,
      },
      totalAmount,
    };
    createOrderAsync({ value: orderData });
  };

  const openModal = (total: number, address: ShippingAddress) => {
    setTotalAmount(total);
    setShippingAddress(address);
    open();
  };
  return {
    openCreateOrder: openModal,
    viewCreateOrder: (
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        styles={{
          header: {
            background: "white",
          },
          content: {
            background: "white",
          },
        }}
      >
        <div className="p-4 space-y-4 ">
          <div className=" flex justify-center text-xl font-bold ">
            {/* <Image src="/checkout.svg" height={100} width={100} alt="" /> */}
            Thank you for your patronage
          </div>

          {/* amount to pay */}
          <div className=" bg-neutral-100 p-2 rounded-lg text-center">
            <p className=" text-xs">Amount to pay</p>
            <p className=" text-xl font-bold">
              NGN {totalAmount.toLocaleString()}
            </p>
          </div>
          <p className=" text-center text-sm">
            Transfer to account details below
          </p>
          <div className=" bg-neutral-100 p-2 text-center space-y-1">
            <p className=" uppercase tracking-widest font-semibold">
              {Account?.accountBank}
            </p>
            <p className=" font-semibold text-lg tracking-wider">
              {Account?.accountNumber}
            </p>
            <div className=" text-center space-x-1">
              <p className=" text-xs opacity-70">Account Name</p>
              <p className=" capitalize">{Account?.accountName}</p>
            </div>
          </div>

          <p className=" text-sm opacity-75">
            p.s: Send transaction receipt to{" "}
            <strong>{Account?.whatsAppNumber}</strong> on whatsapp or call{" "}
            <strong>{Account?.phoneNumber}</strong> to confirm your order
          </p>
          <Button
            onClick={createOrder}
            disabled={isPending}
            className=" px-5 py-3 rounded-lg w-full"
          >
            {isPending ? "Creating order" : "I've transfered the money"}
          </Button>
        </div>
      </Modal>
    ),
  };
}

export { useCreateOrder };
