import { db } from "@/data/db";
import Filter from "@/components/songlist/Filter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

export interface FiltersSideButtonProps {
  className?: string;
}

async function FiltersSideButton({ className }: FiltersSideButtonProps) {
  const genres = await db.query.genres.findMany();
  const moods = await db.query.moods.findMany();
  const tags = await db.query.tags.findMany();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className={cn(className)}>
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription className="hidden">
            Make changes to songs filters here. Click show when you are done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Filter label="Genres" items={genres} />
            <Filter label="Moods" items={moods} />
            <Filter label="Tags" items={tags} />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default FiltersSideButton;
