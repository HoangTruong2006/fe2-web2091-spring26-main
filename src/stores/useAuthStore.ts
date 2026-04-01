import { create } from "zustand";
import { persist } from "zustand/middleware";
import { message } from "antd";

interface AuthStore {
  user: any;
  token: string | null;
  setUser: (userData: any) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (userData: any) => set({ user: userData }),
      setToken: (token: string) => set({ token }),
      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem("auth-storage");
        message.info("Đã đăng xuất");
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
