"use client";

import Sidebar from "@/features/layout/sidebar/sidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";

const SIDEBAR_WIDTH = 200;
const MIN_SIDEBAR_WIDTH = 52;
const APPBAR_HEIGHT = 52;

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed(true);
  };
  const handleExpand = () => {
    setIsCollapsed(false);
  };

  return (
    <div className="flex">
      <div
        className={cn(
          "fixed right-0 top-0 flex w-full items-center bg-background px-2",
        )}
        style={{
          height: APPBAR_HEIGHT,
          width: isCollapsed
            ? `calc(100% - ${MIN_SIDEBAR_WIDTH}px + 1px)`
            : `calc(100% - ${SIDEBAR_WIDTH}px + 1px)`,
        }}
      >
        <h2>Appbar</h2>
      </div>
      <Sidebar
        isCollapsed={isCollapsed}
        onCollapse={handleCollapse}
        onExpand={handleExpand}
        width={SIDEBAR_WIDTH}
        minWidth={MIN_SIDEBAR_WIDTH}
        appbarHeight={APPBAR_HEIGHT}
      />
      <div className="flex min-h-screen flex-grow bg-muted/40">
        <div
          className="w-full"
          style={APPBAR_HEIGHT ? { marginTop: APPBAR_HEIGHT } : {}}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
