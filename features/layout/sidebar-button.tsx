"use client";

import IconButtonWithTooltip from "@/components/icon-button-with-tooltip";
import { useLayoutStore } from "@/providers/layout-store-provider";
import { Menu } from "lucide-react";

function SidebarButton() {
  const { openSidebar, closeSidebar, isSidebarCollapsed } = useLayoutStore(
    (store) => store,
  );
  return (
    <IconButtonWithTooltip
      className="hidden lg:inline-flex"
      onClick={() => (isSidebarCollapsed ? openSidebar() : closeSidebar())}
      icon={<Menu className="h-4 w-4" />}
      title={isSidebarCollapsed ? "Open sidebar" : "Close sidebar"}
    />
  );
}

export default SidebarButton;
