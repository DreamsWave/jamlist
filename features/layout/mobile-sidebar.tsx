"use client";

import IconButtonWithTooltip from "@/components/icon-button-with-tooltip";
import { Nav } from "@/components/nav";
import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet";
import { layoutConfig } from "@/config/layout";
import { cn } from "@/utils/tailwind";
import { Separator } from "@radix-ui/react-separator";
import { ListMusic, Menu, TableProperties, Users2 } from "lucide-react";
import { useState } from "react";

interface MobileSidebarProps {
  className?: string;
}

function MobileSidebar({ className }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger asChild>
        <IconButtonWithTooltip
          className={cn(className)}
          icon={<Menu className="h-4 w-4" />}
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0"
        style={{ width: layoutConfig.sidebar.maxWidth }}
        disableClose
      >
        <SheetHeader className="hidden">
          <SheetTitle>Sidebar</SheetTitle>
          <SheetDescription>Website sidebar</SheetDescription>
        </SheetHeader>
        <div
          className="flex w-full justify-start gap-2"
          style={{ height: layoutConfig.appbar.height }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              height: layoutConfig.appbar.height,
              width: layoutConfig.sidebar.minWidth,
            }}
          >
            <IconButtonWithTooltip
              className={cn(className)}
              icon={<Menu className="h-4 w-4" />}
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
        <Nav
          onLinkClick={() => setIsOpen(false)}
          isCollapsed={false}
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
          onLinkClick={() => setIsOpen(false)}
          isCollapsed={false}
          links={[
            {
              title: "Social",
              // label: "972",
              icon: Users2,
              href: "/social",
            },
          ]}
        />
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;
