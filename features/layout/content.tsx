import { cn } from "@/lib/utils";

interface ContentProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

function Content({ children, className, ...props }: ContentProps) {
  return (
    <main
      className={cn(
        "relative w-full flex-grow overflow-auto bg-muted",
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
}

export default Content;
