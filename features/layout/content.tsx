import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ContentProps {
  children: React.ReactNode;
}

function Content({ children }: ContentProps) {
  return (
    <main
      className={cn(
        "relative flex w-full flex-grow bg-muted/60 dark:bg-muted/5",
      )}
    >
      <ScrollArea className="w-full">{children}</ScrollArea>
    </main>
  );
}

export default Content;
