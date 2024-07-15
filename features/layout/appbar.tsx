import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/features/switchers/theme-switcher";
import { cn } from "@/lib/utils";
import { Music } from "lucide-react";
import Link from "next/link";

interface AppbarProps {
  height?: number;
}

function Appbar({ height = 50 }: AppbarProps) {
  return (
    <header
      className={cn("z-20 box-content w-full border-b-[1px] border-border")}
      style={{ height }}
    >
      <div className="h-full">
        <div className="flex h-full w-full justify-start gap-2 border-border bg-background/80 dark:bg-muted/30">
          <div className="flex items-center">
            <Button variant="link" asChild className="p-0">
              <Link
                href="/"
                className="group inline-flex h-full w-fit gap-1"
                style={{ width: height }}
              >
                <Music className="h-6 w-6 group-hover:stroke-slate-500 group-hover:dark:stroke-slate-300" />
                <h1 className={cn("hidden text-lg font-semibold")}>JamList</h1>
              </Link>
            </Button>
          </div>
          <div className="flex items-center">
            <h2>Appbar</h2>
          </div>
          <div className="ml-auto flex items-center pr-2">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Appbar;
