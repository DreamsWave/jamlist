import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export type LayoutState = {
  isSidebarCollapsed: boolean;
};

export type LayoutActions = {
  openSidebar: () => void;
  closeSidebar: () => void;
};

export type LayoutStore = LayoutState & LayoutActions;

export const defaultInitState: LayoutState = {
  isSidebarCollapsed: false,
};

export const createLayoutStore = (
  initState: LayoutState = defaultInitState,
) => {
  return createStore<LayoutStore>()(
    persist(
      (set) => ({
        ...initState,
        openSidebar: () => set({ isSidebarCollapsed: false }),
        closeSidebar: () => set({ isSidebarCollapsed: true }),
      }),
      { name: "layout" },
    ),
  );
};
