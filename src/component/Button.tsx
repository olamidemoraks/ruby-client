import React, { ReactNode } from "react";

const Button = ({
  children,
  className,
  onClick,
  type,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}) => {
  return (
    <button
      type={type ?? "button"}
      className={` bg-black text-white rounded-full flex justify-center items-center ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
