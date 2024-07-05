import AddSongButton from "@/components/songlist/AddSongButton";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import FiltersSideButton from "./FiltersSideButton";

export interface ControlsProps {
  className?: string;
}

function Controls({ className }: ControlsProps) {
  return (
    <div className={cn("flex w-full", className)}>
      <FiltersSideButton className="flex lg:hidden" />
      <AddSongButton className="ml-auto" />
    </div>
  );
}

export default Controls;
