import AddSongButton from "@/features/songlist/controls/AddSongButton";
import { cn } from "@/lib/utils";
import FiltersSideButton from "@/features/songlist/controls/FiltersSideButton";

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
