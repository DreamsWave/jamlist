import { cn } from "@/lib/utils";
import { useLayoutStore } from "@/providers/layout-store-provider";
import { layoutConfig } from "@/config/layout";

interface ContentProps {
  children: React.ReactNode;
}

function Content({ children }: ContentProps) {
  const { isSidebarCollapsed } = useLayoutStore((store) => store);

  return (
    <main
      className={cn("relative flex h-full w-full flex-grow bg-muted")}
      style={{
        minHeight: `calc(100vh - ${layoutConfig.appbar.height}px)`,
        marginLeft: isSidebarCollapsed
          ? layoutConfig.sidebar.minWidth
          : layoutConfig.sidebar.maxWidth,
      }}
    >
      {children}
    </main>
  );
}

export default Content;
