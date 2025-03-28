import React from "react";
import { MdDashboard, MdOutlineShoppingCart } from "react-icons/md";
import { IoSettingsOutline, IoStorefrontOutline } from "react-icons/io5";
import SidebarSection from "./SidebarSection";
import { SidebarLink } from "../../../types";
import { useSidebarStore } from "../../../store/sidebar";
import { cn } from "../../../utils/utils";
import { BiCategory } from "react-icons/bi";
import { CiDeliveryTruck } from "react-icons/ci";
const DashboardSidebar = () => {
  const sidebarItems: SidebarLink[] = [
    {
      container: false,
      icon: <MdDashboard />,
      path: "/dashboard",
      text: "Dashboard",
    },
    {
      container: true,
      icon: <IoStorefrontOutline />,
      caption: "Product",
      links: [
        {
          path: "/dashboard/product",
          text: "Manage Products",
        },
        {
          path: "/dashboard/product/add",
          text: "Add Product",
        },
      ],
    },

    {
      container: false,
      icon: <BiCategory />,
      path: "/dashboard/category",
      text: "Category",
    },
    {
      container: false,
      icon: <MdOutlineShoppingCart />,
      path: "/dashboard/orders",
      text: "Orders",
    },

    {
      container: false,
      icon: <CiDeliveryTruck />,
      path: "/dashboard/shipping-fee",
      text: "Shipping Fee",
    },
    {
      container: false,
      icon: <IoSettingsOutline />,
      path: "/dashboard/setting",
      text: "Settings",
    },
  ];
  const { collapseSidebar, collapsed, sidebar } = useSidebarStore();

  return (
    <div
      className={cn(
        ` xs:w-1/2 border-r border-neutral-200 fixed bottom-0 top-0 z-20 w-3/5 bg-white -translate-x-full  pt-24 transition-[width,_transform] duration-300`,
        sidebar && "translate-x-0",
        "sidebar",
        "md:static md:!w-[250px] md:translate-x-0 md:pt-10",
        collapsed && "sm:!w-[4rem] md:!w-[4rem]"
      )}
    >
      <div className=" mt-10">
        <div className="h-full overflow-y-auto">
          <SidebarSection title="Main menu" links={sidebarItems} />
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
