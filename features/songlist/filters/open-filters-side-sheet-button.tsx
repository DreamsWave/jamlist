import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import FiltersSideSheet from "@/features/songlist/filters/filters-side-sheet";

export interface OpenFiltersSideSheetButtonProps {
  className?: string;
}

async function OpenFiltersSideSheetButton({
  className,
}: OpenFiltersSideSheetButtonProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className={cn(className)}>
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <FiltersSideSheet />
    </Sheet>
  );
}

export default OpenFiltersSideSheetButton;
