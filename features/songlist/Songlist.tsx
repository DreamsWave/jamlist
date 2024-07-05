import { db } from "@/data/db";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface SonglistProps {
  className?: string;
}

async function Songlist({ className }: SonglistProps) {
  const songs = await db.query.songs.findMany({
    with: {
      tags: {
        columns: { songId: false, tagId: false },
        with: { tag: { columns: { title: true, id: true } } },
      },
      moods: {
        columns: { songId: false, moodId: false },
        with: { mood: { columns: { title: true, id: true } } },
      },
      genres: {
        columns: { songId: false, genreId: false },
        with: { genre: { columns: { title: true, id: true } } },
      },
    },
  });

  if (!songs) return "Empty";

  return (
    <Card className={cn(className)}>
      <CardHeader>Songs Table</CardHeader>
      <CardContent>
        {JSON.stringify(songs)}
        {songs.map((song) => (
          <div key={song.id}>{song.title}</div>
        ))}
      </CardContent>
    </Card>
  );
}

export default Songlist;
