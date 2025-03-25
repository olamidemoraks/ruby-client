import Button from "@/component/Button";
import InputField from "@/component/InputField";
import { useFetch } from "@/hooks/useFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { endpoints } from "../../../../libs/endpoints";
import { toast } from "react-toastify";

export const AdminSettingsPasswordSchema = z
  .object({
    password: z.string({ required_error: "Password is required" }),

    newPassword: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),

    confirmPassword: z
      .string({ required_error: "Confirm Password is required" })
      .min(8, { message: "Confirm Password must be at least 8 characters" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type AdminSettingsPasswordType = z.infer<
  typeof AdminSettingsPasswordSchema
>;

const Password = () => {
  const { put } = useFetch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminSettingsPasswordType>({
    resolver: zodResolver(AdminSettingsPasswordSchema),
  });

  const onSubmit = async (value: AdminSettingsPasswordType) => {
    setIsLoading(true);
    const res = await put(endpoints.admin.profile.changePassword, {
      password: value.password,
      newPassword: value.newPassword,
    });
    setIsLoading(false);
    if (res.success) {
      toast.success("Password change successful");
    } else {
      toast.error(res.data ?? "Password change unsuccessful");
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <p className="border-b border-neutral-200 pb-4 text-lg font-semibold">
        Change Password
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              placeholder="Enter current password "
              labelName="Password"
              type="password"
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              placeholder="Must be 8 characters long"
              labelName="New Password"
              type="password"
              errorMessage={errors.newPassword?.message}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              placeholder="Must be 8 characters long"
              labelName="Confirm Password"
              type="password"
              errorMessage={errors.confirmPassword?.message}
            />
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Password;
