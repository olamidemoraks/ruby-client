import { create } from "zustand";

type SidebarStore = {
  sidebar: boolean;
  collapsed: boolean;
  setSidebar: (sidebar: boolean) => void;
  collapseSidebar: () => void;
  title: string;
  setTitle: (title: string) => void;
};

export const useSidebarStore = create<SidebarStore>()((set) => ({
  sidebar: false,
  collapsed: false,
  title: "Dashboard",
  setSidebar: (sidebar) => set(() => ({ sidebar })),
  collapseSidebar: () => set((state) => ({ collapsed: !state.collapsed })),
  setTitle: (title) => set(() => ({ title })),
}));
