import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LiaAngleRightSolid } from "react-icons/lia";
import { SidebarLink } from "../../../types";
import { useSidebarStore } from "../../../store/sidebar";
import { cn } from "../../../utils/utils";

type SidebarSectionProps = {
  title: string;
  links: SidebarLink[];
};

export default function SidebarSection({ title, links }: SidebarSectionProps) {
  const { push } = useRouter();
  const pathname = usePathname();
  const { setSidebar, collapsed } = useSidebarStore();

  const closeSidebar = () => {
    setSidebar(false);
  };

  return (
    <section className="mb-2 text-sm">
      <h2 className={cn("mb-2 px-5 py-1 uppercase", collapsed && "md:hidden")}>
        {title}
      </h2>
      <ul className="space-y-2">
        {links.map((link, idx) => {
          if (link.container) {
            return (
              <li
                key={idx}
                onClick={() => {
                  push(link.links[0].path);
                  closeSidebar();
                }}
              >
                <div
                  className={cn(
                    "flex items-center justify-between cursor-pointer gap-2 border-l-4 border-transparent px-4 py-2 ",
                    link.links.some(
                      (link) =>
                        link.path === pathname ||
                        link.path.split("/")[
                          link.path.split("/").length - 2
                        ] ===
                          pathname.split("/")[pathname.split("/").length - 2]
                    ) &&
                      " border-purple-400 bg-purple-50 font-semibold text-purple-400 "
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-xl">{link.icon}</div>
                    <p className={cn(collapsed && "sm:hidden")}>
                      {link.caption}
                    </p>
                  </div>
                  <LiaAngleRightSolid
                    size={14}
                    className={cn(
                      "text-base transition-transform duration-300",
                      link.links.some(
                        (link) =>
                          link.path === pathname ||
                          link.path.split("/")[
                            link.path.split("/").length - 2
                          ] ===
                            pathname.split("/")[pathname.split("/").length - 2]
                      ) && "rotate-90",
                      collapsed && "sm:hidden"
                    )}
                  />
                </div>
                <ul
                  className={cn(
                    "hidden",
                    link.links.some(
                      (link) =>
                        link.path === pathname ||
                        link.path.split("/")[
                          link.path.split("/").length - 2
                        ] ===
                          pathname.split("/")[pathname.split("/").length - 2]
                    ) && "block",
                    collapsed && "sm:hidden"
                  )}
                >
                  {link.links.map(({ path, text }) => (
                    <li
                      key={text}
                      onClick={(e) => {
                        e.stopPropagation();
                        closeSidebar();
                      }}
                    >
                      <Link
                        href={path}
                        className={cn(
                          "ml-6 mt-2 block w-max rounded-lg px-4 py-2 hover:bg-purple-100/50",
                          path === pathname &&
                            "border-purple-400 bg-purple-50 font-semibold text-purple-400"
                        )}
                      >
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          } else {
            return (
              <li key={link.text}>
                <Link
                  href={link.path}
                  className={cn(
                    "flex items-center gap-2 border-l-4 border-transparent px-4 py-2 hover:bg-purple-100/50",
                    link.path === pathname &&
                      "border-purple-400 bg-purple-50 font-semibold text-purple-400 "
                  )}
                  onClick={closeSidebar}
                >
                  <div className="text-xl">{link.icon}</div>
                  <p className={cn(collapsed && "sm:hidden")}>{link.text}</p>
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </section>
  );
}
