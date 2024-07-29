"use client";

import { layoutConfig } from "@/config/layout";
import { useLayoutStore } from "@/providers/layout-store-provider";
import { cn } from "@/utils/tailwind";

interface ContentProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

function Content({ children, className, ...props }: ContentProps) {
  const { isSidebarCollapsed } = useLayoutStore((store) => store);
  return (
    <>
      <div style={{ height: layoutConfig.appbar.height }} />
      <div className="relative flex h-full min-h-full flex-1 flex-nowrap">
        <div
          className="absolute scale-0 lg:relative lg:scale-100"
          style={{
            width: isSidebarCollapsed
              ? layoutConfig.sidebar.minWidth
              : layoutConfig.sidebar.maxWidth,
            minWidth: isSidebarCollapsed
              ? layoutConfig.sidebar.minWidth
              : layoutConfig.sidebar.maxWidth,
          }}
        />
        <main
          className={cn(
            "relative w-full flex-grow overflow-auto bg-muted",
            className,
          )}
          {...props}
        >
          {children}
        </main>
      </div>
    </>
  );
}

export default Content;
