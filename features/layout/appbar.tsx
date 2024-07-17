import ThemeSwitcher from "@/features/switchers/theme-switcher";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import MobileSidebar from "@/features/layout/mobile-sidebar";
import { layoutConfig } from "@/config/layout";
import IconButtonWithTooltip from "@/components/icon-button-with-tooltip";
import { useLayoutStore } from "@/providers/layout-store-provider";

function Appbar() {
  const { openSidebar, closeSidebar, isSidebarCollapsed } = useLayoutStore(
    (store) => store,
  );

  return (
    <header
      className={cn(
        "fixed top-0 z-20 w-full border-b-[1px] border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      )}
      style={{ height: layoutConfig.appbar.height }}
    >
      <div className="flex h-full w-full justify-start gap-2">
        {/* <div className="flex items-center justify-center">
          <MobileSidebar />
        </div> */}
        <div
          className="flex items-center justify-center"
          style={{
            height: layoutConfig.appbar.height,
            width: layoutConfig.sidebar.minWidth,
          }}
        >
          <IconButtonWithTooltip
            className="hidden lg:inline-flex"
            onClick={() =>
              isSidebarCollapsed ? openSidebar() : closeSidebar()
            }
            icon={<Menu className="h-4 w-4" />}
            title={isSidebarCollapsed ? "Open sidebar" : "Close sidebar"}
          />
          <MobileSidebar className="inline-flex lg:hidden" />
        </div>

        <div className="ml-auto flex items-center pr-2">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

export default Appbar;
