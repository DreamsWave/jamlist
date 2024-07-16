import IconButtonWithTooltip from "@/components/icon-button-with-tooltip";
import { Nav } from "@/components/Nav";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  TableProperties,
  ListMusic,
  Users2,
  ArrowRightFromLine,
  ArrowLeftFromLine,
} from "lucide-react";
import { useLayoutStore } from "@/features/layout/layout-store";
import useStore from "@/hooks/use-store";
import { layoutConfig } from "@/config/layout";

function Sidebar() {
  const { closeSidebar, isSidebarCollapsed, openSidebar } =
    useStore(useLayoutStore, (store) => store) ?? {};

  return (
    <div className="hidden lg:flex">
      <div
        className={cn(
          "fixed z-50 h-full flex-shrink-0 overflow-hidden whitespace-nowrap border-r-[1px] border-border bg-background",
          `w-[${layoutConfig.sidebar.maxWidth}px]`,
        )}
        style={{
          width: isSidebarCollapsed
            ? layoutConfig.sidebar.minWidth
            : layoutConfig.sidebar.maxWidth,
        }}
      >
        <div
          className={cn(
            "flex justify-center p-2",
            !isSidebarCollapsed && "justify-end",
          )}
        >
          {isSidebarCollapsed ? (
            <IconButtonWithTooltip
              icon={<ArrowRightFromLine className="h-4 w-4" />}
              onClick={() =>
                isSidebarCollapsed
                  ? openSidebar
                    ? openSidebar()
                    : () => {}
                  : closeSidebar
                    ? closeSidebar()
                    : () => {}
              }
              title="Expand"
              side="right"
            />
          ) : (
            <IconButtonWithTooltip
              icon={<ArrowLeftFromLine className="h-4 w-4" />}
              onClick={() =>
                isSidebarCollapsed
                  ? openSidebar
                    ? openSidebar()
                    : () => {}
                  : closeSidebar
                    ? closeSidebar()
                    : () => {}
              }
              title="Collapse"
              side="right"
            />
          )}
        </div>
        <Separator />
        <Nav
          isCollapsed={isSidebarCollapsed ?? false}
          links={[
            {
              title: "Songlist",
              // label: "9",
              icon: TableProperties,
              href: "/songlist",
            },
            {
              title: "Queue",
              // label: "",
              icon: ListMusic,
              href: "/queue",
            },
          ]}
        />
        <Separator />
        <Nav
          isCollapsed={isSidebarCollapsed ?? false}
          links={[
            {
              title: "Social",
              // label: "972",
              icon: Users2,
              href: "/social",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Sidebar;
