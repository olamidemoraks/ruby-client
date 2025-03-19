import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { InputHTMLAttributes, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { BiLoader } from "react-icons/bi";
import { cn } from "../../utils/utils";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  labelName?: string;
  subLabel?: string;
  errorMessage?: string;
  register?: UseFormRegister<any>;
  isLoading?: boolean;
};
const InputField = ({
  register,
  labelName,
  subLabel,
  errorMessage,
  required,
  type,
  isLoading,
  style,
  className,
  ...props
}: InputFieldProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-3">
      <p className="text-sm">
        {labelName} <span className="italic opacity-40">{subLabel}</span>{" "}
        {required && <span className="text-red-500">*</span>}
      </p>

      <div className="relative">
        {register ? (
          <input
            style={{ height: 48 }}
            type={type === "password" ? (show ? "text" : "password") : type}
            className={cn(
              "w-full rounded-md border border-neutral-400 px-3 outline-none placeholder:text-sm focus:border-primary-400",
              className,
              errorMessage && "border-error-400"
            )}
            {...register(props.name!, { required: required })}
            {...props}
          />
        ) : (
          <input
            style={{ height: 48 }}
            type={type === "password" ? (show ? "text" : "password") : type}
            className={cn(
              "w-full rounded-md border border-neutral-400 px-3 outline-none placeholder:text-sm focus:border-primary-400",
              className,
              errorMessage && "border-[#EA5455]"
            )}
            {...props}
          />
        )}

        {type === "password" && (
          <div
            onClick={() => setShow((prev) => !prev)}
            className="absolute right-0 top-0 flex h-full w-[60px] cursor-pointer items-center justify-center"
          >
            {show ? (
              <AiOutlineEye size={20} />
            ) : (
              <AiOutlineEyeInvisible size={20} />
            )}
          </div>
        )}

        {isLoading && (
          <div className="absolute right-0 top-0 flex h-full w-[10%] items-center justify-center">
            <BiLoader className="animate-spin" size={23} />
          </div>
        )}
      </div>
      {errorMessage && (
        <p className="!mt-1 text-sm text-red-400">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
