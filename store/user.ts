import { create } from "zustand";
import { User } from "../types";

type UserStore = {
  user?: User;
  setUser: (user: any) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

export const useUserStore = create<UserStore>()((set) => ({
  user: undefined,
  setUser(user) {
    set(() => ({ user }));
  },
  isAuthenticated: false,
  setIsAuthenticated(value) {
    set(() => ({ isAuthenticated: value }));
  },
}));
