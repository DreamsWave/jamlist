import { cn } from "@/lib/utils";

interface ContentProps {
  children: React.ReactNode;
}

function Content({ children }: ContentProps) {
  return (
    <main
      className={cn(
        "relative flex w-full flex-grow bg-muted",
        "h-[calc(100vh_-_50px)]",
      )}
    >
      {children}
    </main>
  );
}

export default Content;
