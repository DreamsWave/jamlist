import { db } from "@/data/db";
import { columns } from "@/features/songlist/songlist/columns";
import { DataTable } from "@/features/songlist/songlist/data-table";

export interface SonglistTableProps {
  className?: string;
}

async function SonglistTable({ className }: SonglistTableProps) {
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
    <div className="bg-background">
      <DataTable columns={columns} data={songs} />
    </div>
  );
}

export default SonglistTable;
