"use client";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Users2, Music, House, TableProperties, ListMusic } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface ResizableLayoutProps {
  defaultLayout?: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize?: number;
  children?: React.ReactNode;
}

export default function ResizableLayout({
  defaultLayout = [20, 80],
  defaultCollapsed = false,
  navCollapsedSize = 4,
  children,
}: ResizableLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };

  const onCollapse = () => {
    setIsCollapsed(true);
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
      true,
    )}`;
  };

  const onExpand = () => {
    setIsCollapsed(false);
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
      false,
    )}`;
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      autoSaveId="persistence"
      onLayout={onLayout}
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={15}
        maxSize={20}
        onCollapse={onCollapse}
        onExpand={onExpand}
        className={cn(
          isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out",
        )}
        style={{ overflow: "visible" }}
      >
        <div className={cn("flex h-[52px]")}>
          <Button
            variant="ghost"
            asChild
            className={cn("justify-start", isCollapsed && "justify-center")}
          >
            <Link href="/" className="h-full w-full">
              <Music />
              {!isCollapsed && (
                <h1 className="ml-1 text-lg font-semibold">JamList</h1>
              )}
            </Link>
          </Button>
        </div>
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Home",
              // label: "128",
              icon: House,
              href: "/",
            },
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
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={40}>
        <div className="flex h-[52px] items-center px-4 py-2">
          <h1 className="text-xl font-bold">Inbox</h1>
        </div>
        <Separator />
        <div className="min-h-[calc(100vh - 52px)] bg-muted/40">
          <ScrollArea className="h-screen">{children}</ScrollArea>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
