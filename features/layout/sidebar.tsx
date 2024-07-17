import { Nav } from "@/components/Nav";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TableProperties, ListMusic, Users2 } from "lucide-react";
import { useLayoutStore } from "@/providers/layout-store-provider";
import { layoutConfig } from "@/config/layout";

function Sidebar() {
  const { isSidebarCollapsed } = useLayoutStore((store) => store);

  return (
    <div
      className={cn(
        "fixed z-10 hidden h-full w-full flex-shrink-0 flex-col overflow-hidden whitespace-nowrap border-r-[1px] border-border bg-background lg:flex",
      )}
      style={{
        width: isSidebarCollapsed
          ? layoutConfig.sidebar.minWidth
          : layoutConfig.sidebar.maxWidth,
        top: layoutConfig.appbar.height,
      }}
    >
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
  );
}

export default Sidebar;
