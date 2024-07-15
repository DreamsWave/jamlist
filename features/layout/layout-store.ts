import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LayoutState {
  isSidebarCollapsed: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set, get) => ({
      isSidebarCollapsed: false,
      openSidebar: () => set({ isSidebarCollapsed: false }),
      closeSidebar: () => set({ isSidebarCollapsed: true }),
    }),
    {
      name: "layout",
    },
  ),
);
