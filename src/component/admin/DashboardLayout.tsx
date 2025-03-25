"use client";
import React, { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <DashboardNavbar />

      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar />
        <div className=" w-full bg-indigo-50/40 min-h-screen overflow-y-auto ">
          <div className=" md:p-7 p-4">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
