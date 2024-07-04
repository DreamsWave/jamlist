import { db } from "@/data/db";
import Filter from "@/components/Filter";

async function Filters() {
  const genres = await db.query.genres.findMany();
  const moods = await db.query.moods.findMany();
  const tags = await db.query.tags.findMany();

  return (
    <div className="flex gap-2 flex-col">
      <Filter label="Genres" items={genres} />
      <Filter label="Moods" items={moods} />
      <Filter label="Tags" items={tags} />
    </div>
  );
}

export default Filters;
