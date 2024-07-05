import { db } from "@/data/db";
import Filter from "@/components/songlist/Filter";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
          <Filter label="Genres" items={genres} />
          <Separator orientation="horizontal" />
          <Filter label="Moods" items={moods} />
          <Separator orientation="horizontal" />
          <Filter label="Tags" items={tags} />
        </div>
      </CardContent>
    </Card>
  );
}

export default Filters;
