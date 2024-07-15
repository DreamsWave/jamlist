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

interface SidebarProps {
  isCollapsed?: boolean;
  onCollapse: () => void;
  onExpand: () => void;
  maxWidth?: number;
  minWidth?: number;
}

function Sidebar({
  isCollapsed = false,
  onCollapse,
  onExpand,
  maxWidth = 240,
  minWidth = 50,
}: SidebarProps) {
  return (
    <div className="hidden lg:flex">
      <div
        className={cn(
          "h-full flex-shrink-0 overflow-hidden whitespace-nowrap border-r-[1px] border-border bg-muted/90 dark:bg-muted/50",
        )}
        style={{ width: isCollapsed ? minWidth : maxWidth }}
      >
        <div
          className={cn(
            "flex justify-center p-2",
            !isCollapsed && "justify-end",
          )}
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
    </div>
  );
}

export default Sidebar;
