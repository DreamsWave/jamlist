"use client";

import Sidebar from "@/features/layout/sidebar";
import Appbar from "@/features/layout/appbar";
import Content from "@/features/layout/content";
import useStore from "@/hooks/use-store";
import { useLayoutStore } from "./layout-store";

const MAX_SIDEBAR_WIDTH = 240;
const MIN_SIDEBAR_WIDTH = 50;
const APPBAR_HEIGHT = 50;

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { closeSidebar, isSidebarCollapsed, openSidebar } =
    useStore(useLayoutStore, (store) => store) || {};

  return (
    <div className="flex h-screen flex-col">
      <Appbar height={APPBAR_HEIGHT} />
      <div className="relative flex h-full flex-nowrap overflow-hidden">
        <Sidebar
          isCollapsed={isSidebarCollapsed ?? false}
          onCollapse={closeSidebar ?? (() => {})}
          onExpand={openSidebar ?? (() => {})}
          maxWidth={MAX_SIDEBAR_WIDTH}
          minWidth={MIN_SIDEBAR_WIDTH}
        />
        <Content>{children}</Content>
      </div>
    </div>
  );
}

export default Layout;
