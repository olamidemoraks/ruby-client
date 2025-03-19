import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]): string => {
  return twMerge(clsx(classes));
};

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

export const getInitials = (value: string): string => {
  const arr = value.split(" ");
  return arr.length === 1 ? arr[0][0] : arr[0][0] + arr[1][0];
};

export const getKeys = <T extends string | number | symbol>(
  obj: Record<T, unknown>,
): T[] => {
  return Object.keys(obj) as T[];
};

export const formatNaira = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};
