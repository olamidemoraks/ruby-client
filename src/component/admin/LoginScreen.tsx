"use client";
import Button from "@/component/Button";
import InputField from "@/component/InputField";
import { useFetch } from "@/hooks/useFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import zod from "zod";
import { toast } from "react-toastify";
import { endpoints } from "../../../libs/endpoints";
import { setCookie } from "cookies-next";
import { COOKIE_KEYS } from "../../../libs/data";
import { useRouter } from "next/navigation";
import { PiSpinner } from "react-icons/pi";

const formScheme = zod.object({
  email: zod
    .string({ message: "please enter your email" })
    .email({ message: "required" })
    .nonempty(),
  password: zod.string({ message: "please enter your password" }).nonempty(),
});

type formSchemeType = zod.infer<typeof formScheme>;

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<formSchemeType>({
    resolver: zodResolver(formScheme),
  });

  const { post } = useFetch();
  const { push } = useRouter();

  const handleFormSubmit = async (data: formSchemeType) => {
    setIsLoading(true);
    const res = await post(endpoints.admin.auth.login, data);
    setIsLoading(false);
    if (res.success) {
      const token = res.data.token;
      toast.success("Admin login successful");
      setCookie(COOKIE_KEYS.IS_REGISTERED, true);
      setCookie(COOKIE_KEYS.TOKEN, token);
      push("/dashboard");
      return;
    }
    toast.error(res.data);
  };
  return (
    <div className=" flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="min-h-[400px] w-[500px] shadow-md p-5 border border-zinc-200 rounded-lg"
      >
        <p className=" text-center text-3xl mb-4">Admin Login</p>
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
        <Button
          className=" p-4 w-full font-bold"
          type="submit"
          disabled={isLoading}
        >
          Login {isLoading && <PiSpinner className=" animate-spin" size={22} />}
        </Button>
      </form>
    </div>
  );
};

export default LoginScreen;
