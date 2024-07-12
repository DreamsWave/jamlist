import IconButtonWithTooltip from "@/components/icon-button-with-tooltip";
import { Nav } from "@/components/Nav";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Music,
  House,
  TableProperties,
  ListMusic,
  Users2,
  ArrowRightFromLine,
  ArrowLeftFromLine,
} from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  isCollapsed?: boolean;
  onCollapse: () => void;
  onExpand: () => void;
  width?: number;
  minWidth?: number;
  appbarHeight?: number;
}

function Sidebar({
  isCollapsed = false,
  onCollapse,
  onExpand,
  width = 240,
  minWidth = 52,
  appbarHeight = 52,
}: SidebarProps) {
  return (
    <div
      className={cn(
        "flex-shrink-0 overflow-hidden whitespace-nowrap border-r-[1px] border-border",
      )}
      style={{ width: isCollapsed ? minWidth : width }}
    >
      <div
        className={cn("flex", `h-[${appbarHeight}px]`)}
        style={{ height: appbarHeight }}
      >
        <Button
          variant="ghost"
          asChild
          className={cn("justify-start", isCollapsed && "justify-center")}
        >
          <Link href="/" className="h-full w-full">
            <Music className="h-4 w-4" />
            <h1
              className={cn(
                "ml-1 hidden text-lg font-semibold",
                !isCollapsed && "inline-flex",
              )}
            >
              JamList
            </h1>
          </Link>
        </Button>
      </div>
      <Separator />
      <div
        className={cn("flex justify-center p-2", !isCollapsed && "justify-end")}
      >
        {isCollapsed ? (
          <IconButtonWithTooltip
            Icon={ArrowRightFromLine}
            onClick={() => (isCollapsed ? onExpand() : onCollapse())}
            title="Expand"
          />
        ) : (
          <IconButtonWithTooltip
            Icon={ArrowLeftFromLine}
            onClick={() => (isCollapsed ? onExpand() : onCollapse())}
            title="Collapse"
          />
        )}
      </div>
      <Separator />
      <Nav
        isCollapsed={isCollapsed}
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
        isCollapsed={isCollapsed}
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
