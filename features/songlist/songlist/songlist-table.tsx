import type { Song } from "@/data/db/schema";
import { DataTable } from "@/features/songlist/songlist/data-table";
import { columns } from "@/features/songlist/songlist/columns";

export interface SonglistTableProps {
  className?: string;
  songs: Song[];
}

async function SonglistTable({ className, songs }: SonglistTableProps) {
  if (!songs) return "Empty";

  return (
    <div className="bg-background">
      <DataTable columns={columns} data={songs} />
    </div>
  );
}

export default SonglistTable;
