"use client";
import Button from "@/component/Button";
import InputField from "@/component/InputField";
import { useFetch } from "@/hooks/useFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import zod from "zod";
import { endpoints } from "../../../../../libs/endpoints";
import { toast } from "react-toastify";

const formScheme = zod.object({
  email: zod
    .string({ message: "please enter your email" })
    .email({ message: "required" })
    .nonempty(),
  password: zod.string({ message: "please enter your password" }).nonempty(),
});

type formSchemeType = zod.infer<typeof formScheme>;

const page = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<formSchemeType>({
    resolver: zodResolver(formScheme),
  });

  const { post } = useFetch();

  const handleFormSubmit = async (data: formSchemeType) => {
    const res = await post(endpoints.admin.auth.login, data);
    console.log({ res });
    if (res.success) {
      toast.success("Admin login successful");
      return;
    }
  };
  return (
    <div className=" flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="min-h-[400px] w-[500px] shadow-md p-5 border border-zinc-200 rounded-lg"
      >
        <p className=" text-center text-3xl mb-4">Login</p>
        <Controller
          name="email"
          control={control}
          render={({ field }: any) => (
            <InputField
              labelName="Email"
              {...field}
              errorMessage={errors?.email?.message}
            />
          )}
        />
        <br />
        <Controller
          name="password"
          control={control}
          render={({ field }: any) => (
            <InputField
              labelName="Password"
              type="password"
              errorMessage={errors?.password?.message}
              {...field}
            />
          )}
        />
        <br />
        <Button className=" p-4 w-full font-bold" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default page;
