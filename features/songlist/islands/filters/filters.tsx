import { db } from "@/data/db";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FilterGenres from "@/features/songlist/islands/filters/filter-components/filter-genres";
import FilterMoods from "@/features/songlist/islands/filters/filter-components/filter-moods";
import FilterTags from "@/features/songlist/islands/filters/filter-components/filter-tags";

export interface FiltersProps {
  className?: string;
}

async function Filters({ className }: FiltersProps) {
  const genres = await db.query.genres.findMany();
  const moods = await db.query.moods.findMany();
  const tags = await db.query.tags.findMany();

  return (
    <Card className={cn("h-fit", className)}>
      <CardContent className="w-full p-0">
        <div className="flex flex-col gap-2 py-3">
          <FilterGenres genres={genres} />
          <Separator orientation="horizontal" />
          <FilterMoods moods={moods} />
          <Separator orientation="horizontal" />
          <FilterTags tags={tags} />
        </div>
      </CardContent>
    </Card>
  );
}

export default Filters;
