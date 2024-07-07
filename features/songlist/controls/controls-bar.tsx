import AddSongDialog from "@/features/songlist/controls/add-song-dialog";
import { cn } from "@/lib/utils";
import OpenFiltersSideSheetButton from "@/features/songlist/filters/open-filters-side-sheet-button";

export interface ControlsProps {
  className?: string;
}

function Controls({ className }: ControlsProps) {
  return (
    <div className={cn("flex w-full justify-between", className)}>
      <div>
        <OpenFiltersSideSheetButton className="flex lg:hidden" />
      </div>
      <AddSongDialog />
    </div>
  );
}

export default Controls;
