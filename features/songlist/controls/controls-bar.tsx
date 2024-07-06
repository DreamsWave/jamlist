import AddSongButton from "@/features/songlist/controls/add-song-button";
import { cn } from "@/lib/utils";
import OpenFiltersSideSheetButton from "@/features/songlist/filters/open-filters-side-sheet-button";

export interface ControlsProps {
  className?: string;
}

function Controls({ className }: ControlsProps) {
  return (
    <div className={cn("flex w-full", className)}>
      <OpenFiltersSideSheetButton className="flex lg:hidden" />
      <AddSongButton className="ml-auto" />
    </div>
  );
}

export default Controls;
