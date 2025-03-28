import React, { useEffect } from "react";
import { object, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import InputField from "@/component/InputField";
import SelectField from "@/component/SelectField";
import { bankCodes } from "../../../../libs/data";
import Button from "@/component/Button";
import { useMutation } from "@tanstack/react-query";
import { useFetch } from "@/hooks/useFetch";
import { endpoints } from "../../../../libs/endpoints";
import { toast } from "react-toastify";
import { useUserStore } from "../../../../store/user";

export const accountFormScheme = z.object({
  accountName: z
    .string({ message: "please provide account name" })
    .nonempty({ message: "please provide account name" }),
  accountBank: z
    .string({ message: "please provide account bank" })
    .nonempty({ message: "please provide account bank" }),
  accountNumber: z
    .string({ message: "please provide account number" })
    .nonempty({ message: "please provide account number" }),
  phoneNumber: z
    .string({ message: "please provide phone number" })
    .nonempty({ message: "please provide phone number" }),
  whatsAppNumber: z
    .string({ message: "please provide whatsAppNumber number" })
    .nonempty({ message: "please provide whatsAppNumber number" }),
});

type IFormScheme = z.infer<typeof accountFormScheme>;
const AccountDetails = () => {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<IFormScheme>({
    resolver: zodResolver(accountFormScheme),
  });
  const { user } = useUserStore();
  const { put } = useFetch();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["ACCOUNT-DETAILS"],
    mutationFn: async (value: any) => {
      const res = await put(endpoints.admin.auth.accountEdit, value);
      if (res.success) {
        return toast.success("Account detail updated ");
      }
      toast.error(res.data ?? "failed to update");
    },
  });

  const handleSubmitAccount = (value: IFormScheme) => {
    mutateAsync(value);
  };

  useEffect(() => {
    if (user) {
      Object.entries(user).map((value: any) => {
        setValue(value[0], value[1]);
      });
    }
  }, [user]);
  return (
    <div>
      <p className=" pt-3 font-semibold text-lg">Account Details</p>
      <p>Please fill in your correct account information.</p>

      <form
        onSubmit={handleSubmit(handleSubmitAccount)}
        className=" space-y-3 mt-4"
      >
        <Controller
          name="accountName"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              labelName="Account Name"
              errorMessage={errors.accountName?.message}
              required
            />
          )}
        />
        <Controller
          name="accountNumber"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              labelName="Account Number"
              errorMessage={errors.accountNumber?.message}
              required
            />
          )}
        />

        <Controller
          name="accountBank"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              data={bankCodes.map((bankData) => ({
                value: bankData.name,
                label: bankData.name,
              }))}
              label="Bank Name"
              required
              searchable
              errorMessage={errors.accountBank?.message}
              placeholder="Select your bank"
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              labelName="Phone Number"
              errorMessage={errors.phoneNumber?.message}
              required
            />
          )}
        />
        <Controller
          name="whatsAppNumber"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              labelName="WhatsApp Number"
              errorMessage={errors.phoneNumber?.message}
              required
            />
          )}
        />
        <Button type="submit">Save and continue</Button>
      </form>
    </div>
  );
};

export default AccountDetails;
