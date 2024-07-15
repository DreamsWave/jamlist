import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/features/switchers/theme-switcher";
import { cn } from "@/lib/utils";
import { Music } from "lucide-react";
import Link from "next/link";
import MobileSidebar from "./mobile-sidebar";

interface AppbarProps {
  height?: number;
}

function Appbar({ height = 50 }: AppbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b-[1px] border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      )}
      style={{ height }}
    >
      <div className="flex h-full w-full justify-start gap-2 px-2 lg:px-0">
        <div className="flex items-center justify-center lg:hidden">
          <MobileSidebar />
        </div>
        <div className="flex items-center">
          <Button variant="link" asChild className="p-0">
            <Link
              href="/"
              className="group inline-flex h-full w-fit gap-1"
              style={{ width: height }}
            >
              <Music className="h-6 w-6 stroke-primary transition-all group-hover:animate-pulse group-hover:stroke-slate-700 group-hover:dark:stroke-slate-300" />
              <h1 className={cn("hidden text-lg font-semibold")}>JamList</h1>
            </Link>
          </Button>
        </div>
        <div className="flex items-center">
          <h2>JamList</h2>
        </div>
        <div className="ml-auto flex items-center pr-2">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

export default Appbar;
