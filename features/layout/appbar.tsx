import ThemeSwitcher from "@/features/switchers/theme-switcher";
import { cn } from "@/utils/tailwind";
import MobileSidebar from "@/features/layout/mobile-sidebar";
import { layoutConfig } from "@/config/layout";
import AuthButton from "../auth-button/auth-button";
import SidebarButton from "./sidebar-button";

function Appbar() {
  return (
    <header
      className={cn(
        "fixed top-0 z-20 w-full border-b-[1px] border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      )}
      style={{ height: layoutConfig.appbar.height }}
    >
      <div className="flex h-full w-full justify-start gap-2">
        <div
          className="flex items-center justify-center"
          style={{
            height: layoutConfig.appbar.height,
            width: layoutConfig.sidebar.minWidth,
          }}
        >
          <SidebarButton />
          <MobileSidebar className="inline-flex lg:hidden" />
        </div>

        <div className="ml-auto flex items-center gap-2 pr-2">
          <ThemeSwitcher />
          <AuthButton />
        </div>
      </div>
    </header>
  );
}

export default Appbar;
