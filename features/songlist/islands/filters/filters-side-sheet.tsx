import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { db } from "@/data/db";
import BadgeFilter from "@/features/songlist/islands/filters/filter-components/badge-filter";

const FiltersSideSheet = () => {
  // const genres = await db.query.genres.findMany();
  // const moods = await db.query.moods.findMany();
  // const tags = await db.query.tags.findMany();

  return (
    <SheetContent side="left">
      <SheetHeader>
        <SheetTitle>Filters</SheetTitle>
        <SheetDescription className="hidden">
          Make changes to songs filters here. Click show when you are done.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="flex flex-col gap-2">
          {/* <BadgeFilter label="Genres" items={genres} selectedItems={[]} />
          <BadgeFilter label="Moods" items={moods} selectedItems={[]} />
          <BadgeFilter label="Tags" items={tags} selectedItems={[]} /> */}
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Save changes</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
};

export default FiltersSideSheet;
