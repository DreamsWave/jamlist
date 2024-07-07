import ControlsBar from "@/features/songlist/songs-table-header";
import FiltersCard from "@/features/songlist/filters/filters-card";
import SonglistTable from "@/features/songlist/songlist/songlist-table";
import { getSongsAction } from "@/server/actions/song";
import { DataTable } from "@/features/songlist/data-table";
import { columns } from "@/features/songlist/songlist/columns";

export default async function HomePage() {
  const songs = await getSongsAction();

  return (
    <main className="min-h-screen bg-muted/40">
      <section className="grids-col-1 container grid gap-4 pt-10 lg:grid-cols-[minmax(150px,_300px)_1fr]">
        <FiltersCard className="hidden lg:flex" />
        {/* <ControlsBar className="lg:col-start-2" /> */}
        {/* <SonglistTable className="lg:col-start-2" songs={songs} /> */}
        <DataTable columns={columns} data={songs} />
      </section>
    </main>
  );
}
