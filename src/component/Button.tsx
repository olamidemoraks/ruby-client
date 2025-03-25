import React, { ReactNode } from "react";

const Button = ({
  children,
  className,
  onClick,
  type,
  disabled,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}) => {
  return (
    <button
      type={type ?? "button"}
      className={` bg-black disabled:opacity-30 text-white rounded-full flex justify-center items-center px-4 p-2 h-fit ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
