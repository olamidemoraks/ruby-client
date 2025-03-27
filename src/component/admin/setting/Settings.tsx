"use client";
import React, { ReactNode, Suspense, useEffect, useState } from "react";
import { useSidebarStore } from "../../../../store/sidebar";
import { cn } from "../../../../utils/utils";
import { Card, Lock } from "iconsax-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { BiChevronLeft } from "react-icons/bi";
import AccountDetails from "./AccountDetails";
import Password from "./Password";

const SettingsComponent: React.FC = () => {
  const { setTitle } = useSidebarStore();
  const searchParams = useSearchParams(); // ✅ Now inside Suspense!
  const query = new URLSearchParams(searchParams?.toString() || "");
  const tabs = searchParams?.get("tabs") ?? "account";
  const router = useRouter();
  const pathname = usePathname();
  const [switchTab, setSwitchTab] = useState(false);

  useEffect(() => {
    setTitle("Setting");
  }, []);

  const handleSearchParams = (param: string, value: string) => {
    query.set(param, value);
    router.replace(`${pathname}?${query.toString()}`);
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
    <div className="flex">
      {/* Sidebar */}
      <div
        className={cn(
          "md:flex-[.4] flex-1 h-[87vh] bg-white rounded-l-md border-r border-zinc-300 p-5 space-y-4",
          switchTab && "max-md:hidden"
        )}
      >
        <div
          className={cn(
            "hover:bg-purple-50 hover:text-purple-500 p-2 px-4 flex items-center gap-5 cursor-pointer",
            tabs === "account" && "bg-purple-50 text-purple-500"
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
            "hover:bg-purple-50 hover:text-purple-500 p-2 px-4 flex items-center gap-5 cursor-pointer",
            tabs === "password" && "bg-purple-50 text-purple-500"
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

      {/* Content */}
      <div
        className={cn(
          "flex-1 h-[87vh] bg-white rounded-md p-5",
          !switchTab && "max-md:hidden"
        )}
      >
        <div
          className="flex items-center gap-x-2 w-fit md:hidden cursor-pointer"
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

// ✅ Wrap in Suspense to fix "useSearchParams() should be wrapped in a Suspense boundary"
const Settings: React.FC = () => {
  return (
    <Suspense fallback={<p>Loading settings...</p>}>
      <SettingsComponent />
    </Suspense>
  );
};

export default Settings;
