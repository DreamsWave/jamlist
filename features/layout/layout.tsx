"use client";

import Sidebar from "@/features/layout/sidebar";
import Appbar from "@/features/layout/appbar";
import Content from "@/features/layout/content";
import { layoutConfig } from "@/config/layout";
import { useLayoutStore } from "@/providers/layout-store-provider";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { isSidebarCollapsed } = useLayoutStore((store) => store);

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Appbar />
      <Sidebar />
      <div style={{ height: layoutConfig.appbar.height }} />
      <div className="relative flex h-full min-h-full flex-1 flex-nowrap">
        <div
          className="absolute scale-0 lg:relative lg:scale-100"
          style={{
            width: isSidebarCollapsed
              ? layoutConfig.sidebar.minWidth
              : layoutConfig.sidebar.maxWidth,
            minWidth: isSidebarCollapsed
              ? layoutConfig.sidebar.minWidth
              : layoutConfig.sidebar.maxWidth,
          }}
        />
        <Content>{children}</Content>
      </div>
    </div>
  );
}

export default Layout;
