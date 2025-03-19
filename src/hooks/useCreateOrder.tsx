"use client";
import Button from "@/component/Button";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../../store/cart";

function useCreateOrder() {
  const [opened, { open, close }] = useDisclosure(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const createOrder = () => {
    toast("Order Created Successfully", { type: "success" });
    close();
  };

  const openModal = (total: number) => {
    setTotalAmount(total);
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
              Access Bank
            </p>
            <p className=" font-semibold text-lg tracking-wider">8100311867</p>
            <div className=" text-center space-x-1">
              <p className=" text-xs opacity-70">Account Name</p>
              <p className=" capitalize">Olamide Morakinyo</p>
            </div>
          </div>

          <p className=" text-sm opacity-75">
            p.s: Send transaction receipt to <strong>08102129821</strong> on
            whatsapp to confirm your order
          </p>
          <Button
            onClick={createOrder}
            className=" px-5 py-3 rounded-lg w-full"
          >
            I've transfered the money
          </Button>
        </div>
      </Modal>
    ),
  };
}

export { useCreateOrder };
