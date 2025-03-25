"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useSidebarStore } from "../../../../store/sidebar";
import { cn } from "../../../../utils/utils";
import { Card, Lock } from "iconsax-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { BiChevronLeft } from "react-icons/bi";
import AccountDetails from "./AccountDetails";
import Password from "./Password";

const Settings = () => {
  const { setTitle } = useSidebarStore();
  const searchParams = useSearchParams();
  const query = new URLSearchParams(searchParams || {});
  const tabs = searchParams.get("tabs");
  const router = useRouter();
  const pathname = usePathname();
  const [switchTab, setSwitchTab] = useState(false);

  useEffect(() => {
    setTitle("Setting");
  }, []);

  const handleSearchParams = (params: string, value: any) => {
    query.set(params, value);
    router.replace(`${pathname}?${query}`);
  };

  let content: ReactNode;

  switch (tabs) {
    case "account":
      content = <AccountDetails />;
      break;
    case "password":
      content = <Password />;
      break;
    default:
      content = <AccountDetails />;
      break;
  }
  return (
    <div className=" flex">
      <div
        className={cn(
          "md:flex-[.4] flex-1 h-[87vh] bg-white rounded-l-md border-r border-zinc-300 p-5 space-y-4",
          switchTab && "max-md:hidden"
        )}
      >
        <div
          className={cn(
            "hover:bg-purple-50 hover:text-purple-500 p-2 px-4 flex  items-center gap-5 ",
            tabs == "account" && "bg-purple-50 text-purple-500"
          )}
          onClick={() => {
            handleSearchParams("tabs", "account");
            setSwitchTab(true);
          }}
        >
          <Card size="25" color="#ad46ff" />
          Account Details
        </div>
        <div
          className={cn(
            "hover:bg-purple-50 hover:text-purple-500 p-2 px-4 flex  items-center gap-5 ",
            tabs == "password" && "bg-purple-50 text-purple-500"
          )}
          onClick={() => {
            handleSearchParams("tabs", "password");
            setSwitchTab(true);
          }}
        >
          <Lock size="25" color="#ad46ff" />
          Password
        </div>
      </div>
      <div
        className={cn(
          "flex-1 h-[87vh] bg-white rounded-md p-5",
          !switchTab && "max-md:hidden"
        )}
      >
        <div
          className="flex items-center gap-x-2 w-fit md:hidden "
          onClick={() => setSwitchTab(false)}
        >
          <BiChevronLeft size={26} />
          Back
        </div>
        {content}
      </div>
    </div>
  );
};

export default Settings;
