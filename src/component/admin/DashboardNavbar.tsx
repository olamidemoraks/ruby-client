import React, { Dispatch, SetStateAction } from "react";
import { BiChevronDown } from "react-icons/bi";
import { IoStorefront } from "react-icons/io5";
import { useSidebarStore } from "../../../store/sidebar";
import { GoSidebarExpand } from "react-icons/go";
import { Menu } from "@mantine/core";
import { TbLogout2, TbUserEdit } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { Divide as Hamburger } from "hamburger-react";
import useUser from "@/hooks/useUser";
import { useUserStore } from "../../../store/user";
import { useLogout } from "@/hooks/useLogout";

const DashboardNavbar = () => {
  const { title } = useSidebarStore();
  const { sidebar, setSidebar, collapseSidebar, collapsed } = useSidebarStore();
  const { refetchUserInfo } = useUser();
  const { user } = useUserStore();
  const router = useRouter();
  const { logout } = useLogout();
  // refetchUserInfo();
  return (
    <div className=" p-4 overflow-x-clip w-full border-b border-neutral-200">
      <div className="flex items-center justify-between ">
        <div className="flex  items-center">
          <p className={` text-xl sm:text-3xl font-bold text-center p-5`}>
            Ruby's Empire
          </p>
          <div className=" capitalize text-xl font-bold md:flex hidden items-center gap-x-2">
            <GoSidebarExpand size={27} onClick={() => collapseSidebar()} />
            {title}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Menu
            styles={{
              dropdown: {
                width: "250px !important",
                marginTop: 8,
                padding: 12,
                gap: 10,
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            <Menu.Target>
              <div className=" bg-white p-2 rounded-full flex items-center gap-x-3 border border-purple-100">
                <div className="h-10 w-10 rounded-full bg-purple-500 text-white flex items-center justify-center">
                  <IoStorefront />
                </div>
                <div className=" sm:block hidden">
                  <p className=" text-sm font-bold">{user?.name}</p>
                  <p className=" text-sm">{user?.email}</p>
                </div>
                <BiChevronDown size={27} />
              </div>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() => router.push("/dashboard/setting?tabs=account")}
                leftSection={<TbUserEdit size={20} />}
              >
                Edit Profile
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item
                styles={{
                  item: {
                    color: "#f87171",
                  },
                }}
                onClick={logout}
                leftSection={<TbLogout2 size={20} />}
              >
                Log Out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <div className="md:hidden">
            <Hamburger
              toggled={sidebar}
              toggle={setSidebar as Dispatch<SetStateAction<boolean>>}
              size={25}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
